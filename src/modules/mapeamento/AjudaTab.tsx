import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, btnPrimary, btnDanger, inputCls } from "./_shared";
import { LifeBuoy, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS = ["Pendente", "Em Análise", "Resolvido", "Cancelado"];

export function AjudaTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const [desc, setDesc] = useState("");
  const { data: rows = [] } = useQuery({
    queryKey: ["ajuda", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("pedido_ajuda")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  async function enviar() {
    if (!desc.trim()) return toast.error("Descreva o impedimento");
    const { error } = await supabase.from("pedido_ajuda").insert({
      iniciativa_id: iniciativaId!,
      descricao: desc,
      status: "Pendente",
      titulo: desc.slice(0, 80),
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Pedido enviado");
      setDesc("");
      qc.invalidateQueries({ queryKey: ["ajuda"] });
    }
  }
  async function patch(id: string, p: any) {
    await supabase.from("pedido_ajuda").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["ajuda"] });
  }
  async function remove(id: string) {
    await supabase
      .from("pedido_ajuda")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["ajuda"] });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <p className="mb-2 flex items-center gap-2 text-[13px] font-bold text-vibra-800">
          <LifeBuoy className="h-4 w-4" />
          Registrar Novo Impedimento
        </p>
        <textarea
          className={inputCls + " min-h-[90px]"}
          placeholder="Descreva o impedimento, bloqueio ou necessidade de apoio da gestão..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <button className={btnPrimary} onClick={enviar}>
            <Send className="mr-1 inline h-3 w-3" />
            Enviar Pedido
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <p className="mb-2 text-[13px] font-bold text-vibra-800">📋 Histórico ({rows.length})</p>
        <div className="space-y-2">
          {rows.map((r: any, i: number) => (
            <div key={r.id} className="rounded-md border border-border p-3 text-[12px]">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-bold text-vibra-700">
                  HR-{String(i + 1).padStart(3, "0")}
                </span>
                <span className="text-muted-foreground">
                  {new Date(r.created_at).toLocaleDateString("pt-BR")}
                </span>
                <select
                  className="ml-auto rounded border px-1.5 py-0.5 text-[11px]"
                  value={r.status ?? ""}
                  onChange={(e) => patch(r.id, { status: e.target.value })}
                >
                  {STATUS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <button className={btnDanger} onClick={() => remove(r.id)}>
                  🗑️
                </button>
              </div>
              <p className="whitespace-pre-wrap">{r.descricao}</p>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="text-center text-muted-foreground">Nenhum pedido registrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
