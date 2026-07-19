import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { Kpi } from "./_shared";

export function EvolucaoTab() {
  const { projetoId } = useHierarchy();
  const { data: rows = [] } = useQuery({
    queryKey: ["evol-ini", projetoId],
    queryFn: async () => {
      let q = supabase
        .from("iniciativas")
        .select(
          "id,codigo,titulo,gestor_responsavel,data_inicio,data_fim_prevista,status,percentual_avanco",
        )
        .is("deleted_at", null);
      if (projetoId) q = q.eq("projeto_id", projetoId);
      return (await q.order("data_inicio")).data ?? [];
    },
  });
  const concl = rows.filter((r: any) => /conclu/i.test(r.status ?? "")).length;
  const and = rows.filter((r: any) => /andamento/i.test(r.status ?? "")).length;
  const ni = rows.length - concl - and;
  const prog = rows.length
    ? rows.reduce((s: number, r: any) => s + Number(r.percentual_avanco ?? 0), 0) / rows.length
    : 0;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Concluídos" value={concl} tone="green" />
        <Kpi label="Em Andamento" value={and} tone="blue" />
        <Kpi label="Não Iniciado" value={ni} tone="orange" />
        <Kpi label="Progresso Médio" value={`${prog.toFixed(0)}%`} />
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <p className="mb-3 text-[13px] font-bold text-vibra-800">📅 Timeline de Mapeamento</p>
        <div className="space-y-3">
          {rows.map((r: any) => {
            const p = Number(r.percentual_avanco ?? 0);
            return (
              <div key={r.id} className="border-l-4 border-vibra-600 pl-3">
                <p className="text-[12px] font-bold text-vibra-800">
                  ● {r.codigo ?? ""} {r.titulo}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {r.gestor_responsavel ?? "—"} • {r.data_inicio ?? "?"} —{" "}
                  {r.data_fim_prevista ?? "?"}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-vibra-50">
                    <div className="h-2 rounded-full bg-vibra-600" style={{ width: `${p}%` }} />
                  </div>
                  <span className="w-28 text-right text-[11px] font-semibold">
                    {p}% {r.status ?? ""}
                  </span>
                </div>
              </div>
            );
          })}
          {rows.length === 0 && (
            <p className="text-center text-[12px] text-muted-foreground">Sem iniciativas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
