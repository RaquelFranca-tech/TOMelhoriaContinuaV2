import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { RequireIniciativa, Section, inputCls } from "./_shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Conteudo = {
  pdca?: { plan?: string; do?: string; check?: string; act?: string };
  porques?: string[];
  ishikawa?: {
    metodo?: string;
    maquina?: string;
    material?: string;
    mao_obra?: string;
    medicao?: string;
    meio_ambiente?: string;
  };
};

export function CausaRaizTab() {
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
    queryKey: ["causa", iniciativaId],
    queryFn: async () =>
      (
        await supabase
          .from("causa_raiz")
          .select("*")
          .eq("iniciativa_id", iniciativaId!)
          .maybeSingle()
      ).data,
  });
  const [c, setC] = useState<Conteudo>({});
  useEffect(() => {
    setC((data?.conteudo as any) ?? {});
  }, [data]);

  async function save() {
    const payload = { iniciativa_id: iniciativaId!, metodologia: "todas", conteudo: c };
    const { error } = data?.id
      ? await supabase.from("causa_raiz").update(payload).eq("id", data.id)
      : await supabase.from("causa_raiz").insert(payload);
    if (error) toast.error(error.message);
    else {
      toast.success("Salvo");
      qc.invalidateQueries({ queryKey: ["causa"] });
    }
  }
  const upd = (k: keyof Conteudo, v: any) =>
    setC((prev) => ({ ...prev, [k]: { ...(prev[k] as any), ...v } }));

  return (
    <div className="space-y-4">
      <Section title="PDCA — Ciclo de Melhoria">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["plan", "P — PLAN"],
            ["do", "D — DO"],
            ["check", "C — CHECK"],
            ["act", "A — ACT"],
          ].map(([k, l]) => (
            <div key={k}>
              <p className="mb-1 text-[11px] font-bold text-vibra-700">{l}</p>
              <textarea
                className={inputCls + " min-h-[80px]"}
                value={(c.pdca as any)?.[k] ?? ""}
                onChange={(e) => upd("pdca", { [k]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="5 Porquês">
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-20 text-[11px] font-bold text-vibra-700">Por quê {i + 1}</span>
              <input
                className={inputCls}
                value={c.porques?.[i] ?? ""}
                onChange={(e) => {
                  const arr = [...(c.porques ?? [])];
                  arr[i] = e.target.value;
                  setC((p) => ({ ...p, porques: arr }));
                }}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Ishikawa — Espinha de Peixe (6M)">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["metodo", "Método"],
            ["maquina", "Máquina"],
            ["material", "Material"],
            ["mao_obra", "Mão de Obra"],
            ["medicao", "Medição"],
            ["meio_ambiente", "Meio Ambiente"],
          ].map(([k, l]) => (
            <div key={k}>
              <p className="mb-1 text-[11px] font-bold text-vibra-700">🔹 {l}</p>
              <textarea
                className={inputCls + " min-h-[70px]"}
                value={(c.ishikawa as any)?.[k] ?? ""}
                onChange={(e) => upd("ishikawa", { [k]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end">
        <button
          onClick={save}
          className="rounded-md bg-vibra-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-vibra-800"
        >
          Salvar Análise
        </button>
      </div>
    </div>
  );
}
