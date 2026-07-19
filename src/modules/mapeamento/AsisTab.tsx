import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, Kpi, btnPrimary, btnDanger, inputCls } from "./_shared";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PicklistField } from "@/components/PicklistField";

export function AsisTab() {
  return (
    <RequireIniciativa>
      <Inner />
    </RequireIniciativa>
  );
}

function Inner() {
  const qc = useQueryClient();
  const { iniciativaId } = useHierarchy();

  const { data: ini } = useQuery({
    queryKey: ["iniciativa-detalhes", iniciativaId],
    queryFn: async () => {
      const { data } = await supabase
        .from("iniciativas")
        .select("tempo_max, passos_manuais")
        .eq("id", iniciativaId!)
        .single();
      return data;
    },
    enabled: !!iniciativaId,
  });

  const passosManuaisOptions: string[] = Array.isArray(ini?.passos_manuais)
    ? (ini.passos_manuais as string[])
    : [];

  const { data: rows = [] } = useQuery({
    queryKey: ["asis", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("asis_passos")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("ordem")
      ).data ?? [],
  });

  async function handleTempoChange(rowId: string, val: number) {
    const maxTempoPermitido = Number(ini?.tempo_max || 0);
    const sumOthers = rows
      .filter((r: any) => r.id !== rowId)
      .reduce((s: number, r: any) => s + Number(r.tempo ?? 0), 0);

    if (maxTempoPermitido > 0 && sumOthers + val > maxTempoPermitido) {
      toast.error(
        `A soma dos tempos dos passos (${(sumOthers + val).toFixed(1)} min) não pode ultrapassar o Tempo Máximo de ${maxTempoPermitido} min preenchido no formulário!`,
      );
      const allowed = Math.max(0, maxTempoPermitido - sumOthers);
      await patch(rowId, { tempo: allowed });
    } else {
      await patch(rowId, { tempo: val });
    }
  }

  const totalTempo = rows.reduce((s: number, r: any) => s + Number(r.tempo ?? 0), 0);
  const quickWins = rows.filter((r: any) => r.quick_win).length;

  async function syncInitiativeGains() {
    try {
      const { data: steps } = await supabase
        .from("tobe_passos")
        .select("ganho_fte, ganho_financeiro, tempo")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);

      const { data: asisSteps } = await supabase
        .from("asis_passos")
        .select("tempo")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);

      const fteSum = steps ? steps.reduce((sum, s) => sum + Number(s.ganho_fte ?? 0), 0) : 0;
      const finSum = steps ? steps.reduce((sum, s) => sum + Number(s.ganho_financeiro ?? 0), 0) : 0;

      const tAsis = asisSteps ? asisSteps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0) : 0;
      const tTobe = steps ? steps.reduce((sum, s) => sum + Number(s.tempo ?? 0), 0) : 0;
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
      .from("asis_passos")
      .insert({ iniciativa_id: iniciativaId!, ordem: rows.length + 1, passo: "" });
    if (error) {
      toast.error(error.message);
    } else {
      qc.invalidateQueries({ queryKey: ["asis"] });
      await syncInitiativeGains();
    }
  }
  async function patch(id: string, p: any) {
    await supabase.from("asis_passos").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["asis"] });
    await syncInitiativeGains();
  }
  async function remove(id: string) {
    await supabase
      .from("asis_passos")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["asis"] });
    await syncInitiativeGains();
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Kpi label="Passos Mapeados" value={rows.length} />
        <Kpi
          label="Tempo Total (min)"
          value={`${totalTempo.toFixed(0)} min (${Math.floor(totalTempo / 60)}h ${String(Math.round(totalTempo % 60)).padStart(2, "0")}min)`}
          tone="blue"
        />
        <Kpi label="Quick Wins" value={quickWins} tone="orange" />
      </div>
      <div className="flex justify-end">
        <button className={btnPrimary} onClick={add}>
          <Plus className="mr-1 inline h-3.5 w-3.5" />
          Passo
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[900px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              {[
                "#",
                "Passo",
                "Ator",
                "Tipo",
                "Tempo",
                "Volume",
                "Dor",
                "Impacto",
                "QW",
                "TI",
                "",
              ].map((h) => (
                <th key={h} className="px-2 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any, i: number) => {
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
                      list={`steps-options-${r.id}`}
                    />
                    <datalist id={`steps-options-${r.id}`}>
                      {passosManuaisOptions.map((p, idx) => (
                        <option key={idx} value={p} />
                      ))}
                    </datalist>
                  </td>
                  <td className="px-2 py-1 w-48">
                    <PicklistField
                      multi={true}
                      size="sm"
                      categoria="Ator"
                      placeholder="Ator..."
                      value={atorArray}
                      onChange={(vals: string[]) => patch(r.id, { ator: vals.join(", ") })}
                    />
                  </td>
                  <td className="px-2 py-1 w-48">
                    <PicklistField
                      multi={true}
                      size="sm"
                      categoria="Tipo"
                      placeholder="Tipo..."
                      value={tipoArray}
                      onChange={(vals: string[]) => patch(r.id, { tipo: vals.join(", ") })}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.tempo ?? 0}
                      onBlur={(e) => handleTempoChange(r.id, Number(e.target.value))}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.volume ?? 0}
                      onBlur={(e) => patch(r.id, { volume: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.dor ?? ""}
                      onBlur={(e) => patch(r.id, { dor: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <select
                      className={inputCls}
                      defaultValue={r.impacto ?? ""}
                      onChange={(e) => patch(r.id, { impacto: e.target.value })}
                    >
                      <option value="">—</option>
                      <option>Alto</option>
                      <option>Médio</option>
                      <option>Baixo</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={r.quick_win}
                      onChange={(e) => patch(r.id, { quick_win: e.target.checked })}
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      defaultChecked={r.ti}
                      onChange={(e) => patch(r.id, { ti: e.target.checked })}
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
                <td colSpan={11} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhum passo. Clique em "+ Passo".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
