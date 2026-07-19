import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { colorForId, prazoStatus, prazoBadge } from "@/lib/vibraColors";
import {
  Paperclip,
  Upload,
  Trash2,
  FileText,
  X,
  Save,
  Plus,
  ChevronRight,
  Workflow,
} from "lucide-react";
import { PresenceAvatars } from "@/components/PresenceAvatars";
import { MicroprocessoDrawer } from "@/components/MicroprocessoDrawer";
import { converterIniciativaParaMicroprocesso } from "@/lib/iniciativas.functions";
import { toast } from "sonner";
import { PicklistField } from "@/components/PicklistField";
import {
  deleteInitiativeCascade,
  deleteMicroprocessCascade,
  deleteTaskSimple,
} from "@/lib/deleteService";
import { CalculatedField } from "@/components/CalculatedField";
import { useConfirm } from "@/hooks/useConfirm";

type Props = { initiativeId: string | null; onClose: () => void };

const inputCls =
  "w-full rounded-md border border-input bg-white px-2 py-1.5 text-[12.5px] outline-none focus:border-vibra-600 focus:ring-2 focus:ring-vibra-600/15";

export function InitiativeDrawer({ initiativeId, onClose }: Props) {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const converterIniciativa = useServerFn(converterIniciativaParaMicroprocesso);
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [openMicroId, setOpenMicroId] = useState<string | null>(null);
  const [convOpen, setConvOpen] = useState(false);
  const [convQuery, setConvQuery] = useState("");
  const [convList, setConvList] = useState<any[]>([]);
  const [convDestino, setConvDestino] = useState<any | null>(null);
  const [converting, setConverting] = useState(false);

  // States for inline creation (avoiding prompt which fails in iframes)
  const [isAddingAcao, setIsAddingAcao] = useState(false);
  const [newAcaoTitulo, setNewAcaoTitulo] = useState("");
  const [isAddingMicro, setIsAddingMicro] = useState(false);
  const [newMicroTitulo, setNewMicroTitulo] = useState("");

  const { data: ini } = useQuery({
    queryKey: ["ini-full", initiativeId],
    enabled: !!initiativeId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("iniciativas")
        .select("*")
        .eq("id", initiativeId!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    setDraft(ini ?? {});
  }, [ini]);

  const { data: processos = [] } = useQuery({
    queryKey: ["drawer-projetos"],
    queryFn: async () =>
      (await supabase.from("projetos").select("id,nome").is("deleted_at", null)).data ?? [],
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["drawer-profiles"],
    queryFn: async () => (await supabase.from("profiles").select("id,nome,email")).data ?? [],
  });

  const { data: acoes = [] } = useQuery({
    queryKey: ["drawer-acoes", initiativeId],
    enabled: !!initiativeId,
    queryFn: async () =>
      (await supabase.from("tarefas").select("*").eq("iniciativa_id", initiativeId!)).data ?? [],
  });

  const { data: riscos = [] } = useQuery({
    queryKey: ["drawer-riscos", initiativeId],
    enabled: !!initiativeId,
    queryFn: async () =>
      (
        await supabase
          .from("riscos")
          .select("nivel,classificacao")
          .eq("iniciativa_id", initiativeId!)
      ).data ?? [],
  });

  const { data: kaizens = [] } = useQuery({
    queryKey: ["drawer-kaizen", initiativeId],
    enabled: !!initiativeId,
    queryFn: async () =>
      (await supabase.from("kaizen").select("id").eq("iniciativa_id", initiativeId!)).data ?? [],
  });

  const { data: anexos = [] } = useQuery({
    queryKey: ["drawer-anexos", initiativeId],
    enabled: !!initiativeId,
    queryFn: async () =>
      (
        await supabase
          .from("anexos")
          .select("*")
          .eq("iniciativa_id", initiativeId!)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });

  const { data: micros = [] } = useQuery({
    queryKey: ["micros-by-ini", initiativeId],
    enabled: !!initiativeId,
    queryFn: async () =>
      (
        await (supabase.from("microprocessos" as any) as any)
          .select("id,codigo,titulo,status,prioridade,percentual_avanco,data_fim_prevista")
          .eq("iniciativa_id", initiativeId!)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });

  async function criarMicroprocesso(titulo: string) {
    if (!initiativeId || !titulo.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await (supabase.from("microprocessos" as any) as any)
      .insert({
        iniciativa_id: initiativeId,
        titulo: titulo.trim(),
        status: "Não iniciado",
        created_by: user?.id,
      })
      .select("id")
      .maybeSingle();
    if (error) return toast.error(error.message);
    toast.success("Microprocesso criado");
    qc.invalidateQueries({ queryKey: ["micros-by-ini", initiativeId] });
    if (data?.id) setOpenMicroId(data.id);
  }

  async function criarAcao(titulo: string) {
    if (!initiativeId || !titulo.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("tarefas").insert({
      iniciativa_id: initiativeId,
      titulo: titulo.trim(),
      status: "Pendente",
      created_by: user?.id,
    });
    if (error) return toast.error(error.message);
    toast.success("Ação criada com sucesso");
    qc.invalidateQueries();
  }

  async function deletarAcao(id: string) {
    if (
      !(await confirm("Excluir ação?", "Tem certeza que deseja excluir esta ação permanentemente?"))
    )
      return;
    const success = await deleteTaskSimple(id, qc);
    if (success) {
      qc.invalidateQueries();
    }
  }

  async function abrirConverter() {
    if (!initiativeId || !ini) return;
    const { data: candidatas, error } = await supabase
      .from("iniciativas")
      .select("id,codigo,titulo")
      .neq("id", initiativeId)
      .is("deleted_at", null)
      .order("titulo")
      .limit(2000);
    if (error) return toast.error(error.message);
    const lista = candidatas ?? [];
    if (lista.length === 0)
      return toast.error("Não há outra iniciativa para receber este microprocesso.");
    setConvList(lista);
    setConvDestino(null);
    setConvQuery("");
    setConvOpen(true);
  }

  async function confirmarConversao(destino?: { id: string; titulo: string }) {
    const alvo = destino ?? convDestino;
    if (!alvo) return toast.error("Selecione uma iniciativa de destino.");
    if (!initiativeId || !ini || converting) return;
    setConverting(true);
    try {
      await converterIniciativa({
        data: { iniciativaId: initiativeId, destinoIniciativaId: alvo.id },
      });

      toast.success("Convertido em microprocesso");
      setConvOpen(false);
      setConvDestino(null);
      qc.invalidateQueries();
      onClose();
    } catch (err: any) {
      toast.error(err?.message ?? "Erro ao converter iniciativa.");
    } finally {
      setConverting(false);
    }
  }

  const score = useMemo(() => {
    const i = draft.impacto_negocio ?? 0,
      c = draft.impacto_cliente ?? 0,
      f = draft.impacto_financeiro ?? 0;
    const e = draft.esforco ?? 0,
      x = draft.complexidade ?? 0;
    const num = Number(i) + Number(c) + Number(f);
    const den = Number(e) + Number(x);
    if (!den) return num ? Number(num).toFixed(2) : "0";
    return ((num / den) * 10).toFixed(2);
  }, [
    draft.impacto_negocio,
    draft.impacto_cliente,
    draft.impacto_financeiro,
    draft.esforco,
    draft.complexidade,
  ]);

  const roi = useMemo(() => {
    const g = Number(draft.saving_realizado ?? draft.saving_previsto ?? 0);
    const inv = Number(draft.custo_implementacao ?? 0);
    if (!inv) return "—";
    return (((g - inv) / inv) * 100).toFixed(1) + "%";
  }, [draft.saving_realizado, draft.saving_previsto, draft.custo_implementacao]);

  const numCrit = riscos.filter((r: any) => (r.nivel ?? r.classificacao) === "Crítico").length;
  const numAlto = riscos.filter((r: any) => (r.nivel ?? r.classificacao) === "Alto").length;
  const numBaixo = riscos.filter((r: any) => (r.nivel ?? r.classificacao) === "Baixo").length;
  const acoesAbertas = acoes.filter(
    (a: any) => (a.status ?? "") !== "Concluída" && (a.status ?? "") !== "Cancelada",
  ).length;

  async function persist(patch: Record<string, any>) {
    if (!initiativeId) return;
    const { error } = await (supabase.from("iniciativas") as any)
      .update(patch)
      .eq("id", initiativeId);
    if (error) toast.error(error.message);
    else {
      qc.invalidateQueries({ queryKey: ["ini-full", initiativeId] });
      qc.invalidateQueries({ queryKey: ["kanban-ini"] });
    }
  }

  async function excluirIniciativa() {
    if (!initiativeId) return;
    if (
      !(await confirm(
        "Excluir iniciativa?",
        `Deseja realmente EXCLUIR PERMANENTEMENTE a iniciativa "${draft.titulo ?? ini?.titulo ?? ""}" e todas as suas tarefas, microprocessos e anexos vinculados? Esta ação é irreversível!`,
      ))
    )
      return;
    const success = await deleteInitiativeCascade(initiativeId, qc);
    if (success) {
      onClose();
    }
  }

  function bind(field: string, opts?: { number?: boolean; date?: boolean }) {
    return {
      value: draft[field] ?? "",
      onChange: (e: any) => setDraft((d) => ({ ...d, [field]: e.target.value })),
      onBlur: async (e: any) => {
        let v: any = e.target.value;
        if (opts?.number) v = v === "" ? null : Number(v);
        if (opts?.date) v = v === "" ? null : v;
        if (v === (ini as any)?.[field]) return;
        await persist({ [field]: v });
      },
      className: inputCls,
    };
  }

  async function saveAll() {
    if (!initiativeId) return;
    const allowed = [
      "titulo",
      "descricao",
      "as_is",
      "to_be",
      "solucao_proposta",
      "tipo_melhoria",
      "status",
      "prioridade",
      "impacto_negocio",
      "impacto_cliente",
      "impacto_financeiro",
      "esforco",
      "complexidade",
      "lider_id",
      "sponsor_id",
      "analista_id",
      "responsavel_id",
      "percentual_avanco",
      "data_implantacao",
      "data_inicio",
      "data_inicio_real",
      "data_fim_prevista",
      "data_fim_real",
      "hc_atual",
      "fte_participacao",
      "hc_estimado",
      "hc_alcancado",
      "hc_liberado",
      "saving_previsto",
      "saving_realizado",
      "custo_implementacao",
      "impactos_qualitativos",
      "memoria_roi",
      "impedimento",
      "decisoes_tomadas",
      "projeto_id",
      "observacoes",
    ];
    const patch: any = {};
    for (const k of allowed) if (draft[k] !== undefined) patch[k] = draft[k];
    const { error } = await (supabase.from("iniciativas") as any)
      .update(patch)
      .eq("id", initiativeId);
    if (error) toast.error(error.message);
    else {
      toast.success("Iniciativa salva");
      qc.invalidateQueries({ queryKey: ["ini-full", initiativeId] });
    }
  }

  async function uploadFile(file: File) {
    if (!initiativeId) return;
    if (file.size > 10 * 1024 * 1024) return toast.error("Máx 10MB");
    const path = `${initiativeId}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("anexos").upload(path, file);
    if (upErr) return toast.error(upErr.message);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("anexos").insert({
      iniciativa_id: initiativeId,
      nome: file.name,
      url: path,
      tamanho_bytes: file.size,
      mime_type: file.type,
      uploaded_by: user?.id,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Anexo enviado");
      qc.invalidateQueries({ queryKey: ["drawer-anexos", initiativeId] });
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
    qc.invalidateQueries({ queryKey: ["drawer-anexos", initiativeId] });
  }

  const procNome = processos.find((p: any) => p.id === draft.projeto_id)?.nome ?? "—";
  const ps = prazoStatus(draft.data_fim_prevista, draft.status);
  const badge = prazoBadge(ps);

  return (
    <Sheet modal={false} open={!!initiativeId} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-[760px] overflow-y-auto p-0 sm:max-w-[760px]"
      >
        {ini && (
          <>
            <div className="sticky top-0 z-10 border-b border-border bg-vibra-50 px-5 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-widest text-vibra-700">
                    <span
                      className="h-2 w-6 rounded"
                      style={{ background: colorForId(draft.projeto_id) }}
                    />
                    {procNome} · {ini.codigo}
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.5 text-[9.5px] font-bold ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <input
                    {...bind("titulo")}
                    className="mt-1 w-full bg-transparent text-[16px] font-bold text-vibra-800 outline-none focus:bg-white/60 rounded px-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <PresenceAvatars initiativeId={initiativeId} />
                  <button
                    onClick={abrirConverter}
                    title="Converter em microprocesso de outra iniciativa"
                    className="inline-flex items-center gap-1 rounded-md border border-purple-300 bg-white px-2.5 py-1 text-[11.5px] font-bold text-purple-700 hover:bg-purple-50"
                  >
                    <Workflow className="h-3.5 w-3.5" />
                    Converter em Microprocesso
                  </button>
                  <button
                    onClick={saveAll}
                    className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1 text-[11.5px] font-bold text-white hover:bg-vibra-800"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Salvar
                  </button>
                  <button
                    onClick={excluirIniciativa}
                    title="Excluir iniciativa permanentemente"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[11.5px] font-extrabold text-red-600 hover:bg-red-100 hover:border-red-300 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
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
              <div className="mt-2 h-1.5 rounded-full bg-white">
                <div
                  className="h-1.5 rounded-full bg-vibra-600"
                  style={{ width: `${Math.min(100, Number(draft.percentual_avanco ?? 0))}%` }}
                />
              </div>
            </div>

            {convOpen && (
              <div className="border-b border-purple-200 bg-purple-50/70 px-5 py-4">
                <div className="rounded-lg border border-purple-200 bg-white p-3 shadow-vibra-sm">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-[13px] font-bold text-vibra-800">
                      Selecionar iniciativa de destino
                    </h3>
                    <button
                      type="button"
                      onClick={() => setConvOpen(false)}
                      className="rounded p-1 text-muted-foreground hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                    <div className="space-y-2">
                      <input
                        value={convQuery}
                        onChange={(e) => setConvQuery(e.target.value)}
                        placeholder="Buscar por código ou título..."
                        className={inputCls}
                      />
                      <select
                        value={convDestino?.id ?? ""}
                        onChange={(e) =>
                          setConvDestino(
                            convList.find((it: any) => it.id === e.target.value) ?? null,
                          )
                        }
                        className={inputCls}
                      >
                        <option value="">Selecione uma iniciativa...</option>
                        {convList
                          .filter((it: any) => {
                            const q = convQuery.toLowerCase().trim();
                            if (!q) return true;
                            return (
                              (it.titulo ?? "").toLowerCase().includes(q) ||
                              (it.codigo ?? "").toLowerCase().includes(q)
                            );
                          })
                          .map((it: any) => (
                            <option key={it.id} value={it.id}>
                              {it.codigo ?? "—"} · {it.titulo}
                            </option>
                          ))}
                      </select>
                      <p className="text-[11px] text-muted-foreground">
                        {convList.length} iniciativas disponíveis
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={!convDestino || converting}
                      onClick={() => confirmarConversao()}
                      className="h-9 self-end rounded-md bg-vibra-700 px-3 text-[11.5px] font-bold text-white hover:bg-vibra-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {converting ? "Convertendo..." : "Confirmar conversão"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="p-5">
              <Accordion type="multiple" defaultValue={["identificacao"]} className="space-y-2">
                {/* Identificação */}
                <Item id="identificacao" title="Identificação">
                  <Grid>
                    <Field label="ID / Código">
                      <input
                        value={ini.codigo ?? ""}
                        readOnly
                        className={inputCls + " bg-vibra-50/60"}
                      />
                    </Field>
                    <Field label="Nome">
                      <input {...bind("titulo")} />
                    </Field>
                    <Field label="Status">
                      <PicklistField
                        categoria="Status da Iniciativa"
                        value={draft.status}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, status: v }));
                          persist({ status: v });
                        }}
                      />
                    </Field>
                    <Field label="Priorização">
                      <PicklistField
                        categoria="Prioridade"
                        value={draft.prioridade}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, prioridade: v }));
                          persist({ prioridade: v });
                        }}
                      />
                    </Field>
                    <Field label="Tipo Melhoria">
                      <PicklistField
                        categoria="Tipo de Melhoria"
                        value={draft.tipo_melhoria}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, tipo_melhoria: v }));
                          persist({ tipo_melhoria: v });
                        }}
                      />
                    </Field>
                    <Field label="Esforço (1-5)">
                      <input type="number" min={1} max={5} {...bind("esforco", { number: true })} />
                    </Field>
                    <Field label="Impacto Negócio (1-5)">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        {...bind("impacto_negocio", { number: true })}
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
                    <Field label="Analista">
                      <PicklistField
                        categoria="Analista"
                        value={draft.analista_id}
                        onChange={(v) => {
                          setDraft((d) => ({ ...d, analista_id: v }));
                          persist({ analista_id: v });
                        }}
                      />
                    </Field>
                    <Field label="% Avanço">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        {...bind("percentual_avanco", { number: true })}
                      />
                    </Field>
                    <Field label="Data Implantação">
                      <input
                        type="date"
                        value={draft.data_implantacao ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, data_implantacao: e.target.value }))
                        }
                        onBlur={(e) => persist({ data_implantacao: e.target.value || null })}
                        className={inputCls}
                      />
                    </Field>
                  </Grid>
                </Item>

                <Item id="detalhamento" title="Detalhamento">
                  <Grid cols={1}>
                    <Field label="AS IS">
                      <textarea rows={3} {...bind("as_is")} />
                    </Field>
                    <Field label="TO BE">
                      <textarea rows={3} {...bind("to_be")} />
                    </Field>
                    <Field label="Solução Proposta">
                      <textarea rows={3} {...bind("solucao_proposta")} />
                    </Field>
                    <Field label="Tipo da Melhoria">
                      <input {...bind("tipo_melhoria")} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="matriz" title="Matriz de Priorização">
                  <Grid>
                    <Field label="Impacto Negócio (1-5)">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        {...bind("impacto_negocio", { number: true })}
                      />
                    </Field>
                    <Field label="Impacto Cliente (1-5)">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        {...bind("impacto_cliente", { number: true })}
                      />
                    </Field>
                    <Field label="Impacto Financeiro (1-5)">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        {...bind("impacto_financeiro", { number: true })}
                      />
                    </Field>
                    <Field label="Esforço (1-5)">
                      <input type="number" min={1} max={5} {...bind("esforco", { number: true })} />
                    </Field>
                    <Field label="Complexidade (1-5)">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        {...bind("complexidade", { number: true })}
                      />
                    </Field>
                    <CalculatedField
                      label="Score Inteligente"
                      value={score}
                      formulaName="Score de Matriz ICE"
                      expression="(Impacto Negócio + Impacto Cliente + Impacto Financeiro) / (Esforço + Complexidade) * 10"
                      description="Métrica corporativa de priorização que pondera a soma de todos os impactos mapeados contra o esforço e a complexidade técnica informados para esta iniciativa."
                    />
                  </Grid>
                </Item>

                <Item id="prazos" title="Prazos (Previsto × Real)">
                  <Grid>
                    <Field label="Data Prevista de Início">
                      <input type="date" {...bind("data_inicio", { date: true })} />
                    </Field>
                    <Field label="Data Prevista de Término">
                      <input type="date" {...bind("data_fim_prevista", { date: true })} />
                    </Field>
                    <Field label="Data de Início (real)">
                      <input
                        type="date"
                        value={draft.data_inicio_real ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, data_inicio_real: e.target.value }))
                        }
                        onBlur={(e) => persist({ data_inicio_real: e.target.value || null })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Data Final (real)">
                      <input type="date" {...bind("data_fim_real", { date: true })} />
                    </Field>
                  </Grid>
                  <DateDeltaSummary
                    inicioPrev={draft.data_inicio}
                    inicioReal={draft.data_inicio_real}
                    fimPrev={draft.data_fim_prevista}
                    fimReal={draft.data_fim_real}
                  />
                </Item>

                <Item id="hc" title="Métricas HC (FTE)">
                  <Grid>
                    <Field label="HC Atual">
                      <input type="number" step="0.01" {...bind("hc_atual", { number: true })} />
                    </Field>
                    <Field label="% Participação">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("fte_participacao", { number: true })}
                      />
                    </Field>
                    <Field label="HC Estimado">
                      <input type="number" step="0.01" {...bind("hc_estimado", { number: true })} />
                    </Field>
                    <Field label="HC Alcançado">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("hc_alcancado", { number: true })}
                      />
                    </Field>
                    <Field label="HC Liberado">
                      <input type="number" step="0.01" {...bind("hc_liberado", { number: true })} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="fin" title="Impactos Financeiros">
                  <Grid>
                    <Field label="Saving Previsto (R$)">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("saving_previsto", { number: true })}
                      />
                    </Field>
                    <Field label="Saving Realizado (R$)">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("saving_realizado", { number: true })}
                      />
                    </Field>
                    <Field label="Custo Implementação (R$)">
                      <input
                        type="number"
                        step="0.01"
                        {...bind("custo_implementacao", { number: true })}
                      />
                    </Field>
                    <CalculatedField
                      label="ROI Realizado"
                      value={roi}
                      formulaName="Retorno sobre Investimento"
                      expression="((Saving - Custo Implementação) / Custo Implementação) * 100"
                      description="Retorno percentual obtido com base no saving gerado (realizado ou previsto na falta do realizado) deduzido do custo total incorrido para implantação da melhoria."
                    />
                  </Grid>
                  <Grid cols={1}>
                    <Field label="Impactos Qualitativos">
                      <textarea rows={2} {...bind("impactos_qualitativos")} />
                    </Field>
                    <Field label="Memória de Cálculo ROI">
                      <textarea rows={2} {...bind("memoria_roi")} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="acoes" title={`Tarefas (${acoes.length} · ${acoesAbertas} abertas)`}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      Tarefas operacionais vinculadas diretamente a esta iniciativa.
                    </p>
                    {!isAddingAcao ? (
                      <button
                        onClick={() => setIsAddingAcao(true)}
                        className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-vibra-800"
                      >
                        <Plus className="h-3 w-3" /> Nova Tarefa
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAddingAcao(false)}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                  {isAddingAcao && (
                    <div className="mb-3 flex items-center gap-2 rounded-md border border-vibra-200 bg-vibra-50/50 p-2">
                      <input
                        type="text"
                        className="flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-vibra-700"
                        placeholder="Título da nova tarefa..."
                        value={newAcaoTitulo}
                        onChange={(e) => setNewAcaoTitulo(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            criarAcao(newAcaoTitulo);
                            setNewAcaoTitulo("");
                            setIsAddingAcao(false);
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (newAcaoTitulo.trim()) {
                            criarAcao(newAcaoTitulo);
                            setNewAcaoTitulo("");
                            setIsAddingAcao(false);
                          }
                        }}
                        className="rounded bg-vibra-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-vibra-800"
                      >
                        Adicionar
                      </button>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    {acoes.length === 0 && (
                      <p className="text-[11.5px] italic text-muted-foreground">
                        Nenhuma tarefa cadastrada.
                      </p>
                    )}
                    {acoes.map((a: any) => {
                      const resp = a.responsavel_id ?? "—";
                      return (
                        <div
                          key={a.id}
                          className="flex items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-[12px]"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate font-semibold text-vibra-800">
                                {a.titulo}
                              </span>
                              <span className="rounded-full bg-vibra-50 px-1.5 py-0.5 text-[10px] font-bold text-vibra-700">
                                {a.status ?? "—"}
                              </span>
                            </div>
                            <p className="text-[10.5px] text-muted-foreground mt-0.5">
                              Resp.: {resp} · Gerência: {a.gerencia ?? "—"} · Diretoria:{" "}
                              {a.diretoria ?? "—"}
                            </p>
                          </div>
                          <button
                            onClick={() => deletarAcao(a.id)}
                            title="Excluir tarefa"
                            className="rounded p-1 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </Item>

                <Item id="micros" title={`Microprocessos (${micros.length})`}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      Camada entre Iniciativa e Tarefa. Cada microprocesso tem mapeamento,
                      indicadores e tarefas próprias.
                    </p>
                    {!isAddingMicro ? (
                      <button
                        onClick={() => setIsAddingMicro(true)}
                        className="inline-flex items-center gap-1 rounded-md bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800"
                      >
                        <Plus className="h-3 w-3" /> Novo Microprocesso
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAddingMicro(false)}
                        className="inline-flex items-center gap-1 rounded-md bg-gray-200 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-300"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                  {isAddingMicro && (
                    <div className="mb-3 flex items-center gap-2 rounded-md border border-purple-200 bg-purple-50/50 p-2">
                      <input
                        type="text"
                        className="flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-purple-700"
                        placeholder="Nome do novo microprocesso..."
                        value={newMicroTitulo}
                        onChange={(e) => setNewMicroTitulo(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            criarMicroprocesso(newMicroTitulo);
                            setNewMicroTitulo("");
                            setIsAddingMicro(false);
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          if (newMicroTitulo.trim()) {
                            criarMicroprocesso(newMicroTitulo);
                            setNewMicroTitulo("");
                            setIsAddingMicro(false);
                          }
                        }}
                        className="rounded bg-purple-700 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-800"
                      >
                        Adicionar
                      </button>
                    </div>
                  )}
                  {micros.length === 0 ? (
                    <p className="text-[11.5px] italic text-muted-foreground">
                      Nenhum microprocesso cadastrado.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {micros.map((m: any) => (
                        <div
                          key={m.id}
                          className="group flex w-full items-center justify-between gap-2 rounded-md border border-border bg-white px-3 py-2 text-left text-[12px] hover:border-purple-400 hover:bg-purple-50/40"
                        >
                          <button
                            onClick={() => setOpenMicroId(m.id)}
                            className="min-w-0 flex flex-1 items-center gap-2 text-left"
                          >
                            <Workflow className="h-3.5 w-3.5 text-purple-700 shrink-0" />
                            <div className="min-w-0">
                              <p className="truncate font-bold text-vibra-800">{m.titulo}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {m.codigo} · {m.status ?? "—"} · {m.prioridade ?? "—"}
                              </p>
                            </div>
                          </button>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-muted">
                              <div
                                className="h-1.5 rounded-full bg-purple-600"
                                style={{
                                  width: `${Math.min(100, Number(m.percentual_avanco ?? 0))}%`,
                                }}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-purple-800 w-8 text-right">
                              {Math.round(Number(m.percentual_avanco ?? 0))}%
                            </span>
                            <button
                              title="Editar"
                              onClick={() => setOpenMicroId(m.id)}
                              className="rounded p-1 text-purple-700 hover:bg-purple-100"
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                            <button
                              title="Excluir"
                              onClick={async () => {
                                if (
                                  !(await confirm(
                                    "Excluir microprocesso?",
                                    `Deseja excluir permanentemente o microprocesso "${m.titulo}" e todas as suas tarefas vinculadas? Esta ação é irreversível!`,
                                  ))
                                )
                                  return;
                                await deleteMicroprocessCascade(m.id, qc, initiativeId);
                              }}
                              className="rounded p-1 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Item>

                <Item id="obs" title="Observações">
                  <Grid>
                    <Field label="Riscos Críticos">
                      <input
                        value={numCrit}
                        readOnly
                        className={inputCls + " bg-red-50 font-bold"}
                      />
                    </Field>
                    <Field label="Riscos Altos">
                      <input
                        value={numAlto}
                        readOnly
                        className={inputCls + " bg-orange-50 font-bold"}
                      />
                    </Field>
                    <Field label="Riscos Baixos">
                      <input
                        value={numBaixo}
                        readOnly
                        className={inputCls + " bg-green-50 font-bold"}
                      />
                    </Field>
                    <Field label="Nº Kaizens">
                      <input
                        value={kaizens.length}
                        readOnly
                        className={inputCls + " bg-vibra-50 font-bold"}
                      />
                    </Field>
                  </Grid>
                  <Grid cols={1}>
                    <Field label="Observações">
                      <textarea
                        rows={3}
                        {...bind("observacoes")}
                        placeholder="Anotações, comentários ou observações gerais sobre esta iniciativa..."
                      />
                    </Field>
                    <Field label="Impedimento">
                      <textarea rows={2} {...bind("impedimento")} />
                    </Field>
                    <Field label="Retorno Esperado">
                      <textarea
                        rows={2}
                        value={draft.retorno_esperado ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, retorno_esperado: e.target.value }))
                        }
                        onBlur={(e) => persist({ retorno_esperado: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Decisões Tomadas">
                      <textarea rows={2} {...bind("decisoes_tomadas")} />
                    </Field>
                  </Grid>
                </Item>

                <Item id="map" title="Mapeamento">
                  <Grid>
                    <Field label="% Andamento">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        {...bind("percentual_avanco", { number: true })}
                      />
                    </Field>
                  </Grid>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Use a aba <strong>Evolução</strong> para visão consolidada de iniciativas
                    mapeadas / em andamento / implementadas.
                  </p>
                </Item>

                <Item id="proc" title="Processo (vinculação)">
                  <Field label="Processo pai">
                    <select
                      value={draft.projeto_id ?? ""}
                      onChange={(e) => {
                        const v = e.target.value || null;
                        setDraft((d) => ({ ...d, projeto_id: v }));
                        persist({ projeto_id: v });
                      }}
                      className={inputCls}
                    >
                      <option value="">— selecione —</option>
                      {processos.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.nome}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    A cor da barra do card será atualizada automaticamente conforme o processo
                    selecionado.
                  </p>
                </Item>

                <Item id="anexos" title={`Anexos (${anexos.length})`}>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-vibra-300 bg-vibra-50/40 px-3 py-3 text-[12px] font-semibold text-vibra-700 hover:bg-vibra-50">
                    <Upload className="h-4 w-4" /> Enviar arquivo (PDF/DOC/XLS/PNG · máx 10MB)
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
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
                          <span>{(a.tamanho_bytes / 1024).toFixed(0)} KB</span>
                          <span>{new Date(a.created_at).toLocaleDateString("pt-BR")}</span>
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
      <MicroprocessoDrawer microId={openMicroId} onClose={() => setOpenMicroId(null)} />
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
function Field({
  label,
  tip,
  children,
}: {
  label: string;
  tip?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="block text-[10px] font-semibold uppercase tracking-wider text-vibra-700"
        title={tip}
      >
        {label}
        {tip && " ⓘ"}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}

function diffDias(a?: string | null, b?: string | null) {
  if (!a || !b) return null;
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  if (isNaN(da) || isNaN(db)) return null;
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

function DeltaBadge({ dias, label }: { dias: number | null; label: string }) {
  if (dias === null)
    return (
      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
        {label}: aguardando real
      </span>
    );
  if (dias === 0)
    return (
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
        {label}: no prazo
      </span>
    );
  if (dias < 0)
    return (
      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-700">
        {label}: {Math.abs(dias)}d adiantado
      </span>
    );
  return (
    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">
      {label}: {dias}d atrasado
    </span>
  );
}

function DateDeltaSummary({
  inicioPrev,
  inicioReal,
  fimPrev,
  fimReal,
}: {
  inicioPrev?: string | null;
  inicioReal?: string | null;
  fimPrev?: string | null;
  fimReal?: string | null;
}) {
  const dIni = diffDias(inicioPrev, inicioReal);
  const dFim = diffDias(fimPrev, fimReal);
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-md bg-vibra-50/60 px-2 py-1.5">
      <DeltaBadge dias={dIni} label="Início" />
      <DeltaBadge dias={dFim} label="Entrega" />
      <span className="ml-auto text-[10px] text-muted-foreground">Diferença real × previsto</span>
    </div>
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
