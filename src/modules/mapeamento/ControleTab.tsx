import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { Kpi, btnPrimary, btnDanger, inputCls } from "./_shared";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const STATUS = ["Sustentado", "Atenção", "Desvio"];

export function ControleTab() {
  const qc = useQueryClient();
  const { projetoId } = useHierarchy();

  const { data: iniciativas = [] } = useQuery({
    queryKey: ["ctrl-ini", projetoId],
    queryFn: async () => {
      let q = supabase
        .from("iniciativas")
        .select("id,codigo,titulo,saving_previsto,horas_gastas_mes,hc_estimado")
        .is("deleted_at", null)
        .eq("status", "Concluída");
      if (projetoId) q = q.eq("projeto_id", projetoId);
      return (await q).data ?? [];
    },
  });

  const { data: ctrl = [] } = useQuery({
    queryKey: ["ctrl-rows", iniciativas.map((i: any) => i.id).join(",")],
    enabled: iniciativas.length > 0,
    queryFn: async () =>
      (
        await supabase
          .from("controle_sustentacao")
          .select("*")
          .in(
            "iniciativa_id",
            iniciativas.map((i: any) => i.id),
          )
          .is("deleted_at", null)
          .order("data_referencia", { ascending: false })
      ).data ?? [],
  });

  const sustentadas = ctrl.filter((c: any) => c.status === "Sustentado").length;
  const atencao = ctrl.filter((c: any) => c.status === "Atenção").length;
  const desvio = ctrl.filter((c: any) => c.status === "Desvio").length;
  const ganhoF = ctrl.reduce((s: number, c: any) => s + Number(c.ganho_financeiro ?? 0), 0);
  const horas = ctrl.reduce((s: number, c: any) => s + Number(c.horas_economizadas ?? 0), 0);
  const fte = ctrl.reduce((s: number, c: any) => s + Number(c.fte_preservado ?? 0), 0);

  async function add(iniciativaId: string) {
    const { error } = await supabase.from("controle_sustentacao").insert({
      iniciativa_id: iniciativaId!,
      data_referencia: new Date().toISOString().slice(0, 10),
      status: "Sustentado",
    });
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["ctrl-rows"] });
  }
  async function patch(id: string, p: any) {
    await supabase.from("controle_sustentacao").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["ctrl-rows"] });
  }
  async function remove(id: string) {
    await supabase
      .from("controle_sustentacao")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    qc.invalidateQueries({ queryKey: ["ctrl-rows"] });
  }

  const iniMap = new Map(iniciativas.map((i: any) => [i.id, i]));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Sustentadas" value={sustentadas} tone="green" />
        <Kpi label="Em Atenção" value={atencao} tone="yellow" />
        <Kpi label="Desvio" value={desvio} tone="red" />
        <Kpi
          label="Ganho Sustentado"
          value={ganhoF.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        />
        <Kpi label="Horas Econ." value={horas.toFixed(0)} tone="blue" />
        <Kpi label="FTE Preservado" value={fte.toFixed(2)} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-semibold text-vibra-800">Adicionar registro para:</span>
        <select
          className={inputCls + " max-w-xs"}
          onChange={(e) => e.target.value && add(e.target.value)}
        >
          <option value="">— escolha iniciativa concluída —</option>
          {iniciativas.map((i: any) => (
            <option key={i.id} value={i.id}>
              {i.codigo ?? ""} {i.titulo}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[1000px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              {[
                "Iniciativa",
                "Data Ref.",
                "Ganho R$",
                "Horas",
                "FTE",
                "Desvio",
                "Status",
                "Observações",
                "",
              ].map((h) => (
                <th key={h} className="px-2 py-2 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ctrl.map((r: any) => {
              const ini: any = iniMap.get(r.iniciativa_id);
              return (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-2 py-1">
                    {ini?.codigo ?? ""} {ini?.titulo ?? "—"}
                  </td>
                  <td className="px-2 py-1 w-36">
                    <input
                      type="date"
                      className={inputCls}
                      defaultValue={r.data_referencia ?? ""}
                      onBlur={(e) => patch(r.id, { data_referencia: e.target.value })}
                    />
                  </td>
                  <td className="px-2 py-1 w-28">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.ganho_financeiro ?? 0}
                      onBlur={(e) => patch(r.id, { ganho_financeiro: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.horas_economizadas ?? 0}
                      onBlur={(e) => patch(r.id, { horas_economizadas: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      step="0.1"
                      className={inputCls}
                      defaultValue={r.fte_preservado ?? 0}
                      onBlur={(e) => patch(r.id, { fte_preservado: Number(e.target.value) })}
                    />
                  </td>
                  <td className="px-2 py-1 w-20">
                    <input
                      type="number"
                      className={inputCls}
                      defaultValue={r.desvio ?? 0}
                      onBlur={(e) => patch(r.id, { desvio: Number(e.target.value) })}
                    />
                  </td>
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
                  <td className="px-2 py-1">
                    <input
                      className={inputCls}
                      defaultValue={r.observacoes ?? ""}
                      onBlur={(e) => patch(r.id, { observacoes: e.target.value })}
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
            {ctrl.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhum registro de sustentação.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
