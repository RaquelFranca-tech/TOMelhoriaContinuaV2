import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import {
  Download,
  Filter,
  Play,
  Settings as SettingsIcon,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

const SOURCES = [
  {
    id: "iniciativas",
    label: "Iniciativas",
    fields: [
      "codigo",
      "titulo",
      "status",
      "prioridade",
      "percentual_avanco",
      "ganho_financeiro",
      "ganho_horas",
      "diretoria",
      "gerencia",
      "macroprocesso",
      "responsavel",
      "custo_implementacao",
      "hc_estimado",
      "hc_alcancado",
      "esforco",
      "impacto_negocio",
      "potencial_automacao",
      "data_inicio",
      "data_fim_prevista",
      "projeto_id",
    ],
    statusValues: ["Mapeada", "Em Andamento", "Em Validação", "Implementada", "Arquivada"],
    dateField: "data_fim_prevista",
  },
  {
    id: "tarefas",
    label: "Tarefas",
    fields: [
      "titulo",
      "status",
      "prioridade",
      "diretoria",
      "percentual_avanco",
      "horas_estimadas",
      "responsavel_id",
      "iniciativa_id",
      "data_inicio",
      "data_fim_prevista",
      "data_fim_real",
      "descricao",
    ],
    statusValues: ["Pendente", "Em Andamento", "Concluída", "Bloqueada"],
    dateField: "data_fim_prevista",
  },
  {
    id: "projetos",
    label: "Projetos",
    fields: ["nome", "descricao", "data_inicio", "data_fim"],
    statusValues: [],
    dateField: "data_inicio",
  },
  {
    id: "equipe",
    label: "Equipe de Trabalho",
    fields: ["papel_macroprocesso", "diretoria", "area", "projeto_id", "ativo"],
    statusValues: [],
    dateField: "",
  },
] as const;

type Source = (typeof SOURCES)[number];

export function RelatoriosTab() {
  const { projetoIds } = useHierarchy();
  const selProj = projetoIds && projetoIds.length > 0 ? projetoIds : null;
  const [source, setSource] = useState<Source>(SOURCES[0]);
  const [cols, setCols] = useState<string[]>([
    "codigo",
    "titulo",
    "status",
    "prioridade",
    "percentual_avanco",
    "ganho_financeiro",
    "responsavel",
  ]);

  const [statusF, setStatusF] = useState("");
  const [prioridadeF, setPrioridadeF] = useState("");
  const [diretoriaF, setDiretoriaF] = useState("");
  const [responsavelF, setResponsavelF] = useState("");
  const [ganhoMinF, setGanhoMinF] = useState("");
  const [esforcoMaxF, setEsforcoMaxF] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");
  const [filterByProj, setFilterByProj] = useState(true);

  const [showColumnsConfig, setShowColumnsConfig] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  function pickSource(id: string) {
    const s = SOURCES.find((x) => x.id === id);
    if (!s) return;
    setSource(s);
    // Select a subset of reasonable default columns for the table instead of dumping everything
    if (s.id === "iniciativas") {
      setCols([
        "codigo",
        "titulo",
        "status",
        "prioridade",
        "percentual_avanco",
        "ganho_financeiro",
        "responsavel",
      ]);
    } else if (s.id === "tarefas") {
      setCols([
        "titulo",
        "status",
        "prioridade",
        "diretoria",
        "percentual_avanco",
        "horas_estimadas",
      ]);
    } else if (s.id === "projetos") {
      setCols(["nome", "descricao", "data_inicio", "data_fim"]);
    } else {
      setCols([...s.fields]);
    }
    setStatusF("");
    setPrioridadeF("");
    setDiretoriaF("");
    setResponsavelF("");
    setGanhoMinF("");
    setEsforcoMaxF("");
    setDateFrom("");
    setDateTo("");
  }

  function toggleCol(c: string) {
    setCols((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  }

  const {
    data: rows = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      "rel",
      source.id,
      cols.join(","),
      statusF,
      prioridadeF,
      diretoriaF,
      responsavelF,
      ganhoMinF,
      esforcoMaxF,
      dateFrom,
      dateTo,
      search,
      filterByProj,
      selProj?.join(",") ?? "_all",
    ],
    queryFn: async () => {
      let qy = supabase.from(source.id as any).select(cols.join(","));
      if (source.id !== "equipe") qy = qy.is("deleted_at", null);

      // Basic Filters
      if (statusF && (source.fields as readonly string[]).includes("status")) {
        qy = qy.eq("status", statusF);
      }
      if (dateFrom && source.dateField) qy = qy.gte(source.dateField, dateFrom);
      if (dateTo && source.dateField) qy = qy.lte(source.dateField, dateTo);

      if (search) {
        if ((source.fields as readonly string[]).includes("titulo")) {
          qy = qy.ilike("titulo", `%${search}%`);
        } else if ((source.fields as readonly string[]).includes("nome")) {
          qy = qy.ilike("nome", `%${search}%`);
        }
      }

      // Advanced Strategic Filters
      if (prioridadeF && (source.fields as readonly string[]).includes("prioridade")) {
        qy = qy.eq("prioridade", prioridadeF);
      }
      if (diretoriaF && (source.fields as readonly string[]).includes("diretoria")) {
        qy = qy.eq("diretoria", diretoriaF);
      }
      if (responsavelF && (source.fields as readonly string[]).includes("responsavel")) {
        qy = qy.eq("responsavel", responsavelF);
      }
      if (ganhoMinF && (source.fields as readonly string[]).includes("ganho_financeiro")) {
        qy = qy.gte("ganho_financeiro", Number(ganhoMinF));
      }
      if (esforcoMaxF && (source.fields as readonly string[]).includes("esforco")) {
        qy = qy.lte("esforco", Number(esforcoMaxF));
      }

      // Project context filters
      if (filterByProj && selProj) {
        if ((source.fields as readonly string[]).includes("projeto_id")) {
          qy = qy.in("projeto_id", selProj);
        } else if (source.id === "projetos") {
          qy = qy.in("id", selProj);
        }
      }

      const { data, error } = await qy.limit(1000);
      if (error) throw error;
      return data ?? [];
    },
    enabled: false,
  });

  const totals = useMemo(() => {
    const sum: Record<string, number> = {};
    cols.forEach((c) => {
      const vals = (rows as any[]).map((r) => Number(r[c]));
      if (vals.length > 0 && vals.every((v) => !isNaN(v) && v !== 0)) {
        sum[c] = vals.reduce((a, b) => a + b, 0);
      }
    });
    return sum;
  }, [rows, cols]);

  function exportCSV() {
    if (!rows.length) return toast.error("Rode a consulta antes");
    const header = cols.join(";");
    const lines = (rows as any[]).map((r) => cols.map((c) => JSON.stringify(r[c] ?? "")).join(";"));
    const csv = [header, ...lines].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${source.id}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exportado com sucesso");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4 shadow-vibra-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-vibra-700" />
            <div>
              <h3 className="text-[14px] font-bold text-vibra-800">
                Relatórios Estratégicos & Avançados
              </h3>
              <p className="text-[11px] text-slate-500">
                Filtre, selecione colunas personalizadas e extraia análises estratégicas do
                portfólio.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Customizer Toggle Button */}
            <button
              onClick={() => setShowColumnsConfig(!showColumnsConfig)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11.5px] font-semibold rounded border transition ${
                showColumnsConfig
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SettingsIcon className={`h-3.5 w-3.5 ${showColumnsConfig ? "animate-spin" : ""}`} />
              Customizar Visualização
              {showColumnsConfig ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11.5px] font-semibold rounded border transition ${
                showAdvancedFilters
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtros Avançados
              {showAdvancedFilters ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Column Customizer - Collapsible Panel */}
        {showColumnsConfig && (
          <div className="mb-4 rounded-lg bg-neutral-50/50 border border-neutral-100 p-3.5 animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-vibra-700 flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-vibra-600" />
                Colunas Disponíveis para Exibição ({cols.length} de {source.fields.length}{" "}
                selecionadas)
              </p>
              <button
                onClick={() => setCols([...source.fields])}
                className="text-[10px] font-bold text-indigo-600 hover:underline"
              >
                Selecionar Todas
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {source.fields.map((f) => {
                const isSelected = cols.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleCol(f)}
                    className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-indigo-600" : "bg-transparent"}`}
                    />
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-[11px]">
            <span className="mb-1 block font-semibold text-vibra-800">
              Fonte de dados Principal
            </span>
            <select
              value={source.id}
              onChange={(e) => pickSource(e.target.value)}
              className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px] font-medium"
            >
              {SOURCES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          {source.statusValues.length > 0 && (
            <label className="text-[11px]">
              <span className="mb-1 block font-semibold text-vibra-800">Status</span>
              <select
                value={statusF}
                onChange={(e) => setStatusF(e.target.value)}
                className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]"
              >
                <option value="">Todos os status</option>
                {source.statusValues.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          )}

          {(source.fields as readonly string[]).includes("titulo") && (
            <label className="text-[11px]">
              <span className="mb-1 block font-semibold text-vibra-800">Buscar por Título</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: Conciliação, IA, Checklist..."
                className="w-full h-8 rounded-md border border-input bg-white px-2.5 text-[12.5px] outline-none focus:border-indigo-500"
              />
            </label>
          )}

          {source.dateField && (
            <label className="text-[11px]">
              <span className="mb-1 block font-semibold text-vibra-800">Data de Término de</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
              />
            </label>
          )}
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="mt-3 pt-3 border-t border-dashed border-slate-200 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
            {(source.fields as readonly string[]).includes("prioridade") && (
              <label className="text-[11px]">
                <span className="mb-1 block font-semibold text-slate-700">Prioridade</span>
                <select
                  value={prioridadeF}
                  onChange={(e) => setPrioridadeF(e.target.value)}
                  className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]"
                >
                  <option value="">Todas</option>
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </label>
            )}

            {(source.fields as readonly string[]).includes("diretoria") && (
              <label className="text-[11px]">
                <span className="mb-1 block font-semibold text-slate-700">Diretoria</span>
                <select
                  value={diretoriaF}
                  onChange={(e) => setDiretoriaF(e.target.value)}
                  className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]"
                >
                  <option value="">Todas</option>
                  <option value="TI">TI</option>
                  <option value="Operações">Operações</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="RH">RH</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </label>
            )}

            {(source.fields as readonly string[]).includes("responsavel") && (
              <label className="text-[11px]">
                <span className="mb-1 block font-semibold text-slate-700">Responsável</span>
                <select
                  value={responsavelF}
                  onChange={(e) => setResponsavelF(e.target.value)}
                  className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12.5px]"
                >
                  <option value="">Todos</option>
                  <option value="Rodrigo França">Rodrigo França</option>
                  <option value="Sandro Quequel">Sandro Quequel</option>
                  <option value="Aline Silva">Aline Silva</option>
                  <option value="Bruno Santos">Bruno Santos</option>
                </select>
              </label>
            )}

            {(source.fields as readonly string[]).includes("ganho_financeiro") && (
              <label className="text-[11px]">
                <span className="mb-1 block font-semibold text-slate-700">
                  Ganho Financeiro Mínimo (R$)
                </span>
                <input
                  type="number"
                  value={ganhoMinF}
                  onChange={(e) => setGanhoMinF(e.target.value)}
                  placeholder="Ex: 100000"
                  className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
                />
              </label>
            )}

            {(source.fields as readonly string[]).includes("esforco") && (
              <label className="text-[11px]">
                <span className="mb-1 block font-semibold text-slate-700">
                  Esforço Máximo (1-5)
                </span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={esforcoMaxF}
                  onChange={(e) => setEsforcoMaxF(e.target.value)}
                  placeholder="Ex: 3"
                  className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
                />
              </label>
            )}

            {source.dateField && (
              <label className="text-[11px]">
                <span className="mb-1 block font-semibold text-slate-700">Data de Término até</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full h-8 rounded-md border border-input bg-white px-2 text-[12px]"
                />
              </label>
            )}
          </div>
        )}

        {/* Search Actions Footer */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <label className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filterByProj}
              onChange={(e) => setFilterByProj(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
            />
            Aplicar contexto de Projetos {selProj ? `(${selProj.length} selecionados)` : "(todos)"}
          </label>
          <span className="flex-1" />
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 px-4 h-9 text-[12px] font-semibold text-white transition shadow-sm disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            {isFetching ? "Carregando..." : "Rodar Consulta"}
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 px-4 h-9 text-[12px] font-semibold text-slate-700 transition"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar CSV
          </button>
          <span className="text-[11.5px] text-slate-500 font-medium ml-1 bg-slate-100 px-2 py-1 rounded">
            {rows.length} resultados
          </span>
        </div>
      </div>

      {/* Results Table Section */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-vibra-sm">
        <table className="w-full text-[12px]">
          <thead className="bg-slate-50 border-b border-border text-[10.5px] uppercase tracking-wider text-slate-700">
            <tr>
              {cols.map((c) => (
                <th key={c} className="px-4 py-3 text-left font-bold">
                  {c.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows as any[]).map((r, i) => (
              <tr key={i} className="border-t border-neutral-100 hover:bg-slate-50/50 transition">
                {cols.map((c) => {
                  let cellVal = r[c];
                  // Format money nicely if it's ganho_financeiro or custo_implementacao
                  if (
                    cellVal != null &&
                    (c === "ganho_financeiro" || c === "custo_implementacao")
                  ) {
                    cellVal = `R$ ${Number(cellVal).toLocaleString("pt-BR")}`;
                  }
                  // Format percentages
                  if (cellVal != null && c === "percentual_avanco") {
                    cellVal = `${cellVal}%`;
                  }
                  return (
                    <td key={c} className="px-4 py-2.5 text-slate-700 font-medium">
                      {cellVal != null ? String(cellVal) : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={cols.length} className="px-4 py-12 text-center text-slate-400 italic">
                  {isFetching
                    ? "Buscando dados no banco..."
                    : "Configure as opções, selecione as colunas desejadas e clique em ‘Rodar Consulta’."}
                </td>
              </tr>
            )}
          </tbody>
          {Object.keys(totals).length > 0 && rows.length > 0 && (
            <tfoot className="bg-slate-100/70 border-t-2 border-slate-200 font-bold text-slate-800">
              <tr>
                {cols.map((c, idx) => {
                  const isFinancial = c === "ganho_financeiro" || c === "custo_implementacao";
                  const totalVal = totals[c];
                  const formattedTotal =
                    totalVal != null
                      ? isFinancial
                        ? `R$ ${totalVal.toLocaleString("pt-BR")}`
                        : totalVal.toLocaleString("pt-BR")
                      : "";

                  return (
                    <td key={c} className="px-4 py-3 text-slate-900">
                      {totalVal != null ? `${idx === 0 ? "Total: " : ""}Σ ${formattedTotal}` : ""}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
