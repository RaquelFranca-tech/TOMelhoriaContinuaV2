import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VIBRA, VIBRA_SERIES } from "@/lib/vibraColors";
import {
  Award,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  Maximize2,
  X,
  Sparkles,
  HelpCircle,
  AlertCircle,
  FileText,
  Target,
  Zap,
  Briefcase,
  Activity,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  Line,
} from "recharts";

type Props = {
  selectedProjetoIds: string[] | null;
  iniciativas: any[];
  macros: any[];
};

function formatMinutesToHoursMinutesSuffix(minutes: number): string {
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60);
  const remainingMinutes = rounded % 60;
  const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  return `(${hours}h ${minutesStr}min)`;
}

export function ProjectOverview360({ selectedProjetoIds, iniciativas, macros }: Props) {
  const [viewerImage, setViewerImage] = useState<any | null>(null);
  const [selectedIniciativaId, setSelectedIniciativaId] = useState<string>("");

  const iniciativasFiltradas = useMemo(() => {
    if (selectedIniciativaId) {
      return iniciativas.filter((i) => i.id === selectedIniciativaId);
    }
    return iniciativas;
  }, [iniciativas, selectedIniciativaId]);

  // Load Change Management processes
  const { data: changeProcesses = [] } = useQuery({
    queryKey: ["project-change-processes-360", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let q = supabase.from("gestao_mudanca").select("*").is("deleted_at", null);
      if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
      const { data } = await q;
      return data ?? [];
    },
  });

  // Load Scorecards
  const { data: changeScorecards = [] } = useQuery({
    queryKey: ["project-change-scorecards-360", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let q = supabase.from("scorecard_mudanca").select("*");
      if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
      const { data } = await q;
      return data ?? [];
    },
  });

  // Load Project Images
  const { data: projectImages = [] } = useQuery({
    queryKey: ["project-images-360", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let q = supabase.from("projeto_imagens").select("*").is("deleted_at", null);
      if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
      const { data } = await q;
      return data ?? [];
    },
  });

  const activeProjectName = useMemo(() => {
    if (selectedProjetoIds && selectedProjetoIds.length === 1) {
      const match = macros.find((m) => m.id === selectedProjetoIds[0]);
      return match ? match.nome : "Projeto Selecionado";
    }
    return "Múltiplos Projetos (Portfólio Consolidado)";
  }, [selectedProjetoIds, macros]);

  const isJornadaVisible = useMemo(() => {
    if (!selectedProjetoIds || selectedProjetoIds.length === 0) return false;
    return selectedProjetoIds.some((id) => {
      const p = macros.find((m) => m.id === id);
      return p && p.nome && p.nome.trim().startsWith("Expansão de Postos");
    });
  }, [selectedProjetoIds, macros]);

  const iniciativaIds = useMemo(
    () => iniciativasFiltradas.map((i) => i.id).filter(Boolean),
    [iniciativasFiltradas],
  );

  // Load all TO BE steps for selected initiatives
  const { data: allTobeSteps = [] } = useQuery({
    queryKey: ["project-overview-tobe-steps", iniciativaIds.join(",")],
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

  // Load all AS IS steps for selected initiatives
  const { data: allAsisSteps = [] } = useQuery({
    queryKey: ["project-overview-asis-steps", iniciativaIds.join(",")],
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

  const iniciativasCalculadas = useMemo(() => {
    return iniciativasFiltradas.map((i) => {
      const isAIorRPA = [
        "Sistema Integrado - Dev IA Inteligência Artificial",
        "Automação RPA",
        "Sistema Integrado - Dev IA",
        "Inteligência Artificial",
      ].includes(i.tipo_melhoria || "");
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

      // Percentage is calculated exclusively based on the expectation productivity field
      const pctAuto = Number(i.expectativa_produtividade || 0);

      return {
        ...i,
        ganhoRua,
        ganhoFteVal,
        tempoEconVal,
        pctAuto,
        isAIorRPA,
      };
    });
  }, [iniciativasFiltradas, allTobeSteps, allAsisSteps]);

  // Overall Financial summary
  const totalSavingRealizado = useMemo(() => {
    return iniciativasCalculadas.reduce((s, i) => s + i.ganhoRua, 0);
  }, [iniciativasCalculadas]);

  const totalCustoImplementacao = useMemo(() => {
    return iniciativasCalculadas.reduce((s, i) => s + Number(i.custo_implementacao || 0), 0);
  }, [iniciativasCalculadas]);

  const roiMedio = useMemo(() => {
    return totalCustoImplementacao > 0
      ? ((totalSavingRealizado - totalCustoImplementacao) / totalCustoImplementacao) * 100
      : 0;
  }, [totalSavingRealizado, totalCustoImplementacao]);

  // Calculations for AS IS x TO BE charts
  const projectMetrics = useMemo(() => {
    const totalIniciativas = iniciativasCalculadas.length;
    const hasIniciativas = totalIniciativas > 0;

    // 1. HC AS IS vs TO BE
    const hcAsIs = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.hc_atual || i.hc_estimado || 0), 0)
      : 12;
    const fteFreed = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => acc + i.ganhoFteVal, 0)
      : 3.4;
    const hcToBe = Math.max(0, hcAsIs - fteFreed);

    // 2. Lead Time As Is vs To Be (hours / minutes in DB)
    const ltAsIs = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => {
          const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);
          const sumAsis = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
          return (
            acc +
            (sumAsis || Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60)
          );
        }, 0)
      : 150 * 60;
    const ltToBe = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => {
          const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
          const sumTobe = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
          if (sumTobe > 0) return acc + sumTobe;
          const original =
            Number(i.tempo_max || i.tempo_min || 0) || Number(i.esforco || 3) * 12 * 60;
          return acc + original * (1 - i.pctAuto / 100);
        }, 0)
      : 95 * 60;

    // 3. Tempo As Is vs To Be (Processing hours)
    const tAsIs = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.horas_gastas_mes || 0), 0)
      : 320;
    const tToBe = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.horas_futuras_mes || 0), 0) ||
        tAsIs * 0.45
      : 140;

    // 4. Manual As Is vs Automático To Be / IA
    const autoCount = hasIniciativas
      ? iniciativasCalculadas.filter((i) => {
          const hasHighPotential = i.pctAuto >= 50;
          return i.isAIorRPA || hasHighPotential;
        }).length
      : 3;
    const manualCount = hasIniciativas
      ? iniciativasCalculadas.filter((i) => {
          const hasHighPotential = i.pctAuto >= 50;
          return !(i.isAIorRPA || hasHighPotential);
        }).length
      : 5;

    // 5. Financial Projections cumulative
    const annualSaving = totalSavingRealizado || (hasIniciativas ? 0 : 250000);
    const accumulativeSavings = [
      { year: "Ano 1", "Ganho Acumulado": annualSaving },
      { year: "Ano 2", "Ganho Acumulado": annualSaving * 2 },
      { year: "Ano 3", "Ganho Acumulado": annualSaving * 3 },
      { year: "Ano 4", "Ganho Acumulado": annualSaving * 4 },
      { year: "Ano 5", "Ganho Acumulado": annualSaving * 5 },
    ];

    // 6. Horas Desperdiçadas vs Redução de tempo
    const tempoDesperdicado = tAsIs;
    const tempoReducao = Math.max(0, tAsIs - tToBe);

    // 7. Operating Cost (AS IS vs TO BE)
    const costAsIs = hasIniciativas
      ? iniciativasCalculadas.reduce(
          (acc, i) => acc + Number(i.horas_gastas_mes || 0) * Number(i.custo_hora || 0),
          0,
        ) || tAsIs * 50
      : 16000;
    const costToBe = hasIniciativas
      ? iniciativasCalculadas.reduce(
          (acc, i) => acc + Number(i.horas_futuras_mes || 0) * Number(i.custo_hora || 0),
          0,
        ) || tToBe * 50
      : 7000;

    // 8. Quality error index reduction
    const errorAsIs = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.taxa_erro || 0), 0) /
          totalIniciativas || 15
      : 15;
    const errorToBe = hasIniciativas
      ? iniciativasCalculadas.reduce((acc, i) => acc + Number(i.retrabalho || 0), 0) /
          totalIniciativas || errorAsIs * 0.2
      : 3;

    // Extra advanced metrics
    const autoOrAiIniciativas = iniciativasCalculadas.filter((i) => {
      return i.isAIorRPA || Number(i.potencial_automacao || 0) > 0;
    });

    const avgAutomation = autoOrAiIniciativas.length
      ? autoOrAiIniciativas.reduce((acc, i) => acc + i.pctAuto, 0) / autoOrAiIniciativas.length
      : 68;

    const diasReduzidos = Math.max(0, (ltAsIs - ltToBe) / 60 / 8); // convert from min to 8h workdays
    const ganhoHorasMes = Math.max(0, tAsIs - tToBe);
    const depTiCount = iniciativasCalculadas.filter((i) => i.dependencia_ti === true).length;
    const ganhoProdutividade = tAsIs > 0 ? ((tAsIs - tToBe) / tAsIs) * 100 : 58.5;
    const tempoEconomizadoMin = hasIniciativas
      ? iniciativasCalculadas.reduce((s, i) => s + i.tempoEconVal, 0)
      : 6572;

    return {
      hcAsIs,
      hcToBe,
      fteFreed,
      ltAsIs,
      ltToBe,
      tAsIs,
      tToBe,
      manualCount,
      autoCount,
      accumulativeSavings,
      tempoDesperdicado,
      tempoReducao,
      costAsIs,
      costToBe,
      errorAsIs,
      errorToBe,
      avgAutomation,
      diasReduzidos,
      ganhoHorasMes,
      depTiCount,
      ganhoProdutividade,
      tempoEconomizadoMin,
    };
  }, [iniciativasCalculadas, allAsisSteps, allTobeSteps, totalSavingRealizado]);

  // Modernized comparative data by individual initiative
  const reductionByInitiative = useMemo(() => {
    return iniciativasCalculadas
      .map((i) => {
        const asIsMin = Number(i.tempo_max || i.tempo_min || 0);
        const asisStepsForIni = allAsisSteps.filter((step) => step.iniciativa_id === i.id);
        const sumAsis = asisStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
        const asIsDias =
          sumAsis > 0
            ? sumAsis / 60 / 8
            : asIsMin > 0
              ? asIsMin / 60 / 8
              : Number(i.esforco || 3) * 1.5;

        const tobeStepsForIni = allTobeSteps.filter((step) => step.iniciativa_id === i.id);
        const sumTobe = tobeStepsForIni.reduce((s, r) => s + Number(r.tempo ?? 0), 0);
        const toBeDias =
          sumTobe > 0
            ? sumTobe / 60 / 8
            : Number(i.tempo_futuro || 0) > 0
              ? Number(i.tempo_futuro) / 60 / 8
              : asIsDias * (1 - i.pctAuto / 100);

        const reducaoDias = Math.max(0, asIsDias - toBeDias);
        const pctAuto = i.pctAuto;
        return {
          name: (i.titulo || "Iniciativa").slice(0, 15),
          "Redução (Dias)": Number(reducaoDias.toFixed(1)),
          "Automação %": Math.round(pctAuto),
        };
      })
      .slice(0, 8);
  }, [iniciativasCalculadas, allAsisSteps, allTobeSteps]);

  const hcFteByInitiative = useMemo(() => {
    return iniciativasCalculadas
      .map((i) => ({
        name: (i.titulo || "Iniciativa").slice(0, 15),
        "HC Atual (FTE)": Number(i.hc_atual || i.hc_estimado || 0),
        "FTE Liberado": i.ganhoFteVal || Number(i.hc_atual || 0) * 0.3,
      }))
      .slice(0, 8);
  }, [iniciativasCalculadas]);

  const processHoursByInitiative = useMemo(() => {
    return iniciativasCalculadas
      .map((i) => {
        const gastas = Number(i.horas_gastas_mes || 0);
        const futuras = Number(i.horas_futuras_mes || 0);
        const economizadas = Math.max(0, gastas - futuras);
        return {
          name: (i.titulo || "Iniciativa").slice(0, 15),
          "Horas Gastas/Mês": gastas || (Number(i.tempo_max || i.tempo_min || 45) * 22) / 60,
          "Horas Economizadas/Mês":
            economizadas || (Number(i.tempo_max || i.tempo_min || 45) * 22 * 0.4) / 60,
        };
      })
      .slice(0, 8);
  }, [iniciativasCalculadas]);

  // Aggregate Lean Waste list based on actual initiatives
  const wasteRanking = useMemo(() => {
    const counts: Record<string, number> = {};
    iniciativasCalculadas.forEach((i) => {
      const list = Array.isArray(i.desperdicios_lean)
        ? i.desperdicios_lean
        : typeof i.desperdicios_lean === "string"
          ? String(i.desperdicios_lean).split(",")
          : [];

      list.forEach((w: string) => {
        const trimmed = w.trim();
        if (trimmed) {
          counts[trimmed] = (counts[trimmed] || 0) + 1;
        }
      });
    });

    // Fallbacks if database is currently clean of waste arrays
    const standardWastes = [
      "Superprocessamento",
      "Espera (Gargalo)",
      "Retrabalho",
      "Transporte",
      "Movimentação de Pessoas",
      "Silos de Conhecimento",
      "Excesso de Atividades",
    ];
    standardWastes.forEach((w, idx) => {
      if (!counts[w]) counts[w] = Math.max(1, 5 - idx);
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [iniciativasCalculadas]);

  // Scorecard gap data
  const consolidatedGaps = useMemo(() => {
    if (changeScorecards.length > 0) {
      const s = changeScorecards[0];
      return [
        {
          name: "Cultura",
          "AS IS (Atual)": s.score_cultural_asis || 2,
          "TO BE (Almejado)": s.score_cultural_tobe || 4,
        },
        {
          name: "Padronização",
          "AS IS (Atual)": s.score_padronizacao_asis || 1,
          "TO BE (Almejado)": s.score_padronizacao_tobe || 5,
        },
        {
          name: "Estruturação",
          "AS IS (Atual)": s.score_estruturacao_asis || 2,
          "TO BE (Almejado)": s.score_estruturacao_tobe || 4,
        },
        {
          name: "Organização",
          "AS IS (Atual)": s.score_organizacao_asis || 2,
          "TO BE (Almejado)": s.score_organizacao_tobe || 5,
        },
      ];
    }
    return [
      { name: "Cultura", "AS IS (Atual)": 2, "TO BE (Almejado)": 4 },
      { name: "Padronização", "AS IS (Atual)": 1, "TO BE (Almejado)": 5 },
      { name: "Estruturação", "AS IS (Atual)": 2, "TO BE (Almejado)": 4 },
      { name: "Organização", "AS IS (Atual)": 2, "TO BE (Almejado)": 5 },
    ];
  }, [changeScorecards]);

  // Chart 1: Time by Executor (AS IS vs TO BE)
  const executorTimeData = useMemo(() => {
    const asIsMap: Record<string, number> = {};
    const toBeMap: Record<string, number> = {};

    allAsisSteps.forEach((step) => {
      const exec = step.executor || "Outros";
      asIsMap[exec] = (asIsMap[exec] || 0) + Number(step.tempo ?? 0);
    });

    allTobeSteps.forEach((step) => {
      const exec = step.executor || "Outros";
      toBeMap[exec] = (toBeMap[exec] || 0) + Number(step.tempo ?? 0);
    });

    const allExecutors = Array.from(new Set([...Object.keys(asIsMap), ...Object.keys(toBeMap)]));
    return allExecutors.map((exec) => ({
      name: exec.slice(0, 15),
      "AS IS (Horas)": Number(Number((asIsMap[exec] || 0) / 60).toFixed(1)),
      "TO BE (Horas)": Number(Number((toBeMap[exec] || 0) / 60).toFixed(1)),
    }));
  }, [allAsisSteps, allTobeSteps]);

  // Chart 2: Steps per Initiative (AS IS vs TO BE)
  const stepsPerInitiativeData = useMemo(() => {
    return iniciativasCalculadas.map((ini) => {
      const asIsCount = allAsisSteps.filter((s) => s.iniciativa_id === ini.id).length;
      const toBeCount = allTobeSteps.filter((s) => s.iniciativa_id === ini.id).length;
      return {
        name: ini.codigo || (ini.titulo || "Iniciativa").slice(0, 10),
        "Passos AS IS": asIsCount,
        "Passos TO BE": toBeCount,
      };
    });
  }, [iniciativasCalculadas, allAsisSteps, allTobeSteps]);

  return (
    <div className="space-y-6" id="dashboard_360_projeto_view">
      {/* Active project header info */}
      <div className="rounded-xl border border-vibra-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="rounded-full bg-vibra-100 px-2.5 py-0.5 text-[9.5px] font-extrabold text-vibra-800 uppercase tracking-widest border border-vibra-200">
            Mapeamento & Visão 360º de Detalhe
          </span>
          <h3 className="text-[16px] font-extrabold text-slate-900 mt-1.5">{activeProjectName}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Valores de performance operacional comparados em tempo real de AS IS contra os ganhos TO
            BE.
          </p>
        </div>

        {/* Dynamic Initiative Selector for BI recalculation */}
        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
            Filtrar por Iniciativa (BI):
          </label>
          <select
            value={selectedIniciativaId}
            onChange={(e) => setSelectedIniciativaId(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-vibra-500 focus:outline-none shadow-sm cursor-pointer min-w-[240px] hover:border-slate-300 transition"
          >
            <option value="">Todas as Iniciativas (Consolidado)</option>
            {iniciativas.map((ini) => (
              <option key={ini.id} value={ini.id}>
                [{ini.codigo || "INI-—"}] {ini.titulo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Placares de Ganhos Avançados (Bento Grid) */}
      <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Ganho R$/Ano
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-emerald-50 text-emerald-600">
              <DollarSign className="h-4 w-4" />
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
          <div className="mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1">
            <span className="font-bold text-emerald-800">100% realimentado</span> das iniciativas
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              FTE Total Liberado
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[22px] font-black tracking-tight text-blue-700">
            {projectMetrics.fteFreed.toFixed(2)} FTE
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1">
            <span>Conversão: </span>
            <span className="font-bold text-blue-900">
              {projectMetrics.hcAsIs.toFixed(1)} HC Total
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Dias Úteis Reduzidos
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-orange-50 text-orange-600">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[22px] font-black tracking-tight text-orange-600">
            {projectMetrics.diasReduzidos.toFixed(1)} dias
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1">
            <span>Ganho acumulado de Lead Time</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Ganho de Tempo Total
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-purple-50 text-purple-600">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[22px] font-black tracking-tight text-purple-700">
            {projectMetrics.ganhoHorasMes.toFixed(0)} h/mês
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground flex flex-col gap-0.5">
            <div>
              Eficiência:{" "}
              <span className="font-bold text-purple-900">
                {projectMetrics.ganhoProdutividade.toFixed(1)}%
              </span>
            </div>
            <div>
              Tempo Economizado:{" "}
              <span className="font-bold text-purple-900">
                {projectMetrics.tempoEconomizadoMin.toLocaleString("pt-BR")} min{" "}
                {formatMinutesToHoursMinutesSuffix(projectMetrics.tempoEconomizadoMin)}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Média Automação / IA %
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-emerald-50 text-emerald-600">
              <Zap className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[22px] font-black tracking-tight text-emerald-600">
            {projectMetrics.avgAutomation.toFixed(1)}%
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1">
            <span>Automatização operacional média</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Atividades Manuais vs Auto/IA
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-amber-50 text-amber-600">
              <Activity className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[22px] font-black tracking-tight text-slate-800">
            {projectMetrics.manualCount}{" "}
            <span className="text-sm font-semibold text-muted-foreground">vs</span>{" "}
            {projectMetrics.autoCount}
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground">
            Processos manuais vs automatizados/IA
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm transition hover:shadow-vibra sm:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Dependência de TI Corporativo
            </span>
            <span className="flex h-7.5 w-7.5 items-center justify-center rounded bg-amber-50 text-amber-600">
              <AlertCircle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[22px] font-black tracking-tight text-amber-700">
            {projectMetrics.depTiCount}{" "}
            <span className="text-sm font-semibold text-muted-foreground">
              iniciativas dependentes
            </span>
          </div>
          <div className="mt-1 text-[10.5px] text-muted-foreground flex items-center gap-1">
            <span>Risco de backlog em TI para automação robótica (RPA)</span>
          </div>
        </div>
      </div>

      {/* Core AS IS x TO BE Comparative Charts (Bento Layout) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 1. HC As Is x HC To Be */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_hc_comparison"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">Dimensionamento de Equipe (HC)</h4>
            <p className="text-[10px] text-muted-foreground">AS IS x TO BE (FTEs calculados)</p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "AS IS", Headcount: projectMetrics.hcAsIs },
                  { name: "TO BE", Headcount: projectMetrics.hcToBe },
                ]}
                margin={{ left: -25, right: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 9.5 }} />
                <YAxis tick={{ fontSize: 9.5 }} />
                <Tooltip />
                <Bar dataKey="Headcount" radius={[4, 4, 0, 0]}>
                  <Cell fill="#0B2545" />
                  <Cell fill="#0000FF" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10.5px] bg-slate-50 p-2 rounded text-slate-700 font-medium">
            <p>
              💡{" "}
              <span className="font-bold">
                FTE Liberado: {projectMetrics.fteFreed.toFixed(2)} FTE
              </span>
            </p>
            <p className="text-[9.5px] text-muted-foreground mt-0.5">
              Conversão de HC Total em FTE: {projectMetrics.hcAsIs.toFixed(2)} FTE (AS IS) →{" "}
              {projectMetrics.hcToBe.toFixed(2)} FTE (TO BE)
            </p>
          </div>
        </div>

        {/* 2. Lead Time As Is x To Be */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_lead_time_comparison"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">Lead Time do Processo (h)</h4>
            <p className="text-[10px] text-muted-foreground">
              AS IS x TO BE (Tempo de Resposta do Fluxo)
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "AS IS",
                    Horas: projectMetrics.ltAsIs / 60,
                    Minutos: projectMetrics.ltAsIs,
                  },
                  {
                    name: "TO BE",
                    Horas: projectMetrics.ltToBe / 60,
                    Minutos: projectMetrics.ltToBe,
                  },
                ]}
                margin={{ left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2.5 border border-border rounded-lg shadow-md text-[11.5px] space-y-1">
                          <p className="font-extrabold text-slate-800">{data.name}</p>
                          <p className="text-slate-600 font-medium">
                            Total:{" "}
                            <span className="font-bold text-slate-900">
                              {data.Minutos.toFixed(0)} minutos
                            </span>
                          </p>
                          <p className="text-emerald-700 font-medium">
                            Total convertido:{" "}
                            <span className="font-black text-emerald-800">
                              {data.Horas.toFixed(2)} horas
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="Horas" radius={[4, 4, 0, 0]}>
                  <Cell fill="#0B2545" />
                  <Cell fill="#0000FF" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10.5px] bg-slate-50 p-2 rounded text-slate-700 font-medium">
            <p>
              📉{" "}
              <span className="font-bold">
                Redução de Lead Time:{" "}
                {projectMetrics.ltAsIs > 0
                  ? (
                      ((projectMetrics.ltAsIs - projectMetrics.ltToBe) / projectMetrics.ltAsIs) *
                      100
                    ).toFixed(0)
                  : "0"}
                %
              </span>
            </p>
            <p className="text-[9.5px] text-muted-foreground mt-0.5">
              De {(projectMetrics.ltAsIs / 60).toFixed(1)}h para{" "}
              {(projectMetrics.ltToBe / 60).toFixed(1)}h (
              {(projectMetrics.ltAsIs - projectMetrics.ltToBe).toFixed(0)} min economizados)
            </p>
          </div>
        </div>

        {/* 3. Tempo As Is vs To Be (Processing Time) */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_tempo_comparison"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">Tempo de Processamento (h/Mês)</h4>
            <p className="text-[10px] text-muted-foreground">
              Tempo ativo dedicado à execução das tarefas
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "AS IS", Horas: projectMetrics.tAsIs },
                  { name: "TO BE", Horas: projectMetrics.tToBe },
                ]}
                margin={{ left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="Horas" radius={[4, 4, 0, 0]}>
                  <Cell fill="#0B2545" />
                  <Cell fill="#0000FF" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10.5px] bg-slate-50 p-2 rounded text-slate-700 font-medium">
            <p>
              ⏳{" "}
              <span className="font-bold">
                Horas economizadas:{" "}
                {Math.max(0, projectMetrics.tAsIs - projectMetrics.tToBe).toFixed(0)}h/mês
              </span>
            </p>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Redução de esforço de digitação e retrabalhos manuais.
            </p>
          </div>
        </div>

        {/* 4. NEW: Redução de Dias de cada Iniciativa + % Automação */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_reducao_dias_iniciativa"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">
              Redução de Lead Time vs. Automação
            </h4>
            <p className="text-[10px] text-muted-foreground">
              Comparativo de Dias Salvos & Nível de Automação
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={reductionByInitiative} margin={{ left: -25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 8.5 }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 8.5 }}
                  label={{
                    value: "Dias Salvos",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: 8.5,
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 8.5 }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="Redução (Dias)"
                  fill={VIBRA.orange}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="Automação %"
                  stroke={VIBRA.greenDark}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9.5px] text-center text-muted-foreground font-medium">
            Frentes com alta automação geram maiores reduções de dias úteis.
          </p>
        </div>

        {/* 5. Ganho Financeiro Projetado (5 Anos) */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_ganho_financeiro_5_anos"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">Ganho Financeiro Projetado</h4>
            <p className="text-[10px] text-muted-foreground">Retorno acumulado em 5 anos</p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectMetrics.accumulativeSavings} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="year" tick={{ fontSize: 9.5 }} />
                <YAxis tick={{ fontSize: 9.5 }} />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Bar dataKey="Ganho Acumulado" fill={VIBRA.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] bg-slate-50 p-2 rounded text-slate-700 font-semibold text-center text-emerald-800">
            Retorno do investimento garantido com payback acelerado.
          </div>
        </div>

        {/* 6. NEW: Dimensionamento de Equipe (HC/FTE) por Iniciativa */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_dimensionamento_iniciativas"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">FTEs Liberados por Iniciativa</h4>
            <p className="text-[10px] text-muted-foreground">
              Dimensionamento de Equipe: Atual (FTE) vs Liberado
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hcFteByInitiative} margin={{ left: -25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 8.5 }} />
                <YAxis tick={{ fontSize: 8.5 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 9 }} />
                <Bar dataKey="HC Atual (FTE)" fill={VIBRA.blueLight} radius={[4, 4, 0, 0]} />
                <Bar dataKey="FTE Liberado" fill={VIBRA.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9.5px] text-center text-muted-foreground font-medium">
            Proporção de equipe atual versus capacidade readequável de esforço.
          </p>
        </div>

        {/* 7. Principais Desperdícios Eliminados Ranking */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_ranking_desperdicios_eliminados"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">
              Desperdícios Eliminados (Ranking Lean)
            </h4>
            <p className="text-[10px] text-muted-foreground">
              Principais gargalos mitigados pelas iniciativas
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteRanking} layout="vertical" margin={{ left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis type="number" tick={{ fontSize: 9 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 8 }} />
                <Tooltip />
                <Bar dataKey="value" fill={VIBRA.orange} radius={[0, 4, 4, 0]} name="Ocorrências" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9.5px] text-center text-muted-foreground">
            Impacto direto no encerramento de perdas operacionais Lean.
          </p>
        </div>

        {/* 8. Custo Operacional Mensal (AS IS vs TO BE) */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_custo_operacional_mensal"
        >
          <div>
            <span className="rounded bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 text-[8.5px] font-bold text-emerald-700 uppercase tracking-wider">
              Recomendação Executiva
            </span>
            <h4 className="text-[13px] font-bold text-slate-900 mt-1">
              Custo Operacional do Esforço
            </h4>
            <p className="text-[10px] text-muted-foreground">
              AS IS vs TO BE (Custo estimado em mão de obra/Mês)
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Custo AS IS", Custo: projectMetrics.costAsIs },
                  { name: "Custo TO BE", Custo: projectMetrics.costToBe },
                ]}
                margin={{ left: -10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 9.5 }} />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Bar dataKey="Custo" radius={[4, 4, 0, 0]}>
                  <Cell fill="#0B2545" />
                  <Cell fill="#0000FF" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10.5px] bg-emerald-50 text-emerald-800 p-2 rounded font-bold text-center">
            Economia operacional de{" "}
            {Math.max(0, projectMetrics.costAsIs - projectMetrics.costToBe).toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
            /mês!
          </div>
        </div>

        {/* 9. NEW: Processo x Iniciativas (Horas Gastas vs Horas Economizadas) */}
        <div
          className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between"
          id="chart_processo_horas_mes"
        >
          <div>
            <h4 className="text-[13px] font-bold text-slate-900">
              Processo vs Iniciativas (Horas/Mês)
            </h4>
            <p className="text-[10px] text-muted-foreground">
              Horas Gastas vs Horas Economizadas por Processo
            </p>
          </div>
          <div className="h-[180px] w-full my-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processHoursByInitiative} margin={{ left: -25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 8.5 }} />
                <YAxis tick={{ fontSize: 8.5 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 9 }} />
                <Bar dataKey="Horas Gastas/Mês" fill={VIBRA.orange} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Horas Economizadas/Mês" fill={VIBRA.green} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9.5px] text-center text-muted-foreground font-medium">
            Relação direta de tempo de esforço operacional liberado.
          </p>
        </div>
      </div>

      {/* Gráficos Avançados de Controle AS IS x TO BE */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm space-y-6">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-[14px] font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
            <Activity className="h-5 w-5 text-vibra-700" />
            <span>Gráficos de Controle de Processos (AS IS × TO BE)</span>
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Monitoramento analítico comparativo dos fluxos mapeados de processo por executor e iniciativa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chart 1: Time by Executor */}
          <div className="rounded-lg bg-slate-50 p-3 flex flex-col justify-between">
            <div>
              <h4 className="text-[12px] font-extrabold text-slate-800 tracking-tight uppercase mb-1">
                Distribuição de Carga Horária por Executor
              </h4>
              <p className="text-[10px] text-muted-foreground">
                Tempo total operacional alocado (em horas) em cada papel/sistema.
              </p>
            </div>
            <div className="h-[210px] w-full mt-3">
              {executorTimeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={executorTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 9, fill: "#64748b" }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9.5 }} />
                    <Bar dataKey="AS IS (Horas)" fill="#EF4444" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="TO BE (Horas)" fill="#007BFF" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-xs text-muted-foreground italic">
                  Nenhum passo cadastrado nos fluxos.
                </div>
              )}
            </div>
          </div>

          {/* Chart 2: Steps per Initiative */}
          <div className="rounded-lg bg-slate-50 p-3 flex flex-col justify-between">
            <div>
              <h4 className="text-[12px] font-extrabold text-slate-800 tracking-tight uppercase mb-1">
                Redução de Complexidade (Quantidade de Passos)
              </h4>
              <p className="text-[10px] text-muted-foreground">
                Comparação do número de etapas para conclusão da iniciativa.
              </p>
            </div>
            <div className="h-[210px] w-full mt-3">
              {stepsPerInitiativeData.some(d => d["Passos AS IS"] > 0 || d["Passos TO BE"] > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stepsPerInitiativeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 9, fill: "#64748b" }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9.5 }} />
                    <Bar dataKey="Passos AS IS" fill="#64748b" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Passos TO BE" fill="#10B981" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-xs text-muted-foreground italic">
                  Crie etapas AS IS / TO BE na aba Mapeamento para visualizar.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Image Mural Section */}
      <div
        className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm"
        id="mural_evidencias_dashboard_sec"
      >
        <h3 className="text-[14px] font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2 flex items-center gap-1.5">
          <ImageIcon className="h-5 w-5 text-blue-600" />
          <span>Mural de Evidências & Fluxos Estratégicos</span>
        </h3>

        {projectImages.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-muted-foreground text-xs">
            <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-1" />
            Nenhuma imagem ou fluxo estratégico cadastrado ainda. Adicione-as na aba "Mural de
            Imagens" do Mapeamento.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
            {projectImages.slice(0, 8).map((img) => (
              <div
                key={img.id}
                onClick={() => setViewerImage(img)}
                className="relative cursor-pointer group overflow-hidden rounded-lg border border-border bg-slate-50 hover:border-blue-500 hover:shadow transition-all"
              >
                <div
                  className={`w-full ${img.aspect_ratio === "16:9" ? "aspect-video" : "aspect-[9/16] h-[160px] flex items-center justify-center bg-slate-900"}`}
                >
                  <img
                    src={img.url}
                    alt={img.legenda}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-1.5 bg-white text-[10px] font-bold text-slate-800 truncate border-t border-slate-100">
                  {img.legenda}
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Maximize2 className="h-4 w-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Strategic Image Large Screen presentation Modal */}
      {viewerImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in">
          <button
            onClick={() => setViewerImage(null)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div
              className={`relative ${viewerImage.aspect_ratio === "16:9" ? "w-full aspect-video" : "h-[85vh] aspect-[9/16]"} bg-slate-950 rounded-lg overflow-hidden flex items-center justify-center border border-white/10`}
            >
              <img
                src={viewerImage.url}
                alt={viewerImage.legenda}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="rounded bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300 uppercase tracking-widest">
                Formato {viewerImage.aspect_ratio}
              </span>
              <h4 className="text-[15px] font-black text-white mt-1.5">{viewerImage.legenda}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
