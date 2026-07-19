import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { useState, useMemo } from "react";
import { AlertTriangle, Clock, Link2, Search, Plus } from "lucide-react";
import { VIBRA } from "@/lib/vibraColors";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { syncHierarchyProgress } from "@/lib/progressSync";

const STATUS = ["Em Andamento", "Concluída", "Atrasada", "Bloqueada"];

export function AcoesTab() {
  const qc = useQueryClient();
  const { projetoIds } = useHierarchy();
  const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
  const [q, setQ] = useState("");
  useRealtimeTable("iniciativas", [["acoes-ini"]]);
  useRealtimeTable("tarefas", [["acoes-list"]]);

  const [diretoria, setDiretoria] = useState("");
  const [gerencia, setGerencia] = useState("");

  const { data: macros = [] } = useQuery({
    queryKey: ["acoes-macros"],
    queryFn: async () =>
      (await supabase.from("projetos").select("id,nome").is("deleted_at", null)).data ?? [],
  });

  const { data: iniciativas = [] } = useQuery({
    queryKey: ["acoes-ini", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let qy = supabase
        .from("iniciativas")
        .select("id,titulo,projeto_id,diretoria,gerencia,data_inicio,data_fim_prevista")
        .is("deleted_at", null);
      if (selectedProjetoIds) qy = qy.in("projeto_id", selectedProjetoIds);
      return (await qy).data ?? [];
    },
  });

  const { data: acoes = [] } = useQuery({
    queryKey: ["acoes-list", iniciativas.map((i) => i.id).join(",")],
    enabled: iniciativas.length > 0,
    queryFn: async () => {
      const { data } = await supabase
        .from("tarefas")
        .select(
          "id,titulo,status,iniciativa_id,responsavel_id,data_inicio,data_fim_prevista,data_fim_real,percentual_avanco,descricao",
        )
        .in(
          "iniciativa_id",
          iniciativas.map((i) => i.id),
        )
        .order("data_fim_prevista", { ascending: true });
      return data ?? [];
    },
  });

  const iniMap = new Map(iniciativas.map((i) => [i.id, i]));

  const filtered = useMemo(
    () =>
      acoes.filter((a) => {
        const ini = a.iniciativa_id ? iniMap.get(a.iniciativa_id) : undefined;
        if (diretoria && ini?.diretoria !== diretoria) return false;
        if (gerencia && ini?.gerencia !== gerencia) return false;
        if (
          q &&
          !(
            a.titulo?.toLowerCase().includes(q.toLowerCase()) ||
            a.descricao?.toLowerCase().includes(q.toLowerCase())
          )
        )
          return false;
        return true;
      }),
    [acoes, q, diretoria, gerencia, iniMap],
  );

  const atrasadas = filtered.filter(
    (a) =>
      a.data_fim_prevista &&
      new Date(a.data_fim_prevista) < new Date() &&
      !/conclu/i.test(a.status ?? ""),
  );
  const bloqueadas = filtered.filter((a) => /bloq/i.test(a.status ?? ""));
  const concluidas = filtered.filter((a) => /conclu/i.test(a.status ?? ""));
  const andamento = filtered.filter((a) => /andamento/i.test(a.status ?? ""));

  // por responsavel
  const byResp = new Map<string, number>();
  filtered.forEach((a) => {
    const k = a.responsavel_id ?? "—";
    byResp.set(k, (byResp.get(k) ?? 0) + 1);
  });
  const respData = [...byResp.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([nome, qtd]) => ({ nome: nome.slice(0, 8), qtd }));

  async function updateStatus(id: string, status: string) {
    const patch: any = { status };
    if (/conclu/i.test(status)) patch.data_fim_real = new Date().toISOString().slice(0, 10);
    const { error } = await supabase.from("tarefas").update(patch).eq("id", id);
    if (error) {
      toast.error("Falha ao atualizar");
    } else {
      await syncHierarchyProgress({ taskId: id });
      qc.invalidateQueries({ queryKey: ["acoes-list"] });
    }
  }

  const diretorias = [...new Set(iniciativas.map((i) => i.diretoria).filter(Boolean))] as string[];
  const gerencias = [...new Set(iniciativas.map((i) => i.gerencia).filter(Boolean))] as string[];

  return (
    <div className="space-y-4">
      {/* Alertas inteligentes */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Alert
          tone="orange"
          icon={Clock}
          text={`${atrasadas.length} ação(ões) em atraso — Reagendar ou Repriorizar`}
        />
        <Alert
          tone="red"
          icon={AlertTriangle}
          text={`${bloqueadas.length} bloqueadas — destravar dependências`}
        />
        <Alert
          tone="blue"
          icon={Link2}
          text={`${filtered.length} ações no escopo atual (filtros)`}
        />
      </div>

      {/* Mini-placares */}
      <div className="grid gap-3 sm:grid-cols-5">
        {[
          ["Total", filtered.length, "bg-vibra-100 text-vibra-800"],
          ["Em Andamento", andamento.length, "bg-blue-100 text-blue-800"],
          ["Atrasadas", atrasadas.length, "bg-orange-100 text-orange-800"],
          ["Bloqueadas", bloqueadas.length, "bg-red-100 text-red-700"],
          ["Concluídas", concluidas.length, "bg-emerald-100 text-emerald-800"],
        ].map(([l, v, c]) => (
          <div
            key={l as string}
            className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {l as string}
            </p>
            <p
              className={`mt-1 inline-block rounded-md px-2 py-0.5 text-[20px] font-bold ${c as string}`}
            >
              {v as number}
            </p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome/descrição…"
              className="w-full rounded-md border border-input bg-white py-1.5 pl-8 pr-3 text-[12.5px] outline-none focus:border-vibra-600"
            />
          </div>
          <select
            value={diretoria}
            onChange={(e) => setDiretoria(e.target.value)}
            className="rounded-md border border-input bg-white px-2 py-1.5 text-[12px]"
          >
            <option value="">Diretoria — todas</option>
            {diretorias.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={gerencia}
            onChange={(e) => setGerencia(e.target.value)}
            className="rounded-md border border-input bg-white px-2 py-1.5 text-[12px]"
          >
            <option value="">Gerência — todas</option>
            {gerencias.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="min-w-[900px] w-full text-[12px]">
          <thead className="bg-vibra-50 text-[10.5px] uppercase tracking-wider text-vibra-800">
            <tr>
              <th className="px-3 py-2 text-left">Ação</th>
              <th className="px-3 py-2 text-left">Iniciativa</th>
              <th className="px-3 py-2 text-left">Diretoria</th>
              <th className="px-3 py-2 text-left">Início</th>
              <th className="px-3 py-2 text-left">Prazo</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">%</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const ini = a.iniciativa_id ? iniMap.get(a.iniciativa_id) : undefined;
              const atr =
                a.data_fim_prevista &&
                new Date(a.data_fim_prevista) < new Date() &&
                !/conclu/i.test(a.status ?? "");
              return (
                <tr key={a.id} className="border-t border-border hover:bg-vibra-50/40">
                  <td className="px-3 py-2 font-semibold text-vibra-800">{a.titulo}</td>
                  <td className="px-3 py-2 text-muted-foreground">{ini?.titulo ?? "—"}</td>
                  <td className="px-3 py-2">{ini?.diretoria ?? "—"}</td>
                  <td className="px-3 py-2">{a.data_inicio ?? "—"}</td>
                  <td className={`px-3 py-2 ${atr ? "font-bold text-orange-700" : ""}`}>
                    {a.data_fim_prevista ?? "—"}
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={a.status ?? ""}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className="rounded-md border border-input bg-white px-1.5 py-0.5 text-[11px]"
                    >
                      <option value="">—</option>
                      {STATUS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">{Number(a.percentual_avanco ?? 0).toFixed(0)}%</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                  Nenhuma ação no filtro atual.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Gráfico por Responsável */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <h3 className="mb-3 text-[13px] font-bold text-vibra-800">
          Ações por Responsável (Top 10)
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={respData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="nome" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="qtd" fill={VIBRA.green} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Alert({
  tone,
  icon: Ic,
  text,
}: {
  tone: "orange" | "red" | "blue";
  icon: any;
  text: string;
}) {
  const cls = {
    orange: "bg-orange-50 text-orange-800 border-orange-200",
    red: "bg-red-50 text-red-700 border-red-200",
    blue: "bg-blue-50 text-blue-800 border-blue-200",
  }[tone];
  return (
    <div
      className={`flex items-start gap-2 rounded-xl border p-3 text-[12px] font-semibold ${cls}`}
    >
      <Ic className="mt-0.5 h-4 w-4 shrink-0" /> <span>{text}</span>
    </div>
  );
}
