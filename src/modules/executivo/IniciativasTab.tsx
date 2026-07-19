import { useState } from "react";
import { KanbanSquare, Calendar, ListChecks, Plus, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { KanbanTab } from "./KanbanTab";
import { TimelineTab } from "./TimelineTab";
import { AcoesTab } from "./AcoesTab";
import { resequenceProjectIniciativas } from "@/lib/iniciativaSequence";

type View = "kanban" | "timeline" | "tabela";

const VIEWS: { id: View; label: string; icon: typeof KanbanSquare }[] = [
  { id: "kanban", label: "Kanban", icon: KanbanSquare },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "tabela", label: "Tabela / Ações", icon: ListChecks },
];

export function IniciativasTab() {
  const [view, setView] = useState<View>("kanban");
  const [newOpen, setNewOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [processoId, setProcessoId] = useState("");
  const qc = useQueryClient();

  const { data: projetos = [] } = useQuery({
    queryKey: ["ruler-projetos"],
    queryFn: async () => {
      const { data } = await supabase.from("projetos").select("id,nome").is("deleted_at", null);
      return data ?? [];
    },
  });

  async function createInitiative(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !processoId) {
      return toast.error("Informe título e projeto");
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Generate robust sequential initiative code for this project
    const codigo = await resequenceProjectIniciativas(processoId);

    const { error } = await supabase.from("iniciativas").insert({
      titulo,
      status: "Backlog",
      projeto_id: processoId,
      codigo,
      created_by: user?.id,
    });

    if (error) {
      return toast.error(error.message);
    }

    toast.success("Iniciativa criada");
    setTitulo("");
    setProcessoId("");
    setNewOpen(false);

    // Invalidate all related queries to refresh the board instantly
    qc.invalidateQueries({ queryKey: ["kanban-ini"] });
    qc.invalidateQueries({ queryKey: ["timeline-ini"] });
    qc.invalidateQueries({ queryKey: ["acoes-ini"] });
    qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-vibra-sm">
        <div className="flex items-center gap-3">
          <h3 className="text-[13px] font-bold text-vibra-800">Iniciativas</h3>
          <button
            onClick={() => setNewOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-vibra-700 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-vibra-800 transition shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" /> Nova Iniciativa
          </button>
        </div>
        <div className="flex items-center gap-0.5 rounded-full border border-border bg-vibra-50 p-0.5">
          {VIEWS.map((v) => {
            const Icon = v.icon;
            const active = v.id === view;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-all ${
                  active
                    ? "bg-white text-vibra-800 shadow-vibra-sm"
                    : "text-muted-foreground hover:text-vibra-800"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {v.label}
              </button>
            );
          })}
        </div>
      </div>

      {view === "kanban" && <KanbanTab />}
      {view === "timeline" && <TimelineTab />}
      {view === "tabela" && <AcoesTab />}

      {newOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={createInitiative}
            className="w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-vibra-800">Nova Iniciativa</h2>
              <button
                type="button"
                onClick={() => setNewOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-semibold text-vibra-800">Título</label>
                <input
                  autoFocus
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600 focus:ring-1 focus:ring-vibra-600"
                  placeholder="Ex.: Automatizar onboarding"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-vibra-800">Projeto</label>
                <select
                  required
                  value={processoId}
                  onChange={(e) => setProcessoId(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px] outline-none focus:border-vibra-600"
                >
                  <option value="">Selecione…</option>
                  {projetos.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setNewOpen(false)}
                className="rounded-md border border-border px-3 py-1.5 text-[12px] font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-vibra-700 px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800 transition"
              >
                Criar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
