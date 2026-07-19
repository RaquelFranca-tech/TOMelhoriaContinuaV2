import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, inputCls, btnPrimary } from "./_shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BLOCKS: [string, string, string][] = [
  ["o_que_mudou", "🔄 O Que Mudou", "Principais mudanças e avanços"],
  ["riscos", "⚠️ Principais Riscos", "Riscos identificados e status"],
  ["decisoes", "✅ Decisões Tomadas", "Decisões relevantes do período"],
  ["retorno", "📈 Retorno Esperado", "Benefícios e ganhos projetados"],
  ["proximas_acoes", "📋 Próximas Ações", "Próximos passos planejados"],
  ["indicadores_sucesso", "📊 Indicadores de Sucesso", "KPIs e métricas"],
];

export function StatusEstrategicoTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const { data } = useQuery({
    queryKey: ["status-estrat", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("status_estrategico")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      ).data,
  });
  const [v, setV] = useState<any>({});
  useEffect(() => {
    setV(data ?? {});
  }, [data]);

  async function save() {
    const payload: any = { iniciativa_id: iniciativaId! };
    BLOCKS.forEach(([k]) => {
      payload[k] = v[k] ?? "";
    });
    const { error } = data?.id
      ? await supabase.from("status_estrategico").update(payload).eq("id", data.id)
      : await supabase.from("status_estrategico").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Salvo");
      qc.invalidateQueries({ queryKey: ["status-estrat"] });
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {BLOCKS.map(([k, l, d]) => (
          <div key={k} className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
            <p className="text-[12px] font-bold text-vibra-800">{l}</p>
            <p className="mb-1 text-[10.5px] text-muted-foreground">{d}</p>
            <textarea
              className={inputCls + " min-h-[100px]"}
              value={v[k] ?? ""}
              onChange={(e) => setV((s: any) => ({ ...s, [k]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={save}>
          Salvar
        </button>
      </div>
    </div>
  );
}
