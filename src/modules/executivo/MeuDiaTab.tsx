import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  User,
  Award,
  Save,
  ShieldAlert,
  Search,
  BookOpen,
  Info,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { InitiativeDrawer } from "@/components/InitiativeDrawer";
import { toast } from "sonner";

type Tarefa = {
  id: string;
  titulo: string;
  status: string | null;
  prioridade: string | null;
  data_fim_prevista: string | null;
  data_fim_real: string | null;
  percentual_avanco: number | null;
  iniciativa_id: string;
  responsavel_id: string | null;
  participantes?: any;
  tipo_tarefa?: string | null;
  iniciativas?: { id: string; codigo: string | null; titulo: string | null } | null;
};

type Agenda = {
  id: string;
  titulo: string;
  data_evento: string | null;
  tipo_reuniao: string | null;
  duracao_min: number | null;
  notas: string | null;
  iniciativa_id: string;
  iniciativas?: { id: string; codigo: string | null; titulo: string | null } | null;
};

type AgendaParticipante = {
  id: string;
  agenda_id: string;
  profile_id: string;
  minutos_creditados: number | null;
};

type MC3Registro = {
  id: string;
  profile_id: string;
  kpi_humano: string;
  categoria_diferenciada: string | null;
  contribuicao: string | null;
  tempo_dedicado_min: number | null;
  created_at: string;
};

type Reconhecimento = {
  id: string;
  profile_id: string;
  codigo: string;
  titulo: string;
  descricao: string | null;
  pontos: number;
  concedido_por: string | null;
  created_at: string;
};

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function fmtDate(s: string | null) {
  if (!s) return "—";
  const d = new Date(s);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function MeuDiaTab() {
  const qc = useQueryClient();
  const [iniId, setIniId] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(true);

  // 1. Get logged in Auth User
  const { data: me } = useQuery({
    queryKey: ["me-id"],
    queryFn: async () => (await supabase.auth.getUser()).data.user,
  });

  // 2. Get User's Role
  const { data: myRole = "visualizador" } = useQuery({
    queryKey: ["my-role", me?.id],
    enabled: !!me?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", me!.id)
        .maybeSingle();
      return data?.role ?? "visualizador";
    },
  });

  // 3. Get User Profile
  const { data: profile } = useQuery({
    queryKey: ["me-profile", me?.id],
    enabled: !!me?.id,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", me!.id).single();
      if (error) throw error;
      return data;
    },
  });

  // 4. Load all Profiles for Name Mapping
  const { data: profiles = [] } = useQuery({
    queryKey: ["all-profiles-map"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id,nome,email,cargo");
      if (error) throw error;
      return data ?? [];
    },
  });

  const profileNameMap = useMemo(() => {
    return new Map<string, string>(profiles.map((p) => [p.id, p.nome ?? p.email ?? ""]));
  }, [profiles]);

  // 5. Load all active tasks in memory to filter dynamically based on Full Name & ID
  const { data: allTarefas = [], isLoading: isLoadingTasks } = useQuery({
    queryKey: ["all-tasks-meu-dia"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tarefas")
        .select(
          "id,titulo,status,prioridade,data_fim_prevista,data_fim_real,percentual_avanco,iniciativa_id,responsavel_id,participantes,tipo_tarefa,iniciativas(id,codigo,titulo)",
        )
        .is("deleted_at", null)
        .order("data_fim_prevista", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as unknown as Tarefa[];
    },
  });

  // 6. Load all meetings (agenda)
  const { data: agendas = [] } = useQuery({
    queryKey: ["all-agendas-meu-dia"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agenda")
        .select(
          "id,titulo,data_evento,tipo_reuniao,duracao_min,notas,iniciativa_id,iniciativas(id,codigo,titulo)",
        );
      if (error) throw error;
      return (data ?? []) as unknown as Agenda[];
    },
  });

  // 7. Load all agenda participants
  const { data: agendaParticipants = [] } = useQuery({
    queryKey: ["all-agenda-participants-meu-dia"],
    queryFn: async () => {
      const { data, error } = await supabase.from("agenda_participantes").select("*");
      if (error) throw error;
      return (data ?? []) as unknown as AgendaParticipante[];
    },
  });

  // 8. Load MC3 Registries and Recognitions for the current user
  const { data: mc3Registros = [] } = useQuery({
    queryKey: ["my-mc3-registros", me?.id],
    enabled: !!me?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mc3_registros")
        .select("*")
        .eq("profile_id", me!.id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as MC3Registro[];
    },
  });

  const { data: reconhecimentos = [] } = useQuery({
    queryKey: ["my-reconhecimentos", me?.id],
    enabled: !!me?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reconhecimentos")
        .select("*")
        .eq("profile_id", me!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Reconhecimento[];
    },
  });

  // Handle saving profile full name
  async function handleSaveProfileName() {
    if (!novoNome.trim()) return toast.error("Preencha um nome válido!");
    const { error } = await supabase
      .from("profiles")
      .update({ nome: novoNome.trim() })
      .eq("id", me!.id);
    if (error) return toast.error(error.message);
    toast.success("Nome completo salvo com sucesso!");
    qc.invalidateQueries({ queryKey: ["me-profile"] });
    qc.invalidateQueries({ queryKey: ["all-profiles-map"] });
  }

  // Filter tasks belonging to me (either by ID or by full name matched as responsible or participant)
  const myTarefas = useMemo(() => {
    if (!me?.id) return [];
    const myName = (profile?.nome ?? "").toLowerCase().trim();

    return allTarefas.filter((t) => {
      // Direct assignment by ID
      if (t.responsavel_id === me.id) return true;

      // Match by full name in participantes
      if (myName && Array.isArray(t.participantes)) {
        return t.participantes.some(
          (p: any) => typeof p === "string" && p.toLowerCase().trim() === myName,
        );
      }
      return false;
    });
  }, [allTarefas, me, profile]);

  // Filter agendas belonging to me
  const myAgendas = useMemo(() => {
    if (!me?.id) return [];
    return agendas.filter((a) => {
      return agendaParticipants.some((p) => p.agenda_id === a.id && p.profile_id === me.id);
    });
  }, [agendas, agendaParticipants, me]);

  // Admin section: Other users' pending tasks
  const otherPendingTarefasGrouped = useMemo(() => {
    if (myRole !== "admin" && myRole !== "master" && myRole !== "gestao") return [];

    const myId = me?.id;
    const myName = (profile?.nome ?? "").toLowerCase().trim();

    // Find tasks that do NOT belong to me and are not completed
    const othersTasks = allTarefas.filter((t) => {
      const isMine =
        t.responsavel_id === myId ||
        (myName &&
          Array.isArray(t.participantes) &&
          t.participantes.some(
            (p: any) => typeof p === "string" && p.toLowerCase().trim() === myName,
          ));

      const st = (t.status ?? "").toLowerCase();
      const isCompleted = st === "concluída" || st === "concluida" || st === "cancelada";

      return !isMine && !isCompleted;
    });

    // Group tasks by responsible user name
    const grouped: Record<string, { user_id: string | null; name: string; tasks: Tarefa[] }> = {};

    for (const t of othersTasks) {
      let respName = "Sem Responsável";
      if (t.responsavel_id) {
        respName = profileNameMap.get(t.responsavel_id) ?? "Usuário Desconhecido";
      }

      // Filter by search query if present
      if (adminSearch) {
        const query = adminSearch.toLowerCase().trim();
        const matchesName = respName.toLowerCase().includes(query);
        const matchesTitle = (t.titulo ?? "").toLowerCase().includes(query);
        const matchesIniciativa =
          (t.iniciativas?.titulo ?? "").toLowerCase().includes(query) ||
          (t.iniciativas?.codigo ?? "").toLowerCase().includes(query);

        if (!matchesName && !matchesTitle && !matchesIniciativa) continue;
      }

      if (!grouped[respName]) {
        grouped[respName] = {
          user_id: t.responsavel_id,
          name: respName,
          tasks: [],
        };
      }
      grouped[respName].tasks.push(t);
    }

    return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
  }, [allTarefas, me, profile, myRole, profileNameMap, adminSearch]);

  const buckets = useMemo(() => {
    const hoje = startOfDay(new Date());
    const em7 = addDays(hoje, 7);
    const atrasadas: Tarefa[] = [];
    const doDia: Tarefa[] = [];
    const proximas: Tarefa[] = [];
    const concluidas: Tarefa[] = [];

    for (const t of myTarefas) {
      const st = (t.status ?? "").toLowerCase();
      if (st === "concluída" || st === "concluida" || st === "cancelada") {
        concluidas.push(t);
        continue;
      }
      if (!t.data_fim_prevista) {
        proximas.push(t);
        continue;
      }
      const d = startOfDay(new Date(t.data_fim_prevista));
      if (d < hoje) atrasadas.push(t);
      else if (d.getTime() === hoje.getTime()) doDia.push(t);
      else if (d <= em7) proximas.push(t);
      else proximas.push(t);
    }
    return { atrasadas, doDia, proximas, concluidas };
  }, [myTarefas]);

  const total = myTarefas.length;
  const pctOk = total ? Math.round((buckets.concluidas.length / total) * 100) : 0;

  const totalPontosMc3 = useMemo(() => {
    const ptsBadges = reconhecimentos.reduce((acc, r) => acc + (r.pontos ?? 0), 0);
    const ptsRegistros = mc3Registros.length * 10; // 10 points per standard contribution registry
    return ptsBadges + ptsRegistros;
  }, [reconhecimentos, mc3Registros]);

  return (
    <div className="space-y-6">
      {/* Profile Name update warning banner if name is missing or incomplete */}
      {profile && (!profile.nome || profile.nome.trim().split(/\s+/).length < 2) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4.5 shadow-vibra-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h4 className="text-[13px] font-bold text-amber-900">
                  Configure seu nome completo!
                </h4>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-amber-800">
                  Para que o sistema correlacione suas tarefas, agendas, atas e reconhecimentos MC³
                  automaticamente, você precisa salvar seu nome completo (ex:{" "}
                  <strong>Raquel de Souza França</strong>).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Seu Nome Completo"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                className="h-8.5 w-full rounded border border-amber-200 bg-white px-2.5 text-[12px] text-amber-950 outline-none focus:border-amber-400 sm:w-56"
              />
              <button
                onClick={handleSaveProfileName}
                className="flex h-8.5 items-center gap-1.5 rounded bg-amber-600 px-3 text-[12px] font-semibold text-white transition hover:bg-amber-700"
              >
                <Save className="h-3.5 w-3.5" /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Greeting and Stats Panel */}
      <header className="rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vibra-50 text-vibra-700">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-widest text-vibra-600">
                Hoje ·{" "}
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                })}
              </p>
              <h2 className="mt-0.5 text-[20px] font-bold text-vibra-800">
                Olá, {profile?.nome ?? "Usuário"}!
              </h2>
              <p className="text-[12px] text-muted-foreground">
                Aqui está o resumo do seu dia com base no seu nome completo.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[12px]">
            <Metric
              label="Atrasadas"
              value={buckets.atrasadas.length}
              color="bg-rose-50 text-rose-700 border border-rose-100"
              icon={<AlertTriangle className="h-3.5 w-3.5" />}
            />
            <Metric
              label="Para hoje"
              value={buckets.doDia.length}
              color="bg-amber-50 text-amber-700 border border-amber-100"
              icon={<Clock className="h-3.5 w-3.5" />}
            />
            <Metric
              label="Próx. 7d"
              value={buckets.proximas.length}
              color="bg-vibra-50 text-vibra-800 border border-vibra-100"
              icon={<CalendarDays className="h-3.5 w-3.5" />}
            />
            <Metric
              label="MC³ Pontos"
              value={totalPontosMc3}
              color="bg-indigo-50 text-indigo-700 border border-indigo-100"
              icon={<Award className="h-3.5 w-3.5" />}
            />
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-neutral-100">
          <div
            className="h-2 rounded-full bg-vibra-600 transition-all duration-500"
            style={{ width: `${pctOk}%` }}
          />
        </div>
        <p className="mt-1 text-right text-[11px] font-medium text-muted-foreground">
          {pctOk}% concluído das suas tarefas atribuídas
        </p>
      </header>

      {/* Grid Layout: Tasks Board, Agendas & MC3 Recognition */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left Column: Tasks Board (takes 2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-5">
          <h3 className="text-[14px] font-bold tracking-tight text-vibra-800 flex items-center gap-2">
            📋 Suas Atividades e Tarefas
          </h3>
          {isLoadingTasks ? (
            <p className="text-center text-[12.5px] py-10 text-muted-foreground">Carregando…</p>
          ) : total === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-200 bg-white p-10 text-center shadow-vibra-sm">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500 animate-bounce" />
              <p className="mt-3 text-[13px] font-semibold text-vibra-800">Você está livre 🎉</p>
              <p className="text-[12px] text-muted-foreground">
                Nenhuma tarefa atribuída ao seu nome completo no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Column title="Atrasadas" tone="rose" items={buckets.atrasadas} onOpen={setIniId} />
              <Column title="Para hoje" tone="amber" items={buckets.doDia} onOpen={setIniId} />
              <Column
                title="Próximos 7 dias / Sem data"
                tone="vibra"
                items={buckets.proximas}
                onOpen={setIniId}
              />
            </div>
          )}

          {/* Agenda & Meetings Section */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-vibra-sm">
            <h3 className="text-[13.5px] font-bold text-vibra-800 flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-vibra-600" /> Sua Agenda & Reuniões
            </h3>
            {myAgendas.length === 0 ? (
              <p className="text-[12px] text-muted-foreground italic p-2 text-center">
                Nenhuma reunião agendada onde você é participante.
              </p>
            ) : (
              <div className="divide-y divide-neutral-100 max-h-56 overflow-y-auto">
                {myAgendas.map((a) => (
                  <div
                    key={a.id}
                    className="py-2.5 flex items-center justify-between gap-3 text-[12px]"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-semibold text-neutral-800 truncate">{a.titulo}</p>
                      <p className="text-[10.5px] text-muted-foreground flex items-center gap-1.5">
                        <span className="rounded bg-neutral-100 px-1 py-0.2 font-medium text-neutral-700">
                          {a.tipo_reuniao ?? "Status"}
                        </span>
                        {a.iniciativas?.codigo && (
                          <span className="font-bold text-vibra-700">{a.iniciativas.codigo}</span>
                        )}
                        <span>{a.duracao_min ?? 0} min</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-semibold text-neutral-700">
                        {fmtDate(a.data_evento)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: MC3 Matrix Recognition Widget */}
        <div className="space-y-5">
          <h3 className="text-[14px] font-bold tracking-tight text-indigo-900 flex items-center gap-2">
            🚀 Reconhecimento & Contribuições (MC³)
          </h3>

          <div className="rounded-xl border border-indigo-150 bg-indigo-50/40 p-4.5 shadow-vibra-sm space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600 animate-pulse" />
                <span className="text-[13px] font-bold text-indigo-900">
                  Seus Badges & Medalhas
                </span>
              </div>
              <span className="text-[11px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                {reconhecimentos.length} Badges
              </span>
            </div>

            {reconhecimentos.length === 0 ? (
              <div className="p-4 text-center border border-dashed border-indigo-200 rounded-lg bg-white">
                <BookOpen className="mx-auto h-6 w-6 text-indigo-400" />
                <p className="mt-2 text-[11.5px] font-medium text-indigo-800">
                  Ainda sem badges recebidos
                </p>
                <p className="text-[10.5px] text-muted-foreground">
                  Continue gerando valor para a corporação.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                {reconhecimentos.map((r) => (
                  <div
                    key={r.id}
                    className="flex gap-2.5 items-start bg-white p-2.5 rounded-lg border border-indigo-100 shadow-sm"
                  >
                    <span className="text-[18px]">🏅</span>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11.5px] font-bold text-indigo-950 truncate">
                          {r.titulo}
                        </span>
                        <span className="text-[10px] text-indigo-700 font-semibold shrink-0">
                          +{r.pontos} pts
                        </span>
                      </div>
                      <p className="text-[10.5px] text-neutral-600 leading-tight italic line-clamp-2">
                        "{r.descricao}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-b border-indigo-100 pt-2 pb-2.5">
              <span className="text-[13px] font-bold text-indigo-900">
                Contribuições Ativas (MC³)
              </span>
              <span className="text-[11px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                {mc3Registros.length} Registros
              </span>
            </div>

            {mc3Registros.length === 0 ? (
              <p className="text-[11px] text-indigo-800 italic text-center py-2">
                Nenhum registro de dedicação à matriz MC³ ativo.
              </p>
            ) : (
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {mc3Registros.map((reg) => (
                  <div
                    key={reg.id}
                    className="bg-white p-2.5 rounded-lg border border-indigo-100 text-[11px] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-900 bg-indigo-50 px-1.5 py-0.2 rounded">
                        {reg.kpi_humano}
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        {reg.tempo_dedicado_min} min
                      </span>
                    </div>
                    {reg.categoria_diferenciada && (
                      <p className="font-semibold text-[10.5px] text-neutral-800">
                        {reg.categoria_diferenciada}
                      </p>
                    )}
                    <p className="text-neutral-600 leading-normal">{reg.contribuicao}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin and Management Section: "Pendências de Outros Usuários" */}
      {(myRole === "admin" || myRole === "master" || myRole === "gestao") && (
        <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-vibra-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-3 mb-4">
            <div>
              <h3 className="text-[14px] font-bold text-vibra-800 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-vibra-700 animate-pulse" /> Painel de
                Pendências Gerais (Outros Usuários)
              </h3>
              <p className="text-[11.5px] text-muted-foreground">
                Exibição de todas as pendências não concluídas de outros usuários. Apenas usuários
                Administradores, Master ou Gestão visualizam esta seção.
              </p>
            </div>
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="h-8 rounded border border-neutral-200 px-3 text-[11px] font-bold hover:bg-neutral-50"
            >
              {showAdminPanel ? "Ocultar Painel" : "Mostrar Painel"}
            </button>
          </div>

          {showAdminPanel && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Filtrar por Usuário, Tarefa ou Iniciativa..."
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    className="h-8.5 w-full rounded-md border border-neutral-200 pl-8.5 pr-3 text-[12px] outline-none focus:border-vibra-500"
                  />
                </div>
              </div>

              {otherPendingTarefasGrouped.length === 0 ? (
                <p className="text-[12px] text-muted-foreground italic text-center py-6">
                  Nenhuma pendência encontrada para outros usuários correspondente aos termos.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {otherPendingTarefasGrouped.map((grp) => (
                    <div
                      key={grp.name}
                      className="rounded-lg border border-neutral-150 bg-neutral-50/50 p-3 space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-200 pb-1.5">
                        <span className="font-bold text-[12.5px] text-neutral-800 truncate">
                          {grp.name}
                        </span>
                        <span className="rounded bg-neutral-200 px-1.5 py-0.2 text-[10px] font-bold text-neutral-700">
                          {grp.tasks.length} pendentes
                        </span>
                      </div>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto">
                        {grp.tasks.map((tar) => (
                          <div
                            key={tar.id}
                            onClick={() => setIniId(tar.iniciativa_id)}
                            className="bg-white p-2 rounded border border-neutral-200 text-[11px] shadow-sm hover:border-vibra-300 transition cursor-pointer space-y-1"
                          >
                            <p className="font-semibold text-neutral-800 leading-tight">
                              {tar.titulo}
                            </p>
                            <div className="flex items-center justify-between gap-2 text-[9.5px] text-muted-foreground">
                              {tar.iniciativas?.codigo && (
                                <span className="font-bold text-vibra-700">
                                  {tar.iniciativas.codigo}
                                </span>
                              )}
                              <span>📅 {fmtDate(tar.data_fim_prevista)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <InitiativeDrawer initiativeId={iniId} onClose={() => setIniId(null)} />
    </div>
  );
}

function Metric({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>{icon}</div>
      <div className="leading-tight">
        <div className="text-[15px] font-bold text-vibra-800">{value}</div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}

const TONES: Record<string, { header: string; ring: string; chip: string }> = {
  rose: {
    header: "bg-rose-50 text-rose-800",
    ring: "border-rose-200",
    chip: "bg-rose-100 text-rose-700",
  },
  amber: {
    header: "bg-amber-50 text-amber-800",
    ring: "border-amber-200",
    chip: "bg-amber-100 text-amber-700",
  },
  vibra: {
    header: "bg-vibra-50 text-vibra-800",
    ring: "border-vibra-200",
    chip: "bg-vibra-100 text-vibra-800",
  },
};

function Column({
  title,
  tone,
  items,
  onOpen,
}: {
  title: string;
  tone: keyof typeof TONES | string;
  items: Tarefa[];
  onOpen: (id: string) => void;
}) {
  const t = TONES[tone] ?? TONES.vibra;
  return (
    <div className={`overflow-hidden rounded-xl border bg-white shadow-vibra-sm ${t.ring}`}>
      <div className={`flex items-center justify-between px-4 py-2.5 ${t.header}`}>
        <h3 className="text-[11.5px] font-bold uppercase tracking-wider">{title}</h3>
        <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${t.chip}`}>
          {items.length}
        </span>
      </div>
      <div className="max-h-[350px] divide-y divide-neutral-100 overflow-y-auto">
        {items.length === 0 && (
          <p className="px-4 py-6 text-center text-[11px] italic text-muted-foreground">
            Nada por aqui.
          </p>
        )}
        {items.map((tar) => (
          <button
            key={tar.id}
            onClick={() => onOpen(tar.iniciativa_id)}
            className="group flex w-full flex-col gap-1 px-4 py-2.5 text-left transition hover:bg-vibra-50"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="line-clamp-2 text-[12px] font-semibold text-neutral-800 leading-tight">
                {tar.titulo}
              </span>
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
              {tar.iniciativas?.codigo && (
                <span className="rounded bg-neutral-100 px-1.5 py-0.2 font-semibold text-neutral-700">
                  {tar.iniciativas.codigo}
                </span>
              )}
              {tar.iniciativas?.titulo && (
                <span className="truncate max-w-[120px]">{tar.iniciativas.titulo}</span>
              )}
              <span className="ml-auto">📅 {fmtDate(tar.data_fim_prevista)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
