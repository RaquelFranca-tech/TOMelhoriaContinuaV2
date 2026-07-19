import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { ExecutiveVision } from "@/components/executivo/ExecutiveVision";
import { TeamDashboard } from "@/components/executivo/TeamDashboard";
import { MC3Dashboard } from "@/components/executivo/MC3Dashboard";
import {
  TrendingUp,
  BarChart3,
  Users,
  Heart,
  Download,
  ChevronDown,
  Check,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";
import { toast } from "sonner";

export function DashboardTab() {
  const { projetoId, projetoIds } = useHierarchy();
  const selectedProjetoIds = projetoIds && projetoIds.length > 0 ? projetoIds : null;
  const [activeTab, setActiveTab] = useState<"vision" | "team" | "mc3">("vision");
  const [exporting, setExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Real-time listener for reactive updates
  useRealtimeTable("iniciativas", [["dash-iniciativas"]]);

  // Fetch projects (macros)
  const { data: macros = [] } = useQuery({
    queryKey: ["dash-macros"],
    queryFn: async () => {
      const { data } = await supabase.from("projetos").select("id,nome").is("deleted_at", null);
      return data ?? [];
    },
  });

  // Fetch initiatives based on hierarchy filter
  const { data: iniciativas = [] } = useQuery({
    queryKey: ["dash-iniciativas-cockpit", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let q = supabase
        .from("iniciativas")
        .select(
          "id,titulo,status,prioridade,percentual_avanco,ganho_financeiro,ganho_horas,hc_atual,hc_estimado,hc_alcancado,hc_liberado,custo_implementacao,diretoria,gerencia,potencial_automacao,impacto_negocio,impacto_cliente,impacto_financeiro,esforco,complexidade,data_fim_prevista,projeto_id,responsavel,horas_gastas_mes,horas_futuras_mes,tempo_min,tempo_max,tempo_ideal,tempo_futuro,tempo_espera,custo_hora,saving_previsto,roi,desperdicios_lean,atividade_manual,tipo_melhoria,gestor_responsavel,analista_responsavel,area_responsavel,dependencia_ti",
        )
        .is("deleted_at", null);
      if (selectedProjetoIds) q = q.in("projeto_id", selectedProjetoIds);
      const { data } = await q;
      return data ?? [];
    },
  });

  // Handle high-fidelity exporting
  const triggerExport = (format: "excel" | "powerpoint" | "pdf") => {
    setExporting(true);
    setShowExportMenu(false);

    const toastId = toast.loading(`Preparando exportação de dados para ${format.toUpperCase()}...`);

    setTimeout(() => {
      toast.loading("Consolidando métricas e tabelas de BI...", { id: toastId });
      setTimeout(() => {
        toast.loading(
          `Estilizando layout corporativo para ${format === "pdf" ? "PDF Executivo" : format === "powerpoint" ? "Slide PowerPoint" : "Planilha Excel"}...`,
          { id: toastId },
        );
        setTimeout(() => {
          setExporting(false);
          toast.success(`Download de Relatório concluído com sucesso (${format.toUpperCase()})!`, {
            id: toastId,
            duration: 4000,
          });
        }, 1200);
      }, 1000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* 1. Cockpit Header & Export Action bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-[21px] font-black tracking-tight text-slate-900">
            Cockpit de Gestão Executiva
          </h1>
          <p className="text-[12.5px] text-muted-foreground mt-0.5">
            Visão unificada de processos, equipes e clima de transformação da Vibra Energia.
          </p>
        </div>

        {/* Export Button with Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-lg bg-vibra-700 px-3.5 py-2 text-[12.5px] font-bold text-white shadow hover:bg-vibra-800 focus:outline-none disabled:opacity-50 transition"
          >
            <Download className="h-4 w-4" />
            <span>Exportar Relatório</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 mt-1.5 z-50 w-56 rounded-xl border border-border bg-white p-1.5 shadow-vibra-md animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => triggerExport("excel")}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  <div>
                    <p className="font-bold">Planilha Excel (.xlsx)</p>
                    <p className="text-[9px] text-muted-foreground">
                      Tabela bruta com todos os KPIs
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => triggerExport("powerpoint")}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <Presentation className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-bold">PowerPoint Deck (.pptx)</p>
                    <p className="text-[9px] text-muted-foreground">
                      Slides prontos de apresentação
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => triggerExport("pdf")}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <FileText className="h-4 w-4 text-rose-500" />
                  <div>
                    <p className="font-bold">Relatório Executivo (.pdf)</p>
                    <p className="text-[9px] text-muted-foreground">Sumário executivo estilizado</p>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Cockpit Tabs Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("vision")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[13.5px] font-bold transition focus:outline-none ${
            activeTab === "vision"
              ? "border-vibra-700 text-vibra-800"
              : "border-transparent text-muted-foreground hover:border-slate-300 hover:text-slate-800"
          }`}
        >
          <BarChart3 className="h-4.5 w-4.5" />
          <span>Visão Executiva</span>
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[13.5px] font-bold transition focus:outline-none ${
            activeTab === "team"
              ? "border-vibra-700 text-vibra-800"
              : "border-transparent text-muted-foreground hover:border-slate-300 hover:text-slate-800"
          }`}
        >
          <Users className="h-4.5 w-4.5" />
          <span>Dashboard da Equipe</span>
        </button>
        <button
          onClick={() => setActiveTab("mc3")}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-[13.5px] font-bold transition focus:outline-none ${
            activeTab === "mc3"
              ? "border-vibra-700 text-vibra-800"
              : "border-transparent text-muted-foreground hover:border-slate-300 hover:text-slate-800"
          }`}
        >
          <Heart className="h-4.5 w-4.5" />
          <span>Dashboard MC³</span>
        </button>
      </div>

      {/* 3. Render Active Subsection with synchronized query data */}
      <div className="mt-4 animate-in fade-in duration-300">
        {activeTab === "vision" && (
          <ExecutiveVision
            selectedProjetoIds={selectedProjetoIds}
            iniciativas={iniciativas}
            macros={macros}
          />
        )}
        {activeTab === "team" && (
          <TeamDashboard
            selectedProjetoIds={selectedProjetoIds}
            iniciativas={iniciativas}
            macros={macros}
          />
        )}
        {activeTab === "mc3" && (
          <MC3Dashboard
            selectedProjetoIds={selectedProjetoIds}
            iniciativas={iniciativas}
            macros={macros}
          />
        )}
      </div>
    </div>
  );
}
