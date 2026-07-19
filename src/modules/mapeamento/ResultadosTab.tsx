import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa } from "./_shared";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  Clock,
  Users,
  DollarSign,
  ListOrdered,
  ArrowUpRight,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

export function ResultadosTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const { iniciativaId } = useHierarchy();

  const { data: ini } = useQuery({
    queryKey: ["res-ini", iniciativaId],
    queryFn: async () => {
      const res = await supabase.from("iniciativas").select("*").eq("id", iniciativaId!).single();
      return res.data;
    },
  });

  const { data: asis = [] } = useQuery({
    queryKey: ["res-asis", iniciativaId],
    queryFn: async () => {
      const res = await supabase
        .from("asis_passos")
        .select("tempo")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);
      return res.data ?? [];
    },
  });

  const { data: tobe = [] } = useQuery({
    queryKey: ["res-tobe-rich", iniciativaId],
    queryFn: async () => {
      const res = await supabase
        .from("tobe_passos")
        .select("tempo, ganho_fte, ganho_financeiro")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);
      return res.data ?? [];
    },
  });

  // --- Calculations ---
  const tA = asis.reduce((s: number, r: any) => s + Number(r.tempo ?? 0), 0);
  const tB = tobe.reduce((s: number, r: any) => s + Number(r.tempo ?? 0), 0);
  const redTempoPercent = tA ? ((tA - tB) / tA) * 100 : 0;

  const ganhoFteSum = tobe.reduce((s: number, r: any) => s + Number(r.ganho_fte ?? 0), 0);
  const hcA = Number(ini?.hc_atual ?? 0);

  // Synchronized FTE calculation: Future HC (TO-BE) cannot be 0 if time is only reduced by 67%.
  // We calculate proportional headcount reduction based on time reduction, and use manual steps sum as a helper.
  const hcLiberado = ganhoFteSum > 0 ? ganhoFteSum : hcA * (redTempoPercent / 100);
  const hcB = Math.max(hcA * (1 - redTempoPercent / 100), hcA - hcLiberado);

  const ganhoFinSum = tobe.reduce((s: number, r: any) => s + Number(r.ganho_financeiro ?? 0), 0);
  const ganhoAno = ganhoFinSum > 0 ? ganhoFinSum : Number(ini?.saving_previsto ?? 0);

  // Formatting helpers
  const formatTime = (minutes: number) => {
    const rounded = Math.round(minutes);
    const hours = Math.floor(rounded / 60);
    const remainingMinutes = rounded % 60;
    const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    return `${rounded} min (${hours}h ${minutesStr}min)`;
  };

  // Modern Chart Data split by metrics with clean naming and values
  const timeChartData = [
    {
      name: "Lead Time (Horas)",
      "AS-IS": Number((tA / 60).toFixed(1)),
      "TO-BE": Number((tB / 60).toFixed(1)),
    },
  ];

  const hcChartData = [
    {
      name: "Dimensionamento (HC)",
      "AS-IS": Number(hcA.toFixed(2)),
      "TO-BE": Number(hcB.toFixed(2)),
    },
  ];

  const stepsChartData = [
    { name: "Etapas do Processo", "AS-IS": asis.length, "TO-BE": tobe.length },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs font-sans">
          <p className="font-extrabold text-slate-800 mb-2">{payload[0].payload.name}</p>
          <div className="space-y-1.5">
            {payload.map((p: any) => (
              <div key={p.name} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.fill }} />
                  {p.name}:
                </span>
                <span className="font-black text-slate-900">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Premium KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* KPI 1: Lead Time Reduction */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-xl border border-blue-100 bg-blue-50/20 p-5 shadow-vibra-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-blue-600" /> Redução de Lead Time
            </span>
            <span className="rounded-full bg-blue-100/50 p-1.5 text-blue-700">
              <TrendingDown className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-900 tracking-tight">
              {redTempoPercent.toFixed(1)}%
            </span>
            <span className="text-[11px] font-extrabold text-blue-600">de eficiência</span>
          </div>
          <div className="mt-3 border-t border-blue-100/30 pt-2 flex justify-between text-[11px] text-blue-800/80">
            <span>
              Tempo AS-IS: <strong>{formatTime(tA)}</strong>
            </span>
            <span>
              Alvo TO-BE: <strong>{formatTime(tB)}</strong>
            </span>
          </div>
        </motion.div>

        {/* KPI 2: HC Liberados (AS IS x TO BE) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/20 p-5 shadow-vibra-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-indigo-600" /> Colaboradores Liberados (HC)
            </span>
            <span className="rounded-full bg-indigo-100/50 p-1.5 text-indigo-700">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-900 tracking-tight">
              {hcLiberado.toFixed(2)}
            </span>
            <span className="text-[11px] font-extrabold text-indigo-600">colaboradores (HC)</span>
          </div>
          <div className="mt-3 border-t border-indigo-100/30 pt-2 flex justify-between text-[11px] text-indigo-800/80">
            <span>
              AS-IS Equipe: <strong>{hcA.toFixed(1)} HC</strong>
            </span>
            <span>
              TO-BE Alvo: <strong>{hcB.toFixed(1)} HC</strong>
            </span>
          </div>
        </motion.div>

        {/* KPI 3: Saving Financeiro Sincronizado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/20 p-5 shadow-vibra-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-emerald-600" /> Saving Sincronizado
            </span>
            <span className="rounded-full bg-emerald-100/50 px-2 py-0.5 text-emerald-700 font-extrabold text-[9px] uppercase tracking-wider">
              Anual
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-900 tracking-tight">
              {ganhoAno.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="mt-3 border-t border-emerald-100/30 pt-2 flex justify-between text-[11px] text-emerald-800/80">
            <span>Retorno Mapeado</span>
            <span className="font-black text-emerald-700">100% Sincronizado</span>
          </div>
        </motion.div>
      </div>

      {/* Modern Charts Layout in Bento-style Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Chart 1: Time Comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[13.5px] font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-blue-600" /> Lead Time do Processo (Horas)
              </h4>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                -{redTempoPercent.toFixed(0)}% de Tempo
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">
              Comparativo direto de horas de trabalho operacionais no fluxo.
            </p>
          </div>

          <div className="h-[220px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeChartData} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 9.5, fill: "#64748b" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconSize={8}
                  iconType="circle"
                  wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
                />
                {/* AS-IS: Azul Marinho, TO-BE: Azul Vibra */}
                <Bar
                  name="Cenário Atual (AS-IS)"
                  dataKey="AS-IS"
                  fill="#0B2545"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Cenário Alvo (TO-BE)"
                  dataKey="TO-BE"
                  fill="#007BFF"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Chart 2: Headcount (FTE) Comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[13.5px] font-bold text-slate-900 flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5 text-indigo-600" /> Dimensionamento de Equipe (HC)
              </h4>
              <span className="text-[10px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded-full">
                Sincronizado
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-4">
              Equivalente de headcount (HC) exigido para a realização do processo.
            </p>
          </div>

          <div className="h-[220px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hcChartData} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9.5, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 9.5, fill: "#64748b" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconSize={8}
                  iconType="circle"
                  wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
                />
                {/* AS-IS: Azul Marinho, TO-BE: Azul Vibra */}
                <Bar
                  name="Cenário Atual (AS-IS)"
                  dataKey="AS-IS"
                  fill="#0B2545"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Cenário Alvo (TO-BE)"
                  dataKey="TO-BE"
                  fill="#007BFF"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Steps and Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-slate-100 pb-3 gap-2">
          <div>
            <h4 className="text-[13.5px] font-bold text-slate-900 flex items-center gap-1.5">
              <ListOrdered className="h-4.5 w-4.5 text-blue-600" /> Estrutura Comparativa de
              Processo
            </h4>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Diagnóstico de complexidade entre as etapas mapeadas em tempo real.
            </p>
          </div>
          <div>
            <span className="text-[11.5px] font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md flex items-center gap-1.5">
              {asis.length} Passos AS-IS <ArrowRight className="h-3 w-3" /> {tobe.length} Passos
              TO-BE
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-100">
            <p className="font-extrabold text-slate-800 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0B2545]" /> Diagnóstico Atual (AS-IS)
            </p>
            <p className="text-muted-foreground leading-relaxed">
              O fluxo de trabalho conta com <strong>{asis.length} etapas mapeadas</strong>, somando
              um esforço total de <strong>{formatTime(tA)}</strong> com{" "}
              <strong>{hcA} colaboradores dedicados</strong>. O tempo operacional é impactado por
              etapas manuais redundantes e tempos excessivos de ciclo.
            </p>
          </div>
          <div className="space-y-2 rounded-xl bg-blue-50/20 p-4 border border-blue-100/50">
            <p className="font-extrabold text-blue-800 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#007BFF]" /> Proposta de Otimização
              (TO-BE)
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com as melhorias estruturadas, o fluxo é otimizado para{" "}
              <strong>{tobe.length} etapas eficientes</strong>, diminuindo o Lead Time para{" "}
              <strong>{formatTime(tB)}</strong>. Isso liberta{" "}
              <strong>{hcLiberado.toFixed(2)} HC</strong>, deixando a equipe alvo dimensionada em{" "}
              <strong>{hcB.toFixed(2)} HC</strong> e gerando um saving de{" "}
              <strong>
                {ganhoAno.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                /ano
              </strong>
              .
            </p>
          </div>
        </div>
      </motion.div>

      {/* Premise Footnote */}
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-[10.5px] text-slate-500 leading-normal font-medium mt-4">
        <span className="font-bold text-slate-700">Nota de Premissa:</span> Todos os cálculos e
        indicadores acima são focados exclusivamente em{" "}
        <span className="font-bold text-slate-700">Headcount (HC)</span> para evitar confusões de
        alocação de equipe. Informações e estudos de{" "}
        <span className="font-extrabold text-slate-700">FTE (Full-Time Equivalent)</span> são
        tratados como observações acessórias onde{" "}
        <span className="font-bold text-slate-700">1 FTE equivale a 165 horas úteis mensais</span>{" "}
        de esforço dedicado.
      </div>
    </div>
  );
}
