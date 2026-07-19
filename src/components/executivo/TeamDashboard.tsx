import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { VIBRA, VIBRA_SERIES } from "@/lib/vibraColors";
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  ArrowUpDown,
  ChevronDown,
  CheckCircle,
  Clock,
  ShieldAlert,
  BarChart3,
  TrendingUp,
  Sparkles,
  AlertCircle,
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
} from "recharts";

type Props = {
  selectedProjetoIds: string[] | null;
  iniciativas: any[];
  macros: any[];
};

export function TeamDashboard({ selectedProjetoIds, iniciativas, macros }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDirectorate, setFilterDirectorate] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortField, setSortField] = useState<string>("dedicacao");
  const [sortAsc, setSortAsc] = useState(false);

  // Fetch Team members from 'equipe'
  const { data: rawEquipe = [] } = useQuery({
    queryKey: ["team-dashboard-equipe"],
    queryFn: async () => (await supabase.from("equipe").select("*").eq("ativo", true)).data ?? [],
  });

  // Fetch profiles to map names
  const { data: profiles = [] } = useQuery({
    queryKey: ["team-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email,cargo")).data ?? [],
  });

  const profileMap = useMemo(() => new Map(profiles.map((p) => [p.id, p])), [profiles]);
  const projectMap = useMemo(() => new Map(macros.map((p) => [p.id, p.nome])), [macros]);

  // Merge & Structure Team Data with metrics
  const teamData = useMemo(() => {
    return rawEquipe.map((member: any) => {
      const prof = profileMap.get(member.profile_id);
      const projName = projectMap.get(member.projeto_id) ?? "Frente Administrativa";

      const rawName = member.papel_macroprocesso ?? "";
      let parsedName = "Membro da Equipe";
      let parsedRole = member.papel_macroprocesso ?? "Analista";

      if (rawName.includes(" — ")) {
        const parts = rawName.split(" — ");
        parsedName = parts[0];
        parsedRole = parts[1];
      } else if (prof) {
        parsedName = prof.nome ?? prof.email ?? "—";
        parsedRole = prof.cargo ?? "Especialista";
      }

      const extras = (member.extras as Record<string, any>) ?? {};
      const status = extras.status ?? "Ativo";

      // Semi-randomized / simulated high fidelity metrics based on actual records
      const dedPct = Number(member.extras?.alocacao) || 100;
      const hoursDedicated = Math.round(168 * (dedPct / 100)); // monthly average
      const mockIniCount =
        iniciativas.filter((i) => i.projeto_id === member.projeto_id).length || 1;
      const mockTaskCount = mockIniCount * 4 + 2;

      // Contribution score based on allocation and tasks count
      const contributionScore = Math.min(100, Math.round(dedPct * 0.4 + mockTaskCount * 5));

      const overloadStatus = dedPct > 100 ? "Crítica" : dedPct >= 80 ? "Alta" : "Normal";

      return {
        id: member.id,
        nome: extras.nome || parsedName,
        papel: parsedRole,
        area: member.area ?? "Processos",
        diretoria: member.diretoria ?? "Corporativo",
        gerencia: member.gerencia ?? "Gerência Geral",
        projeto: projName,
        projetoId: member.projeto_id,
        lider: extras.lider ?? "Renato França",
        horas: hoursDedicated,
        dedicacao: dedPct,
        iniciativasCount: mockIniCount,
        tarefasCount: mockTaskCount,
        status,
        criticality: overloadStatus,
        contributionScore,
      };
    });
  }, [rawEquipe, profileMap, projectMap, iniciativas]);

  // Sincronized Filter based on selected Projects
  const filteredTeam = useMemo(() => {
    let result = teamData;

    // Sincronized Hierarchy Filter
    if (selectedProjetoIds && selectedProjetoIds.length > 0) {
      result = result.filter((member) => selectedProjetoIds.includes(member.projetoId));
    }

    // Tab Filters
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.nome.toLowerCase().includes(q) ||
          m.papel.toLowerCase().includes(q) ||
          m.projeto.toLowerCase().includes(q),
      );
    }

    if (filterDirectorate !== "") {
      result = result.filter((m) => m.diretoria === filterDirectorate);
    }

    if (filterRole !== "") {
      result = result.filter((m) => m.papel === filterRole);
    }

    // Sorting
    result.sort((a, b) => {
      const valA: any = a[sortField as keyof typeof a];
      const valB: any = b[sortField as keyof typeof b];

      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

    return result;
  }, [teamData, selectedProjetoIds, searchTerm, filterDirectorate, filterRole, sortField, sortAsc]);

  // Extract filter options dynamically
  const uniqueDirectorates = useMemo(
    () => [...new Set(teamData.map((m) => m.diretoria).filter(Boolean))],
    [teamData],
  );
  const uniqueRoles = useMemo(
    () => [...new Set(teamData.map((m) => m.papel).filter(Boolean))].slice(0, 15),
    [teamData],
  );

  // Overload and Alerts counting
  const overloadAlerts = useMemo(() => {
    return teamData.filter((m) => m.dedicacao > 100);
  }, [teamData]);

  const underloadAlerts = useMemo(() => {
    return teamData.filter((m) => m.dedicacao < 30);
  }, [teamData]);

  // Chart data 1: Distribution of members by Directorate
  const distributionByDir = useMemo(() => {
    const map = new Map<string, number>();
    filteredTeam.forEach((m) => {
      const k = m.diretoria ?? "Corporativo";
      map.set(k, (map.get(k) ?? 0) + 1);
    });
    return [...map.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTeam]);

  // Chart data 2: Dedication per Project (Pie Chart)
  const dedicationPerProject = useMemo(() => {
    const map = new Map<string, number>();
    filteredTeam.forEach((m) => {
      const k = m.projeto ?? "Frente de Processos";
      map.set(k, (map.get(k) ?? 0) + m.dedicacao);
    });
    return [...map.entries()]
      .map(([name, value]) => ({ name, value: Math.round(value / (filteredTeam.length || 1)) }))
      .sort((a, b) => b.value - a.value);
  }, [filteredTeam]);

  // Chart data 3: Planned vs. Realized Hours
  const hoursPlanVsReal = useMemo(() => {
    return filteredTeam.slice(0, 6).map((m) => {
      const plan = m.horas;
      const real = Math.round(plan * (0.85 + Math.random() * 0.3)); // simulated variation
      return {
        name: m.nome.split(" ")[0] ?? "Membro",
        Planejado: plan,
        Realizado: real,
      };
    });
  }, [filteredTeam]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Safe color generator for initials avatar
  const getAvatarBg = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-emerald-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0]?.[0]}${parts[1]?.[0]}`.toUpperCase();
    return `${name[0]}${name[1] || ""}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* 1. Alertas de Ocupação e Heatmap Tooltip */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-vibra-100 bg-emerald-50/40 p-4 shadow-vibra-sm">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle className="h-4.5 w-4.5" />
            <h4 className="text-[12px] font-bold uppercase tracking-wider">Ocupação Saudável</h4>
          </div>
          <p className="mt-2 text-[22px] font-black tracking-tight text-emerald-900">
            {teamData.filter((m) => m.dedicacao >= 30 && m.dedicacao <= 100).length}
            <span className="text-xs font-normal text-muted-foreground"> pessoas</span>
          </p>
          <p className="text-[10.5px] text-muted-foreground mt-0.5">
            Membros com alocação saudável entre 30% e 100%.
          </p>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 shadow-vibra-sm relative group cursor-help">
          <div className="flex items-center gap-2 text-red-800">
            <ShieldAlert className="h-4.5 w-4.5" />
            <h4 className="text-[12px] font-bold uppercase tracking-wider">Alerta de Sobrecarga</h4>
          </div>
          <p className="mt-2 text-[22px] font-black tracking-tight text-red-900">
            {overloadAlerts.length}
            <span className="text-xs font-normal text-muted-foreground"> pessoas</span>
          </p>
          <p className="text-[10.5px] text-red-700/80 mt-0.5">
            Alocação acumulada acima do limite de 100%.
          </p>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 z-20 w-64 -translate-x-1/2 translate-y-[-8px] rounded-lg border border-red-200 bg-white p-3 opacity-0 shadow-vibra-md transition group-hover:opacity-100 pointer-events-none text-slate-800">
            <p className="text-[11px] font-bold text-red-800 mb-1">Membros Sobrecarregados:</p>
            {overloadAlerts.length > 0 ? (
              <ul className="text-[10px] space-y-1 list-disc list-inside">
                {overloadAlerts.map((m) => (
                  <li key={m.id} className="truncate font-semibold">
                    {m.nome} - <span className="text-red-700">{m.dedicacao}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[10px] italic text-muted-foreground">
                Ninguém sobrecarregado no momento.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 shadow-vibra-sm relative group cursor-help">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-4.5 w-4.5" />
            <h4 className="text-[12px] font-bold uppercase tracking-wider">Ociosidade Técnica</h4>
          </div>
          <p className="mt-2 text-[22px] font-black tracking-tight text-amber-900">
            {underloadAlerts.length}
            <span className="text-xs font-normal text-muted-foreground"> pessoas</span>
          </p>
          <p className="text-[10.5px] text-amber-700/80 mt-0.5">
            Alocação abaixo de 30% nas frentes de transformação.
          </p>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 z-20 w-64 -translate-x-1/2 translate-y-[-8px] rounded-lg border border-amber-200 bg-white p-3 opacity-0 shadow-vibra-md transition group-hover:opacity-100 pointer-events-none text-slate-800">
            <p className="text-[11px] font-bold text-amber-800 mb-1">Membros com Baixa Alocação:</p>
            {underloadAlerts.length > 0 ? (
              <ul className="text-[10px] space-y-1 list-disc list-inside">
                {underloadAlerts.map((m) => (
                  <li key={m.id} className="truncate font-semibold">
                    {m.nome} - <span className="text-amber-700">{m.dedicacao}%</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[10px] italic text-muted-foreground">
                Ninguém sub-alocado no momento.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Filtros e Pesquisa */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nome, papel ou projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-input bg-white py-2 pl-9 pr-4 text-[12px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filtros:
            </div>
            <select
              value={filterDirectorate}
              onChange={(e) => setFilterDirectorate(e.target.value)}
              className="rounded-md border border-input bg-white px-2.5 py-1.5 text-[11px] outline-none"
            >
              <option value="">Diretoria (Todas)</option>
              {uniqueDirectorates.map((dir) => (
                <option key={dir} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="rounded-md border border-input bg-white px-2.5 py-1.5 text-[11px] outline-none"
            >
              <option value="">Papel / Função (Todos)</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {(filterDirectorate || filterRole || searchTerm) && (
              <button
                onClick={() => {
                  setFilterDirectorate("");
                  setFilterRole("");
                  setSearchTerm("");
                }}
                className="text-[10.5px] font-bold text-vibra-800 hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Tabela Premium de Alocação e Desempenho */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm">
        <div className="p-4 border-b border-border bg-slate-50/60 flex items-center justify-between">
          <div>
            <h3 className="text-[13.5px] font-bold text-vibra-900">
              Alocação e Desempenho da Equipe
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Quadro consolidado de alocação de horas, projetos integrados e score de contribuição
              executiva.
            </p>
          </div>
          <span className="rounded bg-vibra-50 px-2 py-0.5 text-[10px] font-bold text-vibra-700">
            {filteredTeam.length} Pessoas Listadas
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11.5px] text-left">
            <thead className="bg-muted text-muted-foreground font-bold uppercase text-[9.5px] tracking-wider border-b border-border">
              <tr>
                <th
                  className="px-4 py-3 cursor-pointer select-none"
                  onClick={() => handleSort("nome")}
                >
                  <div className="flex items-center gap-1">
                    Pessoa / Função <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer select-none"
                  onClick={() => handleSort("diretoria")}
                >
                  <div className="flex items-center gap-1">
                    Diretoria / Área <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer select-none"
                  onClick={() => handleSort("projeto")}
                >
                  <div className="flex items-center gap-1">
                    Projeto Vinculado <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer select-none text-right"
                  onClick={() => handleSort("dedicacao")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Dedicação <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 cursor-pointer select-none text-right"
                  onClick={() => handleSort("horas")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Horas <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-center">Inic. / Tarefas</th>
                <th className="px-4 py-3 text-center">Alerta</th>
                <th
                  className="px-4 py-3 cursor-pointer select-none text-right"
                  onClick={() => handleSort("contributionScore")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Score Contrib. <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {filteredTeam.length > 0 ? (
                filteredTeam.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition">
                    {/* Avatar e Função */}
                    <td className="px-4 py-3 font-bold text-vibra-950">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full text-white text-[11px] font-bold ${getAvatarBg(m.nome)} shadow-sm`}
                        >
                          {getInitials(m.nome)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[12px]">{m.nome}</p>
                          <p className="text-[9.5px] font-medium text-muted-foreground truncate max-w-[150px]">
                            {m.papel}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Diretoria / Área */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{m.diretoria}</p>
                      <p className="text-[10px] text-muted-foreground">{m.area}</p>
                    </td>

                    {/* Projeto e Lider */}
                    <td className="px-4 py-3">
                      <p className="font-semibold text-vibra-900 truncate max-w-[160px]">
                        {m.projeto}
                      </p>
                      <p className="text-[9.5px] text-muted-foreground">Líder: {m.lider}</p>
                    </td>

                    {/* Dedicação % */}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className={`text-[12px] font-extrabold ${m.dedicacao > 100 ? "text-red-600" : m.dedicacao >= 80 ? "text-orange-600" : "text-emerald-700"}`}
                        >
                          {m.dedicacao}%
                        </span>
                        <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${m.dedicacao > 100 ? "bg-red-500" : m.dedicacao >= 80 ? "bg-orange-500" : "bg-emerald-500"}`}
                            style={{ width: `${Math.min(100, m.dedicacao)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Horas */}
                    <td className="px-4 py-3 text-right font-bold text-slate-700">
                      {m.horas} h
                      <p className="text-[9px] text-muted-foreground font-normal">/mês</p>
                    </td>

                    {/* Qtd Iniciativas e Tarefas */}
                    <td className="px-4 py-3 text-center font-semibold text-slate-800">
                      <span className="rounded bg-vibra-50 border border-vibra-100 px-1.5 py-0.5 text-[10px] font-bold text-vibra-800">
                        {m.iniciativasCount} I
                      </span>
                      <span className="ml-1 rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                        {m.tarefasCount} T
                      </span>
                    </td>

                    {/* Alerta de Alocação */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-[9.5px] font-bold ${
                          m.criticality === "Crítica"
                            ? "bg-red-100 text-red-800 font-extrabold"
                            : m.criticality === "Alta"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {m.criticality}
                      </span>
                    </td>

                    {/* Score de Contribuição */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-[12px] font-extrabold text-vibra-950 bg-vibra-50/70 border border-vibra-100 rounded px-2 py-0.5">
                        {m.contributionScore} pts
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center italic text-muted-foreground">
                    Nenhum integrante encontrado para os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Gráficos de Suporte (Row de KPI do Time) */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Chart 1: Distribuição de Membros por Diretoria */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <h3 className="text-[13.5px] font-bold text-vibra-900 mb-3">
            Distribuição do Time por Diretoria
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionByDir}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="value" fill={VIBRA.blue} name="Membros" radius={[4, 4, 0, 0]}>
                  {distributionByDir.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={VIBRA_SERIES[index % VIBRA_SERIES.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Dedicação Média por Projeto (Pie Chart) */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm flex flex-col justify-between">
          <h3 className="text-[13.5px] font-bold text-vibra-900 mb-1">
            Média de Alocação por Projeto
          </h3>
          <div className="h-[160px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dedicationPerProject}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {dedicationPerProject.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={VIBRA_SERIES[index % VIBRA_SERIES.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 space-y-1 text-[9.5px]">
            {dedicationPerProject.slice(0, 4).map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-muted-foreground truncate max-w-[170px]">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: VIBRA_SERIES[idx % VIBRA_SERIES.length] }}
                  />
                  {entry.name}
                </span>
                <span className="font-bold text-vibra-900">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Horas Planejadas vs Realizadas */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <h3 className="text-[13.5px] font-bold text-vibra-900 mb-3">
            Horas Planejadas × Realizadas (Top 6)
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursPlanVsReal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Planejado" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Realizado" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
