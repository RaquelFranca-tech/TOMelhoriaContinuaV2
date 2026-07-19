import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, btnPrimary, btnDanger, btnGhost, inputCls } from "./_shared";
import { Plus, Check, Calendar, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PicklistField } from "@/components/PicklistField";

const TIPOS = ["Status", "Demo", "Review", "Comitê", "Go-live"];

export function AgendaTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const [open, setOpen] = useState(false);
  const [partSearch, setPartSearch] = useState("");
  const [form, setForm] = useState<any>({
    titulo: "",
    data_evento: "",
    tipo_reuniao: "Status",
    duracao_min: 60,
    notas: "",
    participantes: [],
  });

  const { data: rows = [] } = useQuery({
    queryKey: ["agenda", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("agenda")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("data_evento")
      ).data ?? [],
  });
  const { data: profiles = [] } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () =>
      (await supabase.from("profiles").select("id,nome,email").limit(200)).data ?? [],
  });
  const { data: parts = [] } = useQuery({
    queryKey: ["agenda-parts", rows.map((r: any) => r.id).join(",")],
    enabled: rows.length > 0,
    queryFn: async () =>
      (
        await supabase
          .from("agenda_participantes")
          .select("*")
          .in(
            "agenda_id",
            rows.map((r: any) => r.id),
          )
      ).data ?? [],
  });

  async function criar() {
    if (!form.titulo || !form.data_evento) return toast.error("Título e data obrigatórios");
    const { data, error } = await supabase
      .from("agenda")
      .insert({
        iniciativa_id: iniciativaId!,
        titulo: form.titulo,
        data_evento: form.data_evento,
        tipo_reuniao: form.tipo_reuniao,
        duracao_min: form.duracao_min,
        notas: form.notas,
      })
      .select()
      .single();
    if (error || !data) return toast.error(error?.message ?? "Erro");
    if (form.participantes && form.participantes.length) {
      const minutos = form.duracao_min;
      const { data: allProfs } = await supabase.from("profiles").select("id, nome");
      const payloadParts = [];
      for (const name of form.participantes) {
        const matchedProf = allProfs?.find((p) => p.nome?.toLowerCase() === name.toLowerCase());
        if (matchedProf) {
          payloadParts.push({
            agenda_id: data.id,
            profile_id: matchedProf.id,
            minutos_creditados: minutos,
          });
        } else {
          const { data: newProf } = await supabase
            .from("profiles")
            .insert({ nome: name })
            .select()
            .single();
          if (newProf) {
            payloadParts.push({
              agenda_id: data.id,
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
    toast.success("Evento criado");
    setOpen(false);
    setForm({
      titulo: "",
      data_evento: "",
      tipo_reuniao: "Status",
      duracao_min: 60,
      notas: "",
      participantes: [],
    });
    qc.invalidateQueries({ queryKey: ["agenda"] });
    qc.invalidateQueries({ queryKey: ["agenda-parts"] });
  }
  async function concluir(id: string) {
    await supabase
      .from("agenda")
      .update({ concluida: true, concluida_em: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["agenda"] });
  }
  async function remove(id: string) {
    await supabase.from("agenda").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["agenda"] });
  }

  const futuros = rows.filter((r: any) => !r.concluida);
  const concluidos = rows.filter((r: any) => r.concluida);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={() => setOpen(true)}>
          <Plus className="mr-1 inline h-3.5 w-3.5" />
          Novo Evento
        </button>
      </div>

      {open && (
        <div className="rounded-xl border border-vibra-300 bg-vibra-50/40 p-4 shadow-vibra-sm">
          <p className="mb-2 text-[12px] font-bold text-vibra-800">Novo Evento</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              className={inputCls}
              placeholder="Título"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />
            <input
              className={inputCls}
              type="datetime-local"
              value={form.data_evento}
              onChange={(e) => setForm({ ...form, data_evento: e.target.value })}
            />
            <select
              className={inputCls}
              value={form.tipo_reuniao}
              onChange={(e) => setForm({ ...form, tipo_reuniao: e.target.value })}
            >
              {TIPOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <input
              className={inputCls}
              type="number"
              placeholder="Duração (min)"
              value={form.duracao_min}
              onChange={(e) => setForm({ ...form, duracao_min: Number(e.target.value) })}
            />
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                Selecionar Participantes ({form.participantes?.length || 0} selecionado(s))
              </label>
              <PicklistField
                multi
                categoria="Participantes"
                value={form.participantes || []}
                onChange={(v: string[]) => setForm({ ...form, participantes: v })}
                placeholder="Selecione os participantes (pesquise e crie novos inline)..."
              />
            </div>
            <textarea
              className={inputCls + " sm:col-span-2 min-h-[60px]"}
              placeholder="Notas / pauta"
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
            />
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <button className={btnGhost} onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button className={btnPrimary} onClick={criar}>
              Criar
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <p className="mb-3 flex items-center gap-2 text-[13px] font-bold text-vibra-800">
            <Calendar className="h-4 w-4" />
            📌 Próximos Eventos ({futuros.length})
          </p>
          {futuros.map((r: any) => {
            const ps = parts.filter((p: any) => p.agenda_id === r.id);
            return (
              <div
                key={r.id}
                className="mb-3 rounded-lg border border-border p-3 text-[12px] bg-white shadow-sm hover:shadow transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-vibra-800 text-[13px]">● {r.titulo}</p>
                    <p className="text-muted-foreground mt-0.5">
                      {new Date(r.data_evento).toLocaleString("pt-BR")} •{" "}
                      <span className="font-semibold text-vibra-700">{r.duracao_min}min</span> •{" "}
                      {r.tipo_reuniao}
                    </p>
                    {r.notas && (
                      <p className="text-[11.5px] text-muted-foreground bg-slate-50 border border-slate-100 rounded p-1.5 mt-1.5 italic">
                        {r.notas}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      className={`${btnGhost} py-1 px-1.5`}
                      onClick={() => concluir(r.id)}
                      title="Concluir Evento"
                    >
                      <Check className="mr-0.5 inline h-3 w-3 text-emerald-600 stroke-[3]" />
                      Concluir
                    </button>
                    <button
                      className={`${btnDanger} p-1`}
                      onClick={() => remove(r.id)}
                      title="Excluir Evento"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <InlineParticipants
                  agendaId={r.id}
                  duracaoMin={r.duracao_min}
                  allProfiles={profiles}
                  currentParts={ps}
                  qc={qc}
                />
              </div>
            );
          })}
          {futuros.length === 0 && (
            <p className="text-[12px] text-muted-foreground italic">Nenhum evento futuro.</p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <p className="mb-3 text-[13px] font-bold text-vibra-800">
            ✅ Concluídos ({concluidos.length})
          </p>
          {concluidos.map((r: any) => {
            const ps = parts.filter((p: any) => p.agenda_id === r.id);
            return (
              <div
                key={r.id}
                className="mb-3 rounded-lg border border-border p-3 text-[12px] bg-slate-50/50"
              >
                <p className="font-bold text-emerald-700 text-[13px]">● {r.titulo}</p>
                <p className="text-muted-foreground mt-0.5">
                  {new Date(r.data_evento).toLocaleString("pt-BR")} •{" "}
                  <span className="font-semibold">{r.duracao_min}min</span> • {r.tipo_reuniao}
                </p>
                {r.notas && (
                  <p className="text-[11.5px] text-muted-foreground bg-white border border-slate-100 rounded p-1.5 mt-1.5 italic">
                    {r.notas}
                  </p>
                )}

                <InlineParticipants
                  agendaId={r.id}
                  duracaoMin={r.duracao_min}
                  allProfiles={profiles}
                  currentParts={ps}
                  qc={qc}
                />
              </div>
            );
          })}
          {concluidos.length === 0 && (
            <p className="text-[12px] text-muted-foreground italic">Nenhum evento concluído.</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface InlineParticipantsProps {
  agendaId: string;
  duracaoMin: number;
  allProfiles: any[];
  currentParts: any[];
  qc: any;
}

function InlineParticipants({
  agendaId,
  duracaoMin,
  allProfiles,
  currentParts,
  qc,
}: InlineParticipantsProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  const currentProfileIds = currentParts.map((p) => p.profile_id);

  async function handleToggleParticipant(profileId: string, isSelected: boolean) {
    if (isSelected) {
      const { error } = await supabase
        .from("agenda_participantes")
        .delete()
        .eq("agenda_id", agendaId)
        .eq("profile_id", profileId);

      if (error) {
        toast.error("Erro ao remover participante: " + error.message);
      } else {
        toast.success("Participante removido");
        qc.invalidateQueries({ queryKey: ["agenda-parts"] });
      }
    } else {
      const { error } = await supabase.from("agenda_participantes").insert({
        agenda_id: agendaId,
        profile_id: profileId,
        minutos_creditados: duracaoMin,
      });

      if (error) {
        toast.error("Erro ao adicionar participante: " + error.message);
      } else {
        toast.success("Participante adicionado com sucesso!");
        qc.invalidateQueries({ queryKey: ["agenda-parts"] });
      }
    }
  }

  return (
    <div className="mt-3 border-t border-dashed border-border pt-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10.5px] font-extrabold uppercase tracking-wider text-muted-foreground">
          Participantes ({currentParts.length})
        </p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="rounded px-1.5 py-0.5 text-[10.5px] font-semibold text-vibra-700 bg-vibra-50 hover:bg-vibra-100 transition border border-vibra-200"
        >
          {showAdd ? "Fechar" : "+ Vincular (inline)"}
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {currentParts.map((part) => {
          const prof = allProfiles.find((p) => p.id === part.profile_id);
          const name = prof ? prof.nome || prof.email : "Usuário";
          return (
            <span
              key={part.id || part.profile_id}
              className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700 border border-slate-200 shadow-sm"
            >
              <span className="max-w-[120px] truncate">{name}</span>
              <span className="text-[9px] text-slate-500 font-mono">
                ({part.minutos_creditados ?? duracaoMin} min)
              </span>
              <button
                onClick={() => handleToggleParticipant(part.profile_id, true)}
                className="ml-0.5 shrink-0 rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-red-600 transition"
                title="Remover"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          );
        })}
        {currentParts.length === 0 && (
          <p className="text-[11px] italic text-muted-foreground">Nenhum participante vinculado.</p>
        )}
      </div>

      {showAdd && (
        <div className="mt-2 rounded-lg border border-vibra-200 bg-slate-50 p-2 shadow-inner">
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="🔍 Buscar participante por nome..."
              className="w-full rounded border border-neutral-300 bg-white pl-7.5 pr-2 py-1 text-[11px] outline-none focus:border-vibra-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="max-h-36 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1.5 pr-1">
            {allProfiles
              .filter((p) => {
                const term = search.toLowerCase();
                return (p.nome || p.email || "").toLowerCase().includes(term);
              })
              .map((p) => {
                const isSelected = currentProfileIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleToggleParticipant(p.id, isSelected)}
                    className={`flex items-center justify-between rounded border px-2 py-1 text-left text-[11px] transition ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-800 font-medium border-emerald-300"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-neutral-200"
                    }`}
                  >
                    <span className="truncate">{p.nome || p.email || "Sem Nome"}</span>
                    <span className="text-[9px] font-mono shrink-0">
                      {isSelected ? "✓ Vinculado" : `+ ${duracaoMin} min`}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
