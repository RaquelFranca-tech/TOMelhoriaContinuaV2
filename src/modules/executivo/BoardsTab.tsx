import { useMemo, useState, type DragEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { useHierarchy } from "@/stores/hierarchy";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VIBRA } from "@/lib/vibraColors";
import {
  Download,
  Edit3,
  Eye,
  FileJson,
  Grip,
  LayoutGrid,
  Plus,
  Send,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const TEMPLATES = [
  {
    tipo: "executivo",
    nome: "Executivo",
    descricao: "KPIs estratégicos, status, ganho financeiro e ranking.",
    widgets: [
      {
        tipo: "kpi",
        titulo: "Total de Iniciativas",
        config: { source: "iniciativas", agg: "count" },
      },
      {
        tipo: "kpi",
        titulo: "Ganho Financeiro (R$)",
        config: { source: "iniciativas", agg: "sum", field: "ganho_financeiro", format: "money" },
      },
      {
        tipo: "bar",
        titulo: "Iniciativas por Status",
        config: { source: "iniciativas", agg: "count", groupBy: "status" },
      },
      {
        tipo: "pie",
        titulo: "Iniciativas por Diretoria",
        config: { source: "iniciativas", agg: "count", groupBy: "diretoria" },
      },
    ],
  },
  {
    tipo: "operacional",
    nome: "Operacional",
    descricao: "Tarefas, status, atrasos e responsáveis.",
    widgets: [
      { tipo: "kpi", titulo: "Total de Tarefas", config: { source: "tarefas", agg: "count" } },
      {
        tipo: "kpi",
        titulo: "% Avanço médio",
        config: { source: "tarefas", agg: "avg", field: "percentual_avanco", format: "percent" },
      },
      {
        tipo: "bar",
        titulo: "Tarefas por Status",
        config: { source: "tarefas", agg: "count", groupBy: "status" },
      },
      {
        tipo: "table",
        titulo: "Tarefas recentes",
        config: { source: "tarefas", columns: ["titulo", "status", "data_fim_prevista"] },
      },
    ],
  },
  {
    tipo: "estrategico",
    nome: "Estratégico",
    descricao: "Ganhos, metas, prioridades e evolução.",
    widgets: [
      {
        tipo: "kpi",
        titulo: "Ganho de Horas",
        config: { source: "iniciativas", agg: "sum", field: "ganho_horas" },
      },
      {
        tipo: "bar",
        titulo: "Ganho por Diretoria",
        config: {
          source: "iniciativas",
          agg: "sum",
          field: "ganho_financeiro",
          groupBy: "diretoria",
          format: "money",
        },
      },
      {
        tipo: "line",
        titulo: "Iniciativas por mês",
        config: { source: "iniciativas", agg: "count", groupBy: "mes_inicio" },
      },
      {
        tipo: "pie",
        titulo: "Iniciativas por Prioridade",
        config: { source: "iniciativas", agg: "count", groupBy: "prioridade" },
      },
    ],
  },
];

const SOURCES = [
  {
    id: "iniciativas",
    label: "Iniciativas",
    fields: [
      "status",
      "prioridade",
      "diretoria",
      "gerencia",
      "macroprocesso",
      "responsavel",
      "percentual_avanco",
      "ganho_financeiro",
      "ganho_horas",
      "mes_inicio",
    ],
    numeric: ["percentual_avanco", "ganho_financeiro", "ganho_horas"],
  },
  {
    id: "tarefas",
    label: "Tarefas",
    fields: ["status", "diretoria", "percentual_avanco", "responsavel_id"],
    numeric: ["percentual_avanco"],
  },
] as const;

const CHART_TYPES = [
  { id: "kpi", label: "KPI", icon: "🔢" },
  { id: "bar", label: "Barras", icon: "📊" },
  { id: "line", label: "Linha", icon: "📈" },
  { id: "donut", label: "Donut", icon: "🍩" },
  { id: "pie", label: "Pizza", icon: "🥧" },
  { id: "table", label: "Tabela", icon: "📋" },
  { id: "progress", label: "Progresso", icon: "⏳" },
];

const COLORS = [
  VIBRA.green,
  VIBRA.yellow,
  "#0a6c3a",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#06b6d4",
  "#84cc16",
];

function formatVal(v: number, fmt?: string) {
  if (fmt === "money")
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });
  if (fmt === "percent") return `${v.toFixed(1)}%`;
  return v.toLocaleString("pt-BR");
}

function useWidgetData(config: any, selProj: string[] | null) {
  return useQuery({
    queryKey: ["widget-data", config?.source, selProj?.join(",") ?? "_all"],
    enabled: !!config?.source,
    queryFn: async () => {
      let qy = supabase.from(config.source as any).select("*");
      if (config.source !== "equipe") qy = qy.is("deleted_at", null);
      if (selProj) {
        if (config.source === "iniciativas") qy = qy.in("projeto_id", selProj);
      }
      const { data } = await qy.limit(2000);
      return data ?? [];
    },
  });
}

function computeKPI(rows: any[], config: any) {
  if (!rows.length) return 0;
  if (config.agg === "count") return rows.length;
  const vals = rows.map((r) => Number(r[config.field] ?? 0)).filter((v) => !isNaN(v));
  if (!vals.length) return 0;
  if (config.agg === "sum") return vals.reduce((a, b) => a + b, 0);
  if (config.agg === "avg") return vals.reduce((a, b) => a + b, 0) / vals.length;
  if (config.agg === "max") return Math.max(...vals);
  if (config.agg === "min") return Math.min(...vals);
  return 0;
}

function computeGrouped(rows: any[], config: any) {
  const map = new Map<string, { name: string; value: number; _count: number; _sum: number }>();
  for (const r of rows) {
    let key = "—";
    if (config.groupBy === "mes_inicio") {
      const d = r.data_inicio || r.created_at;
      key = d ? new Date(d).toISOString().slice(0, 7) : "—";
    } else key = String(r[config.groupBy] ?? "—");
    const cur = map.get(key) ?? { name: key, value: 0, _count: 0, _sum: 0 };
    cur._count += 1;
    cur._sum += Number(r[config.field] ?? 0);
    cur.value =
      config.agg === "count" ? cur._count : config.agg === "avg" ? cur._sum / cur._count : cur._sum;
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.value - a.value).slice(0, 12);
}

function WidgetPreview({ widget }: { widget: any }) {
  const { projetoIds } = useHierarchy();
  const selProj = projetoIds && projetoIds.length > 0 ? projetoIds : null;
  const config = widget.config ?? {};
  const { data: rows = [], isLoading } = useWidgetData(config, selProj);

  if (!config.source)
    return (
      <div className="grid h-full place-content-center text-[10.5px] text-muted-foreground">
        Configure a fonte de dados
      </div>
    );
  if (isLoading)
    return (
      <div className="grid h-full place-content-center text-[10.5px] text-muted-foreground">
        Carregando…
      </div>
    );

  if (widget.tipo === "kpi") {
    const v = computeKPI(rows, config);
    return (
      <div className="grid h-full place-content-center text-center">
        <p className="text-[26px] font-extrabold leading-none text-vibra-800">
          {formatVal(v, config.format)}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          {config.agg} {config.field ?? ""}
        </p>
      </div>
    );
  }
  if (widget.tipo === "progress") {
    const v = Math.min(100, computeKPI(rows, config));
    return (
      <div className="flex h-full flex-col justify-center gap-1">
        <div className="flex justify-between text-[11px] font-bold text-vibra-800">
          <span>Progresso</span>
          <span>{v.toFixed(0)}%</span>
        </div>
        <div className="h-3 rounded-full bg-muted">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-vibra-700 to-vibra-yellow"
            style={{ width: `${v}%` }}
          />
        </div>
      </div>
    );
  }
  if (widget.tipo === "table") {
    const cols = (config.columns ?? Object.keys(rows[0] ?? {}).slice(0, 4)) as string[];
    return (
      <div className="h-full overflow-auto">
        <table className="w-full text-[10.5px]">
          <thead className="bg-vibra-50 text-[9.5px] uppercase text-vibra-800">
            <tr>
              {cols.map((c) => (
                <th key={c} className="px-2 py-1 text-left">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 12).map((r: any, i: number) => (
              <tr key={i} className="border-t border-border">
                {cols.map((c) => (
                  <td key={c} className="px-2 py-1">
                    {String(r[c] ?? "—").slice(0, 30)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  const data = computeGrouped(rows, config);
  if (widget.tipo === "bar")
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} />
          <Tooltip />
          <Bar dataKey="value" fill={VIBRA.green} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  if (widget.tipo === "line")
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={VIBRA.green} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  if (widget.tipo === "pie" || widget.tipo === "donut")
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius={widget.tipo === "donut" ? "50%" : 0}
            label={{ fontSize: 9 }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: 9 }} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  return null;
}

export function BoardsTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  const [openEdit, setOpenEdit] = useState<string | null>(null);
  const [transferId, setTransferId] = useState<string | null>(null);

  // Local states for inline / dialog input (bypassing prompt which fails in iframes)
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [isImportingBoard, setIsImportingBoard] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");

  useRealtimeTable("boards", [["boards"]]);
  useRealtimeTable("board_widgets", [["board-widgets"]]);

  const { data: boards = [] } = useQuery({
    queryKey: ["boards"],
    queryFn: async () =>
      (await supabase.from("boards").select("*").is("deleted_at", null).order("created_at")).data ??
      [],
  });

  const concluidos = boards.filter((b: any) => b.situacao === "Aprovado");
  const abas = [...new Set(boards.map((b: any) => b.aba_destino).filter(Boolean))] as string[];

  async function criarFromTemplate(t: (typeof TEMPLATES)[number]) {
    const existing = boards.find((b: any) => b.tipo === t.tipo && b.nome === t.nome);
    if (existing) return setOpenEdit(existing.id);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("boards")
      .insert({
        nome: t.nome,
        descricao: t.descricao,
        tipo: t.tipo,
        publico: true,
        created_by: user?.id,
        layout: { columns: 12, rows: 8, labels: { titulo: t.nome }, legends: [] },
        situacao: "Rascunho",
      } as any)
      .select("id")
      .single();
    if (error) return toast.error(error.message);
    await supabase.from("board_widgets").insert(
      t.widgets.map((w, idx) => ({
        board_id: data.id,
        tipo: w.tipo,
        titulo: w.titulo,
        pos_x: (idx % 2) * 6,
        pos_y: Math.floor(idx / 2) * 4,
        largura: 6,
        altura: 4,
        config: w.config,
      })) as any,
    );
    toast.success("Modelo aberto para edição");
    qc.invalidateQueries({ queryKey: ["boards"] });
    setOpenEdit(data.id);
  }

  async function novoBranco(nome: string) {
    if (!nome || !nome.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("boards")
      .insert({
        nome: nome.trim(),
        tipo: "custom",
        created_by: user?.id,
        layout: { columns: 12, rows: 8, labels: {}, legends: [] },
        situacao: "Rascunho",
      } as any)
      .select("id")
      .single();
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["boards"] });
    setOpenEdit(data.id);
  }

  async function importarJSON(txt: string) {
    if (!txt || !txt.trim()) return;
    try {
      const parsed = JSON.parse(txt);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("boards")
        .insert({
          nome: parsed.nome ?? "Board Importado",
          tipo: "import",
          created_by: user?.id,
          layout: parsed.layout ?? parsed,
          situacao: "Rascunho",
        } as any)
        .select("id")
        .single();
      if (parsed.widgets?.length)
        await supabase
          .from("board_widgets")
          .insert(parsed.widgets.map((w: any) => ({ ...w, id: undefined, board_id: data?.id })));
      toast.success("Board importado");
      qc.invalidateQueries({ queryKey: ["boards"] });
    } catch {
      toast.error("JSON inválido");
    }
  }

  function exportar(board: any) {
    const blob = new Blob([JSON.stringify(board, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${board.nome}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function remover(id: string) {
    if (!(await confirm("Excluir board?", "Tem certeza que deseja excluir este board?"))) return;
    await supabase.from("boards").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["boards"] });
  }

  async function transferir(boardId: string, aba: string) {
    await supabase.from("boards").update({ aba_destino: aba }).eq("id", boardId);
    toast.success("Board transferido para nova aba de visualização");
    setTransferId(null);
    qc.invalidateQueries({ queryKey: ["boards"] });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-[14px] font-bold text-vibra-800">
            Boards Executivos — Power BI Style
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Crie, edite e visualize KPIs e gráficos em tempo real com os dados do sistema.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsImportingBoard(true);
              setIsCreatingBoard(false);
            }}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-white px-3 py-1.5 text-[12px] font-semibold text-vibra-800 hover:bg-vibra-50"
          >
            <Upload className="h-3.5 w-3.5" /> Importar JSON
          </button>
          <button
            onClick={() => {
              setIsCreatingBoard(true);
              setIsImportingBoard(false);
            }}
            className="inline-flex items-center gap-1 rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800"
          >
            <Plus className="h-3.5 w-3.5" /> Novo Board
          </button>
        </div>
      </div>

      {isCreatingBoard && (
        <div className="rounded-xl border border-vibra-200 bg-vibra-50/50 p-4 shadow-sm flex flex-col gap-2 max-w-md">
          <h4 className="text-[13px] font-bold text-vibra-800">Criar Novo Board</h4>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 rounded border border-border bg-white px-2 py-1 text-[12px] outline-none focus:border-vibra-700"
              placeholder="Nome do novo board..."
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newBoardName.trim()) {
                  novoBranco(newBoardName);
                  setNewBoardName("");
                  setIsCreatingBoard(false);
                }
              }}
              autoFocus
            />
            <button
              onClick={() => {
                if (newBoardName.trim()) {
                  novoBranco(newBoardName);
                  setNewBoardName("");
                  setIsCreatingBoard(false);
                }
              }}
              className="rounded bg-vibra-700 px-3 py-1 text-[12px] font-bold text-white hover:bg-vibra-800"
            >
              Criar
            </button>
            <button
              onClick={() => {
                setIsCreatingBoard(false);
                setNewBoardName("");
              }}
              className="rounded bg-gray-200 px-3 py-1 text-[12px] text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {isImportingBoard && (
        <div className="rounded-xl border border-vibra-200 bg-vibra-50/50 p-4 shadow-sm flex flex-col gap-2 max-w-lg">
          <h4 className="text-[13px] font-bold text-vibra-800">Importar Board de JSON</h4>
          <textarea
            className="w-full rounded border border-border bg-white px-2 py-1.5 text-[11px] font-mono h-24 outline-none focus:border-vibra-700"
            placeholder='Cole aqui o JSON gerado na exportação (ex: { "nome": "...", "layout": ... })'
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setIsImportingBoard(false);
                setImportJsonText("");
              }}
              className="rounded bg-gray-200 px-3 py-1 text-[12px] text-gray-700 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (importJsonText.trim()) {
                  importarJSON(importJsonText);
                  setImportJsonText("");
                  setIsImportingBoard(false);
                }
              }}
              className="rounded bg-vibra-700 px-3 py-1 text-[12px] font-bold text-white hover:bg-vibra-800"
            >
              Importar
            </button>
          </div>
        </div>
      )}

      {concluidos.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
          <p className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-vibra-700">
            ⭐ Boards aprovados (acesso rápido)
          </p>
          <div className="flex flex-wrap gap-2">
            {concluidos.map((b: any) => (
              <div
                key={b.id}
                className="inline-flex items-center gap-1 rounded-full border border-vibra-200 bg-vibra-50 px-2 py-1 text-[12px]"
              >
                <button
                  onClick={() => setOpenEdit(b.id)}
                  className="inline-flex items-center gap-1 font-bold text-vibra-800"
                >
                  <Eye className="h-3.5 w-3.5" />
                  {b.nome}
                </button>
                <button
                  onClick={() => setTransferId(b.id)}
                  className="rounded p-0.5 text-vibra-700 hover:bg-white"
                  title="Transferir"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-3 shadow-vibra-sm">
        <p className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-vibra-700">
          📋 Modelos prontos (editáveis)
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.tipo}
              onClick={() => criarFromTemplate(t)}
              className="rounded-lg border border-border bg-white p-3 text-left transition hover:border-vibra-600 hover:shadow-vibra-sm"
            >
              <LayoutGrid className="mb-1 h-4 w-4 text-vibra-700" />
              <p className="text-[12.5px] font-bold text-vibra-800">{t.nome}</p>
              <p className="mt-0.5 text-[10.5px] text-muted-foreground">{t.descricao}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((b: any) => (
          <div
            key={b.id}
            className="group rounded-xl border border-border bg-card p-4 shadow-vibra-sm hover:shadow-vibra"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-vibra-700">
                  {b.tipo} · {b.situacao}
                </p>
                <p className="mt-0.5 text-[14px] font-bold text-vibra-800">{b.nome}</p>
                {b.descricao && (
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2">
                    {b.descricao}
                  </p>
                )}
                {b.aba_destino && (
                  <p className="mt-1 text-[10px] font-bold text-vibra-yellow">
                    📌 Aba: {b.aba_destino}
                  </p>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setOpenEdit(b.id)}
                  className="rounded p-1 text-vibra-700 hover:bg-vibra-50"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => exportar(b)}
                  className="rounded p-1 text-vibra-700 hover:bg-vibra-50"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
                {b.situacao === "Aprovado" && (
                  <button
                    onClick={() => setTransferId(b.id)}
                    className="rounded p-1 text-vibra-700 hover:bg-vibra-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => remover(b.id)}
                  className="rounded p-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {transferId && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setTransferId(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-5 shadow-vibra"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3 text-[14px] font-bold text-vibra-800">Transferir para Aba</h3>
            <label className="text-[11px] font-semibold text-vibra-800">Aba existente</label>
            <select
              id="aba-transfer"
              className="mt-1 w-full rounded-md border border-input px-3 py-2 text-[13px]"
            >
              <option value="">— Criar nova aba —</option>
              {abas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <label className="mt-2 block text-[11px] font-semibold text-vibra-800">
              Nome da nova aba (se aplicável)
            </label>
            <input
              id="nova-aba-transfer"
              placeholder="Ex.: Visão Diretoria"
              className="mt-1 w-full rounded-md border border-input px-3 py-2 text-[13px]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setTransferId(null)}
                className="rounded-md border border-border px-3 py-1.5 text-[12px]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const sel = document.getElementById("aba-transfer") as HTMLSelectElement;
                  const inp = document.getElementById("nova-aba-transfer") as HTMLInputElement;
                  transferir(transferId, sel.value || inp.value || "Nova Aba de Boards");
                }}
                className="rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white"
              >
                Transferir
              </button>
            </div>
          </div>
        </div>
      )}

      {openEdit && <BoardEditor boardId={openEdit} onClose={() => setOpenEdit(null)} />}
    </div>
  );
}

function BoardEditor({ boardId, onClose }: { boardId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const [dragId, setDragId] = useState<string | null>(null);
  const [selWidget, setSelWidget] = useState<string | null>(null);

  const { data: board } = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () =>
      (await supabase.from("boards").select("*").eq("id", boardId).maybeSingle()).data,
  });
  const { data: widgets = [] } = useQuery({
    queryKey: ["board-widgets", boardId],
    queryFn: async () =>
      (await supabase.from("board_widgets").select("*").eq("board_id", boardId).order("pos_y"))
        .data ?? [],
  });

  const layout = (board?.layout as any) ?? {};
  const labels = layout.labels ?? {};
  const selected = widgets.find((w: any) => w.id === selWidget);

  async function patchBoard(p: any) {
    await supabase.from("boards").update(p).eq("id", boardId);
    qc.invalidateQueries({ queryKey: ["boards"] });
    qc.invalidateQueries({ queryKey: ["board", boardId] });
  }
  async function patchWidget(id: string, p: any) {
    await supabase.from("board_widgets").update(p).eq("id", id);
    qc.invalidateQueries({ queryKey: ["board-widgets", boardId] });
  }
  async function addWidget(tipo: string) {
    const { data } = await supabase
      .from("board_widgets")
      .insert({
        board_id: boardId,
        tipo,
        titulo: CHART_TYPES.find((c) => c.id === tipo)?.label ?? tipo,
        pos_x: 0,
        pos_y: 0,
        largura: 6,
        altura: 4,
        config: { source: "iniciativas", agg: "count" },
      } as any)
      .select("id")
      .single();
    qc.invalidateQueries({ queryKey: ["board-widgets", boardId] });
    if (data?.id) setSelWidget(data.id);
  }
  async function removeWidget(id: string) {
    await supabase.from("board_widgets").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["board-widgets", boardId] });
    if (selWidget === id) setSelWidget(null);
  }
  async function setSituacao(situacao: string) {
    await patchBoard({
      situacao,
      concluido_em: situacao === "Aprovado" ? new Date().toISOString() : null,
    });
    toast.success(
      situacao === "Aprovado"
        ? "Board aprovado — disponível no topo da aba"
        : "Situação atualizada",
    );
  }

  const json = useMemo(() => JSON.stringify({ ...board, widgets }, null, 2), [board, widgets]);

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="absolute inset-x-2 bottom-2 top-2 flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-vibra md:inset-x-8 md:inset-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-vibra-50 px-5 py-3">
          <div className="min-w-0 flex-1">
            <input
              value={board?.nome ?? ""}
              onChange={(e) => patchBoard({ nome: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              className="rounded bg-transparent px-1 text-[15px] font-bold text-vibra-800 outline-none focus:bg-white"
            />
            <p className="text-[10.5px] text-muted-foreground">
              Editor estilo Power BI · alterações salvas automaticamente
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={board?.situacao ?? "Rascunho"}
              onChange={(e) => setSituacao(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="rounded-md border border-input bg-white px-2 py-1.5 text-[12px]"
            >
              <option>Rascunho</option>
              <option>Em Revisão</option>
              <option>Aprovado</option>
            </select>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard?.writeText(json);
                toast.success("JSON copiado");
              }}
              className="rounded-md border border-border bg-white px-2 py-1.5 text-[12px]"
            >
              <FileJson className="mr-1 inline h-3.5 w-3.5" />
              JSON
            </button>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-[200px_1fr_280px] overflow-hidden">
          {/* Left: chart types */}
          <aside
            className="overflow-auto border-r border-border bg-vibra-50/30 p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-vibra-700">
              <Sparkles className="mr-1 inline h-3 w-3" />
              Tipos de gráfico
            </p>
            {CHART_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => addWidget(t.id)}
                className="mb-1 flex w-full items-center gap-1.5 rounded-md border border-border bg-white px-2 py-1.5 text-[11.5px] font-semibold text-vibra-800 hover:bg-vibra-50"
              >
                <span>{t.icon}</span> <Plus className="h-3 w-3" /> {t.label}
              </button>
            ))}
            <div className="mt-4 space-y-2">
              <p className="text-[10.5px] font-bold uppercase tracking-widest text-vibra-700">
                Rótulos do board
              </p>
              <input
                defaultValue={labels.titulo ?? ""}
                placeholder="Título"
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) =>
                  patchBoard({
                    layout: { ...layout, labels: { ...labels, titulo: e.target.value } },
                  })
                }
                className="w-full rounded border border-input px-2 py-1 text-[12px]"
              />
              <textarea
                defaultValue={(layout.legends ?? []).join("\n")}
                placeholder="Legendas (uma por linha)"
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) =>
                  patchBoard({
                    layout: { ...layout, legends: e.target.value.split("\n").filter(Boolean) },
                  })
                }
                className="h-20 w-full rounded border border-input px-2 py-1 text-[12px]"
              />
            </div>
          </aside>

          {/* Center: live canvas */}
          <div
            className="overflow-auto bg-vibra-50/20 p-4"
            onClick={(e) => {
              e.stopPropagation();
              setSelWidget(null);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              if (!dragId) return;
              const rect = e.currentTarget.getBoundingClientRect();
              patchWidget(dragId, {
                pos_x: Math.max(0, Math.round((e.clientX - rect.left - 40) / 80)),
                pos_y: Math.max(0, Math.round((e.clientY - rect.top - 40) / 70)),
              });
              setDragId(null);
            }}
          >
            <div className="relative min-h-[680px] rounded-xl border border-dashed border-vibra-200 bg-white">
              {widgets.map((w: any) => (
                <div
                  key={w.id}
                  draggable
                  onDragStart={(e: DragEvent) => {
                    e.dataTransfer.setData("text/plain", w.id);
                    setDragId(w.id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelWidget(w.id);
                  }}
                  className={`absolute overflow-hidden rounded-lg border bg-white p-3 shadow-vibra-sm transition ${selWidget === w.id ? "border-vibra-600 ring-2 ring-vibra-200" : "border-border"}`}
                  style={{
                    left: Number(w.pos_x ?? 0) * 80 + 12,
                    top: Number(w.pos_y ?? 0) * 70 + 12,
                    width: Number(w.largura ?? 6) * 80,
                    height: Number(w.altura ?? 4) * 70,
                  }}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1">
                      <Grip className="h-3 w-3 shrink-0 text-muted-foreground" />
                      <input
                        defaultValue={w.titulo ?? ""}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={(e) => patchWidget(w.id, { titulo: e.target.value })}
                        className="min-w-0 flex-1 rounded bg-transparent text-[11.5px] font-bold text-vibra-800 outline-none focus:bg-vibra-50"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWidget(w.id);
                      }}
                      className="text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="h-[calc(100%-22px)]">
                    <WidgetPreview widget={w} />
                  </div>
                </div>
              ))}
              {widgets.length === 0 && (
                <p className="py-16 text-center text-[12px] text-muted-foreground">
                  Adicione widgets pelo painel à esquerda — eles renderizam com dados reais em tempo
                  real.
                </p>
              )}
            </div>
          </div>

          {/* Right: widget config */}
          <aside
            className="overflow-auto border-l border-border bg-white p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-vibra-700">
              Configuração do Widget
            </p>
            {!selected ? (
              <p className="text-[11px] text-muted-foreground">
                Selecione um widget no canvas para editar fonte de dados, agregação e dimensões.
              </p>
            ) : (
              <WidgetConfig widget={selected} onChange={(p) => patchWidget(selected.id, p)} />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

interface WidgetConfigProps {
  widget: {
    tipo: string;
    config?: {
      source?: string;
      agg?: string;
      field?: string;
      groupBy?: string;
      format?: string;
      columns?: string[];
    };
  };
  onChange: (p: { tipo?: string; config?: Record<string, unknown> }) => void;
}

function WidgetConfig({ widget, onChange }: WidgetConfigProps) {
  const config = widget.config ?? {};
  const src = SOURCES.find((s) => s.id === config.source) ?? SOURCES[0];
  function patchCfg(p: Record<string, unknown>) {
    onChange({ config: { ...config, ...p } });
  }
  return (
    <div className="space-y-2 text-[11px]">
      <div>
        <p className="font-semibold text-vibra-800">Tipo</p>
        <select
          value={widget.tipo}
          onChange={(e) => onChange({ tipo: e.target.value })}
          className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
        >
          {CHART_TYPES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="font-semibold text-vibra-800">Fonte de dados</p>
        <select
          value={config.source ?? "iniciativas"}
          onChange={(e) =>
            patchCfg({ source: e.target.value, field: undefined, groupBy: undefined })
          }
          className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
        >
          {SOURCES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="font-semibold text-vibra-800">Agregação</p>
        <select
          value={config.agg ?? "count"}
          onChange={(e) => patchCfg({ agg: e.target.value })}
          className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
        >
          <option value="count">Contagem</option>
          <option value="sum">Soma</option>
          <option value="avg">Média</option>
          <option value="max">Máximo</option>
          <option value="min">Mínimo</option>
        </select>
      </div>
      {config.agg !== "count" && (
        <div>
          <p className="font-semibold text-vibra-800">Campo numérico</p>
          <select
            value={config.field ?? ""}
            onChange={(e) => patchCfg({ field: e.target.value })}
            className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
          >
            <option value="">— selecione —</option>
            {src.numeric.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      )}
      {!["kpi", "progress"].includes(widget.tipo) && widget.tipo !== "table" && (
        <div>
          <p className="font-semibold text-vibra-800">Agrupar por</p>
          <select
            value={config.groupBy ?? ""}
            onChange={(e) => patchCfg({ groupBy: e.target.value })}
            className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
          >
            <option value="">— selecione —</option>
            {src.fields.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <p className="font-semibold text-vibra-800">Formato do valor</p>
        <select
          value={config.format ?? ""}
          onChange={(e) => patchCfg({ format: e.target.value })}
          className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
        >
          <option value="">Número</option>
          <option value="money">R$ Moeda</option>
          <option value="percent">%</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label>
          <span className="font-semibold text-vibra-800">Largura</span>
          <input
            type="number"
            min={2}
            max={12}
            value={widget.largura ?? 6}
            onChange={(e) => onChange({ largura: Number(e.target.value) })}
            className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
          />
        </label>
        <label>
          <span className="font-semibold text-vibra-800">Altura</span>
          <input
            type="number"
            min={2}
            max={12}
            value={widget.altura ?? 4}
            onChange={(e) => onChange({ altura: Number(e.target.value) })}
            className="mt-1 w-full rounded border border-input px-2 py-1 text-[12px]"
          />
        </label>
      </div>
    </div>
  );
}
