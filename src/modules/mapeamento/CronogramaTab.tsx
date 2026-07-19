import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { inputCls, btnPrimary, btnDanger, Kpi } from "./_shared";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const STATUS = ["Não Iniciado", "Em Andamento", "Concluído"];

export function CronogramaTab() {
  const qc = useQueryClient();
  const { projetoId } = useHierarchy();
  const { data: rows = [] } = useQuery({
    queryKey: ["crono-ini", projetoId],
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

  async function patch(id: string, p: any) {
    await supabase.from("iniciativas").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["crono-ini"] });
  }

  const concl = rows.filter((r: any) => /conclu/i.test(r.status ?? "")).length;
  const and = rows.filter((r: any) => /andamento/i.test(r.status ?? "")).length;
  const ni = rows.length - concl - and;
  const progMedio = rows.length
    ? rows.reduce((s: number, r: any) => s + Number(r.percentual_avanco ?? 0), 0) / rows.length
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Concluídos" value={concl} tone="green" />
        <Kpi label="Em Andamento" value={and} tone="blue" />
        <Kpi label="Não Iniciado" value={ni} tone="orange" />
        <Kpi label="Progresso Médio" value={`${progMedio.toFixed(0)}%`} />
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[900px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              {[
                "Processo / Iniciativa",
                "Responsável",
                "Início",
                "Fim",
                "Dias",
                "Status",
                "Progresso (%)",
              ].map((h) => (
                <th key={h} className="px-2 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => {
              const dias =
                r.data_inicio && r.data_fim_prevista
                  ? Math.round(
                      (+new Date(r.data_fim_prevista) - +new Date(r.data_inicio)) / 86400000,
                    )
                  : 0;
              return (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-2 py-1 font-semibold text-vibra-800">
                    {r.codigo ?? ""} {r.titulo}
                  </td>
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.gestor_responsavel ?? ""}
                      onBlur={(e) => patch(r.id, { gestor_responsavel: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1 w-36">
                    <input
                      type="date"
                      className={inputCls}
                      defaultValue={r.data_inicio ?? ""}
                      onBlur={(e) => patch(r.id, { data_inicio: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1 w-36">
                    <input
                      type="date"
                      className={inputCls}
                      defaultValue={r.data_fim_prevista ?? ""}
                      onBlur={(e) => patch(r.id, { data_fim_prevista: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1 w-16 bg-vibra-50/50 font-semibold">{dias}</td>
                  <td className="px-2 py-1">
                    <select
                      className={inputCls}
                      defaultValue={r.status ?? ""}
                      onChange={(e) => patch(r.id, { status: e.target.value })}
                    >
                      <option value="">—</option>
                      {STATUS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1 w-32">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className={inputCls}
                      defaultValue={r.percentual_avanco ?? 0}
                      onBlur={(e) => patch(r.id, { percentual_avanco: Number(e.target.value) })}
                    />
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhuma iniciativa no escopo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
