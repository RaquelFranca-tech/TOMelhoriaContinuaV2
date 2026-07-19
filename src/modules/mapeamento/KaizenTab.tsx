import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, btnPrimary, btnDanger, inputCls } from "./_shared";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const FIELDS: [string, string][] = [
  ["problema", "IDENTIFICAÇÃO DO PROBLEMA"],
  ["meta", "META DO KAIZEN"],
  ["causa", "CAUSA IDENTIFICADA"],
  ["acao", "AÇÃO PROPOSTA"],
  ["resultado", "RESULTADO OBTIDO"],
];

export function KaizenTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const { data: rows = [] } = useQuery({
    queryKey: ["kaizen", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("kaizen")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("created_at")
      ).data ?? [],
  });

  async function add() {
    const { error } = await supabase.from("kaizen").insert({
      iniciativa_id: iniciativaId!,
      problema: "",
      data_evento: new Date().toISOString().slice(0, 10),
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["kaizen"] });
  }
  async function patch(id: string, p: any) {
    await supabase.from("kaizen").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["kaizen"] });
  }
  async function remove(id: string) {
    await supabase.from("kaizen").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["kaizen"] });
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={add}>
          <Plus className="mr-1 inline h-3.5 w-3.5" />
          Novo Kaizen
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {rows.map((k: any, i: number) => (
          <div key={k.id} className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-md bg-vibra-700 px-2 py-0.5 text-[11px] font-bold text-white">
                [{i + 1}]
              </span>
              <button className={btnDanger} onClick={() => remove(k.id)}>
                🗑️ Remover
              </button>
            </div>
            <div className="space-y-2">
              {FIELDS.map(([f, l]) => (
                <div key={f}>
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-vibra-700">
                    {l}
                  </p>
                  <textarea
                    className={inputCls + " min-h-[50px]"}
                    defaultValue={k[f] ?? ""}
                    onBlur={(e) => patch(k.id, { [f]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="col-span-2 rounded-xl border border-dashed border-border bg-card p-8 text-center text-[12px] text-muted-foreground">
            Nenhum Kaizen registrado.
          </p>
        )}
      </div>
    </div>
  );
}
