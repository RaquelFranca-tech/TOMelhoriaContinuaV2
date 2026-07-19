import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { VIBRA } from "@/lib/vibraColors";

export function Top15Tab() {
  const { projetoId } = useHierarchy();
  const { data: rows = [] } = useQuery({
    queryKey: ["top15", projetoId],
    queryFn: async () => {
      let q = supabase
        .from("iniciativas")
        .select(
          "id,codigo,titulo,status,prioridade,score,saving_previsto,saving_realizado,hc_atual,hc_liberado,impacto_negocio,esforco",
        )
        .is("deleted_at", null);
      if (projetoId) q = q.eq("projeto_id", projetoId);
      return (await q.order("score", { ascending: false }).limit(15)).data ?? [];
    },
  });

  const chart = rows.slice(0, 10).map((r: any) => ({
    nome: (r.codigo ?? "").slice(0, 8),
    score: Number(r.score ?? 0),
    saving: Number(r.saving_previsto ?? 0) / 1000,
  }));

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[1000px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              {[
                "Pos",
                "ID",
                "Título",
                "Status",
                "Prioridade",
                "Score",
                "Saving",
                "HC Atual",
                "HC Liberar",
                "Impacto",
                "Esforço",
              ].map((h) => (
                <th key={h} className="px-2 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any, i: number) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-2 py-1 font-bold">{i + 1}</td>
                <td className="px-2 py-1 text-vibra-700 font-semibold">{r.codigo ?? "—"}</td>
                <td className="px-2 py-1">{r.titulo}</td>
                <td className="px-2 py-1">{r.status ?? "—"}</td>
                <td className="px-2 py-1">{r.prioridade ?? "—"}</td>
                <td className="px-2 py-1 font-bold text-vibra-700">
                  {Number(r.score ?? 0).toFixed(0)}
                </td>
                <td className="px-2 py-1">
                  {Number(r.saving_previsto ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-2 py-1">{Number(r.hc_atual ?? 0).toFixed(1)}</td>
                <td className="px-2 py-1">{Number(r.hc_liberado ?? 0).toFixed(1)}</td>
                <td className="px-2 py-1">{r.impacto_negocio ?? "—"}/5</td>
                <td className="px-2 py-1">{r.esforco ?? "—"}/5</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={11} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhuma iniciativa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <p className="mb-2 text-[13px] font-bold text-vibra-800">Score por Iniciativa</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="nome" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill={VIBRA.green} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
          <p className="mb-2 text-[13px] font-bold text-vibra-800">Saving Previsto (R$ mil)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="nome" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="saving" fill={VIBRA.orange} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
