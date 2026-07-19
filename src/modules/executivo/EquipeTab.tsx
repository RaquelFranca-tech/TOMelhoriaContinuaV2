import { useMemo, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import {
  Columns3,
  Download,
  Grip,
  Plus,
  Trash2,
  X,
  LayoutGrid,
  Move,
  Building2,
  Award,
  Briefcase,
  Star,
  Terminal,
  Palette,
  Zap,
  Cpu,
  User,
  CheckCircle2,
  ListFilter,
  History,
  Sliders,
  Search,
  Settings as SettingsIcon,
} from "lucide-react";

const SYSTEM_FIELDS: { id: string; label: string; from: string }[] = [
  { id: "telefone", label: "Telefone", from: "profiles" },
  { id: "cargo", label: "Cargo", from: "profiles" },
  { id: "gerencia", label: "Gerência", from: "equipe" },
  { id: "macroprocesso", label: "Macroprocesso", from: "equipe" },
  { id: "alocacao", label: "% Alocação", from: "extras" },
  { id: "data_entrada", label: "Data de Entrada", from: "extras" },
  { id: "skills", label: "Skills", from: "extras" },
  { id: "senioridade", label: "Senioridade", from: "extras" },
  { id: "email_corporativo", label: "E-mail Corporativo", from: "extras" },
  { id: "localidade", label: "Localidade", from: "extras" },
];

const BASE_COLUMNS = [
  { id: "nome", label: "Nome" },
  { id: "diretoria", label: "Diretoria" },
  { id: "area", label: "Área" },
  { id: "papel", label: "Papel no Projeto" },
  { id: "projeto", label: "Projeto" },
  { id: "meta_mereo", label: "Meta Mereo" },
  { id: "total_horas_dedicadas", label: "Total de Horas Dedicadas" },
  { id: "horas_debitadas", label: "Horas Debitadas" },
  { id: "status", label: "Status" },
];
const DEFAULT_CARD_FIELDS = ["papel", "area", "diretoria", "status"];

const GROUP_OPTIONS = [
  { id: "diretoria", label: "Diretoria" },
  { id: "area", label: "Área" },
  { id: "papel", label: "Função / Papel" },
  { id: "projeto", label: "Projeto" },
  { id: "none", label: "Raia única" },
] as const;
type GroupBy = (typeof GROUP_OPTIONS)[number]["id"];

// Stable HSL color per diretoria/grupo
function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function colorForKey(k: string) {
  const h = hashStr(k || "—") % 360;
  return `hsl(${h} 65% 42%)`;
}

// Custom Role Avatar Helper
function getAvatarConfig(papel: string) {
  const p = (papel ?? "").toLowerCase().trim();

  if (
    p.includes("sponsor") ||
    p.includes("diretor") ||
    p.includes("executivo") ||
    p.includes("diretoria")
  ) {
    return { icon: Award, bg: "from-amber-400 to-orange-500 text-white", label: "Sponsor" };
  }
  if (
    p.includes("p.o.") ||
    p.includes("product owner") ||
    p.includes("gp") ||
    p.includes("gerente") ||
    p.includes("gestor")
  ) {
    return { icon: Briefcase, bg: "from-emerald-400 to-teal-500 text-white", label: "Gestor" };
  }
  if (
    p.includes("líder") ||
    p.includes("lider") ||
    p.includes("coordenador") ||
    p.includes("lead")
  ) {
    return { icon: Star, bg: "from-indigo-400 to-blue-500 text-white", label: "Líder" };
  }
  if (
    p.includes("dev") ||
    p.includes("desenvolvedor") ||
    p.includes("programador") ||
    p.includes("tech") ||
    p.includes("ti") ||
    p.includes("codificador")
  ) {
    return { icon: Terminal, bg: "from-slate-700 to-slate-900 text-white", label: "Dev" };
  }
  if (
    p.includes("design") ||
    p.includes("ux") ||
    p.includes("ui") ||
    p.includes("criativo") ||
    p.includes("artista")
  ) {
    return { icon: Palette, bg: "from-pink-400 to-rose-500 text-white", label: "Designer" };
  }
  if (
    p.includes("agilista") ||
    p.includes("scrum") ||
    p.includes("coach") ||
    p.includes("master")
  ) {
    return { icon: Zap, bg: "from-purple-400 to-indigo-500 text-white", label: "Agilista" };
  }
  if (
    p.includes("analista") ||
    p.includes("consultor") ||
    p.includes("assessor") ||
    p.includes("especialista")
  ) {
    return { icon: Cpu, bg: "from-violet-400 to-fuchsia-500 text-white", label: "Analista" };
  }
  return { icon: User, bg: "from-sky-400 to-blue-500 text-white", label: "Membro" };
}

export function EquipeTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const { projetoIds } = useHierarchy();
  const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
  const [openAdd, setOpenAdd] = useState(false);
  const [openCol, setOpenCol] = useState(false);
  const [showTabConfig, setShowTabConfig] = useState(false);
  const [cardFields, setCardFields] = useState<string[]>(DEFAULT_CARD_FIELDS);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(BASE_COLUMNS.map((c) => c.id));
  const [groupBy, setGroupBy] = useState<GroupBy>("projeto");
  const [dragging, setDragging] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<"grid" | "sandbox">("grid");
  const [pendingEdits, setPendingEdits] = useState<Record<string, Record<string, any>>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Filter and Sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDiretoria, setFilterDiretoria] = useState("");
  const [filterPapel, setFilterPapel] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterGerencia, setFilterGerencia] = useState("");
  const [sortBy, setSortBy] = useState<"nome" | "diretoria" | "papel" | "area" | "gerencia">(
    "nome",
  );

  // Debited Hours state
  const [debitMember, setDebitMember] = useState<any | null>(null);
  const [debitHoursInput, setDebitHoursInput] = useState("");
  const [debitReasonInput, setDebitReasonInput] = useState("");

  useRealtimeTable("equipe", [["equipe"]]);

  const { data: projetos = [] } = useQuery({
    queryKey: ["equipe-projetos"],
    queryFn: async () =>
      (await supabase.from("projetos").select("id,nome").is("deleted_at", null).order("nome"))
        .data ?? [],
  });
  const { data: customConfig } = useQuery({
    queryKey: ["equipe-columns-config"],
    queryFn: async () =>
      (
        await supabase
          .from("app_configuracoes")
          .select("valor")
          .eq("chave", "equipe_custom_columns")
          .maybeSingle()
      ).data,
  });
  const customColumns = useMemo(
    () => ((customConfig?.valor as any)?.columns ?? []) as { id: string; label: string }[],
    [customConfig],
  );
  const allColumns = [...BASE_COLUMNS, ...customColumns];

  const { data: rawEquipe = [] } = useQuery({
    queryKey: ["equipe"],
    queryFn: async () => {
      const { data } = await supabase.from("equipe").select("*").eq("ativo", true).order("ordem");
      return data ?? [];
    },
  });

  const { data: allTarefas = [] } = useQuery({
    queryKey: ["equipe-tarefas-for-dedicacao"],
    queryFn: async () =>
      (await supabase.from("tarefas").select("*").is("deleted_at", null)).data ?? [],
  });

  const { data: allAgendaParts = [] } = useQuery({
    queryKey: ["equipe-agenda-parts-for-dedicacao"],
    queryFn: async () => (await supabase.from("agenda_participantes").select("*")).data ?? [],
  });

  const { data: allAgenda = [] } = useQuery({
    queryKey: ["equipe-agenda-for-dedicacao"],
    queryFn: async () =>
      (await supabase.from("agenda").select("*").is("deleted_at", null)).data ?? [],
  });

  const { data: userRole = "visualizador" } = useQuery({
    queryKey: ["currentUserRole"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return "visualizador";
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.role || "visualizador";
    },
  });
  const isAdmin = userRole === "admin";

  const { data: iniciativas = [] } = useQuery({
    queryKey: ["equipe-iniciativas-for-dedicacao"],
    queryFn: async () =>
      (await supabase.from("iniciativas").select("id,projeto_id").is("deleted_at", null)).data ??
      [],
  });

  // Layout configurations loaded from app_configuracoes
  const { data: layoutConfigRes } = useQuery({
    queryKey: ["equipe-layout-config"],
    queryFn: async () =>
      (
        await supabase
          .from("app_configuracoes")
          .select("valor")
          .eq("chave", "equipe_layout_config")
          .maybeSingle()
      ).data,
  });

  const layoutConfig = useMemo(() => {
    return (layoutConfigRes?.valor as any) ?? { cardWidth: 290, cardHeight: 220 };
  }, [layoutConfigRes]);

  const [cardWidth, setCardWidth] = useState<number>(layoutConfig.cardWidth ?? 290);
  const [cardHeight, setCardHeight] = useState<number>(layoutConfig.cardHeight ?? 220);

  useEffect(() => {
    if (layoutConfigRes?.valor) {
      const v = layoutConfigRes.valor as any;
      if (v.cardWidth) setCardWidth(v.cardWidth);
      if (v.cardHeight) setCardHeight(v.cardHeight);
    }
  }, [layoutConfigRes]);

  async function saveLayoutConfig(w: number, h: number) {
    const { error } = await supabase
      .from("app_configuracoes")
      .upsert({ chave: "equipe_layout_config", valor: { cardWidth: w, cardHeight: h } } as any);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Configuração de layout salva e persistida!");
      qc.invalidateQueries({ queryKey: ["equipe-layout-config"] });
    }
  }

  const equipe = useMemo(() => {
    if (!selectedProjetoIds || selectedProjetoIds.length === 0) return rawEquipe;
    return rawEquipe.filter((m) => !m.projeto_id || selectedProjetoIds.includes(m.projeto_id));
  }, [rawEquipe, selectedProjetoIds]);

  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? [],
  });

  const profileMap = new Map(profiles.map((p) => [p.id, p]));
  const projetoMap = new Map(projetos.map((p) => [p.id, p.nome]));

  const memberInfo = (m: any) => {
    const p = profileMap.get(m.profile_id ?? "");
    const raw = String(m.papel_macroprocesso ?? "");
    const [nomeFallback, papelFallback] = raw.includes(" — ")
      ? raw.split(" — ", 2)
      : [undefined, raw];
    const extras = (m.extras ?? {}) as Record<string, any>;
    return {
      nome: extras.nome ?? p?.nome ?? p?.email ?? nomeFallback ?? "—",
      papel: papelFallback || raw || "—",
      status: extras.status ?? "Ativo",
      extras,
    };
  };

  const groupKey = (m: any) => {
    if (groupBy === "none") return "Equipe";
    if (groupBy === "projeto") return projetoMap.get(m.projeto_id ?? "") ?? "Sem projeto";
    if (groupBy === "diretoria") return m.diretoria || "Sem diretoria";
    if (groupBy === "papel") {
      const raw = String(m.papel_macroprocesso ?? "");
      const papel = raw.includes(" — ") ? raw.split(" — ", 2)[1] : raw;
      return papel || "Sem papel";
    }
    if (groupBy === "area") return m.area || "Sem área";
    if (groupBy === "gerencia") return m.gerencia || "Sem gerência";
    if (groupBy === "diretoria_projeto") {
      const p = projetoMap.get(m.projeto_id ?? "") ?? "Sem projeto";
      const d = m.diretoria || "Sem diretoria";
      return `${p} / ${d}`;
    }
    if (groupBy === "papel_projeto") {
      const p = projetoMap.get(m.projeto_id ?? "") ?? "Sem projeto";
      const raw = String(m.papel_macroprocesso ?? "");
      const papel = raw.includes(" — ") ? raw.split(" — ", 2)[1] : raw;
      return `${p} / ${papel || "Sem papel"}`;
    }
    return (m as any)[groupBy] ?? `Sem ${groupBy}`;
  };

  // Filter dynamic lists
  const uniqueDiretorias = useMemo(() => {
    const set = new Set(rawEquipe.map((m) => m.diretoria).filter(Boolean));
    return [...set].sort() as string[];
  }, [rawEquipe]);

  const uniquePapeis = useMemo(() => {
    const set = new Set(rawEquipe.map((m) => memberInfo(m).papel).filter(Boolean));
    return [...set].sort() as string[];
  }, [rawEquipe]);

  const uniqueAreas = useMemo(() => {
    const set = new Set(rawEquipe.map((m) => m.area).filter(Boolean));
    return [...set].sort() as string[];
  }, [rawEquipe]);

  const uniqueGerencias = useMemo(() => {
    const set = new Set(rawEquipe.map((m) => m.gerencia).filter(Boolean));
    return [...set].sort() as string[];
  }, [rawEquipe]);

  // Apply search, filters, and sortings
  const filteredAndSortedEquipe = useMemo(() => {
    let result = [...equipe];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((m) => {
        const info = memberInfo(m);
        return info.nome.toLowerCase().includes(term);
      });
    }

    if (filterDiretoria) {
      result = result.filter(
        (m) => (m.diretoria ?? "").toLowerCase().trim() === filterDiretoria.toLowerCase().trim(),
      );
    }

    if (filterPapel) {
      result = result.filter((m) => {
        const info = memberInfo(m);
        return info.papel.toLowerCase().trim() === filterPapel.toLowerCase().trim();
      });
    }

    if (filterArea) {
      result = result.filter(
        (m) => (m.area ?? "").toLowerCase().trim() === filterArea.toLowerCase().trim(),
      );
    }

    if (filterGerencia) {
      result = result.filter(
        (m) => (m.gerencia ?? "").toLowerCase().trim() === filterGerencia.toLowerCase().trim(),
      );
    }

    result.sort((a, b) => {
      let valA = "";
      let valB = "";

      if (sortBy === "nome") {
        valA = memberInfo(a).nome;
        valB = memberInfo(b).nome;
      } else if (sortBy === "papel") {
        valA = memberInfo(a).papel;
        valB = memberInfo(b).papel;
      } else {
        valA = (a as any)[sortBy] ?? "";
        valB = (b as any)[sortBy] ?? "";
      }

      return valA.localeCompare(valB, "pt", { sensitivity: "base" });
    });

    return result;
  }, [equipe, searchTerm, filterDiretoria, filterPapel, filterArea, filterGerencia, sortBy]);

  const byDir = new Map<string, typeof filteredAndSortedEquipe>();
  filteredAndSortedEquipe.forEach((m) => {
    const k = groupKey(m);
    if (!byDir.has(k)) byDir.set(k, []);
    byDir.get(k)!.push(m);
  });

  function getMemberDedication(member: any) {
    const info = memberInfo(member);
    const memberName = info.nome?.toLowerCase().trim();
    const memberProfId = member.profile_id;

    let totalHours = 0;

    // 1. Sum task hours
    for (const t of allTarefas) {
      if (selectedProjetoIds && selectedProjetoIds.length > 0) {
        const taskIni = t.iniciativa_id
          ? iniciativas.find((i: any) => i.id === t.iniciativa_id)
          : null;
        if (taskIni && !selectedProjetoIds.includes(taskIni.projeto_id)) {
          continue;
        }
      }

      const respId = t.responsavel_id;
      const isResp =
        (respId && respId === memberProfId) ||
        t.responsavel?.toLowerCase().trim() === memberName ||
        (respId && respId.toLowerCase().trim() === memberName);

      const participants = t.participantes ?? [];
      const isPart = participants.some((p: string) => p.toLowerCase().trim() === memberName);

      if (isResp) {
        totalHours += Number(t.horas_dedicadas ?? 0);
      } else if (isPart && t.tipo_tarefa !== "Agenda") {
        totalHours += Number(t.horas_dedicadas ?? 0) * 0.8;
      }
    }

    // 2. Sum meeting/agenda hours
    for (const ap of allAgendaParts) {
      if (ap.profile_id === memberProfId) {
        const agendaItem = allAgenda.find((a) => a.id === ap.agenda_id);
        if (agendaItem) {
          if (selectedProjetoIds && selectedProjetoIds.length > 0) {
            const agendaIni = agendaItem.iniciativa_id
              ? iniciativas.find((i: any) => i.id === agendaItem.iniciativa_id)
              : null;
            if (agendaIni && !selectedProjetoIds.includes(agendaIni.projeto_id)) {
              continue;
            }
          }
          totalHours += Number(ap.minutos_creditados ?? 0) / 60;
        }
      }
    }

    return totalHours;
  }

  function getMemberDebits(member: any) {
    const list = (member?.extras?.debitos ?? []) as any[];
    return list.reduce((acc, curr) => acc + Number(curr.horas ?? 0), 0);
  }

  function valueFor(m: any, col: string) {
    if (pendingEdits[m.id]?.[col] !== undefined) {
      return pendingEdits[m.id][col];
    }
    const info = memberInfo(m);
    if (col === "nome") return info.nome;
    if (col === "papel") return info.papel;
    if (col === "projeto") return projetoMap.get(m.projeto_id ?? "") ?? "—";
    if (col === "status") return info.status;
    if (col === "total_horas_dedicadas") return `${getMemberDedication(m).toFixed(1)} h`;
    if (col === "horas_debitadas") return `${getMemberDebits(m).toFixed(1)} h`;
    return (m as any)[col] ?? info.extras[col] ?? "—";
  }

  async function handleSaveAll() {
    setIsSaving(true);
    try {
      for (const [memberId, fields] of Object.entries(pendingEdits)) {
        const m = rawEquipe.find((x) => x.id === memberId);
        if (!m) continue;

        const updatePayload: any = {};
        const extrasPayload = { ...(m.extras ?? {}) };

        for (const [col, val] of Object.entries(fields)) {
          if (["diretoria", "area"].includes(col)) {
            updatePayload[col] = val || null;
          } else if (col === "papel") {
            updatePayload.papel_macroprocesso = `${valueForName(m)} — ${val}`;
          } else {
            extrasPayload[col] = val;
          }
        }

        updatePayload.extras = extrasPayload;

        const { error } = await supabase.from("equipe").update(updatePayload).eq("id", memberId);
        if (error) throw error;
      }
      toast.success("Todas as alterações foram salvas com sucesso!");
      setPendingEdits({});
      qc.invalidateQueries({ queryKey: ["equipe"] });
    } catch (err: any) {
      toast.error(`Erro ao salvar: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  }

  async function patch(id: string, p: any) {
    const { error } = await supabase.from("equipe").update(p).eq("id", id);
    if (error) toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["equipe"] });
  }

  async function remover(id: string) {
    await patch(id, { ativo: false });
  }

  async function adicionar(form: FormData) {
    const nome = String(form.get("nome") ?? "").trim();

    let projeto_id: string | null = form.get("projeto_id") as string;
    if (projeto_id === "" || !projeto_id) {
      projeto_id = null;
    }

    const { error } = await supabase.from("equipe").insert({
      profile_id: (form.get("profile_id") as string) || null,
      projeto_id,
      diretoria: form.get("diretoria") as string,
      area: form.get("area") as string,
      papel_macroprocesso: `${nome || "Pessoa"} — ${form.get("papel") as string}`,
      extras: { nome, status: form.get("status") || "Ativo" },
      ativo: true,
      card_x: 0,
      card_y: 0,
    } as any);
    if (error) return toast.error(error.message);
    toast.success("Pessoa adicionada");
    setOpenAdd(false);
    qc.invalidateQueries({ queryKey: ["equipe"] });
  }

  async function addColumnSystem(field: { id: string; label: string }) {
    const next = [...customColumns.filter((c) => c.id !== field.id), field];
    await supabase
      .from("app_configuracoes")
      .upsert({ chave: "equipe_custom_columns", valor: { columns: next } } as any);
    setVisibleColumns((cols) => [...new Set([...cols, field.id])]);
    qc.invalidateQueries({ queryKey: ["equipe-columns-config"] });
    toast.success(`Coluna “${field.label}” adicionada`);
  }

  async function addColumnCustom(label: string) {
    if (!label.trim()) return;
    const id = label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
    await addColumnSystem({ id, label });
  }

  function exportCSV() {
    const cols = allColumns.filter((c) => visibleColumns.includes(c.id));
    const csv = [
      cols.map((c) => c.label).join(";"),
      ...equipe.map((m) =>
        cols.map((c) => `"${String(valueFor(m, c.id)).replaceAll('"', '""')}"`).join(";"),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "equipe.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900 font-sans">
            Equipe de Trabalho · Personas
          </h3>
          <p className="text-[12px] text-slate-500 mt-0.5 font-medium">
            {selectedProjetoIds
              ? `${filteredAndSortedEquipe.length} integrante(s) no projeto selecionado`
              : `${filteredAndSortedEquipe.length} integrante(s) em todos os projetos`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Layout Mode Switcher */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setLayoutMode("grid")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-bold transition-all ${layoutMode === "grid" ? "bg-white text-vibra-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              title="Visualização em Grade (Sem cortes de texto)"
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Grade Fluida
            </button>
            <button
              onClick={() => setLayoutMode("sandbox")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-bold transition-all ${layoutMode === "sandbox" ? "bg-white text-vibra-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              title="Quadro de Distribuição (Arrastável)"
            >
              <Move className="h-3.5 w-3.5" /> Organizador
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowTabConfig(!showTabConfig)}
              className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors ${showTabConfig ? "border-vibra-600 ring-2 ring-vibra-600/10 text-vibra-800" : ""}`}
            >
              <SettingsIcon className="h-4 w-4 text-slate-500" /> Customizar Visualização
            </button>
            {showTabConfig && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowTabConfig(false)} />
                <div className="absolute right-0 mt-1.5 z-50 w-[92vw] sm:w-[480px] rounded-xl border border-border bg-white p-4 shadow-vibra-lg animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldPicker
                      title="Campos nos cards"
                      columns={allColumns}
                      values={cardFields}
                      setValues={setCardFields}
                    />
                    <FieldPicker
                      title="Colunas da tabela"
                      columns={allColumns}
                      values={visibleColumns}
                      setValues={setVisibleColumns}
                    />
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                        <ListFilter className="h-3.5 w-3.5" /> Agrupar por
                      </p>
                      <select
                        value={groupBy}
                        onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-bold text-slate-700 outline-none focus:border-vibra-600"
                      >
                        {GROUP_OPTIONS.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 text-[11px] font-semibold text-slate-600">
                      <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                        <Sliders className="h-3.5 w-3.5 text-vibra-700" /> Tamanho do Card
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span>Largura: {cardWidth}px</span>
                        <input
                          type="range"
                          min={240}
                          max={360}
                          value={cardWidth}
                          onChange={(e) => setCardWidth(Number(e.target.value))}
                          className="h-1 accent-vibra-700 cursor-pointer rounded bg-slate-200 w-24"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span>Altura: {cardHeight}px</span>
                        <input
                          type="range"
                          min={180}
                          max={300}
                          value={cardHeight}
                          onChange={(e) => setCardHeight(Number(e.target.value))}
                          className="h-1 accent-vibra-700 cursor-pointer rounded bg-slate-200 w-24"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => saveLayoutConfig(cardWidth, cardHeight)}
                        className="w-full mt-1.5 rounded bg-vibra-700 py-1 text-[10px] font-extrabold text-white hover:bg-vibra-800 transition"
                      >
                        Salvar Config. para Todos
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="h-4 w-4 text-slate-500" /> Exportar CSV
          </button>
          <button
            onClick={() => setOpenCol(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Columns3 className="h-4 w-4 text-slate-500" /> Nova Coluna
          </button>
          {Object.keys(pendingEdits).length > 0 && (
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-[12px] font-extrabold text-white hover:bg-emerald-700 transition-all shadow-sm animate-pulse"
            >
              💾 Salvar ({Object.keys(pendingEdits).length} alterações)
            </button>
          )}
          <button
            onClick={() => setOpenAdd(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-vibra-700 px-3.5 py-1.5 text-[12px] font-bold text-white hover:bg-vibra-800 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" /> Nova Pessoa
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-6">
        {/* Filters and Search Bar */}
        <div className="grid gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50/50 md:grid-cols-5 text-[11.5px]">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-2 outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/10"
            />
          </div>

          <div>
            <select
              value={filterDiretoria}
              onChange={(e) => setFilterDiretoria(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600"
            >
              <option value="">Diretoria: Todas</option>
              {uniqueDiretorias.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterPapel}
              onChange={(e) => setFilterPapel(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600"
            >
              <option value="">Papel: Todos</option>
              {uniquePapeis.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600"
            >
              <option value="">Área: Todas</option>
              {uniqueAreas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterGerencia}
              onChange={(e) => setFilterGerencia(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-vibra-600"
            >
              <option value="">Gerência: Todas</option>
              {uniqueGerencias.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sorting Bar and Reset filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11.5px] border-b border-slate-50 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold uppercase text-[9.5px] tracking-wider">
              Ordenar por:
            </span>
            <div className="flex gap-1">
              {(["nome", "diretoria", "papel", "area", "gerencia"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSortBy(opt)}
                  className={`rounded px-2.5 py-1 font-bold border transition-all ${
                    sortBy === opt
                      ? "bg-vibra-700 border-vibra-800 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt === "nome"
                    ? "Ordem Alfabética"
                    : opt === "diretoria"
                      ? "Diretoria"
                      : opt === "papel"
                        ? "Papel / Função"
                        : opt === "area"
                          ? "Área"
                          : "Gerência"}
                </button>
              ))}
            </div>
          </div>

          {(searchTerm || filterDiretoria || filterPapel || filterArea || filterGerencia) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterDiretoria("");
                setFilterPapel("");
                setFilterArea("");
                setFilterGerencia("");
              }}
              className="rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 font-bold transition-all"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        <div className="space-y-6">
          {[...byDir.entries()].map(([dir, mems]) => {
            const accent = colorForKey(dir);
            return (
              <section
                key={dir}
                className="rounded-2xl border border-slate-100 bg-slate-50/20 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[12px] font-bold text-white shadow-sm"
                    style={{ background: accent }}
                  >
                    <span className="h-2 w-2 rounded-full bg-white/95 animate-pulse" /> {dir}
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-extrabold">
                      {mems.length}
                    </span>
                  </div>
                </div>

                {layoutMode === "grid" ? (
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
                    }}
                  >
                    {mems.map((m, idx) => (
                      <PersonaCard
                        key={m.id}
                        m={m}
                        idx={idx}
                        fields={cardFields}
                        valueFor={valueFor}
                        memberInfo={memberInfo}
                        accent={colorForKey(m.diretoria ?? "—")}
                        layoutMode="grid"
                        onRemove={() => remover(m.id)}
                        dedicationHours={getMemberDedication(m)}
                        onManageDebits={() => setDebitMember(m)}
                        getMemberDebits={getMemberDebits}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="relative min-h-[440px] rounded-xl border border-dashed border-slate-200 bg-white/80 p-3 transition-colors duration-200 hover:bg-slate-50/40"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      if (!dragging) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      patch(dragging, {
                        card_x: Math.max(0, Math.round(e.clientX - rect.left - 140)),
                        card_y: Math.max(0, Math.round(e.clientY - rect.top - 60)),
                      });
                      setDragging(null);
                    }}
                  >
                    {mems.map((m, idx) => (
                      <PersonaCard
                        key={m.id}
                        m={m}
                        idx={idx}
                        fields={cardFields}
                        valueFor={valueFor}
                        memberInfo={memberInfo}
                        accent={colorForKey(m.diretoria ?? "—")}
                        layoutMode="sandbox"
                        onDrag={() => setDragging(m.id)}
                        onRemove={() => remover(m.id)}
                        dedicationHours={getMemberDedication(m)}
                        onManageDebits={() => setDebitMember(m)}
                        getMemberDebits={getMemberDebits}
                        cardWidth={cardWidth}
                        cardHeight={cardHeight}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
          {byDir.size === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-[12.5px] text-slate-400 font-medium">
              Nenhum integrante encontrado para os filtros ativos.
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
          <h4 className="text-[12.5px] font-bold text-slate-800">Tabela Geral da Equipe</h4>
        </div>
        <table className="min-w-[980px] w-full text-[12.5px]">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10.5px] uppercase tracking-wider font-extrabold text-slate-500">
            <tr>
              {allColumns
                .filter((c) => visibleColumns.includes(c.id))
                .map((c) => (
                  <th key={c.id} className="px-4 py-3.5 text-left font-sans">
                    {c.label}
                  </th>
                ))}
              <th className="px-4 py-3.5 text-left font-sans">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAndSortedEquipe.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                {allColumns
                  .filter((c) => visibleColumns.includes(c.id))
                  .map((c) => (
                    <td key={c.id} className="px-4 py-3 text-slate-700">
                      <EditableCell
                        m={m}
                        col={c.id}
                        value={valueFor(m, c.id)}
                        onChange={(newVal: any) => {
                          setPendingEdits((prev) => ({
                            ...prev,
                            [m.id]: {
                              ...(prev[m.id] ?? {}),
                              [c.id]: newVal,
                            },
                          }));
                        }}
                      />
                    </td>
                  ))}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setDebitMember(m)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-rose-600 transition-all"
                      title="Gerenciar Débitos"
                    >
                      <History className="h-4 w-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (
                          await confirm("Remover pessoa?", "Deseja realmente remover esta pessoa?")
                        )
                          remover(m.id);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                      title="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Debited Hours Management Modal */}
      {debitMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setDebitMember(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div>
                <h3 className="text-[15px] font-bold text-slate-800 font-sans">
                  Débitos — {memberInfo(debitMember).nome}
                </h3>
                <p className="text-[11.5px] text-slate-500 font-semibold mt-0.5">
                  Saldo de Débitos:{" "}
                  <span className="font-bold text-rose-600">
                    -{getMemberDebits(debitMember).toFixed(1)} h
                  </span>
                </p>
              </div>
              <button
                onClick={() => setDebitMember(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form to Add New Debit */}
            {isAdmin ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const hours = Number(debitHoursInput);
                  if (!hours || hours <= 0)
                    return toast.error("Por favor, digite um número de horas válido.");
                  if (!debitReasonInput.trim())
                    return toast.error("Por favor, informe o motivo do débito.");

                  const newDebit = {
                    id: Date.now().toString(),
                    horas: hours,
                    motivo: debitReasonInput.trim(),
                    data: new Date().toISOString(),
                  };

                  const currentExtras = debitMember.extras ?? {};
                  const currentDebitos = currentExtras.debitos ?? [];
                  const updatedExtras = {
                    ...currentExtras,
                    debitos: [...currentDebitos, newDebit],
                  };

                  await patch(debitMember.id, { extras: updatedExtras });
                  toast.success("Horas debitadas com sucesso!");
                  setDebitHoursInput("");
                  setDebitReasonInput("");
                  setDebitMember({ ...debitMember, extras: updatedExtras });
                }}
                className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                  Registrar Novo Débito
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Horas
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={debitHoursInput}
                      onChange={(e) => setDebitHoursInput(e.target.value)}
                      required
                      placeholder="Ex: 2.0"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Motivo
                    </label>
                    <input
                      type="text"
                      value={debitReasonInput}
                      onChange={(e) => setDebitReasonInput(e.target.value)}
                      required
                      placeholder="Ex: Ausência na reunião"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] outline-none focus:border-vibra-600"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-rose-600 py-1.5 text-[11.5px] font-extrabold text-white hover:bg-rose-700 transition-colors shadow-sm"
                >
                  Gravar Débito
                </button>
              </form>
            ) : (
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-[11px] text-blue-700 font-semibold text-center">
                ℹ️ Visualização restrita. Apenas administradores podem registrar novos débitos ou
                excluir do histórico.
              </div>
            )}

            {/* History of Debits with detailed delete */}
            <div className="space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                <History className="h-3.5 w-3.5" /> Histórico de Débitos
              </p>
              <div className="max-h-[160px] overflow-y-auto space-y-1.5 pr-1 text-[11px]">
                {((debitMember.extras?.debitos ?? []) as any[]).map((d: any) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 break-words whitespace-normal">
                        {d.motivo}
                      </p>
                      <p className="text-[9.5px] text-slate-400 font-bold mt-0.5">
                        {new Date(d.data).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-extrabold text-rose-600">
                        -{Number(d.horas).toFixed(1)} h
                      </span>
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={async () => {
                            if (
                              await confirm(
                                "Remover débito?",
                                "Deseja excluir este débito do histórico?",
                              )
                            ) {
                              const filtered = (debitMember.extras.debitos ?? []).filter(
                                (x: any) => x.id !== d.id,
                              );
                              const updatedExtras = { ...debitMember.extras, debitos: filtered };
                              await patch(debitMember.id, { extras: updatedExtras });
                              toast.success("Débito removido!");
                              setDebitMember({ ...debitMember, extras: updatedExtras });
                            }
                          }}
                          className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-red-500 transition-all"
                          title="Remover débito"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(!debitMember.extras?.debitos || debitMember.extras.debitos.length === 0) && (
                  <p className="text-[11px] italic text-slate-400 text-center py-4">
                    Nenhum débito registrado para esta pessoa.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {openAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setOpenAdd(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              adicionar(new FormData(e.currentTarget));
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-[15px] font-bold text-slate-800">Nova Pessoa na Equipe</h3>
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Nome Completo
                </label>
                <input
                  name="nome"
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/10"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Perfil vinculado
                </label>
                <select
                  name="profile_id"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                >
                  <option value="">Sem vínculo</option>
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome ?? p.email}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Projeto
                </label>
                <select
                  name="projeto_id"
                  defaultValue={selectedProjetoIds?.[0] ?? ""}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                >
                  <option value="">Sem projeto</option>
                  {projetos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Diretoria
                  </label>
                  <input
                    name="diretoria"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Área
                  </label>
                  <input
                    name="area"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Papel no Projeto
                </label>
                <input
                  name="papel"
                  placeholder="Ex: Sponsor, P.O., Analista, Lider..."
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Status
                </label>
                <input
                  name="status"
                  defaultValue="Ativo"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-50 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-[12px] font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-bold text-white hover:bg-vibra-800 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      )}

      {openCol && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={() => setOpenCol(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-[15px] font-bold text-slate-800">Adicionar Nova Coluna</h3>
              <button
                onClick={() => setOpenCol(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-vibra-700">
              Campos do sistema disponíveis
            </p>
            <div className="grid max-h-[220px] grid-cols-2 gap-2 overflow-y-auto pr-1">
              {SYSTEM_FIELDS.map((f) => {
                const used = customColumns.some((c) => c.id === f.id);
                return (
                  <button
                    key={f.id}
                    disabled={used}
                    onClick={() => {
                      addColumnSystem(f);
                      setOpenCol(false);
                    }}
                    className={`rounded-xl border p-2.5 text-left transition-all ${used ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400" : "border-slate-200 bg-white text-slate-700 hover:border-vibra-600 hover:bg-vibra-50/50"}`}
                  >
                    <span className="block text-[11.5px] font-bold">{f.label}</span>
                    <span className="text-[9.5px] text-slate-400 mt-0.5">de {f.from}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-widest text-vibra-700 pt-2 border-t border-slate-50">
              Ou criar uma coluna personalizada
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                addColumnCustom(String(fd.get("label") ?? ""));
                setOpenCol(false);
              }}
              className="flex gap-2"
            >
              <input
                name="label"
                required
                placeholder="Ex: Metas, Observações..."
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
              />
              <button
                type="submit"
                className="rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-bold text-white hover:bg-vibra-800"
              >
                Criar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldPicker({ title, columns, values, setValues }: any) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">{title}</p>
      <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto p-1 border border-slate-50 rounded-lg bg-slate-50/30">
        {columns.map((c: any) => {
          const active = values.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                setValues(active ? values.filter((v: string) => v !== c.id) : [...values, c.id])
              }
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold transition-all ${
                active
                  ? "bg-vibra-100 border-vibra-300 text-vibra-800 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {active && <CheckCircle2 className="h-3.5 w-3.5 text-vibra-600 shrink-0" />}
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PersonaCard({
  m,
  idx,
  fields,
  valueFor,
  memberInfo,
  accent,
  layoutMode = "grid",
  onDrag,
  onRemove,
  dedicationHours = 0,
  onManageDebits,
  getMemberDebits,
  cardWidth = 290,
  cardHeight = 220,
}: any) {
  const confirm = useConfirm();
  const info = memberInfo(m);
  const avatar = getAvatarConfig(info.papel);
  const AvatarIcon = avatar.icon;
  const stripe = accent ?? "#044317";

  const statusColor = /ativ/i.test(info.status)
    ? "bg-emerald-500"
    : /inativ/i.test(info.status)
      ? "bg-rose-500"
      : /férias|licen/i.test(info.status)
        ? "bg-amber-500"
        : "bg-blue-500";

  const totalDebits = getMemberDebits(m);

  // Draggable Absolute Coordinates
  const left = Number(m.card_x ?? (idx % 4) * (cardWidth + 12) + 8);
  const top = Number(m.card_y ?? Math.floor(idx / 4) * (cardHeight + 12) + 8);

  const isSandbox = layoutMode === "sandbox";

  return (
    <article
      draggable={isSandbox}
      onDragStart={isSandbox ? onDrag : undefined}
      style={
        isSandbox
          ? {
              left,
              top,
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              borderLeft: `4px solid ${stripe}`,
            }
          : { borderLeft: `4px solid ${stripe}` }
      }
      className={`${
        isSandbox ? "absolute cursor-move" : "relative w-full"
      } flex flex-col justify-between overflow-hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md`}
    >
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatar & Status indicator bolinha */}
            <div className="relative shrink-0">
              <div
                className={`grid h-10 w-10 place-content-center rounded-full bg-gradient-to-br ${avatar.bg} text-white shadow-sm ring-1 ring-slate-100`}
              >
                <AvatarIcon className="h-4.5 w-4.5" />
              </div>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${statusColor}`}
                title={`Status: ${info.status}`}
              />
            </div>

            <div className="min-w-0">
              <h4
                className="text-[13px] font-extrabold text-slate-800 leading-tight break-words whitespace-normal font-sans"
                title={info.nome}
              >
                {info.nome}
              </h4>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                {m.diretoria || "Sem Diretoria"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {isSandbox && <Grip className="h-3.5 w-3.5 text-slate-300 cursor-grab" />}
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                if (await confirm("Remover integrante?", `Deseja realmente remover ${info.nome}?`))
                  onRemove();
              }}
              className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              title="Remover"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Info Rows */}
        <div className="space-y-1 text-[11px] border-t border-slate-50 pt-2 font-medium text-slate-600">
          <div className="flex items-start justify-between gap-1">
            <span className="text-slate-400 font-bold uppercase text-[8.5px] tracking-wider shrink-0 mt-0.5">
              Papel:
            </span>
            <span className="text-slate-800 font-semibold text-right leading-tight break-words whitespace-normal">
              {info.papel}
            </span>
          </div>
          {m.area && (
            <div className="flex items-start justify-between gap-1">
              <span className="text-slate-400 font-bold uppercase text-[8.5px] tracking-wider shrink-0 mt-0.5">
                Área:
              </span>
              <span className="text-slate-800 text-right leading-tight break-words whitespace-normal">
                {m.area}
              </span>
            </div>
          )}
          {m.gerencia && (
            <div className="flex items-start justify-between gap-1">
              <span className="text-slate-400 font-bold uppercase text-[8.5px] tracking-wider shrink-0 mt-0.5">
                Gerência:
              </span>
              <span className="text-slate-800 text-right leading-tight break-words whitespace-normal">
                {m.gerencia}
              </span>
            </div>
          )}

          {/* Dedicação field */}
          <div className="flex items-center justify-between gap-1 bg-vibra-50/50 px-2 py-0.5 rounded border border-vibra-100/50 mt-1">
            <span className="text-vibra-800 font-bold uppercase text-[8.5px] tracking-wider">
              Dedicação:
            </span>
            <span className="text-vibra-900 font-bold font-mono">
              {dedicationHours.toFixed(1)} h
            </span>
          </div>

          {/* Horas Debitadas admin control */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onManageDebits();
            }}
            className="flex items-center justify-between gap-1 bg-rose-50/50 border border-rose-100/50 hover:border-rose-300 hover:bg-rose-50/70 px-2 py-0.5 rounded mt-1 cursor-pointer transition-colors"
            title="Clique para gerenciar horas debitadas"
          >
            <span className="text-rose-700 font-bold uppercase text-[8.5px] tracking-wider flex items-center gap-1">
              <History className="h-3 w-3" /> Débitos:
            </span>
            <span className="text-rose-800 font-bold font-mono">-{totalDebits.toFixed(1)} h</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function EditableCell({ m, col, value, onChange }: any) {
  const [v, setV] = useState(value === "—" ? "" : value);

  useEffect(() => {
    setV(value === "—" ? "" : value);
  }, [value]);

  if (["nome", "projeto", "total_horas_dedicadas", "horas_debitadas"].includes(col)) {
    return <span className="font-medium text-slate-800">{value}</span>;
  }

  return (
    <input
      value={v}
      onChange={(e) => {
        setV(e.target.value);
        onChange(e.target.value);
      }}
      className="w-full rounded border border-slate-200 bg-white/50 px-2 py-1 outline-none focus:border-vibra-600 focus:bg-white text-[12px] font-medium"
    />
  );
}

function valueForName(m: any) {
  const raw = String(m.papel_macroprocesso ?? "");
  return raw.includes(" — ") ? raw.split(" — ", 1)[0] : (m.extras?.nome ?? "Pessoa");
}
