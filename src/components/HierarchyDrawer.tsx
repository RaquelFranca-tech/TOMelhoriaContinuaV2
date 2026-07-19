import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useHierarchy } from "@/stores/hierarchy";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { ChevronRight, Plus, Trash2, Layers, Lightbulb, CheckSquare, Search } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import { syncHierarchyProgress } from "@/lib/progressSync";
import { resequenceProjectIniciativas } from "@/lib/iniciativaSequence";

type Row = {
  id: string;
  nome?: string;
  titulo?: string;
  percentual_avanco?: number | null;
  status?: string | null;
};

const LEVELS = [
  {
    key: "projetos",
    label: "Projetos",
    icon: Layers,
    parentKey: null,
    parentCol: null,
    nameCol: "nome",
  },
  {
    key: "iniciativas",
    label: "Iniciativas",
    icon: Lightbulb,
    parentKey: "projetos",
    parentCol: "projeto_id",
    nameCol: "titulo",
  },
  {
    key: "microprocessos",
    label: "Microprocessos",
    icon: Layers,
    parentKey: "iniciativas",
    parentCol: "iniciativa_id",
    nameCol: "titulo",
  },
  {
    key: "tarefas",
    label: "Tarefas",
    icon: CheckSquare,
    parentKey: "microprocessos",
    parentCol: "microprocesso_id",
    nameCol: "titulo",
  },
] as const;

export function HierarchyDrawer() {
  const { drawerOpen, closeDrawer } = useHierarchy();
  return (
    <Sheet open={drawerOpen} onOpenChange={(o) => !o && closeDrawer()}>
      <SheetContent side="right" className="w-full max-w-[1150px] p-0 sm:max-w-[1150px]">
        <SheetHeader className="border-b border-border bg-vibra-50 px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-vibra-800">
            <Layers className="h-5 w-5" /> Hierarquia VIBRA
          </SheetTitle>
          <p className="text-[11px] text-muted-foreground">
            Projeto → Initiative → Microprocesso → Tarefa. Edição inline com sincronização em tempo
            real.
          </p>
        </SheetHeader>
        <div className="grid h-[calc(100vh-92px)] grid-cols-4 divide-x divide-border overflow-hidden">
          {LEVELS.map((lvl) => (
            <Column key={lvl.key} level={lvl} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Column({ level }: { level: (typeof LEVELS)[number] }) {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const sel = useHierarchy();
  const [adding, setAdding] = useState("");
  const [filter, setFilter] = useState("");

  const parentId =
    level.parentKey === "projetos"
      ? sel.projetoId
      : level.parentKey === "iniciativas"
        ? sel.iniciativaId
        : level.parentKey === "microprocessos"
          ? sel.microprocessoId
          : null;

  const selectedId =
    level.key === "projetos"
      ? sel.projetoId
      : level.key === "iniciativas"
        ? sel.iniciativaId
        : level.key === "microprocessos"
          ? sel.microprocessoId
          : sel.tarefaId;

  const setSelected = (id: string) => {
    if (level.key === "projetos") sel.setProjeto(id);
    else if (level.key === "iniciativas") sel.setIniciativa(id);
    else if (level.key === "microprocessos") sel.setMicroprocesso(id);
    else sel.setTarefa(id);
  };

  useRealtimeTable(level.key, [["hier", level.key, parentId ?? "root"]]);

  // Tasks mutation to complete/uncomplete directly inside the Hierarchy Drawer
  const toggleTask = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const status = completed ? "Concluída" : "Pendente";
      const patch: any = { status };
      if (completed) patch.data_fim_real = new Date().toISOString().slice(0, 10);
      const { error } = await supabase.from("tarefas").update(patch).eq("id", id);
      if (error) throw error;
      await syncHierarchyProgress({ taskId: id });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["hier"] });
      qc.invalidateQueries({ queryKey: ["kanban-ini"] });
      qc.invalidateQueries({ queryKey: ["tarefas-board"] });
      qc.invalidateQueries({ queryKey: ["acoes-list"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const enabled = level.parentKey === null || !!parentId;
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["hier", level.key, parentId ?? "root"],
    enabled,
    queryFn: async () => {
      if (level.key === "projetos") {
        // Fetch projects, then average initiative progress dynamically
        const { data: projectsData, error: pErr } = await supabase
          .from("projetos")
          .select("id, nome")
          .is("deleted_at", null)
          .order("nome");
        if (pErr) throw pErr;

        const { data: initiativesData, error: iErr } = await supabase
          .from("iniciativas")
          .select("projeto_id, percentual_avanco")
          .is("deleted_at", null);
        if (iErr) throw iErr;

        return (projectsData as Row[]).map((p) => {
          const pInis = initiativesData.filter((ini) => ini.projeto_id === p.id);
          let progress = 0;
          if (pInis.length > 0) {
            const sum = pInis.reduce((acc, ini) => acc + Number(ini.percentual_avanco ?? 0), 0);
            progress = Math.round(sum / pInis.length);
          }
          return {
            ...p,
            percentual_avanco: progress,
          };
        });
      }

      let selectFields = `id, ${level.nameCol}`;
      if (level.key === "iniciativas" || level.key === "microprocessos") {
        selectFields += `, percentual_avanco, status`;
      } else if (level.key === "tarefas") {
        selectFields += `, status`;
      }

      let q: any = (supabase.from as any)(level.key).select(selectFields).is("deleted_at", null);
      if (level.parentCol && parentId) q = q.eq(level.parentCol, parentId);
      const { data, error } = await q.order(level.nameCol);
      if (error) throw error;
      return (data as Row[]) ?? [];
    },
  });

  const filtered = useMemo(() => {
    if (!filter) return rows;
    const f = filter.toLowerCase();
    return rows.filter((r) => ((r.nome ?? r.titulo ?? "") as string).toLowerCase().includes(f));
  }, [rows, filter]);

  const create = useMutation({
    mutationFn: async (name: string) => {
      if (!name.trim()) throw new Error("Informe o nome");
      if (level.parentCol && !parentId)
        throw new Error(
          `Selecione um(a) ${LEVELS.find((l) => l.key === level.parentKey)?.label.slice(0, -1)}`,
        );
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const payload: Record<string, unknown> = {
        [level.nameCol]: name.trim(),
        created_by: user?.id,
      };
      if (level.parentCol && parentId) payload[level.parentCol] = parentId;

      if (level.key === "iniciativas" && parentId) {
        payload.codigo = await resequenceProjectIniciativas(parentId);
      }

      const { error } = await (supabase.from as any)(level.key).insert(payload);
      if (error) throw error;

      // Recalculate progress upward if a new microprocess/task was added
      if (level.key === "tarefas" && parentId) {
        await syncHierarchyProgress({ microId: parentId });
      } else if (level.key === "microprocessos" && parentId) {
        await syncHierarchyProgress({ iniId: parentId });
      }
    },
    onSuccess: () => {
      setAdding("");
      toast.success(`${level.label.slice(0, -1)} criado(a)`);
      qc.invalidateQueries({ queryKey: ["hier"] });
      qc.invalidateQueries({ queryKey: ["kanban-ini"] });
      qc.invalidateQueries({ queryKey: ["tarefas-board"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase.from as any)(level.key)
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;

      // Recalculate parent progress after logical deletion
      if (level.key === "tarefas") {
        await syncHierarchyProgress({ microId: parentId });
      } else if (level.key === "microprocessos") {
        await syncHierarchyProgress({ iniId: parentId });
      } else if (level.key === "iniciativas" && parentId) {
        await resequenceProjectIniciativas(parentId);
      }
    },
    onSuccess: () => {
      toast.success("Removido (lógico)");
      qc.invalidateQueries({ queryKey: ["hier"] });
      qc.invalidateQueries({ queryKey: ["kanban-ini"] });
      qc.invalidateQueries({ queryKey: ["tarefas-board"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const Icon = level.icon;
  return (
    <div className="flex flex-col bg-white">
      <header className="flex items-center gap-2 border-b border-border bg-vibra-50/50 px-3 py-2.5">
        <Icon className="h-3.5 w-3.5 text-vibra-700" />
        <h4 className="text-[11px] font-extrabold uppercase tracking-wide text-vibra-800">
          {level.label}
        </h4>
        <span className="ml-auto rounded-full bg-vibra-100 px-1.5 text-[10px] font-bold text-vibra-700">
          {rows.length}
        </span>
      </header>

      {!enabled ? (
        <div className="flex flex-1 items-center justify-center px-4 text-center text-[11px] text-muted-foreground">
          Selecione um(a)
          <br />
          {LEVELS.find((l) => l.key === level.parentKey)?.label.slice(0, -1)}
        </div>
      ) : (
        <>
          <div className="border-b border-border px-2 py-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
              <input
                className="h-7 w-full rounded border border-border bg-white pl-7 pr-2 text-[11px] outline-none focus:border-vibra-700"
                placeholder="Filtrar..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto px-1.5 py-1.5">
            {isLoading && (
              <li className="px-2 py-2 text-[11px] text-muted-foreground">Carregando…</li>
            )}
            {!isLoading && filtered.length === 0 && (
              <li className="px-2 py-2 text-[11px] text-muted-foreground">Nenhum registro.</li>
            )}
            {filtered.map((r) => {
              const active = selectedId === r.id;
              const hasProgress = r.percentual_avanco !== undefined && r.percentual_avanco !== null;

              return (
                <li key={r.id}>
                  <div
                    className={`group mb-0.5 flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-[12px] transition ${
                      active ? "bg-vibra-700 text-white" : "text-foreground hover:bg-vibra-50"
                    }`}
                    onClick={() => setSelected(r.id)}
                  >
                    {level.key === "tarefas" ? (
                      <div
                        className="flex items-center gap-2 flex-1 min-w-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={/conclu/i.test(r.status ?? "")}
                          onChange={(e) => {
                            toggleTask.mutate({ id: r.id, completed: e.target.checked });
                          }}
                          className={`h-3.5 w-3.5 rounded border-gray-300 text-vibra-600 focus:ring-vibra-600 cursor-pointer shrink-0 ${
                            active ? "accent-white border-white/40" : ""
                          }`}
                        />
                        <span
                          className={`truncate font-medium flex-1 cursor-pointer ${
                            /conclu/i.test(r.status ?? "")
                              ? active
                                ? "line-through text-white/60"
                                : "line-through text-slate-400"
                              : active
                                ? "text-white"
                                : "text-slate-800"
                          }`}
                          onClick={() => setSelected(r.id)}
                        >
                          {(r.nome ?? r.titulo ?? "—") as string}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1 min-w-0">
                        <span
                          className={`truncate font-bold ${active ? "text-white" : "text-slate-800"}`}
                        >
                          {(r.nome ?? r.titulo ?? "—") as string}
                        </span>
                        {hasProgress && (
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <div
                              className={`h-1 w-full rounded-full overflow-hidden ${active ? "bg-white/20" : "bg-slate-100"}`}
                            >
                              <div
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  active ? "bg-white" : "bg-vibra-600"
                                }`}
                                style={{ width: `${Math.min(100, Number(r.percentual_avanco))}%` }}
                              />
                            </div>
                            <span
                              className={`text-[9px] font-black font-mono shrink-0 ${active ? "text-white/80" : "text-slate-500"}`}
                            >
                              {Number(r.percentual_avanco).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {active && <ChevronRight className="h-3 w-3 shrink-0" />}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (
                          await confirm(
                            "Remover item?",
                            `Deseja realmente remover "${r.nome ?? r.titulo ?? "este item"}"?`,
                          )
                        ) {
                          remove.mutate(r.id);
                        }
                      }}
                      className={`flex h-5 w-5 items-center justify-center rounded transition shrink-0 ${
                        active
                          ? "text-white/80 hover:text-white hover:bg-vibra-800"
                          : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                      title="Remover"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border bg-vibra-50/30 p-2">
            <form
              className="flex gap-1"
              onSubmit={(e) => {
                e.preventDefault();
                create.mutate(adding);
              }}
            >
              <input
                value={adding}
                onChange={(e) => setAdding(e.target.value)}
                placeholder={`Novo(a) ${level.label.slice(0, -1).toLowerCase()}...`}
                className="h-7 flex-1 rounded border border-border bg-white px-2 text-[11px] outline-none focus:border-vibra-700"
              />
              <button
                type="submit"
                disabled={create.isPending || !adding.trim()}
                className="inline-flex h-7 items-center gap-1 rounded bg-vibra-700 px-2 text-[11px] font-bold text-white hover:bg-vibra-800 disabled:opacity-50"
              >
                <Plus className="h-3 w-3" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
