import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import {
  FileText,
  Link as LinkIcon,
  Users,
  Clock,
  ShieldAlert,
  Plus,
  Trash2,
  TrendingUp,
  Save,
  CheckCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Sliders,
  Grid,
} from "lucide-react";
import { toast } from "sonner";
import { VIBRA } from "@/lib/vibraColors";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export function GestaoMudancaTab() {
  const qc = useQueryClient();
  const { projetoId } = useHierarchy();

  // If no project is selected, show a beautiful select warning
  if (!projetoId) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <Sliders className="h-12 w-12 text-slate-400 mb-4 animate-pulse" />
        <h3 className="text-base font-bold text-slate-800">Selecione um Projeto</h3>
        <p className="text-xs text-muted-foreground max-w-sm mt-1">
          Por favor, selecione um projeto no seletor do topo para gerenciar e registrar as ações de
          Gestão de Mudança.
        </p>
      </div>
    );
  }

  return <GestaoMudancaInner projetoId={projetoId} />;
}

function GestaoMudancaInner({ projetoId }: { projetoId: string }) {
  const qc = useQueryClient();
  const [loading, setLoading] = useState(false);

  // Form State for a new Documented Process
  const [formProcess, setFormProcess] = useState({
    processo: "",
    repositorio: "",
    melhoria_procedimento: "",
    pessoas_treinadas: 0,
    tempo_capacitacao: 0,
    dependencia_chave: false,
    padronizacao: "Médio",
    status_mudanca: "Planejado",
  });

  // Load registered processes for this project
  const { data: processos = [], isLoading: isLoadingProc } = useQuery({
    queryKey: ["gestao_mudanca", projetoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gestao_mudanca")
        .select("*")
        .eq("projeto_id", projetoId)
        .is("deleted_at", null);
      if (error) {
        console.error(error);
        return [];
      }
      return data ?? [];
    },
  });

  // Load scorecard (gaps) for this project
  const { data: scorecard, isLoading: isLoadingScore } = useQuery({
    queryKey: ["scorecard_mudanca", projetoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scorecard_mudanca")
        .select("*")
        .eq("projeto_id", projetoId)
        .maybeSingle();
      if (error) {
        console.error(error);
      }
      return (
        data ?? {
          projeto_id: projetoId,
          score_cultural_asis: 2,
          score_cultural_tobe: 4,
          score_padronizacao_asis: 1,
          score_padronizacao_tobe: 5,
          score_estruturacao_asis: 2,
          score_estruturacao_tobe: 4,
          score_organizacao_asis: 2,
          score_organizacao_tobe: 5,
          detalhes_cultura: "",
          detalhes_padronizacao: "",
          detalhes_estruturacao: "",
          detalhes_organizacao: "",
        }
      );
    },
  });

  // Save/Update Change Management Scorecard
  const [scoreState, setScoreState] = useState<any>(null);

  // Sync local scoreState with loaded database value
  const activeScore = scoreState || scorecard;

  const handleScoreChange = (field: string, value: any) => {
    const current = activeScore || scorecard;
    setScoreState({ ...current, [field]: value });
  };

  const handleSaveScorecard = async () => {
    setLoading(true);
    const payload = activeScore || scorecard;
    const { error } = await supabase.from("scorecard_mudanca").upsert({
      ...payload,
      projeto_id: projetoId,
      id: payload.id || undefined,
    });

    setLoading(false);
    if (error) {
      toast.error("Erro ao salvar dados de fatos e gaps: " + error.message);
    } else {
      toast.success("Indicadores de Gestão de Mudança salvos com sucesso!");
      qc.invalidateQueries({ queryKey: ["scorecard_mudanca", projetoId] });
      setScoreState(null);
    }
  };

  // Add Process
  const handleAddProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProcess.processo.trim()) {
      toast.error("Por favor, informe o nome do processo.");
      return;
    }

    const calculatedHrs =
      Number(formProcess.pessoas_treinadas || 0) * Number(formProcess.tempo_capacitacao || 0);

    const { error } = await supabase.from("gestao_mudanca").insert({
      projeto_id: projetoId,
      processo: formProcess.processo.trim(),
      repositorio: formProcess.repositorio.trim(),
      melhoria_procedimento: formProcess.melhoria_procedimento.trim(),
      pessoas_treinadas: Number(formProcess.pessoas_treinadas || 0),
      tempo_capacitacao: Number(formProcess.tempo_capacitacao || 0),
      horas_economizadas: calculatedHrs,
      dependencia_chave: !!formProcess.dependencia_chave,
      padronizacao: formProcess.padronizacao,
      status_mudanca: formProcess.status_mudanca,
    });

    if (error) {
      toast.error("Erro ao registrar processo: " + error.message);
    } else {
      toast.success("Processo procedimentado registrado com sucesso!");
      setFormProcess({
        processo: "",
        repositorio: "",
        melhoria_procedimento: "",
        pessoas_treinadas: 0,
        tempo_capacitacao: 0,
        dependencia_chave: false,
        padronizacao: "Médio",
        status_mudanca: "Planejado",
      });
      qc.invalidateQueries({ queryKey: ["gestao_mudanca", projetoId] });
    }
  };

  // Delete Process
  const handleDeleteProcess = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este registro de procedimento?")) return;

    const { error } = await supabase
      .from("gestao_mudanca")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao excluir registro: " + error.message);
    } else {
      toast.success("Registro excluído com sucesso.");
      qc.invalidateQueries({ queryKey: ["gestao_mudanca", projetoId] });
    }
  };

  // Aggregate Metrics
  const totalProcessos = processos.length;
  const totalPessoasTreinadas = processos.reduce(
    (acc, p) => acc + Number(p.pessoas_treinadas || 0),
    0,
  );
  const totalHorasSalvas = processos.reduce((acc, p) => acc + Number(p.horas_economizadas || 0), 0);
  const totalDependenciasChave = processos.filter((p) => p.dependencia_chave).length;

  // Chart data for AS IS vs TO BE Gaps
  const gapChartData = [
    {
      name: "Cultura",
      "AS IS (Atual)": activeScore?.score_cultural_asis ?? 2,
      "TO BE (Desejado)": activeScore?.score_cultural_tobe ?? 4,
    },
    {
      name: "Padronização",
      "AS IS (Atual)": activeScore?.score_padronizacao_asis ?? 1,
      "TO BE (Desejado)": activeScore?.score_padronizacao_tobe ?? 5,
    },
    {
      name: "Estrutura",
      "AS IS (Atual)": activeScore?.score_estruturacao_asis ?? 2,
      "TO BE (Desejado)": activeScore?.score_estruturacao_tobe ?? 4,
    },
    {
      name: "Organização",
      "AS IS (Atual)": activeScore?.score_organizacao_asis ?? 2,
      "TO BE (Desejado)": activeScore?.score_organizacao_tobe ?? 5,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-vibra-100 bg-gradient-to-r from-vibra-800 to-vibra-950 p-5 text-white shadow-vibra-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-vibra-200 font-bold bg-white/10 px-2 py-0.5 rounded">
              Módulo de Governança & Pessoas
            </span>
            <h2 className="text-[18px] font-black tracking-tight mt-1.5">
              Gestão de Mudança Organizacional (CM)
            </h2>
            <p className="text-xs text-vibra-100/80 mt-1">
              Registre processos procedimentados, analise gaps culturais, reduza dependências de
              pessoas chave e aplique melhoria contínua estratégica.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-center">
              <p className="text-[10px] text-vibra-200 font-bold uppercase">
                Horas Capacitação Economizadas
              </p>
              <p className="text-[18px] font-black text-yellow-300">
                {totalHorasSalvas.toFixed(1)}h/dia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Processos Procedimentados
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-vibra-50 text-vibra-800">
              <FileText className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[26px] font-black tracking-tight text-vibra-900">
            {totalProcessos}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Procedimentos ativos no repositório
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Colaboradores Treinados
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[26px] font-black tracking-tight text-vibra-900">
            {totalPessoasTreinadas}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Pessoas capacitadas nos novos padrões
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Dependência Pessoa Chave
            </span>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${totalDependenciasChave > 0 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}
            >
              <ShieldAlert className="h-4 w-4" />
            </span>
          </div>
          <div
            className={`mt-2 text-[26px] font-black tracking-tight ${totalDependenciasChave > 0 ? "text-amber-600" : "text-emerald-700"}`}
          >
            {totalDependenciasChave}
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Gargalos operacionais críticos identificados
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-muted-foreground">
              Média de Capacitação
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-[26px] font-black tracking-tight text-emerald-700">
            {totalProcessos > 0 ? (totalHorasSalvas / totalProcessos).toFixed(1) : "0.0"}h
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Tempo médio de onboarding por processo
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Registration Form & List (Cols 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Record Form */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
            <div className="flex items-center gap-1.5 text-vibra-900 font-bold text-[13.5px] mb-3">
              <Plus className="h-4 w-4 text-vibra-700" />
              <span>Registrar Novo Processo Procedimentado</span>
            </div>

            <form onSubmit={handleAddProcess} className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Nome do Processo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Conciliação de Fretes Faturados"
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.processo}
                  onChange={(e) => setFormProcess({ ...formProcess, processo: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Local do Repositório (Documento)
                </label>
                <input
                  type="text"
                  placeholder="Ex: SharePoint / OneDrive Link"
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.repositorio}
                  onChange={(e) => setFormProcess({ ...formProcess, repositorio: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-700">
                  O que melhora com a procedimentação?
                </label>
                <textarea
                  placeholder="Descreva os ganhos em mitigar erros, facilitar onboarding e unificar a operação."
                  rows={2}
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.melhoria_procedimento}
                  onChange={(e) =>
                    setFormProcess({ ...formProcess, melhoria_procedimento: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Nº de Pessoas Treinadas
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.pessoas_treinadas || ""}
                  onChange={(e) =>
                    setFormProcess({
                      ...formProcess,
                      pessoas_treinadas: Math.max(0, Number(e.target.value)),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Tempo de Capacitação (h/dia)
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="0"
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.tempo_capacitacao || ""}
                  onChange={(e) =>
                    setFormProcess({
                      ...formProcess,
                      tempo_capacitacao: Math.max(0, Number(e.target.value)),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700">Padronização</label>
                <select
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.padronizacao}
                  onChange={(e) => setFormProcess({ ...formProcess, padronizacao: e.target.value })}
                >
                  <option value="Baixo">Baixo (Instruções Verbais)</option>
                  <option value="Médio">Médio (POP Criado)</option>
                  <option value="Alto">Alto (POP Publicado & Validado)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700">Status</label>
                <select
                  className="mt-1 w-full rounded border border-input px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-vibra-700"
                  value={formProcess.status_mudanca}
                  onChange={(e) =>
                    setFormProcess({ ...formProcess, status_mudanca: e.target.value })
                  }
                >
                  <option value="Planejado">Planejado</option>
                  <option value="Em Criação">Em Criação</option>
                  <option value="Procedimentado">Procedimentado</option>
                  <option value="Concluido">Concluido & Auditado</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center justify-between border-t border-slate-100 pt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-input text-vibra-700 h-4 w-4"
                    checked={formProcess.dependencia_chave}
                    onChange={(e) =>
                      setFormProcess({ ...formProcess, dependencia_chave: e.target.checked })
                    }
                  />
                  <div>
                    <p className="text-[11.5px] font-bold text-slate-800">
                      Dependência de Pessoa Chave?
                    </p>
                    <p className="text-[9.5px] text-muted-foreground">
                      Marque se o processo hoje depende criticamente de apenas 1 colaborador.
                    </p>
                  </div>
                </label>

                <button
                  type="submit"
                  className="rounded-lg bg-vibra-700 px-4 py-2 text-[12px] font-bold text-white hover:bg-vibra-800 transition"
                >
                  Registrar Processo
                </button>
              </div>
            </form>
          </div>

          {/* List of Registered Processes */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm">
            <div className="p-4 border-b border-border bg-slate-50/50 flex items-center justify-between">
              <div>
                <h3 className="text-[13px] font-bold text-slate-900">
                  Processos Procedimentados Ativos
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Relação de POPs e instruções de trabalho vinculadas a este projeto.
                </p>
              </div>
              <span className="rounded bg-vibra-50 border border-vibra-100 px-2 py-0.5 text-[10px] font-bold text-vibra-700">
                {processos.length} Registros
              </span>
            </div>

            {processos.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-[11.5px]">
                Nenhum processo procedimentado registrado ainda. Use o formulário acima para
                adicionar o primeiro!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[11.5px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      <th className="p-3">Processo</th>
                      <th className="p-3">Repositório</th>
                      <th className="p-3">Capacitação</th>
                      <th className="p-3 text-right">Horas Salvas</th>
                      <th className="p-3 text-center">Pessoa Chave</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    {processos.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{p.processo}</p>
                          {p.melhoria_procedimento && (
                            <p
                              className="text-[10px] text-muted-foreground max-w-[200px] truncate"
                              title={p.melhoria_procedimento}
                            >
                              {p.melhoria_procedimento}
                            </p>
                          )}
                        </td>
                        <td className="p-3">
                          {p.repositorio ? (
                            <a
                              href={
                                p.repositorio.startsWith("http")
                                  ? p.repositorio
                                  : `https://${p.repositorio}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-vibra-700 hover:underline font-bold"
                            >
                              <LinkIcon className="h-3 w-3" />
                              <span>Acessar</span>
                            </a>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-700">
                          <p className="font-medium">{p.pessoas_treinadas} treinados</p>
                          <p className="text-[10px] text-muted-foreground">
                            {p.tempo_capacitacao} h/dia
                          </p>
                        </td>
                        <td className="p-3 text-right font-bold text-emerald-700">
                          {Number(p.horas_economizadas || 0).toFixed(1)} h/dia
                        </td>
                        <td className="p-3 text-center">
                          {p.dependencia_chave ? (
                            <span className="inline-block rounded bg-red-50 border border-red-200 px-1.5 py-0.5 text-[9px] font-bold text-red-700">
                              Sim (Alto Risco)
                            </span>
                          ) : (
                            <span className="inline-block rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                              Mitigado
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold ${
                              p.status_mudanca === "Concluido"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : p.status_mudanca === "Procedimentado"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {p.status_mudanca}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteProcess(p.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition"
                            title="Excluir"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Change Scorecard & Gap Analysis (Col 1) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 text-vibra-900 font-bold text-[13.5px]">
                <TrendingUp className="h-4.5 w-4.5 text-vibra-700" />
                <span>AS IS vs TO BE - Dados & Gaps</span>
              </div>
              <button
                onClick={handleSaveScorecard}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded bg-vibra-700 px-2 py-1 text-[11px] font-bold text-white hover:bg-vibra-800 disabled:opacity-50 transition"
              >
                <Save className="h-3 w-3" />
                <span>{loading ? "Salvando..." : "Salvar"}</span>
              </button>
            </div>

            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Avalie o status de Gestão de Mudança nas 4 dimensões estratégicas abaixo. Defina a
              pontuação de 1 (Gargalo) a 5 (Excelente/Procedimentado).
            </p>

            <div className="space-y-3 pt-2">
              {/* Cultura Organizacional */}
              <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-800">
                  <span>Cultura Organizacional</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                  <div>
                    <label className="block text-slate-500 font-medium">AS IS (Atual)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_cultural_asis ?? 2}
                      onChange={(e) =>
                        handleScoreChange("score_cultural_asis", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Total Silo/Resistência</option>
                      <option value={2}>2 - Baixo Alinhamento</option>
                      <option value={3}>3 - Consciência Parcial</option>
                      <option value={4}>4 - Boa Acolhida/Engajado</option>
                      <option value={5}>5 - Foco Total em Melhoria</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium">TO BE (Desejado)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_cultural_tobe ?? 4}
                      onChange={(e) =>
                        handleScoreChange("score_cultural_tobe", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Total Silo/Resistência</option>
                      <option value={2}>2 - Baixo Alinhamento</option>
                      <option value={3}>3 - Consciência Parcial</option>
                      <option value={4}>4 - Boa Acolhida/Engajado</option>
                      <option value={5}>5 - Foco Total em Melhoria</option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Observações sobre aspectos de cultura..."
                  className="w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none"
                  value={activeScore?.detalhes_cultura ?? ""}
                  onChange={(e) => handleScoreChange("detalhes_cultura", e.target.value)}
                />
              </div>

              {/* Padronização de Processos */}
              <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-800">
                  <span>Padronização & Procedimentos</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                  <div>
                    <label className="block text-slate-500 font-medium">AS IS (Atual)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_padronizacao_asis ?? 1}
                      onChange={(e) =>
                        handleScoreChange("score_padronizacao_asis", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Zero POPs / Informal</option>
                      <option value={2}>2 - Informações Dispersas</option>
                      <option value={3}>3 - POPs Criados mas Desatualizados</option>
                      <option value={4}>4 - Maioria Procedimentada</option>
                      <option value={5}>5 - 100% POPs no Repositório</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium">TO BE (Desejado)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_padronizacao_tobe ?? 5}
                      onChange={(e) =>
                        handleScoreChange("score_padronizacao_tobe", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Zero POPs / Informal</option>
                      <option value={2}>2 - Informações Dispersas</option>
                      <option value={3}>3 - POPs Criados mas Desatualizados</option>
                      <option value={4}>4 - Maioria Procedimentada</option>
                      <option value={5}>5 - 100% POPs no Repositório</option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Observações sobre padronização..."
                  className="w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none"
                  value={activeScore?.detalhes_padronizacao ?? ""}
                  onChange={(e) => handleScoreChange("detalhes_padronizacao", e.target.value)}
                />
              </div>

              {/* Estruturação da Área */}
              <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-800">
                  <span>Estruturação da Área</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                  <div>
                    <label className="block text-slate-500 font-medium">AS IS (Atual)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_estruturacao_asis ?? 2}
                      onChange={(e) =>
                        handleScoreChange("score_estruturacao_asis", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Área desestruturada</option>
                      <option value={2}>2 - Papéis confusos</option>
                      <option value={3}>3 - Divisão básica</option>
                      <option value={4}>4 - Boa governança</option>
                      <option value={5}>5 - Matriz de responsabilidade 100%</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium">TO BE (Desejado)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_estruturacao_tobe ?? 4}
                      onChange={(e) =>
                        handleScoreChange("score_estruturacao_tobe", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Área desestruturada</option>
                      <option value={2}>2 - Papéis confusos</option>
                      <option value={3}>3 - Divisão básica</option>
                      <option value={4}>4 - Boa governança</option>
                      <option value={5}>5 - Matriz de responsabilidade 100%</option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Observações sobre estrutura da área..."
                  className="w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none"
                  value={activeScore?.detalhes_estruturacao ?? ""}
                  onChange={(e) => handleScoreChange("detalhes_estruturacao", e.target.value)}
                />
              </div>

              {/* Organização das Equipes */}
              <div className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-[11.5px] font-bold text-slate-800">
                  <span>Organização das Equipes</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                  <div>
                    <label className="block text-slate-500 font-medium">AS IS (Atual)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_organizacao_asis ?? 2}
                      onChange={(e) =>
                        handleScoreChange("score_organizacao_asis", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Silos Severos / Sobrecarga</option>
                      <option value={2}>2 - Atendimento reativo</option>
                      <option value={3}>3 - Divisão funcional de tarefas</option>
                      <option value={4}>4 - Squads / Equipes integradas</option>
                      <option value={5}>5 - Co-autoria Lean fluida</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-500 font-medium">TO BE (Desejado)</label>
                    <select
                      className="mt-1 w-full rounded border border-input px-1.5 py-1 text-xs bg-white"
                      value={activeScore?.score_organizacao_tobe ?? 5}
                      onChange={(e) =>
                        handleScoreChange("score_organizacao_tobe", Number(e.target.value))
                      }
                    >
                      <option value={1}>1 - Silos Severos / Sobrecarga</option>
                      <option value={2}>2 - Atendimento reativo</option>
                      <option value={3}>3 - Divisão funcional de tarefas</option>
                      <option value={4}>4 - Squads / Equipes integradas</option>
                      <option value={5}>5 - Co-autoria Lean fluida</option>
                    </select>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Observações sobre organização de equipes..."
                  className="w-full rounded border border-input px-2 py-1 text-[10px] bg-white focus:outline-none"
                  value={activeScore?.detalhes_organizacao ?? ""}
                  onChange={(e) => handleScoreChange("detalhes_organizacao", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Gap Chart Visualizer */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
            <h3 className="text-[12.5px] font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-emerald-600" />
              <span>Gaps de Gestão de Mudança</span>
            </h3>

            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gapChartData} margin={{ left: -20, bottom: -5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="AS IS (Atual)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="TO BE (Desejado)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
