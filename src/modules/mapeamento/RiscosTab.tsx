import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, Kpi, btnPrimary, btnDanger, inputCls } from "./_shared";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const MAP: any = { 3: "Alto/Alta", 2: "Médio/Média", 1: "Baixo/Baixa" };
function scoreColor(s: number) {
  return s >= 7
    ? "bg-red-100 text-red-700"
    : s >= 4
      ? "bg-orange-100 text-orange-800"
      : "bg-emerald-100 text-emerald-800";
}
function scoreLabel(s: number) {
  return s >= 7 ? "Crítico" : s >= 4 ? "Alto" : "Baixo";
}

export function RiscosTab() {
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
    queryKey: ["riscos", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("riscos")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .order("severidade", { ascending: false })
      ).data ?? [],
  });

  const crit = rows.filter((r: any) => Number(r.severidade ?? 0) >= 7).length;
  const altos = rows.filter((r: any) => {
    const s = Number(r.severidade ?? 0);
    return s >= 4 && s < 7;
  }).length;
  const baixos = rows.filter(
    (r: any) => Number(r.severidade ?? 0) < 4 && Number(r.severidade ?? 0) > 0,
  ).length;

  async function add() {
    const { error } = await supabase.from("riscos").insert({
      iniciativa_id: iniciativaId!,
      descricao: "",
      probabilidade: 1,
      impacto: 1,
      severidade: 1,
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["riscos"] });
  }
  async function patch(id: string, p: any) {
    if ("probabilidade" in p || "impacto" in p) {
      const cur = rows.find((r: any) => r.id === id);
      const prob = p.probabilidade ?? cur?.probabilidade ?? 1;
      const imp = p.impacto ?? cur?.impacto ?? 1;
      p.severidade = Number(prob) * Number(imp);
    }
    await supabase.from("riscos").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["riscos"] });
  }
  async function remove(id: string) {
    await supabase.from("riscos").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["riscos"] });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Críticos (7-9)" value={crit} tone="red" />
        <Kpi label="Altos (4-6)" value={altos} tone="orange" />
        <Kpi label="Baixos (1-3)" value={baixos} tone="green" />
      </div>
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={add}>
          <Plus className="mr-1 inline h-3.5 w-3.5" />
          Novo Risco
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[800px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              {["ID", "Risco", "Probabilidade", "Impacto", "Score", "Classe", "Mitigação", ""].map(
                (h) => (
                  <th key={h} className="px-2 py-2 text-left">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any, i: number) => {
              const s = Number(r.severidade ?? 0);
              return (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-2 py-1 font-bold text-vibra-700">
                    R-{String(i + 1).padStart(3, "0")}
                  </td>
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.descricao ?? ""}
                      onBlur={(e) => patch(r.id, { descricao: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1 w-32">
                    <select
                      className={inputCls}
                      defaultValue={r.probabilidade ?? 1}
                      onChange={(e) => patch(r.id, { probabilidade: Number(e.target.value) })}
                    >
                      {[3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {MAP[n].split("/")[1]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1 w-32">
                    <select
                      className={inputCls}
                      defaultValue={r.impacto ?? 1}
                      onChange={(e) => patch(r.id, { impacto: Number(e.target.value) })}
                    >
                      {[3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {MAP[n].split("/")[0]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1">
                    <span className={`rounded-md px-2 py-0.5 font-bold ${scoreColor(s)}`}>{s}</span>
                  </td>
                  <td className="px-2 py-1 font-semibold">{scoreLabel(s)}</td>
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.mitigacao ?? ""}
                      onBlur={(e) => patch(r.id, { mitigacao: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <button className={btnDanger} onClick={() => remove(r.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhum risco.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
