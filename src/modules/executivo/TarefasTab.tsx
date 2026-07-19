import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { toast } from "sonner";
import { syncHierarchyProgress } from "@/lib/progressSync";
import {
  AlertTriangle,
  BarChart3,
  CalendarClock,
  Clock,
  FileText,
  Link2,
  Plus,
  Trash2,
  Upload,
  X,
  Workflow,
  Pencil,
  Calendar,
  List,
  Sliders,
  Search,
  Eye,
} from "lucide-react";
import { usePicklist } from "@/hooks/usePicklist";
import { deleteTaskSimple } from "@/lib/deleteService";
import { useConfirm } from "@/hooks/useConfirm";
import { PicklistField } from "@/components/PicklistField";

const STATUS = ["Pendente", "Em Andamento", "Concluída", "Bloqueada", "Cancelada"];
const PRIORIDADES = ["Baixa", "Média", "Alta", "Crítica"];

function daysUntil(d?: string | null) {
  if (!d) return null;
  const ms = new Date(d).getTime() - new Date().setHours(0, 0, 0, 0);
  return Math.floor(ms / 86400000);
}

export async function syncTaskToAgenda(task: any) {
  if (!task.id) return;

  if (task.tipo_tarefa === "Agenda") {
    const { data: existing } = await supabase
      .from("agenda")
      .select("id")
      .eq("tarefa_id", task.id)
      .maybeSingle();

    const title = task.nome_evento?.trim() || task.titulo?.trim() || "Evento de Agenda";
    const date = task.data_real || task.data_fim_prevista || new Date().toISOString().slice(0, 10);
    const duration = Math.round(Number(task.horas_dedicadas ?? 1) * 60);
    const notes = task.observacoes || "";
    const isCompleted = /conclu/i.test(task.status ?? "");

    const agendaPayload: any = {
      titulo: title,
      data_evento: date.includes("T") ? date : `${date}T09:00:00`,
      tipo_reuniao: "Comitê",
      duracao_min: duration,
      notas: notes,
      concluida: isCompleted,
      concluida_em: isCompleted ? new Date().toISOString() : null,
      iniciativa_id: task.iniciativa_id || null,
      tarefa_id: task.id,
    };

    let agendaId = existing?.id;
    if (agendaId) {
      await supabase.from("agenda").update(agendaPayload).eq("id", agendaId);
    } else {
      const { data: created, error } = await supabase
        .from("agenda")
        .insert(agendaPayload)
        .select("id")
        .single();
      if (!error && created) {
        agendaId = created.id;
      }
    }

    if (agendaId) {
      // Sync participants too
      await supabase.from("agenda_participantes").delete().eq("agenda_id", agendaId);

      const parts = task.participantes ?? [];
      if (parts.length > 0) {
        const minutos = Math.round(duration * 0.8);
        const { data: allProfs } = await supabase.from("profiles").select("id, nome");
        const payloadParts = [];
        for (const name of parts) {
          const matchedProf = allProfs?.find((p) => p.nome?.toLowerCase() === name.toLowerCase());
          if (matchedProf) {
            payloadParts.push({
              agenda_id: agendaId,
              profile_id: matchedProf.id,
              minutos_creditados: minutos,
            });
          } else {
            const { data: newProf } = await supabase
              .from("profiles")
              .insert({ nome: name })
              .select("id")
              .single();
            if (newProf) {
              payloadParts.push({
                agenda_id: agendaId,
                profile_id: newProf.id,
                minutos_creditados: minutos,
              });
            }
          }
        }
        if (payloadParts.length > 0) {
          await supabase.from("agenda_participantes").insert(payloadParts);
        }
      }
    }
  } else {
    await supabase
      .from("agenda")
      .update({ deleted_at: new Date().toISOString() })
      .eq("tarefa_id", task.id);
  }
}

export function TarefasTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const { projetoIds } = useHierarchy();
  const selProj = projetoIds && projetoIds.length > 0 ? projetoIds : null;
  const [editId, setEditId] = useState<string | "new" | null>(null);
  const [newForProj, setNewForProj] = useState<string | null>(null);

  useRealtimeTable("tarefas", [["tarefas-board"]]);
  useRealtimeTable("iniciativas", [["tarefas-ini"]]);

  const { data: projetos = [] } = useQuery({
    queryKey: ["tarefas-projs"],
    queryFn: async () =>
      (await supabase.from("projetos").select("id,nome,cor").is("deleted_at", null).order("nome"))
        .data ?? [],
  });

  const { data: iniciativas = [] } = useQuery({
    queryKey: ["tarefas-ini", selProj?.join(",") ?? "_all"],
    queryFn: async () => {
      let qy = supabase
        .from("iniciativas")
        .select("id,titulo,projeto_id,diretoria,data_inicio,data_fim_prevista")
        .is("deleted_at", null);
      if (selProj) qy = qy.in("projeto_id", selProj);
      return (await qy).data ?? [];
    },
  });

  const iniIds = iniciativas.map((i) => i.id);

  const { data: tarefas = [] } = useQuery({
    queryKey: ["tarefas-board", selProj?.join(",") ?? "_all", iniIds.length],
    queryFn: async () => {
      let qy = supabase
        .from("tarefas")
        .select("*")
        .is("deleted_at", null)
        .order("data_fim_prevista", { ascending: true });
      if (selProj)
        qy = qy.in(
          "iniciativa_id",
          iniIds.length ? iniIds : ["00000000-0000-0000-0000-000000000000"],
        );
      return (await qy).data ?? [];
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["tarefas-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? [],
  });

  const { data: allMicros = [] } = useQuery({
    queryKey: ["tarefas-micros", iniIds.length],
    queryFn: async () => {
      const sb = supabase.from("microprocessos" as any) as any;
      if (!iniIds.length)
        return (await sb.select("id,titulo,iniciativa_id").is("deleted_at", null)).data ?? [];
      return (
        (
          await sb
            .select("id,titulo,iniciativa_id")
            .is("deleted_at", null)
            .in("iniciativa_id", iniIds)
        ).data ?? []
      );
    },
  });

  const profMap = new Map(profiles.map((p) => [p.id, p.nome ?? p.email ?? "—"]));
  const iniMap = new Map(iniciativas.map((i) => [i.id, i]));
  const projetosVisiveis = selProj ? projetos.filter((p) => selProj.includes(p.id)) : projetos;

  const totals = {
    total: tarefas.length,
    andamento: tarefas.filter((t) => /andamento/i.test(t.status ?? "")).length,
    concluidas: tarefas.filter((t) => /conclu/i.test(t.status ?? "")).length,
    pendentes: tarefas.filter((t) => /pendente/i.test(t.status ?? "")).length,
    bloqueadas: tarefas.filter((t) => /bloque/i.test(t.status ?? "")).length,
    atrasadas: tarefas.filter(
      (t) =>
        t.data_fim_prevista &&
        new Date(t.data_fim_prevista) < new Date() &&
        !/conclu|cancel/i.test(t.status ?? ""),
    ).length,
  };

  // group por projeto
  const tarefasByProj = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const t of tarefas) {
      const ini = t.iniciativa_id ? iniMap.get(t.iniciativa_id) : undefined;
      const pid = ini?.projeto_id ?? "__avulsa";
      if (!map.has(pid)) map.set(pid, []);
      map.get(pid)!.push(t);
    }
    return map;
  }, [tarefas, iniMap]);

  // projeto date range (min/max das iniciativas)
  const projRange = useMemo(() => {
    const m = new Map<string, { ini?: string; fim?: string; nIni: number; nTar: number }>();
    for (const i of iniciativas) {
      const e = m.get(i.projeto_id ?? "") ?? { nIni: 0, nTar: 0 };
      e.nIni += 1;
      if (i.data_inicio && (!e.ini || i.data_inicio < e.ini)) e.ini = i.data_inicio;
      if (i.data_fim_prevista && (!e.fim || i.data_fim_prevista > e.fim))
        e.fim = i.data_fim_prevista;
      m.set(i.projeto_id ?? "", e);
    }
    for (const [pid, arr] of tarefasByProj) {
      const e = m.get(pid) ?? { nIni: 0, nTar: 0 };
      e.nTar = arr.length;
      m.set(pid, e);
    }
    return m;
  }, [iniciativas, tarefasByProj]);

  async function updateField(id: string, patch: any) {
    if ("status" in patch && /conclu/i.test(patch.status))
      patch.data_fim_real = new Date().toISOString().slice(0, 10);
    const { error } = await supabase.from("tarefas").update(patch).eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      const { data: fullTask } = await supabase
        .from("tarefas")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (fullTask) {
        await syncTaskToAgenda(fullTask);
      }
      await syncHierarchyProgress({ taskId: id });
      qc.invalidateQueries({ queryKey: ["tarefas-board"] });
      qc.invalidateQueries({ queryKey: ["agenda"] });
      qc.invalidateQueries({ queryKey: ["agenda-parts"] });
    }
  }

  async function remover(id: string) {
    if (
      !(await confirm(
        "Excluir tarefa?",
        "Tem certeza que deseja excluir esta tarefa permanentemente? Esta ação é irreversível!",
      ))
    )
      return;
    const { error } = await supabase
      .from("tarefas")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      await supabase
        .from("agenda")
        .update({ deleted_at: new Date().toISOString() })
        .eq("tarefa_id", id);
      toast.success("Tarefa removida");
      qc.invalidateQueries({ queryKey: ["tarefas-board"] });
      qc.invalidateQueries({ queryKey: ["agenda"] });
    }
  }

  const diretorias = [
    ...new Set([
      ...(iniciativas.map((i) => i.diretoria).filter(Boolean) as string[]),
      ...(tarefas.map((t) => t.diretoria).filter(Boolean) as string[]),
    ]),
  ];

  const projSemDatas = projetosVisiveis.filter((p) => {
    const r = projRange.get(p.id);
    return !r?.ini || !r?.fim;
  });

  return (
    <div className="space-y-4">
      {/* TOP KPI strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[
          { l: "Total", v: totals.total, c: "from-vibra-900 to-vibra-800", vc: "text-white" },
          {
            l: "Em Andamento",
            v: totals.andamento,
            c: "from-vibra-800 to-vibra-700",
            vc: "text-amber-300",
          },
          {
            l: "Concluídas",
            v: totals.concluidas,
            c: "from-vibra-800 to-vibra-700",
            vc: "text-emerald-300",
          },
          {
            l: "Atrasadas",
            v: totals.atrasadas,
            c: "from-vibra-800 to-vibra-700",
            vc: "text-red-300",
          },
          {
            l: "Bloqueadas",
            v: totals.bloqueadas,
            c: "from-vibra-800 to-vibra-700",
            vc: "text-orange-300",
          },
        ].map((k) => (
          <div key={k.l} className={`rounded-xl bg-gradient-to-br ${k.c} px-3 py-2.5 shadow-vibra`}>
            <p className="text-[9.5px] font-bold uppercase tracking-widest text-white/70">{k.l}</p>
            <p className={`text-[22px] font-extrabold ${k.vc}`}>{k.v}</p>
          </div>
        ))}
      </div>

      {/* Secondary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard
          label="Total de Projetos"
          value={projetosVisiveis.length}
          sub={`${tarefas.length} tarefas no total`}
          color="text-vibra-700"
        />
        <SummaryCard
          label="Tarefas Concluídas"
          value={totals.concluidas}
          sub={`${tarefas.length ? Math.round((totals.concluidas / tarefas.length) * 100) : 0}% do total`}
          color="text-emerald-600"
        />
        <SummaryCard
          label="Pendentes"
          value={totals.pendentes}
          sub={`${totals.bloqueadas} bloqueadas`}
          color="text-orange-500"
        />
        <SummaryCard
          label="Em Andamento"
          value={totals.andamento}
          sub="Tarefas ativas agora"
          color="text-blue-600"
        />
      </div>

      {/* Alert banners */}
      <div className="space-y-2">
        {totals.bloqueadas > 0 && (
          <Banner
            cls="bg-blue-50 border-blue-200 text-blue-800"
            icon={<Link2 className="h-4 w-4" />}
          >
            {totals.bloqueadas} tarefa(s) bloqueadas — priorize destravamentos.
          </Banner>
        )}
        {totals.atrasadas > 0 && (
          <Banner
            cls="bg-red-50 border-red-200 text-red-700"
            icon={<AlertTriangle className="h-4 w-4" />}
          >
            {totals.atrasadas} tarefa(s) em atraso — reagendar ou repriorizar.
          </Banner>
        )}
        {projSemDatas.map((p) => (
          <Banner
            key={p.id}
            cls="bg-amber-50 border-amber-200 text-amber-800"
            icon={<CalendarClock className="h-4 w-4" />}
          >
            Projeto "{p.nome}" não possui datas de início/fim definidas.
          </Banner>
        ))}
      </div>

      {/* Timeline dos Projetos */}
      <Section
        title="Timeline dos Projetos"
        icon={<CalendarClock className="h-4 w-4 text-vibra-700" />}
      >
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {projetosVisiveis.map((p) => {
            const r = projRange.get(p.id);
            return (
              <div
                key={p.id}
                className="rounded-lg border-l-4 border-vibra-600 bg-vibra-50/30 p-2.5"
              >
                <p className="truncate text-[12.5px] font-bold text-vibra-900">{p.nome}</p>
                <p className="text-[10.5px] text-muted-foreground">
                  Início: {r?.ini ?? "—"} → Fim: {r?.fim ?? "—"}
                </p>
                <p className="text-[10.5px] text-muted-foreground">
                  {r?.nIni ?? 0} iniciativa(s) · {r?.nTar ?? 0} tarefa(s)
                </p>
              </div>
            );
          })}
          {projetosVisiveis.length === 0 && (
            <p className="text-[12px] italic text-muted-foreground">Nenhum projeto.</p>
          )}
        </div>
      </Section>

      {/* Placar por Projeto */}
      <Section title="Placar por Projeto" icon={<BarChart3 className="h-4 w-4 text-vibra-700" />}>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {projetosVisiveis.map((p) => {
            const arr = tarefasByProj.get(p.id) ?? [];
            const abertas = arr.filter((t) => !/conclu|cancel/i.test(t.status ?? "")).length;
            const bloqu = arr.filter((t) => /bloque/i.test(t.status ?? "")).length;
            return (
              <div
                key={p.id}
                className="rounded-lg border-l-4 border-emerald-600 bg-white p-2.5 shadow-vibra-sm"
              >
                <p className="truncate text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {p.nome}
                </p>
                <p className="text-[22px] font-extrabold text-vibra-900">{arr.length}</p>
                <p className="text-[10.5px] text-muted-foreground">
                  {abertas} abertas · {bloqu} c/ dependência
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Per-project sections */}
      {projetosVisiveis.map((p) => {
        const arr = tarefasByProj.get(p.id) ?? [];
        const pend = arr.filter((t) => /pendente/i.test(t.status ?? "")).length;
        const conc = arr.filter((t) => /conclu/i.test(t.status ?? "")).length;
        const bloqu = arr.filter((t) => /bloque/i.test(t.status ?? "")).length;
        const pct = arr.length ? Math.round((conc / arr.length) * 100) : 0;
        return (
          <ProjectTable
            key={p.id}
            projeto={p}
            tarefas={arr}
            pend={pend}
            conc={conc}
            bloqu={bloqu}
            pct={pct}
            iniciativas={iniciativas.filter((i) => i.projeto_id === p.id)}
            profiles={profiles}
            profMap={profMap}
            diretorias={diretorias}
            onEdit={(id) => setEditId(id)}
            onNew={() => {
              setNewForProj(p.id);
              setEditId("new");
            }}
            onPatch={updateField}
            onRemove={remover}
          />
        );
      })}

      {/* Avulsas (sem iniciativa) */}
      {(tarefasByProj.get("__avulsa")?.length ?? 0) > 0 && (
        <ProjectTable
          projeto={{ id: "__avulsa", nome: "Tarefas Avulsas (sem iniciativa)", cor: null }}
          tarefas={tarefasByProj.get("__avulsa") ?? []}
          pend={0}
          conc={0}
          bloqu={0}
          pct={0}
          iniciativas={iniciativas}
          profiles={profiles}
          profMap={profMap}
          diretorias={diretorias}
          onEdit={(id) => setEditId(id)}
          onNew={() => {
            setNewForProj(null);
            setEditId("new");
          }}
          onPatch={updateField}
          onRemove={remover}
        />
      )}

      {editId !== null && (
        <TarefaDrawer
          id={editId}
          initialProjetoId={newForProj}
          iniciativas={iniciativas}
          allMicros={allMicros as any[]}
          profiles={profiles}
          diretorias={diretorias}
          onClose={() => {
            setEditId(null);
            setNewForProj(null);
          }}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["tarefas-board"] });
            setEditId(null);
            setNewForProj(null);
          }}
        />
      )}
    </div>
  );
}

function Banner({
  cls,
  icon,
  children,
}: {
  cls: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[12.5px] ${cls}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: number;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className={`text-[26px] font-extrabold ${color}`}>{value}</p>
      <p className="text-[10.5px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <p className="text-[12.5px] font-bold text-vibra-900">{title}</p>
      </div>
      {children}
    </div>
  );
}

function ProjectTable({
  projeto,
  tarefas,
  pend,
  conc,
  bloqu,
  pct,
  iniciativas,
  profiles,
  profMap,
  diretorias,
  onEdit,
  onNew,
  onPatch,
  onRemove,
}: {
  projeto: any;
  tarefas: any[];
  pend: number;
  conc: number;
  bloqu: number;
  pct: number;
  iniciativas: any[];
  profiles: any[];
  profMap: Map<any, any>;
  diretorias: string[];
  onEdit: (id: string) => void;
  onNew: () => void;
  onPatch: (id: string, patch: any) => void;
  onRemove: (id: string) => void;
}) {
  const { values: perfis } = usePicklist("Perfil Vinculado");
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[14px] font-bold text-vibra-900">{projeto.nome}</p>
          <p className="text-[10.5px] text-muted-foreground">
            {tarefas.length} tarefas · {pend} pendentes · {conc} concluídas
          </p>
        </div>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-vibra-800"
        >
          <Plus className="h-3.5 w-3.5" /> Nova Tarefa
        </button>
      </div>

      <div className="mb-2 grid grid-cols-4 gap-2">
        <Mini label="Pendentes" value={pend} color="text-orange-500" />
        <Mini label="Concluídas" value={conc} color="text-emerald-600" />
        <Mini label="C/ Bloqueio" value={bloqu} color="text-red-500" />
        <div className="rounded-lg border border-border bg-white p-2">
          <p className="text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground">
            Progresso Geral
          </p>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-orange-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-vibra-800">{pct}%</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11.5px] min-w-[1200px]">
          <thead>
            <tr className="bg-vibra-50 text-vibra-800">
              <Th>Tarefa</Th>
              <Th>Responsável</Th>
              <Th>Diretoria</Th>
              <Th>Prazo</Th>
              <Th>Horas Ded.</Th>
              <Th>Participantes</Th>
              <Th>Tipo</Th>
              <Th>Data Real</Th>
              <Th>Criticidade</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((t) => {
              const d = daysUntil(t.data_fim_prevista);
              const overdue = d !== null && d < 0 && !/conclu|cancel/i.test(t.status ?? "");
              const warn = d !== null && d >= 0 && d <= 3 && !/conclu|cancel/i.test(t.status ?? "");
              return (
                <tr key={t.id} className="border-b border-border hover:bg-vibra-50/30">
                  <td className="px-2 py-1.5">
                    <button
                      onClick={() => onEdit(t.id)}
                      className="text-left font-semibold text-vibra-800 hover:text-vibra-600"
                    >
                      {t.titulo}
                    </button>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={t.responsavel_id ?? ""}
                      onChange={(e) => onPatch(t.id, { responsavel_id: e.target.value || null })}
                      className="w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]"
                    >
                      <option value="">— selecione —</option>
                      {perfis.map((v) => (
                        <option key={v.id} value={v.valor}>
                          {v.valor}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      value={t.diretoria ?? ""}
                      onChange={(e) => onPatch(t.id, { diretoria: e.target.value || null })}
                      list={`dirs-${projeto.id}`}
                      placeholder="— selecione —"
                      className="w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]"
                    />
                    <datalist id={`dirs-${projeto.id}`}>
                      {diretorias.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="date"
                      value={t.data_fim_prevista ?? ""}
                      onChange={(e) => onPatch(t.id, { data_fim_prevista: e.target.value || null })}
                      className={`w-full rounded border border-input bg-white px-1.5 py-1 text-[11px] ${overdue ? "border-red-400 text-red-700 font-bold" : warn ? "border-orange-300 text-orange-700" : ""}`}
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      step="0.5"
                      value={t.horas_dedicadas ?? ""}
                      onChange={(e) =>
                        onPatch(t.id, {
                          horas_dedicadas: e.target.value === "" ? null : Number(e.target.value),
                        })
                      }
                      className="w-14 rounded border border-input bg-white px-1.5 py-1 text-[11px]"
                    />
                  </td>
                  <td className="px-2 py-1.5 min-w-[150px]">
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                      <PicklistField
                        multi
                        categoria="Participantes"
                        value={
                          Array.isArray(t.participantes)
                            ? (t.participantes as string[])
                            : typeof t.participantes === "string"
                              ? (t.participantes as string)
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean)
                              : []
                        }
                        onChange={(v: string[]) => onPatch(t.id, { participantes: v })}
                        placeholder="Participantes"
                        size="sm"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1.5 min-w-[140px]">
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                      <PicklistField
                        categoria="Tipo de Tarefa"
                        value={t.tipo_tarefa}
                        onChange={(v) => onPatch(t.id, { tipo_tarefa: v || null })}
                        placeholder="Tipo"
                        size="sm"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="date"
                      value={t.data_real ?? ""}
                      onChange={(e) => onPatch(t.id, { data_real: e.target.value || null })}
                      className="w-28 rounded border border-input bg-white px-1.5 py-1 text-[11px]"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={t.prioridade ?? "Baixa"}
                      onChange={(e) => onPatch(t.id, { prioridade: e.target.value })}
                      className="w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]"
                    >
                      {PRIORIDADES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={t.status ?? "Pendente"}
                      onChange={(e) => onPatch(t.id, { status: e.target.value })}
                      className="w-full rounded border border-input bg-white px-1.5 py-1 text-[11px]"
                    >
                      {STATUS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(t.id)}
                        className="rounded p-1 text-vibra-700 hover:bg-vibra-50"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => onRemove(t.id)}
                        className="rounded p-1 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {tarefas.length === 0 && (
              <tr>
                <td
                  colSpan={11}
                  className="py-6 text-center text-[12px] italic text-muted-foreground"
                >
                  Nenhuma tarefa neste projeto. Clique em "Nova Tarefa".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-wider">
      {children}
    </th>
  );
}
function Mini({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-2">
      <p className="text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`text-[20px] font-extrabold ${color}`}>{value}</p>
    </div>
  );
}

// ===== Drawer =====
function TarefaDrawer({
  id,
  initialProjetoId,
  iniciativas,
  allMicros,
  profiles,
  diretorias,
  onClose,
  onSaved,
}: {
  id: string | "new";
  initialProjetoId: string | null;
  iniciativas: any[];
  allMicros: any[];
  profiles: any[];
  diretorias: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const qc = useQueryClient();
  const isNew = id === "new";
  const { values: perfis } = usePicklist("Perfil Vinculado");
  const [form, setForm] = useState<any>({ status: "Pendente", prioridade: "Baixa" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isNew) {
      setForm({ status: "Pendente", prioridade: "Baixa" });
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("tarefas")
        .select("*")
        .eq("id", id as string)
        .maybeSingle();
      if (data) setForm(data);
    })();
  }, [id, isNew]);

  const iniciativasFiltradas = useMemo(() => {
    if (!initialProjetoId || !isNew) return iniciativas;
    return iniciativas.filter((i) => i.projeto_id === initialProjetoId);
  }, [iniciativas, initialProjetoId, isNew]);

  const { data: anexos = [] } = useQuery({
    queryKey: ["tarefa-anexos", id],
    enabled: !isNew,
    queryFn: async () =>
      (
        await (supabase.from("anexos") as any)
          .select("*")
          .eq("tarefa_id", id as string)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });

  const microsDaIni = useMemo(() => {
    if (!form.iniciativa_id) return [];
    return allMicros.filter((m: any) => m.iniciativa_id === form.iniciativa_id);
  }, [form.iniciativa_id, allMicros]);

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function uploadFile(file: File, tarefaId: string) {
    if (file.size > 10 * 1024 * 1024) return toast.error("Máx 10MB");
    const path = `tarefa/${tarefaId}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("anexos").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await (supabase.from("anexos") as any).insert({
      tarefa_id: tarefaId,
      nome: file.name,
      url: path,
      tamanho_bytes: file.size,
      mime_type: file.type,
      uploaded_by: user?.id,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Anexo enviado");
      qc.invalidateQueries({ queryKey: ["tarefa-anexos", tarefaId] });
    }
  }
  async function downloadAnexo(a: any) {
    const { data, error } = await supabase.storage.from("anexos").createSignedUrl(a.url, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  }
  async function removeAnexo(a: any) {
    await supabase.storage.from("anexos").remove([a.url]);
    await supabase.from("anexos").delete().eq("id", a.id);
    qc.invalidateQueries({ queryKey: ["tarefa-anexos", id] });
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!form.titulo?.trim()) return toast.error("Informe a Tarefa");
    if (form.microprocesso_id && !form.iniciativa_id) {
      return toast.error("Selecione uma Iniciativa antes do Microprocesso.");
    }
    setLoading(true);
    const payload: any = {
      titulo: form.titulo.trim(),
      responsavel_id: form.responsavel_id || null,
      diretoria: form.diretoria || null,
      data_fim_prevista: form.data_fim_prevista || null,
      status: form.status || "Pendente",
      prioridade: form.prioridade || "Baixa",
      iniciativa_id: form.iniciativa_id || null,
      microprocesso_id: form.microprocesso_id || null,
      observacoes: form.observacoes || null,
      tipo_tarefa: form.tipo_tarefa || null,
      data_real: form.data_real || null,
      nome_evento: form.nome_evento || null,
      horas_dedicadas:
        form.horas_dedicadas !== undefined &&
        form.horas_dedicadas !== "" &&
        form.horas_dedicadas !== null
          ? Number(form.horas_dedicadas)
          : null,
      participantes: form.participantes || [],
    };
    if (isNew) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      payload.created_by = user?.id;
      const { data: created, error } = await (supabase.from("tarefas") as any)
        .insert(payload)
        .select()
        .single();
      setLoading(false);
      if (error) return toast.error(error.message);
      if (created) {
        await syncTaskToAgenda(created);
      }
      toast.success("Tarefa criada");
    } else {
      const { error } = await (supabase.from("tarefas") as any)
        .update(payload)
        .eq("id", id as string);
      setLoading(false);
      if (error) return toast.error(error.message);
      const fullTask = { ...payload, id };
      await syncTaskToAgenda(fullTask);
      toast.success("Tarefa salva");
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-black/40" onClick={onClose}>
      <form
        onSubmit={salvar}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-vibra"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-vibra-800">
            {isNew ? "Nova Tarefa" : "Editar Tarefa"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Field label="Tarefa *">
          <input
            value={form.titulo ?? ""}
            onChange={(e) => set("titulo", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Responsável">
          <select
            value={form.responsavel_id ?? ""}
            onChange={(e) => set("responsavel_id", e.target.value || null)}
            className="input"
          >
            <option value="">— Selecione —</option>
            {perfis.map((v) => (
              <option key={v.id} value={v.valor}>
                {v.valor}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Diretoria">
          <input
            value={form.diretoria ?? ""}
            onChange={(e) => set("diretoria", e.target.value)}
            list="dirs-drawer-list"
            className="input"
          />
          <datalist id="dirs-drawer-list">
            {diretorias.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </Field>
        <Field label="Prazo">
          <input
            type="date"
            value={form.data_fim_prevista ?? ""}
            onChange={(e) => set("data_fim_prevista", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Criticidade">
          <select
            value={form.prioridade ?? "Baixa"}
            onChange={(e) => set("prioridade", e.target.value)}
            className="input"
          >
            {PRIORIDADES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            value={form.status ?? "Pendente"}
            onChange={(e) => set("status", e.target.value)}
            className="input"
          >
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tipo de Tarefa">
          <PicklistField
            categoria="Tipo de Tarefa"
            value={form.tipo_tarefa}
            onChange={(v) => set("tipo_tarefa", v || null)}
            placeholder="Selecione o Tipo..."
          />
        </Field>
        {form.tipo_tarefa === "Agenda" && (
          <Field label="Nome do Evento (para Agenda)">
            <input
              value={form.nome_evento ?? ""}
              onChange={(e) => set("nome_evento", e.target.value)}
              placeholder="Ex: Reunião de Alinhamento"
              className="input"
            />
          </Field>
        )}
        <Field label="Data Real da Tarefa">
          <input
            type="date"
            value={form.data_real ?? ""}
            onChange={(e) => set("data_real", e.target.value || null)}
            className="input"
          />
        </Field>
        <Field label="Horas Dedicadas">
          <input
            type="number"
            step="0.5"
            value={form.horas_dedicadas ?? ""}
            onChange={(e) =>
              set("horas_dedicadas", e.target.value === "" ? null : Number(e.target.value))
            }
            placeholder="Ex: 2.5"
            className="input"
          />
        </Field>
        <Field label="Participantes">
          <div className="mb-2">
            <PicklistField
              multi
              categoria="Participantes"
              value={
                Array.isArray(form.participantes)
                  ? (form.participantes as string[])
                  : typeof form.participantes === "string"
                    ? (form.participantes as string)
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    : []
              }
              onChange={(v: string[]) => set("participantes", v)}
              placeholder="Selecione os participantes..."
            />
          </div>
        </Field>
        <Field label="Iniciativa (obrigatória se houver Microprocesso)">
          <select
            value={form.iniciativa_id ?? ""}
            onChange={(e) => {
              set("iniciativa_id", e.target.value || null);
              set("microprocesso_id", null);
            }}
            className="input"
          >
            <option value="">— Tarefa avulsa —</option>
            {iniciativasFiltradas.map((i) => (
              <option key={i.id} value={i.id}>
                {i.titulo}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Microprocesso (filtrado pela iniciativa)">
          <select
            value={form.microprocesso_id ?? ""}
            onChange={(e) => set("microprocesso_id", e.target.value || null)}
            disabled={!form.iniciativa_id}
            className="input disabled:opacity-50 disabled:bg-muted"
          >
            <option value="">— Nenhum —</option>
            {microsDaIni.map((m: any) => (
              <option key={m.id} value={m.id}>
                {m.titulo}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Observações (campo livre)">
          <textarea
            rows={3}
            value={form.observacoes ?? ""}
            onChange={(e) => set("observacoes", e.target.value)}
            className="input resize-y"
          />
        </Field>

        {!isNew && (
          <div className="mt-3 rounded-md border border-border bg-vibra-50/40 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-vibra-800">
              Anexos ({anexos.length})
            </p>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-vibra-300 bg-white px-3 py-2 text-[11.5px] font-semibold text-vibra-700 hover:bg-vibra-50">
              <Upload className="h-3.5 w-3.5" /> Enviar arquivo (máx 10MB)
              <input
                type="file"
                hidden
                onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], id as string)}
              />
            </label>
            <div className="mt-2 space-y-1">
              {anexos.map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-2 rounded-md border border-border bg-white px-2 py-1.5 text-[11px]"
                >
                  <button
                    type="button"
                    onClick={() => downloadAnexo(a)}
                    className="flex min-w-0 items-center gap-1.5 text-left"
                  >
                    <FileText className="h-3 w-3 text-vibra-700" />
                    <span className="truncate text-vibra-800 hover:underline">{a.nome}</span>
                  </button>
                  <button type="button" onClick={() => removeAnexo(a)} className="text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {anexos.length === 0 && (
                <p className="text-[10.5px] italic text-muted-foreground">Nenhum anexo.</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-[12px] font-semibold text-muted-foreground hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-bold text-white hover:bg-vibra-800 disabled:opacity-50"
          >
            {loading ? "Salvando…" : "Salvar"}
          </button>
        </div>
        <style>{`.input{width:100%;border:1px solid hsl(var(--input));background:#fff;padding:6px 8px;border-radius:6px;font-size:12.5px;outline:none;margin-bottom:8px}.input:focus{border-color:hsl(var(--vibra-600))}`}</style>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-2 block">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-vibra-800">
        {label}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
