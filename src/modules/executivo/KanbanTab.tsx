import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { colorForId, prazoStatus, prazoBadge, VIBRA } from "@/lib/vibraColors";
import { useState, useMemo, useEffect, useRef, type DragEvent } from "react";
import { toast } from "sonner";
import {
  X,
  Plus,
  Tag,
  Settings as SettingsIcon,
  Sliders,
  Layout,
  Grid,
  Eye,
  EyeOff,
  ArrowUpDown,
  HelpCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  CheckCircle2,
  Pencil,
  Check,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";
import { InitiativeDrawer } from "@/components/InitiativeDrawer";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { useConfirm } from "@/hooks/useConfirm";
import { usePicklist } from "@/hooks/usePicklist";

const DEFAULT_COLUMNS = [
  { id: "Backlog", color: "#94a3b8" },
  { id: "Priorizada", color: VIBRA.yellow },
  { id: "Em Diagnóstico", color: VIBRA.blueSoft },
  { id: "Desenvolvimento", color: VIBRA.blue },
  { id: "Sprints – Dev", color: VIBRA.orange },
  { id: "Deploy – Entrega", color: VIBRA.yellow },
  { id: "Acompanhamento", color: VIBRA.greenSoft },
  { id: "Concluída", color: VIBRA.green },
  { id: "Despriorizada", color: "#a3a3a3" },
  { id: "Cancelada", color: "#525252" },
];

const ALL_CARD_FIELDS = [
  { id: "codigo", label: "Código da Iniciativa" },
  { id: "prazo", label: "Prazo e Alertas" },
  { id: "prioridade", label: "Prioridade" },
  { id: "lider", label: "Líder Responsável" },
  { id: "sponsor", label: "Sponsor" },
  { id: "analista", label: "Analista Responsável" },
  { id: "potencial_automacao", label: "Potencial Automação" },
  { id: "hc", label: "Métricas de HC (FTE)" },
  { id: "esforco", label: "Esforço (1-5)" },
  { id: "impacto", label: "Impacto Negócio" },
  { id: "progresso_iniciativa", label: "Avanço Iniciativa" },
  { id: "progresso_microprocessos", label: "Avanço Microprocessos" },
  { id: "tarefas", label: "Lista de Ações/Tarefas" },
];

type Iniciativa = {
  id: string;
  codigo: string | null;
  titulo: string;
  status: string | null;
  prioridade: string | null;
  percentual_avanco: number | null;
  projeto_id: string | null;
  data_fim_prevista: string | null;
  hc_atual: number | null;
  hc_alcancado: number | null;
  hc_liberado: number | null;
  esforco: number | null;
  impacto_negocio: number | null;
  lider_id: string | null;
  sponsor_id: string | null;
  analista_id: string | null;
  potencial_automacao: string | null;
  impedimento: string | null;
};

export function KanbanTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const gridRef = useRef<HTMLDivElement>(null);
  const dummyScrollRef = useRef<HTMLDivElement>(null);
  const { projetoIds } = useHierarchy();
  const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;

  // Real-time Picklist synchronization
  const {
    values: picklistVals,
    rename: renameStatus,
    add: addStatus,
    remove: removeStatus,
  } = usePicklist("Status da Iniciativa");

  // Modal & Drawer states
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  // --- 1. PERSISTENCE ENGINE (LOCALSTORAGE) ---
  const [laneWidth, setLaneWidth] = useState<number>(290);
  const [cardMode, setCardMode] = useState<"compact" | "medium" | "large">("medium");
  const [sortBy, setSortBy] = useState<"recent" | "title" | "progress" | "priority">("recent");
  const [hiddenLanes, setHiddenLanes] = useState<string[]>([]);

  // Custom Card Fields selection
  const [cardFields, setCardFields] = useState<string[]>([
    "codigo",
    "prazo",
    "prioridade",
    "progresso_iniciativa",
    "progresso_microprocessos",
    "tarefas",
  ]);

  // Dynamic colors and order of Kanban lanes
  const [laneColors, setLaneColors] = useState<Record<string, string>>({});
  const [laneOrder, setLaneOrder] = useState<string[]>([]);

  // New Lane auxiliary state
  const [newLaneName, setNewLaneName] = useState("");

  // Custom Lane Names mapping (legacy - we use picklists now, but keep for fallback)
  const [customLaneNames, setCustomLaneNames] = useState<Record<string, string>>({});

  // Lane renaming state
  const [editingLaneId, setEditingLaneId] = useState<string | null>(null);
  const [tempLaneName, setTempLaneName] = useState<string>("");

  // Load preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vibra_kanban_prefs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.laneWidth) setLaneWidth(Number(parsed.laneWidth));
        if (parsed.cardMode) setCardMode(parsed.cardMode);
        if (parsed.sortBy) setSortBy(parsed.sortBy);
        if (parsed.hiddenLanes) setHiddenLanes(parsed.hiddenLanes);
        if (parsed.cardFields) setCardFields(parsed.cardFields);
        if (parsed.customLaneNames) setCustomLaneNames(parsed.customLaneNames);
      }

      const savedColors = localStorage.getItem("vibra_kanban_lane_colors");
      if (savedColors) {
        setLaneColors(JSON.parse(savedColors));
      } else {
        const initialColors: Record<string, string> = {};
        DEFAULT_COLUMNS.forEach((c) => {
          initialColors[c.id] = c.color;
        });
        setLaneColors(initialColors);
      }

      const savedOrder = localStorage.getItem("vibra_kanban_lane_order");
      if (savedOrder) {
        setLaneOrder(JSON.parse(savedOrder));
      }
    } catch (e) {
      console.warn("Failed to load kanban preferences", e);
    }
  }, []);

  // Save preferences helper
  const savePreference = (key: string, value: any) => {
    try {
      const saved = localStorage.getItem("vibra_kanban_prefs");
      const parsed = saved ? JSON.parse(saved) : {};
      parsed[key] = value;
      localStorage.setItem("vibra_kanban_prefs", JSON.stringify(parsed));
    } catch (e) {
      console.warn("Failed to save kanban preference", e);
    }
  };

  const handleLaneWidthChange = (w: number) => {
    setLaneWidth(w);
    savePreference("laneWidth", w);
  };

  const handleCardModeChange = (mode: "compact" | "medium" | "large") => {
    setCardMode(mode);
    savePreference("cardMode", mode);

    // Preset fields according to selected mode, but user can always toggle them separately
    let fields: string[] = [];
    if (mode === "compact") {
      fields = ["codigo", "progresso_iniciativa"];
    } else if (mode === "medium") {
      fields = [
        "codigo",
        "prazo",
        "prioridade",
        "hc",
        "progresso_iniciativa",
        "progresso_microprocessos",
      ];
    } else if (mode === "large") {
      fields = [
        "codigo",
        "prazo",
        "prioridade",
        "hc",
        "esforco",
        "impacto",
        "progresso_iniciativa",
        "progresso_microprocessos",
        "tarefas",
      ];
    }
    setCardFields(fields);
    savePreference("cardFields", fields);

    toast.success(
      `Campos pré-definidos para o modo: ${mode === "compact" ? "Compacto" : mode === "large" ? "Expandido" : "Médio"}`,
    );
  };

  const handleSortChange = (sort: "recent" | "title" | "progress" | "priority") => {
    setSortBy(sort);
    savePreference("sortBy", sort);
    toast.success(`Ordenação alterada com sucesso!`);
  };

  const toggleLaneVisibility = (colId: string) => {
    const updated = hiddenLanes.includes(colId)
      ? hiddenLanes.filter((l) => l !== colId)
      : [...hiddenLanes, colId];
    setHiddenLanes(updated);
    savePreference("hiddenLanes", updated);
  };

  const toggleCardField = (fieldId: string) => {
    const updated = cardFields.includes(fieldId)
      ? cardFields.filter((f) => f !== fieldId)
      : [...cardFields, fieldId];
    setCardFields(updated);
    savePreference("cardFields", updated);
  };

  const handleSaveLaneName = async (colId: string) => {
    const trimmed = tempLaneName.trim();
    if (!trimmed || trimmed === colId) {
      setEditingLaneId(null);
      return;
    }

    const col = columns.find((c) => c.id === colId);
    if (col && col.dbId) {
      try {
        await renameStatus.mutateAsync({ id: col.dbId, valor: trimmed });

        const { error: updateError } = await supabase
          .from("iniciativas")
          .update({ status: trimmed })
          .eq("status", colId);

        if (updateError) {
          console.warn("Could not update initiative statuses:", updateError);
        }

        const savedColors = JSON.parse(localStorage.getItem("vibra_kanban_lane_colors") || "{}");
        if (savedColors[colId]) {
          savedColors[trimmed] = savedColors[colId];
          delete savedColors[colId];
          localStorage.setItem("vibra_kanban_lane_colors", JSON.stringify(savedColors));
          setLaneColors(savedColors);
        }

        const savedOrder = JSON.parse(localStorage.getItem("vibra_kanban_lane_order") || "[]");
        const orderIdx = savedOrder.indexOf(colId);
        if (orderIdx !== -1) {
          savedOrder[orderIdx] = trimmed;
          localStorage.setItem("vibra_kanban_lane_order", JSON.stringify(savedOrder));
          setLaneOrder(savedOrder);
        }

        setEditingLaneId(null);
        toast.success(`Raia renomeada de "${colId}" para "${trimmed}" com sucesso!`);
        qc.invalidateQueries({ queryKey: ["kanban-ini"] });
        qc.invalidateQueries({ queryKey: ["picklist"] });
        qc.invalidateQueries({ queryKey: ["iniciativa"] });
        qc.invalidateQueries({ queryKey: ["iniciativas"] });
      } catch (err: any) {
        toast.error("Erro ao renomear raia: " + err.message);
      }
    } else {
      const updated = { ...customLaneNames, [colId]: trimmed || colId };
      setCustomLaneNames(updated);
      savePreference("customLaneNames", updated);
      setEditingLaneId(null);
      toast.success(`Raia renomeada para "${trimmed || colId}"`);
    }
  };

  const handleUpdateLaneColor = (colId: string, color: string) => {
    const updated = { ...laneColors, [colId]: color };
    setLaneColors(updated);
    localStorage.setItem("vibra_kanban_lane_colors", JSON.stringify(updated));
    toast.success(`Cor da raia "${colId}" atualizada!`);
  };

  const handleMoveLane = (colId: string, direction: "left" | "right") => {
    const ids = columns.map((c) => c.id);
    const idx = ids.indexOf(colId);
    if (idx === -1) return;

    const newOrder = [...ids];
    if (direction === "left" && idx > 0) {
      newOrder[idx] = ids[idx - 1];
      newOrder[idx - 1] = colId;
    } else if (direction === "right" && idx < ids.length - 1) {
      newOrder[idx] = ids[idx + 1];
      newOrder[idx + 1] = colId;
    } else {
      return;
    }

    setLaneOrder(newOrder);
    localStorage.setItem("vibra_kanban_lane_order", JSON.stringify(newOrder));
    toast.success("Ordem das raias atualizada!");
  };

  const handleAddLane = async () => {
    const trimmed = newLaneName.trim();
    if (!trimmed) return;

    if (columns.some((c) => c.id.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Já existe uma raia com esse nome!");
      return;
    }

    try {
      await addStatus.mutateAsync(trimmed);
      setNewLaneName("");
      toast.success(`Raia "${trimmed}" adicionada com sucesso!`);
    } catch (err: any) {
      toast.error("Erro ao adicionar raia: " + err.message);
    }
  };

  const handleDeleteLane = async (colId: string, dbId: string | null) => {
    if (!dbId) {
      toast.error("Não é possível excluir raia de fallback");
      return;
    }

    const count = iniciativas.filter((i) => (i.status ?? "Backlog") === colId).length;
    if (count > 0) {
      const confirmMove = await confirm(
        "Mover iniciativas?",
        `Esta raia possui ${count} iniciativa(s). Se você excluí-la, as iniciativas serão movidas para "Backlog". Deseja continuar?`,
      );
      if (!confirmMove) return;

      const { error: updateError } = await supabase
        .from("iniciativas")
        .update({ status: "Backlog" })
        .eq("status", colId);

      if (updateError) {
        toast.error("Erro ao mover iniciativas: " + updateError.message);
        return;
      }
    } else {
      const confirmDelete = await confirm(
        "Excluir raia?",
        `Deseja realmente excluir a raia "${colId}"?`,
      );
      if (!confirmDelete) return;
    }

    try {
      await removeStatus.mutateAsync(dbId);
      toast.success(`Raia "${colId}" excluída!`);
      qc.invalidateQueries({ queryKey: ["kanban-ini"] });
      qc.invalidateQueries({ queryKey: ["picklist"] });
      qc.invalidateQueries({ queryKey: ["iniciativa"] });
      qc.invalidateQueries({ queryKey: ["iniciativas"] });
    } catch (err: any) {
      toast.error("Erro ao excluir raia: " + err.message);
    }
  };

  // Real-time table updates
  useRealtimeTable("iniciativas", [["kanban-ini"]]);
  useRealtimeTable("tarefas", [["kanban-acoes"]]);

  // Fetch projects (macros)
  const { data: projetos = [] } = useQuery({
    queryKey: ["kanban-projetos", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let q = supabase.from("projetos").select("id,nome").is("deleted_at", null);
      if (selectedProjetoIds) q = q.in("id", selectedProjetoIds);
      const { data } = await q;
      return data ?? [];
    },
  });
  const procMap = new Map(projetos.map((p) => [p.id, p.nome]));

  // Fetch profiles for displaying real names of leaders and analysts
  const { data: profiles = [] } = useQuery({
    queryKey: ["kanban-profiles"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("id,nome,email");
      return data ?? [];
    },
  });
  const profMap = useMemo(
    () => new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? "—"])),
    [profiles],
  );

  // Fetch initiatives
  const { data: iniciativas = [] } = useQuery({
    queryKey: ["kanban-ini", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async (): Promise<Iniciativa[]> => {
      let q = supabase
        .from("iniciativas")
        .select(
          "id,codigo,titulo,status,prioridade,percentual_avanco,projeto_id,data_fim_prevista,hc_atual,hc_alcancado,hc_liberado,esforco,impacto_negocio,lider_id,sponsor_id,analista_id,potencial_automacao,impedimento",
        )
        .is("deleted_at", null)
        .order("updated_at", { ascending: false });
      if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Iniciativa[];
    },
  });

  // Fetch tasks
  const { data: acoes = [] } = useQuery({
    queryKey: ["kanban-acoes", iniciativas.map((i) => i.id).join(",")],
    enabled: iniciativas.length > 0,
    queryFn: async () => {
      const { data } = await supabase
        .from("tarefas")
        .select("id,titulo,status,iniciativa_id,responsavel_id,data_fim_prevista")
        .in(
          "iniciativa_id",
          iniciativas.map((i) => i.id),
        );
      return data ?? [];
    },
  });

  // Fetch microprocesses
  const { data: microprocessos = [] } = useQuery({
    queryKey: ["kanban-micros", iniciativas.map((i) => i.id).join(",")],
    enabled: iniciativas.length > 0,
    queryFn: async () => {
      const { data } = await supabase
        .from("microprocessos")
        .select("id,titulo,status,percentual_avanco,iniciativa_id")
        .in(
          "iniciativa_id",
          iniciativas.map((i) => i.id),
        )
        .is("deleted_at", null);
      return data ?? [];
    },
  });

  function microStatusColor(s: string | null, pct: number) {
    if (pct >= 100 || s === "Concluído") return "#16a34a";
    if (s === "Em Andamento" || s === "Em Execução") return VIBRA.blue;
    if (s === "Atrasado" || s === "Em Risco") return "#dc2626";
    if (s === "Planejado") return "#94a3b8";
    return VIBRA.blue;
  }

  // --- 2. ADVANCED SORTING LOGIC ---
  const sortedIniciativas = useMemo(() => {
    const result = [...iniciativas];

    if (sortBy === "title") {
      result.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (sortBy === "progress") {
      result.sort((a, b) => (b.percentual_avanco || 0) - (a.percentual_avanco || 0));
    } else if (sortBy === "priority") {
      const weight = (p: string | null) => {
        if (/crit/i.test(p ?? "")) return 4;
        if (/alt/i.test(p ?? "")) return 3;
        if (/med/i.test(p ?? "")) return 2;
        return 1;
      };
      result.sort((a, b) => weight(b.prioridade) - weight(a.prioridade));
    }
    return result;
  }, [iniciativas, sortBy]);

  // --- 3. PROJECT / PORTFOLIO GLOBAL PROGRESS ---
  const globalStats = useMemo(() => {
    const total = iniciativas.length;
    if (total === 0) {
      return {
        total: 0,
        notStarted: 0,
        active: 0,
        blocked: 0,
        completed: 0,
        avgAdvance: 0,
        notStartedPct: 0,
        activePct: 0,
        blockedPct: 0,
        completedPct: 0,
      };
    }

    // 1. Counts for scoreboards (exact definition requested by the user)
    const notStarted = iniciativas.filter((i) => {
      const s = (i.status ?? "").toLowerCase();
      return (
        s === "não iniciada" ||
        s === "não iniciadas" ||
        s === "nao iniciada" ||
        s.includes("aguardando mapeamento") ||
        s === "não iniciada"
      );
    }).length;

    const active = iniciativas.filter((i) => {
      const s = (i.status ?? "").toLowerCase();
      return (
        s.includes("andamento") ||
        s.includes("execução") ||
        s.includes("execucao") ||
        s.includes("desenvolvimento") ||
        s.includes("sprint") ||
        s.includes("aguardando mapeamento") ||
        s.includes("validação") ||
        s.includes("validacao") ||
        s.includes("acompanhamento") ||
        s.includes("responsabilidade da área") ||
        s.includes("responsabilidade da area")
      );
    }).length;

    const blocked = iniciativas.filter((i) => {
      const s = (i.status ?? "").toLowerCase();
      const hasImpedimento = !!(i.impedimento && i.impedimento.trim());
      const isBlockedStatus =
        s.includes("despriorizada") ||
        s.includes("cancelada") ||
        s.includes("com bloqueios") ||
        s.includes("bloqueio") ||
        s.includes("bloqueada") ||
        s.includes("suspenso") ||
        s.includes("impedido");
      return hasImpedimento || isBlockedStatus;
    }).length;

    const completed = iniciativas.filter((i) => {
      const s = (i.status ?? "").toLowerCase();
      return (
        s.includes("concluída") || s === "concluido" || s === "concluída" || s.includes("conclui")
      );
    }).length;

    // 2. Strict partition for the segmented progress bar (summing exactly to 100%)
    let partNotStarted = 0;
    let partActive = 0;
    let partBlocked = 0;
    let partCompleted = 0;

    iniciativas.forEach((i) => {
      const s = (i.status ?? "").toLowerCase();
      const hasImpedimento = !!(i.impedimento && i.impedimento.trim());

      if (
        s.includes("concluída") ||
        s === "concluido" ||
        s === "concluída" ||
        s.includes("conclui")
      ) {
        partCompleted++;
      } else if (
        s.includes("despriorizada") ||
        s.includes("cancelada") ||
        s.includes("com bloqueios") ||
        s.includes("bloqueio") ||
        s.includes("bloqueada") ||
        s.includes("suspenso") ||
        s.includes("impedido") ||
        hasImpedimento
      ) {
        partBlocked++;
      } else if (
        s === "não iniciada" ||
        s === "não iniciadas" ||
        s === "nao iniciada" ||
        s.includes("aguardando mapeamento")
      ) {
        partNotStarted++;
      } else {
        partActive++;
      }
    });

    // 3. Logical advance rules (Regra de avanço lógica)
    const getLogicalProgress = (i: Iniciativa) => {
      const s = (i.status ?? "").toLowerCase();
      if (s.includes("conclu")) return 100;
      if (
        s === "não iniciada" ||
        s === "não iniciadas" ||
        s === "nao iniciada" ||
        s.includes("aguardando mapeamento")
      )
        return 0;
      if (s.includes("cancelada") || s.includes("despriorizada")) return 0;

      let baseProgress = 0;
      if (s.includes("acompanhamento")) {
        baseProgress = 90;
      } else if (s.includes("validação") || s.includes("validacao")) {
        baseProgress = 75;
      } else if (s.includes("responsabilidade da área") || s.includes("responsabilidade da area")) {
        baseProgress = 50;
      } else if (s.includes("andamento") || s.includes("execução") || s.includes("execucao")) {
        baseProgress = 30;
      } else if (s.includes("desenvolvimento") || s.includes("sprint")) {
        baseProgress = 40;
      } else if (
        s.includes("diagnóstico") ||
        s.includes("diagnostico") ||
        s.includes("priorizada")
      ) {
        baseProgress = 15;
      }

      return Math.max(i.percentual_avanco ?? 0, baseProgress);
    };

    const sumAdvance = iniciativas.reduce((acc, curr) => acc + getLogicalProgress(curr), 0);
    const avgAdvance = sumAdvance / total;

    const notStartedPct = (partNotStarted / total) * 100;
    const activePct = (partActive / total) * 100;
    const blockedPct = (partBlocked / total) * 100;
    const completedPct = (partCompleted / total) * 100;

    return {
      total,
      notStarted,
      active,
      blocked,
      completed,
      avgAdvance,
      notStartedPct,
      activePct,
      blockedPct,
      completedPct,
    };
  }, [iniciativas]);

  // Handle Drag and Drop status change
  async function moveTo(it: Iniciativa, colStatus: string) {
    let newStatus = colStatus;
    if (colStatus === "Concluída") {
      const ps = prazoStatus(it.data_fim_prevista, null);
      newStatus = ps === "atrasada" ? "Concluída (Fora do Prazo)" : "Concluída (No Prazo)";
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const payload: any = { status: newStatus };
    if (colStatus === "Concluída") {
      payload.percentual_avanco = 100;
      payload.data_implantacao = new Date().toISOString().slice(0, 10);
    }
    const { error } = await supabase.from("iniciativas").update(payload).eq("id", it.id);
    if (error) return toast.error("Falha ao mover: " + error.message);
    await supabase.from("kanban_historico").insert({
      iniciativa_id: it.id,
      status_de: it.status,
      status_para: newStatus,
      movido_por: user?.id,
    });
    toast.success(`Movida para ${newStatus}`);
    qc.invalidateQueries({ queryKey: ["kanban-ini"] });
  }

  function onDragStart(e: DragEvent, it: Iniciativa) {
    e.dataTransfer.setData("application/json", JSON.stringify(it));
  }

  function onDrop(e: DragEvent, status: string) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;
    const it: Iniciativa = JSON.parse(raw);
    const currentCol = (it.status ?? "Backlog").startsWith("Concluída") ? "Concluída" : it.status;
    if (currentCol === status) return;
    moveTo(it, status);
  }

  // Dynamic columns computed from database picklist values
  const columns = useMemo(() => {
    if (!picklistVals || picklistVals.length === 0) {
      return DEFAULT_COLUMNS.map((c) => ({
        id: c.id,
        color: laneColors[c.id] || c.color,
        dbId: null,
      }));
    }

    const seen = new Set<string>();
    const list: { id: string; color: string; dbId: string | null }[] = [];

    picklistVals.forEach((v) => {
      const val = v.valor?.trim();
      if (!val || seen.has(val)) return;
      seen.add(val);

      const defaultCol = DEFAULT_COLUMNS.find((c) => c.id === val);
      const color = laneColors[val] || defaultCol?.color || "#94a3b8";
      list.push({
        id: val,
        color,
        dbId: v.id,
      });
    });

    if (laneOrder.length > 0) {
      list.sort((a, b) => {
        let idxA = laneOrder.indexOf(a.id);
        let idxB = laneOrder.indexOf(b.id);
        if (idxA === -1) idxA = 999;
        if (idxB === -1) idxB = 999;
        return idxA - idxB;
      });
    }

    return list;
  }, [picklistVals, laneColors, laneOrder]);

  // Active columns (excluding hidden ones)
  const visibleColumns = useMemo(() => {
    return columns.filter((col) => !hiddenLanes.includes(col.id));
  }, [columns, hiddenLanes]);

  // Floating scroll synchronization
  useEffect(() => {
    const grid = gridRef.current;
    const dummy = dummyScrollRef.current;
    if (!grid || !dummy) return;

    let isSyncingGrid = false;
    let isSyncingDummy = false;

    const handleGridScroll = () => {
      if (isSyncingDummy) return;
      isSyncingGrid = true;
      dummy.scrollLeft = grid.scrollLeft;
      isSyncingGrid = false;
    };

    const handleDummyScroll = () => {
      if (isSyncingGrid) return;
      isSyncingDummy = true;
      grid.scrollLeft = dummy.scrollLeft;
      isSyncingDummy = false;
    };

    grid.addEventListener("scroll", handleGridScroll);
    dummy.addEventListener("scroll", handleDummyScroll);

    // Initial sync
    dummy.scrollLeft = grid.scrollLeft;

    return () => {
      grid.removeEventListener("scroll", handleGridScroll);
      dummy.removeEventListener("scroll", handleDummyScroll);
    };
  }, [visibleColumns, laneWidth]);

  return (
    <div className="space-y-4">
      {/* Scrollbar styling override */}
      <style>{`
        .custom-kanban-grid::-webkit-scrollbar {
          height: 10px;
          width: 8px;
        }
        .custom-kanban-grid::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .custom-kanban-grid::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
          border: 2px solid #f1f5f9;
        }
        .custom-kanban-grid::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .custom-lane-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-lane-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-lane-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-lane-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      {/* 2. Global Project Progress Dashboard Panel */}
      <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-vibra-700" />
                <span>Andamento do Projeto</span>
              </h3>
              <span className="rounded-full bg-vibra-50 border border-vibra-100 px-2 py-0.5 text-[9px] font-extrabold text-vibra-800">
                {selectedProjetoIds ? "Filtro Ativo" : "Portfólio Completo"}
              </span>
            </div>

            {/* Elegant, thin multi-segment progress bar */}
            <div className="mt-2.5 flex items-center gap-3">
              <div className="relative flex-1 h-2 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                {globalStats.notStartedPct > 0 && (
                  <div
                    className="h-full bg-slate-400 transition-all duration-500"
                    style={{ width: `${globalStats.notStartedPct}%` }}
                    title={`Não Iniciadas: ${globalStats.notStartedPct.toFixed(0)}%`}
                  />
                )}
                {globalStats.activePct > 0 && (
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${globalStats.activePct}%` }}
                    title={`Em Andamento: ${globalStats.activePct.toFixed(0)}%`}
                  />
                )}
                {globalStats.blockedPct > 0 && (
                  <div
                    className="h-full bg-rose-500 transition-all duration-500"
                    style={{ width: `${globalStats.blockedPct}%` }}
                    title={`Bloqueadas: ${globalStats.blockedPct.toFixed(0)}%`}
                  />
                )}
                {globalStats.completedPct > 0 && (
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${globalStats.completedPct}%` }}
                    title={`Concluídas: ${globalStats.completedPct.toFixed(0)}%`}
                  />
                )}
              </div>
              <span className="text-[13px] font-black font-mono text-slate-800 w-12 text-right shrink-0">
                {globalStats.avgAdvance.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Thinner, elegant, highly scannable status scoreboards */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-slate-400" />
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none">
                  Não Iniciadas
                </p>
                <p className="text-[13px] font-black text-slate-800 leading-none mt-1">
                  {globalStats.notStarted}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none">
                  Em Andamento
                </p>
                <p className="text-[13px] font-black text-slate-800 leading-none mt-1">
                  {globalStats.active}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none">
                  Bloqueadas
                </p>
                <p className="text-[13px] font-black text-slate-800 leading-none mt-1">
                  {globalStats.blocked}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none">
                  Concluídas
                </p>
                <p className="text-[13px] font-black text-slate-800 leading-none mt-1">
                  {globalStats.completed}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-150 bg-slate-50/40 px-3 py-1">
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider leading-none">
                  Total
                </p>
                <p className="text-[13px] font-black text-slate-800 leading-none mt-1">
                  {globalStats.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Kanban Horizontal Board Grid */}
      <div
        ref={gridRef}
        className="flex gap-3 overflow-x-auto pb-2 items-start select-none min-h-[460px] custom-kanban-grid"
      >
        {visibleColumns.map((col) => {
          const items = sortedIniciativas.filter((i) => {
            const s = i.status ?? "Backlog";
            if (col.id === "Concluída") return s.startsWith("Concluída");
            return s === col.id;
          });

          const colDisplayName = customLaneNames[col.id] || col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, col.id)}
              className="flex flex-col rounded-xl border border-border bg-white shadow-vibra-sm shrink-0 transition-all duration-200 h-auto min-h-[400px] max-h-none"
              style={{ width: `${laneWidth}px` }}
            >
              {/* Lane Header with double-click & hover rename */}
              <div
                className="flex items-center justify-between border-b border-border px-3 py-2.5"
                style={{
                  borderTopColor: col.color,
                  borderTopWidth: 3,
                  borderTopStyle: "solid",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1 mr-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ background: col.color }}
                  />
                  {editingLaneId === col.id ? (
                    <input
                      type="text"
                      value={tempLaneName}
                      onChange={(e) => setTempLaneName(e.target.value)}
                      onBlur={() => handleSaveLaneName(col.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveLaneName(col.id);
                        if (e.key === "Escape") setEditingLaneId(null);
                      }}
                      className="rounded border border-vibra-500 bg-white px-1.5 py-0.5 text-[11px] font-bold text-vibra-950 w-full outline-none focus:ring-1 focus:ring-vibra-600"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-1 group/header min-w-0 flex-1">
                      <span
                        className="text-[11px] font-black uppercase tracking-wider text-vibra-800 truncate cursor-pointer hover:text-vibra-600 flex-1"
                        title="Dê duplo clique para renomear esta raia"
                        onDoubleClick={() => {
                          setEditingLaneId(col.id);
                          setTempLaneName(colDisplayName);
                        }}
                      >
                        {colDisplayName}
                      </span>
                      <button
                        onClick={() => {
                          setEditingLaneId(col.id);
                          setTempLaneName(colDisplayName);
                        }}
                        className="opacity-0 group-hover/header:opacity-100 p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-vibra-700 transition shrink-0"
                        title="Renomear raia"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="rounded-full bg-vibra-50 px-2 py-0.5 text-[9.5px] font-bold text-vibra-800 shrink-0 font-mono">
                  {items.length}
                </span>
              </div>

              {/* Lane Cards Container */}
              <div className="flex flex-col gap-2 p-2 overflow-visible bg-slate-50/30">
                {items.map((it) => {
                  const ps = prazoStatus(it.data_fim_prevista, it.status);
                  const badge = prazoBadge(ps);
                  const procColor = colorForId(it.projeto_id);
                  const procNome = procMap.get(it.projeto_id ?? "") ?? "—";

                  const myActions = acoes.filter((a) => a.iniciativa_id === it.id);
                  const pendingA = myActions.filter((a) => a.status !== "Concluída").slice(0, 2);

                  const myMicros = microprocessos.filter((m) => m.iniciativa_id === it.id);

                  // Highlights logic
                  const isBlocked = !!(it.impedimento && it.impedimento.trim());
                  const isDelayed = ps === "atrasada";

                  let cardBorderCls = "border-border";
                  let cardBgCls = "bg-white";
                  if (isBlocked) {
                    cardBorderCls =
                      "border-l-4 border-l-amber-500 border-t-border border-b-border border-r-border";
                    cardBgCls = "bg-amber-50/15";
                  }
                  if (isDelayed) {
                    cardBorderCls =
                      "border-l-4 border-l-red-500 border-t-border border-b-border border-r-border";
                    cardBgCls = isBlocked ? "bg-red-50/20 border-r-amber-500" : "bg-red-50/10";
                  }

                  return (
                    <article
                      key={it.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, it)}
                      onClick={() => setDrawerId(it.id)}
                      className={`group cursor-pointer overflow-hidden rounded-lg border ${cardBorderCls} ${cardBgCls} text-[12px] transition-all hover:border-vibra-600/40 hover:shadow-vibra-md animate-in fade-in duration-150`}
                    >
                      <div
                        className="h-1.5"
                        style={{ background: procColor }}
                        title={`Processo: ${procNome}`}
                      />

                      <div className="p-2.5">
                        {/* Highlights Indicators (Very visual) */}
                        {isBlocked && (
                          <div className="mb-2 rounded bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[9.5px] text-amber-800 font-extrabold flex items-center gap-1 animate-pulse">
                            <AlertTriangle className="h-3 w-3 text-amber-600 shrink-0" />
                            <span className="truncate">BLOQUEADA: {it.impedimento}</span>
                          </div>
                        )}
                        {isDelayed && (
                          <div className="mb-2 rounded bg-red-600/10 border border-red-500/20 px-2 py-1 text-[9.5px] text-red-700 font-extrabold flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 text-red-600 shrink-0" />
                            <span>ATRASADA / FORA DO PRAZO</span>
                          </div>
                        )}

                        {/* Header Details */}
                        {(cardFields.includes("codigo") || cardFields.includes("prazo")) && (
                          <div className="flex items-center justify-between gap-1.5 mb-1.5">
                            {cardFields.includes("codigo") ? (
                              <span className="font-mono text-[9px] font-black text-vibra-700 bg-vibra-50 border border-vibra-100/50 rounded px-1.5 py-0.5">
                                {it.codigo ?? "INI-—"}
                              </span>
                            ) : (
                              <span />
                            )}
                            {cardFields.includes("prazo") && (
                              <span
                                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${badge.cls}`}
                              >
                                {badge.label}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Title (Always visible) */}
                        <p className="font-bold leading-snug text-vibra-950 text-[12px] group-hover:text-vibra-700 transition line-clamp-2">
                          {it.titulo}
                        </p>

                        {/* Process Tag & Prioridade */}
                        <div className="mt-2 flex flex-wrap items-center gap-1">
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[9px] font-bold text-slate-800">
                            <Tag className="h-2.5 w-2.5 shrink-0" /> {procNome}
                          </span>
                          {cardFields.includes("prioridade") && (
                            <span className="rounded-full bg-orange-50 border border-orange-100 px-2 py-0.5 text-[9px] font-bold text-orange-700">
                              {it.prioridade || "Sem prioridade"}
                            </span>
                          )}
                        </div>

                        {/* Leader, Sponsor, Analyst responsible */}
                        {(cardFields.includes("lider") ||
                          cardFields.includes("sponsor") ||
                          cardFields.includes("analista")) && (
                          <div className="mt-2 space-y-1 text-[9.5px] text-slate-600 border-t border-dashed border-slate-100 pt-1.5">
                            {cardFields.includes("lider") && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-400">Líder:</span>
                                <span className="font-bold text-slate-700 truncate">
                                  {it.lider_id
                                    ? (profMap.get(it.lider_id) ?? it.lider_id)
                                    : "Não definido"}
                                </span>
                              </div>
                            )}
                            {cardFields.includes("sponsor") && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-400">Sponsor:</span>
                                <span className="font-bold text-slate-700 truncate">
                                  {it.sponsor_id
                                    ? (profMap.get(it.sponsor_id) ?? it.sponsor_id)
                                    : "Não definido"}
                                </span>
                              </div>
                            )}
                            {cardFields.includes("analista") && (
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-slate-400">Analista:</span>
                                <span className="font-bold text-slate-700 truncate">
                                  {it.analista_id
                                    ? (profMap.get(it.analista_id) ?? it.analista_id)
                                    : "Não definido"}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Automation potential */}
                        {cardFields.includes("potencial_automacao") && (
                          <div className="mt-2 text-[9.5px] text-slate-600">
                            <span className="font-semibold text-slate-400">Automação:</span>
                            <span className="ml-1 rounded bg-purple-50 text-purple-700 px-1 py-0.2 font-extrabold">
                              {it.potencial_automacao || "Não informada"}
                            </span>
                          </div>
                        )}

                        {/* Metrics Panel (HC, Effort, Impact) */}
                        {(cardFields.includes("hc") ||
                          cardFields.includes("esforco") ||
                          cardFields.includes("impacto")) && (
                          <div className="mt-2.5 grid grid-cols-3 gap-1 rounded bg-slate-50/70 p-1.5 text-[9px] text-muted-foreground border border-slate-100">
                            {cardFields.includes("hc") ? (
                              <span>
                                HC:{" "}
                                <strong className="text-vibra-900 font-black font-mono">
                                  {Number(it.hc_atual ?? 0).toFixed(1)}
                                </strong>
                              </span>
                            ) : (
                              <span />
                            )}
                            {cardFields.includes("esforco") ? (
                              <span>
                                Esf:{" "}
                                <strong className="text-vibra-900 font-black font-mono">
                                  {it.esforco ?? "—"}
                                </strong>
                              </span>
                            ) : (
                              <span />
                            )}
                            {cardFields.includes("impacto") ? (
                              <span>
                                Imp:{" "}
                                <strong className="text-vibra-900 font-black font-mono">
                                  {it.impacto_negocio ?? "—"}
                                </strong>
                              </span>
                            ) : (
                              <span />
                            )}
                          </div>
                        )}

                        {/* Progress Bar (Avanço Iniciativa) */}
                        {cardFields.includes("progresso_iniciativa") && (
                          <div className="mt-2.5">
                            <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                              <span className="font-semibold">Avanço Iniciativa</span>
                              <span className="font-black text-vibra-950 font-mono">
                                {Number(it.percentual_avanco ?? 0).toFixed(0)}%
                              </span>
                            </div>
                            <div className="mt-0.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-1.5 rounded-full bg-vibra-600 transition-all duration-300"
                                style={{
                                  width: `${Math.min(100, Number(it.percentual_avanco ?? 0))}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Microprocesses Progress list */}
                        {cardFields.includes("progresso_microprocessos") && (
                          <div className="mt-2.5 space-y-1.5 border-t border-border pt-2">
                            <p className="text-[8.5px] font-black uppercase tracking-wider text-muted-foreground">
                              Microprocessos {myMicros.length > 0 ? `(${myMicros.length})` : ""}
                            </p>
                            {myMicros.length > 0 ? (
                              <div className="space-y-1">
                                {myMicros.slice(0, 2).map((m) => {
                                  const pct = Math.min(100, Number(m.percentual_avanco ?? 0));
                                  const color = microStatusColor(m.status, pct);
                                  return (
                                    <div key={m.id}>
                                      <div className="flex items-center justify-between gap-1 text-[9px]">
                                        <span
                                          className="truncate text-slate-700 font-medium"
                                          title={m.titulo}
                                        >
                                          {m.titulo}
                                        </span>
                                        <span className="font-black text-slate-800 font-mono">
                                          {pct.toFixed(0)}%
                                        </span>
                                      </div>
                                      <div className="mt-0.5 h-1 rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                          className="h-1 rounded-full animate-pulse"
                                          style={{ width: `${pct}%`, background: color }}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                                {myMicros.length > 2 && (
                                  <p className="text-[8px] italic text-muted-foreground">
                                    +{myMicros.length - 2} outros microprocessos
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="text-[9px] text-slate-400 italic">
                                Nenhum microprocesso vinculado
                              </p>
                            )}
                          </div>
                        )}

                        {/* Actions lists (Tarefas) */}
                        {cardFields.includes("tarefas") && (
                          <div className="mt-2.5 space-y-1 border-t border-border pt-2">
                            <p className="text-[8.5px] font-black uppercase tracking-wider text-muted-foreground">
                              Ações Ativas {myActions.length > 0 ? `(${myActions.length})` : ""}
                            </p>
                            {myActions.length > 0 ? (
                              <>
                                {pendingA.map((a) => (
                                  <div
                                    key={a.id}
                                    className="flex items-center gap-1.5 text-[9.5px] text-slate-800 leading-snug"
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.status === "Concluída" ? "bg-emerald-500" : "bg-vibra-600 animate-pulse"}`}
                                    />
                                    <span className="truncate font-medium">{a.titulo}</span>
                                  </div>
                                ))}
                                {myActions.length > 2 && (
                                  <p className="text-[8px] italic text-muted-foreground">
                                    +{myActions.length - 2} ações adicionais
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-[9px] text-slate-400 italic">Nenhuma ação ativa</p>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
                {items.length === 0 && (
                  <div className="mt-12 text-center text-[10.5px] italic text-muted-foreground border-2 border-dashed border-slate-100 rounded-lg py-6 px-4">
                    Arraste cards para esta raia
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Horizontal Scrollbar & Nav Helper */}
      <div className="sticky bottom-0 left-0 right-0 z-30 w-full bg-white/95 backdrop-blur-sm border border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex flex-col rounded-xl overflow-hidden mt-2">
        {/* Navigation arrow buttons overlay helper */}
        <div className="flex items-center justify-between px-4 py-1.5 text-xs text-slate-500 font-bold border-b border-slate-100/50 bg-slate-50/50">
          <button
            type="button"
            onClick={() => {
              if (gridRef.current) gridRef.current.scrollBy({ left: -300, behavior: "smooth" });
            }}
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-black text-vibra-800 border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition"
          >
            ← Scroll Esquerda
          </button>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black">
            Navegação Horizontal Rápida
          </span>
          <button
            type="button"
            onClick={() => {
              if (gridRef.current) gridRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }}
            className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-black text-vibra-800 border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition"
          >
            Scroll Direita →
          </button>
        </div>
        {/* Syncing Scrollbar */}
        <div
          ref={dummyScrollRef}
          className="w-full overflow-x-auto py-1.5 px-4 custom-lane-scrollbar"
        >
          <div
            style={{
              width: `${visibleColumns.length * laneWidth + (visibleColumns.length - 1) * 12}px`,
              height: "6px",
            }}
          />
        </div>
      </div>

      {/* 1. Personalized Kanban Controls Bar at Bottom */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-vibra-sm sm:flex-row sm:items-center sm:justify-between mt-4">
        {/* Sliders and density switchers */}
        <div className="flex flex-wrap items-center gap-4 text-[11.5px] font-semibold text-slate-700">
          {/* Card Density Modes */}
          <div className="flex items-center gap-1 bg-muted p-0.5 rounded-lg border border-border">
            <button
              onClick={() => handleCardModeChange("compact")}
              className={`rounded px-2.5 py-1 text-[10.5px] font-bold transition flex items-center gap-1 ${cardMode === "compact" ? "bg-white text-vibra-800 shadow-sm" : "text-muted-foreground hover:text-slate-800"}`}
            >
              <Grid className="h-3 w-3" /> Compacto
            </button>
            <button
              onClick={() => handleCardModeChange("medium")}
              className={`rounded px-2.5 py-1 text-[10.5px] font-bold transition flex items-center gap-1 ${cardMode === "medium" ? "bg-white text-vibra-800 shadow-sm" : "text-muted-foreground hover:text-slate-800"}`}
            >
              <Layout className="h-3 w-3" /> Médio
            </button>
            <button
              onClick={() => handleCardModeChange("large")}
              className={`rounded px-2.5 py-1 text-[10.5px] font-bold transition flex items-center gap-1 ${cardMode === "large" ? "bg-white text-vibra-800 shadow-sm" : "text-muted-foreground hover:text-slate-800"}`}
            >
              <Sliders className="h-3 w-3" /> Expandido
            </button>
          </div>

          {/* Lane Resizing Slider */}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <span className="text-muted-foreground">Largura da raia:</span>
            <input
              type="range"
              min={240}
              max={450}
              step={10}
              value={laneWidth}
              onChange={(e) => handleLaneWidthChange(Number(e.target.value))}
              className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vibra-700"
            />
            <span className="text-muted-foreground font-bold font-mono">{laneWidth}px</span>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as any)}
              className="rounded-md border border-input bg-white px-2 py-1 text-[11px] outline-none font-bold"
            >
              <option value="recent">Recente</option>
              <option value="title">Título (A-Z)</option>
              <option value="progress">Progresso</option>
              <option value="priority">Prioridade</option>
            </select>
          </div>
        </div>

        {/* Action Button & Configuration Gear */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Lane & Card configuration gear dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowConfig(!showConfig)}
              title="Configurações do Kanban"
              className={`rounded-md p-2 border border-border bg-white text-slate-700 hover:bg-slate-50 transition flex items-center gap-1 text-[11.5px] font-bold ${showConfig ? "border-vibra-600 ring-2 ring-vibra-600/10 text-vibra-800" : ""}`}
            >
              <SettingsIcon className="h-4 w-4" />
              <span>Customizar Visualização</span>
            </button>

            {showConfig && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowConfig(false)} />
                <div className="absolute right-0 bottom-full mb-1.5 z-50 w-[92vw] sm:w-[480px] rounded-xl border border-border bg-white p-4 shadow-vibra-lg animate-in fade-in slide-in-from-bottom-1 duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Left Column: Raias */}
                    <div className="flex flex-col h-full">
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-vibra-800 border-b border-border pb-1.5 mb-2 flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" /> Raias Ativas
                      </h4>
                      <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1 custom-lane-scrollbar flex-1">
                        {columns.map((col) => {
                          const isHidden = hiddenLanes.includes(col.id);
                          return (
                            <div
                              key={col.id}
                              className="flex items-center justify-between rounded px-1.5 py-1 text-[11px] hover:bg-slate-50 text-slate-700 font-bold gap-1"
                            >
                              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                {/* Color dot + input picker */}
                                <div className="relative shrink-0 flex items-center">
                                  <span
                                    className="h-2.5 w-2.5 rounded-full cursor-pointer hover:scale-110 transition border border-slate-200"
                                    style={{ background: col.color }}
                                    title="Alterar cor"
                                    onClick={(e) => {
                                      const input = e.currentTarget
                                        .nextElementSibling as HTMLInputElement;
                                      if (input) input.click();
                                    }}
                                  />
                                  <input
                                    type="color"
                                    value={col.color}
                                    onChange={(e) => handleUpdateLaneColor(col.id, e.target.value)}
                                    className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
                                  />
                                </div>
                                <span className="truncate" title={col.id}>
                                  {col.id}
                                </span>
                              </div>

                              <div className="flex items-center gap-0.5 shrink-0">
                                {/* Move up/down buttons */}
                                <button
                                  type="button"
                                  onClick={() => handleMoveLane(col.id, "left")}
                                  className="p-0.5 hover:bg-slate-200 rounded text-slate-500 hover:text-vibra-800"
                                  title="Mover para esquerda"
                                >
                                  <ArrowUp className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveLane(col.id, "right")}
                                  className="p-0.5 hover:bg-slate-200 rounded text-slate-500 hover:text-vibra-800"
                                  title="Mover para direita"
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </button>

                                {/* Toggle visibility */}
                                <button
                                  type="button"
                                  onClick={() => toggleLaneVisibility(col.id)}
                                  className={`p-0.5 rounded ${isHidden ? "text-slate-400 hover:text-slate-600" : "text-vibra-600 hover:text-vibra-800"}`}
                                  title={isHidden ? "Exibir raia" : "Ocultar raia"}
                                >
                                  {isHidden ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </button>

                                {/* Delete Lane if it has dbId */}
                                {col.dbId && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteLane(col.id, col.dbId)}
                                    className="p-0.5 hover:bg-red-50 hover:text-red-600 rounded text-slate-400"
                                    title="Excluir raia"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add new Lane input directly inside configurations */}
                      <div className="mt-2 pt-2 border-t border-border">
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                          Nova Raia
                        </p>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            placeholder="Nome do novo status..."
                            value={newLaneName}
                            onChange={(e) => setNewLaneName(e.target.value)}
                            className="flex-1 rounded border border-border px-1.5 py-0.5 text-[10.5px] outline-none focus:border-vibra-600"
                          />
                          <button
                            type="button"
                            onClick={handleAddLane}
                            className="bg-vibra-700 hover:bg-vibra-800 text-white rounded px-2 py-0.5 text-[10.5px] font-bold shrink-0"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Card Fields */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-vibra-800 border-b border-border pb-1.5 mb-2 flex items-center gap-1">
                        <Sliders className="h-3.5 w-3.5" /> Campos do Card
                      </h4>
                      <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1 custom-lane-scrollbar">
                        {ALL_CARD_FIELDS.map((field) => {
                          const isChecked = cardFields.includes(field.id);
                          return (
                            <label
                              key={field.id}
                              className="flex items-center justify-between rounded px-1.5 py-1 text-[11px] hover:bg-slate-50 cursor-pointer text-slate-700 font-bold"
                            >
                              <span className="truncate" title={field.label}>
                                {field.label}
                              </span>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleCardField(field.id)}
                                className="rounded border-gray-300 text-vibra-600 focus:ring-vibra-600 shrink-0 ml-2"
                              />
                            </label>
                          );
                        })}
                      </div>
                      <div className="mt-2.5 border-t border-border pt-2 flex justify-between gap-2">
                        <button
                          onClick={() => {
                            const allIds = ALL_CARD_FIELDS.map((f) => f.id);
                            setCardFields(allIds);
                            savePreference("cardFields", allIds);
                          }}
                          className="text-[10px] font-black text-vibra-800 hover:underline"
                        >
                          Exibir todos
                        </button>
                        <button
                          onClick={() => {
                            setCardFields(["codigo", "progresso_iniciativa"]);
                            savePreference("cardFields", ["codigo", "progresso_iniciativa"]);
                          }}
                          className="text-[10px] font-black text-slate-500 hover:underline"
                        >
                          Limpar tudo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <InitiativeDrawer initiativeId={drawerId} onClose={() => setDrawerId(null)} />
    </div>
  );
}
