import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMemo, useState } from "react";
import { Sparkles, Plus, Heart, Trash2, Trophy, Award, Medal, Star, Eye } from "lucide-react";
import { VIBRA, VIBRA_SERIES } from "@/lib/vibraColors";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Treemap,
} from "recharts";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";

const BADGES = [
  {
    codigo: "PIONEIRO",
    titulo: "🚀 Pioneiro",
    descricao: "Primeira iniciativa entregue",
    pontos: 50,
  },
  {
    codigo: "MENTOR",
    titulo: "🧠 Mentor",
    descricao: "Compartilhou conhecimento com o time",
    pontos: 30,
  },
  {
    codigo: "GARGALO",
    titulo: "🎯 Caçador de Gargalos",
    descricao: "Identificou e removeu um gargalo crítico",
    pontos: 40,
  },
  {
    codigo: "PARCEIRO",
    titulo: "🤝 Parceiro do Ano",
    descricao: "Colaboração excepcional entre áreas",
    pontos: 35,
  },
  {
    codigo: "VELOZ",
    titulo: "⚡ Velocista",
    descricao: "Entrega antes do prazo planejado",
    pontos: 25,
  },
  {
    codigo: "DETALHE",
    titulo: "🔍 Olho Clínico",
    descricao: "Atenção aos detalhes que evitou retrabalho",
    pontos: 20,
  },
];

const KPI_HUMANOS = [
  "🕵️ Sherlock de Melhorias",
  "💡 Arquiteto de Soluções",
  "📊 Oráculo dos Dados",
  "🤖 Mestre da IA",
  "⚙️ Mestre da Automação",
  "💬 Crítico Construtivo",
  "🧠 Compartilhador de Conhecimento",
  "🚀 Agente de Transformação",
  "🔍 Auditor de Excelência",
  "🏅 Guardião da Eficiência",
  "🎯 Caçador de Gargalos",
  "🕸️ Decifrador de Processos",
  "⚡ Gerador de Atalhos",
  "🦾 Amplificador Humano",
  "⚙️ Caçador de Cliques",
  "🏭 Operador Invisível",
  "📡 Caçador de Insights",
];

const CATEGORIAS = [
  "🐜 Formiga Atômica",
  "🦅 Visão de Águia",
  "🧩 Mestre da Causa Raiz",
  "🎭 Advogado do Processo",
  "💬 Crítico de Ouro",
  "🏅 Inconformista do Ano",
  "🚀 Disruptor do Ano",
  "⚡ Efeito Dominó",
  "🌊 Mudança de Maré",
];

export function MC3Tab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const [openAdd, setOpenAdd] = useState(false);
  const [filterKpi, setFilterKpi] = useState("");
  const [filterPersona, setFilterPersona] = useState("");
  const [selectedKpiForDetail, setSelectedKpiForDetail] = useState<string>("");
  const [chartType, setChartType] = useState<"radar" | "radial" | "pie" | "treemap" | "bar">(
    "radar",
  );

  const { data: registros = [] } = useQuery({
    queryKey: ["mc3"],
    queryFn: async () =>
      (
        await supabase
          .from("mc3_registros")
          .select("*")
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles-mc3"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? [],
  });
  const pMap = new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? ""]));

  const { data: reconhecimentos = [] } = useQuery({
    queryKey: ["reconhecimentos"],
    queryFn: async () =>
      (await supabase.from("reconhecimentos").select("*").order("created_at", { ascending: false }))
        .data ?? [],
  });

  const filtered = registros.filter(
    (r) =>
      (!filterKpi || r.kpi_humano === filterKpi) &&
      (!filterPersona || r.profile_id === filterPersona),
  );

  // Pódio combinando MC3 + reconhecimentos (peso 1 por MC3, pontos do badge para reconhecimentos)
  const podio = useMemo(() => {
    const score = new Map<string, { pts: number; mc3: number; badges: number }>();
    for (const r of registros) {
      const cur = score.get(r.profile_id) ?? { pts: 0, mc3: 0, badges: 0 };
      cur.pts += 10;
      cur.mc3 += 1;
      score.set(r.profile_id, cur);
    }
    for (const r of reconhecimentos) {
      const cur = score.get(r.profile_id) ?? { pts: 0, mc3: 0, badges: 0 };
      cur.pts += Number(r.pontos ?? 20);
      cur.badges += 1;
      score.set(r.profile_id, cur);
    }
    return [...score.entries()]
      .map(([id, s]) => ({ id, nome: pMap.get(id) ?? "—", ...s }))
      .sort((a, b) => b.pts - a.pts)
      .slice(0, 5);
  }, [registros, reconhecimentos, pMap]);

  const rankingByPersona = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((r) => {
      const k = pMap.get(r.profile_id) ?? "—";
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([nome, qtd]) => ({ nome, qtd }));
  }, [filtered, pMap]);

  const rankingByKpi = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((r) => {
      m.set(r.kpi_humano, (m.get(r.kpi_humano) ?? 0) + 1);
    });
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([nome, qtd]) => ({ nome, qtd }));
  }, [filtered]);

  const kpiRadarData = useMemo(() => {
    const counts: Record<string, number> = {};
    KPI_HUMANOS.forEach((k) => {
      counts[k] = 0;
    });
    filtered.forEach((r) => {
      if (counts[r.kpi_humano] !== undefined) {
        counts[r.kpi_humano] += 1;
      } else {
        counts[r.kpi_humano] = 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => {
      const cleanName = name.replace(/[\uD800-\uDFFF\u2600-\u27BF]/g, "").trim();
      return {
        subject: cleanName,
        value: value,
        fullMark: Math.max(...Object.values(counts), 3),
      };
    });
  }, [filtered]);

  const radialData = useMemo(() => {
    const list = kpiRadarData.filter((d) => d.value > 0);
    if (list.length === 0) {
      return kpiRadarData.slice(0, 6).map((d, i) => ({
        ...d,
        name: d.subject,
        fill: VIBRA_SERIES[i % VIBRA_SERIES.length],
      }));
    }
    return list.map((d, i) => ({
      ...d,
      name: d.subject,
      fill: VIBRA_SERIES[i % VIBRA_SERIES.length],
    }));
  }, [kpiRadarData]);

  const pieData = useMemo(() => {
    const list = kpiRadarData.filter((d) => d.value > 0);
    return list.length === 0 ? kpiRadarData.slice(0, 6) : list;
  }, [kpiRadarData]);

  const treemapData = useMemo(() => {
    return kpiRadarData.map((d) => ({
      name: d.subject,
      size: d.value || 0.1,
    }));
  }, [kpiRadarData]);

  const topKpi = useMemo(() => {
    if (rankingByKpi.length === 0) return KPI_HUMANOS[0];
    return rankingByKpi[0].nome;
  }, [rankingByKpi]);

  const activeKpi = selectedKpiForDetail || topKpi;

  const latestContribForActiveKpi = useMemo(() => {
    const matched = filtered.filter((r) => r.kpi_humano === activeKpi);
    return matched.length > 0 ? matched[0] : null;
  }, [filtered, activeKpi]);

  const ambassadorsForActiveKpi = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered
      .filter((r) => r.kpi_humano === activeKpi)
      .forEach((r) => {
        counts[r.profile_id] = (counts[r.profile_id] || 0) + 1;
      });
    return Object.entries(counts)
      .map(([id, qty]) => ({ name: pMap.get(id) || "—", qty }))
      .sort((a, b) => b.qty - a.qty);
  }, [filtered, activeKpi, pMap]);

  const pessoasEnvolvidas = new Set(registros.map((r) => r.profile_id)).size;
  const horasInvestidas = registros.reduce((s, r) => s + Number(r.tempo_dedicado_min ?? 0), 0) / 60;
  const totalRegistros = registros.length;
  const cep = Math.min(100, (totalRegistros / Math.max(1, profiles.length)) * 20);

  async function criar(form: FormData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("mc3_registros").insert({
      profile_id: form.get("profile_id") as string,
      kpi_humano: form.get("kpi_humano") as string,
      categoria_diferenciada: form.get("categoria") as string,
      contribuicao: form.get("contribuicao") as string,
      tempo_dedicado_min: Number(form.get("tempo") || 0),
      created_by: user?.id,
    });
    if (error) return toast.error(error.message);
    toast.success("Registro adicionado");
    setOpenAdd(false);
    qc.invalidateQueries({ queryKey: ["mc3"] });
  }

  async function excluir(id: string) {
    if (!(await confirm("Excluir registro?", "Tem certeza que deseja excluir este registro?")))
      return;
    await supabase
      .from("mc3_registros")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["mc3"] });
  }

  const [openBadge, setOpenBadge] = useState(false);
  async function darBadge(form: FormData) {
    const codigo = form.get("badge") as string;
    const badge = BADGES.find((b) => b.codigo === codigo);
    if (!badge) return toast.error("Selecione um badge");
    const profile_id = form.get("para") as string;
    if (!profile_id) return toast.error("Escolha o colega");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("reconhecimentos").insert({
      profile_id,
      codigo: badge.codigo,
      titulo: badge.titulo,
      descricao: (form.get("mensagem") as string) || badge.descricao,
      pontos: badge.pontos,
      concedido_por: user?.id ?? null,
    });
    if (error) return toast.error(error.message);
    toast.success(`Badge ${badge.titulo} concedido!`);
    setOpenBadge(false);
    qc.invalidateQueries({ queryKey: ["reconhecimentos"] });
  }

  async function removerReconhecimento(id: string) {
    if (!(await confirm("Remover badge?", "Tem certeza que deseja remover este badge?"))) return;
    await supabase.from("reconhecimentos").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["reconhecimentos"] });
  }

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-vibra-50 to-white p-5 shadow-vibra-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-vibra-800">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-[18px] font-bold">MC³ — Motivação Contínua</h2>
            </div>
            <p className="mt-0.5 text-[11px] uppercase tracking-widest text-vibra-700">
              Cognitivo · Conectado · Contínuo
            </p>
            <p
              className="mt-3 italic text-vibra-800"
              style={{
                fontFamily:
                  '"Cormorant Garamond", "EB Garamond", Garamond, "Times New Roman", serif',
                fontSize: 22,
                letterSpacing: "0.01em",
                lineHeight: 1.35,
              }}
            >
              "Quando um dashboard revela comportamentos, ele deixa de ser uma ferramenta de
              controle e se torna uma ferramenta de transformação."
            </p>
          </div>
          <button
            onClick={() => setOpenAdd(true)}
            className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-3 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800"
          >
            <Plus className="h-3.5 w-3.5" /> Novo Reconhecimento
          </button>
        </div>
      </div>

      {/* KPIs MC³ */}
      <div className="grid gap-3 sm:grid-cols-4">
        <KPI label="Pessoas Envolvidas" value={pessoasEnvolvidas} icon={Heart} />
        <KPI label="Horas Investidas" value={`${horasInvestidas.toFixed(1)}h`} icon={Sparkles} />
        <KPI label="Reconhecimentos" value={totalRegistros} icon={Heart} />
        <KPI
          label="CEP — Pulso da Equipe"
          value={`${cep.toFixed(0)}%`}
          icon={Sparkles}
          tone="good"
        />
      </div>

      {/* Teia de Superpoderes & Vitrine de Impacto (NC³) */}
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        {/* Radar de Superpoderes Coletivos */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm flex flex-col">
          <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-vibra-800">
              <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" />
              <h3 className="text-[14px] font-bold uppercase tracking-wider">
                Superpoderes do Time
              </h3>
            </div>

            <div className="flex items-center gap-1.5 self-end">
              <span className="text-[10px] uppercase font-bold text-slate-400">Visualização:</span>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as any)}
                className="h-8 rounded border border-neutral-200 bg-white px-2 text-[11px] font-semibold text-neutral-700 outline-none hover:border-indigo-400 transition"
              >
                <option value="radar">🕸️ Teia de Radar</option>
                <option value="radial">🌀 Radial Bar Polar</option>
                <option value="pie">🍩 Donut de Competências</option>
                <option value="treemap">🗺️ Treemap de Impacto</option>
                <option value="bar">📊 Colunas Clássicas</option>
              </select>
            </div>
          </div>
          <p className="text-[11.5px] text-slate-500 mb-4">
            Distribuição dos comportamentos de melhoria contínua ativos no portfólio. Clique nos
            KPIs abaixo para detalhar.
          </p>

          <div className="flex-1 flex items-center justify-center min-h-[320px]">
            {chartType === "radar" && (
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={kpiRadarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 9, fontWeight: 600, fill: "#475569" }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, "auto"]} tick={{ fontSize: 9 }} />
                  <Radar
                    name="Ocorrências"
                    dataKey="value"
                    stroke={VIBRA.indigo || "#6366f1"}
                    fill={VIBRA.indigo || "#6366f1"}
                    fillOpacity={0.25}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}

            {chartType === "radial" && (
              <ResponsiveContainer width="100%" height={320}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="15%"
                  outerRadius="90%"
                  barSize={10}
                  data={radialData}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    label={{
                      position: "insideStart",
                      fill: "#1e293b",
                      fontSize: 9,
                      fontWeight: "bold",
                    }}
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            )}

            {chartType === "pie" && (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="subject"
                    label={({ subject, value }) => (value > 0 ? `${subject} (${value})` : "")}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={VIBRA_SERIES[index % VIBRA_SERIES.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}

            {chartType === "treemap" && (
              <ResponsiveContainer width="100%" height={320}>
                <Treemap data={treemapData} dataKey="size" stroke="#fff" fill="#4f46e5">
                  <Tooltip />
                </Treemap>
              </ResponsiveContainer>
            )}

            {chartType === "bar" && (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={kpiRadarData.filter((d) => d.value > 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="subject" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]}>
                    {kpiRadarData
                      .filter((d) => d.value > 0)
                      .map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={VIBRA_SERIES[index % VIBRA_SERIES.length]}
                        />
                      ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          {/* Quick selectors for detail */}
          <div className="mt-4 pt-3 border-t border-slate-50 flex flex-wrap gap-1">
            {KPI_HUMANOS.map((k) => {
              const count = filtered.filter((r) => r.kpi_humano === k).length;
              const isActive = activeKpi === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSelectedKpiForDetail(k)}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
                    isActive
                      ? "bg-vibra-700 text-white shadow-sm ring-2 ring-vibra-700/10"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"
                  }`}
                >
                  <span>{k.split(" ")[0]}</span>
                  <span className="truncate max-w-[70px]">{k.split(" ").slice(1).join(" ")}</span>
                  {count > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[8px] ${isActive ? "bg-white text-vibra-800" : "bg-slate-200 text-slate-700"}`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vitrine de Impacto de Comportamento */}
        <div className="rounded-xl border border-border bg-gradient-to-b from-indigo-50/10 via-white to-white p-5 shadow-vibra-sm flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-vibra-800">
                <Heart className="h-5 w-5 text-rose-500" />
                <h3 className="text-[14px] font-bold uppercase tracking-wider">
                  Vitrine de Impacto (MC³)
                </h3>
              </div>
              <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Ativo em Foco
              </span>
            </div>

            <div className="rounded-lg border border-indigo-100/50 bg-indigo-50/20 p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{activeKpi.split(" ")[0]}</span>
                <h4 className="text-[15px] font-bold text-vibra-800">
                  {activeKpi.split(" ").slice(1).join(" ")}
                </h4>
              </div>
              <p className="text-[11.5px] text-slate-600 italic">
                Como esse superpoder contribui para a melhoria contínua e estimula o crescimento das
                pessoas?
              </p>
              <div className="mt-2.5 text-[11px] bg-white border border-indigo-100/30 rounded px-2.5 py-1.5 text-indigo-800 font-medium leading-relaxed">
                {activeKpi.includes("Sherlock") &&
                  "Incentiva a investigação profunda de desvios, indo além dos sintomas para sanar as causas-raiz dos problemas do negócio."}
                {activeKpi.includes("Arquiteto") &&
                  "Traduz ideias em soluções estruturadas e sustentáveis, otimizando o fluxo e empoderando o time com melhores processos."}
                {activeKpi.includes("Oráculo") &&
                  "Valoriza as decisões pautadas em evidências quantitativas, eliminando palpites e garantindo precisão nas entregas."}
                {activeKpi.includes("Mestre da IA") &&
                  "Impulsiona a produtividade ao integrar inteligência artificial generativa de forma prática no dia a dia da operação."}
                {activeKpi.includes("Automação") &&
                  "Elimina tarefas repetitivas e manuais através de scripts, integrações e rotinas automáticas de alta eficiência."}
                {activeKpi.includes("Crítico") &&
                  "Oferece feedback franco e respeitoso, desafiando o status quo para elevar continuamente o padrão de entrega."}
                {activeKpi.includes("Compartilhador") &&
                  "Cria um ambiente de aprendizado coletivo, assegurando que o conhecimento técnico circule livremente e fortaleça o time."}
                {activeKpi.includes("Agente") &&
                  "Facilita transições e adoção de novas metodologias, servindo de elo de engajamento para as transformações culturais."}
                {activeKpi.includes("Auditor") &&
                  "Zela pelo padrão de ouro, documentação impecável e conformidade, garantindo que a qualidade nunca seja comprometida."}
                {activeKpi.includes("Guardião") &&
                  "Focado na otimização de recursos, mitigando desperdício de tempo ou insumos em cada etapa das atividades."}
                {activeKpi.includes("Gargalos") &&
                  "Aponta de forma cirúrgica onde o processo está travado e colabora ativamente para reestabelecer a fluidez do time."}
                {activeKpi.includes("Processos") &&
                  "Especialista em mapear, documentar e simplificar fluxos operacionais para torná-los claros a todos."}
                {activeKpi.includes("Atalhos") &&
                  "Descobre caminhos alternativos mais eficientes para alcançar os mesmos resultados, acelerando o time."}
                {activeKpi.includes("Amplificador") &&
                  "Focado em empoderar e dar voz às pessoas, multiplicando a motivação e os talentos de cada colega."}
                {activeKpi.includes("Cliques") &&
                  "Inconformado com sistemas complexos, simplifica as telas e caminhos para economizar effort humano."}
                {activeKpi.includes("Invisível") &&
                  "Garante de forma silenciosa que toda a infraestrutura e bastidores funcionem perfeitamente sem interrupções."}
                {activeKpi.includes("Insights") &&
                  "Conecta pontos dispersos e extrai ideias valiosas de conversas comuns ou dados sutis, gerando inovação."}
                {!activeKpi.match(
                  /(Sherlock|Arquiteto|Oráculo|IA|Automação|Crítico|Compartilhador|Agente|Auditor|Guardião|Gargalos|Processos|Atalhos|Amplificador|Cliques|Invisível|Insights)/,
                ) &&
                  "Fortalece a melhoria contínua através da colaboração ativa, empatia, qualidade e foco em soluções eficientes."}
              </div>
            </div>

            {/* Embaixadores do Comportamento */}
            <div className="mb-4">
              <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">
                Líderes deste Comportamento
              </h5>
              {ambassadorsForActiveKpi.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic">
                  Nenhum integrante marcado com este superpoder ainda.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {ambassadorsForActiveKpi.slice(0, 4).map((a, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {a.name}
                      <span className="rounded bg-indigo-50 px-1 text-[9px] font-extrabold text-indigo-700">
                        {a.qty}x
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Último relato real */}
          <div className="border-t border-slate-100 pt-3 mt-3">
            <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1">
              <Eye className="h-3 w-3 text-indigo-500" /> Último Exemplo Prático Registrado
            </h5>
            {latestContribForActiveKpi ? (
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-100/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-700">
                    {pMap.get(latestContribForActiveKpi.profile_id) || "—"}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {latestContribForActiveKpi.tempo_dedicado_min
                      ? `${latestContribForActiveKpi.tempo_dedicado_min} min dedicados`
                      : ""}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 italic leading-relaxed">
                  "{latestContribForActiveKpi.contribuicao}"
                </p>
                {latestContribForActiveKpi.categoria_diferenciada && (
                  <span className="inline-block mt-2 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-extrabold text-amber-700 border border-amber-100/50">
                    🎯 Categoria: {latestContribForActiveKpi.categoria_diferenciada}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                Nenhuma contribuição em texto relatada sob este superpoder ainda.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pódio + Badges peer-to-peer */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-border bg-gradient-to-br from-amber-50 via-white to-vibra-50 p-5 shadow-vibra-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-vibra-800">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="text-[14px] font-bold uppercase tracking-wider">Pódio MC³</h3>
            </div>
            <span className="text-[10.5px] text-muted-foreground">MC³ + Badges</span>
          </div>
          {podio.length === 0 ? (
            <p className="py-6 text-center text-[12px] italic text-muted-foreground">
              Sem pontos ainda. Comece reconhecendo um colega ✨
            </p>
          ) : (
            <ol className="space-y-2">
              {podio.map((p, i) => {
                const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}º`;
                const bg =
                  i === 0
                    ? "bg-amber-100 border-amber-300"
                    : i === 1
                      ? "bg-slate-100 border-slate-300"
                      : i === 2
                        ? "bg-orange-100 border-orange-300"
                        : "bg-white border-border";
                return (
                  <li
                    key={p.id}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${bg}`}
                  >
                    <span className="text-[20px] w-8 text-center">{medal}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[13px] font-bold text-vibra-800">{p.nome}</p>
                      <p className="text-[10.5px] text-muted-foreground">
                        {p.mc3} MC³ · {p.badges} badges
                      </p>
                    </div>
                    <span className="rounded-full bg-vibra-700 px-2.5 py-1 text-[11px] font-bold text-white">
                      {p.pts} pts
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-vibra-800">
              <Award className="h-5 w-5 text-vibra-700" />
              <h3 className="text-[14px] font-bold uppercase tracking-wider">
                Badges Peer-to-Peer
              </h3>
            </div>
            <button
              onClick={() => setOpenBadge(true)}
              className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1.5 text-[11.5px] font-semibold text-white hover:bg-vibra-800"
            >
              <Plus className="h-3 w-3" /> Dar badge
            </button>
          </div>
          <div className="max-h-[260px] space-y-1.5 overflow-y-auto">
            {reconhecimentos.length === 0 && (
              <p className="py-4 text-center text-[11.5px] italic text-muted-foreground">
                Nenhum badge concedido ainda.
              </p>
            )}
            {reconhecimentos.slice(0, 30).map((r: any) => (
              <div
                key={r.id}
                className="group flex items-start gap-2 rounded-md border border-border bg-white px-2 py-1.5"
              >
                <Medal className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[11.5px]">
                    <span className="font-bold text-vibra-800 truncate">
                      {pMap.get(r.profile_id) ?? "—"}
                    </span>
                    <span className="text-muted-foreground">recebeu</span>
                    <span className="font-semibold text-vibra-700">{r.titulo}</span>
                    <span className="ml-auto rounded bg-vibra-50 px-1.5 text-[10px] font-bold text-vibra-700">
                      +{r.pontos ?? 0}
                    </span>
                  </div>
                  {r.descricao && (
                    <p className="text-[10.5px] text-muted-foreground italic">"{r.descricao}"</p>
                  )}
                  <p className="text-[10px] text-muted-foreground">
                    de {pMap.get(r.concedido_por) ?? "anônimo"}
                  </p>
                </div>
                <button
                  onClick={() => removerReconhecimento(r.id)}
                  className="opacity-0 group-hover:opacity-100 rounded p-0.5 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
        <select
          value={filterKpi}
          onChange={(e) => setFilterKpi(e.target.value)}
          className="rounded-md border border-input bg-white px-2 py-1.5 text-[12px]"
        >
          <option value="">KPI Humano — todos</option>
          {KPI_HUMANOS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          value={filterPersona}
          onChange={(e) => setFilterPersona(e.target.value)}
          className="rounded-md border border-input bg-white px-2 py-1.5 text-[12px]"
        >
          <option value="">Persona — todas</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome ?? p.email}
            </option>
          ))}
        </select>
      </div>

      {/* Rankings */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Chart title="Top 10 — Personas reconhecidas" data={rankingByPersona} />
        <Chart title="Top 10 — KPIs Humanos mais marcados" data={rankingByKpi} />
      </div>

      {/* Lista de comportamentos */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <p className="border-b border-border bg-vibra-50 px-3 py-2 text-[10.5px] font-bold uppercase tracking-widest text-vibra-700">
          Comportamentos de Sucesso (Admin/Editor Master)
        </p>
        <table className="w-full text-[12px]">
          <thead className="bg-vibra-50/50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              <th className="px-3 py-2 text-left">Pessoa</th>
              <th className="px-3 py-2 text-left">KPI</th>
              <th className="px-3 py-2 text-left">Categoria</th>
              <th className="px-3 py-2 text-left">Contribuição</th>
              <th className="px-3 py-2 text-left">Min</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-vibra-50/40">
                <td className="px-3 py-2 font-semibold text-vibra-800">
                  {pMap.get(r.profile_id) ?? "—"}
                </td>
                <td className="px-3 py-2">{r.kpi_humano}</td>
                <td className="px-3 py-2">{r.categoria_diferenciada ?? "—"}</td>
                <td className="px-3 py-2 max-w-[300px] truncate">{r.contribuicao ?? "—"}</td>
                <td className="px-3 py-2">{r.tempo_dedicado_min ?? 0}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => excluir(r.id)}
                    className="rounded p-1 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted-foreground">
                  Sem registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openAdd && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              criar(new FormData(e.currentTarget));
            }}
            className="w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra"
          >
            <h3 className="mb-3 text-[15px] font-bold text-vibra-800">Novo Reconhecimento MC³</h3>
            <label className="text-[12px] font-semibold text-vibra-800">Pessoa</label>
            <select
              required
              name="profile_id"
              className="mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            >
              <option value="">Selecione…</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome ?? p.email}
                </option>
              ))}
            </select>
            <label className="text-[12px] font-semibold text-vibra-800">KPI Humano</label>
            <select
              required
              name="kpi_humano"
              className="mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            >
              <option value="">Selecione…</option>
              {KPI_HUMANOS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <label className="text-[12px] font-semibold text-vibra-800">
              Categoria Diferenciada
            </label>
            <select
              name="categoria"
              className="mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            >
              <option value="">—</option>
              {CATEGORIAS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <label className="text-[12px] font-semibold text-vibra-800">Contribuição</label>
            <textarea
              name="contribuicao"
              rows={3}
              className="mb-2 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            />
            <label className="text-[12px] font-semibold text-vibra-800">Tempo Dedicado (min)</label>
            <input
              name="tempo"
              type="number"
              defaultValue={0}
              className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="rounded-md border border-border px-3 py-1.5 text-[12px]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      {openBadge && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpenBadge(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              darBadge(new FormData(e.currentTarget));
            }}
            className="w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra"
          >
            <div className="mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-vibra-700" />
              <h3 className="text-[15px] font-bold text-vibra-800">Dar um Badge</h3>
            </div>
            <label className="text-[12px] font-semibold text-vibra-800">Para quem</label>
            <select
              required
              name="para"
              className="mb-3 mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            >
              <option value="">Selecione um colega…</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome ?? p.email}
                </option>
              ))}
            </select>
            <label className="text-[12px] font-semibold text-vibra-800">Badge</label>
            <div className="mt-1 mb-3 grid grid-cols-2 gap-2">
              {BADGES.map((b) => (
                <label
                  key={b.codigo}
                  className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-white p-2 hover:border-vibra-600 has-[:checked]:border-vibra-700 has-[:checked]:bg-vibra-50"
                >
                  <input type="radio" name="badge" value={b.codigo} className="mt-0.5" required />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-vibra-800">{b.titulo}</p>
                    <p className="text-[10.5px] text-muted-foreground">{b.descricao}</p>
                    <p className="text-[10px] font-semibold text-vibra-700">+{b.pontos} pts</p>
                  </div>
                </label>
              ))}
            </div>
            <label className="text-[12px] font-semibold text-vibra-800">Mensagem (opcional)</label>
            <textarea
              name="mensagem"
              rows={2}
              className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
              placeholder="Conte por que essa pessoa merece o badge..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenBadge(false)}
                className="rounded-md border border-border px-3 py-1.5 text-[12px]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800"
              >
                <Star className="mr-1 inline h-3 w-3" /> Conceder
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function KPI({
  label,
  value,
  icon: Ic,
  tone,
}: {
  label: string;
  value: any;
  icon: any;
  tone?: "good";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <Ic className={`h-4 w-4 ${tone === "good" ? "text-emerald-600" : "text-vibra-700"}`} />
      </div>
      <p className="mt-1 text-[22px] font-bold text-vibra-800">{value}</p>
    </div>
  );
}

function Chart({ title, data }: { title: string; data: { nome: string; qtd: number }[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
      <h3 className="mb-3 text-[13px] font-bold text-vibra-800">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis dataKey="nome" type="category" width={140} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Bar dataKey="qtd" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={VIBRA_SERIES[i % VIBRA_SERIES.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
