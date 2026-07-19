import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Upload, Trash2, FileText, X, Save } from "lucide-react";
import { toast } from "sonner";
import { PicklistField } from "@/components/PicklistField";
import { deleteMicroprocessCascade } from "@/lib/deleteService";
import { useConfirm } from "@/hooks/useConfirm";

type Props = { microId: string | null; onClose: () => void };

const inputCls =
  "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15";

export function MicroprocessoDrawer({ microId, onClose }: Props) {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [isAddingTarefa, setIsAddingTarefa] = useState(false);
  const [newTarefaTitulo, setNewTarefaTitulo] = useState("");

  const { data: micro } = useQuery({
    queryKey: ["micro-full", microId],
    enabled: !!microId,
    queryFn: async () => {
      const { data, error } = await (supabase.from("microprocessos" as any) as any)
        .select("*")
        .eq("id", microId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    setDraft(micro ?? {});
  }, [micro]);

  const { data: profiles = [] } = useQuery({
    queryKey: ["micro-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? [],
  });

  const { data: tarefasMP = [] } = useQuery({
    queryKey: ["micro-tarefas", microId],
    enabled: !!microId,
    queryFn: async () =>
      (
        await (supabase.from("tarefas") as any)
          .select("id,titulo,status")
          .eq("microprocesso_id", microId)
      ).data ?? [],
  });

  const { data: anexos = [] } = useQuery({
    queryKey: ["micro-anexos", microId],
    enabled: !!microId,
    queryFn: async () =>
      (
        await (supabase.from("anexos") as any)
          .select("*")
          .eq("microprocesso_id", microId)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });

  const progresso = useMemo(() => {
    const valid = tarefasMP.filter((t: any) => !/cancel/i.test(t.status ?? ""));
    if (!valid.length) return 0;
    const sum = valid.reduce((acc: number, t: any) => {
      if (/conclu/i.test(t.status ?? "")) return acc + 100;
      if (/andamento/i.test(t.status ?? "")) return acc + 50;
      return acc;
    }, 0);
    return Math.round(sum / valid.length);
  }, [tarefasMP]);

  async function persist(patch: Record<string, any>) {
    if (!microId) return;
    const { error } = await (supabase.from("microprocessos" as any) as any)
      .update(patch)
      .eq("id", microId);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["micro-full", microId] });
  }

  function bind(field: string, opts?: { number?: boolean }) {
    return {
      value: draft[field] ?? "",
      onChange: (e: any) => setDraft((d) => ({ ...d, [field]: e.target.value })),
      onBlur: async (e: any) => {
        let v: any = e.target.value;
        if (opts?.number) v = v === "" ? null : Number(v);
        if (v === (micro as any)?.[field]) return;
        await persist({ [field]: v });
      },
      className: inputCls,
    };
  }

  async function saveAll() {
    if (!microId) return;
    const allowed = [
      "titulo",
      "descricao",
      "objetivo",
      "justificativa",
      "escopo",
      "area_responsavel",
      "status",
      "prioridade",
      "categoria",
      "responsavel_id",
      "sponsor_id",
      "lider_id",
      "data_inicio",
      "data_fim_prevista",
      "data_fim_real",
      "baseline_atual",
      "meta_futura",
      "valor_atual",
      "valor_projetado",
      "percentual_evolucao",
      "lead_time_atual",
      "lead_time_futuro",
      "volume_atual",
      "volume_futuro",
      "hc_atual",
      "hc_futuro",
      "custo_atual",
      "custo_futuro",
      "saving_previsto",
    ];
    const patch: any = {};
    for (const k of allowed) if (draft[k] !== undefined) patch[k] = draft[k];
    const { error } = await (supabase.from("microprocessos" as any) as any)
      .update(patch)
      .eq("id", microId);
    if (error) toast.error(error.message);
    else {
      toast.success("Microprocesso salvo");
      qc.invalidateQueries({ queryKey: ["micro-full", microId] });
      qc.invalidateQueries({ queryKey: ["micros-by-ini"] });
    }
  }

  async function excluirMicro() {
    if (!microId) return;
    if (
      !(await confirm(
        "Excluir microprocesso?",
        "Tem certeza que deseja excluir permanentemente este microprocesso e todas as suas tarefas vinculadas? Esta ação é irreversível!",
      ))
    )
      return;
    const success = await deleteMicroprocessCascade(microId, qc, (micro as any)?.iniciativa_id);
    if (success) {
      onClose();
    }
  }

  async function novaTarefaNoMicro(titulo: string) {
    if (!microId || !micro || !titulo.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await (supabase.from("tarefas") as any).insert({
      iniciativa_id: (micro as any).iniciativa_id,
      microprocesso_id: microId,
      titulo: titulo.trim(),
      status: "Pendente",
      created_by: user?.id,
    });
    if (error) return toast.error(error.message);
    toast.success("Tarefa criada");
    qc.invalidateQueries({ queryKey: ["micro-tarefas", microId] });
    qc.invalidateQueries({ queryKey: ["tarefas-board"] });
  }

  async function uploadFile(file: File) {
    if (!microId) return;
    if (file.size > 10 * 1024 * 1024) return toast.error("Máx 10MB");
    const path = `micro/${microId}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("anexos").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await (supabase.from("anexos") as any).insert({
      microprocesso_id: microId,
      nome: file.name,
      url: path,
      tamanho_bytes: file.size,
      mime_type: file.type,
      uploaded_by: user?.id,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Anexo enviado");
      qc.invalidateQueries({ queryKey: ["micro-anexos", microId] });
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
    qc.invalidateQueries({ queryKey: ["micro-anexos", microId] });
  }

  return (
    <Sheet open={!!microId} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-[720px] overflow-y-auto p-0 sm:max-w-[720px]"
      >
        {micro && (
          <>
            <div className="sticky top-0 z-10 border-b border-border bg-gradient-to-r from-purple-50 to-vibra-50 px-5 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-widest text-purple-700">
                    <span className="rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] text-white">
                      MICROPROCESSO
                    </span>
                    {micro.codigo}
                  </div>
                  <input
                    {...bind("titulo")}
                    className="mt-1 w-full bg-transparent text-[16px] font-bold text-vibra-800 outline-none focus:bg-white/60 rounded px-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={saveAll}
                    className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1 text-[11.5px] font-bold text-white hover:bg-vibra-800"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Salvar
                  </button>
                  <button
                    onClick={excluirMicro}
                    className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-[11.5px] font-bold text-white hover:bg-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-md p-1 text-muted-foreground hover:bg-white/60"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white">
                  <div
                    className="h-1.5 rounded-full bg-purple-600"
                    style={{ width: `${progresso}%` }}
                  />
                </div>
                <span className="text-[10.5px] font-bold text-purple-800">{progresso}%</span>
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {tarefasMP.length} tarefa(s) — progresso calculado automaticamente
              </p>
            </div>

            <div className="p-5">
              <Accordion type="multiple" defaultValue={["geral"]} className="space-y-2">
                <Item id="geral" title="Informações Gerais">
                  <Grid>
                    <Field label="Código">
                      <input
                        value={micro.codigo ?? ""}
                        readOnly
                        className={inputCls + " bg-vibra-50/60"}
                      />
                    </Field>
                    <Field label="Status">
                      <PicklistField
                        categoria="Status de Microprocesso"
                        value={draft.status}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, status: v }));
                          persist({ status: v });
                        }}
                      />
                    </Field>
                    <Field label="Prioridade">
                      <PicklistField
                        categoria="Prioridade"
                        value={draft.prioridade}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, prioridade: v }));
                          persist({ prioridade: v });
                        }}
                      />
                    </Field>
                    <Field label="Categoria">
                      <input {...bind("categoria")} />
                    </Field>
                    <Field label="Área Responsável">
                      <PicklistField
                        categoria="Área"
                        value={draft.area_responsavel}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, area_responsavel: v }));
                          persist({ area_responsavel: v });
                        }}
                      />
                    </Field>
                    <Field label="Responsável">
                      <PicklistField
                        categoria="Perfil Vinculado"
                        value={draft.responsavel_id}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, responsavel_id: v }));
                          persist({ responsavel_id: v });
                        }}
                      />
                    </Field>
                    <Field label="Líder">
                      <PicklistField
                        categoria="Líder"
                        value={draft.lider_id}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, lider_id: v }));
                          persist({ lider_id: v });
                        }}
                      />
                    </Field>
                    <Field label="Sponsor">
                      <PicklistField
                        categoria="Sponsor"
                        value={draft.sponsor_id}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, sponsor_id: v }));
                          persist({ sponsor_id: v });
                        }}
                      />
                    </Field>
                  </Grid>
                  <Grid cols={1}>
                    <Field label="Descrição">
                      <textarea rows={2} {...bind("descricao")} />
                    </Field>
                    <Field label="Objetivo">
                      <textarea rows={2} {...bind("objetivo")} />
                    </Field>
                    <Field label="Justificativa">
                      <textarea rows={2} {...bind("justificativa")} />
                    </Field>
                    <Field label="Escopo">
                      <textarea rows={2} {...bind("escopo")} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="cron" title="Cronograma">
                  <Grid>
                    <Field label="Data Início">
                      <input type="date" {...bind("data_inicio")} />
                    </Field>
                    <Field label="Data Fim Prevista">
                      <input type="date" {...bind("data_fim_prevista")} />
                    </Field>
                    <Field label="Data Fim Real">
                      <input type="date" {...bind("data_fim_real")} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="ind" title="Indicadores">
                  <Grid>
                    <Field label="Baseline Atual">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("baseline_atual", { number: true })}
                      />
                    </Field>
                    <Field label="Meta Futura">
                      <input type="number" step="0.01" {...bind("meta_futura", { number: true })} />
                    </Field>
                    <Field label="Valor Atual">
                      <input type="number" step="0.01" {...bind("valor_atual", { number: true })} />
                    </Field>
                    <Field label="Valor Projetado">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("valor_projetado", { number: true })}
                      />
                    </Field>
                    <Field label="% Evolução">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("percentual_evolucao", { number: true })}
                      />
                    </Field>
                  </Grid>
                </Item>

                <Item id="opind" title="Indicadores Operacionais">
                  <Grid>
                    <Field label="Lead Time Atual">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("lead_time_atual", { number: true })}
                      />
                    </Field>
                    <Field label="Lead Time Futuro">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("lead_time_futuro", { number: true })}
                      />
                    </Field>
                    <Field label="Volume Atual">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("volume_atual", { number: true })}
                      />
                    </Field>
                    <Field label="Volume Futuro">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("volume_futuro", { number: true })}
                      />
                    </Field>
                    <Field label="HC Atual">
                      <input type="number" step="0.01" {...bind("hc_atual", { number: true })} />
                    </Field>
                    <Field label="HC Futuro">
                      <input type="number" step="0.01" {...bind("hc_futuro", { number: true })} />
                    </Field>
                    <Field label="Custo Atual (R$)">
                      <input type="number" step="0.01" {...bind("custo_atual", { number: true })} />
                    </Field>
                    <Field label="Custo Futuro (R$)">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("custo_futuro", { number: true })}
                      />
                    </Field>
                    <Field label="Saving Previsto (R$)">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("saving_previsto", { number: true })}
                      />
                    </Field>
                  </Grid>
                </Item>

                <Item id="map" title="Mapeamento (AS IS / TO BE / SIPOC / Diagnóstico)">
                  <p className="text-[11px] text-muted-foreground">
                    Mapeamento detalhado disponível na próxima fase (Fase 3 — Mapeamento por nível).
                    Por enquanto, registre o essencial nos campos abaixo.
                  </p>
                  <Grid cols={1}>
                    <Field label="Fluxo Atual (AS IS)">
                      <textarea rows={2} {...bind("asis_fluxo")} />
                    </Field>
                    <Field label="Fluxo Futuro (TO BE)">
                      <textarea rows={2} {...bind("tobe_fluxo")} />
                    </Field>
                    <Field label="Problema (Diagnóstico)">
                      <textarea rows={2} {...bind("diag_problema")} />
                    </Field>
                    <Field label="Causa Raiz">
                      <textarea rows={2} {...bind("diag_causa_raiz")} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="tar" title={`Tarefas (${tarefasMP.length})`}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      Lista de tarefas operacionais do microprocesso.
                    </p>
                    {!isAddingTarefa ? (
                      <button
                        onClick={() => setIsAddingTarefa(true)}
                        className="inline-flex items-center gap-1 rounded-md bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800"
                      >
                        + Nova Tarefa
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAddingTarefa(false)}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                  {isAddingTarefa && (
                    <div className="mb-3 flex items-center gap-2 rounded-md border border-purple-200 bg-purple-50/50 p-2">
                      <input
                        type="text"
                        className="flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-purple-700"
                        placeholder="Título da nova tarefa..."
                        value={newTarefaTitulo}
                        onChange={(e) => setNewTarefaTitulo(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            novaTarefaNoMicro(newTarefaTitulo);
                            setNewTarefaTitulo("");
                            setIsAddingTarefa(false);
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (newTarefaTitulo.trim()) {
                            novaTarefaNoMicro(newTarefaTitulo);
                            setNewTarefaTitulo("");
                            setIsAddingTarefa(false);
                          }
                        }}
                        className="rounded bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800"
                      >
                        Adicionar
                      </button>
                    </div>
                  )}

                  {tarefasMP.length === 0 ? (
                    <p className="text-[11.5px] italic text-muted-foreground">
                      Nenhuma tarefa vinculada a este microprocesso ainda. Clique em "+ Nova
                      Tarefa".
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {tarefasMP.map((t: any) => (
                        <div
                          key={t.id}
                          className="flex items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-[12px]"
                        >
                          <span className="truncate font-semibold text-vibra-800">{t.titulo}</span>
                          <span className="rounded-full bg-vibra-50 px-1.5 py-0.5 text-[10px] font-bold text-vibra-700">
                            {t.status ?? "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Item>

                <Item id="anex" title={`Anexos (${anexos.length})`}>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-vibra-300 bg-vibra-50/40 px-3 py-3 text-[12px] font-semibold text-vibra-700 hover:bg-vibra-50">
                    <Upload className="h-4 w-4" /> Enviar arquivo (máx 10MB)
                    <input
                      type="file"
                      hidden
                      onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
                    />
                  </label>
                  <div className="mt-2 space-y-1">
                    {anexos.map((a: any) => (
                      <div
                        key={a.id}
                        className="flex items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-[12px]"
                      >
                        <button
                          onClick={() => downloadAnexo(a)}
                          className="flex min-w-0 items-center gap-2 text-left"
                        >
                          <FileText className="h-3.5 w-3.5 text-vibra-700" />
                          <span className="truncate text-vibra-800 hover:underline">{a.nome}</span>
                        </button>
                        <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
                          <span>{((a.tamanho_bytes ?? 0) / 1024).toFixed(0)} KB</span>
                          <button onClick={() => removeAnexo(a)} className="text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {anexos.length === 0 && (
                      <p className="text-[11.5px] italic text-muted-foreground">Nenhum anexo.</p>
                    )}
                  </div>
                </Item>
              </Accordion>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Item({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={id} className="rounded-lg border border-border bg-white shadow-vibra-sm">
      <AccordionTrigger className="px-3 py-2 text-[12.5px] font-bold text-vibra-800 hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="px-3 pb-3">{children}</AccordionContent>
    </AccordionItem>
  );
}
function Grid({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 | 3 }) {
  const c = cols === 1 ? "grid-cols-1" : cols === 3 ? "grid-cols-3" : "grid-cols-2";
  return <div className={`grid ${c} gap-2`}>{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-vibra-700">
        {label}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
function PersonSel({
  value,
  onChange,
  profiles,
}: {
  value: any;
  onChange: (v: string | null) => void;
  profiles: any[];
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value || null)}
      className={inputCls}
    >
      <option value="">—</option>
      {profiles.map((p) => (
        <option key={p.id} value={p.id}>
          {p.nome ?? p.email}
        </option>
      ))}
    </select>
  );
}
