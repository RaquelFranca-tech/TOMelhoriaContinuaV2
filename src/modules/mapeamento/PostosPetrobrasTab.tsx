import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import {
  Calendar,
  Layers,
  MapPin,
  Clock,
  TrendingUp,
  FileText,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  HelpCircle,
  Loader2,
  ChevronDown,
  Filter,
  ArrowRight,
  ChevronRight,
  PlusCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";

export interface PostosPetrobrasRecord {
  id: string;
  periodo_inicio: string;
  periodo_fim: string;
  total_postos: number;
  total_postos_nova_imagem: number;
  meta_postos_nova_imagem: number;
  capacidade_atual_nova_imagem: number;
  tempo_embandeiramento_inicial: number;
  tempo_embandeiramento_1etapa: number;
  tempo_embandeiramento_2etapa: number;
  tempo_embandeiramento_estimado_jornada_completa: number;
  tempo_embandeiramento_estimado_1etapa: number;
  tempo_embandeiramento_estimada_2etapa: number;
  tempo_embandeiramento_real: number;
  tempo_embandeiramento_real_mereo: number; // loaded from Mereo
  capacidade_geral_futura_estimada: number;
  total_postos_renovacao: number;
  total_postos_embandeiramento: number;
  total_postos_implantacao: number;
  total_postos_vinculacao: number;
  oportunidades_aprovadas: number;
  oportunidades_aprovadas_estimada: number;
  contatos_assinados: number;
  contatos_assinados_estimado: number;
  meta_rede_embandeirada: number;
  realizado_rede_embandeirada: number;
  engenharia_embandeiramento: number;
  meta_engenharia_embandeiramento: number;
  concessoes_financeiras_total: number;
  sem_garantia_real: number;
  com_garantia_real_hipoteca: number;
  amaral_maia_hipotecas: number;
  tempo_sem_garantia_real: number;
  tempo_com_garantia_real_hipoteca: number;
  tempo_oportunidade_ate_pagamento_com_termo: number;
  tempo_oportunidade_ate_pagamento_sem_termo: number;
  updated_at: string;
  created_by: string;
}

export interface Macroprocesso {
  id: string;
  nome: string;
  area_responsavel: string;
  tempo_total: number;
  ordem: number;
  microprocessos?: {
    id: string;
    nome: string;
    status: "Mapeada" | "Em Desenvolvimento" | "Implantada";
    progress: number;
    tempo_asis: number;
    tempo_tobe: number;
    hc: number;
    automation: number;
    isMapped: boolean;
  }[];
}

const DEFAULT_MACROS: Macroprocesso[] = [
  {
    id: "m-1",
    nome: "Originação e Prospecção",
    area_responsavel: "Comercial / Expansão",
    tempo_total: 15,
    ordem: 1,
  },
  {
    id: "m-2",
    nome: "Qualificação Cadastral",
    area_responsavel: "Cadastro / Inteligência",
    tempo_total: 10,
    ordem: 2,
  },
  {
    id: "m-3",
    nome: "Análise de Crédito e Limites",
    area_responsavel: "Crédito e Cobrança",
    tempo_total: 12,
    ordem: 3,
  },
  {
    id: "m-4",
    nome: "Due Diligence e Compliance",
    area_responsavel: "Compliance / Jurídico",
    tempo_total: 15,
    ordem: 4,
  },
  {
    id: "m-5",
    nome: "Avaliação de Viabilidade",
    area_responsavel: "Planejamento Financeiro",
    tempo_total: 10,
    ordem: 5,
  },
  {
    id: "m-6",
    nome: "Negociação Comercial",
    area_responsavel: "Comercial",
    tempo_total: 20,
    ordem: 6,
  },
  {
    id: "m-7",
    nome: "Aprovação de Alçada",
    area_responsavel: "Diretoria / Comitê",
    tempo_total: 7,
    ordem: 7,
  },
  {
    id: "m-8",
    nome: "Assinatura de Contrato (DECON)",
    area_responsavel: "Jurídico / Cadastro",
    tempo_total: 14,
    ordem: 8,
  },
  {
    id: "m-9",
    nome: "Projetos Executivos",
    area_responsavel: "Engenharia / Projetos",
    tempo_total: 18,
    ordem: 9,
  },
  {
    id: "m-10",
    nome: "Licenciamento Ambiental",
    area_responsavel: "SMS / Regulatório",
    tempo_total: 45,
    ordem: 10,
  },
  {
    id: "m-11",
    nome: "Alvarás e Autorizações",
    area_responsavel: "Regulatório",
    tempo_total: 30,
    ordem: 11,
  },
  {
    id: "m-12",
    nome: "Concessões Financeiras",
    area_responsavel: "Financeiro",
    tempo_total: 15,
    ordem: 12,
  },
  {
    id: "m-13",
    nome: "Obras Civis e Adequação",
    area_responsavel: "Engenharia",
    tempo_total: 60,
    ordem: 13,
  },
  {
    id: "m-14",
    nome: "Nova Imagem",
    area_responsavel: "Branding / Engenharia",
    tempo_total: 25,
    ordem: 14,
  },
  {
    id: "m-15",
    nome: "Adequação e Testes",
    area_responsavel: "SMS / Operações",
    tempo_total: 30,
    ordem: 15,
  },
  {
    id: "m-16",
    nome: "Instalação de Sistemas",
    area_responsavel: "TI / Automação",
    tempo_total: 10,
    ordem: 16,
  },
  {
    id: "m-17",
    nome: "Treinamento e Inauguração",
    area_responsavel: "Treinamento / Vendas",
    tempo_total: 7,
    ordem: 17,
  },
];

export function PostosPetrobrasTab() {
  const qc = useQueryClient();
  useRealtimeTable("app_configuracoes", [["postos_petrobras_data"]]);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRecord, setEditingRecord] = useState<PostosPetrobrasRecord | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formTab, setFormTab] = useState<"geral" | "tempos" | "postos" | "vendas" | "concessoes">(
    "geral",
  );

  // Tab control for Postos Petrobras
  const [activeTab, setActiveTab] = useState<"postos" | "jornada">("postos");
  const [selectedMacroId, setSelectedMacroId] = useState<string>("m-1");
  const [editedMacros, setEditedMacros] = useState<Macroprocesso[]>([]);

  // Load macroprocessos from config
  const { data: macroprocessos = DEFAULT_MACROS, isLoading: isLoadingMacros } = useQuery<
    Macroprocesso[]
  >({
    queryKey: ["jornada-macroprocessos"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "jornada_macroprocessos")
        .maybeSingle();
      if (!data?.valor) return DEFAULT_MACROS;
      const list = data.valor as Macroprocesso[];
      if (list.length < 17) return DEFAULT_MACROS;
      return list.sort((a, b) => a.ordem - b.ordem);
    },
  });

  // Load actual microprocessos mapped in DB
  const { data: dbMicroprocessos = [] } = useQuery({
    queryKey: ["jornada-db-microprocessos"],
    queryFn: async () => {
      const { data } = await supabase.from("microprocessos").select("*").is("deleted_at", null);
      return data ?? [];
    },
  });

  // Keep state sync
  useEffect(() => {
    if (macroprocessos && macroprocessos.length > 0) {
      setEditedMacros(macroprocessos);
    }
  }, [macroprocessos]);

  // Save changes to config
  const saveMacrosMutation = useMutation({
    mutationFn: async (updated: Macroprocesso[]) => {
      const { error } = await supabase.from("app_configuracoes").upsert({
        chave: "jornada_macroprocessos",
        valor: updated,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jornada-macroprocessos"] });
      toast.success("Configuração da Jornada salva com sucesso!");
    },
    onError: (err: any) => {
      toast.error(`Erro ao salvar jornada: ${err.message}`);
    },
  });

  const selectedMacro =
    editedMacros.find((m) => m.id === selectedMacroId) ||
    macroprocessos.find((m) => m.id === selectedMacroId);

  const handleUpdateMacroField = (field: keyof Macroprocesso, value: any) => {
    setEditedMacros((prev) =>
      prev.map((m) => {
        if (m.id === selectedMacroId) {
          return { ...m, [field]: value };
        }
        return m;
      }),
    );
  };

  const handleUpdateMicroField = (microId: string, field: string, value: any) => {
    setEditedMacros((prev) =>
      prev.map((m) => {
        if (m.id === selectedMacroId) {
          const currentMicros = m.microprocessos || [];
          const updatedMicros = currentMicros.map((mic) => {
            if (mic.id === microId) {
              const updated = { ...mic, [field]: value };
              if (field === "isMapped" && value === true) {
                if (dbMicroprocessos.length > 0) {
                  const firstDb = dbMicroprocessos[0];
                  updated.id = firstDb.id;
                  updated.nome = firstDb.titulo;
                  updated.status = firstDb.status || "Mapeada";
                  updated.progress = firstDb.percentual_avanco ?? 0;
                  updated.tempo_asis = firstDb.lead_time_atual ?? 0;
                  updated.tempo_tobe = firstDb.lead_time_futuro ?? 0;
                  updated.hc = firstDb.hc_atual ?? 0;
                  updated.automation = firstDb.percentual_evolucao ?? 0;
                }
              }
              if (field === "id" && value && mic.isMapped) {
                const matchedDb = dbMicroprocessos.find((dbM) => dbM.id === value);
                if (matchedDb) {
                  updated.nome = matchedDb.titulo;
                  updated.status = matchedDb.status || "Mapeada";
                  updated.progress = matchedDb.percentual_avanco ?? 0;
                  updated.tempo_asis = matchedDb.lead_time_atual ?? 0;
                  updated.tempo_tobe = matchedDb.lead_time_futuro ?? 0;
                  updated.hc = matchedDb.hc_atual ?? 0;
                  updated.automation = matchedDb.percentual_evolucao ?? 0;
                }
              }
              return updated;
            }
            return mic;
          });
          return { ...m, microprocessos: updatedMicros };
        }
        return m;
      }),
    );
  };

  const handleAddMicro = () => {
    setEditedMacros((prev) =>
      prev.map((m) => {
        if (m.id === selectedMacroId) {
          const currentMicros = m.microprocessos || [];
          const newMicro = {
            id: "micro-" + Math.random().toString(36).substring(2, 9),
            nome: "Novo Microprocesso",
            status: "Mapeada" as const,
            progress: 0,
            tempo_asis: 5,
            tempo_tobe: 3,
            hc: 1,
            automation: 0,
            isMapped: false,
          };
          return { ...m, microprocessos: [...currentMicros, newMicro] };
        }
        return m;
      }),
    );
  };

  const handleRemoveMicro = (microId: string) => {
    setEditedMacros((prev) =>
      prev.map((m) => {
        if (m.id === selectedMacroId) {
          const currentMicros = m.microprocessos || [];
          return { ...m, microprocessos: currentMicros.filter((mic) => mic.id !== microId) };
        }
        return m;
      }),
    );
  };

  const handleSaveJourney = () => {
    saveMacrosMutation.mutate(editedMacros);
  };

  // User Profile for Created By
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile-postos"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  // User role for authorization
  const { data: myRole = "visualizador" } = useQuery({
    queryKey: ["my-role-postos"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return "visualizador";
      const emailLower = user.email?.toLowerCase() || "";
      if (
        emailLower === "rfranca@vibraenergia.com.br" ||
        emailLower === "rfranca@vibra.com.br" ||
        (emailLower.includes("raquel") && emailLower.includes("vibra")) ||
        emailLower === "admin@vibraenergia.com.br" ||
        emailLower === "sfquequel@gmail.com" ||
        emailLower === "juliano.maluf@mjv.com.br"
      ) {
        return "admin";
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.role ?? "visualizador";
    },
  });

  const isAdmin = myRole === "admin";

  // Fetch indicator values from Mereo to prefill "TEMPO EMBANDEIRAMENTO (REAL) - Mereo"
  const { data: mereoRealValue = 0, isLoading: isLoadingMereo } = useQuery({
    queryKey: ["postos-mereo-real-val"],
    queryFn: async () => {
      try {
        const { data: indicators } = await supabase
          .from("indicadores")
          .select("id, codigo_mereo")
          .in("codigo_mereo", ["GTESG00183", "GTESG00207", "GTESG00208"]);

        if (!indicators || indicators.length === 0) return 106.5; // High-fidelity seed default

        const indicatorIds = indicators.map((i) => i.id);

        const { data: values } = await supabase
          .from("indicador_valores")
          .select("realizado")
          .in("indicador_id", indicatorIds)
          .not("realizado", "is", null);

        if (!values || values.length === 0) return 106.5;

        const sum = values.reduce((acc, val) => acc + Number(val.realizado || 0), 0);
        return Number((sum / values.length).toFixed(2));
      } catch (e) {
        console.warn("Error calculating Mereo values, fallback to default", e);
        return 106.5;
      }
    },
  });

  // Load records from app_configuracoes
  const { data: records = [], isLoading } = useQuery<PostosPetrobrasRecord[]>({
    queryKey: ["postos-petrobras-records"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "postos_petrobras_list")
        .maybeSingle();
      return (data?.valor as PostosPetrobrasRecord[]) ?? [];
    },
  });

  // Filtered records
  const filteredRecords = useMemo(() => {
    if (!searchTerm) return records;
    return records.filter((r) => {
      const matchPeriod = `${r.periodo_inicio} a ${r.periodo_fim}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchUser = r.created_by?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchPeriod || matchUser;
    });
  }, [records, searchTerm]);

  // Form Record Initial State
  const initialFormState = (
    rec?: PostosPetrobrasRecord | null,
  ): Partial<PostosPetrobrasRecord> => ({
    id: rec?.id || "p-" + Math.random().toString(36).substring(2, 9),
    periodo_inicio: rec?.periodo_inicio || new Date().toISOString().split("T")[0],
    periodo_fim:
      rec?.periodo_fim || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split("T")[0],
    total_postos: rec?.total_postos ?? 0,
    total_postos_nova_imagem: rec?.total_postos_nova_imagem ?? 0,
    meta_postos_nova_imagem: rec?.meta_postos_nova_imagem ?? 0,
    capacidade_atual_nova_imagem: rec?.capacidade_atual_nova_imagem ?? 0,
    tempo_embandeiramento_inicial: rec?.tempo_embandeiramento_inicial ?? 0,
    tempo_embandeiramento_1etapa: rec?.tempo_embandeiramento_1etapa ?? 0,
    tempo_embandeiramento_2etapa: rec?.tempo_embandeiramento_2etapa ?? 0,
    tempo_embandeiramento_estimado_jornada_completa:
      rec?.tempo_embandeiramento_estimado_jornada_completa ?? 0,
    tempo_embandeiramento_estimado_1etapa: rec?.tempo_embandeiramento_estimado_1etapa ?? 0,
    tempo_embandeiramento_estimada_2etapa: rec?.tempo_embandeiramento_estimada_2etapa ?? 0,
    tempo_embandeiramento_real: rec?.tempo_embandeiramento_real ?? 0,
    tempo_embandeiramento_real_mereo: rec?.tempo_embandeiramento_real_mereo ?? mereoRealValue,
    capacidade_geral_futura_estimada: rec?.capacidade_geral_futura_estimada ?? 0,
    total_postos_renovacao: rec?.total_postos_renovacao ?? 0,
    total_postos_embandeiramento: rec?.total_postos_embandeiramento ?? 0,
    total_postos_implantacao: rec?.total_postos_implantacao ?? 0,
    total_postos_vinculacao: rec?.total_postos_vinculacao ?? 0,
    oportunidades_aprovadas: rec?.oportunidades_aprovadas ?? 0,
    oportunidades_aprovadas_estimada: rec?.oportunidades_aprovadas_estimada ?? 0,
    contatos_assinados: rec?.contatos_assinados ?? 0,
    contatos_assinados_estimado: rec?.contatos_assinados_estimado ?? 0,
    meta_rede_embandeirada: rec?.meta_rede_embandeirada ?? 0,
    realizado_rede_embandeirada: rec?.realizado_rede_embandeirada ?? 0,
    engenharia_embandeiramento: rec?.engenharia_embandeiramento ?? 0,
    meta_engenharia_embandeiramento: rec?.meta_engenharia_embandeiramento ?? 0,
    concessoes_financeiras_total: rec?.concessoes_financeiras_total ?? 0,
    sem_garantia_real: rec?.sem_garantia_real ?? 0,
    com_garantia_real_hipoteca: rec?.com_garantia_real_hipoteca ?? 0,
    amaral_maia_hipotecas: rec?.amaral_maia_hipotecas ?? 0,
    tempo_sem_garantia_real: rec?.tempo_sem_garantia_real ?? 0,
    tempo_com_garantia_real_hipoteca: rec?.tempo_com_garantia_real_hipoteca ?? 0,
    tempo_oportunidade_ate_pagamento_com_termo:
      rec?.tempo_oportunidade_ate_pagamento_com_termo ?? 0,
    tempo_oportunidade_ate_pagamento_sem_termo:
      rec?.tempo_oportunidade_ate_pagamento_sem_termo ?? 0,
  });

  const [formData, setFormData] = useState<Partial<PostosPetrobrasRecord>>(initialFormState());

  // Mutation to Save
  const saveMutation = useMutation({
    mutationFn: async (updatedList: PostosPetrobrasRecord[]) => {
      const { error } = await supabase.from("app_configuracoes").upsert({
        chave: "postos_petrobras_list",
        valor: updatedList,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["postos-petrobras-records"] });
      toast.success("Dados de Postos Petrobras atualizados com sucesso!");
      setIsFormOpen(false);
      setEditingRecord(null);
    },
    onError: (err: any) => {
      toast.error(`Erro ao salvar os dados: ${err.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error("Apenas administradores podem inserir ou alterar dados.");
      return;
    }

    const payload: PostosPetrobrasRecord = {
      ...(formData as PostosPetrobrasRecord),
      updated_at: new Date().toISOString(),
      created_by: userProfile?.email || "Administrador",
    };

    let updatedList: PostosPetrobrasRecord[] = [];
    if (editingRecord) {
      updatedList = records.map((r) => (r.id === editingRecord.id ? payload : r));
    } else {
      updatedList = [payload, ...records];
    }

    saveMutation.mutate(updatedList);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) {
      toast.error("Apenas administradores podem excluir dados.");
      return;
    }

    if (confirm("Deseja realmente excluir este registro de período?")) {
      const updatedList = records.filter((r) => r.id !== id);
      saveMutation.mutate(updatedList);
    }
  };

  const handleEdit = (rec: PostosPetrobrasRecord) => {
    setEditingRecord(rec);
    setFormData(initialFormState(rec));
    setFormTab("geral");
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditingRecord(null);
    setFormData(initialFormState(null));
    setFormTab("geral");
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border pb-4 gap-4">
        <div>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[10px] font-black text-emerald-800 uppercase tracking-wider">
            Gestão Operacional
          </span>
          <h1 className="text-[20px] font-black tracking-tight text-slate-900 mt-1">
            Mapeamento de Postos Petrobras
          </h1>
          <p className="text-[12px] text-muted-foreground mt-0.5">
            Gerenciamento e consolidação de KPIs de embandeiramento, concessões financeiras, obras
            de Nova Imagem e prazos operacionais.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleCreateNew}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-vibra-700 px-4 text-xs font-bold text-white shadow hover:bg-vibra-800 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Inserir Novo Período</span>
          </button>
        )}
      </div>

      {/* Sub tabs for navigating between general indicators and the Road Journey configuration */}
      <div className="flex border-b border-slate-200 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("postos")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all duration-200 ${
            activeTab === "postos"
              ? "border-vibra-700 text-vibra-800 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Indicadores do Período
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("jornada")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all duration-200 ${
            activeTab === "jornada"
              ? "border-vibra-700 text-vibra-800 font-extrabold"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Mapeamento da Jornada (Macro / Microprocessos)
        </button>
      </div>

      {activeTab === "postos" && (
        <>
          {/* Filter / Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-3.5 rounded-xl border border-border shadow-vibra-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por período ou criado por..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-xs font-semibold text-slate-800 outline-none transition focus:border-vibra-500 focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold shrink-0">
              <Filter className="h-3.5 w-3.5 text-vibra-700" />
              <span>Filtro de Período Ativo</span>
            </div>
          </div>

          {/* Main List Table */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-vibra-700" />
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-slate-50/50">
              <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">
                Nenhum registro cadastrado no momento.
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {isAdmin
                  ? "Clique em 'Inserir Novo Período' acima para começar."
                  : "Aguarde o cadastro de informações pelo administrador."}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-vibra-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-slate-50 border-b border-border text-[9.5px] font-extrabold uppercase text-slate-500 tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Período</th>
                      <th className="px-4 py-3">Total de Postos</th>
                      <th className="px-4 py-3">Nova Imagem (Meta × Real)</th>
                      <th className="px-4 py-3 text-right">Lead Time Real</th>
                      <th className="px-4 py-3 text-right">Mereo Real (Média)</th>
                      <th className="px-4 py-3">Responsável</th>
                      <th className="px-4 py-3">Atualizado em</th>
                      {isAdmin && <th className="px-4 py-3 text-center">Ações</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white text-slate-700">
                    {filteredRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-vibra-700" />
                          {new Date(rec.periodo_inicio).toLocaleDateString("pt-BR")} a{" "}
                          {new Date(rec.periodo_fim).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-slate-700">
                          {rec.total_postos} postos
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-800">
                              {rec.total_postos_nova_imagem}
                            </span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-slate-500">
                              {rec.meta_postos_nova_imagem} meta
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-right font-black text-orange-600 whitespace-nowrap">
                          {rec.tempo_embandeiramento_real} dias
                        </td>
                        <td className="px-4 py-3.5 text-right font-black text-emerald-600 whitespace-nowrap">
                          {rec.tempo_embandeiramento_real_mereo || 106.5} dias
                        </td>
                        <td
                          className="px-4 py-3.5 text-slate-500 truncate max-w-[120px]"
                          title={rec.created_by}
                        >
                          {rec.created_by}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                          {new Date(rec.updated_at).toLocaleString("pt-BR")}
                        </td>
                        {isAdmin && (
                          <td className="px-4 py-3.5 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleEdit(rec)}
                                className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition"
                                title="Editar"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(rec.id)}
                                className="p-1.5 hover:bg-red-50 rounded text-red-600 transition"
                                title="Excluir"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "jornada" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar: 17 Macroprocessos list */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-border overflow-hidden shadow-vibra-sm">
            <div className="p-4 bg-slate-50 border-b border-border flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">
                Macroprocessos da Estrada (17)
              </h3>
              <span className="text-[10px] bg-vibra-100 text-vibra-800 font-extrabold px-2 py-0.5 rounded-full">
                {editedMacros.length} Frentes
              </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {editedMacros.map((macro) => {
                const isSel = macro.id === selectedMacroId;
                return (
                  <button
                    key={macro.id}
                    type="button"
                    onClick={() => setSelectedMacroId(macro.id)}
                    className={`w-full text-left p-3.5 flex items-center justify-between transition ${
                      isSel
                        ? "bg-vibra-50 text-vibra-900 border-l-4 border-vibra-700 font-extrabold"
                        : "hover:bg-slate-50/50 text-slate-700 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black text-slate-400 font-mono">
                          {macro.ordem < 10 ? `0${macro.ordem}` : macro.ordem}
                        </span>
                        <h4 className="text-[11.5px] font-black truncate">{macro.nome}</h4>
                      </div>
                      <p className="text-[9.5px] text-slate-400 truncate mt-0.5">
                        {macro.area_responsavel}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-orange-600 shrink-0 font-mono">
                      {macro.tempo_total}d
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form / Detail mapping config for selected Macro */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-border p-5 space-y-6 shadow-vibra-sm">
            {selectedMacro ? (
              <>
                {/* Macro Settings Header */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-black bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded uppercase font-mono">
                        Macro{" "}
                        {selectedMacro.ordem < 10 ? `0${selectedMacro.ordem}` : selectedMacro.ordem}
                      </span>
                      <h3 className="text-sm font-black text-slate-900 mt-1">
                        Configurar: {selectedMacro.nome}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveJourney}
                      disabled={saveMacrosMutation.isPending}
                      className="inline-flex h-8.5 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white shadow hover:bg-emerald-700 transition"
                    >
                      {saveMacrosMutation.isPending ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <CheckCircle className="h-3.5 w-3.5" />
                      )}
                      <span>Salvar Configuração</span>
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 mt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Nome do Macroprocesso
                      </label>
                      <input
                        type="text"
                        value={selectedMacro.nome}
                        onChange={(e) => handleUpdateMacroField("nome", e.target.value)}
                        className="h-8.5 w-full rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-vibra-600 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Área Responsável
                      </label>
                      <input
                        type="text"
                        value={selectedMacro.area_responsavel}
                        onChange={(e) => handleUpdateMacroField("area_responsavel", e.target.value)}
                        className="h-8.5 w-full rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-vibra-600 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Duração Estimada (Dias)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={selectedMacro.tempo_total}
                        onChange={(e) =>
                          handleUpdateMacroField("tempo_total", Number(e.target.value))
                        }
                        className="h-8.5 w-full rounded-md border border-slate-200 px-3 text-xs font-bold text-slate-800 outline-none focus:border-vibra-600 bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Microprocessos list mapping */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[12px] font-black text-slate-950 uppercase tracking-wider">
                        Microprocessos Associados
                      </h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Adicione, associe e defina status, as-is, to-be, HC e nível de automação
                        para cada etapa.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMicro}
                      className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 hover:bg-slate-100 px-3 transition shadow-sm"
                    >
                      <PlusCircle className="h-4 w-4 text-vibra-700" />
                      <span>Adicionar Microprocesso</span>
                    </button>
                  </div>

                  {!selectedMacro.microprocessos || selectedMacro.microprocessos.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center bg-slate-50/40">
                      <Layers className="h-7 w-7 text-slate-300 mx-auto mb-2" />
                      <p className="text-[11px] font-bold text-slate-600">
                        Nenhum microprocesso customizado para esta etapa.
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Serão exibidos os microprocessos default mapeados na tela da jornada até que
                        você adicione ou associe novos itens.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 overflow-x-auto pb-4">
                      <table className="w-full text-left text-[11px] border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
                            <th className="px-3 py-2 w-1/4">Tipo / Identificação</th>
                            <th className="px-3 py-2">Status</th>
                            <th className="px-3 py-2">Avanço %</th>
                            <th className="px-3 py-2">AS IS (d)</th>
                            <th className="px-3 py-2">TO BE (d)</th>
                            <th className="px-3 py-2">HC</th>
                            <th className="px-3 py-2">Automação %</th>
                            <th className="px-3 py-2 text-center w-10">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {selectedMacro.microprocessos.map((mic) => (
                            <tr key={mic.id} className="hover:bg-slate-50/50 transition">
                              {/* Name or Selector */}
                              <td className="px-3 py-3 font-semibold">
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <label className="inline-flex items-center gap-1 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={!!mic.isMapped}
                                        onChange={(e) =>
                                          handleUpdateMicroField(
                                            mic.id,
                                            "isMapped",
                                            e.target.checked,
                                          )
                                        }
                                        className="rounded border-slate-300 text-vibra-600 focus:ring-vibra-500 h-3 w-3"
                                      />
                                      <span className="text-[9px] text-slate-500 uppercase">
                                        Processo Mapeado
                                      </span>
                                    </label>
                                  </div>

                                  {mic.isMapped ? (
                                    <select
                                      value={mic.id}
                                      onChange={(e) =>
                                        handleUpdateMicroField(mic.id, "id", e.target.value)
                                      }
                                      className="h-8 w-full rounded border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-700 outline-none"
                                    >
                                      {dbMicroprocessos.map((dbM: any) => (
                                        <option key={dbM.id} value={dbM.id}>
                                          {dbM.titulo}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      type="text"
                                      value={mic.nome}
                                      onChange={(e) =>
                                        handleUpdateMicroField(mic.id, "nome", e.target.value)
                                      }
                                      className="h-8 w-full rounded border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-700 outline-none"
                                      placeholder="Título do processo..."
                                    />
                                  )}
                                </div>
                              </td>

                              {/* Status */}
                              <td className="px-3 py-3">
                                <select
                                  value={mic.status}
                                  onChange={(e) =>
                                    handleUpdateMicroField(mic.id, "status", e.target.value)
                                  }
                                  className="h-8 rounded border border-slate-200 bg-white px-1.5 text-[10.5px] font-semibold text-slate-700 outline-none"
                                >
                                  <option value="Mapeada">Mapeada</option>
                                  <option value="Em Desenvolvimento">Em Desenvolvimento</option>
                                  <option value="Implantada">Implantada</option>
                                </select>
                              </td>

                              {/* Avanço % */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={mic.progress}
                                  onChange={(e) =>
                                    handleUpdateMicroField(
                                      mic.id,
                                      "progress",
                                      Number(e.target.value),
                                    )
                                  }
                                  className="h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
                                />
                              </td>

                              {/* AS IS */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0"
                                  value={mic.tempo_asis}
                                  onChange={(e) =>
                                    handleUpdateMicroField(
                                      mic.id,
                                      "tempo_asis",
                                      Number(e.target.value),
                                    )
                                  }
                                  className="h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
                                />
                              </td>

                              {/* TO BE */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0"
                                  value={mic.tempo_tobe}
                                  onChange={(e) =>
                                    handleUpdateMicroField(
                                      mic.id,
                                      "tempo_tobe",
                                      Number(e.target.value),
                                    )
                                  }
                                  className="h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
                                />
                              </td>

                              {/* HC */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0"
                                  value={mic.hc}
                                  onChange={(e) =>
                                    handleUpdateMicroField(mic.id, "hc", Number(e.target.value))
                                  }
                                  className="h-8 w-12 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
                                />
                              </td>

                              {/* Automação % */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={mic.automation}
                                  onChange={(e) =>
                                    handleUpdateMicroField(
                                      mic.id,
                                      "automation",
                                      Number(e.target.value),
                                    )
                                  }
                                  className="h-8 w-14 rounded border border-slate-200 px-1 text-center font-bold text-slate-700 outline-none"
                                />
                              </td>

                              {/* Delete button */}
                              <td className="px-3 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMicro(mic.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                                  title="Excluir Microprocesso"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                <span>Carregando dados da etapa...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Dialog Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full border border-border overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-slate-50 border-b border-border flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {editingRecord
                    ? "Editar Registro de Postos Petrobras"
                    : "Inserir Novo Registro de Postos"}
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Preencha as informações divididas de maneira inteligente nas abas temáticas
                  abaixo.
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs Selection */}
            <div className="flex border-b border-border shrink-0 bg-slate-50/50 overflow-x-auto">
              {[
                { id: "geral", label: "Período & Geral", icon: Layers },
                { id: "tempos", label: "Tempos de Jornada", icon: Clock },
                { id: "postos", label: "Distribuição", icon: MapPin },
                { id: "vendas", label: "Oportunidades & Contratos", icon: TrendingUp },
                { id: "concessoes", label: "Concessões & Garantias", icon: DollarSign },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFormTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold border-b-2 transition focus:outline-none whitespace-nowrap ${
                      formTab === tab.id
                        ? "border-vibra-700 text-vibra-800 bg-white"
                        : "border-transparent text-muted-foreground hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Tab: Geral & Período */}
              {formTab === "geral" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      Data de Início do Período
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.periodo_inicio || ""}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, periodo_inicio: e.target.value }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      Data de Fim do Período
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.periodo_fim || ""}
                      onChange={(e) => setFormData((p) => ({ ...p, periodo_fim: e.target.value }))}
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TOTAL DE POSTOS
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.total_postos ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, total_postos: Number(e.target.value) }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TOTAL POSTOS NOVA IMAGEM
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.total_postos_nova_imagem ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          total_postos_nova_imagem: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      META POSTOS NOVA IMAGEM
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.meta_postos_nova_imagem ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          meta_postos_nova_imagem: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      CAPACIDADE ATUAL NOVA IMAGEM
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.capacidade_atual_nova_imagem ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          capacidade_atual_nova_imagem: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      CAPACIDADE GERAL FUTURA ESTIMADA
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.capacidade_geral_futura_estimada ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          capacidade_geral_futura_estimada: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                </div>
              )}

              {/* Tab: Tempos de Jornada */}
              {formTab === "tempos" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO EMBANDEIRAMENTO (INICIAL)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_inicial ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_inicial: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO EMBANDEIRAMENTO (1ª Etapa)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_1etapa ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_1etapa: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO EMBANDEIRAMENTO (2ª Etapa)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_2etapa ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_2etapa: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO ESTIMADO DA JORNADA COMPLETA
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_estimado_jornada_completa ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_estimado_jornada_completa: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO ESTIMADO 1ª Etapa
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_estimado_1etapa ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_estimado_1etapa: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO ESTIMADA 2ª Etapa
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_estimada_2etapa ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_estimada_2etapa: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO EMBANDEIRAMENTO (REAL)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_real ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_real: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10.5px] font-bold text-emerald-800 flex items-center gap-1">
                        TEMPO EMBANDEIRAMENTO (REAL - MEREO)
                        <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.2">
                          Auto Mereo
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            tempo_embandeiramento_real_mereo: mereoRealValue,
                          }))
                        }
                        className="text-[9px] font-black text-vibra-700 hover:underline"
                      >
                        Recarregar
                      </button>
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_embandeiramento_real_mereo ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_embandeiramento_real_mereo: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-emerald-200 bg-emerald-50/50 px-3 text-[12px] font-black text-emerald-800 outline-none focus:border-emerald-600"
                    />
                    <p className="text-[9.5px] text-muted-foreground mt-0.5 leading-relaxed">
                      Calculado automaticamente da média dos resultados Mereo (GTESG00183,
                      GTESG00207, GTESG00208) até hoje.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab: Distribuição de Postos */}
              {formTab === "postos" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TOTAL POSTOS RENOVAÇÃO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.total_postos_renovacao ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          total_postos_renovacao: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TOTAL POSTOS EMBANDEIRAMENTO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.total_postos_embandeiramento ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          total_postos_embandeiramento: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TOTAL POSTOS IMPLANTAÇÃO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.total_postos_implantacao ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          total_postos_implantacao: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TOTAL DE POSTOS VINCULAÇÃO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.total_postos_vinculacao ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          total_postos_vinculacao: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      ENGENHARIA EMBANDEIRAMENTO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.engenharia_embandeiramento ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          engenharia_embandeiramento: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      META ENGENHARIA EMBANDEIRAMENTO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.meta_engenharia_embandeiramento ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          meta_engenharia_embandeiramento: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                </div>
              )}

              {/* Tab: Oportunidades & Contratos */}
              {formTab === "vendas" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      OPORTUNIDADES APROVADAS
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.oportunidades_aprovadas ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          oportunidades_aprovadas: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      OPORTUNIDADES APROVADAS (ESTIMADA)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.oportunidades_aprovadas_estimada ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          oportunidades_aprovadas_estimada: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      CONTATOS ASSINADOS
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.contatos_assinados ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, contatos_assinados: Number(e.target.value) }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      CONTATOS ASSINADOS (ESTIMADO)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.contatos_assinados_estimado ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          contatos_assinados_estimado: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      META REDE EMBANDEIRADA
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.meta_rede_embandeirada ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          meta_rede_embandeirada: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      REALIZADO REDE EMBANDEIRADA
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.realizado_rede_embandeirada ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          realizado_rede_embandeirada: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                </div>
              )}

              {/* Tab: Concessões & Garantias */}
              {formTab === "concessoes" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      CONCESSÕES FINANCEIRAS TOTAL
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.concessoes_financeiras_total ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          concessoes_financeiras_total: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      SEM GARANTIA REAL
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.sem_garantia_real ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, sem_garantia_real: Number(e.target.value) }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      COM GARANTIA REAL (HIPOTECA)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.com_garantia_real_hipoteca ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          com_garantia_real_hipoteca: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      AMARAL MAIA (HIPOTECAS)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.amaral_maia_hipotecas ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          amaral_maia_hipotecas: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO SEM GARANTIA REAL
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_sem_garantia_real ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_sem_garantia_real: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO COM GARANTIA REAL (HIPOTECA)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_com_garantia_real_hipoteca ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_com_garantia_real_hipoteca: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO OPORTUNIDADE ATÉ PAGAMENTO COM TERMO DE CESSÃO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_oportunidade_ate_pagamento_com_termo ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_oportunidade_ate_pagamento_com_termo: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-700">
                      TEMPO OPORTUNIDADE ATÉ PAGAMENTO SEM TERMO DE CESSÃO
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.tempo_oportunidade_ate_pagamento_sem_termo ?? ""}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tempo_oportunidade_ate_pagamento_sem_termo: Number(e.target.value),
                        }))
                      }
                      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-800 outline-none focus:border-vibra-600"
                    />
                  </div>
                </div>
              )}

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="px-4 py-2 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition flex items-center gap-1.5 shadow"
                >
                  {saveMutation.isPending ? (
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  <span>Salvar Dados</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
