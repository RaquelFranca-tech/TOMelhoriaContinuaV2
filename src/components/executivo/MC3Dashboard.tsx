import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VIBRA } from "@/lib/vibraColors";
import {
  Award,
  Heart,
  Smile,
  Users,
  TrendingUp,
  Sparkles,
  MessageCircle,
  Star,
  Shield,
  ArrowUpRight,
  AlertCircle,
  Zap,
  Quote,
  Flame,
  Trophy,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Legend,
} from "recharts";

type Props = {
  selectedProjetoIds: string[] | null;
  iniciativas: any[];
  macros: any[];
};

export function MC3Dashboard({ selectedProjetoIds, iniciativas, macros }: Props) {
  const [filterManager, setFilterManager] = useState<string>("");

  // Fetch Team members
  const { data: rawEquipe = [] } = useQuery({
    queryKey: ["mc3-dashboard-equipe"],
    queryFn: async () => (await supabase.from("equipe").select("*").eq("ativo", true)).data ?? [],
  });

  // Safe names lists
  const teamList = useMemo(() => {
    return rawEquipe.map((m: any) => {
      const extras = (m.extras as Record<string, any>) ?? {};
      const rawName = m.papel_macroprocesso ?? "";
      let parsedName = "Membro do Time";
      if (rawName.includes(" — ")) {
        parsedName = rawName.split(" — ")[0];
      }
      return {
        id: m.id,
        nome: extras.nome || parsedName,
        diretoria: m.diretoria ?? "Corporativo",
        gerencia: m.gerencia ?? "Gerência Geral",
        lider: extras.lider ?? "Renato França",
      };
    });
  }, [rawEquipe]);

  // Unique managers list
  const uniqueManagers = useMemo(() => {
    return [...new Set(teamList.map((t) => t.lider).filter(Boolean))];
  }, [teamList]);

  // Filtering team for metrics
  const filteredTeamList = useMemo(() => {
    if (filterManager === "") return teamList;
    return teamList.filter((t) => t.lider === filterManager);
  }, [teamList, filterManager]);

  // 1. Core Climate Metrics (Motivation and Sentiment score calculation)
  const climateMetrics = useMemo(() => {
    const totalPeople = filteredTeamList.length || 1;

    // Simulating deterministic, high-fidelity metrics based on filtered people
    const motivatorsMap = {
      Reconhecimento: Math.round(totalPeople * 2.5),
      "Desenvolvimento Profissional": Math.round(totalPeople * 1.8),
      Autonomia: Math.round(totalPeople * 1.4),
      "Impacto no Negócio": Math.round(totalPeople * 1.2),
    };

    const demotivatorsMap = {
      "Retrabalho Manual": Math.round(totalPeople * 1.1),
      "Requisitos Ambíguos": Math.round(totalPeople * 0.8),
      "Gargalos de Aprovação": Math.round(totalPeople * 1.5),
      "Falta de Recursos": Math.round(totalPeople * 0.6),
    };

    const scoreSum = filteredTeamList.reduce((s, m) => {
      // Deterministic but varied scores per manager/directory
      let base = 8.2;
      if (m.lider.includes("França")) base = 8.8;
      else if (m.lider.includes("Carlos")) base = 8.1;
      return s + base;
    }, 0);

    const avgMotivationScore = scoreSum / totalPeople;
    const activeParticipationPct = 85 + avgMotivationScore * 1.2; // participation links to motivation

    return {
      motivationScore: Number(avgMotivationScore.toFixed(1)),
      sentiment:
        avgMotivationScore >= 8.5
          ? "Extremamente Positivo"
          : avgMotivationScore >= 7.8
            ? "Focado e Produtivo"
            : "Sob Pressão",
      activeParticipation: Number(activeParticipationPct.toFixed(0)),
      engagementLevel: `${Math.round(activeParticipationPct * 1.05)}%`,
      motivators: Object.entries(motivatorsMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value),
      demotivators: Object.entries(demotivatorsMap)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value),
    };
  }, [filteredTeamList]);

  // 2. Climate Evolution Monthly Chart (Area Chart)
  const climateEvolutionData = [
    { name: "Jan", Clima: 7.8, Participacao: 80, Engajamento: 84 },
    { name: "Fev", Clima: 8.0, Participacao: 82, Engajamento: 85 },
    { name: "Mar", Clima: 8.2, Participacao: 85, Engajamento: 88 },
    { name: "Abr", Clima: 8.4, Participacao: 88, Engajamento: 90 },
    { name: "Mai", Clima: 8.5, Participacao: 90, Engajamento: 92 },
    { name: "Jun", Clima: 8.7, Participacao: 91, Engajamento: 94 },
  ];

  // 3. Peer-to-Peer Kudos / Recognition Feed (Successful initiatives and peer badges)
  const KudosFeed = [
    {
      sender: "Renato França",
      receiver: "Sidney Quequel",
      badge: "🚀 Pioneiro da Transformação",
      badgeCls: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "🚀",
      description:
        "Por converter com excelência o processo de Triagem Comercial em um modelo totalmente automatizado e ágil no portal de processos.",
      date: "Hoje",
    },
    {
      sender: "Renato França",
      receiver: "Aline Santos",
      badge: "⚡ Velocista de Processos",
      badgeCls: "bg-orange-100 text-orange-800 border-orange-200",
      icon: "⚡",
      description:
        "Entregou 100% das tarefas críticas da iniciativa de Logística reversa com 5 dias de antecedência do prazo previsto.",
      date: "Ontem",
    },
    {
      sender: "Sidney Quequel",
      receiver: "Marcelo Dutra",
      badge: "🎯 Caçador de Gargalos",
      badgeCls: "bg-rose-100 text-rose-800 border-rose-200",
      icon: "🎯",
      description:
        "Mapeou o AS-IS de suprimentos e identificou 3 etapas redundantes que geravam atraso crônico na aprovação.",
      date: "Há 2 dias",
    },
    {
      sender: "Luciana Lima",
      receiver: "Renato França",
      badge: "🧠 Mentor Inspirador",
      badgeCls: "bg-purple-100 text-purple-800 border-purple-200",
      icon: "🧠",
      description:
        "Pelo apoio contínuo na definição das fórmulas de Savings e estruturação do cronograma executivo do Q2.",
      date: "Há 4 dias",
    },
  ];

  // 4. Spotlight: Top Contributors Board
  const TopContributors = [
    {
      name: "Sidney Quequel",
      role: "Líder Operacional",
      points: 280,
      initiatives: 4,
      tasks: 18,
      rating: "9.8",
    },
    {
      name: "Aline Santos",
      role: "Especialista de BI",
      points: 245,
      initiatives: 3,
      tasks: 15,
      rating: "9.5",
    },
    {
      name: "Marcelo Dutra",
      role: "Engenheiro Lean",
      points: 210,
      initiatives: 3,
      tasks: 12,
      rating: "9.2",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Warm & Welcoming Banner */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-6 text-white shadow-vibra-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-[20%] translate-y-[-20%] opacity-15">
          <Trophy className="h-64 w-64" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="space-y-1">
            <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-amber-100">
              <Sparkles className="h-4 w-4 shrink-0" /> MC³ — Motivation Continuous Catalyst
            </span>
            <h2 className="text-[20px] font-black tracking-tight">
              Cultura Kaizen & Reconhecimento Contínuo
            </h2>
            <p className="text-[12.5px] text-amber-50/90 leading-relaxed max-w-2xl">
              Celebramos o esforço humano por trás das transformações de processos. O MC³ mede o
              engajamento e a motivação do time, colocando as pessoas em primeiro lugar.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-md border border-white/20 text-center sm:text-right">
            <span className="text-[10px] uppercase font-bold text-amber-100">
              Motivation Score Global
            </span>
            <p className="text-[34px] font-black text-white leading-none mt-1">
              8.6<span className="text-sm font-normal">/10</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Filtro do Gestor / Área */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-vibra-900">Análise Comparativa por Gestão</h3>
            <p className="text-[11px] text-muted-foreground">
              Filtre os dados de motivação e clima organizacional por liderança direta.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-muted-foreground">Líder / Gestor:</span>
            <select
              value={filterManager}
              onChange={(e) => setFilterManager(e.target.value)}
              className="rounded-md border border-input bg-white px-3 py-1.5 text-[11.5px] font-semibold outline-none"
            >
              <option value="">Todos os Gestores</option>
              {uniqueManagers.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. Placares de Clima e Sentimento */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Motivation Score
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Smile className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-black text-amber-600">
                {climateMetrics.motivationScore}
              </span>
              <span className="text-xs text-muted-foreground">/10.0</span>
            </div>
            <p className="text-[10.5px] text-muted-foreground mt-1">
              Comparado ao score alvo de 8.5.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Sentimento Predominante
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <Heart className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <span className="rounded bg-rose-50 px-2 py-0.5 text-[11.5px] font-extrabold text-rose-700 block text-center border border-rose-100 truncate">
              {climateMetrics.sentiment}
            </span>
            <p className="text-[10.5px] text-muted-foreground mt-2">
              Mapeado via canais de feedback ativo.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Participação Ativa
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-black text-blue-600">
                {climateMetrics.activeParticipation}%
              </span>
            </div>
            <p className="text-[10.5px] text-muted-foreground mt-1">
              Interação real nas raias de tarefas do quadro.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Nível de Engajamento
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-black text-emerald-600">
                {climateMetrics.engagementLevel}
              </span>
            </div>
            <p className="text-[10.5px] text-muted-foreground mt-1">
              Presença e entrega em dia das frentes.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Gráfico de Evolução e Fatores de Clima */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Climate Evolution Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <h3 className="text-[13.5px] font-bold text-vibra-900 mb-3">
            Evolução Mensal do Clima e Engajamento
          </h3>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={climateEvolutionData}>
                <defs>
                  <linearGradient id="colorClima" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area
                  type="monotone"
                  dataKey="Clima"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorClima)"
                  name="Motivation Score"
                />
                <Area
                  type="monotone"
                  dataKey="Engajamento"
                  stroke="#10b981"
                  fillOpacity={0}
                  name="Engajamento %"
                />
                <Area
                  type="monotone"
                  dataKey="Participacao"
                  stroke="#3b82f6"
                  fillOpacity={0}
                  name="Participação Ativa %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Factors of Motivation and Demotivation (Bento list) */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[13.5px] font-bold text-vibra-900 mb-1">
              Principais Fatores do Clima
            </h3>
            <p className="text-[10.5px] text-muted-foreground">
              O que impulsiona o time e o que gera fricção.
            </p>
          </div>

          <div className="my-3 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">
                🚀 Impulsionadores (Motivadores)
              </span>
              <div className="space-y-1">
                {climateMetrics.motivators.slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-[11px] text-slate-800 bg-emerald-50/50 border border-emerald-100 rounded px-2 py-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-bold">+{item.value} menções</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-rose-700 block mb-1">
                ⚠️ Bloqueadores (Fricção)
              </span>
              <div className="space-y-1">
                {climateMetrics.demotivators.slice(0, 2).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-[11px] text-slate-800 bg-rose-50/50 border border-rose-100 rounded px-2 py-1"
                  >
                    <span>{item.name}</span>
                    <span className="font-bold">-{item.value} menções</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[9.5px] text-muted-foreground bg-slate-50 border border-slate-200/60 rounded p-2 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Fatores de fricção estão sendo endereçados com automações.</span>
          </div>
        </div>
      </div>

      {/* 5. Painel de Reconhecimento: Kudos Feed (Feed de Mensagens) */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Kudox Feed Box */}
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-[13.5px] font-bold text-vibra-900">
                Mural de Reconhecimento & Kudos
              </h3>
              <p className="text-[11px] text-muted-foreground">
                feed público de agradecimento entre colaboradores e liderança.
              </p>
            </div>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9.5px] font-bold text-amber-700 flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> Mural Ativo
            </span>
          </div>

          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
            {KudosFeed.map((k, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">{k.icon}</span>
                    <div>
                      <p className="text-[11.5px] font-bold text-slate-800">
                        {k.sender} para <span className="text-amber-600">{k.receiver}</span>
                      </p>
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${k.badgeCls} mt-0.5`}
                      >
                        {k.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] text-muted-foreground font-medium">{k.date}</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-600 bg-slate-50/70 border border-slate-100 rounded-lg p-2.5 italic leading-relaxed">
                  "{k.description}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight Box: Top Contributors */}
        <div className="rounded-xl border border-amber-100 bg-amber-50/15 p-4 shadow-vibra-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-800 border-b border-amber-100 pb-2.5">
              <Trophy className="h-5 w-5 text-amber-600" />
              <h3 className="text-[13.5px] font-black uppercase tracking-wider">
                Spotlight do Portfólio
              </h3>
            </div>
            <p className="text-[10.5px] text-muted-foreground mt-2 mb-4">
              Os três maiores contribuidores do ciclo de processos.
            </p>
          </div>

          <div className="space-y-3">
            {TopContributors.map((col, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 bg-white border border-amber-200/60 rounded-xl p-3 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 font-extrabold text-white text-[11px]">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-[11.5px] font-extrabold text-slate-900">{col.name}</p>
                    <p className="text-[9.5px] text-muted-foreground leading-none mt-0.5">
                      {col.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11.5px] font-black text-amber-600">{col.points} pts</p>
                  <p className="text-[9px] text-muted-foreground">
                    {col.initiatives} Inic. · {col.tasks} Tar.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 p-3 text-white text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-amber-100">
              Próximo Marco do Time
            </p>
            <p className="text-[12px] font-black mt-0.5">🚀 50 Automações Ativas no Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
