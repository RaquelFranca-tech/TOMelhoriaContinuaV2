import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa } from "./_shared";
import { X } from "lucide-react";
import { toast } from "sonner";
import { PicklistField } from "@/components/PicklistField";

const CATS = [
  { id: "fornecedor", label: "FORNECEDORES", categoria: "Fornecedores" },
  { id: "entrada", label: "ENTRADAS", categoria: "Entradas" },
  { id: "processo", label: "PROCESSO", categoria: "Processo" },
  { id: "saida", label: "SAÍDAS", categoria: "Saídas" },
  { id: "cliente", label: "CLIENTES", categoria: "Clientes" },
];

export function SipocTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const { data: items = [] } = useQuery({
    queryKey: ["sipoc", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("sipoc")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("ordem")
      ).data ?? [],
  });
  const grouped = Object.fromEntries(
    CATS.map((c) => [c.id, items.filter((i: any) => i.categoria === c.id)]),
  );

  async function add(cat: string, valor: string) {
    if (!valor.trim()) return;
    const existing = grouped[cat] ?? [];
    if (existing.some((i: any) => (i.valor ?? "").toLowerCase() === valor.trim().toLowerCase())) {
      toast.info("Item já adicionado.");
      return;
    }
    const ordem = existing.length + 1;
    const { error } = await supabase
      .from("sipoc")
      .insert({ iniciativa_id: iniciativaId!, categoria: cat, valor: valor.trim(), ordem });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["sipoc"] });
  }
  async function remove(id: string) {
    await supabase.from("sipoc").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["sipoc"] });
  }

  return (
    <div className="grid gap-3 md:grid-cols-5">
      {CATS.map((c) => (
        <Column
          key={c.id}
          label={c.label}
          categoria={c.categoria}
          items={grouped[c.id]}
          onAdd={(v: string) => add(c.id, v)}
          onRemove={remove}
        />
      ))}
    </div>
  );
}

function Column({
  label,
  categoria,
  items,
  onAdd,
  onRemove,
}: {
  label: string;
  categoria: string;
  items: any[];
  onAdd: (v: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-vibra-sm">
      <div className="rounded-t-xl bg-vibra-700 px-3 py-2 text-[11px] font-bold tracking-wider text-white">
        {label}
      </div>
      <div className="space-y-1.5 p-2">
        {items?.map((i: any) => (
          <div
            key={i.id}
            className="group flex items-center justify-between gap-1 rounded-md border border-border bg-white px-2 py-1 text-[11.5px]"
          >
            <span className="break-words">{i.valor}</span>
            <button
              onClick={() => onRemove(i.id)}
              className="opacity-0 group-hover:opacity-100"
              title="Remover"
            >
              <X className="h-3 w-3 text-red-600" />
            </button>
          </div>
        ))}
        <PicklistField
          categoria={categoria}
          value=""
          onChange={(v) => {
            if (v) onAdd(v);
          }}
          placeholder="+ Selecionar/Adicionar"
        />
      </div>
    </div>
  );
}
