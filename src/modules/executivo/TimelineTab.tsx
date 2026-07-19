import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { colorForId } from "@/lib/vibraColors";
import { AlertTriangle } from "lucide-react";

type Ini = {
  id: string;
  titulo: string | null;
  codigo: string | null;
  status: string | null;
  percentual_avanco: number | null;
  data_inicio: string | null;
  data_inicio_real: string | null;
  data_fim_prevista: string | null;
  data_fim_real: string | null;
  projeto_id: string | null;
  impedimento: string | null;
};

function toTs(d?: string | null) {
  if (!d) return null;
  const t = new Date(d).getTime();
  return isNaN(t) ? null : t;
}

export function TimelineTab() {
  const { projetoIds } = useHierarchy();
  const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;

  const { data: projetos = [] } = useQuery({
    queryKey: ["tl-projetos"],
    queryFn: async () =>
      (await supabase.from("projetos").select("id,nome").is("deleted_at", null).order("nome"))
        .data ?? [],
  });

  const { data: iniciativasRaw = [] } = useQuery({
    queryKey: ["tl-ini-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("iniciativas")
        .select(
          "id,titulo,codigo,status,percentual_avanco,data_inicio,data_inicio_real,data_fim_prevista,data_fim_real,projeto_id,impedimento",
        )
        .is("deleted_at", null);
      return (data ?? []) as Ini[];
    },
  });

  const iniciativas = useMemo(() => {
    const filtered = !selectedProjetoIds
      ? iniciativasRaw
      : iniciativasRaw.filter((i) => i.projeto_id && selectedProjetoIds.includes(i.projeto_id));
    // precisa ter ao menos uma data (previsto ou real)
    return filtered.filter(
      (i) => i.data_inicio || i.data_inicio_real || i.data_fim_prevista || i.data_fim_real,
    );
  }, [iniciativasRaw, selectedProjetoIds]);

  const procMap = useMemo(() => new Map(projetos.map((p) => [p.id, p.nome])), [projetos]);
  const projetosVisiveis = useMemo(() => {
    const ids = new Set(iniciativas.map((i) => i.projeto_id).filter(Boolean) as string[]);
    return projetos.filter((p) => ids.has(p.id));
  }, [projetos, iniciativas]);

  const { minD, maxD, total } = useMemo(() => {
    const all = iniciativas.flatMap((i) =>
      [i.data_inicio, i.data_inicio_real, i.data_fim_prevista, i.data_fim_real]
        .map(toTs)
        .filter((x): x is number => x !== null),
    );
    const min = all.length ? Math.min(...all) : Date.now();
    const max = all.length ? Math.max(...all) : Date.now();
    return { minD: new Date(min), maxD: new Date(max), total: Math.max(1, max - min) };
  }, [iniciativas]);

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[13px] font-bold text-vibra-800">Timeline · Roadmap das Iniciativas</h3>
        <span className="text-[10.5px] text-muted-foreground">
          {minD.toLocaleDateString("pt-BR")} → {maxD.toLocaleDateString("pt-BR")}
        </span>
      </div>

      {/* Legenda Previsto × Real */}
      <div className="mb-3 flex flex-wrap items-center gap-3 rounded-md bg-vibra-50/60 px-3 py-2 text-[10.5px] text-vibra-800">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-6 rounded border border-dashed border-vibra-400/80 bg-white"
            style={{ backgroundColor: "rgba(224, 242, 254, 0.4)" }}
          />
          Previsto (Cor Clara)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-flex h-2.5 w-10 rounded overflow-hidden bg-slate-200 border border-slate-300">
            <span className="h-full w-3/5 bg-vibra-600" />
          </span>
          Real (Barra de Progresso / Cor Escura)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Início no prazo
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
          Atrasado
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
          Adiantado
        </span>
      </div>

      {/* Chips de projetos visíveis (legenda multi-projeto) */}
      {projetosVisiveis.length > 1 && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {projetosVisiveis.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2 py-0.5 text-[10.5px] font-semibold text-vibra-800"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: colorForId(p.id) }} />
              {p.nome}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {iniciativas.map((i) => {
          const sP = toTs(i.data_inicio);
          const eP = toTs(i.data_fim_prevista);
          const sR = toTs(i.data_inicio_real);
          const eR = toTs(i.data_fim_real);
          const color = colorForId(i.projeto_id);
          const procNome = procMap.get(i.projeto_id ?? "") ?? "—";

          const pct = (t: number) => ((t - minD.getTime()) / total) * 100;

          // Faixa prevista
          const prevStart = sP ?? eP;
          const prevEnd = eP ?? sP;
          const prevLeft = prevStart ? pct(prevStart) : 0;
          const prevWidth = prevStart && prevEnd ? Math.max(1, pct(prevEnd) - prevLeft) : 0;

          // Faixa real (até hoje se ainda não tem fim real)
          const today = Date.now();
          const realStart = sR;
          const realEnd = eR ?? (sR ? Math.min(today, eP ?? today) : null);
          const realLeft = realStart ? pct(realStart) : 0;
          const realWidth = realStart && realEnd ? Math.max(1, pct(realEnd) - realLeft) : 0;

          // Sinais de início/entrega
          const inicioAtrasado = sP && sR && sR > sP;
          const inicioAdiantado = sP && sR && sR < sP;
          const entregaAtrasada = eP && eR && eR > eP;
          const entregaAdiantada = eP && eR && eR < eP;
          const emAtraso = !eR && eP && eP < today && !/conclu/i.test(i.status ?? "");

          return (
            <div key={i.id} className="grid grid-cols-[220px_1fr_70px] items-center gap-3">
              <div className="min-w-0 text-[11px]">
                <p className="truncate font-semibold text-vibra-800">{i.titulo}</p>
                <p className="flex items-center gap-1 truncate text-[10px] text-muted-foreground">
                  <span
                    className="inline-block h-2 w-2 shrink-0 rounded-full"
                    style={{ background: color }}
                  />
                  {procNome}
                </p>
              </div>

              <div className="relative h-9 rounded-md bg-vibra-50/50">
                {/* Barra prevista (cor clara do projeto, contorno tracejado) */}
                {prevWidth > 0 && (
                  <div
                    className="absolute top-1 h-3 rounded border border-dashed transition-all duration-300"
                    style={{
                      left: `${prevLeft}%`,
                      width: `${prevWidth}%`,
                      backgroundColor: `${color}20`, // Light tint (12% opacity) of the project color
                      borderColor: `${color}80`, // Semi-transparent border of the project color
                    }}
                    title={`Previsto: ${i.data_inicio ?? "?"} → ${i.data_fim_prevista ?? "?"}`}
                  />
                )}

                {/* Barra real (barra de progresso com cor escura/sólida) */}
                {realWidth > 0 && (
                  <div
                    className="absolute top-5 h-3 rounded overflow-hidden transition-all duration-300 bg-slate-100"
                    style={{
                      left: `${realLeft}%`,
                      width: `${realWidth}%`,
                      backgroundColor: `${color}35`, // Light track background (20% opacity)
                    }}
                    title={`Real: ${i.data_inicio_real ?? "?"} → ${i.data_fim_real ?? "em andamento"} (${Number(i.percentual_avanco ?? 0)}%)`}
                  >
                    {/* Barra de progresso preenchendo o percentual em andamento */}
                    <div
                      className="h-full rounded transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Number(i.percentual_avanco ?? 0))}%`,
                        backgroundColor: emAtraso ? "#FF6900" : color, // Full/dark project color
                      }}
                    />
                  </div>
                )}

                {/* Marcador de início (real) */}
                {sR && (
                  <span
                    className={`absolute top-0 h-9 w-[2px] ${inicioAtrasado ? "bg-orange-500" : inicioAdiantado ? "bg-sky-500" : "bg-emerald-500"}`}
                    style={{ left: `${pct(sR)}%` }}
                    title={`Início real: ${i.data_inicio_real}`}
                  />
                )}
                {/* Marcador de início previsto */}
                {sP && (
                  <span
                    className="absolute top-0 h-9 w-[2px] border-l-2 border-dashed border-vibra-700/60"
                    style={{ left: `${pct(sP)}%` }}
                    title={`Início previsto: ${i.data_inicio}`}
                  />
                )}
                {/* Marcador de entrega real */}
                {eR && (
                  <span
                    className={`absolute top-0 h-9 w-[2px] ${entregaAtrasada ? "bg-orange-500" : entregaAdiantada ? "bg-sky-500" : "bg-emerald-500"}`}
                    style={{ left: `${pct(eR)}%` }}
                    title={`Entrega real: ${i.data_fim_real}`}
                  />
                )}
                {/* Marcador de entrega prevista */}
                {eP && (
                  <span
                    className="absolute top-0 h-9 w-[2px] border-l-2 border-dashed border-vibra-700/60"
                    style={{ left: `${pct(eP)}%` }}
                    title={`Entrega prevista: ${i.data_fim_prevista}`}
                  />
                )}

                {i.impedimento && (
                  <span
                    title={i.impedimento}
                    className="absolute -top-1 text-[10px]"
                    style={{
                      left: `${Math.min(98, prevLeft + prevWidth || realLeft + realWidth)}%`,
                    }}
                  >
                    <AlertTriangle className="h-3 w-3 text-orange-600" />
                  </span>
                )}
              </div>

              <div className="text-right text-[11px] font-semibold text-vibra-800">
                {Number(i.percentual_avanco ?? 0).toFixed(0)}%
              </div>
            </div>
          );
        })}

        {iniciativas.length === 0 && (
          <p className="py-10 text-center text-[12px] text-muted-foreground">
            Sem iniciativas com data definida no escopo atual.
          </p>
        )}
      </div>
    </div>
  );
}
