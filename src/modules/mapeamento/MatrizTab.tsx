import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
  ReferenceLine,
} from "recharts";
import { VIBRA } from "@/lib/vibraColors";

export function MatrizTab() {
  const { projetoId } = useHierarchy();
  const { data: iniciativas = [] } = useQuery({
    queryKey: ["matriz-ini", projetoId],
    queryFn: async () => {
      let q = supabase
        .from("iniciativas")
        .select("id,titulo,codigo,esforco,impacto_negocio,score")
        .is("deleted_at", null);
      if (projetoId) q = q.eq("projeto_id", projetoId);
      return (await q).data ?? [];
    },
  });
  const data = iniciativas.map((i: any) => ({
    x: Number(i.esforco ?? 3),
    y: Number(i.impacto_negocio ?? 3),
    z: Number(i.score ?? 10),
    nome: `${i.codigo ?? ""} ${i.titulo ?? ""}`.trim(),
  }));
  const top = [...iniciativas]
    .sort((a: any, b: any) => Number(b.score ?? 0) - Number(a.score ?? 0))
    .slice(0, 10);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <p className="mb-2 text-[13px] font-bold text-vibra-800">Matriz Esforço × Impacto</p>
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Esforço"
              domain={[0, 5]}
              label={{ value: "Esforço →", position: "bottom" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Impacto"
              domain={[0, 5]}
              label={{ value: "Impacto ↑", angle: -90, position: "left" }}
            />
            <ZAxis type="number" dataKey="z" range={[60, 400]} />
            <ReferenceLine x={2.5} stroke="#aaa" />
            <ReferenceLine y={2.5} stroke="#aaa" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v: any, n: string) => [v, n]}
              labelFormatter={() => ""}
              content={({ payload }: any) =>
                payload?.[0] ? (
                  <div className="rounded-md border bg-white p-2 text-[11px] shadow">
                    <b>{payload[0].payload.nome}</b>
                    <br />
                    Esforço {payload[0].payload.x} / Impacto {payload[0].payload.y} / Score{" "}
                    {payload[0].payload.z}
                  </div>
                ) : null
              }
            />
            <Scatter data={data} fill={VIBRA.green} />
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[10.5px] text-muted-foreground">
          <div className="rounded bg-vibra-50 p-1.5 text-center font-semibold">
            QUICK WINS (alto impacto, baixo esforço)
          </div>
          <div className="rounded bg-orange-50 p-1.5 text-center font-semibold">
            GRANDES PROJETOS
          </div>
          <div className="rounded bg-zinc-100 p-1.5 text-center font-semibold">FILL-INS</div>
          <div className="rounded bg-red-50 p-1.5 text-center font-semibold">EVITAR</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <p className="mb-2 text-[13px] font-bold text-vibra-800">Ranking Top 10</p>
        <table className="w-full text-[12px]">
          <thead className="text-[10.5px] uppercase text-vibra-800">
            <tr>
              <th className="text-left">#</th>
              <th className="text-left">Iniciativa</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {top.map((i: any, n: number) => (
              <tr key={i.id} className="border-t">
                <td className="py-1">{n + 1}º</td>
                <td className="py-1">
                  {i.codigo ?? "—"} — {i.titulo}
                </td>
                <td className="py-1 text-right font-bold text-vibra-700">
                  {Number(i.score ?? 0).toFixed(0)}
                </td>
              </tr>
            ))}
            {top.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-muted-foreground">
                  Nenhuma iniciativa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
