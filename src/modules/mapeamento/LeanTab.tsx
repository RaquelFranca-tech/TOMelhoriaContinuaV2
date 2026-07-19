import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, Section } from "./_shared";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { VIBRA } from "@/lib/vibraColors";
import { toast } from "sonner";

const KEYS = [
  ["espera", "Espera"],
  ["defeitos", "Retrabalho"],
  ["transporte", "Transporte"],
  ["movimentacao", "Movimentação"],
  ["estoque", "Estoque"],
  ["superproducao", "Superprodução"],
  ["superprocessamento", "Processamento Excessivo"],
  ["talento", "Talentos Não Aproveitados"],
] as const;

export function LeanTab() {
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
    queryKey: ["lean", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("lean_avaliacoes")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      ).data,
  });
  const [vals, setVals] = useState<Record<string, number>>({});
  useEffect(() => {
    const v: Record<string, number> = {};
    KEYS.forEach(([k]) => {
      v[k] = (data as any)?.[k] ?? 0;
    });
    setVals(v);
  }, [data]);

  async function save() {
    const payload: any = { iniciativa_id: iniciativaId!, ...vals };
    const { error } = data?.id
      ? await supabase.from("lean_avaliacoes").update(payload).eq("id", data.id)
      : await supabase.from("lean_avaliacoes").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Salvo");
      qc.invalidateQueries({ queryKey: ["lean"] });
    }
  }

  const radarData = KEYS.map(([k, l]) => ({ subject: l, score: vals[k] ?? 0 }));
  const ranking = [...KEYS]
    .map(([k, l]) => ({ k, l, score: vals[k] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Radar dos 8 Desperdícios">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 9 }} />
              <Radar dataKey="score" stroke={VIBRA.green} fill={VIBRA.green} fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </Section>
        <Section title="Ranking de Criticidade">
          <div className="space-y-1.5">
            {ranking.map((r, i) => (
              <div key={r.k} className="flex items-center gap-2 text-[12px]">
                <span className="w-6 font-bold text-vibra-700">{i + 1}º</span>
                <span className="w-44 truncate">{r.l}</span>
                <div className="flex-1 h-2 rounded-full bg-vibra-50">
                  <div
                    className="h-2 rounded-full bg-vibra-600"
                    style={{ width: `${(r.score / 5) * 100}%` }}
                  />
                </div>
                <span className="w-10 text-right font-bold">{r.score}/5</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <Section title="Configurar Pontuações (1-5)">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {KEYS.map(([k, l]) => (
            <label key={k} className="rounded-lg border border-border bg-vibra-50/40 p-2">
              <p className="text-[11px] font-bold text-vibra-700">{l}</p>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={vals[k] ?? 0}
                  onChange={(e) => setVals((v) => ({ ...v, [k]: Number(e.target.value) }))}
                  className="flex-1"
                />
                <span className="w-6 text-right text-[12px] font-bold text-vibra-800">
                  {vals[k] ?? 0}
                </span>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={save}
            className="rounded-md bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800"
          >
            Salvar Avaliação
          </button>
        </div>
      </Section>
    </div>
  );
}
