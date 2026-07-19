import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, inputCls, btnPrimary } from "./_shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PHASES: [string, string, string][] = [
  ["define_phase", "🔍 DEFINE", "Definir o problema, escopo e objetivos do projeto."],
  ["measure_phase", "📊 MEASURE", "Medir a situação atual com dados e indicadores."],
  ["analyze_phase", "🔬 ANALYZE", "Analisar dados para identificar causas raiz."],
  ["improve_phase", "💡 IMPROVE", "Desenvolver e implementar soluções para as causas."],
  ["control_phase", "🎯 CONTROL", "Monitorar resultados e padronizar melhorias."],
];

export function DmaicTab() {
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
    queryKey: ["dmaic", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("dmaic")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .maybeSingle()
      ).data,
  });
  const [v, setV] = useState<any>({});
  useEffect(() => {
    setV(data ?? {});
  }, [data]);

  async function save() {
    const payload: any = { iniciativa_id: iniciativaId! };
    PHASES.forEach(([k]) => {
      payload[k] = v[k] ?? "";
    });
    const { error } = data?.id
      ? await supabase.from("dmaic").update(payload).eq("id", data.id)
      : await supabase.from("dmaic").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Salvo");
      qc.invalidateQueries({ queryKey: ["dmaic"] });
    }
  }

  return (
    <div className="space-y-3">
      {PHASES.map(([k, l, d]) => (
        <div key={k} className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <p className="text-[13px] font-bold text-vibra-800">{l}</p>
          <p className="mb-1 text-[10.5px] text-muted-foreground">{d}</p>
          <textarea
            className={inputCls + " min-h-[80px]"}
            value={v[k] ?? ""}
            onChange={(e) => setV((s: any) => ({ ...s, [k]: e.target.value }))}
          />
        </div>
      ))}
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={save}>
          Salvar DMAIC
        </button>
      </div>
    </div>
  );
}
