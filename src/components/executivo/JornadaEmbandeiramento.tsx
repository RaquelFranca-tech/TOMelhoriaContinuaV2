import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  MapPin,
  Clock,
  Award,
  Users,
  CheckCircle,
  HelpCircle,
  Edit2,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Settings,
  Image as ImageIcon,
  Check,
  Percent,
  Plus,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

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

export interface DefaultMicro {
  nome: string;
  tempo_asis_default: number;
  tempo_tobe_default: number;
  hc_default: number;
  matchKeywords: string[];
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

const DEFAULT_MICROS: Record<string, DefaultMicro[]> = {
  "m-1": [
    {
      nome: "Qualificação de Área e Tráfego",
      tempo_asis_default: 10,
      tempo_tobe_default: 4,
      hc_default: 2,
      matchKeywords: ["trafego", "qualificacao"],
    },
    {
      nome: "Mapeamento de Potencial de Galonagem",
      tempo_asis_default: 5,
      tempo_tobe_default: 2,
      hc_default: 1,
      matchKeywords: ["galonagem", "potencial"],
    },
  ],
  "m-2": [
    {
      nome: "Auditoria de Documentação Cadastral",
      tempo_asis_default: 8,
      tempo_tobe_default: 3,
      hc_default: 2,
      matchKeywords: ["auditoria", "cadastro", "parceiro"],
    },
  ],
  "m-3": [
    {
      nome: "Avaliação de Risco e Crédito",
      tempo_asis_default: 12,
      tempo_tobe_default: 4,
      hc_default: 2,
      matchKeywords: ["credito", "limite", "risco"],
    },
  ],
  "m-4": [
    {
      nome: "Due Diligence de Idoneidade",
      tempo_asis_default: 15,
      tempo_tobe_default: 5,
      hc_default: 2,
      matchKeywords: ["diligence", "compliance", "idoneidade"],
    },
  ],
  "m-5": [
    {
      nome: "Modelagem de Margem e Viabilidade",
      tempo_asis_default: 10,
      tempo_tobe_default: 3,
      hc_default: 2,
      matchKeywords: ["modelagem", "margem", "viabilidade"],
    },
  ],
  "m-6": [
    {
      nome: "Elaboração de Proposta Comercial",
      tempo_asis_default: 20,
      tempo_tobe_default: 8,
      hc_default: 1,
      matchKeywords: ["negociacao", "proposta", "comercial"],
    },
  ],
  "m-7": [
    {
      nome: "Aprovação em Comitê Executivo",
      tempo_asis_default: 7,
      tempo_tobe_default: 2,
      hc_default: 3,
      matchKeywords: ["comite", "alcada", "aprovacao"],
    },
  ],
  "m-8": [
    {
      nome: "Minuta de Contrato e Assinatura",
      tempo_asis_default: 14,
      tempo_tobe_default: 6,
      hc_default: 2,
      matchKeywords: ["contrato", "decon", "assinatura"],
    },
  ],
  "m-9": [
    {
      nome: "Elaboração de Projetos de Imagem",
      tempo_asis_default: 18,
      tempo_tobe_default: 8,
      hc_default: 3,
      matchKeywords: ["projetos", "executivos", "imagem"],
    },
  ],
  "m-10": [
    {
      nome: "Estudo de Impacto e Licenciamento",
      tempo_asis_default: 45,
      tempo_tobe_default: 20,
      hc_default: 2,
      matchKeywords: ["licenca", "ambiental", "impacto"],
    },
  ],
  "m-11": [
    {
      nome: "Emissão de Alvará de Construção",
      tempo_asis_default: 30,
      tempo_tobe_default: 12,
      hc_default: 2,
      matchKeywords: ["alvara", "autorizacoes", "construcao"],
    },
  ],
  "m-12": [
    {
      nome: "Liberação de Concessão de Incentivos",
      tempo_asis_default: 15,
      tempo_tobe_default: 5,
      hc_default: 2,
      matchKeywords: ["concessao", "financeira", "incentivo"],
    },
  ],
  "m-13": [
    {
      nome: "Obras de Adequação de Pista",
      tempo_asis_default: 60,
      tempo_tobe_default: 35,
      hc_default: 5,
      matchKeywords: ["obras", "adequacao", "reforma"],
    },
  ],
  "m-14": [
    {
      nome: "Instalação da Nova Imagem (Branding)",
      tempo_asis_default: 25,
      tempo_tobe_default: 10,
      hc_default: 4,
      matchKeywords: ["canopia", "totens", "branding"],
    },
  ],
  "m-15": [
    {
      nome: "Teste de Estanqueidade de Tanques",
      tempo_asis_default: 30,
      tempo_tobe_default: 15,
      hc_default: 3,
      matchKeywords: ["tanque", "estanqueidade", "ambiental"],
    },
  ],
  "m-16": [
    {
      nome: "Implantação de Sistemas de Vendas",
      tempo_asis_default: 10,
      tempo_tobe_default: 3,
      hc_default: 2,
      matchKeywords: ["sistema", "telemetria", "vendas"],
    },
  ],
  "m-17": [
    {
      nome: "Inauguração e Startup do Posto",
      tempo_asis_default: 7,
      tempo_tobe_default: 2,
      hc_default: 2,
      matchKeywords: ["inauguracao", "startup", "treinamento"],
    },
  ],
};

const DEFAULT_POSTO_IMAGEM =
  "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=600&auto=format&fit=crop";

export function JornadaEmbandeiramento({ selectedProjetoIds }: { selectedProjetoIds?: string[] | null }) {
  const qc = useQueryClient();

  // Active user and admin check
  const { data: myRole = "visualizador" } = useQuery({
    queryKey: ["my-role-jornada"],
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

  // Selected Macroprocesso for Drill Down
  const [selectedMacroId, setSelectedMacroId] = useState<string>("m-1");

  // Fetch real initiatives from selected projects to group microprocessos
  const { data: allInitiatives = [] } = useQuery({
    queryKey: ["jornada-initiatives", selectedProjetoIds?.join(",") ?? "_all"],
    queryFn: async () => {
      let q = supabase.from("iniciativas").select("id, titulo, projeto_id").is("deleted_at", null);
      if (selectedProjetoIds && selectedProjetoIds.length > 0) {
        q = q.in("projeto_id", selectedProjetoIds);
      }
      const { data } = await q;
      return data ?? [];
    },
  });

  // Load Macroprocessos config
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
      return (data.valor as Macroprocesso[]).sort((a, b) => a.ordem - b.ordem);
    },
  });

  // Load Posto image config
  const { data: postoImagem = DEFAULT_POSTO_IMAGEM } = useQuery<string>({
    queryKey: ["jornada-posto-imagem"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "jornada_posto_imagem")
        .maybeSingle();
      return (data?.valor as string) || DEFAULT_POSTO_IMAGEM;
    },
  });

  // Fetch real microprocessos from Supabase
  const { data: dbMicroprocessos = [], isLoading: isLoadingMicros } = useQuery({
    queryKey: ["jornada-db-microprocessos"],
    queryFn: async () => {
      const { data } = await supabase.from("microprocessos").select("*").is("deleted_at", null);
      return data ?? [];
    },
  });

  // Mutations for Admin configs
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
      toast.success("Macroprocessos salvos com sucesso!");
    },
    onError: (err: any) => {
      toast.error(`Erro ao salvar: ${err.message}`);
    },
  });

  const savePostoImagemMutation = useMutation({
    mutationFn: async (url: string) => {
      const { error } = await supabase.from("app_configuracoes").upsert({
        chave: "jornada_posto_imagem",
        valor: url,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jornada-posto-imagem"] });
      toast.success("Imagem do posto atualizada!");
    },
  });

  // Edit states
  const [editingMacro, setEditingMacro] = useState<Macroprocesso | null>(null);
  const [editingMicro, setEditingMicro] = useState<any | null>(null);
  const [newImageInput, setNewImageInput] = useState("");
  const [showImageConfig, setShowImageConfig] = useState(false);

  // Match custom or default micros to real database records
  const mappedMicroprocessos = useMemo(() => {
    const macro = macroprocessos.find((m) => m.id === selectedMacroId);
    if (!macro) return [];

    // If there is a custom list of microprocessos configured for this macro
    if (macro.microprocessos && macro.microprocessos.length > 0) {
      return macro.microprocessos.map((customMicro) => {
        // Find if there is a live update in dbMicroprocessos
        const dbMatch = dbMicroprocessos.find(
          (dbM) =>
            dbM.id === customMicro.id ||
            dbM.titulo.toLowerCase() === customMicro.nome.toLowerCase(),
        );

        if (dbMatch) {
          return {
            id: dbMatch.id,
            nome: dbMatch.titulo,
            tempo_asis: dbMatch.lead_time_atual ?? customMicro.tempo_asis,
            tempo_tobe: dbMatch.lead_time_futuro ?? customMicro.tempo_tobe,
            hc: dbMatch.hc_atual ?? customMicro.hc,
            progress: dbMatch.percentual_avanco ?? customMicro.progress,
            automation: dbMatch.percentual_evolucao ?? customMicro.automation,
            status: dbMatch.status || customMicro.status || "Mapeada",
            isMapped: true,
            realRecord: dbMatch,
          };
        }

        // Return custom micro values
        return {
          id: customMicro.id,
          nome: customMicro.nome,
          tempo_asis: customMicro.tempo_asis,
          tempo_tobe: customMicro.tempo_tobe,
          hc: customMicro.hc,
          progress: customMicro.progress ?? 0,
          automation: customMicro.automation ?? 0,
          status: customMicro.status || "Mapeada",
          isMapped: customMicro.isMapped ?? false,
          realRecord: null,
        };
      });
    }

    // Fallback to default list
    const defaultList = DEFAULT_MICROS[selectedMacroId] || [];
    return defaultList.map((def, index) => {
      // Find a matched microprocesso in the database using title keywords
      const match = dbMicroprocessos.find((dbM) => {
        const titleLower = dbM.titulo.toLowerCase();
        return def.matchKeywords.some((key) => titleLower.includes(key));
      });

      if (match) {
        return {
          id: match.id,
          nome: match.titulo,
          tempo_asis: match.lead_time_atual ?? def.tempo_asis_default,
          tempo_tobe: match.lead_time_futuro ?? def.tempo_tobe_default,
          hc: match.hc_atual ?? def.hc_default,
          progress: match.percentual_avanco ?? 0,
          automation: match.percentual_evolucao ?? 0, // percentual de automação
          status: match.status || "Mapeada",
          isMapped: true,
          realRecord: match,
        };
      }

      // Return default lighter fallback indicating "not mapped"
      return {
        id: `def-${selectedMacroId}-${index}`,
        nome: def.nome,
        tempo_asis: def.tempo_asis_default,
        tempo_tobe: def.tempo_tobe_default,
        hc: def.hc_default,
        progress: 0,
        automation: 0,
        status: "Mapeada",
        isMapped: false,
        realRecord: null,
      };
    });
  }, [selectedMacroId, macroprocessos, dbMicroprocessos]);

  // Aggregate scorecard placards: sum of AS IS and TO BE values of the macroprocessos
  const totalAsIsDays = useMemo(() => {
    let sum = 0;
    macroprocessos.forEach((macro) => {
      const micros =
        macro.microprocessos && macro.microprocessos.length > 0
          ? macro.microprocessos
          : DEFAULT_MICROS[macro.id] || [];

      if (micros.length > 0) {
        let macroSum = 0;
        micros.forEach((micro: any) => {
          const dbM = dbMicroprocessos.find(
            (m) => m.id === micro.id || m.titulo.toLowerCase() === micro.nome?.toLowerCase(),
          );
          if (dbM) {
            macroSum += dbM.lead_time_atual ?? micro.tempo_asis ?? micro.tempo_asis_default ?? 0;
          } else {
            macroSum += micro.tempo_asis ?? micro.tempo_asis_default ?? 0;
          }
        });
        sum += macroSum;
      } else {
        sum += macro.tempo_total || 0;
      }
    });
    return sum;
  }, [macroprocessos, dbMicroprocessos]);

  const totalToBeDays = useMemo(() => {
    let sum = 0;
    macroprocessos.forEach((macro) => {
      const micros =
        macro.microprocessos && macro.microprocessos.length > 0
          ? macro.microprocessos
          : DEFAULT_MICROS[macro.id] || [];

      if (micros.length > 0) {
        let macroSum = 0;
        micros.forEach((micro: any) => {
          const dbM = dbMicroprocessos.find(
            (m) => m.id === micro.id || m.titulo.toLowerCase() === micro.nome?.toLowerCase(),
          );
          if (dbM) {
            macroSum += dbM.lead_time_futuro ?? micro.tempo_tobe ?? micro.tempo_tobe_default ?? 0;
          } else {
            macroSum += micro.tempo_tobe ?? micro.tempo_tobe_default ?? 0;
          }
        });
        sum += macroSum;
      } else {
        sum += Math.round((macro.tempo_total || 0) * 0.5);
      }
    });
    return sum;
  }, [macroprocessos, dbMicroprocessos]);

  // Reorder macroprocessos
  const handleMove = (direction: "up" | "down", index: number) => {
    if (!isAdmin) return;
    const newList = [...macroprocessos];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newList.length) return;

    // Swap elements
    const temp = newList[index];
    newList[index] = newList[targetIdx];
    newList[targetIdx] = temp;

    // Recalculate order indices
    newList.forEach((m, idx) => {
      m.ordem = idx + 1;
    });

    saveMacrosMutation.mutate(newList);
  };

  const handleCreateMacro = () => {
    if (!isAdmin) return;
    const newMacro: Macroprocesso = {
      id: "macro-" + Math.random().toString(36).substring(2, 9),
      nome: "Novo Macroprocesso",
      area_responsavel: "Nova Área",
      tempo_total: 10,
      ordem: macroprocessos.length + 1,
      microprocessos: []
    };
    const newList = [...macroprocessos, newMacro];
    saveMacrosMutation.mutate(newList);
    setSelectedMacroId(newMacro.id);
    setEditingMacro(newMacro); // open edit modal right away!
    toast.success("Macroprocesso adicionado! Configure-o abaixo.");
  };

  const handleDeleteMacro = (id: string) => {
    if (!isAdmin) return;
    if (macroprocessos.length <= 1) {
      toast.error("O sistema precisa de pelo menos 1 macroprocesso.");
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir este macroprocesso?")) return;
    const newList = macroprocessos.filter((m) => m.id !== id).map((m, idx) => ({ ...m, ordem: idx + 1 }));
    saveMacrosMutation.mutate(newList);
    if (selectedMacroId === id) {
      setSelectedMacroId(newList[0]?.id || "");
    }
    toast.success("Macroprocesso removido com sucesso!");
  };

  const handleSaveMacroEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMacro) return;
    const newList = macroprocessos.map((m) => (m.id === editingMacro.id ? editingMacro : m));
    saveMacrosMutation.mutate(newList);
    setEditingMacro(null);
  };

  const handleDeleteMicro = (microId: string) => {
    if (!isAdmin) return;
    if (!window.confirm("Deseja realmente remover este microprocesso do macroprocesso?")) return;

    const macro = macroprocessos.find((m) => m.id === selectedMacroId);
    if (macro) {
      const currentCustomList = macro.microprocessos || DEFAULT_MICROS[selectedMacroId]?.map((def, idx) => ({
        id: `def-${selectedMacroId}-${idx}`,
        nome: def.nome,
        status: "Mapeada",
        progress: 0,
        tempo_asis: def.tempo_asis_default,
        tempo_tobe: def.tempo_tobe_default,
        hc: def.hc_default,
        automation: 0,
        isMapped: false
      })) || [];

      const updatedList = currentCustomList.filter((item: any) => item.id !== microId);

      const newMacrosConfig = macroprocessos.map((m) => {
        if (m.id === selectedMacroId) {
          return { ...m, microprocessos: updatedList };
        }
        return m;
      });

      saveMacrosMutation.mutate(newMacrosConfig);
      toast.success("Microprocesso removido!");
    }
  };

  const handleSaveMicroEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMicro) return;

    try {
      let finalId = editingMicro.id;

      // Determine initiative ID to associate
      let iniId = editingMicro.iniciativa_id;
      if (!iniId) {
        // Find initiative for "Expansão de Postos"
        const { data: inis } = await supabase.from("iniciativas").select("id").limit(1);
        iniId = inis?.[0]?.id;
      }

      if (!iniId) {
        toast.error("Nenhuma iniciativa encontrada para associar.");
        return;
      }

      if (editingMicro.isNewDatabaseRecord) {
        // We insert a new record in the microprocessos table
        const newRecord = {
          titulo: editingMicro.nome,
          lead_time_atual: editingMicro.tempo_asis,
          lead_time_futuro: editingMicro.tempo_tobe,
          hc_atual: editingMicro.hc,
          status: editingMicro.status,
          percentual_evolucao: editingMicro.automation,
          percentual_avanco: editingMicro.progress,
          iniciativa_id: iniId,
          created_by: "Administrador",
        };
        const { data, error } = await supabase.from("microprocessos").insert(newRecord).select("id").single();
        if (error) throw error;
        finalId = data.id;
        toast.success("Novo microprocesso registrado no banco!");
      } else if (editingMicro.id && editingMicro.isMapped) {
        // Update existing record
        const { error } = await supabase
          .from("microprocessos")
          .update({
            lead_time_atual: editingMicro.tempo_asis,
            lead_time_futuro: editingMicro.tempo_tobe,
            hc_atual: editingMicro.hc,
            status: editingMicro.status,
            percentual_evolucao: editingMicro.automation,
            percentual_avanco: editingMicro.progress,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingMicro.id);
        if (error) throw error;
        toast.success("Dados do microprocesso sincronizados com o banco!");
      }

      // Now we update the custom microprocessos array for this macroprocesso in the config
      const macro = macroprocessos.find((m) => m.id === selectedMacroId);
      if (macro) {
        // Initialize custom list if not exists, or get fallback list
        const currentCustomList = macro.microprocessos || DEFAULT_MICROS[selectedMacroId]?.map((def, idx) => ({
          id: `def-${selectedMacroId}-${idx}`,
          nome: def.nome,
          status: "Mapeada",
          progress: 0,
          tempo_asis: def.tempo_asis_default,
          tempo_tobe: def.tempo_tobe_default,
          hc: def.hc_default,
          automation: 0,
          isMapped: false
        })) || [];

        let updatedList;
        if (editingMicro.isNew) {
          // Add new to custom list
          updatedList = [...currentCustomList, {
            id: finalId || "micro-" + Math.random().toString(36).substring(2, 9),
            nome: editingMicro.nome,
            status: editingMicro.status,
            progress: editingMicro.progress,
            tempo_asis: editingMicro.tempo_asis,
            tempo_tobe: editingMicro.tempo_tobe,
            hc: editingMicro.hc,
            automation: editingMicro.automation,
            isMapped: true
          }];
        } else {
          // Edit existing in custom list
          updatedList = currentCustomList.map((item: any) => {
            if (item.id === editingMicro.id) {
              return {
                ...item,
                nome: editingMicro.nome,
                status: editingMicro.status,
                progress: editingMicro.progress,
                tempo_asis: editingMicro.tempo_asis,
                tempo_tobe: editingMicro.tempo_tobe,
                hc: editingMicro.hc,
                automation: editingMicro.automation,
                isMapped: true
              };
            }
            return item;
          });
        }

        const newMacrosConfig = macroprocessos.map((m) => {
          if (m.id === selectedMacroId) {
            return {
              ...m,
              microprocessos: updatedList
            };
          }
          return m;
        });

        saveMacrosMutation.mutate(newMacrosConfig);
      }

      qc.invalidateQueries({ queryKey: ["jornada-db-microprocessos"] });
      setEditingMicro(null);
    } catch (err: any) {
      toast.error(`Erro ao salvar: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 bg-white text-slate-800 rounded-2xl p-6 border border-slate-200 shadow-md relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-vibra-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-5 gap-4 shrink-0 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-vibra-50 border border-vibra-100 px-3 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-vibra-800">
              Mapeamento de Processo
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-[18px] font-black tracking-tight text-slate-900 mt-1.5 flex items-center gap-2">
            Jornada de Embandeiramento e Implantação
          </h2>
          <p className="text-[12px] text-slate-500 mt-1">
            Mapeamento das frentes e iniciativas estratégicas simulando o fluxo operacional ponta a
            ponta.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setNewImageInput(postoImagem);
              setShowImageConfig(true);
            }}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition shrink-0 shadow-sm"
          >
            <Settings className="h-3.5 w-3.5 text-vibra-600" />
            <span>Configurar Imagem</span>
          </button>
        )}
      </div>

      {/* 2. Scoreboard Placards (Total AS IS e Total TO BE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {/* Placar AS IS */}
        <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-red-200 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1">
            <span className="text-[9.5px] font-extrabold text-red-600 uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-red-500" />
              Tempo Total AS IS (Atual)
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[32px] font-black tracking-tighter text-red-600 font-mono">
                {totalAsIsDays}
              </span>
              <span className="text-xs font-bold text-slate-400">DIAS</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
              Soma total planejada dos prazos e gargalos atuais identificados nos Macroprocessos.
            </p>
          </div>
          <div className="h-12 w-12 bg-red-100/50 border border-red-200/60 rounded-lg flex items-center justify-center text-red-700 text-lg font-mono font-black shrink-0 shadow-sm">
            AS IS
          </div>
        </div>

        {/* Placar TO BE */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:border-emerald-200 transition">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-1">
            <span className="text-[9.5px] font-extrabold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-emerald-500" />
              Tempo Total TO BE (Alvo)
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-[32px] font-black tracking-tighter text-emerald-600 font-mono">
                {totalToBeDays}
              </span>
              <span className="text-xs font-bold text-slate-400">DIAS</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">
              Tempo alvo projetado com base nas automações, otimizações e sinergias de frentes.
            </p>
          </div>
          <div className="h-12 w-12 bg-emerald-100/50 border border-emerald-200/60 rounded-lg flex items-center justify-center text-emerald-700 text-lg font-mono font-black shrink-0 shadow-sm">
            TO BE
          </div>
        </div>
      </div>

      {/* 3. The Visual Road Journey Section */}
      {isAdmin && (
        <div className="flex items-center justify-end gap-2 relative z-10 px-2 mt-2 w-full max-w-5xl self-center">
          <button
            onClick={handleCreateMacro}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 px-3 text-[11px] font-bold text-white transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Novo Macroprocesso</span>
          </button>
        </div>
      )}

      <div className="relative py-12 px-2 bg-slate-50/60 rounded-2xl border border-slate-200/60 overflow-hidden shrink-0 z-10 flex flex-col items-center w-full">
        {/* Animated road pathway drawing background */}
        <div className="absolute top-1/2 left-0 right-0 h-16 bg-slate-200 -translate-y-1/2 pointer-events-none rounded-sm border-y border-slate-300 flex items-center justify-around overflow-hidden">
          {/* Dash markings */}
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 animate-pulse shrink-0" />
          <div className="w-10 h-1 bg-orange-400 opacity-60 shrink-0" />
        </div>

        {/* Pathway Container */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10 items-stretch">
          {/* Macroprocesso Cards sequentially distributed */}
          {macroprocessos.map((macro, index) => {
            const isSelected = selectedMacroId === macro.id;
            return (
              <div
                key={macro.id}
                onClick={() => setSelectedMacroId(macro.id)}
                className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-300 transform flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-2 border-orange-500 shadow-lg -translate-y-2 ring-1 ring-orange-500/30"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:-translate-y-1 hover:shadow-sm"
                }`}
              >
                {/* Header indicators */}
                <div className="flex items-center justify-between shrink-0">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black font-mono text-slate-500">
                    0{macro.ordem}
                  </span>

                  {isAdmin && (
                    <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleMove("up", index)}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition"
                        title="Mover para cima"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleMove("down", index)}
                        disabled={index === macroprocessos.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 transition"
                        title="Mover para baixo"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => setEditingMacro(macro)}
                        className="p-1 text-slate-400 hover:text-slate-800 transition"
                        title="Editar"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteMacro(macro.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition"
                        title="Excluir"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Macro Name */}
                <div className="mt-3 min-h-[38px]">
                  <h4
                    className={`text-[11.5px] font-black leading-tight ${
                      isSelected ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {macro.nome}
                  </h4>
                </div>

                {/* Responsible area */}
                <p
                  className="text-[9.5px] text-slate-400 truncate mt-1"
                  title={macro.area_responsavel}
                >
                  {macro.area_responsavel}
                </p>

                {/* Macro duration */}
                <div className="mt-4 border-t border-slate-100 pt-2 flex items-center justify-between">
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">
                    Duração
                  </span>
                  <span className="text-[12px] font-black text-orange-600 font-mono">
                    {macro.tempo_total}d
                  </span>
                </div>

                {/* Arrow visual line spacer */}
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden md:block z-20 pointer-events-none opacity-40">
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              </div>
            );
          })}

          {/* Destination Gas Station Image representation */}
          <div className="relative flex flex-col justify-between p-4 rounded-xl border border-emerald-200 bg-white h-full min-h-[150px] group overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition duration-300 pointer-events-none" />
            <div className="h-20 w-full rounded-lg overflow-hidden relative mb-2">
              <img
                src={postoImagem}
                alt="Posto de combustível Petrobras"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
            <div className="text-center relative z-10 mt-auto">
              <span className="text-[10px] font-extrabold text-emerald-700 leading-tight tracking-tight uppercase flex items-center gap-1 justify-center">
                <MapPin className="h-3 w-3 text-emerald-500" />
                Posto Ativo
              </span>
              <span className="text-[8.5px] font-semibold text-slate-500 block mt-0.5">
                Vila Petrobras (Nova Imagem)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Selected Macroprocesso Detail Drill-down (Microprocessos Panel) */}
      {selectedMacroId && (
        <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-5 space-y-4 shrink-0 relative z-10 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[9px] font-black text-vibra-800 uppercase tracking-wider">
                Detalhamento Operacional
              </span>
              <h3 className="text-sm font-bold text-slate-800 mt-0.5">
                Microprocessos de{" "}
                {macroprocessos.find((m) => m.id === selectedMacroId)?.nome || "Macroprocesso"}
              </h3>
            </div>
            <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500">
              {mappedMicroprocessos.length} microprocessos
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mappedMicroprocessos.map((micro) => {
              const opacityClass = micro.isMapped
                ? "opacity-100 shadow-sm"
                : "opacity-60 hover:opacity-85";
              return (
                <div
                  key={micro.id}
                  className={`bg-white border rounded-xl p-4 space-y-3 relative overflow-hidden transition-all duration-300 ${opacityClass} ${
                    micro.isMapped ? "border-slate-200" : "border-dashed border-slate-300"
                  }`}
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider ${
                        micro.status === "Implantada"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : micro.status === "Em Desenvolvimento"
                            ? "bg-amber-50 text-amber-700 border border-amber-100"
                            : "bg-slate-50 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {micro.status}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {!micro.isMapped && (
                        <span className="rounded bg-slate-100 text-[8px] font-bold text-slate-400 px-1.5 py-0.2">
                          Não Mapeado
                        </span>
                      )}

                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingMicro(micro)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-800 transition"
                            title="Editar Microprocesso"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteMicro(micro.id)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-600 transition"
                            title="Remover Microprocesso"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-[12.5px] font-bold text-slate-800 line-clamp-2 pr-4 leading-snug">
                    {micro.nome}
                  </h4>

                  {/* Horizontal Progress (Avanço) & Vertical progress (Automação) */}
                  <div className="grid grid-cols-12 gap-3 pt-2">
                    {/* Horizontal Progress */}
                    <div className="col-span-9 space-y-1.5">
                      <div className="flex items-center justify-between text-[9.5px] font-semibold text-slate-500">
                        <span>Avanço do Mapeamento</span>
                        <span className="font-mono text-slate-700">{micro.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
                          style={{ width: `${micro.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Vertical Progress (Percentual de Automação em pé) */}
                    <div className="col-span-3 flex flex-col items-center justify-center border-l border-slate-100 pl-2">
                      <div
                        className="h-10 w-2.5 bg-slate-100 rounded-full overflow-hidden relative"
                        title={`Automação: ${micro.automation}%`}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-emerald-500 transition-all duration-500"
                          style={{ height: `${micro.automation}%` }}
                        />
                      </div>
                      <span className="text-[8px] font-black text-slate-400 mt-1 uppercase tracking-tight whitespace-nowrap">
                        Automação
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-600 mt-0.5">
                        {micro.automation}%
                      </span>
                    </div>
                  </div>

                  {/* Operational Metrics footer */}
                  <div className="border-t border-slate-100 pt-2 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-slate-500">
                    <div className="border-r border-slate-100 pr-1">
                      <span className="text-[8.5px] block text-slate-400 uppercase font-bold">
                        AS IS
                      </span>
                      <span className="font-mono font-bold text-slate-700">
                        {micro.tempo_asis}d
                      </span>
                    </div>
                    <div className="border-r border-slate-100 pr-1">
                      <span className="text-[8.5px] block text-slate-400 uppercase font-bold">
                        TO BE
                      </span>
                      <span className="font-mono font-bold text-emerald-600">
                        {micro.tempo_tobe}d
                      </span>
                    </div>
                    <div>
                      <span className="text-[8.5px] block text-slate-400 uppercase font-bold">
                        HC
                      </span>
                      <span className="font-mono font-bold text-slate-700">{micro.hc} HC</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {isAdmin && (
              <button
                onClick={() => {
                  setEditingMicro({
                    id: "",
                    nome: "",
                    tempo_asis: 5,
                    tempo_tobe: 2,
                    hc: 1,
                    progress: 0,
                    automation: 0,
                    status: "Mapeada",
                    isNew: true,
                    isNewDatabaseRecord: true
                  });
                }}
                className="bg-white hover:bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 min-h-[150px] transition-all duration-300 group shadow-sm"
              >
                <div className="p-3 bg-slate-100 rounded-full group-hover:bg-slate-200 transition">
                  <Plus className="h-5 w-5 text-slate-500" />
                </div>
                <span className="text-xs font-bold text-slate-600">Adicionar Microprocesso</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Admin Dialog Modal: Macroprocesso Edit */}
      {editingMacro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md w-full shadow-2xl text-white">
            <h3 className="text-sm font-black text-white border-b border-slate-800 pb-3">
              Editar Macroprocesso
            </h3>
            <form onSubmit={handleSaveMacroEdit} className="space-y-4 mt-4">
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400">
                  Nome do Macroprocesso
                </label>
                <input
                  type="text"
                  required
                  value={editingMacro.nome}
                  onChange={(e) => setEditingMacro({ ...editingMacro, nome: e.target.value })}
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400">Áreas Responsáveis</label>
                <input
                  type="text"
                  required
                  value={editingMacro.area_responsavel}
                  onChange={(e) =>
                    setEditingMacro({ ...editingMacro, area_responsavel: e.target.value })
                  }
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400">Tempo Total (Dias)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={editingMacro.tempo_total}
                  onChange={(e) =>
                    setEditingMacro({ ...editingMacro, tempo_total: Number(e.target.value) })
                  }
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMacro(null)}
                  className="px-3.5 py-1.5 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg hover:bg-slate-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition shadow"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dialog Modal: Microprocesso Edit */}
      {editingMicro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-lg w-full shadow-2xl text-white">
            <h3 className="text-sm font-black text-white border-b border-slate-800 pb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-vibra-500" />
              {editingMicro.isNew
                ? "Criar ou Associar Microprocesso"
                : "Editar Microprocesso"}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1">
              Configure os tempos, FTE/Headcount (HC), status e nível de avanço do microprocesso.
            </p>
            <form onSubmit={handleSaveMicroEdit} className="space-y-4 mt-4">
              {editingMicro.isNew && (
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-orange-400">
                    Importar de Microprocesso Existente no Banco
                  </label>
                  <select
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "new") {
                        setEditingMicro({
                          id: "",
                          nome: "",
                          tempo_asis: 5,
                          tempo_tobe: 2,
                          hc: 1,
                          progress: 0,
                          automation: 0,
                          status: "Mapeada",
                          isNew: true,
                          isNewDatabaseRecord: true
                        });
                      } else {
                        const matched = dbMicroprocessos.find((dbM) => dbM.id === val);
                        if (matched) {
                          setEditingMicro({
                            id: matched.id,
                            nome: matched.titulo,
                            tempo_asis: matched.lead_time_atual ?? 5,
                            tempo_tobe: matched.lead_time_futuro ?? 2,
                            hc: matched.hc_atual ?? 1,
                            progress: matched.percentual_avanco ?? 0,
                            automation: matched.percentual_evolucao ?? 0,
                            status: matched.status || "Mapeada",
                            iniciativa_id: matched.iniciativa_id,
                            isNew: true,
                            isNewDatabaseRecord: false,
                            isMapped: true
                          });
                        }
                      }
                    }}
                    value={editingMicro.isNewDatabaseRecord ? "new" : editingMicro.id}
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  >
                    <option value="new">[ Criar Novo Microprocesso e Registrar no Banco ]</option>
                    {dbMicroprocessos.map((dbM) => {
                      const ini = allInitiatives.find((i) => i.id === dbM.iniciativa_id);
                      const isProjectMatch = !!ini;
                      const badge = isProjectMatch ? "★" : "⚡";
                      return (
                        <option key={dbM.id} value={dbM.id}>
                          {badge} {dbM.titulo} ({ini?.titulo || "Outra Iniciativa"})
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-[9px] text-slate-400">
                    ★ Indica microprocessos pertencentes aos projetos selecionados no painel executivo.
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400">
                  Nome do Microprocesso
                </label>
                <input
                  type="text"
                  required
                  disabled={!editingMicro.isNewDatabaseRecord && !editingMicro.isNew}
                  value={editingMicro.nome}
                  onChange={(e) => setEditingMicro({ ...editingMicro, nome: e.target.value })}
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500 disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-400">
                    Tempo AS IS (Dias)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingMicro.tempo_asis}
                    onChange={(e) =>
                      setEditingMicro({ ...editingMicro, tempo_asis: Number(e.target.value) })
                    }
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-400">
                    Tempo TO BE (Dias)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingMicro.tempo_tobe}
                    onChange={(e) =>
                      setEditingMicro({ ...editingMicro, tempo_tobe: Number(e.target.value) })
                    }
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-400">
                    FTE / Headcount (HC)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={editingMicro.hc}
                    onChange={(e) =>
                      setEditingMicro({ ...editingMicro, hc: Number(e.target.value) })
                    }
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-400">Status</label>
                  <select
                    value={editingMicro.status}
                    onChange={(e) => setEditingMicro({ ...editingMicro, status: e.target.value })}
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  >
                    <option value="Mapeada">Mapeada</option>
                    <option value="Em Desenvolvimento">Em Desenvolvimento</option>
                    <option value="Implantada">Implantada</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-400">
                    Avanço do Mapeamento (%)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={editingMicro.progress}
                    onChange={(e) =>
                      setEditingMicro({ ...editingMicro, progress: Number(e.target.value) })
                    }
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] font-bold text-slate-400">
                    Potencial de Automação (%)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={editingMicro.automation}
                    onChange={(e) =>
                      setEditingMicro({ ...editingMicro, automation: Number(e.target.value) })
                    }
                    className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMicro(null)}
                  className="px-3.5 py-1.5 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg hover:bg-slate-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition shadow"
                >
                  Sincronizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dialog Modal: Posto Image Configuration */}
      {showImageConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-md w-full shadow-2xl text-white">
            <h3 className="text-sm font-black text-white border-b border-slate-800 pb-3 flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4 text-vibra-500" />
              Configurar Imagem do Posto
            </h3>
            <div className="space-y-4 mt-4">
              <div className="space-y-1">
                <label className="text-[10.5px] font-bold text-slate-400">
                  URL da Imagem do Posto
                </label>
                <input
                  type="text"
                  required
                  placeholder="Insera a URL pública da imagem..."
                  value={newImageInput}
                  onChange={(e) => setNewImageInput(e.target.value)}
                  className="h-9 w-full rounded-md border border-slate-700 bg-slate-800 px-3 text-[12px] font-semibold text-white outline-none focus:border-vibra-500"
                />
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                <span className="text-[9px] font-extrabold text-slate-500 block uppercase">
                  Pré-visualização
                </span>
                {newImageInput ? (
                  <div className="h-28 w-full rounded overflow-hidden mt-1.5 border border-slate-800">
                    <img
                      src={newImageInput}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={() => toast.error("Falha ao carregar a imagem informada.")}
                    />
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Insera uma URL de imagem válida.
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageConfig(false)}
                  className="px-3.5 py-1.5 border border-slate-700 text-xs font-bold text-slate-400 rounded-lg hover:bg-slate-800 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    savePostoImagemMutation.mutate(newImageInput);
                    setShowImageConfig(false);
                  }}
                  className="px-3.5 py-1.5 bg-vibra-700 text-white text-xs font-bold rounded-lg hover:bg-vibra-800 transition shadow"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
