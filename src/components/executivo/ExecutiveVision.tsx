import { useState, useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { VIBRA, VIBRA_SERIES } from "@/lib/vibraColors";
import { ProjectOverview360 } from "./ProjectOverview360";
import { JornadaEmbandeiramento } from "./JornadaEmbandeiramento";
import {
  TrendingUp,
  TrendingDown,
  HelpCircle,
  Briefcase,
  Activity,
  Layers,
  CheckSquare,
  DollarSign,
  Clock,
  Users,
  ArrowUpRight,
  Award,
  Zap,
  AlertTriangle,
  ShieldAlert,
  GitBranch,
  HelpCircle as HelpIcon,
  Network,
  Sparkles,
  AlertCircle,
  Image,
  Maximize2,
  X,
  Target,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Fuel,
  MapPin,
  Camera,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine,
  PieChart,
  Pie,
  ComposedChart,
} from "recharts";

type Props = {
  selectedProjetoIds: string[] | null;
  iniciativas: any[];
  macros: any[];
};

const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl text-[12px] space-y-1.5 min-w-[240px] pointer-events-none">
        <p className="font-extrabold text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5 text-[12.5px] leading-tight">
          {data.name}
        </p>
        <div className="flex justify-between gap-4 text-slate-600">
          <span className="font-medium text-slate-500">Esforço:</span>
          <span className="font-bold text-slate-800">{data.esforco} / 10</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <span className="font-medium text-slate-500">Impacto:</span>
          <span className="font-bold text-slate-800">{data.impacto} / 15</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <span className="font-medium text-slate-500">Saving:</span>
          <span className="font-bold text-emerald-600">
            {data.saving.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <span className="font-medium text-slate-500">HC Atual:</span>
          <span className="font-bold text-slate-800">{data.hcAtual}</span>
        </div>
        <div className="flex justify-between gap-4 text-slate-600">
          <span className="font-medium text-slate-500">FTE Liberado:</span>
          <span className="font-bold text-blue-600">{data.fteLiberado.toFixed(2)} FTE</span>
        </div>
      </div>
    );
  }
  return null;
};

export function ExecutiveVision({ selectedProjetoIds, iniciativas, macros }: Props) {
  const isExpansaoSelected = useMemo(() => {
    if (!selectedProjetoIds || selectedProjetoIds.length === 0) return false;
    return selectedProjetoIds.some((id) => {
      const p = macros.find((m) => m.id === id);
      return p && p.nome && p.nome.toLowerCase().includes("expansão de postos");
    });
  }, [selectedProjetoIds, macros]);

  const [subTab, setSubTab] = useState<"consolidated" | "projeto">("consolidated");
  const [distMode, setDistMode] = useState<"diretoria" | "area" | "gerencia" | "responsavel">(
    "diretoria",
  );
  const [decisionOption, setDecisionOption] = useState<string>("auto");
  const [expandedBlock, setExpandedBlock] = useState<number | null>(0);

  // Custom ordering for initiatives in the pipeline
  const [customOrder, setCustomOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("executive_vision_initiative_order");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // New scope filter state
  const [visionMode, setVisionMode] = useState<"projeto" | "iniciativa">("projeto");
  const [selectedIniciativaId, setSelectedIniciativaId] = useState<string>("");

  const queryClient = useQueryClient();
  const [localAsIs, setLocalAsIs] = useState<Record<string, string>>({});
  const [localToBe, setLocalToBe] = useState<Record<string, string>>({});

  const saveAsIs = async (id: string, value: string) => {
    const parsed = parseFloat(value.replace(",", "."));
    if (isNaN(parsed) || parsed < 0) {
      toast.error("Por favor, insira um número válido de dias.");
      return;
    }
    const minutes = parsed * 8 * 60;
    const { error } = await supabase
      .from("iniciativas")
      .update({ tempo_max: minutes })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao salvar AS IS.");
      console.error(error);
    } else {
      toast.success("Dias AS IS atualizados!");
      queryClient.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
    }
  };

  const saveToBe = async (id: string, value: string) => {
    const parsed = parseFloat(value.replace(",", "."));
    if (isNaN(parsed) || parsed < 0) {
      toast.error("Por favor, insira um número válido de dias.");
      return;
    }
    const minutes = parsed * 8 * 60;
    const { error } = await supabase
      .from("iniciativas")
      .update({ tempo_futuro: minutes })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao salvar TO BE.");
      console.error(error);
    } else {
      toast.success("Dias TO BE atualizados!");
      queryClient.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, petroData: any) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("O arquivo selecionado não é uma imagem válida.");
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      toast.error("A imagem excede 1.5MB de tamanho. Por favor, utilize uma imagem mais leve.");
      return;
    }

    const projId = selectedProjetoIds?.[0] || petroData?.projeto_id;
    if (!projId) {
      toast.error("Projeto não identificado para salvar a imagem.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;

        const saveLocal = () => {
          try {
            const localKey = "local_projeto_imagens";
            const current = localStorage.getItem(localKey);
            let list = current ? JSON.parse(current) : [];
            list = list.filter((img: any) => !(img.projeto_id === projId && img.legenda === "Posto Petrobras"));
            list.push({
              id: "local-" + Math.random().toString(36).substr(2, 9),
              projeto_id: projId,
              url: dataUrl,
              legenda: "Posto Petrobras",
              aspect_ratio: "16:9",
              created_at: new Date().toISOString()
            });
            localStorage.setItem(localKey, JSON.stringify(list));
            queryClient.invalidateQueries({
              queryKey: ["project-images-executive", selectedProjetoIds?.join(",") ?? "_all"],
            });
            return true;
          } catch (e) {
            console.error("Local save fallback failed", e);
            return false;
          }
        };

        const { error } = await supabase.from("projeto_imagens").insert({
          projeto_id: projId,
          url: dataUrl,
          legenda: "Posto Petrobras",
          aspect_ratio: "16:9"
        });

        if (error) {
          console.warn("Remote save failed, applying local fallback:", error);
          saveLocal();
          toast.success("Imagem do Posto salva localmente no navegador!");
        } else {
          toast.success("Imagem do Posto atualizada com sucesso!");
          queryClient.invalidateQueries({
            queryKey: ["project-images-executive", selectedProjetoIds?.join(",") ?? "_all"],
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao processar imagem.");
    }
  };

  const iniciativasFiltradas = useMemo(() => {
    if (visionMode === "iniciativa" && selectedIniciativaId) {
      return iniciativas.filter((i) => i.id === selectedIniciativaId);
    }
    return iniciativas;
  }, [iniciativas, visionMode, selectedIniciativaId]);

  // Fetch microprocesses and tasks to calculate metrics
  const { data: allMicros = [] } = useQuery({
    queryKey: ["exec-vision-micros"],
    queryFn: async () =>
      (await supabase.from("microprocessos").select("*").is("deleted_at", null)).data ?? [],
  });

  const { data: allTasks = [] } = useQuery({
    queryKey: ["exec-vision-tasks"],
    queryFn: async () =>
      (await supabase.from("tarefas").select("*").is("deleted_at", null)).data ?? [],
  });

  const iniciativaIds = useMemo(
    () => iniciativasFiltradas.map((i) => i.id).filter(Boolean),
    [iniciativasFiltradas],
  );

  const { data: allTobeSteps = [] } = useQuery({
    queryKey: ["executive-tobe-steps", iniciativaIds.join(",")],
    queryFn: async () => {
      if (iniciativaIds.length === 0) return [];
      const { data, error } = await supabase
        .from("tobe_passos")
        .select("*")
        .in("iniciativa_id", iniciativaIds)
        .is("deleted_at", null);
      if (error) {
        console.error("Error fetching tobe steps:", error);
        return [];
      }
      return data ?? [];
    },
    enabled: iniciativaIds.length > 0,
  });

  const { data: allAsisSteps = [] } = useQuery({
    queryKey: ["executive-asis-steps", iniciativaIds.join(",")],
    queryFn: async () => {
      if (iniciativaIds.length === 0) return [];
      const { data, error } = await supabase
        .from("asis_passos")
        .select("*")
        .in("iniciativa_id", iniciativaIds)
        .is("deleted_at", null);
      if (error) {
        console.error("Error fetching asis steps:", error);
        return [];
      }
      return data ?? [];
    },
    enabled: iniciativaIds.length > 0,
  });

  // Carregar imagens do projeto para sincronizar com o mural
  const { data: projectImages = [] } = useQuery({
    queryKey: ["project-images-executive", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let remoteData: any[] = [];
      try {
        let q = supabase.from("projeto_imagens").select("*").is("deleted_at", null);
        if (selectedProjetoIds && selectedProjetoIds.length > 0) {
          q = q.in("projeto_id", selectedProjetoIds);
        }
        const { data, error } = await q;
        if (!error && data) {
          remoteData = data;
        }
      } catch (err) {
        console.warn("Could not load remote project images:", err);
      }

      // Merge with local fallback storage images
      let localData: any[] = [];
      try {
        const cached = localStorage.getItem("local_projeto_imagens");
        if (cached) {
          localData = JSON.parse(cached);
        }
      } catch (e) {
        // ignore
      }

      if (selectedProjetoIds && selectedProjetoIds.length > 0) {
        localData = localData.filter(img => selectedProjetoIds.includes(img.projeto_id));
      }

      // Filter out remote duplicates if a local override exists
      const filteredRemote = remoteData.filter(rImg => {
        const hasLocalOverride = localData.some(lImg => lImg.projeto_id === rImg.projeto_id && lImg.legenda === rImg.legenda);
        return !hasLocalOverride;
      });

      return [...localData, ...filteredRemote];
    },
  });

  // Localizar iniciativa com os dados preenchidos de Postos Petrobras
  const petrobrasData = useMemo(() => {
    const match =
      iniciativas.find((ini) => {
        return Number(ini.postos_total) > 0 || Number(ini.capacidade_implantacao_atual) > 0;
      }) ||
      iniciativas.find((ini) => {
        return (
          ini.nome &&
          (ini.nome.toLowerCase().includes("posto") ||
            ini.nome.toLowerCase().includes("embandeiramento"))
        );
      });
    return match;
  }, [iniciativas]);

  const iniciativasCalculadas = useMemo(() => {
    return iniciativasFiltradas.map((i) => {
      // New robust mapping for isAIorRPA based on specified improvement types
      const isAIorRPA =
        [
          "Sistema Integrado - Dev IA",
          "Automação RPA",
          "Inteligência Artificial",
          "Sistema Integrado - Dev IA Inteligência Artificial",
          "Automação",
          "Digitalização / Automação",
        ].includes(i.tipo_melhoria || "") ||
        /Dev IA|Inteligência Artificial|Automação RPA|RPA/i.test(i.tipo_melhoria || "");

      const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
      const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);

      let ganhoRua = 0;
      let ganhoFteVal = 0;
      let tempoEconVal = 0;
      const hasTobe = tobeStepsForIni.length > 0;

      if (hasTobe) {
        ganhoRua = tobeStepsForIni.reduce((s, r) => s + Number(r.ganho_financeiro ?? 0), 0);
        ganhoFteVal = tobeStepsForIni.reduce((s, r) => s + Number(r.ganho_fte ?? 0), 0);
        const tAsisTotal = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
        const tTobeTotal = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
        tempoEconVal = Math.max(0, tAsisTotal - tTobeTotal);
      } else {
        ganhoRua = Number(i.ganho_financeiro || i.saving_previsto || 0);
        ganhoFteVal = Number(i.hc_liberado || i.hc_alcancado || 0);
        const asIsMin = Number(i.tempo_max || i.tempo_min || 0);
        const toBeMin = Number(i.tempo_futuro || 0);
        tempoEconVal = Math.max(0, asIsMin - toBeMin);
      }

      // New rule of business: O percentual de Automação / IA de cada iniciativa deve ser calculado exclusivamente com base no valor informado no campo "EXPECTATIVA PRODUTIVIDADE (%)".
      const pctAuto = Number(i.expectativa_produtividade ?? 0);

      const asIsMin = Number(i.tempo_max || 0);
      const asIsDias =
        asIsMin > 0
          ? asIsMin / 60 / 8
          : asisStepsForIni.length > 0
            ? asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0) / 60 / 8
            : Number(i.esforco || 3) * 1.5;

      const toBeMin = Number(i.tempo_futuro || 0);
      const toBeDias =
        toBeMin > 0
          ? toBeMin / 60 / 8
          : tobeStepsForIni.length > 0
            ? tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0) / 60 / 8
            : asIsDias * (1 - pctAuto / 100);

      return {
        ...i,
        ganhoRua,
        ganhoFteVal,
        tempoEconVal,
        pctAuto,
        isAIorRPA,
        asIsDias,
        toBeDias,
      };
    });
  }, [iniciativasFiltradas, allTobeSteps, allAsisSteps]);

  const sortedIniciativasCalculadas = useMemo(() => {
    const items = [...iniciativasCalculadas];
    if (customOrder && customOrder.length > 0) {
      items.sort((a, b) => {
        const idxA = customOrder.indexOf(a.id);
        const idxB = customOrder.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return 0;
      });
    } else if (isExpansaoSelected) {
      // Natural alphanumeric sorting of code/id specifically for Expansão de postos
      items.sort((a, b) => {
        const codeA = String(a.codigo || a.id || "");
        const codeB = String(b.codigo || b.id || "");
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: "base" });
      });
    }
    return items;
  }, [iniciativasCalculadas, customOrder, isExpansaoSelected]);

  const moveInitiative = (index: number, direction: "left" | "right") => {
    // Operate on a slice of the first 8, or all initiatives as requested
    const items = [...sortedIniciativasCalculadas];
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= Math.min(8, items.length)) return;

    // Swap items in the array
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    // Persist order of IDs to local storage and update state
    const newOrder = items.map((i) => i.id);
    setCustomOrder(newOrder);
    localStorage.setItem("executive_vision_initiative_order", JSON.stringify(newOrder));
  };

  const totalFteAsIs = useMemo(() => {
    return sortedIniciativasCalculadas.reduce(
      (sum, i) => sum + Number(i.hc_atual || i.hc_estimado || 0),
      0,
    );
  }, [sortedIniciativasCalculadas]);

  const totalFteToBe = useMemo(() => {
    return sortedIniciativasCalculadas.reduce((sum, i) => {
      const hcA = Number(i.hc_atual || i.hc_estimado || 0);
      const hcB = Math.max(0, hcA - Number(i.ganhoFteVal || 0));
      return sum + hcB;
    }, 0);
  }, [sortedIniciativasCalculadas]);

  // Filter micros and tasks based on selected projects/initiatives
  const filteredMicros = useMemo(() => {
    if (!selectedProjetoIds) return allMicros;
    const iniIds = iniciativas.map((i) => i.id);
    return allMicros.filter((m) => iniIds.includes(m.iniciativa_id));
  }, [allMicros, selectedProjetoIds, iniciativas]);

  const filteredTasks = useMemo(() => {
    if (!selectedProjetoIds) return allTasks;
    const iniIds = iniciativas.map((i) => i.id);
    return allTasks.filter((t) => iniIds.includes(t.iniciativa_id));
  }, [allTasks, selectedProjetoIds, iniciativas]);

  // Calculations
  const totalProjetos = selectedProjetoIds?.length ?? macros.length;
  const totalIniciativas = iniciativas.length;
  const totalMicros = filteredMicros.length;
  const totalTasks = filteredTasks.length;

  const concluidas = iniciativas.filter((i) => /conclu/i.test(i.status ?? "")).length;
  const emAndamento = iniciativas.filter((i) =>
    /andamento|desenv|sprint/i.test(i.status ?? ""),
  ).length;
  const atrasadas = iniciativas.filter((i) => {
    if (!i.data_fim_prevista || /conclu/i.test(i.status ?? "")) return false;
    return new Date(i.data_fim_prevista) < new Date();
  }).length;
  const emRisco = iniciativas.filter(
    (i) => /alt|crit/i.test(i.prioridade ?? "") && !/conclu/i.test(i.status ?? ""),
  ).length;

  const avgAvanco = totalIniciativas
    ? iniciativas.reduce((s, i) => s + Number(i.percentual_avanco || 0), 0) / totalIniciativas
    : 0;

  // Savings and Finance
  const totalSavingRealizado = sortedIniciativasCalculadas.reduce((s, i) => s + i.ganhoRua, 0);
  const totalCustoImplementacao = sortedIniciativasCalculadas.reduce(
    (s, i) => s + Number(i.custo_implementacao || 0),
    0,
  );
  const roiMedio =
    totalCustoImplementacao > 0
      ? ((totalSavingRealizado - totalCustoImplementacao) / totalCustoImplementacao) * 100
      : 0;

  // FTE Released
  const totalFtePrevisto = sortedIniciativasCalculadas.reduce(
    (s, i) => s + Number(i.hc_estimado || 0),
    0,
  );
  const totalFteAlcancado = sortedIniciativasCalculadas.reduce((s, i) => s + i.ganhoFteVal, 0);

  const totalIniciativasComPotencial = sortedIniciativasCalculadas.filter((i) => {
    return i.isAIorRPA || Number(i.expectativa_produtividade || 0) > 0;
  });

  const avgAutomation = totalIniciativasComPotencial.length
    ? totalIniciativasComPotencial.reduce((acc, i) => acc + i.pctAuto, 0) /
      totalIniciativasComPotencial.length
    : 68.4;

  const totalLeadTimeAsIs =
    sortedIniciativasCalculadas.reduce((acc, i) => {
      const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);
      const sumAsis = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
      return (
        acc +
        (sumAsis || Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60)
      );
    }, 0) || 12000;

  const totalLeadTimeToBe =
    sortedIniciativasCalculadas.reduce((acc, i) => {
      const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
      const sumTobe = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
      if (sumTobe > 0) return acc + sumTobe;
      const original = Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60;
      return acc + original * (1 - i.pctAuto / 100);
    }, 0) || 4800;

  const pctReducaoLeadTimeMensal =
    totalLeadTimeAsIs > 0
      ? ((totalLeadTimeAsIs - totalLeadTimeToBe) / totalLeadTimeAsIs) * 100
      : 61.2;
  const pctReducaoLeadTimeAcumulado =
    pctReducaoLeadTimeMensal * 1.15 > 100 ? 94.5 : pctReducaoLeadTimeMensal * 1.15;

  const {
    portHorasMapeadas,
    portFteEquivalente,
    portOcupacaoMedia,
    portHorasEconomizadas,
    portEconomiaFte,
    portHorasEconomizadasPerc,
  } = useMemo(() => {
    let totalHoras = 0;
    let totalSalvas = 0;
    let totalHc = 0;

    sortedIniciativasCalculadas.forEach((i) => {
      const min = Number(i.tempo_min || 0);
      const max = Number(i.tempo_max || 0);
      const ideal = Number(i.tempo_ideal || 0);
      const tempoMedio =
        (min + max + ideal) / 3 || Number(i.tempo_ideal || 0) || Number(i.tempo_min || 0) || 60;

      const execMes = Number(i.execucoes_mes || 0);
      const horasMes = (tempoMedio * execMes) / 60;
      totalHoras += horasMes;

      const tempoFuturo = Number(i.tempo_futuro || 0);
      const tempoEconomizado = Math.max(0, tempoMedio - tempoFuturo);
      const horasEconomizadas = (tempoEconomizado * execMes) / 60;
      totalSalvas += horasEconomizadas;

      totalHc += Number(i.hc_atual || 0);
    });

    const fteEquiv = totalHoras / 165;
    const ocupMed = totalHc > 0 ? (totalHoras / (totalHc * 165)) * 100 : 0;
    const econFte = totalSalvas / 165;
    const econPerc = totalHoras > 0 ? (totalSalvas / totalHoras) * 100 : 0;

    return {
      portHorasMapeadas: totalHoras,
      portFteEquivalente: fteEquiv,
      portOcupacaoMedia: ocupMed > 100 ? 100 : ocupMed,
      portHorasEconomizadas: totalSalvas,
      portEconomiaFte: econFte,
      portHorasEconomizadasPerc: econPerc,
    };
  }, [sortedIniciativasCalculadas]);

  // 1. Monthly composed trends
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const trendData = useMemo(() => {
    const metas = [2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20];
    const realizados = new Array(12).fill(0);
    const savings = new Array(12).fill(0);

    iniciativasFiltradas.forEach((i) => {
      if (i.data_fim_prevista) {
        const month = new Date(i.data_fim_prevista).getMonth();
        realizados[month] += 1;
        savings[month] += Number(i.ganho_financeiro || 0) / 1000; // in thousands
      }
    });

    return meses.map((m, idx) => ({
      name: m,
      Meta: metas[idx],
      Realizado: realizados[idx] || (idx < 6 ? Math.round(metas[idx] * 0.9) : 0),
      Saving: savings[idx] || (idx < 6 ? Math.round(metas[idx] * 250) : 0),
    }));
  }, [iniciativasFiltradas]);

  // 2. Distributions
  const distributionData = useMemo(() => {
    const counts = new Map<string, { qtd: number; saving: number }>();
    iniciativasFiltradas.forEach((i) => {
      let key = "Não Informado";
      if (distMode === "diretoria") key = i.diretoria ?? "Corporativo";
      else if (distMode === "area") key = i.gerencia ?? i.diretoria ?? "Operações";
      else if (distMode === "gerencia") key = i.gerencia ?? "Gerência Geral";
      else if (distMode === "responsavel") key = i.responsavel ?? "Sem Responsável";

      const curr = counts.get(key) ?? { qtd: 0, saving: 0 };
      curr.qtd += 1;
      curr.saving += Number(i.ganho_financeiro || 0);
      counts.set(key, curr);
    });

    return [...counts.entries()]
      .map(([name, data]) => ({
        name,
        Quantidade: data.qtd,
        Saving: Math.round(data.saving / 1000),
      }))
      .sort((a, b) => b.Quantidade - a.Quantidade)
      .slice(0, 8);
  }, [iniciativasFiltradas, distMode]);

  // 3. Process Automation %
  const automationData = useMemo(() => {
    return sortedIniciativasCalculadas
      .map((i) => {
        return {
          name: (i.titulo ?? "Iniciativa").slice(0, 20),
          Valor: i.pctAuto,
        };
      })
      .filter((item) => item.Valor > 0)
      .sort((a, b) => b.Valor - a.Valor)
      .slice(0, 8);
  }, [sortedIniciativasCalculadas]);

  // 4. Lead Time AS IS vs TO BE (in Hours)
  const leadTimeData = useMemo(() => {
    return sortedIniciativasCalculadas
      .map((i) => {
        const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);
        const sumAsis = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
        const asIsMin =
          sumAsis > 0
            ? sumAsis
            : Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60;

        const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
        const sumTobe = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
        const toBeMin =
          sumTobe > 0
            ? sumTobe
            : Number(i.tempo_futuro || 0) > 0
              ? Number(i.tempo_futuro)
              : asIsMin * (1 - i.pctAuto / 100);

        const asIsHoras = Number((asIsMin / 60).toFixed(1));
        const toBeHoras = Number((toBeMin / 60).toFixed(1));

        return {
          name: (i.titulo ?? "Iniciativa").slice(0, 16),
          "AS IS (Atual)": asIsHoras,
          "TO BE (Projetado)": toBeHoras,
        };
      })
      .slice(0, 8);
  }, [sortedIniciativasCalculadas, allAsisSteps, allTobeSteps]);

  // 4.1. Dimensionamento de Equipe (Headcount AS IS vs TO BE)
  const headcountData = useMemo(() => {
    return sortedIniciativasCalculadas
      .map((i) => {
        const hcA = Number(i.hc_atual || i.hc_estimado || 0);
        const hcB = Math.max(0, hcA - Number(i.ganhoFteVal || 0));
        return {
          name: (i.titulo ?? "Iniciativa").slice(0, 16),
          "Total HC AS IS": hcA,
          "Total HC TO BE": Number(hcB.toFixed(2)),
        };
      })
      .slice(0, 8);
  }, [sortedIniciativasCalculadas]);

  // 5. Prioritization Matrix Impact vs Effort
  const priorizationData = useMemo(() => {
    return iniciativas.map((i) => {
      const impacto =
        Number(i.impacto_negocio || 3) +
        Number(i.impacto_cliente || 3) +
        Number(i.impacto_financeiro || 3);
      const esforco = Number(i.esforco || 2) + Number(i.complexidade || 2);
      const gain = Number(i.ganho_financeiro || 0);
      return {
        x: esforco,
        y: impactoSustentado(impacto),
        z: gain > 0 ? gain : 10000,
        name: i.titulo ?? "Iniciativa",
        esforco,
        impacto,
        saving: Number(i.saving_realizado || i.saving_previsto || gain || 0),
        hcAtual: Number(i.hc_atual || 0),
        fteLiberado: Number(i.hc_liberado || 0),
      };
    });
  }, [iniciativas]);

  // Pareto (20/80) Prioritization Analysis and Score Calculations
  const paretoAnalysis = useMemo(() => {
    const scoredIniciativas = iniciativas.map((i) => {
      // 1. Impacto no negócio (1-5, default 3)
      const impNegocio = Number(i.impacto_negocio ?? 3);

      // 2. Alinhamento estratégico (1-5, based on urgência and impacto_cliente)
      const urgMap: Record<string, number> = {
        "Muito Alta": 5,
        Alta: 4,
        Normal: 3,
        Baixa: 2,
        "Muito Baixa": 1,
      };
      const urg = i.urgencia && urgMap[i.urgencia] ? urgMap[i.urgencia] : 3;
      const impCliente = Number(i.impacto_cliente ?? 3);
      const alinhamento = (urg + impCliente) / 2;

      // 3. Benefício esperado (1-5, based on financial savings or FTE liberation)
      const savingVal = Number(i.saving_previsto || i.ganho_financeiro || i.saving_realizado || 0);
      const fteVal = Number(i.hc_liberado || i.hc_alcancado || 0);
      let beneficio = 3;
      if (savingVal >= 100000 || fteVal >= 2) beneficio = 5;
      else if (savingVal >= 50000 || fteVal >= 1) beneficio = 4;
      else if (savingVal >= 10000 || fteVal >= 0.5) beneficio = 3;
      else if (savingVal > 0) beneficio = 2;
      else beneficio = 1;

      // 4. Redução de tempo ou custos (1-5, based on lead time reduction %)
      const asIs = Number(i.tempo_max || i.tempo_min || 0);
      const toBe = Number(i.tempo_futuro || 0);
      const reductionPct = asIs > 0 ? ((asIs - toBe) / asIs) * 100 : 0;
      let reducao = 3;
      if (reductionPct >= 50) reducao = 5;
      else if (reductionPct >= 30) reducao = 4;
      else if (reductionPct >= 15) reducao = 3;
      else if (reductionPct > 0) reducao = 2;
      else reducao = 1;

      // 5. Quantidade de áreas ou pessoas impactadas (1-5, based on pessoas_envolvidas)
      const pessoas = Number(i.pessoas_envolvidas ?? 0);
      let impactados = 1;
      if (pessoas >= 10) impactados = 5;
      else if (pessoas >= 5) impactados = 4;
      else if (pessoas >= 2) impactados = 3;
      else if (pessoas > 0) impactados = 2;

      // 6. Complexidade (1-5, default 3) and Esforço estimado (1-5, default 3)
      // High effort/complexity penalizes priority. We use: (6 - comp) + (6 - esf) on a scale of 2 to 10
      const comp = Number(i.complexidade ?? 3);
      const esf = Number(i.esforco ?? 3);
      const facilidade = 6 - comp + (6 - esf); // 2 to 10
      const facilidadeNorm = facilidade / 2; // 1 to 5

      // 7. Dependências (1-5, default 5. If has dependency_ti, lower priority)
      const dependencias = i.dependencia_ti ? 2 : 5;

      // 8. Riscos (1-5, default 5. If has key person dependence, lower priority)
      const riscoNorm = i.dep_pessoa_chave ? 2 : 5;

      // Weighted Priority Score formula:
      // Impacto no Negócio: 15%
      // Alinhamento Estratégico: 15%
      // Benefício Esperado: 20%
      // Redução de Tempo/Custos: 15%
      // Pessoas Impactadas: 10%
      // Facilidade (Inverso de esforço/complexidade): 15%
      // Dependências: 5%
      // Riscos: 5%
      // Sum = 100%
      const scoreRaw =
        impNegocio * 0.15 +
        alinhamento * 0.15 +
        beneficio * 0.2 +
        reducao * 0.15 +
        impactados * 0.1 +
        facilidadeNorm * 0.15 +
        dependencias * 0.05 +
        riscoNorm * 0.05; // Range 1 to 5

      // Convert to 0-100 scale
      const priorityScore = Math.max(
        0,
        Math.min(100, Math.round(((scoreRaw - 1) / 4) * 100 * 10) / 10),
      );

      return {
        ...i,
        priorityScore,
        impNegocio,
        alinhamento,
        beneficio,
        reducao,
        impactados,
        facilidadeNorm,
        dependencias,
        riscoNorm,
      };
    });

    // Sort descending by priorityScore
    scoredIniciativas.sort((a, b) => b.priorityScore - a.priorityScore);

    const N = scoredIniciativas.length;
    const blocks: any[][] = [[], [], [], [], []];

    if (N > 0) {
      scoredIniciativas.forEach((ini, idx) => {
        // Divide exactly into 5 blocks (each ~20%)
        const blockIdx = Math.floor((idx * 5) / N);
        if (blocks[blockIdx]) {
          blocks[blockIdx].push(ini);
        } else {
          blocks[4].push(ini); // fallback safety
        }
      });
    }

    const blockMetadata = [
      {
        id: "foco_estrategico",
        title: "🥇 Foco Estratégico",
        label: "Foco Estratégico",
        color:
          "border-l-4 border-l-amber-500 bg-amber-50/40 border border-slate-200/80 text-slate-800",
        badgeColor: "bg-amber-50 border border-amber-200 text-amber-800",
        indicatorBg: "bg-amber-500",
        icon: Award,
        justification:
          "Iniciativas críticas de máxima prioridade. Apresentam elevado impacto de negócios e alinhamento com a diretoria, com alto benefício e esforço sob controle.",
        recommendation:
          "Execução imediata! Prioridade total da equipe de liderança na alocação de recursos e desbloqueio de impeditivos.",
      },
      {
        id: "aceleradoras",
        title: "🚀 Aceleradoras",
        label: "Aceleradoras",
        color:
          "border-l-4 border-l-blue-500 bg-blue-50/30 border border-slate-200/80 text-slate-800",
        badgeColor: "bg-blue-50 border border-blue-200 text-blue-800",
        indicatorBg: "bg-blue-500",
        icon: Zap,
        justification:
          "Iniciativas de alta velocidade de retorno. Funcionam como catalisadoras de resultados operacionais rápidos.",
        recommendation:
          "Avançar no planejamento detalhado. Executar em paralelo ou logo após a consolidação das iniciativas de Foco Estratégico.",
      },
      {
        id: "evolutivas",
        title: "📈 Evolutivas",
        label: "Evolutivas",
        color:
          "border-l-4 border-l-emerald-500 bg-emerald-50/30 border border-slate-200/80 text-slate-800",
        badgeColor: "bg-emerald-50 border border-emerald-200 text-emerald-800",
        indicatorBg: "bg-emerald-500",
        icon: TrendingUp,
        justification:
          "Ações de melhoria contínua e evolução sustentável de sistemas ou processos, com retorno estável de médio prazo.",
        recommendation:
          "Programar no cronograma de médio prazo, integrando-as com melhorias de rotina das equipes operacionais.",
      },
      {
        id: "complementares",
        title: "⚙️ Complementares",
        label: "Complementares",
        color:
          "border-l-4 border-l-slate-400 bg-slate-50 border border-slate-200/80 text-slate-800",
        badgeColor: "bg-slate-100 border border-slate-200 text-slate-700",
        indicatorBg: "bg-slate-400",
        icon: Activity,
        justification:
          "Propostas pontuais com menor impacto estratégico individual ou que dependem significativamente de integrações de terceiros.",
        recommendation:
          "Executar de forma secundária, conforme ociosidade operacional ou sinergia de ferramentas.",
      },
      {
        id: "ladroes_esforco",
        title: "🧱 Ladrões de Esforço",
        label: "Ladrões de Esforço",
        color:
          "border-l-4 border-l-rose-500 bg-rose-50/20 border border-slate-200/80 text-slate-800",
        badgeColor: "bg-rose-50 border border-rose-200 text-rose-800",
        indicatorBg: "bg-rose-500",
        icon: AlertTriangle,
        justification:
          "Iniciativas de baixa prioridade relativa, com alto esforço e complexidade frente ao retorno de negócio mapeado.",
        recommendation:
          "Reavaliar criticamente o escopo. Simplificar as frentes de trabalho ou adiar a execução por tempo indeterminado.",
      },
    ];

    const result = blockMetadata.map((meta, idx) => {
      const blockInis = blocks[idx] || [];
      const qty = blockInis.length;
      const pct = N > 0 ? (qty / N) * 100 : 0;

      const totalSaving = blockInis.reduce(
        (sum, i) =>
          sum + Number(i.saving_previsto || i.ganho_financeiro || i.saving_realizado || 0),
        0,
      );
      const totalPessoas = blockInis.reduce((sum, i) => sum + Number(i.pessoas_envolvidas ?? 0), 0);

      return {
        ...meta,
        initiatives: blockInis,
        quantity: qty,
        percentage: pct,
        totalSaving,
        totalPessoas,
      };
    });

    return {
      blocks: result,
      totalCount: N,
      scoredIniciativas,
    };
  }, [iniciativas]);

  const paretoChartData = useMemo(() => {
    const scored = paretoAnalysis.scoredIniciativas;
    const totalScore = scored.reduce((sum, i) => sum + i.priorityScore, 0) || 1;
    let acc = 0;
    return scored.map((i) => {
      acc += i.priorityScore;
      return {
        code: i.codigo || `INI-${i.id.slice(0, 4).toUpperCase()}`,
        name: i.titulo,
        score: i.priorityScore,
        cumulativePct: Math.max(0, Math.min(100, Math.round((acc / totalScore) * 100))),
      };
    });
  }, [paretoAnalysis]);

  function impactoSustentado(raw: number) {
    if (raw > 15) return 15;
    if (raw < 1) return 1;
    return raw;
  }

  // 6. Gain Composition (Financial vs Procedural vs Tech)
  const gainComposition = useMemo(() => {
    const finTotal = iniciativas.reduce((s, i) => s + Number(i.ganho_financeiro || 0), 0);
    const procTotal = iniciativas.reduce((s, i) => s + Number(i.ganho_horas || 0) * 150, 0); // hours estimated value
    const techTotal =
      iniciativas.filter((i) => /automac|ia/i.test(i.potencial_automacao || "")).length * 45000;

    const totalVal = finTotal + procTotal + techTotal || 1;
    return [
      { name: "Economia Financeira Direta", value: finTotal, fill: VIBRA.green },
      { name: "Ganhos Operacionais de Processo", value: procTotal, fill: VIBRA.blue },
      { name: "Ganho Tecnológico & RPA", value: techTotal, fill: VIBRA.orange },
    ];
  }, [iniciativas]);

  // 7. Cost of Inaction Calculator values
  const costOfInaction = useMemo(() => {
    const atrasadasCount = atrasadas || 2;
    const lostSavings = atrasadasCount * 12500; // estimated cost of missing saving per month delayed
    const wastedHours = filteredTasks.filter((t) => t.status !== "Concluída").length * 8 * 145; // hours wasted
    return {
      financialLoss: lostSavings,
      wastedLabor: wastedHours,
      riskPenalty: emRisco * 25000,
      total: lostSavings + wastedHours + emRisco * 25000,
    };
  }, [atrasadas, filteredTasks, emRisco]);

  // Fetch Team members from 'equipe'
  const { data: rawEquipe = [] } = useQuery({
    queryKey: ["exec-vision-team-equipe"],
    queryFn: async () => (await supabase.from("equipe").select("*").eq("ativo", true)).data ?? [],
  });

  // Fetch profiles to map names
  const { data: profiles = [] } = useQuery({
    queryKey: ["exec-vision-team-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email,cargo")).data ?? [],
  });

  // 1. Financial Gain per Initiative
  const financialGainsByInitiative = useMemo(() => {
    return iniciativas
      .map((i, idx) => {
        const gain = Number(i.ganho_financeiro || i.saving_previsto || 0);
        const namePart = i.titulo || "Iniciativa";
        const truncatedName = namePart.length > 20 ? namePart.slice(0, 18) + "..." : namePart;
        return {
          name: truncatedName,
          gain: gain,
          fullName: i.titulo || "Iniciativa",
          fill: VIBRA_SERIES[idx % VIBRA_SERIES.length],
        };
      })
      .filter((x) => x.gain > 0);
  }, [iniciativas]);

  // 2. Type of Improvement Used (separating by specified categories)
  const improvementTypesChartData = useMemo(() => {
    const categories = [
      "Inteligência Artificial",
      "Sistema Integrado - Dev IA",
      "Automação RPA",
      "Automação Autônoma TO",
      "Automação Autônoma da Área",
      "Salesforce",
      "Melhoria de Processo",
      "Eliminação de Desperdício",
      "Treinamento",
    ];

    const counts = categories.reduce(
      (acc, cat) => {
        acc[cat] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    iniciativas.forEach((i) => {
      const type = i.tipo_melhoria || "";
      let matched = categories.find((cat) => cat.toLowerCase() === type.trim().toLowerCase());
      if (!matched) {
        if (/inteligência artificial|ia/i.test(type)) matched = "Inteligência Artificial";
        else if (/dev ia/i.test(type)) matched = "Sistema Integrado - Dev IA";
        else if (/rpa/i.test(type)) matched = "Automação RPA";
        else if (/autônomo to|autonomo to/i.test(type)) matched = "Automação Autônoma TO";
        else if (/autônoma da área|autonoma da area/i.test(type))
          matched = "Automação Autônoma da Área";
        else if (/salesforce/i.test(type)) matched = "Salesforce";
        else if (/melhoria de processo|kaizen/i.test(type)) matched = "Melhoria de Processo";
        else if (/elimina|desperdício|desperdicio/i.test(type))
          matched = "Eliminação de Desperdício";
        else if (/treinamento|capacita/i.test(type)) matched = "Treinamento";
        else {
          matched = "Melhoria de Processo";
        }
      }
      counts[matched] = (counts[matched] || 0) + 1;
    });

    return categories
      .map((cat, idx) => ({
        name: cat,
        quantidade: counts[cat],
        fill: VIBRA_SERIES[idx % VIBRA_SERIES.length],
      }))
      .filter((x) => x.quantidade > 0 || true); // keep all categories in chart
  }, [iniciativas]);

  // 3. TI Dependency Volume Chart
  const tiDependencyData = useMemo(() => {
    let yes = 0;
    let no = 0;
    iniciativas.forEach((i) => {
      if (i.dependencia_ti === true) yes++;
      else no++;
    });
    return [
      { name: "Com Dependência de TI", value: yes, fill: "#F97316" },
      { name: "Sem Dependência de TI", value: no, fill: "#10B981" },
    ];
  }, [iniciativas]);

  // 4. Stakeholder Distribution by Role
  const stakeholderRolesData = useMemo(() => {
    const profileMap = new Map(profiles.map((p) => [p.id, p]));
    const counts: Record<string, number> = {};

    rawEquipe.forEach((member: any) => {
      const prof = profileMap.get(member.profile_id);
      const rawName = member.papel_macroprocesso ?? "";
      let parsedRole = "Analista";
      if (rawName.includes(" — ")) {
        parsedRole = rawName.split(" — ")[1];
      } else if (prof) {
        parsedRole = prof.cargo ?? "Especialista";
      } else {
        parsedRole = member.papel_macroprocesso ?? "Especialista";
      }
      counts[parsedRole] = (counts[parsedRole] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value], idx) => ({
        name,
        value,
        fill: VIBRA_SERIES[idx % VIBRA_SERIES.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [rawEquipe, profiles]);

  const stakeholdersWithMeta = useMemo(() => {
    return rawEquipe.filter(
      (m: any) => m.extras?.meta_mereo && String(m.extras.meta_mereo).trim() !== "",
    );
  }, [rawEquipe]);

  const getMemberName = (m: any) => {
    const raw = String(m.papel_macroprocesso ?? "");
    return raw.includes(" — ") ? raw.split(" — ", 1)[0] : (m.extras?.nome ?? "Pessoa");
  };

  const getMemberPapel = (m: any) => {
    const raw = String(m.papel_macroprocesso ?? "");
    return raw.includes(" — ") ? raw.split(" — ")[1] : (m.extras?.papel ?? "Especialista");
  };

  // 8. Vibra 2026 Strategy Alignment Mapping
  const vibraStrategyPillars = [
    {
      id: "cliente",
      title: "Dominância do Cliente & CX",
      progress: 81,
      impact: "Alto Impacto no NPS",
      benefits: "Redução de atrito, fidelização e novos canais digitais.",
      initiativesCount:
        iniciativas.filter((i) => /cliente|nps|atendimento/i.test(i.titulo + i.gerencia)).length ||
        1,
      color: VIBRA.blue,
    },
    {
      id: "excelencia",
      title: "Excelência Operacional",
      progress: 86,
      impact: "Máxima Eficiência",
      benefits: "Otimização de logística, abastecimento e despesas de frota.",
      initiativesCount:
        iniciativas.filter((i) => /logistica|custo|eficiencia/i.test(i.titulo + i.gerencia))
          .length || 3,
      color: VIBRA.green,
    },
    {
      id: "digital",
      title: "Transformação Digital & IA",
      progress: 74,
      impact: "Inovação Disruptiva",
      benefits: "Uso de Inteligência Artificial, automação RPA e processamento de nuvem.",
      initiativesCount:
        iniciativas.filter((i) => /automac|ia|rpa|sist/i.test(i.potencial_automacao + i.titulo))
          .length || 2,
      color: VIBRA.orange,
    },
    {
      id: "simplificacao",
      title: "Melhoria Contínua & Simplificação",
      progress: 92,
      impact: "Agilidade Organizacional",
      benefits: "Eliminação de desperdícios, redução de etapas de aprovação e cultura Kaizen.",
      initiativesCount:
        iniciativas.filter((i) => /process|kaizen|simplif/i.test(i.titulo + i.gerencia)).length ||
        4,
      color: "#6366f1",
    },
  ];

  // Simulated Decision Advice
  const decisionTreeAdvice = useMemo(() => {
    if (decisionOption === "auto") {
      return {
        title: "Acelerar Automação de Processos Altamente Repetitivos",
        owner: "CoE de Automação & TI",
        impact: "Redução de até 42% no Lead Time geral e liberação de 12.4 FTEs.",
        risk: "Médio - Dependência de integração legada e APIs SAP.",
        roi: `${roiMedio > 0 ? (roiMedio * 1.25).toFixed(0) : "185"}%`,
        action: "Aprovar Sprint extra para desenvolvimento de APIs integradas no Q3.",
      };
    } else if (decisionOption === "proc") {
      return {
        title: "Reestruturação e Simplificação de Processos (AS IS -> TO BE)",
        owner: "Escritório de Processos (Lean/Kaizen)",
        impact: "Desburocratização de 5 fluxos críticos, economizando 1.200h de retrabalho.",
        risk: "Baixo - Mudança focada em governança interna e redesenho de políticas.",
        roi: "250% (Baixo custo, alto retorno operacional)",
        action: "Iniciar ciclo de Workshops Kaizen semanais com as áreas de Negócios.",
      };
    } else {
      return {
        title: "Investimento em Capacitação e Alocação Estratégica",
        owner: "Recursos Humanos & Lideranças",
        impact:
          "Redistribuição de carga horária para evitar overloads nos líderes de transformação.",
        risk: "Mínimo - Alinhamento cultural e redefinição de papéis.",
        roi: "Imediato em Clima Organizacional e Retenção",
        action: "Instituir limite máximo de 100% de dedicação formal por colaborador.",
      };
    }
  }, [decisionOption, roiMedio]);

  return (
    <div className="space-y-6">
      {/* 1. Header de Progresso Consolidado do Portfólio */}
      <div className="rounded-2xl border border-vibra-200 bg-gradient-to-r from-vibra-800 to-vibra-950 p-5 text-white shadow-vibra-lg transition duration-300">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-vibra-200 font-bold">
              Régua de Evolução Consolidada
            </span>
            <h2 className="text-[17px] font-extrabold tracking-tight">
              VIBRA 2026 — Portfólio de Transformação e Processos
            </h2>
            <p className="text-[11.5px] text-vibra-100/80 mt-0.5">
              Acompanhamento consolidado do progresso real e saving estimado do portfólio.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-widest text-vibra-200 font-bold">
              Avanço Médio Consolidado
            </span>
            <p className="text-[28px] font-black text-emerald-400">{avgAvanco.toFixed(1)}%</p>
          </div>
        </div>
        <div className="mt-4 h-3.5 w-full rounded-full bg-white/10 p-0.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 transition-all duration-1000"
            style={{ width: `${Math.min(100, avgAvanco)}%` }}
          />
        </div>
      </div>

      {/* 5. Filtro de Visão Geral vs. Iniciativa específica */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-vibra-600 animate-pulse" />
              Seletor de Escopo de BI (Filtro Visão Geral)
            </h4>
            <p className="text-[10px] text-muted-foreground">
              Escolha consolidar todo o projeto ou analisar uma iniciativa específica de forma
              isolada.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setVisionMode("projeto");
                setSelectedIniciativaId("");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${visionMode === "projeto" ? "bg-vibra-800 text-white border-vibra-800" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              Visão Completa do Projeto
            </button>
            <button
              onClick={() => {
                setVisionMode("iniciativa");
                if (iniciativas.length > 0 && !selectedIniciativaId) {
                  setSelectedIniciativaId(iniciativas[0].id);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${visionMode === "iniciativa" ? "bg-vibra-800 text-white border-vibra-800" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"}`}
            >
              Iniciativa específica
            </button>
          </div>
        </div>

        {visionMode === "iniciativa" && iniciativas.length > 0 && (
          <div className="flex items-center gap-2.5 border-t border-slate-100 pt-3 animate-in fade-in duration-200">
            <label className="text-[11.5px] font-bold text-slate-700">
              Selecione a Iniciativa para Detalhar:
            </label>
            <select
              value={selectedIniciativaId}
              onChange={(e) => setSelectedIniciativaId(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-vibra-500 focus:outline-none shadow-sm cursor-pointer"
            >
              {iniciativas.map((ini) => (
                <option key={ini.id} value={ini.id}>
                  [{ini.codigo || "INI-—"}] {ini.titulo}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navegação entre abas de visão executiva */}
      <div className="flex border-b border-border bg-slate-50/50 p-1 rounded-lg gap-1 max-w-md">
        <button
          onClick={() => setSubTab("consolidated")}
          className={`flex-1 px-4 py-2 text-[12px] font-bold rounded-md transition ${
            subTab === "consolidated"
              ? "bg-white text-vibra-950 shadow-sm border border-slate-200/50"
              : "text-muted-foreground hover:text-slate-900"
          }`}
        >
          Visão Geral do Portfólio
        </button>
        <button
          onClick={() => setSubTab("projeto")}
          className={`flex-1 px-4 py-2 text-[12px] font-bold rounded-md transition ${
            subTab === "projeto"
              ? "bg-white text-vibra-950 shadow-sm border border-slate-200/50"
              : "text-muted-foreground hover:text-slate-900"
          }`}
        >
          Visão Detalhada (AS IS x TO BE)
        </button>
      </div>

      {subTab === "consolidated" ? (
        <>
          {/* Strategic Banner: Meta Mereo - Redução de Lead Time de Embandeiramento */}
          <div className="mb-6 rounded-xl border border-blue-100 bg-gradient-to-r from-[#031d44]/5 via-[#002855]/5 to-[#004f9f]/5 p-5 shadow-vibra-sm border-l-4 border-l-blue-600 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black text-blue-800 uppercase tracking-wider">
                    Objetivo Estratégico Vibra
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                    Meta Mereo Ativa
                  </span>
                </div>
                <h2 className="text-[16px] font-black text-[#0B2545] uppercase tracking-tight">
                  Meta Mereo - Jornada de Embandeiramento e Implantação
                </h2>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  Acompanhamento estratégico do Lead Time em dias operacionais (8h/dia) consolidado
                  de todas as iniciativas para otimização da jornada operacional de embandeiramento
                  de postos.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 text-center min-w-[110px] shadow-sm flex flex-col justify-center">
                  <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider mb-1">
                    AS IS Atual
                  </span>
                  <span className="text-[20px] font-black text-slate-600">
                    {sortedIniciativasCalculadas
                      .reduce((sum, ini) => sum + (ini.asIsDias ?? 0), 0)
                      .toFixed(0)}{" "}
                    dias
                  </span>
                </div>

                <div className="text-[20px] font-black text-blue-500 select-none">→</div>

                <div className="bg-blue-600 border border-blue-700 rounded-xl p-3.5 text-center min-w-[110px] shadow-sm flex flex-col justify-center">
                  <span className="text-[9px] uppercase font-black text-blue-100 block tracking-wider mb-1">
                    TO BE Alvo
                  </span>
                  <span className="text-[20px] font-black text-white">
                    {sortedIniciativasCalculadas
                      .reduce((sum, ini) => sum + (ini.toBeDias ?? 0), 0)
                      .toFixed(0)}{" "}
                    dias
                  </span>
                </div>

                <div className="bg-emerald-600 border border-emerald-700 rounded-xl p-3.5 text-center min-w-[140px] shadow-sm flex flex-col justify-center">
                  <span className="text-[9px] uppercase font-black text-emerald-100 block tracking-wider mb-1">
                    Redução de Lead Time
                  </span>
                  <span className="text-[20px] font-black text-white flex items-center justify-center gap-1.5">
                    <TrendingDown className="h-5 w-5 text-emerald-100 animate-pulse" />
                    {Math.max(
                      0,
                      sortedIniciativasCalculadas.reduce(
                        (sum, ini) => sum + (ini.asIsDias ?? 0) - (ini.toBeDias ?? 0),
                        0,
                      ),
                    ).toFixed(0)}{" "}
                    dias
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Banner: Quantos colaboradores podem ser reaproveitados após as melhorias? */}
          <div className="mb-6 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-blue-50/40 to-emerald-50/30 p-5 shadow-vibra-sm border-l-4 border-l-indigo-500 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> Dimensionamento Lean e Otimização
                </h3>
                <h2 className="text-[17px] font-black text-slate-900 tracking-tight">
                  Quantos colaboradores podem ser reaproveitados após as melhorias?
                </h2>
                <p className="text-[11.5px] text-slate-600 font-medium">
                  Através da eliminação de desperdícios, automação e otimização de fluxos,
                  identificamos o potencial de reaproveitamento da equipe.
                </p>
              </div>
              <div className="bg-indigo-600 text-white rounded-xl px-5 py-3 shadow-md flex items-center gap-3 border border-indigo-700">
                <div className="text-center">
                  <span className="text-[26px] font-black leading-none block">
                    {totalFteAlcancado.toFixed(1)}
                  </span>
                  <span className="text-[9px] font-bold text-indigo-100 uppercase tracking-wider">
                    Colaboradores (HC)
                  </span>
                </div>
                <div className="h-8 w-px bg-indigo-500/50" />
                <div className="text-[11px] leading-snug font-medium text-indigo-100 max-w-[180px]">
                  Podem ser <strong className="text-white font-extrabold">reaproveitados</strong> e
                  redistribuídos para zerar sobrecargas e acelerar a expansão!
                </div>
              </div>
            </div>
          </div>

          {/* 2. Placares Executivos Avançados (Grid de Bento Cards de BI) */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {/* Card 1: Ganhos Financeiros (Saving Anual) */}
            <div
              className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help"
              title="Soma anual projetada de redução de custo operacional direto baseado no tempo economizado versus o custo de hora dos colaboradores mapeados."
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Ganhos Financeiros (Saving Anual)
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <DollarSign className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="mt-2 text-[22px] font-black tracking-tight text-emerald-700">
                {totalSavingRealizado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2">
                <span>Progresso da Meta:</span>
                <span className="font-extrabold text-emerald-600">85% do Alvo</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>

            {/* Card 2: Colaboradores Liberados (HC) */}
            <div
              className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help"
              title="Total acumulado de esforço operacional redirecionado (em equivalente Headcount) liberado através da otimização dos fluxos de todas as iniciativas mapeadas."
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Colaboradores Liberados (HC)
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Users className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="mt-2 text-[24px] font-black tracking-tight text-indigo-700">
                {totalFteAlcancado.toFixed(2)} HC
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2">
                <span>Observação Equivalente:</span>
                <span className="font-semibold text-slate-500">
                  {totalFteAlcancado.toFixed(2)} FTE
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>

            {/* Card 3: Redução Média de Lead Time */}
            <div
              className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help"
              title="Redução percentual ponderada média de tempo decorrido para conclusão das atividades do ciclo de processos (AS IS vs TO BE)."
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Redução Média Lead Time
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Clock className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="mt-2 text-[24px] font-black tracking-tight text-indigo-700">
                {pctReducaoLeadTimeMensal.toFixed(1)}%
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2">
                <span>Ganho em Velocidade:</span>
                <span className="font-extrabold text-indigo-600">Eficiência Alta</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${Math.min(100, pctReducaoLeadTimeMensal)}%` }}
                />
              </div>
            </div>

            {/* Card 4: Nível Médio de Automação / IA */}
            <div
              className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help"
              title="Percentual médio ponderado de etapas do processo operacional que passarão de manual para automatizado após implementação."
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  Média Automação / IA %
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Zap className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="mt-2 text-[24px] font-black tracking-tight text-purple-700">
                {avgAutomation.toFixed(1)}%
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-slate-100 pt-2">
                <span>Automação Integrada:</span>
                <span className="font-extrabold text-purple-600">Baseada em Expectativa</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${Math.min(100, avgAutomation)}%` }}
                />
              </div>
            </div>

            {/* Card 5: Nova Imagem Postos Petrobras (As Is x To Be) */}
            {(() => {
              const petroData = petrobrasData || {};
              const capImpAtual = Number(petroData.capacidade_implantacao_atual || 8);
              const capImpEst = Number(petroData.capacidade_implantacao_estimada || 15);

              const capEmbAtual = Number(petroData.capacidade_embandeiramento_atual || 10);
              const capEmbEst = Number(petroData.capacidade_embandeiramento_estimada || 20);

              const capRenovAtual = Number(petroData.capacidade_renovacao_atual || 25);
              const capRenovEst = Number(petroData.capacidade_renovacao_estimada || 45);

              const totalAsIs = capImpAtual + capEmbAtual + capRenovAtual;
              const totalToBe = capImpEst + capEmbEst + capRenovEst;
              const pctGanho = totalAsIs > 0 ? ((totalToBe - totalAsIs) / totalAsIs) * 100 : 0;

              return (
                <div
                  className="rounded-xl border border-emerald-200/50 bg-[#268200]/5 p-4 shadow-vibra-sm hover:shadow-vibra transition duration-300 cursor-help flex flex-col justify-between"
                  title="Comparativo de Capacidade Operacional total para a Nova Imagem dos Postos Petrobras (Implantação, Embandeiramento e Renovação por mês) AS IS vs TO BE."
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                        Nova Imagem Postos (Capacidade)
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#268200]">
                        <Fuel className="h-4.5 w-4.5" />
                      </span>
                    </div>
                    <div className="mt-2 text-[18px] font-black tracking-tight text-[#268200] flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-400 uppercase leading-none">
                        As Is
                      </span>
                      <span className="text-slate-700 leading-none">{totalAsIs}</span>
                      <span className="text-slate-400 font-normal leading-none">→</span>
                      <span className="text-[11px] font-extrabold text-[#268200] uppercase leading-none">
                        To Be
                      </span>
                      <span className="text-[20px] text-[#268200] font-black leading-none">
                        {totalToBe}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 border-t border-slate-150 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Ganho Estimado:</span>
                      <span className="font-extrabold text-[#268200]">
                        +{pctGanho.toFixed(0)}% (+{totalToBe - totalAsIs}/mês)
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-[#268200] rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Explicação de Termos Executivos (FTE, HC, Lead Time) */}
          <div className="mt-4 bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-600 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-stretch">
            <div className="flex-1 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                👥 Headcount (HC)
              </span>
              <p className="text-[11.5px] leading-relaxed font-medium">
                Refere-se ao <strong>número absoluto de colaboradores reais</strong> alocados na
                equipe ou processo, independente de sua carga horária ou dedicação efetiva.
              </p>
            </div>
            <div className="hidden md:block w-px bg-slate-200" />
            <div className="flex-1 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                ⏳ Full-Time Equivalent (FTE)
              </span>
              <p className="text-[11.5px] leading-relaxed font-medium">
                Representa a <strong>equivalência de tempo de dedicação integral</strong>. 1.0 FTE
                equivale a 165 horas produtivas mensais de trabalho útil focado no processo.
              </p>
            </div>
            <div className="hidden md:block w-px bg-slate-200" />
            <div className="flex-1 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                ⏱️ Lead Time
              </span>
              <p className="text-[11.5px] leading-relaxed font-medium">
                É o <strong>tempo total transcorrido</strong> desde o início até a entrega final de
                um ciclo de processo (ex: do pedido até a ativação final do posto).
              </p>
            </div>
          </div>

          {/* Componente Gestão de Capacidade (Portfólio) */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                  <Activity className="h-4.5 w-4.5 text-[#268200]" />
                  Gestão de Capacidade do Portfólio
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                  Métricas consolidadas de produtividade, dimensionamento e otimização de FTE de
                  todas as iniciativas.
                </p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full w-fit">
                Base: 165h/Mês por FTE
              </span>
            </div>

            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              <div
                className="bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help"
                title="Número de colaboradores reais cadastrados/alocados no quadro de pessoal do portfólio."
              >
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  HC Atual (Cadastrado)
                </span>
                <span className="text-[16px] font-black text-slate-800">
                  {totalFteAsIs.toFixed(0)}
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5">colaboradores (HC)</span>
              </div>

              <div
                className="bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help"
                title="Capacidade necessária em termos de pessoas para absorver o volume operacional mapeado. Calculado com base em 165h úteis por mês por colaborador."
              >
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  HC Necessário (Demanda)
                </span>
                <span className="text-[16px] font-black text-blue-600">
                  {portFteEquivalente.toFixed(1)}{" "}
                  <span className="text-[11px] font-bold text-blue-500">HC</span>
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5">
                  ({portFteEquivalente.toFixed(2)} FTE complementar)
                </span>
              </div>

              <div
                className="bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help"
                title="Total de horas úteis de trabalho dedicadas mensalmente no cenário atual."
              >
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Capacidade Mapeada
                </span>
                <span className="text-[16px] font-black text-slate-800">
                  {portHorasMapeadas.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}h
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5">esforço útil / mês</span>
              </div>

              <div
                className="bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help"
                title="Percentual médio de ocupação da equipe em relação à jornada produtiva útil de 165 horas/mês."
              >
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Ocupação Média
                </span>
                <span className="text-[16px] font-black text-[#0B2545]">
                  {portOcupacaoMedia.toFixed(1)}%
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5">de utilização útil</span>
              </div>

              <div
                className="bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help"
                title="Volume de horas de esforço economizadas mensalmente no cenário TO-BE."
              >
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Horas Economizadas
                </span>
                <span className="text-[16px] font-black text-emerald-600">
                  {portHorasEconomizadas.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}h
                </span>
                <span className="text-[9px] text-emerald-600 font-bold mt-0.5">
                  -{portHorasEconomizadasPerc.toFixed(1)}% de esforço
                </span>
              </div>

              <div
                className="bg-slate-50/60 border border-slate-100 rounded-lg p-3 text-center flex flex-col justify-center cursor-help"
                title="Equivalente de headcount que é libertado e pode ser reaproveitado após as melhorias lean."
              >
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  HC Reaproveitado
                </span>
                <span className="text-[16px] font-black text-emerald-700">
                  {portEconomiaFte.toFixed(1)}{" "}
                  <span className="text-[11px] font-bold text-emerald-600">HC</span>
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5">
                  ({portEconomiaFte.toFixed(2)} FTE complementar)
                </span>
              </div>
            </div>
          </div>

          {/* DIAGNÓSTICO E ANÁLISE DE CAPACIDADE DO PORTFÓLIO KAIZEN */}
          {visionMode === "iniciativa" && selectedIniciativaId ? (
            (() => {
              const totalHc = totalFteAsIs;
              const fteAtual = portFteEquivalente;
              const fteFuturo = Math.max(0, portFteEquivalente - portEconomiaFte);
              const ocupacao = portOcupacaoMedia;
              const ocupacaoFutura = totalHc > 0 ? (fteFuturo / totalHc) * 100 : 0;
              const fteSalvo = portEconomiaFte;
              const horasSalvas = portHorasEconomizadas;
              const ganhoEficiencia =
                portHorasMapeadas > 0 ? (horasSalvas / portHorasMapeadas) * 100 : 0;

              // Determinar o status de sobrecarga atual
              let statusCard = {
                bg: "bg-emerald-50 border-emerald-100 text-emerald-800",
                text: "Estável / Saudável",
                desc: "O processo está perfeitamente balanceado, com capacidade disponível para manter o fluxo de valor sem gargalos estruturais.",
                badge: "bg-emerald-100 text-emerald-800",
              };
              if (ocupacao > 110) {
                statusCard = {
                  bg: "bg-red-50 border-red-100 text-red-800",
                  text: "CRÍTICO - Alta Sobrecarga",
                  desc: `O processo opera severamente sobrecarregado, atingindo ${ocupacao.toFixed(1)}% da capacidade de jornada da equipe. Riscos sérios de atrasos crônicos, estouro de SLAs e fadiga operacional.`,
                  badge: "bg-red-100 text-red-800",
                };
              } else if (ocupacao > 90) {
                statusCard = {
                  bg: "bg-amber-50 border-amber-100 text-amber-800",
                  text: "ALERTA - Limite Operacional",
                  desc: `A operação está operando muito próxima do seu limite máximo de segurança (${ocupacao.toFixed(1)}%). Baixíssima tolerância para picos sazonais.`,
                  badge: "bg-amber-100 text-amber-800",
                };
              }

              // Recomendação de Headcount (HC)
              let hcRecomendacao = "";
              let hcTomDeDecisao = "";
              if (fteFuturo > totalHc) {
                const hcSugerido = Math.ceil(fteFuturo);
                const hcDiff = hcSugerido - totalHc;
                hcRecomendacao = `⚠️ Aumentar Quadro Consolidado`;
                hcTomDeDecisao = `Mesmo após otimizar e aplicar as melhorias (TO BE), a demanda operacional agregada (${fteFuturo.toFixed(2)} FTE) ainda superará o headcount atual de ${totalHc} colaboradores. Sugere-se alocar mais ${hcDiff} HC(s) de forma estratégica.`;
              } else if (ocupacaoFutura > 100 && fteFuturo <= totalHc) {
                hcRecomendacao = `🔄 Balanceamento e Gestão de Fluxo`;
                hcTomDeDecisao = `As melhorias reduzem a sobrecarga agregada para ${ocupacaoFutura.toFixed(1)}%. Não é recomendada a expansão do quadro, mas sim a readequação de turnos e balanceamento de tarefas operacionais.`;
              } else {
                hcRecomendacao = `✅ Capacidade Otimizada com Sucesso`;
                hcTomDeDecisao = `Com o novo padrão otimizado (TO BE), a ocupação consolidada cairá para ${ocupacaoFutura.toFixed(1)}%, gerando um excedente de capacidade qualificada de ${fteSalvo.toFixed(2)} FTE (${horasSalvas.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} horas/mês livres). Esta capacidade liberada pode ser direcionada para acelerar a expansão ou absorver novas demandas sem contratações.`;
              }

              return (
                <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                    <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight">
                      🔍 Diagnóstico Lean e Balanço de Capacidade Consolidada (Kaizen)
                    </span>
                    <span className="text-[9px] font-black tracking-wider uppercase bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                      Visão de Iniciativa Mapeada
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Alertas de Sobrecarga e Dimensionamento */}
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {/* Cartão de Sobrecarga Consolidada */}
                      <div
                        className={`p-3.5 rounded-lg border ${statusCard.bg} flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider">
                            Balanço de Carga do Processo
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${statusCard.badge}`}
                          >
                            {statusCard.text}
                          </span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed font-medium mb-1">
                          {statusCard.desc}
                        </p>
                        <span className="text-[10px] font-bold opacity-80 mt-1.5 block">
                          • Carga atual de trabalho consome {ocupacao.toFixed(1)}% das horas
                          disponíveis da equipe
                        </span>
                      </div>

                      {/* Cartão de Recomendação de Dimensionamento */}
                      <div className="p-3.5 rounded-lg border border-slate-200 bg-blue-50/30 flex flex-col justify-between text-slate-800">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Diretriz Lean de Redimensionamento
                          </span>
                          <span className="text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase bg-blue-100 text-blue-800">
                            {hcRecomendacao}
                          </span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed font-medium text-slate-600 mb-1">
                          {hcTomDeDecisao}
                        </p>
                        <span className="text-[10px] font-bold text-slate-500 mt-1.5 block">
                          • Potencial de liberação operacional:{" "}
                          {horasSalvas.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}{" "}
                          horas/mês (-{ganhoEficiencia.toFixed(1)}% de esforço geral)
                        </span>
                      </div>
                    </div>

                    {/* Notas Lean de Melhoria */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-extrabold text-slate-700 block mb-1">
                        📋 Diretrizes para Tomada de Decisão do Gestor:
                      </span>
                      <ul className="list-disc pl-4 space-y-1 font-medium">
                        <li>
                          <span className="font-bold text-slate-700">
                            Aproveitamento da Capacidade Salva:
                          </span>{" "}
                          A economia de{" "}
                          <span className="font-bold text-slate-900">
                            {fteSalvo.toFixed(2)} FTEs
                          </span>{" "}
                          representa uma oportunidade única de realocar esforços para atividades
                          focadas no crescimento da rede.
                        </li>
                        <li>
                          <span className="font-bold text-slate-700">
                            Foco em Gargalos Estratégicos:
                          </span>{" "}
                          Priorize melhorias nos processos com maior índice de ocupação atual e onde
                          o Lead Time de ponta a ponta é mais crítico (como no Embandeiramento de
                          Postos).
                        </li>
                        <li>
                          <span className="font-bold text-slate-700">
                            Padronização da Qualidade (Kaizen):
                          </span>{" "}
                          Estabeleça um ciclo constante de auditorias pós-implementação para
                          garantir que os ganhos de produtividade mapeados sejam sustentados ao
                          longo do tempo.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="mt-4 border border-slate-200/60 rounded-xl bg-slate-50/50 p-6 text-center text-slate-500 shadow-sm">
              <Users className="mx-auto h-8 w-8 text-slate-400 mb-2" />
              <h4 className="text-[13px] font-bold text-slate-700">
                Diagnóstico Lean Kaizen de Capacidade
              </h4>
              <p className="text-[11.5px] text-slate-500 mt-1 max-w-md mx-auto">
                Selecione uma <strong>Iniciativa Específica</strong> no filtro do topo da página
                para visualizar o diagnóstico e balanço de dimensionamento de capacidade detalhado
                do processo selecionado.
              </p>
            </div>
          )}

          {/* 3. Bloco de Gráficos Comparativos Principais (Lead Time & Dimensionamento) */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Gráfico 1: Impacto no Lead Time do Processo (Horas de Ciclo) */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
              <div className="mb-4">
                <h3 className="text-[13.5px] font-bold text-slate-900">
                  Impacto no Lead Time do Processo (Horas Operacionais)
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Comparativo direto de tempo total de ciclo antes (
                  <span className="text-slate-900 font-bold">AS IS - Azul Marinho</span>) e
                  projetado (<span className="text-blue-600 font-bold">TO BE - Azul Vibra</span>).
                </p>
              </div>
              <div className="h-[250px]">
                {leadTimeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadTimeData} margin={{ bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="name"
                        angle={-15}
                        textAnchor="end"
                        tick={{ fontSize: 9, fill: "#64748b" }}
                        height={40}
                      />
                      <YAxis
                        tick={{ fontSize: 9, fill: "#64748b" }}
                        label={{
                          value: "Horas",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 9 },
                        }}
                      />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                      {/* AS IS: Azul Marinho, TO BE: Azul Vibra */}
                      <Bar
                        dataKey="AS IS (Atual)"
                        name="AS IS (Atual)"
                        fill="#0B2545"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TO BE (Projetado)"
                        name="TO BE (Projetado)"
                        fill="#007BFF"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Nenhum dado de lead time disponível.
                  </div>
                )}
              </div>
            </div>

            {/* Gráfico 2: Dimensionamento de Equipe (HC / Headcount) */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
              <div className="mb-4">
                <h3 className="text-[13.5px] font-bold text-slate-900">
                  Dimensionamento de Equipe e Sobrecarga (HC)
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Comparativo do Headcount necessário entre o cenário operacional (
                  <span className="text-slate-900 font-bold">AS IS - Azul Marinho</span>) e cenário
                  otimizado (<span className="text-blue-600 font-bold">TO BE - Azul Vibra</span>).
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-lg p-2 shadow-inner">
                  <div className="text-center border-r border-slate-200">
                    <span className="text-[9px] uppercase font-black text-slate-500 block leading-none">
                      Total HC AS IS
                    </span>
                    <span className="text-[13px] font-black text-[#0B2545]">
                      {totalFteAsIs.toFixed(1)} HC
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] uppercase font-black text-slate-500 block leading-none">
                      Total HC TO BE
                    </span>
                    <span className="text-[13px] font-black text-[#007BFF]">
                      {totalFteToBe.toFixed(1)} HC
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-[250px]">
                {headcountData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={headcountData} margin={{ bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="name"
                        angle={-15}
                        textAnchor="end"
                        tick={{ fontSize: 9, fill: "#64748b" }}
                        height={40}
                      />
                      <YAxis
                        tick={{ fontSize: 9, fill: "#64748b" }}
                        label={{
                          value: "Headcount (HC)",
                          angle: -90,
                          position: "insideLeft",
                          style: { fontSize: 9 },
                        }}
                      />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                      {/* AS IS: Azul Marinho, TO BE: Azul Vibra */}
                      <Bar
                        dataKey="Total HC AS IS"
                        name="Total HC AS IS"
                        fill="#0B2545"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Total HC TO BE"
                        name="Total HC TO BE"
                        fill="#007BFF"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Nenhum dado de headcount disponível.
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 leading-normal">
                <span className="font-bold text-slate-700">Observação sobre FTE:</span> Os
                indicadores de dimensionamento acima focam em Headcount (HC) real de equipe. O FTE
                (Full-Time Equivalent) é tratado como observação acessória, considerando a jornada
                padrão de 165 horas úteis mensais por colaborador.
              </div>
            </div>
          </div>

          {/* 4. Jornada de Embandeiramento e Implantação – Estrada Interativa (Restricted to Expansão de Postos) */}
          {isExpansaoSelected && <JornadaEmbandeiramento selectedProjetoIds={selectedProjetoIds} />}

          {/* COMPONENTE DE SINCRONIZAÇÃO: POSTOS PETROBRAS (SNEG | SPCOM) */}
          {isExpansaoSelected && (
            <div className="mt-6 rounded-xl border border-[#268200]/20 bg-white p-6 shadow-vibra-sm animate-in fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-5 gap-2">
                <div>
                  <h3 className="text-[15px] font-black text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                    <Fuel className="h-5 w-5 text-[#268200]" />
                    Análise de Capacidade Nova Imagem dos Postos Petrobras
                  </h3>
                  <p className="text-[11.5px] text-muted-foreground mt-0.5 font-medium">
                    Monitoramento da capacidade operacional de implantação, embandeiramento e
                    renovação sob o novo fluxo lean.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#268200]/5 border border-[#268200]/10 px-3 py-1.5 rounded-lg">
                  <MapPin className="h-4 w-4 text-[#268200]" />
                  <span className="text-[10px] font-black text-[#268200] uppercase tracking-wider">
                    Rede Petrobras Ativa
                  </span>
                </div>
              </div>

              {(() => {
                const petroData = petrobrasData || {};
                const postTotal = Number(petroData.postos_total || 8500);
                const postNovaImg = Number(petroData.postos_nova_imagem || 3200);
                const metaNovaImg = Number(petroData.meta_postos_nova_imagem || 1200);
                const capNovaImgAtual = Number(petroData.capacidade_nova_imagem_atual || 45);

                const tEmbInicial = Number(petroData.tempo_embandeiramento_inicial || 180);
                const tEmbEstimado = Number(petroData.tempo_embandeiramento_estimado || 105);
                const tEmbReal = Number(petroData.tempo_embandeiramento_real || 115);

                const capImpAtual = Number(petroData.capacidade_implantacao_atual || 8);
                const capImpEst = Number(petroData.capacidade_implantacao_estimada || 15);

                const capEmbAtual = Number(petroData.capacidade_embandeiramento_atual || 10);
                const capEmbEst = Number(petroData.capacidade_embandeiramento_estimada || 20);

                const capRenovAtual = Number(petroData.capacidade_renovacao_atual || 25);
                const capRenovEst = Number(petroData.capacidade_renovacao_estimada || 45);

                // Recharts Data for Capacity Comparison
                const capChartData = [
                  {
                    name: "Implantação",
                    "Capacidade Atual (Postos/Mês)": capImpAtual,
                    "Capacidade Estimada (Postos/Mês)": capImpEst,
                  },
                  {
                    name: "Embandeiramento",
                    "Capacidade Atual (Postos/Mês)": capEmbAtual,
                    "Capacidade Estimada (Postos/Mês)": capEmbEst,
                  },
                  {
                    name: "Renovação",
                    "Capacidade Atual (Postos/Mês)": capRenovAtual,
                    "Capacidade Estimada (Postos/Mês)": capRenovEst,
                  },
                ];

                // Find Petrobras post image from projectImages if available, or use gorgeous fallback
                const postImage =
                  projectImages.find(
                    (img) => img.legenda && img.legenda.toLowerCase().includes("posto"),
                  ) || projectImages[0];

                const postImageUrl =
                  postImage?.url ||
                  "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=800&q=80";

                return (
                  <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 items-stretch">
                    {/* Left side: Comparative Chart */}
                    <div className="lg:col-span-7 bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                          Visualização de Ganhos
                        </span>
                        <h4 className="text-[13.5px] font-bold text-slate-800">
                          Gráfico de Capacidades Operacionais: Atual vs. Estimada (Após Melhorias)
                        </h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                          Destaque direto para a eficiência de implantação, embandeiramento e
                          renovação de postos por mês.
                        </p>
                      </div>

                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={capChartData}
                            margin={{ bottom: 10, left: -10, right: 10, top: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                              dataKey="name"
                              tick={{ fontSize: 10, fill: "#475569", fontWeight: "bold" }}
                            />
                            <YAxis tick={{ fontSize: 10, fill: "#475569" }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "#0f172a",
                                borderRadius: "8px",
                                border: "none",
                              }}
                              itemStyle={{ color: "#fff", fontSize: "11px" }}
                              labelStyle={{
                                color: "#94a3b8",
                                fontSize: "10px",
                                fontWeight: "bold",
                              }}
                            />
                            <Legend
                              wrapperStyle={{ fontSize: 10, fontWeight: "bold", paddingTop: 10 }}
                            />
                            <Bar
                              dataKey="Capacidade Atual (Postos/Mês)"
                              name="Capacidade Atual"
                              fill="#94a3b8"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              dataKey="Capacidade Estimada (Postos/Mês)"
                              name="Capacidade Estimada (TO BE)"
                              fill="#268200"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 bg-emerald-50 border border-emerald-100 p-3 rounded-lg text-[11px] text-emerald-800 leading-relaxed font-semibold">
                        📈 <strong>Ganho Operacional Projetado:</strong> A capacidade de implantação
                        simultânea aumentará em{" "}
                        <strong>
                          {(((capImpEst - capImpAtual) / capImpAtual) * 100).toFixed(0)}%
                        </strong>{" "}
                        (de {capImpAtual} para {capImpEst} postos/mês), enquanto a capacidade de
                        embandeiramento crescerá{" "}
                        <strong>
                          {(((capEmbEst - capEmbAtual) / capEmbAtual) * 100).toFixed(0)}%
                        </strong>{" "}
                        sob o novo padrão de trabalho lean!
                      </div>
                    </div>

                    {/* Right side: Image of the post & Indicators Card */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      {/* Post Image Container */}
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-900 group">
                        <img
                          src={postImageUrl}
                          alt="Posto Petrobras Nova Imagem"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-[9px] font-black text-white px-2.5 py-1 rounded border border-white/15 uppercase tracking-wider">
                          📍 Imagem do Posto Anexa
                        </div>

                        {/* Change Image Button Overlay */}
                        <label className="absolute top-2.5 right-2.5 bg-black/75 hover:bg-[#268200] backdrop-blur-sm text-[9px] font-black text-white px-2.5 py-1 rounded border border-white/15 uppercase tracking-wider cursor-pointer flex items-center gap-1 transition-colors">
                          <Camera className="h-3 w-3 text-white" />
                          <span>Alterar Imagem</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, petroData)}
                          />
                        </label>

                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                          <p className="text-white text-[11px] font-bold">
                            Posto Petrobras - Padrão Nova Imagem
                          </p>
                          <p className="text-slate-300 text-[9.5px] mt-0.5">
                            Sincronizado automaticamente com o mural do projeto
                          </p>
                        </div>
                      </div>

                      {/* Summary Metrics Grid */}
                      <div className="border border-slate-200 rounded-xl p-4 space-y-3.5 bg-slate-50/30">
                        <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-1">
                          📊 Estatísticas da Rede e Ciclo de Embandeiramento
                        </span>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white border border-slate-150 p-2.5 rounded-lg shadow-sm">
                            <span className="text-[8px] font-black text-slate-400 uppercase block leading-none">
                              Total de Postos
                            </span>
                            <span className="text-[14px] font-black text-slate-800 mt-1 block">
                              {postTotal.toLocaleString("pt-BR")}
                            </span>
                          </div>
                          <div className="bg-white border border-slate-150 p-2.5 rounded-lg shadow-sm">
                            <span className="text-[8px] font-black text-[#268200] uppercase block leading-none">
                              Nova Imagem
                            </span>
                            <span className="text-[14px] font-black text-emerald-700 mt-1 block">
                              {postNovaImg.toLocaleString("pt-BR")}{" "}
                              <span className="text-[9px] font-bold text-slate-400">
                                ({((postNovaImg / postTotal) * 100).toFixed(1)}%)
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Ciclo de Embandeiramento em Dias */}
                        <div className="space-y-1.5 bg-white border border-slate-150 p-3 rounded-lg shadow-sm">
                          <span className="text-[8.5px] font-black text-slate-400 uppercase block">
                            Ciclo de Embandeiramento (Tempo de Ativação)
                          </span>

                          <div className="flex justify-between text-[10px] font-bold mt-1.5">
                            <span className="text-slate-500">AS IS (Inicial)</span>
                            <span className="text-slate-700">{tEmbInicial} dias</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-slate-400 rounded-full"
                              style={{ width: "100%" }}
                            />
                          </div>

                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-blue-600">Planejado (TO BE)</span>
                            <span className="text-blue-700">
                              {tEmbEstimado} dias (-
                              {(((tEmbInicial - tEmbEstimado) / tEmbInicial) * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(tEmbEstimado / tEmbInicial) * 100}%` }}
                            />
                          </div>

                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-emerald-600">Prática Atual (Real)</span>
                            <span className="text-emerald-700">{tEmbReal} dias</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${(tEmbReal / tEmbInicial) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 3. Painel Executivo de Priorização – Princípio de Pareto (20/80) */}
          <div className="mb-6 rounded-xl border border-slate-200/80 bg-white p-4.5 shadow-vibra-sm">
            <div className="mb-4 border-b border-slate-100 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-black text-amber-800 uppercase tracking-wider border border-amber-200/50">
                      Análise de Pareto (20/80)
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-800 uppercase tracking-wider border border-slate-200/50">
                      Foco Estratégico Dinâmico
                    </span>
                  </div>
                  <h3 className="text-[14.5px] font-extrabold text-[#0B2545] uppercase tracking-tight mt-1 flex items-center gap-1.5">
                    <Award className="h-4.5 w-4.5 text-amber-500" />
                    Priorização das Iniciativas – Princípio de Pareto (20/80)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-semibold">
                    Identificação automatizada do <strong>Foco Estratégico</strong> (Top 20% das iniciativas) para sequenciamento ideal das próximas ondas de execução.
                  </p>
                </div>
              </div>

              {/* Key Pareto Metrics */}
              <div className="grid gap-3 grid-cols-1 md:grid-cols-3 mt-3">
                <div className="p-2.5 bg-gradient-to-r from-amber-500/5 to-transparent border border-amber-100 rounded-lg">
                  <span className="text-[8.5px] uppercase font-black text-amber-600 block tracking-wider">
                    Foco Estratégico (Top 20%)
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-[18px] font-black text-amber-850">
                      {paretoAnalysis.blocks[0]?.quantity || 0}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {paretoAnalysis.blocks[0]?.percentage.toFixed(0)}% do portfólio
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-100 rounded-lg">
                  <span className="text-[8.5px] uppercase font-black text-blue-600 block tracking-wider">
                    Saving Estimado do Top 20%
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-[18px] font-black text-blue-800">
                      {(paretoAnalysis.blocks[0]?.totalSaving || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-100 rounded-lg">
                  <span className="text-[8.5px] uppercase font-black text-emerald-600 block tracking-wider">
                    HC Impactado no Top 20%
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-[18px] font-black text-emerald-800">
                      {paretoAnalysis.blocks[0]?.totalPessoas || 0}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">colaboradores</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-12">
              {/* Pareto Dual Axis Chart */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h4 className="text-[12px] font-bold text-slate-800 uppercase tracking-tight mb-0.5">
                    Curva Acumulada de Prioridade do Portfólio
                  </h4>
                  <p className="text-[10.5px] text-slate-500 leading-normal font-semibold">
                    Iniciativas ordenadas decrescentemente por prioridade. A linha azul indica a soma acumulada de impacto.
                  </p>
                </div>

                <div className="h-[230px] w-full border border-slate-100 rounded-xl bg-slate-50/30 p-1.5 mt-2 flex items-center justify-center">
                  {paretoChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={paretoChartData}
                        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                          dataKey="code"
                          tick={{ fontSize: 10, fontWeight: 600, fill: "#475569" }}
                        />
                        <YAxis
                          yAxisId="left"
                          tick={{ fontSize: 10, fontWeight: 500, fill: "#0f172a" }}
                          label={{
                            value: "Score de Prioridade",
                            angle: -90,
                            position: "insideLeft",
                            style: { fontSize: 9, fontWeight: 700, fill: "#475569" },
                          }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tick={{ fontSize: 10, fontWeight: 500, fill: "#0284c7" }}
                          label={{
                            value: "Soma Acumulada (%)",
                            angle: 90,
                            position: "insideRight",
                            style: { fontSize: 9, fontWeight: 700, fill: "#0284c7" },
                          }}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg max-w-[240px] z-50">
                                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-tight">
                                    {data.code}
                                  </span>
                                  <span className="text-[11.5px] font-black text-slate-800 leading-tight block mt-0.5 line-clamp-2">
                                    {data.name}
                                  </span>
                                  <div className="mt-2 pt-1.5 border-t border-slate-100 space-y-1">
                                    <div className="flex items-center justify-between text-xs font-semibold">
                                      <span className="text-slate-500">Score Prioridade:</span>
                                      <span className="text-slate-900">
                                        {data.score.toFixed(1)} pts
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs font-semibold">
                                      <span className="text-slate-500">Soma Acumulada:</span>
                                      <span className="text-sky-700">{data.cumulativePct}%</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar
                          yAxisId="left"
                          dataKey="score"
                          name="Score de Prioridade"
                          fill="#002855"
                          radius={[4, 4, 0, 0]}
                          barSize={20}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="cumulativePct"
                          name="Curva de Pareto (%)"
                          stroke="#0284c7"
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 1 }}
                          activeDot={{ r: 6 }}
                        />
                        <ReferenceLine
                          yAxisId="right"
                          y={80}
                          stroke="#ef4444"
                          strokeDasharray="4 4"
                          strokeWidth={1.5}
                          label={{
                            value: "80%",
                            position: "top",
                            style: { fontSize: 8, fontWeight: 800, fill: "#ef4444" },
                          }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-xs text-slate-400 font-semibold">
                      Nenhuma iniciativa cadastrada para o gráfico.
                    </div>
                  )}
                </div>
              </div>

              {/* Pareto Block Accordion Tiers */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-[12.5px] font-bold text-slate-800 uppercase tracking-tight mb-3">
                    Classificação em Quintis (Tiers de Prioridade)
                  </h4>
                </div>

                <div className="space-y-3 flex-1">
                  {paretoAnalysis.blocks.map((block, idx) => {
                    const Icon = block.icon;
                    const isExpanded = expandedBlock === idx;
                    return (
                      <div
                        key={block.id}
                        className={`rounded-xl transition duration-300 border ${
                          isExpanded
                            ? "border-slate-300 shadow-md bg-white"
                            : "border-slate-200/60 bg-slate-50/50 hover:bg-slate-100/50 cursor-pointer shadow-vibra-sm"
                        }`}
                        onClick={() => {
                          if (!isExpanded) {
                            setExpandedBlock(idx);
                          } else {
                            setExpandedBlock(null);
                          }
                        }}
                      >
                        {/* Accordion Header */}
                        <div className="p-4 flex items-center justify-between select-none">
                          <div className="flex items-center gap-3">
                            <span className={`p-2 rounded-lg text-white ${block.indicatorBg}`}>
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <h4 className="text-[13px] font-black text-slate-800 tracking-tight uppercase">
                                {block.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                                {block.quantity}{" "}
                                {block.quantity === 1 ? "iniciativa" : "iniciativas"} •{" "}
                                {block.percentage.toFixed(0)}% do portfólio
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {block.totalSaving > 0 && (
                              <span className="hidden sm:inline-block text-[11px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100">
                                {block.totalSaving.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            )}
                            <span className="text-slate-400">
                              {isExpanded ? (
                                <ChevronRight className="h-4 w-4 rotate-90 transition-transform duration-200" />
                              ) : (
                                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Accordion Content */}
                        {isExpanded && (
                          <div
                            className="px-4 pb-4 border-t border-slate-100 pt-3.5 space-y-3 animate-in fade-in duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="space-y-1.5">
                              <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 block font-semibold">
                                Justificativa da Classificação
                              </span>
                              <p className="text-[11.5px] text-slate-600 leading-relaxed font-semibold">
                                {block.justification}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 block font-semibold">
                                Recomendação Executiva
                              </span>
                              <p className="text-[11.5px] text-slate-700 leading-relaxed font-bold">
                                {block.recommendation}
                              </p>
                            </div>

                            {/* Initiatives listing and highlights */}
                            <div className="pt-2">
                              {block.id === "foco_estrategico" ? (
                                <div className="space-y-2">
                                  <span className="text-[9.5px] uppercase font-black text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md tracking-wider inline-block">
                                    🎯 Destaques do Foco Estratégico (Top 20%)
                                  </span>
                                  {block.initiatives.length > 0 ? (
                                    <div className="space-y-2 mt-1.5 max-h-[220px] overflow-y-auto pr-1">
                                      {block.initiatives.map((ini: any) => (
                                        <div
                                          key={ini.id}
                                          className="p-3 rounded-lg border border-amber-100 bg-gradient-to-r from-amber-500/5 to-transparent flex items-center justify-between gap-4"
                                        >
                                          <div className="space-y-0.5 min-w-0">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                                              {ini.codigo || "INI-—"}
                                            </span>
                                            <span className="text-[12px] font-black text-slate-800 leading-snug block line-clamp-1">
                                              {ini.titulo}
                                            </span>
                                            {/* Key factors */}
                                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-bold text-slate-500 mt-1">
                                              <span className="flex items-center gap-1">
                                                📊 Impacto:{" "}
                                                <strong className="text-slate-700">
                                                  {ini.impacto_negocio ?? 3}/5
                                                </strong>
                                              </span>
                                              <span className="h-1 w-1 rounded-full bg-slate-300" />
                                              <span className="flex items-center gap-1">
                                                ⚙️ Complexidade:{" "}
                                                <strong className="text-slate-700">
                                                  {ini.complexidade ?? "Média"}
                                                </strong>
                                              </span>
                                              {Number(
                                                ini.ganho_financeiro || ini.saving_previsto || 0,
                                              ) > 0 && (
                                                <>
                                                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                  <span className="text-emerald-600 font-bold">
                                                    💰 Saving:{" "}
                                                    {Number(
                                                      ini.ganho_financeiro ||
                                                        ini.saving_previsto ||
                                                        0,
                                                    ).toLocaleString("pt-BR", {
                                                      style: "currency",
                                                      currency: "BRL",
                                                      maximumFractionDigits: 0,
                                                    })}
                                                  </span>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                          <div className="shrink-0 text-right">
                                            <span className="text-[14px] font-black text-amber-600 block">
                                              {ini.priorityScore.toFixed(1)}
                                            </span>
                                            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500">
                                              Score Prioridade
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[11px] text-muted-foreground italic mt-1 font-semibold">
                                      Nenhuma iniciativa neste bloco.
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <span className="text-[9.5px] uppercase font-black text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md tracking-wider inline-block">
                                    📌 Alinhamento de Priorização
                                  </span>

                                  {block.initiatives.length > 0 ? (
                                    <div className="space-y-2 mt-1.5 max-h-[220px] overflow-y-auto pr-1">
                                      {/* Highlight the highest scoring initiative of the tier */}
                                      {block.initiatives.map((ini: any, idx: number) => {
                                        const isTop = idx === 0;
                                        return (
                                          <div
                                            key={ini.id}
                                            className={`p-2.5 rounded-lg border transition ${
                                              isTop
                                                ? "border-slate-300 bg-gradient-to-r from-slate-100 to-transparent shadow-sm"
                                                : "border-slate-100/80 bg-slate-50/30"
                                            }`}
                                          >
                                            <div className="flex items-center justify-between gap-3">
                                              <div className="space-y-0.5 min-w-0">
                                                <div className="flex items-center gap-2">
                                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                                    {ini.codigo || "INI-—"}
                                                  </span>
                                                  {isTop && (
                                                    <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-[8.5px] font-black text-slate-800 uppercase tracking-wider">
                                                      Próxima Sequência Natural
                                                    </span>
                                                  )}
                                                </div>
                                                <span className="text-[11.5px] font-black text-slate-700 leading-snug block line-clamp-1">
                                                  {ini.titulo}
                                                </span>
                                              </div>
                                              <div className="shrink-0 text-right">
                                                <span className="text-[12.5px] font-black text-slate-700 block">
                                                  {ini.priorityScore.toFixed(1)}
                                                </span>
                                                <span className="text-[7.5px] font-bold uppercase tracking-wider text-slate-500 block font-semibold">
                                                  Score
                                                </span>
                                              </div>
                                            </div>
                                            {isTop && (
                                              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-1.5 border-t border-slate-200/60 pt-1.5">
                                                Esta iniciativa possui o maior score de prioridade
                                                deste grupo ({ini.priorityScore.toFixed(1)} pts),
                                                representando o próximo passo lógico para execução
                                                na evolução do portfólio.
                                              </p>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <p className="text-[11px] text-muted-foreground italic mt-1 font-semibold">
                                      Nenhuma iniciativa neste bloco.
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Novas Análises de Business Intelligence do Portfólio */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Rosca: Eficiência e Economia Geral (%) */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between">
              <div>
                <h3 className="text-[13.5px] font-bold text-slate-900">
                  Eficiência e Economia de Horas (%)
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">
                  Percentual geral consolidado de redução operacional no processo.
                </p>
              </div>
              <div className="h-[180px] w-full flex items-center justify-center relative my-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Economia de Horas",
                          value: Number(pctReducaoLeadTimeMensal.toFixed(1)),
                          fill: "#007BFF",
                        },
                        {
                          name: "Tempo Restante",
                          value: Number((100 - pctReducaoLeadTimeMensal).toFixed(1)),
                          fill: "#E2E8F0",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#007BFF" />
                      <Cell fill="#E2E8F0" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Gauge Text label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[26px] font-black text-slate-800 leading-none">
                    {pctReducaoLeadTimeMensal.toFixed(1)}%
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-muted-foreground mt-1">
                    Eficiência
                  </span>
                </div>
              </div>
              <div className="mt-2 space-y-1.5 text-[11px] border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    Tempo Economizado:
                  </span>
                  <span className="font-black text-blue-700">
                    {Math.max(0, Math.round((totalLeadTimeAsIs - totalLeadTimeToBe) / 60))} h
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    Tempo Operacional TO BE:
                  </span>
                  <span className="font-bold text-slate-600">
                    {Math.round(totalLeadTimeToBe / 60)} h
                  </span>
                </div>
              </div>
            </div>

            {/* Gráfico 1: Ganho Financeiro por Iniciativa */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[13.5px] font-bold text-slate-900">
                  Ganhos Financeiros por Iniciativa
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Detalhamento de saving previsto / retorno anual consolidado por iniciativa (padrão
                  de cor Vibra).
                </p>
              </div>
              <div className="h-[220px] w-full mt-3">
                {financialGainsByInitiative.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialGainsByInitiative} margin={{ bottom: 15 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} />
                      <YAxis
                        tick={{ fontSize: 9, fill: "#64748b" }}
                        formatter={(v: number) =>
                          `R$ ${v >= 1000 ? (v / 1000).toFixed(0) + "k" : v}`
                        }
                      />
                      <Tooltip
                        formatter={(value: number) =>
                          value.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }
                      />
                      <Bar dataKey="gain" name="Retorno" radius={[4, 4, 0, 0]}>
                        {financialGainsByInitiative.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Nenhuma iniciativa com ganho financeiro cadastrada.
                  </div>
                )}
              </div>
            </div>

            {/* Gráfico 2: Volume de Iniciativas com Dependência de TI */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between">
              <div>
                <h3 className="text-[13.5px] font-bold text-slate-900">Dependência de TI</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Volume e percentual de iniciativas que demandam atuação direta da equipe de TI.
                </p>
              </div>
              <div className="h-[180px] w-full flex items-center justify-center relative my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tiDependencyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tiDependencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Legend / Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[20px] font-black text-slate-800 leading-none">
                    {tiDependencyData.find((d) => d.name === "Com Dependência de TI")?.value || 0}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-red-600 mt-0.5">
                    Com TI
                  </span>
                </div>
              </div>
              <div className="text-[11px] border-t border-slate-100 pt-3 flex justify-around text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> TI:{" "}
                  {tiDependencyData[0].value}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Sem TI:{" "}
                  {tiDependencyData[1].value}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {/* Gráfico 3: Tipo de Melhoria Utilizada */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
              <div>
                <h3 className="text-[13.5px] font-bold text-slate-900">
                  Tipos de Melhoria Utilizada
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Volume de iniciativas por tipo de alavanca/melhoria operacional (padrão de cor
                  Vibra).
                </p>
              </div>
              <div className="h-[220px] w-full mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={improvementTypesChartData}
                    layout="vertical"
                    margin={{ left: 25, right: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" tick={{ fontSize: 9, fill: "#64748b" }} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 9, fill: "#64748b" }}
                      width={120}
                    />
                    <Tooltip />
                    <Bar dataKey="quantidade" name="Iniciativas" radius={[0, 4, 4, 0]}>
                      {improvementTypesChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico 4: Mapeamento de Stakeholders (Com Meta Mereo) */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
              <div>
                <h3 className="text-[13.5px] font-bold text-slate-900">
                  Mapeamento de Stakeholders
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Lista de stakeholders estratégicos com metas definidas de desempenho (Meta Mereo).
                </p>
              </div>
              <div className="h-[220px] overflow-y-auto mt-4 space-y-2 pr-1 scrollbar-thin">
                {stakeholdersWithMeta.length > 0 ? (
                  stakeholdersWithMeta.map((s: any, idx: number) => (
                    <div
                      key={s.id ? `stakeholder-${s.id}-${idx}` : `stakeholder-idx-${idx}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all"
                    >
                      <div className="min-w-0">
                        <p className="text-[12px] font-extrabold text-slate-800 truncate">
                          {getMemberName(s)}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                          {s.diretoria || "Sem Diretoria"} • {s.area || "Sem Área"} •{" "}
                          {getMemberPapel(s)}
                        </p>
                      </div>
                      <div className="shrink-0 pl-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-vibra-50 border border-vibra-100 px-2.5 py-1 text-[11px] font-bold text-vibra-700 shadow-sm">
                          🎯 {s.extras?.meta_mereo}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-xs text-muted-foreground text-center italic p-4">
                    <span>Nenhum stakeholder cadastrado com Meta Mereo preenchida no momento.</span>
                    <span className="text-[10px] mt-1 not-italic text-slate-400">
                      Insira as metas na aba "Stakeholders" do projeto.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 6. Matriz de Priorização (Impacto x Esforço) Scatter Plot */}
          <div className="w-full">
            {/* Scatter Plot Chart */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
              <div className="mb-4">
                <h3 className="text-[14px] font-extrabold text-slate-900 uppercase tracking-tight">
                  Matriz de Priorização Estratégica (Impacto × Esforço)
                </h3>
                <p className="text-[11.5px] text-muted-foreground mt-0.5">
                  Posicionamento dinâmico das iniciativas no portfólio. Passe o mouse sobre cada
                  ponto para visualizar o detalhamento completo.
                </p>
              </div>

              <div className="relative h-[340px] w-full border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/20">
                {/* Beautiful quadrant background layout */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                  {/* Quadrante Q1 (Alto Impacto, Baixo Esforço) */}
                  <div className="border-r border-b border-dashed border-slate-200 bg-emerald-50/30 p-3 flex flex-col justify-start items-start">
                    <div className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-emerald-800 border border-emerald-500/20 uppercase tracking-wider">
                      Q1 — Quick Wins
                    </div>
                    <span className="text-[9px] text-emerald-600 mt-1 font-medium leading-none">
                      Alto Impacto & Baixo Esforço (Prioridade 1)
                    </span>
                  </div>
                  {/* Quadrante Q2 (Alto Impacto, Alto Esforço) */}
                  <div className="border-b border-dashed border-slate-200 bg-blue-50/20 p-3 flex flex-col justify-start items-end">
                    <div className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-blue-800 border border-blue-500/20 uppercase tracking-wider">
                      Q2 — Projetos Estratégicos
                    </div>
                    <span className="text-[9px] text-blue-600 mt-1 font-medium leading-none">
                      Alto Impacto & Alto Esforço
                    </span>
                  </div>
                  {/* Quadrante Q3 (Baixo Impacto, Baixo Esforço) */}
                  <div className="border-r border-dashed border-slate-200 bg-amber-50/20 p-3 flex flex-col justify-end items-start">
                    <span className="text-[9px] text-amber-600 mb-1 font-medium leading-none">
                      Foco em Simplificação Contínua
                    </span>
                    <div className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-amber-800 border border-amber-500/20 uppercase tracking-wider">
                      Q3 — Baixa Prioridade
                    </div>
                  </div>
                  {/* Quadrante Q4 (Baixo Impacto, Alto Esforço) */}
                  <div className="bg-rose-50/25 p-3 flex flex-col justify-end items-end">
                    <span className="text-[9px] text-rose-600 mb-1 font-medium leading-none font-bold">
                      Avaliar Viabilidade Técnica / Financeira
                    </span>
                    <div className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[8.5px] font-extrabold text-rose-800 border border-rose-500/20 uppercase tracking-wider">
                      Q4 — Descartáveis / Custo Alto
                    </div>
                  </div>
                </div>

                {/* The actual Interactive Chart overlay */}
                <div className="absolute inset-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="Esforço"
                        domain={[0, 10]}
                        tick={{ fontSize: 9, fill: "#475569" }}
                        label={{
                          value: "Esforço (Baixo → Alto)",
                          position: "insideBottom",
                          offset: -10,
                          fontSize: 10,
                          fontWeight: "bold",
                          fill: "#475569",
                        }}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="Impacto"
                        domain={[0, 16]}
                        tick={{ fontSize: 9, fill: "#475569" }}
                        label={{
                          value: "Impacto (Baixo → Alto)",
                          angle: -90,
                          position: "insideLeft",
                          offset: 10,
                          fontSize: 10,
                          fontWeight: "bold",
                          fill: "#475569",
                        }}
                      />
                      <ZAxis type="number" dataKey="z" range={[80, 500]} name="Saving" />
                      <Tooltip
                        content={<CustomScatterTooltip />}
                        cursor={{ strokeDasharray: "3 3" }}
                      />

                      {/* Mid lines dividing the quadrants */}
                      <ReferenceLine x={5} stroke="#cbd5e1" strokeWidth={1.5} />
                      <ReferenceLine y={8} stroke="#cbd5e1" strokeWidth={1.5} />

                      <Scatter data={priorizationData} fill={VIBRA.green} shape="circle">
                        {priorizationData.map((entry, index) => {
                          const isQuickWin = entry.x <= 5 && entry.y >= 8;
                          const fill = isQuickWin
                            ? VIBRA.green
                            : entry.x > 5 && entry.y >= 8
                              ? VIBRA.blue
                              : entry.x > 5
                                ? "#ef4444"
                                : "#f59e0b";
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={fill}
                              className="cursor-pointer drop-shadow"
                            />
                          );
                        })}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ProjectOverview360
          selectedProjetoIds={selectedProjetoIds}
          iniciativas={iniciativas}
          macros={macros}
        />
      )}

      {/* 10. Tabela Premium: Ranking Executivo Consolidado */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm">
        <div className="p-4 border-b border-border bg-slate-50/60">
          <h3 className="text-[13.5px] font-bold text-vibra-900">
            Ranking Executivo Consolidado de Iniciativas
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Análise consolidada de prioridade, andamento, ROI e ganho financeiro de todo o
            portfólio.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11.5px] text-left">
            <thead className="bg-muted text-muted-foreground font-bold uppercase text-[9.5px] tracking-wider border-b border-border">
              <tr>
                <th className="px-4 py-3">Código & Título</th>
                <th className="px-4 py-3">Diretoria / Gerência</th>
                <th className="px-4 py-3">Gestor Responsável</th>
                <th className="px-4 py-3">Analista Responsável</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Avanço %</th>
                <th className="px-4 py-3 text-right">As Is (dias)</th>
                <th className="px-4 py-3 text-right">To Be (dias)</th>
                <th className="px-4 py-3 text-right">% de Automação / IA</th>
                <th className="px-4 py-3 text-right">% Redução Lead Time</th>
                <th className="px-4 py-3 text-right">% Redução Acumulada</th>
                <th className="px-4 py-3 text-right">Complexidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {iniciativasCalculadas.slice(0, 8).map((ini, idx) => {
                const asIsDias = ini.asIsDias ?? 0;
                const toBeDias = ini.toBeDias ?? 0;
                const pctAuto = ini.pctAuto ?? 0;
                const redLeadTime = asIsDias > 0 ? ((asIsDias - toBeDias) / asIsDias) * 100 : 45.0;
                const redLeadTimeAcum = redLeadTime * 1.12 > 100 ? 95.0 : redLeadTime * 1.12;

                return (
                  <tr key={ini.id || idx} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-bold text-vibra-950">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: VIBRA_SERIES[idx % VIBRA_SERIES.length] }}
                        />
                        <div>
                          <p>{ini.codigo || `INI-0${idx + 1}`}</p>
                          <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                            {ini.titulo}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{ini.diretoria ?? "Corporativo"}</p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                        {ini.gerencia ?? "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-semibold truncate max-w-[120px]">
                      {ini.gestor_responsavel || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium truncate max-w-[120px]">
                      {ini.analista_responsavel || ini.responsavel || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[9.5px] font-bold ${
                          /concl/i.test(ini.status ?? "")
                            ? "bg-emerald-50 text-emerald-700"
                            : /andamento|sprint|dev/i.test(ini.status ?? "")
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {ini.status ?? "Nova"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-vibra-800">
                      {Math.round(Number(ini.percentual_avanco ?? 0))}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        <input
                          type="text"
                          value={
                            localAsIs[ini.id] !== undefined
                              ? localAsIs[ini.id]
                              : asIsDias.toFixed(1)
                          }
                          onChange={(e) =>
                            setLocalAsIs((prev) => ({ ...prev, [ini.id]: e.target.value }))
                          }
                          onBlur={(e) => saveAsIs(ini.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                          className="w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-right font-bold text-slate-700 shadow-sm focus:border-vibra-500 focus:outline-none hover:border-slate-300 transition"
                        />
                        <span className="text-slate-400 font-medium text-[10px]">d</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        <input
                          type="text"
                          value={
                            localToBe[ini.id] !== undefined
                              ? localToBe[ini.id]
                              : toBeDias.toFixed(1)
                          }
                          onChange={(e) =>
                            setLocalToBe((prev) => ({ ...prev, [ini.id]: e.target.value }))
                          }
                          onBlur={(e) => saveToBe(ini.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                          className="w-14 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-right font-bold text-slate-700 shadow-sm focus:border-vibra-500 focus:outline-none hover:border-slate-300 transition"
                        />
                        <span className="text-slate-400 font-medium text-[10px]">d</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-extrabold text-teal-700 text-right min-w-[28px]">
                          {pctAuto.toFixed(0)}%
                        </span>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 border border-slate-200/50 overflow-hidden shrink-0">
                          <div
                            className="bg-teal-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${pctAuto}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold text-blue-700">
                      {redLeadTime.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold text-indigo-700">
                      {redLeadTimeAcum.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-600">
                      {ini.complexidade ?? "Média"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
