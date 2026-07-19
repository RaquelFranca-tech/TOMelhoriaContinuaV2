import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, Kpi, btnPrimary, btnDanger, inputCls } from "./_shared";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PicklistField } from "@/components/PicklistField";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { VIBRA } from "@/lib/vibraColors";

export function TobeTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();
  const { data: tobe = [] } = useQuery({
    queryKey: ["tobe", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("tobe_passos")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("ordem")
      ).data ?? [],
  });
  const { data: asis = [] } = useQuery({
    queryKey: ["asis-for-tobe", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("asis_passos")
          .select("tempo")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
      ).data ?? [],
  });

  const ganhoFte = tobe.reduce((s: number, r: any) => s + Number(r.ganho_fte ?? 0), 0);
  const ganhoFin = tobe.reduce((s: number, r: any) => s + Number(r.ganho_financeiro ?? 0), 0);
  const tAsisTotal = asis.reduce((s: number, r: any) => s + Number(r.tempo ?? 0), 0);
  const tTobeTotal = tobe.reduce((s: number, r: any) => s + Number(r.tempo ?? 0), 0);
  const tempoEcon = tAsisTotal - tTobeTotal;
  const reducao = tAsisTotal > 0 ? (tempoEcon / tAsisTotal) * 100 : 0;

  const chart = [{ name: "Lead Time (min)", "AS-IS": tAsisTotal, "TO-BE": tTobeTotal }];

  async function syncInitiativeGains() {
    try {
      const { data: steps } = await supabase
        .from("tobe_passos")
        .select("ganho_fte, ganho_financeiro, tempo")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);

      if (!steps) return;

      const { data: asisSteps } = await supabase
        .from("asis_passos")
        .select("tempo")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);

      const fteSum = steps.reduce((sum, s) => sum + Number(s.ganho_fte ?? 0), 0);
      const finSum = steps.reduce((sum, s) => sum + Number(s.ganho_financeiro ?? 0), 0);

      const tAsis = asisSteps ? asisSteps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0) : 0;
      const tTobe = steps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0);
      const redPercent = tAsis ? ((tAsis - tTobe) / tAsis) * 100 : 0;

      const { data: ini } = await supabase
        .from("iniciativas")
        .select("hc_atual")
        .eq("id", iniciativaId!)
        .single();

      const hcA = ini ? Number(ini.hc_atual ?? 0) : 0;
      const hcLiberado = fteSum > 0 ? fteSum : hcA * (redPercent / 100);
      const hcB = Math.max(hcA * (1 - redPercent / 100), hcA - hcLiberado);

      await supabase
        .from("iniciativas")
        .update({
          hc_estimado: Number(hcB.toFixed(2)),
          hc_liberado: Number(hcLiberado.toFixed(2)),
          saving_previsto: finSum > 0 ? finSum : null,
        })
        .eq("id", iniciativaId!);

      qc.invalidateQueries({ queryKey: ["res-ini", iniciativaId!] });
      qc.invalidateQueries({ queryKey: ["iniciativa", iniciativaId!] });
      qc.invalidateQueries({ queryKey: ["iniciativas"] });
    } catch (e) {
      console.error("Error syncing initiative gains:", e);
    }
  }

  async function add() {
    const { error } = await supabase
      .from("tobe_passos")
      .insert({ iniciativa_id: iniciativaId!, ordem: tobe.length + 1, passo: "" });
    if (error) {
      toast.error(error.message);
    } else {
      qc.invalidateQueries({ queryKey: ["tobe"] });
      await syncInitiativeGains();
    }
  }
  async function patch(id: string, p: any) {
    await supabase.from("tobe_passos").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["tobe"] });
    await syncInitiativeGains();
  }
  async function remove(id: string) {
    await supabase
      .from("tobe_passos")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["tobe"] });
    await syncInitiativeGains();
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Ganho FTE" value={ganhoFte.toFixed(1)} />
        <Kpi
          label="Ganho R$/ano"
          value={ganhoFin.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          tone="green"
        />
        <Kpi
          label="Tempo Economizado (min)"
          value={`${tempoEcon.toFixed(0)} min (${Math.floor(tempoEcon / 60)}h ${String(Math.round(tempoEcon % 60)).padStart(2, "0")}min)`}
          tone="blue"
        />
        <Kpi label="Redução Lead Time" value={`${reducao.toFixed(1)}%`} tone="orange" />
      </div>
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={add}>
          <Plus className="mr-1 inline h-3.5 w-3.5" />
          Passo TO-BE
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[900px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              {[
                "#",
                "Passo TO-BE",
                "Ator",
                "Tipo",
                "T.AS-IS",
                "T.TO-BE",
                "Ganho",
                "Elimina",
                "Melhoria",
                "Status",
                "HC",
                "R$/ano",
                "",
              ].map((h) => (
                <th key={h} className="px-2 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tobe.map((r: any, i: number) => {
              const ganho = Number(r.tempo_atual ?? 0) - Number(r.tempo ?? 0);
              const atorArray = r.ator
                ? r.ator
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : [];
              const tipoArray = r.tipo
                ? r.tipo
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : [];
              return (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-2 py-1">{i + 1}</td>
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.passo ?? ""}
                      onBlur={(e) => patch(r.id, { passo: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1 w-44">
                    <PicklistField
                      multi={true}
                      size="sm"
                      categoria="Ator"
                      placeholder="Ator..."
                      value={atorArray}
                      onChange={(vals: string[]) => patch(r.id, { ator: vals.join(", ") })}
                    />
                  </td>
                  <td className="px-2 py-1 w-44">
                    <PicklistField
                      multi={true}
                      size="sm"
                      categoria="Tipo de Atividade"
                      placeholder="Tipo..."
                      value={tipoArray}
                      onChange={(vals: string[]) => patch(r.id, { tipo: vals.join(", ") })}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.tempo_atual ?? 0}
                      onBlur={(e) => patch(r.id, { tempo_atual: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.tempo ?? 0}
                      onBlur={(e) => patch(r.id, { tempo: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1 bg-vibra-50/60 font-semibold">{ganho}</td>
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={r.elimina}
                      onChange={(e) => patch(r.id, { elimina: e.target.checked })}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.melhoria ?? ""}
                      onBlur={(e) => patch(r.id, { melhoria: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <select
                      className={inputCls}
                      defaultValue={r.status ?? ""}
                      onChange={(e) => patch(r.id, { status: e.target.value })}
                    >
                      <option value="">—</option>
                      <option>Planejado</option>
                      <option>Em Progresso</option>
                      <option>Concluído</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 w-16">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.ganho_fte ?? 0}
                      onBlur={(e) => patch(r.id, { ganho_fte: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1 w-24">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.ganho_financeiro ?? 0}
                      onBlur={(e) => patch(r.id, { ganho_financeiro: Number(e.target.value) })}
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
            {tobe.length === 0 && (
              <tr>
                <td colSpan={13} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhum passo TO-BE.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl border border-border bg-card p-5 shadow-vibra-sm">
        <h3 className="mb-2 text-[13px] font-bold text-vibra-800 flex items-center gap-1.5">
          📊 Eficiência de Lead Time de Processo (AS-IS vs TO-BE)
        </h3>
        <p className="text-[11px] text-muted-foreground mb-4">
          Visualização gráfica do impacto acumulado das otimizações propostas no tempo total do
          fluxo.
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chart} barSize={45}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis
              tick={{ fontSize: 10 }}
              stroke="#94a3b8"
              label={{
                value: "Minutos",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: 10, fill: "#64748b" },
              }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#fff",
                fontSize: "11px",
                fontFamily: "sans-serif",
              }}
              itemStyle={{ fontWeight: "bold" }}
            />
            <Legend
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
            />
            <Bar
              name="Lead Time Atual (AS-IS)"
              dataKey="AS-IS"
              fill={VIBRA.orange}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              name="Alvo de Eficiência (TO-BE)"
              dataKey="TO-BE"
              fill={VIBRA.green}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
