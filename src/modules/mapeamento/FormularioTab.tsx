import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useHierarchy } from "@/stores/hierarchy";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { resequenceProjectIniciativas } from "@/lib/iniciativaSequence";
import { PicklistField } from "@/components/PicklistField";
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  HelpCircle,
  TrendingUp,
  Coins,
  Clock,
  Users,
  CheckCircle,
  Calendar,
  AlertTriangle,
  Flame,
  Wrench,
  Sparkles,
  Info,
  ChevronDown,
  RefreshCw,
  Lock,
  FileSpreadsheet,
  Zap,
  Check,
  Percent,
  MapPin,
  Fuel,
} from "lucide-react";
import {
  calcTempoMedio,
  calcGanhoTempo,
  calcPercReducao,
  calcHorasDesperdicadasMes,
  calcHorasMes,
  calcIndiceQualidade,
  calcScoreAutomacao,
  calcComplexidadeAutomacao,
  calcRiscoOperacional,
  calcHorasEconomizadasMes,
  calcEconomiaAnual,
  calcFteLiberado,
  calcRoi,
  calcPayback,
  calcSmartScore,
  nivelPrioridade,
  type CalcInput,
} from "@/lib/iniciativaCalc";

// Brand Colors
const VIBRA_GREEN = "#268200";
const VIBRA_GREEN_DARK = "#044317";

// Default State for a blank or loading initiative
const initialFormState = {
  titulo: "",
  descricao: "",
  status: "Backlog",
  prioridade: "Média",
  impacto_negocio: 3,
  impacto_cliente: 3,
  impacto_financeiro: 3,
  esforco: 3,
  complexidade: 3,
  vice_presidente: "",
  diretor: "",
  gerente: "",
  area_responsavel: "",
  gestor_responsavel: "",
  analista_responsavel: "",
  data_diagnostico: "",
  cliente_processo: [] as string[],
  processo: "",
  objetivo_processo: "",
  dor_identificada: "",
  causa_raiz_inicial: "",
  categoria_dor: "",
  frequencia: "",
  sistemas_paralelos: [] as string[],
  desperdicios_lean: [] as string[],
  impacto_cliente_sn: false,
  impacto_financeiro_sn: false,
  impacto_compliance_sn: false,
  tempo_min: 0,
  tempo_max: 0,
  tempo_ideal: 0,
  tempo_futuro: 0,
  tempo_espera: 0,
  motivo_reducao: "",
  execucoes_dia: 0,
  execucoes_semana: 0,
  execucoes_mes: 0,
  taxa_erro: 0,
  retrabalho: 0,
  sla_existe: false,
  sla_min: 0,
  atividade_manual: false,
  digitacao_manual: false,
  copia_cola: false,
  excel_paralelo: false,
  qtd_planilhas: 0,
  local_planilhas: [] as string[],
  locais_consulta: [] as string[],
  passos_manuais: [] as string[],
  alternancia_telas: [] as string[],
  integracoes_necessarias: [] as string[],
  qtd_regras: "Até 3",
  volume_excecoes: "Nenhuma",
  automacao_sugerida: "",
  hc_atual: 0,
  pessoas_envolvidas: 0,
  dep_pessoa_chave: false,
  tempo_capacitacao: 0,
  substituto_treinado: true,
  substitutos_detalhes: "",
  custo_hora: 0,
  horas_gastas_mes: 0,
  horas_futuras_mes: 0,
  multas_evitadas: 0,
  custo_implementacao: 0,
  volume_financeiro: 0,
  links_relacionados: "",
  evidencia_atual: "",
  evidencia_futura: "",
  urgencia: "Normal",
  expectativa_produtividade: 0,
  complexidade_processo: "Baixa",
  dependencia_ti: false,
  tipo_melhoria: "Otimização",
  observacoes: "",
  postos_total: 0,
  postos_nova_imagem: 0,
  tempo_embandeiramento_inicial: 0,
  tempo_embandeiramento_estimado: 0,
  tempo_embandeiramento_real: 0,
  meta_postos_nova_imagem: 0,
  capacidade_nova_imagem_atual: 0,
  capacidade_implantacao_atual: 0,
  capacidade_implantacao_estimada: 0,
  capacidade_embandeiramento_atual: 0,
  capacidade_embandeiramento_estimada: 0,
  capacidade_renovacao_atual: 0,
  capacidade_renovacao_estimada: 0,
  capacidade_geral_futura_estimada: 0,
};

type FormState = typeof initialFormState;

export function FormularioTab() {
  const qc = useQueryClient();
  const { projetoId, setProjeto, iniciativaId, setIniciativa } = useHierarchy();

  // Local form states
  const [form, setForm] = useState<FormState>(initialFormState);
  const [novoProjetoNome, setNovoProjetoNome] = useState("");
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [autoPriorizacao, setAutoPriorizacao] = useState(true);

  // New specific fields for Componente de Pessoas and FTE Distribution
  const [pesoOperacional, setPesoOperacional] = useState<number>(0);
  const [pessoasDetalhes, setPessoasDetalhes] = useState<string>("");
  const [fteDistrib, setFteDistrib] = useState<Array<{ area: string; fte: number }>>([
    { area: "SNEG (Operações)", fte: 0 },
    { area: "SPCOM (Comercial)", fte: 0 },
    { area: "Financeiro", fte: 0 },
    { area: "Operações / Logística", fte: 0 },
    { area: "TI & Sistemas", fte: 0 },
    { area: "Atendimento & Backoffice", fte: 0 },
  ]);

  const sumFteDistrib = useMemo(() => {
    return fteDistrib.reduce((sum, item) => sum + (Number(item.fte) || 0), 0);
  }, [fteDistrib]);

  const isFteValidationValid = useMemo(() => {
    const hcVal = Number(form.hc_atual) || 0;
    return Math.abs(sumFteDistrib - hcVal) < 0.001;
  }, [sumFteDistrib, form.hc_atual]);

  // Get user role and permissions
  const { data: myRole = "visualizador" } = useQuery({
    queryKey: ["my-role"],
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

  const isAdmin = myRole === "admin" || myRole === "editor_master" || myRole === "editor_basico";

  // Fetch all projects
  const { data: projetos = [], isLoading: isLoadingProjetos } = useQuery({
    queryKey: ["projetos-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projetos")
        .select("id, nome")
        .is("deleted_at", null)
        .order("nome");
      if (error) throw error;
      return data ?? [];
    },
  });

  // Fetch initiatives under selected project
  const { data: iniciativas = [], isLoading: isLoadingIniciativas } = useQuery({
    queryKey: ["iniciativas-by-projeto", projetoId],
    enabled: !!projetoId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("iniciativas")
        .select("*")
        .eq("projeto_id", projetoId!)
        .is("deleted_at", null)
        .order("titulo");
      if (error) throw error;
      return data ?? [];
    },
  });

  // Fetch AS-IS steps for active initiative
  const { data: asisSteps = [] } = useQuery({
    queryKey: ["form-asis-steps", iniciativaId],
    enabled: !!iniciativaId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asis_passos")
        .select("tempo")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);
      if (error) throw error;
      return data ?? [];
    },
  });

  // Fetch TO-BE steps for active initiative
  const { data: tobeSteps = [] } = useQuery({
    queryKey: ["form-tobe-steps", iniciativaId],
    enabled: !!iniciativaId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tobe_passos")
        .select("tempo, ganho_fte")
        .eq("iniciativa_id", iniciativaId!)
        .is("deleted_at", null);
      if (error) throw error;
      return data ?? [];
    },
  });

  // Active project details
  const activeProject = useMemo(() => {
    return projetos.find((p) => p.id === projetoId);
  }, [projetos, projetoId]);

  // Active initiative details
  const activeInitiative = useMemo(() => {
    if (isCreatingNew) return null;
    return iniciativas.find((i) => i.id === iniciativaId);
  }, [iniciativas, iniciativaId, isCreatingNew]);

  // Track last loaded initiative ID to prevent overwriting active edits during auto-saves
  const lastLoadedIdRef = useRef<string | null>(null);

  // Synchronize form when active initiative changes
  useEffect(() => {
    if (isCreatingNew) {
      setForm(initialFormState);
      setSavingStatus("idle");
      setPesoOperacional(0);
      setFteDistrib([
        { area: "SNEG (Operações)", fte: 0 },
        { area: "SPCOM (Comercial)", fte: 0 },
        { area: "Financeiro", fte: 0 },
        { area: "Operações / Logística", fte: 0 },
        { area: "TI & Sistemas", fte: 0 },
        { area: "Atendimento & Backoffice", fte: 0 },
      ]);
      lastLoadedIdRef.current = "__new__";
    } else if (activeInitiative) {
      // Only overwrite the form if the user selected a DIFFERENT initiative
      if (iniciativaId !== lastLoadedIdRef.current) {
        const merged = { ...initialFormState };
        Object.keys(initialFormState).forEach((k) => {
          const val = (activeInitiative as any)[k];
          if (val !== undefined && val !== null) {
            (merged as any)[k] = val;
          }
        });
        if (activeInitiative.integracoes) {
          merged.integracoes_necessarias = Array.isArray(activeInitiative.integracoes)
            ? (activeInitiative.integracoes as string[])
            : [];
        }
        setForm(merged);

        // Load specific fields from JSON formatted text in substitutos_detalhes
        let parsedPesoOperacional = 0;
        let parsedPessoasDetalhes = "";
        let parsedFteDistrib_list = [
          { area: "SNEG (Operações)", fte: 0 },
          { area: "SPCOM (Comercial)", fte: 0 },
          { area: "Financeiro", fte: 0 },
          { area: "Operações / Logística", fte: 0 },
          { area: "TI & Sistemas", fte: 0 },
          { area: "Atendimento & Backoffice", fte: 0 },
        ];

        if (activeInitiative.substitutos_detalhes) {
          try {
            const dataObj = JSON.parse(activeInitiative.substitutos_detalhes);
            if (dataObj && typeof dataObj === "object") {
              if (dataObj.peso_operacional !== undefined) {
                parsedPesoOperacional = Number(dataObj.peso_operacional) || 0;
              }
              if (dataObj.pessoas_detalhes !== undefined) {
                parsedPessoasDetalhes = String(dataObj.pessoas_detalhes || "");
              }
              if (Array.isArray(dataObj.fte_distribuicao)) {
                parsedFteDistrib_list = dataObj.fte_distribuicao.map((item: any) => ({
                  area: String(item.area || ""),
                  fte: Number(item.fte) || 0,
                }));
              }
            }
          } catch (e) {
            const num = parseFloat(activeInitiative.substitutos_detalhes);
            if (!isNaN(num)) parsedPesoOperacional = num;
          }
        }
        setPesoOperacional(parsedPesoOperacional);
        setPessoasDetalhes(parsedPessoasDetalhes);
        setFteDistrib(parsedFteDistrib_list);

        setSavingStatus("saved");
        lastLoadedIdRef.current = iniciativaId;
      }
    } else {
      setForm(initialFormState);
      setSavingStatus("idle");
      setPesoOperacional(0);
      setPessoasDetalhes("");
      setFteDistrib([
        { area: "SNEG (Operações)", fte: 0 },
        { area: "SPCOM (Comercial)", fte: 0 },
        { area: "Financeiro", fte: 0 },
        { area: "Operações / Logística", fte: 0 },
        { area: "TI & Sistemas", fte: 0 },
        { area: "Atendimento & Backoffice", fte: 0 },
      ]);
      lastLoadedIdRef.current = null;
    }
  }, [activeInitiative, iniciativaId, isCreatingNew]);

  // Auto-save logic (debounced or blur-driven)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveToGCP = async (
    idToSave: string | null,
    currentFormState: FormState,
    pOperacional?: number,
    fDistrib?: Array<{ area: string; fte: number }>,
    pDetalhes?: string,
  ) => {
    if (!idToSave || isCreatingNew || !isAdmin) return;
    setSavingStatus("saving");
    try {
      const activePeso = pOperacional !== undefined ? pOperacional : pesoOperacional;
      const activeFte = fDistrib !== undefined ? fDistrib : fteDistrib;
      const activeDetalhes = pDetalhes !== undefined ? pDetalhes : pessoasDetalhes;

      // Validate FTE distribution sum matches hc_atual
      const sumFteDistribVal = activeFte.reduce((sum, item) => sum + (Number(item.fte) || 0), 0);
      const hcVal = Number(currentFormState.hc_atual) || 0;
      const isFteValidationValidVal = Math.abs(sumFteDistribVal - hcVal) < 0.001;

      if (!isFteValidationValidVal) {
        setSavingStatus("error");
        return;
      }

      // Calculate derived metrics to keep databases fully synchronized and fresh
      const calculatedVals = getCalculations(currentFormState);
      const pctParticipacao =
        currentFormState.hc_atual > 0
          ? (currentFormState.pessoas_envolvidas / currentFormState.hc_atual) * 100
          : 0;

      const jsonStr = JSON.stringify({
        peso_operacional: activePeso,
        fte_distribuicao: activeFte,
        pessoas_detalhes: activeDetalhes,
      });

      const payload: any = {
        ...currentFormState,
        substitutos_detalhes: jsonStr, // Serialize as JSON in this text column!
        score: calculatedVals.smartScore,
        prioridade: calculatedVals.prioridadeStr,
        score_automacao: calculatedVals.scoreAutomacao,
        complexidade_automacao_score: calculatedVals.complexidadeAutomacao,
        risco_operacional: calculatedVals.riscoOperacional,
        roi: calculatedVals.roi,
        fte_participacao: pctParticipacao, // save calculated participation percentage!
        updated_at: new Date().toISOString(),
        integracoes: currentFormState.integracoes_necessarias,
      };
      delete payload.integracoes_necessarias;

      const { error } = await supabase.from("iniciativas").update(payload).eq("id", idToSave);

      if (error) {
        toast.error("Erro ao salvar automaticamente: " + error.message);
        setSavingStatus("error");
      } else {
        setSavingStatus("saved");
        // Invalidate all related caches to ensure instant sync
        qc.invalidateQueries({ queryKey: ["iniciativas-by-projeto"] });
        qc.invalidateQueries({ queryKey: ["kanban-ini"] });
        qc.invalidateQueries({ queryKey: ["timeline-ini"] });
        qc.invalidateQueries({ queryKey: ["acoes-ini"] });
        qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
        qc.invalidateQueries({ queryKey: ["ini-full"] });
      }
    } catch (err: any) {
      console.error("Auto-save error:", err);
      setSavingStatus("error");
    }
  };

  const getAutoPrioridadeValues = (f: FormState) => {
    let impNeg = 1;
    if (f.impacto_compliance_sn) impNeg += 2;
    const leanCount = Array.isArray(f.desperdicios_lean) ? f.desperdicios_lean.length : 0;
    if (leanCount > 3) impNeg += 2;
    else if (leanCount > 0) impNeg += 1;
    impNeg = Math.min(5, Math.max(1, impNeg));

    let impCli = 2;
    if (f.impacto_cliente_sn) {
      impCli = f.sla_existe ? 5 : 4;
    }

    let impFin = 1;
    const hgastas = Number(f.horas_gastas_mes) || 0;
    const hfuturas = Number(f.horas_futuras_mes) || 0;
    const hecon = Math.max(0, hgastas - hfuturas);
    const econAnual = hecon * (Number(f.custo_hora) || 0) * 12;

    if (econAnual >= 100000) impFin = 5;
    else if (econAnual >= 50000) impFin = 4;
    else if (econAnual >= 20000) impFin = 3;
    else if (econAnual >= 5000) impFin = 2;

    let esf = 1;
    if (f.dependencia_ti) esf += 1.5;
    const intCount = Array.isArray(f.integracoes_necessarias)
      ? f.integracoes_necessarias.length
      : 0;
    if (intCount > 2) esf += 1.5;
    else if (intCount > 0) esf += 1.0;

    const sisCount = Array.isArray(f.sistemas_paralelos) ? f.sistemas_paralelos.length : 0;
    if (sisCount > 3) esf += 1.0;

    if ((Number(f.custo_implementacao) || 0) > 50000) esf += 1.0;
    else if ((Number(f.custo_implementacao) || 0) > 10000) esf += 0.5;
    esf = Math.min(5, Math.max(1, Math.round(esf)));

    const compScore = calcComplexidadeAutomacao({
      ...f,
      sistemas: f.sistemas_paralelos,
      integracoes: f.integracoes_necessarias,
    }).value;

    let comp = 1;
    if (compScore <= 10) comp = 1;
    else if (compScore <= 20) comp = 2;
    else if (compScore <= 30) comp = 3;
    else if (compScore <= 40) comp = 4;
    else comp = 5;

    return {
      impacto_negocio: impNeg,
      impacto_cliente: impCli,
      impacto_financeiro: impFin,
      esforco: esf,
      complexidade: comp,
    };
  };

  const handleFieldChange = (field: keyof FormState, value: any) => {
    const updated = { ...form, [field]: value };

    // Validação: Tempo Mínimo + Tempo de Espera <= Tempo Máximo
    if (field === "tempo_min" || field === "tempo_espera" || field === "tempo_max") {
      const min = Number(updated.tempo_min) || 0;
      const espera = Number(updated.tempo_espera) || 0;
      const max = Number(updated.tempo_max) || 0;

      if (min + espera > max) {
        toast.error(
          `Atenção: A soma do Tempo Mínimo (${min} min) + Tempo de Espera (${espera} min) excedeu o Tempo Máximo (${max} min)!`,
        );
        if (field === "tempo_min") {
          updated.tempo_min = Math.max(0, max - espera);
        } else if (field === "tempo_espera") {
          updated.tempo_espera = Math.max(0, max - min);
        } else if (field === "tempo_max") {
          updated.tempo_max = min + espera;
        }
      }
    }

    // Sincronização de execuções
    if (field === "execucoes_dia") {
      const dia = Number(value) || 0;
      updated.execucoes_semana = dia * 5;
      updated.execucoes_mes = dia * 22;
    } else if (field === "execucoes_semana") {
      const sem = Number(value) || 0;
      updated.execucoes_dia = Math.round(sem / 5);
      updated.execucoes_mes = Math.round(sem * 4.4);
    } else if (field === "execucoes_mes") {
      const mes = Number(value) || 0;
      updated.execucoes_semana = Math.round(mes / 4.4);
      updated.execucoes_dia = Math.round(mes / 22);
    }

    // Calcular horas/mês gastas e futuras a partir do tempo/volume
    if (
      field === "tempo_min" ||
      field === "tempo_max" ||
      field === "tempo_futuro" ||
      field === "execucoes_dia" ||
      field === "execucoes_semana" ||
      field === "execucoes_mes"
    ) {
      const medio = (Number(updated.tempo_min) + Number(updated.tempo_max)) / 2;
      const gastas = (medio * Number(updated.execucoes_mes)) / 60;
      const futuras = (Number(updated.tempo_futuro) * Number(updated.execucoes_mes)) / 60;
      updated.horas_gastas_mes = Number(gastas.toFixed(2));
      updated.horas_futuras_mes = Number(futuras.toFixed(2));
    }

    // Se o cálculo automático de priorização estiver ativo, sincronizar os sliders
    if (autoPriorizacao) {
      const autoVals = getAutoPrioridadeValues(updated);
      updated.impacto_negocio = autoVals.impacto_negocio;
      updated.impacto_cliente = autoVals.impacto_cliente;
      updated.impacto_financeiro = autoVals.impacto_financeiro;
      updated.esforco = autoVals.esforco;
      updated.complexidade = autoVals.complexidade;
    }

    setForm(updated);

    if (iniciativaId && !isCreatingNew && isAdmin) {
      setSavingStatus("saving");
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      const currentId = iniciativaId;
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(currentId, updated);
      }, 1500);
    }
  };

  const handleFieldBlur = () => {
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      saveToGCP(iniciativaId, form);
    }
  };

  const handlePesoOperacionalChange = (val: number) => {
    setPesoOperacional(val);
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(iniciativaId, form, val, fteDistrib);
      }, 1500);
    }
  };

  const handleFteDistribChange = (index: number, val: number) => {
    const updated = [...fteDistrib];
    updated[index] = { ...updated[index], fte: val };
    setFteDistrib(updated);
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(iniciativaId, form, pesoOperacional, updated);
      }, 1500);
    }
  };

  const handleAreaNameChange = (index: number, name: string) => {
    const updated = [...fteDistrib];
    updated[index] = { ...updated[index], area: name };
    setFteDistrib(updated);
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(iniciativaId, form, pesoOperacional, updated);
      }, 1500);
    }
  };

  const handleAddArea = () => {
    const updated = [...fteDistrib, { area: `Nova Área ${fteDistrib.length + 1}`, fte: 0 }];
    setFteDistrib(updated);
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(iniciativaId, form, pesoOperacional, updated);
      }, 1500);
    }
  };

  const handleRemoveArea = (index: number) => {
    const updated = fteDistrib.filter((_, i) => i !== index);
    setFteDistrib(updated);
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(iniciativaId, form, pesoOperacional, updated);
      }, 1500);
    }
  };

  const handlePessoasDetalhesChange = (val: string) => {
    setPessoasDetalhes(val);
    if (iniciativaId && !isCreatingNew && isAdmin) {
      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveToGCP(iniciativaId, form, pesoOperacional, fteDistrib, val);
      }, 1500);
    }
  };

  // Flush pending changes on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const nome = novoProjetoNome.trim();
    if (!nome) return;
    if (!isAdmin) return toast.error("Apenas administradores podem criar projetos.");

    try {
      const { data, error } = await supabase.from("projetos").insert({ nome }).select().single();

      if (error) {
        toast.error("Erro ao criar projeto: " + error.message);
      } else {
        toast.success(`Projeto "${nome}" criado com sucesso!`);
        setNovoProjetoNome("");
        qc.invalidateQueries({ queryKey: ["projetos-list"] });
        setProjeto(data.id);
        setIniciativa(null);
        setIsCreatingNew(true);
      }
    } catch (err: any) {
      toast.error(err.message || "Erro desconhecido");
    }
  };

  // Create Initiative
  const handleCreateInitiative = async () => {
    if (!projetoId) {
      return toast.error("Selecione um projeto para vincular a nova iniciativa!");
    }
    if (!form.titulo.trim()) {
      return toast.error("O título da iniciativa é obrigatório!");
    }
    if (!isAdmin) return toast.error("Apenas administradores podem criar iniciativas.");

    try {
      setSavingStatus("saving");

      // Generate robust sequential initiative code for this project
      const codigo = await resequenceProjectIniciativas(projetoId);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const calculatedVals = getCalculations(form);
      const uuid = crypto.randomUUID();

      const payload: any = {
        ...form,
        id: uuid,
        projeto_id: projetoId,
        codigo,
        score: calculatedVals.smartScore,
        prioridade: calculatedVals.prioridadeStr,
        score_automacao: calculatedVals.scoreAutomacao,
        complexidade_automacao_score: calculatedVals.complexidadeAutomacao,
        risco_operacional: calculatedVals.riscoOperacional,
        roi: calculatedVals.roi,
        created_by: user?.id,
        created_at: new Date().toISOString(),
        integracoes: form.integracoes_necessarias,
      };
      delete payload.integracoes_necessarias;

      const { error } = await supabase.from("iniciativas").insert(payload);

      if (error) {
        toast.error("Erro ao salvar iniciativa: " + error.message);
        setSavingStatus("error");
      } else {
        toast.success(`Iniciativa "${payload.titulo}" (${codigo}) criada com sucesso!`);
        setIsCreatingNew(false);
        setIniciativa(uuid);
        qc.invalidateQueries({ queryKey: ["iniciativas-by-projeto", projetoId] });
        qc.invalidateQueries({ queryKey: ["kanban-ini"] });
        qc.invalidateQueries({ queryKey: ["timeline-ini"] });
        qc.invalidateQueries({ queryKey: ["acoes-ini"] });
        qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
      }
    } catch (err: any) {
      toast.error("Erro desconhecido: " + err.message);
      setSavingStatus("error");
    }
  };

  const handleNovaIniciativaClick = () => {
    if (autoSaveTimeoutRef.current && iniciativaId && !isCreatingNew && isAdmin) {
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
      saveToGCP(iniciativaId, form);
    }
    setIsCreatingNew(true);
    setIniciativa(null);
    setForm(initialFormState);
  };

  const handleExcluirIniciativa = async () => {
    if (!iniciativaId || isCreatingNew) return;
    if (!isAdmin) return toast.error("Apenas administradores podem excluir iniciativas.");

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
    }

    if (
      !window.confirm(
        `Tem certeza que deseja excluir permanentemente a iniciativa "${form.titulo || "esta"}"? Todos os microprocessos, tarefas e dados associados serão removidos permanentemente. Esta ação não pode ser desfeita.`,
      )
    ) {
      return;
    }

    try {
      setSavingStatus("saving");
      const { error } = await supabase
        .from("iniciativas")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", iniciativaId);

      if (error) {
        toast.error("Erro ao excluir: " + error.message);
        setSavingStatus("error");
      } else {
        if (projetoId) {
          await resequenceProjectIniciativas(projetoId);
        }
        toast.success("Iniciativa excluída com sucesso!");
        setIniciativa(null);
        setIsCreatingNew(false);
        setForm(initialFormState);
        qc.invalidateQueries({ queryKey: ["iniciativas-by-projeto", projetoId] });
        qc.invalidateQueries({ queryKey: ["kanban-ini"] });
        qc.invalidateQueries({ queryKey: ["timeline-ini"] });
        qc.invalidateQueries({ queryKey: ["acoes-ini"] });
        qc.invalidateQueries({ queryKey: ["dash-iniciativas-cockpit"] });
      }
    } catch (err: any) {
      toast.error("Erro ao excluir: " + err.message);
      setSavingStatus("error");
    }
  };

  const handleLimparFormulario = () => {
    if (window.confirm("Deseja realmente limpar todos os campos preenchidos do formulário?")) {
      setForm(initialFormState);
    }
  };

  // Compute calculated outputs for real-time KPIs and Tooltips
  const getCalculations = (state: FormState) => {
    const input: CalcInput = {
      ...state,
      sistemas: state.sistemas_paralelos,
      integracoes: state.integracoes_necessarias,
    };

    const smartScoreVal = calcSmartScore(input);
    const prioridadeObj = nivelPrioridade(smartScoreVal.value);
    const paybackVal = calcPayback(input);
    const roiVal = calcRoi(input);
    const fteVal = calcFteLiberado(input);
    const riscoVal = calcRiscoOperacional(input);
    const scoreAutVal = calcScoreAutomacao(input);

    return {
      smartScore: smartScoreVal.value,
      smartScoreMem: smartScoreVal.memoria,
      prioridadeStr: prioridadeObj.label,
      prioridadeTone: prioridadeObj.tone,
      payback: paybackVal.value,
      paybackMem: paybackVal.memoria,
      roi: roiVal.value,
      roiMem: roiVal.memoria,
      fteLiberado: fteVal.value,
      fteLiberadoMem: fteVal.memoria,
      riscoOperacional: riscoVal.value,
      riscoOperacionalMem: riscoVal.memoria,
      scoreAutomacao: scoreAutVal.value,
      scoreAutomacaoMem: scoreAutVal.memoria,
      complexidadeAutomacao: calcComplexidadeAutomacao(input).value,
    };
  };

  const calcs = useMemo(() => getCalculations(form), [form]);

  // Intermediate helper formulas for sections
  const tempoMedio = useMemo(() => calcTempoMedio(form), [form]);
  const ganhoTempo = useMemo(() => calcGanhoTempo(form), [form]);
  const percReducao = useMemo(() => calcPercReducao(form), [form]);
  const horasDesperdicadas = useMemo(() => calcHorasDesperdicadasMes(form), [form]);
  const indiceQualidade = useMemo(() => calcIndiceQualidade(form), [form]);
  const complexidadeAut = useMemo(
    () =>
      calcComplexidadeAutomacao({
        ...form,
        sistemas: form.sistemas_paralelos,
        integracoes: form.integracoes_necessarias,
      }),
    [form],
  );
  const horasEconomizadas = useMemo(() => calcHorasEconomizadasMes(form), [form]);
  const economiaAnual = useMemo(() => calcEconomiaAnual(form), [form]);

  const pctParticipacao = useMemo(() => {
    const envolvidas = Number(form.pessoas_envolvidas) || 0;
    const hc_atual = Number(form.hc_atual) || 0;
    const v = hc_atual > 0 ? (envolvidas / hc_atual) * 100 : 0;
    return {
      value: v,
      memoria: `% de Participação = (Pessoas envolvidas / HC Atual da Área) × 100\n= (${envolvidas} / ${hc_atual}) × 100 = ${v.toFixed(1)}%`,
    };
  }, [form.pessoas_envolvidas, form.hc_atual]);

  const gestaoCapacidade = useMemo(() => {
    const hc = Number(form.hc_atual || 0);
    const envolvidas = Number(form.pessoas_envolvidas || 0);
    const h_mes = Number(calcHorasMes(form).value) || 0;
    const t_medio = Number(calcTempoMedio(form).value) || 0;
    const t_ideal = Number(form.tempo_ideal || 0);
    const t_futuro = Number(form.tempo_futuro || 0);
    const exec_mes = Number(form.execucoes_mes || 0);
    const g_tempo = Number(calcGanhoTempo(form).value) || 0;
    const h_desp = Number(calcHorasDesperdicadasMes(form).value) || 0;
    const complex = Number(form.complexidade || 1);
    const criticidade = Number(form.impacto_negocio || 1);

    // 1. HC
    const valHc = hc;
    const toolHc = `Headcount (HC) = Número de colaboradores\n= ${valHc} colaboradores`;

    // 2. FTE
    const valFte = h_mes / 165;
    const toolFte = `FTE = Horas dedicadas / Horas padrão\n= ${h_mes.toFixed(2)}h / 165h = ${valFte.toFixed(3)} FTE`;

    // 3. % Participação
    const valPart = hc > 0 ? (envolvidas / hc) * 100 : 0;
    const toolPart = `% Participação = (Pessoas envolvidas / HC da Área) × 100\n= (${envolvidas} / ${hc}) × 100 = ${valPart.toFixed(1)}%`;

    // 4. Peso Operacional
    const valPesoOp = exec_mes * complex;
    const toolPesoOp = `Peso Operacional = Volume × Complexidade\n= ${exec_mes} × ${complex} = ${valPesoOp.toLocaleString("pt-BR")}`;

    // 5. Peso Operacional Ponderado
    const valPesoPond = exec_mes * complex * criticidade;
    const toolPesoPond = `Peso Operacional Ponderado = Volume × Complexidade × Criticidade\n= ${exec_mes} × ${complex} × ${criticidade} = ${valPesoPond.toLocaleString("pt-BR")}`;

    // 6. Ocupação
    const hrsDisponiveis = hc * 165;
    const valOcupacao = hrsDisponiveis > 0 ? (h_mes / hrsDisponiveis) * 100 : 0;
    const toolOcupacao = `Ocupação = Horas utilizadas / Horas disponíveis\n= ${h_mes.toFixed(2)}h / (${hc} HC × 165h) = ${valOcupacao.toFixed(1)}%`;

    // 7. Capacidade
    const tempoDispMin = hc * 165 * 60;
    const valCapacidade = t_medio > 0 ? tempoDispMin / t_medio : 0;
    const toolCapacidade = `Capacidade = Tempo disponível (min) / Tempo médio (min)\n= (${hc} HC × 165h × 60min) / ${t_medio.toFixed(1)}min = ${valCapacidade.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} execuções/mês`;

    // 8. Produtividade
    const valProdutividade = h_mes > 0 ? exec_mes / h_mes : 0;
    const toolProdutividade = `Produtividade = Produção / Tempo\n= ${exec_mes} execuções / ${h_mes.toFixed(2)}h = ${valProdutividade.toFixed(2)} execuções/hora`;

    // 9. Tempo Médio
    const valTempoMedio = t_medio;
    const toolTempoMedio = `Tempo Médio = (Tempo Mínimo + Tempo Máximo) / 2\n= (${form.tempo_min} + ${form.tempo_max}) / 2 = ${valTempoMedio.toFixed(1)} min`;

    // 10. Demanda de FTE
    const valDemandaFte = h_mes / 165;
    const toolDemandaFte = `Demanda de FTE = Volume × Tempo médio / Horas disponíveis\n= ${exec_mes} × ${(t_medio / 60).toFixed(3)}h / 165h = ${valDemandaFte.toFixed(3)} FTE`;

    // 11. Utilização
    const valUtilizacao = hrsDisponiveis > 0 ? (h_mes / hrsDisponiveis) * 100 : 0;
    const toolUtilizacao = `Utilização = Horas trabalhadas / Horas contratadas\n= ${h_mes.toFixed(2)}h / (${hc} × 165h) = ${valUtilizacao.toFixed(1)}%`;

    // 12. Eficiência
    const valEficiencia = t_medio > 0 ? (t_ideal / t_medio) * 100 : 0;
    const toolEficiencia = `Eficiência = Tempo padrão (Ideal) / Tempo real (Médio) × 100\n= ${t_ideal}min / ${t_medio.toFixed(1)}min × 100 = ${valEficiencia.toFixed(1)}%`;

    // 13. Ganho de Produtividade
    const valGanhoProd = t_medio > 0 ? ((t_medio - t_futuro) / t_medio) * 100 : 0;
    const toolGanhoProd = `Ganho de Produtividade = (Antes − Depois) / Antes × 100\n= (${t_medio.toFixed(1)} − ${t_futuro}) / ${t_medio.toFixed(1)} × 100 = ${valGanhoProd.toFixed(1)}%`;

    // 14. Horas Economizadas
    const valHorasEcon = h_desp;
    const toolHorasEcon = `Horas Economizadas = Volume × Tempo economizado\n= ${exec_mes} × ${(g_tempo / 60).toFixed(3)}h = ${valHorasEcon.toFixed(2)} h`;

    // 15. Economia de FTE
    const valEconFte = h_desp / 165;
    const toolEconFte = `Economia de FTE = Horas economizadas / 165h\n= ${h_desp.toFixed(2)}h / 165h = ${valEconFte.toFixed(3)} FTE`;

    return {
      hc: { val: valHc, tool: toolHc },
      fte: { val: valFte, tool: toolFte },
      part: { val: valPart, tool: toolPart },
      pesoOp: { val: valPesoOp, tool: toolPesoOp },
      pesoPond: { val: valPesoPond, tool: toolPesoPond },
      ocupacao: { val: valOcupacao, tool: toolOcupacao },
      capacidade: { val: valCapacidade, tool: toolCapacidade },
      produtividade: { val: valProdutividade, tool: toolProdutividade },
      tempoMedio: { val: valTempoMedio, tool: toolTempoMedio },
      demandaFte: { val: valDemandaFte, tool: toolDemandaFte },
      utilizacao: { val: valUtilizacao, tool: toolUtilizacao },
      eficiencia: { val: valEficiencia, tool: toolEficiencia },
      ganhoProd: { val: valGanhoProd, tool: toolGanhoProd },
      horasEcon: { val: valHorasEcon, tool: toolHorasEcon },
      econFte: { val: valEconFte, tool: toolEconFte },
    };
  }, [form]);

  return (
    <div className="space-y-6 pb-24" id="formulario_tab_container">
      {/* 🔒 Role Warning Alert Banner if not global administrator */}
      {!isAdmin && (
        <div className="flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-amber-800 shadow-sm">
          <Lock className="h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-[12.5px] font-medium leading-relaxed">
            <span className="font-extrabold uppercase">Modo de Apenas Consulta:</span> Apenas
            usuários com papel de administrador global possuem permissões para alterar, incluir ou
            excluir qualquer dado das iniciativas.
          </div>
        </div>
      )}

      {/* CONTEXTO DA INICIATIVA SECTION CARD */}
      <div
        className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
        id="section_contexto_iniciativa"
      >
        <h3 className="mb-4 text-[13px] font-black uppercase tracking-wider text-neutral-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#268200]" />
          Contexto da Iniciativa
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {/* Project Selection / Creation */}
          <div className="space-y-4">
            <div>
              <FieldLabel label="Projeto Vinculado *" />
              <select
                value={projetoId || ""}
                onChange={(e) => {
                  setProjeto(e.target.value || null);
                  setIniciativa(null);
                  setIsCreatingNew(false);
                }}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-white px-3 text-[12.5px] font-medium text-slate-700 outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] transition"
              >
                <option value="">-- Selecione o Projeto --</option>
                {projetos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Create Project */}
            {isAdmin && (
              <form onSubmit={handleCreateProject} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cadastrar novo projeto..."
                  value={novoProjetoNome}
                  onChange={(e) => setNovoProjetoNome(e.target.value)}
                  className="h-9 flex-1 rounded-md border border-[#DBDBDB] bg-white px-3 text-[12px] font-medium outline-none focus:border-[#268200]"
                />
                <button
                  type="submit"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#268200] hover:bg-[#1c6000] text-white shadow transition-all duration-150"
                  title="Criar novo projeto"
                >
                  <Plus className="h-4 w-4 font-bold" />
                </button>
              </form>
            )}

            {/* Project Active Indicator Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Projeto: {activeProject ? activeProject.nome : "—"}
              </span>

              {projetoId && isAdmin && (
                <button
                  type="button"
                  onClick={handleNovaIniciativaClick}
                  className="ml-auto inline-flex items-center gap-1 rounded-md bg-[#268200] hover:bg-[#1a5b00] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition"
                >
                  <Plus className="h-3.5 w-3.5" /> Nova Iniciativa
                </button>
              )}
            </div>
          </div>

          {/* Initiative Selection */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <FieldLabel label="Selecione a Iniciativa para carregar" />
                <select
                  disabled={!projetoId}
                  value={isCreatingNew ? "__new__" : iniciativaId || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (autoSaveTimeoutRef.current && iniciativaId && !isCreatingNew && isAdmin) {
                      clearTimeout(autoSaveTimeoutRef.current);
                      autoSaveTimeoutRef.current = null;
                      saveToGCP(iniciativaId, form);
                    }
                    if (val === "__new__") {
                      setIsCreatingNew(true);
                      setIniciativa(null);
                    } else {
                      setIsCreatingNew(false);
                      setIniciativa(val || null);
                    }
                  }}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] bg-white px-3 text-[12.5px] font-medium text-slate-700 outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] transition disabled:bg-neutral-50 disabled:opacity-60"
                >
                  <option value="">-- Selecione uma Iniciativa --</option>
                  {isCreatingNew && <option value="__new__">Nova Iniciativa (Rascunho)</option>}
                  {iniciativas.map((i) => (
                    <option key={i.id} value={i.id}>
                      [{i.codigo || "INI-—"}] {i.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500">
                {isCreatingNew ? (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-800 font-bold border border-amber-200">
                    Preenchendo nova iniciativa
                  </span>
                ) : activeInitiative ? (
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-blue-800 font-bold border border-blue-200">
                    Editando iniciativa: {activeInitiative.codigo}
                  </span>
                ) : (
                  <span className="italic text-slate-400">
                    Nenhuma iniciativa carregada. Selecione acima ou clique em Nova Iniciativa.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC METRICS / CALCULATED SCORE BAR CARD */}
      <div
        className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
        id="section_calculos_kpis"
      >
        <h4 className="mb-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
          Resultados do Diagnóstico & Indicadores Calculados
        </h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          <KpiCard
            title="SMART SCORE"
            value={calcs.smartScore}
            tooltip={calcs.smartScoreMem}
            icon={<Sparkles className="h-4 w-4 text-emerald-600" />}
            color="emerald"
          />
          <KpiCard
            title="PRIORIDADE"
            value={calcs.prioridadeStr}
            tooltip="Calculada com base na pontuação de impacto dividida por esforço e complexidade."
            icon={<Flame className="h-4 w-4 text-orange-600" />}
            color={
              calcs.prioridadeTone === "red"
                ? "red"
                : calcs.prioridadeTone === "orange"
                  ? "orange"
                  : "emerald"
            }
          />
          <KpiCard
            title="ROI"
            value={`${calcs.roi.toFixed(1)}%`}
            tooltip={calcs.roiMem}
            icon={<TrendingUp className="h-4 w-4 text-[#FF6900]" />}
            color="orange"
          />
          <KpiCard
            title="PAYBACK (M)"
            value={calcs.payback.toFixed(1)}
            tooltip={calcs.paybackMem}
            icon={<Coins className="h-4 w-4 text-[#FEDC00]" />}
            color="yellow"
          />
          <KpiCard
            title="FTE LIBERADO"
            value={calcs.fteLiberado.toFixed(3)}
            tooltip={calcs.fteLiberadoMem}
            icon={<Users className="h-4 w-4 text-emerald-600" />}
            color="emerald"
          />
          <KpiCard
            title="RISCO OP."
            value={calcs.riscoOperacional.toFixed(1)}
            tooltip={calcs.riscoOperacionalMem}
            icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
            color="yellow"
          />
          <KpiCard
            title="SCORE AUT."
            value={`${calcs.scoreAutomacao} / 40`}
            tooltip={calcs.scoreAutomacaoMem}
            icon={<Wrench className="h-4 w-4 text-emerald-600" />}
            color="emerald"
          />
        </div>
      </div>

      {/* CORE 13 SECTION FORM FIELDS */}
      <div className="space-y-6" id="core_form_fields_sections">
        {/* SECTION 1: IDENTIFICAÇÃO DA INICIATIVA */}
        <SectionCard
          title="1 · Identificação da Iniciativa"
          icon={<CheckCircle className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <FieldLabel label="ID DO PROJETO VINCULADO" />
              <input
                type="text"
                value={projetoId || "—"}
                disabled
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-neutral-50 px-3 text-[12px] text-slate-500 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="CÓDIGO DA INICIATIVA" />
              <input
                type="text"
                value={activeInitiative?.codigo || "(gerado ao salvar)"}
                disabled
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-neutral-50 px-3 text-[12px] text-slate-500 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="STATUS DA INICIATIVA" />
              <PicklistField
                categoria="Status"
                value={form.status}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("status", v)}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <FieldLabel label="NOME DA INICIATIVA * (TÍTULO DO CARD)" />
              <input
                type="text"
                required
                disabled={!isAdmin}
                value={form.titulo}
                placeholder="Ex: Automatizar Conciliação Financeira..."
                onChange={(e) => handleFieldChange("titulo", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <FieldLabel label="DESCRIÇÃO DETALHADA" />
              <textarea
                disabled={!isAdmin}
                value={form.descricao}
                placeholder="Descreva a dor, escopo e metas gerais da iniciativa..."
                onChange={(e) => handleFieldChange("descricao", e.target.value)}
                onBlur={handleFieldBlur}
                rows={3}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 2: GOVERNANÇA E RESPONSABILIDADES */}
        <SectionCard
          title="2 · Governança e Responsabilidades"
          icon={<Users className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <FieldLabel label="VICE-PRESIDENTE" />
              <PicklistField
                categoria="Vice-Presidente"
                value={form.vice_presidente}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("vice_presidente", v)}
              />
            </div>
            <div>
              <FieldLabel label="DIRETOR" />
              <PicklistField
                categoria="Diretor"
                value={form.diretor}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("diretor", v)}
              />
            </div>
            <div>
              <FieldLabel label="GERENTE" />
              <PicklistField
                categoria="Gerente"
                value={form.gerente}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("gerente", v)}
              />
            </div>
            <div>
              <FieldLabel label="ÁREA RESPONSÁVEL" />
              <PicklistField
                categoria="Área Responsável"
                value={form.area_responsavel}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("area_responsavel", v)}
              />
            </div>
            <div>
              <FieldLabel label="GESTOR RESPONSÁVEL" />
              <PicklistField
                categoria="Gestor Responsável"
                value={form.gestor_responsavel}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("gestor_responsavel", v)}
              />
            </div>
            <div>
              <FieldLabel label="ANALISTA RESPONSÁVEL" />
              <PicklistField
                categoria="Analista Responsável"
                value={form.analista_responsavel}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("analista_responsavel", v)}
              />
            </div>
            <div>
              <FieldLabel label="DATA DO DIAGNÓSTICO" />
              <input
                type="date"
                disabled={!isAdmin}
                value={form.data_diagnostico}
                onChange={(e) => handleFieldChange("data_diagnostico", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
              />
            </div>
            <div>
              <FieldLabel label="CLIENTE DO PROCESSO" />
              <PicklistField
                categoria="Cliente do Processo"
                value={form.cliente_processo}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("cliente_processo", v)}
              />
            </div>
            <div>
              <FieldLabel label="PROCESSO" />
              <PicklistField
                categoria="Processo"
                value={form.processo}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("processo", v)}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <FieldLabel label="OBJETIVO DO PROCESSO" />
              <textarea
                disabled={!isAdmin}
                value={form.objetivo_processo}
                placeholder="Descreva o objetivo fim do macroprocesso ou processo diagnosticado..."
                onChange={(e) => handleFieldChange("objetivo_processo", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 3: DIAGNÓSTICO DA DOR */}
        <SectionCard title="3 · Diagnóstico da Dor" icon={<AlertTriangle className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <FieldLabel label="DOR IDENTIFICADA (PROBLEMA)" />
              <textarea
                disabled={!isAdmin}
                value={form.dor_identificada}
                placeholder="Ex: Trabalho repetitivo de copiar dados entre 3 sistemas legados, gerando erros e atrasos de 2 dias..."
                onChange={(e) => handleFieldChange("dor_identificada", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <FieldLabel label="CAUSA RAIZ INICIAL DETECTADA" />
              <textarea
                disabled={!isAdmin}
                value={form.causa_raiz_inicial}
                placeholder="Ex: Sistemas legados não integrados por API, exigindo validação manual..."
                onChange={(e) => handleFieldChange("causa_raiz_inicial", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="CATEGORIA DA DOR" />
              <PicklistField
                categoria="Categoria da Dor"
                value={form.categoria_dor}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("categoria_dor", v)}
              />
            </div>
            <div>
              <FieldLabel label="FREQUÊNCIA" />
              <PicklistField
                categoria="Frequência"
                value={form.frequencia}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("frequencia", v)}
              />
            </div>
            <div>
              <FieldLabel label="SISTEMA PRINCIPAL UTILIZADO" />
              <PicklistField
                categoria="Sistema Utilizado"
                value={form.sistemas_paralelos || []}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("sistemas_paralelos", v)}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel label="DESPERDÍCIOS LEAN DETECTADOS" />
              <PicklistField
                categoria="Desperdícios Lean"
                value={form.desperdicios_lean}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("desperdicios_lean", v)}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 col-span-1 sm:col-span-3 lg:col-span-1">
              <div>
                <FieldLabel label="IMP. CLIENTE" />
                <ToggleField
                  value={form.impacto_cliente_sn}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("impacto_cliente_sn", v)}
                />
              </div>
              <div>
                <FieldLabel label="IMP. FINAN." />
                <ToggleField
                  value={form.impacto_financeiro_sn}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("impacto_financeiro_sn", v)}
                />
              </div>
              <div>
                <FieldLabel label="IMP. COMPLIANCE" />
                <ToggleField
                  value={form.impacto_compliance_sn}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("impacto_compliance_sn", v)}
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 4: COMPONENTE DE TEMPO */}
        <SectionCard title="4 · Componente de Tempo" icon={<Clock className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <FieldLabel label="TEMPO MÍNIMO (MIN)" durationInMinutes={form.tempo_min} />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.tempo_min}
                onChange={(e) => handleFieldChange("tempo_min", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="TEMPO MÁXIMO (MIN)" durationInMinutes={form.tempo_max} />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.tempo_max}
                onChange={(e) => handleFieldChange("tempo_max", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="TEMPO MÉDIO ATUAL (MIN)"
                tooltip={tempoMedio.memoria}
                durationInMinutes={tempoMedio.value}
              />
              <input
                type="text"
                disabled
                value={tempoMedio.value.toFixed(2)}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="TEMPO IDEAL (MIN)" durationInMinutes={form.tempo_ideal} />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.tempo_ideal}
                onChange={(e) => handleFieldChange("tempo_ideal", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="TEMPO DE ESPERA / GARGALO (MIN)"
                durationInMinutes={form.tempo_espera}
              />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.tempo_espera}
                onChange={(e) => handleFieldChange("tempo_espera", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="TEMPO FUTURO ESTIMADO (MIN)"
                durationInMinutes={form.tempo_futuro}
              />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.tempo_futuro}
                onChange={(e) => handleFieldChange("tempo_futuro", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="GANHO DE TEMPO ESPERADO (MIN)"
                tooltip={ganhoTempo.memoria}
                durationInMinutes={ganhoTempo.value}
              />
              <input
                type="text"
                disabled
                value={ganhoTempo.value.toFixed(2)}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="PERCENTUAL DE REDUÇÃO (%)" tooltip={percReducao.memoria} />
              <input
                type="text"
                disabled
                value={`${percReducao.value.toFixed(1)}%`}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <FieldLabel label="MOTIVO DA REDUÇÃO DE TEMPO" />
              <input
                type="text"
                disabled={!isAdmin}
                value={form.motivo_reducao}
                placeholder="Fim de retrabalhos, eliminação de digitação..."
                onChange={(e) => handleFieldChange("motivo_reducao", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 5: COMPONENTE DE VOLUME */}
        <SectionCard title="5 · Componente de Volume" icon={<Percent className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <FieldLabel label="EXECUÇÕES POR DIA" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.execucoes_dia}
                onChange={(e) => handleFieldChange("execucoes_dia", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="EXECUÇÕES POR SEMANA" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.execucoes_semana}
                onChange={(e) => handleFieldChange("execucoes_semana", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="EXECUÇÕES POR MÊS" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.execucoes_mes}
                onChange={(e) => handleFieldChange("execucoes_mes", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="HORAS DESPERDIÇADAS/MÊS"
                tooltip={horasDesperdicadas.memoria}
                durationInMinutes={horasDesperdicadas.value * 60}
              />
              <input
                type="text"
                disabled
                value={`${horasDesperdicadas.value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} horas (${formatMinutesToHoursMinutesSuffix(horasDesperdicadas.value * 60)})`}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 6: COMPONENTE DE QUALIDADE */}
        <SectionCard
          title="6 · Componente de Qualidade"
          icon={<CheckCircle className="h-4 w-4 text-emerald-600" />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <FieldLabel label="TAXA DE ERRO / RETRABALHO (%)" />
              <input
                type="number"
                min="0"
                max="100"
                disabled={!isAdmin}
                value={form.taxa_erro}
                onChange={(e) => handleFieldChange("taxa_erro", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="OUTROS REPROCESSOS (%)" />
              <input
                type="number"
                min="0"
                max="100"
                disabled={!isAdmin}
                value={form.retrabalho}
                onChange={(e) => handleFieldChange("retrabalho", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="SLA EXISTE?" />
              <ToggleField
                value={form.sla_existe}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("sla_existe", v)}
              />
            </div>
            <div>
              <FieldLabel label="SLA ATUAL (MIN)" durationInMinutes={form.sla_min} />
              <input
                type="number"
                min="0"
                disabled={!isAdmin || !form.sla_existe}
                value={form.sla_min}
                onChange={(e) => handleFieldChange("sla_min", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
              />
            </div>
            <div>
              <FieldLabel label="ÍNDICE DE QUALIDADE" tooltip={indiceQualidade.memoria} />
              <input
                type="text"
                disabled
                value={indiceQualidade.value.toFixed(1)}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 7: COMPONENTE DE AUTOMAÇÃO */}
        <SectionCard title="7 · Componente de Automação" icon={<Wrench className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid grid-cols-3 gap-2 sm:col-span-2 lg:col-span-3">
              <div>
                <FieldLabel label="ATIVIDADE MANUAL" />
                <ToggleField
                  value={form.atividade_manual}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("atividade_manual", v)}
                />
              </div>
              <div>
                <FieldLabel label="DIGITAÇÃO MANUAL" />
                <ToggleField
                  value={form.digitacao_manual}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("digitacao_manual", v)}
                />
              </div>
              <div>
                <FieldLabel label="COPIA E COLA" />
                <ToggleField
                  value={form.copia_cola}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("copia_cola", v)}
                />
              </div>
            </div>

            <div>
              <FieldLabel label="SISTEMAS CONECTADOS" />
              <PicklistField
                categoria="Sistemas Paralelos"
                value={form.sistemas_paralelos}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("sistemas_paralelos", v)}
              />
            </div>

            <div>
              <FieldLabel label="ALTERNÂNCIA DE TELAS" />
              <PicklistField
                categoria="Alternância de Telas"
                value={form.alternancia_telas}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("alternancia_telas", v)}
              />
            </div>

            <div>
              <FieldLabel label="LOCAIS DE CONSULTA" />
              <PicklistField
                categoria="Locais de Consulta"
                value={form.locais_consulta}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("locais_consulta", v)}
              />
            </div>

            <div>
              <FieldLabel label="PASSOS MANUAIS" />
              <PicklistField
                categoria="Passos Manuais"
                value={form.passos_manuais}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("passos_manuais", v)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel label="EXCEL PARALELO?" />
                <ToggleField
                  value={form.excel_paralelo}
                  disabled={!isAdmin}
                  onChange={(v) => handleFieldChange("excel_paralelo", v)}
                />
              </div>
              <div>
                <FieldLabel label="QUANTIDADE" />
                <input
                  type="number"
                  min="0"
                  disabled={!isAdmin || !form.excel_paralelo}
                  value={form.qtd_planilhas}
                  onChange={(e) => handleFieldChange("qtd_planilhas", Number(e.target.value))}
                  onBlur={handleFieldBlur}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
                />
              </div>
            </div>

            <div>
              <FieldLabel label="LOCAL DAS PLANILHAS" />
              <PicklistField
                categoria="Local das Planilhas"
                value={form.local_planilhas}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("local_planilhas", v)}
              />
            </div>

            <div>
              <FieldLabel label="INTEGRAÇÕES NECESSÁRIAS" />
              <PicklistField
                categoria="Integrações Necessárias"
                value={form.integracoes_necessarias}
                multi={true}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("integracoes_necessarias", v)}
              />
            </div>

            <div>
              <FieldLabel label="QUANTIDADE DE REGRAS" />
              <PicklistField
                categoria="Quantidade de Regras"
                value={form.qtd_regras}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("qtd_regras", v)}
              />
            </div>

            <div>
              <FieldLabel label="VOLUME DE EXCEÇÕES" />
              <PicklistField
                categoria="Volume de Exceções"
                value={form.volume_excecoes}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("volume_excecoes", v)}
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <FieldLabel label="SOLUÇÃO DE AUTOMAÇÃO SUGERIDA" />
              <textarea
                disabled={!isAdmin}
                value={form.automacao_sugerida}
                placeholder="Ex: Desenvolver robô RPA em Python para extrair os dados e inserir na API do SAP..."
                onChange={(e) => handleFieldChange("automacao_sugerida", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-4">
              <div>
                <FieldLabel label="SCORE DE AUTOMAÇÃO (0-40)" tooltip={calcs.scoreAutomacaoMem} />
                <input
                  type="text"
                  disabled
                  value={`${calcs.scoreAutomacao} / 40`}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <FieldLabel label="COMPLEXIDADE DA AUTOMAÇÃO" tooltip={complexidadeAut.memoria} />
                <input
                  type="text"
                  disabled
                  value={`${complexidadeAut.value} pts (${complexidadeAut.label})`}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-[#268200] cursor-not-allowed outline-none"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 8: COMPONENTE DE PESSOAS */}
        <SectionCard
          title="8 · Componente de Pessoas"
          icon={<Users className="h-4 w-4 text-emerald-600" />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <FieldLabel label="HC ATUAL DA ÁREA (FTE)" />
              <input
                type="number"
                min="0"
                step="0.01"
                disabled={!isAdmin}
                value={form.hc_atual}
                onChange={(e) => handleFieldChange("hc_atual", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="NÚMERO DE PESSOAS ENVOLVIDAS" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.pessoas_envolvidas}
                onChange={(e) => handleFieldChange("pessoas_envolvidas", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="DEP. PESSOA CHAVE?" />
              <ToggleField
                value={form.dep_pessoa_chave}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("dep_pessoa_chave", v)}
              />
            </div>
            <div>
              <FieldLabel label="TEMPO CAPACITAÇÃO (H/DIA)" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.tempo_capacitacao}
                onChange={(e) => handleFieldChange("tempo_capacitacao", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="PESO OPERACIONAL" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={pesoOperacional}
                onChange={(e) => handlePesoOperacionalChange(Number(e.target.value))}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
                placeholder="Ex: 5"
              />
            </div>
            <div>
              <FieldLabel label="% DE PARTICIPAÇÃO" tooltip={pctParticipacao.memoria} />
              <input
                type="text"
                disabled
                value={`${pctParticipacao.value.toFixed(1)}%`}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="RISCO OPERACIONAL" tooltip={calcs.riscoOperacionalMem} />
              <input
                type="text"
                disabled
                value={calcs.riscoOperacional.toFixed(1)}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <FieldLabel label="DETALHES" />
            <textarea
              disabled={!isAdmin}
              value={pessoasDetalhes}
              onChange={(e) => handlePessoasDetalhesChange(e.target.value)}
              className="mt-1 w-full min-h-[70px] rounded-md border border-[#DBDBDB] p-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 resize-y"
              placeholder="Descreva aqui detalhes adicionais do componente de pessoas, tais como observações de capacitação, competências ou restrições..."
            />
          </div>
        </SectionCard>

        {/* DISTRIBUIÇÃO DE FTE POR ÁREA */}
        <SectionCard
          title="Distribuição de FTE por Área"
          icon={<Users className="h-4 w-4 text-[#268200]" />}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              {fteDistrib.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center bg-slate-50 p-2 rounded-lg border border-slate-100"
                >
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Nome da Área
                    </label>
                    <input
                      type="text"
                      disabled={!isAdmin}
                      value={item.area}
                      onChange={(e) => handleAreaNameChange(index, e.target.value)}
                      className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 bg-white"
                      placeholder="Ex: Financeiro"
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      FTE Alocado
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="999"
                      step="0.01"
                      disabled={!isAdmin}
                      value={item.fte || 0}
                      onChange={(e) => handleFteDistribChange(index, Number(e.target.value))}
                      className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 bg-white"
                      placeholder="0.00"
                    />
                  </div>
                  {isAdmin && (
                    <div className="self-end pb-1">
                      <button
                        type="button"
                        onClick={() => handleRemoveArea(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        title="Remover Linha"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={handleAddArea}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
                >
                  ➕ Adicionar Área
                </button>
              </div>
            )}

            {isFteValidationValid ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-[11.5px] font-medium">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                <span>
                  Soma dos FTEs distribuídos ({sumFteDistrib.toFixed(2)} FTE) coincide perfeitamente
                  com o HC Atual da Área ({Number(form.hc_atual || 0).toFixed(2)} FTE).
                </span>
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800 text-[11.5px] font-medium">
                <AlertTriangle className="h-4.5 w-4.5 text-red-600 shrink-0 animate-pulse" />
                <span>
                  A soma dos FTEs distribuídos ({sumFteDistrib.toFixed(2)} FTE) deve ser exatamente
                  igual ao HC Atual da Área ({Number(form.hc_atual || 0).toFixed(2)} FTE). Por
                  favor, ajuste as alocações. Alterações pendentes de validação não serão salvas!
                </span>
              </div>
            )}
          </div>
        </SectionCard>

        {/* COMPONENTE: GESTÃO DA CAPACIDADE */}
        <SectionCard
          title="Gestão da Capacidade"
          icon={<Clock className="h-4 w-4 text-[#268200]" />}
        >
          <div className="space-y-4">
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-slate-800">
              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="HC" tooltip={gestaoCapacidade.hc.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.hc.val}
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="FTE" tooltip={gestaoCapacidade.fte.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.fte.val.toFixed(3)}
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="% PARTICIPAÇÃO" tooltip={gestaoCapacidade.part.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.part.val.toFixed(1)}%
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="PESO OPERACIONAL" tooltip={gestaoCapacidade.pesoOp.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.pesoOp.val.toLocaleString("pt-BR")}
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="PESO OP. PONDERADO" tooltip={gestaoCapacidade.pesoPond.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.pesoPond.val.toLocaleString("pt-BR")}
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="OCUPAÇÃO" tooltip={gestaoCapacidade.ocupacao.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.ocupacao.val.toFixed(1)}%
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="CAPACIDADE" tooltip={gestaoCapacidade.capacidade.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.capacidade.val.toLocaleString("pt-BR", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="PRODUTIVIDADE" tooltip={gestaoCapacidade.produtividade.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.produtividade.val.toFixed(2)}/h
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="TEMPO MÉDIO" tooltip={gestaoCapacidade.tempoMedio.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.tempoMedio.val.toFixed(1)} min
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="DEMANDA DE FTE" tooltip={gestaoCapacidade.demandaFte.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.demandaFte.val.toFixed(3)}
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="UTILIZAÇÃO" tooltip={gestaoCapacidade.utilizacao.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.utilizacao.val.toFixed(1)}%
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="EFICIÊNCIA" tooltip={gestaoCapacidade.eficiencia.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.eficiencia.val.toFixed(1)}%
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="GANHO DE PROD." tooltip={gestaoCapacidade.ganhoProd.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.ganhoProd.val.toFixed(1)}%
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="HORAS ECONOMIZADAS" tooltip={gestaoCapacidade.horasEcon.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.horasEcon.val.toFixed(2)} h
                </span>
              </div>

              <div className="bg-slate-50/75 p-2 rounded-lg border border-slate-100 flex flex-col justify-between">
                <FieldLabel label="ECONOMIA DE FTE" tooltip={gestaoCapacidade.econFte.tool} />
                <span className="text-[14px] font-bold mt-1 text-slate-900">
                  {gestaoCapacidade.econFte.val.toFixed(3)}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[10.5px] text-slate-500 leading-normal font-medium">
              <span className="font-bold text-slate-700">Nota de Premissa:</span> Para todos os
              cálculos de capacidade e esforço acima, é considerada a jornada produtiva padrão de{" "}
              <span className="font-extrabold text-slate-700">165 horas úteis por mês</span> por
              colaborador (FTE), correspondendo a 8 horas diárias descontando intervalos e tempos de
              fadiga/ociosidade técnica.
            </div>

            {/* DIAGNÓSTICO E ANÁLISE DE CAPACIDADE LEAN KAIZEN */}
            {(() => {
              const hc = Number(form.hc_atual || 0);
              const exec_mes = Number(form.execucoes_mes || 0);

              // Use step-by-step analysis values if available (from AS-IS and TO-BE tabs)
              const t_medio =
                asisSteps.length > 0
                  ? asisSteps.reduce((acc: number, step: any) => acc + Number(step.tempo ?? 0), 0)
                  : calcTempoMedio(form).value || 0;

              const t_futuro =
                tobeSteps.length > 0
                  ? tobeSteps.reduce((acc: number, step: any) => acc + Number(step.tempo ?? 0), 0)
                  : Number(form.tempo_futuro || 0);

              const fteAtual = (t_medio * exec_mes) / 60 / 165;
              const fteFuturo = (t_futuro * exec_mes) / 60 / 165;
              const ocupacao = hc > 0 ? (fteAtual / hc) * 100 : 0;
              const ocupacaoFutura = hc > 0 ? (fteFuturo / hc) * 100 : 0;
              const ganhoEficiencia = t_medio > 0 ? ((t_medio - t_futuro) / t_medio) * 100 : 0;
              const fteSalvo = Math.max(0, fteAtual - fteFuturo);
              const horasSalvas = fteSalvo * 165;

              // Determinar o status de sobrecarga atual
              let statusCard = {
                bg: "bg-emerald-50 border-emerald-100 text-emerald-800",
                text: "Estável / Saudável",
                desc: "A equipe possui capacidade de sobra ou está perfeitamente equilibrada para absorver a carga de trabalho atual.",
                badge: "bg-emerald-100 text-emerald-800",
              };
              if (ocupacao > 115) {
                statusCard = {
                  bg: "bg-red-50 border-red-100 text-red-800",
                  text: "CRÍTICO - Alta Sobrecarga",
                  desc: `Equipe severamente sobrecarregada, operando a ${ocupacao.toFixed(1)}% de sua capacidade. Risco de fadiga, gargalos no fluxo de valor e alta taxa de erros.`,
                  badge: "bg-red-100 text-red-800",
                };
              } else if (ocupacao > 95) {
                statusCard = {
                  bg: "bg-amber-50 border-amber-100 text-amber-800",
                  text: "ALERTA - Limite Produtivo",
                  desc: `Equipe trabalhando próxima do teto operacional (${ocupacao.toFixed(1)}%). Qualquer oscilação de volume causará atrasos ou horas extras.`,
                  badge: "bg-amber-100 text-amber-800",
                };
              }

              // Recomendação de Headcount (HC)
              let hcRecomendacao = "";
              let hcTomDeDecisao = "";
              if (fteFuturo > hc) {
                const hcSugerido = Math.ceil(fteFuturo);
                const hcDiff = hcSugerido - hc;
                hcRecomendacao = `⚠️ Aumentar em +${hcDiff} HC(s)`;
                hcTomDeDecisao = `Mesmo após otimizar e aplicar as melhorias (TO BE), o tempo de processamento necessário (${fteFuturo.toFixed(2)} FTE) ainda excede a capacidade atual de ${hc} pessoas. Sugere-se alocar mais ${hcDiff} colaborador(es) para estabilizar o fluxo sem sobrecarga.`;
              } else if (ocupacaoFutura > 100 && fteFuturo <= hc) {
                hcRecomendacao = `🔄 Balanceamento Interno`;
                hcTomDeDecisao = `As melhorias reduzem a sobrecarga para ${ocupacaoFutura.toFixed(1)}%. Não é necessário contratar novas pessoas, mas sim otimizar a distribuição interna de tarefas e balancear o fluxo entre os turnos.`;
              } else {
                hcRecomendacao = `✅ Manter Quadro Atual e Reatribuir`;
                hcTomDeDecisao = `Com o novo processo (TO BE), a ocupação cairá para ${ocupacaoFutura.toFixed(1)}%, gerando um excedente produtivo de ${fteSalvo.toFixed(2)} FTE (${horasSalvas.toFixed(1)} horas/mês livres). Esta capacidade ociosa qualificada pode ser reatribuída para tarefas estratégicas de maior valor agregado.`;
              }

              return (
                <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  {/* Header */}
                  <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-black text-slate-800 uppercase tracking-tight">
                        🔍 Diagnóstico Lean de Capacidade e Dimensionamento (Kaizen)
                      </span>
                    </div>
                    <span className="text-[9px] font-black tracking-wider uppercase bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
                      Mapeamento Ativo
                    </span>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Grid de Balanço de Capacidade */}
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                      <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Capacidade Atual
                        </span>
                        <div className="text-[14px] font-black text-slate-800">
                          {hc > 0 ? (hc * 165).toFixed(0) : "0"}{" "}
                          <span className="text-[10px] text-slate-500 font-medium">
                            horas úteis/mês
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 mt-1">
                          Disponibilizada por {hc} HC(s)
                        </span>
                      </div>

                      <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Capacidade Necessária
                        </span>
                        <div className="text-[14px] font-black text-blue-600">
                          {(fteAtual * 165).toFixed(0)}{" "}
                          <span className="text-[10px] text-slate-500 font-medium">
                            horas úteis/mês
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 mt-1">
                          Equivale a {fteAtual.toFixed(2)} FTE necessário(s)
                        </span>
                      </div>

                      <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Capacidade Futura (TO BE)
                        </span>
                        <div className="text-[14px] font-black text-emerald-600">
                          {(fteFuturo * 165).toFixed(0)}{" "}
                          <span className="text-[10px] text-slate-500 font-medium">
                            horas úteis/mês
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-500 mt-1">
                          Reduz para {fteFuturo.toFixed(2)} FTE necessário(s)
                        </span>
                      </div>

                      <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                          FTEs Liberados
                        </span>
                        <div className="text-[14px] font-black text-emerald-700">
                          {fteSalvo.toFixed(3)}{" "}
                          <span className="text-[10px] text-emerald-500 font-medium">FTE</span>
                        </div>
                        <span className="text-[9.5px] text-emerald-600 mt-1">
                          Liberados: {horasSalvas.toFixed(1)} horas/mês
                        </span>
                      </div>

                      <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Eficiência Potencial
                        </span>
                        <div className="text-[14px] font-black text-emerald-700">
                          +{ganhoEficiencia.toFixed(1)}%
                        </div>
                        <span className="text-[9.5px] text-emerald-600 font-bold mt-1">
                          Ganho em tempo médio
                        </span>
                      </div>
                    </div>

                    {/* Alertas de Sobrecarga e Dimensionamento */}
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      {/* Cartão de Sobrecarga Atual */}
                      <div
                        className={`p-3.5 rounded-lg border ${statusCard.bg} flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider">
                            Status de Sobrecarga (Atual)
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${statusCard.badge}`}
                          >
                            {statusCard.text}
                          </span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed font-medium mb-1">
                          {statusCard.desc}
                        </p>
                        <span className="text-[10px] font-bold opacity-80 mt-1.5 block">
                          • Ocupação real do time em relação à jornada contratada:{" "}
                          {ocupacao.toFixed(1)}%
                        </span>
                      </div>

                      {/* Cartão de Recomendação de Dimensionamento */}
                      <div className="p-3.5 rounded-lg border border-slate-200 bg-blue-50/30 flex flex-col justify-between text-slate-800">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                            Decisão de Headcount (TO BE)
                          </span>
                          <span className="text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase bg-blue-100 text-blue-800">
                            {hcRecomendacao}
                          </span>
                        </div>
                        <p className="text-[11.5px] leading-relaxed font-medium text-slate-600 mb-1">
                          {hcTomDeDecisao}
                        </p>
                        <span className="text-[10px] font-bold text-slate-500 mt-1.5 block">
                          • Horas liberadas p/ mês com otimização: {horasSalvas.toFixed(1)}h (-
                          {ganhoEficiencia.toFixed(1)}% de esforço)
                        </span>
                      </div>
                    </div>

                    {/* Notas de Melhoria Contínua */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                      <span className="font-extrabold text-slate-700 block mb-1">
                        📋 Diretrizes Lean para Gestão de Capacidade (Kaizen):
                      </span>
                      <ul className="list-disc pl-4 space-y-1 font-medium">
                        <li>
                          <span className="font-bold text-slate-700">
                            Eliminação de Desperdício (Muda):
                          </span>{" "}
                          O ganho de eficiência de{" "}
                          <span className="font-bold text-slate-900">
                            {ganhoEficiencia.toFixed(1)}%
                          </span>{" "}
                          é obtido pela simplificação ou automação das atividades repetitivas (tempo
                          médio cai de {t_medio.toFixed(1)} min para {t_futuro} min).
                        </li>
                        <li>
                          <span className="font-bold text-slate-700">Estabilização do Fluxo:</span>{" "}
                          Priorize a padronização das etapas operacionais antes de qualquer
                          automatização para garantir que os desvios e reprocessos sejam
                          erradicados.
                        </li>
                        <li>
                          <span className="font-bold text-slate-700">
                            Monitoramento da Capacidade:
                          </span>{" "}
                          Mantenha a utilização saudável entre{" "}
                          <span className="font-bold text-slate-900">75% e 85%</span> para absorver
                          variações sazonais de volume sem gerar gargalos ou fadiga no time.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </SectionCard>

        {/* SECTION 9: COMPONENTE FINANCEIRO */}
        <SectionCard title="9 · Componente Financeiro" icon={<Coins className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <FieldLabel label="CUSTO POR HORA (R$)" monetaryValue={form.custo_hora} />
              <input
                type="number"
                min="0"
                step="0.01"
                disabled={!isAdmin}
                value={form.custo_hora}
                onChange={(e) => handleFieldChange("custo_hora", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="HORAS GASTAS ATUAL/MÊS" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.horas_gastas_mes}
                onChange={(e) => handleFieldChange("horas_gastas_mes", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="HORAS FUTURAS ESTIMADAS/MÊS" />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.horas_futuras_mes}
                onChange={(e) => handleFieldChange("horas_futuras_mes", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="HORAS ECONOMIZADAS/MÊS" tooltip={horasEconomizadas.memoria} />
              <input
                type="text"
                disabled
                value={`${horasEconomizadas.value.toFixed(2)} h`}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="MULTAS EVITADAS/ANO (R$)" monetaryValue={form.multas_evitadas} />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.multas_evitadas}
                onChange={(e) => handleFieldChange("multas_evitadas", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="CUSTO DE IMPLEMENTAÇÃO (R$)"
                monetaryValue={form.custo_implementacao}
              />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.custo_implementacao}
                onChange={(e) => handleFieldChange("custo_implementacao", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel
                label="VOLUME FINANCEIRO ENVOLVIDO (R$)"
                monetaryValue={form.volume_financeiro}
              />
              <input
                type="number"
                min="0"
                disabled={!isAdmin}
                value={form.volume_financeiro}
                onChange={(e) => handleFieldChange("volume_financeiro", Number(e.target.value))}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="ECONOMIA ANUAL ESTIMADA" tooltip={economiaAnual.memoria} />
              <input
                type="text"
                disabled
                value={economiaAnual.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 sm:col-span-2 lg:col-span-4">
              <div>
                <FieldLabel label="HC POTENCIAL LIBERADO" tooltip={calcs.fteLiberadoMem} />
                <input
                  type="text"
                  disabled
                  value={calcs.fteLiberado.toFixed(3)}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <FieldLabel label="ROI (%)" tooltip={calcs.roiMem} />
                <input
                  type="text"
                  disabled
                  value={`${calcs.roi.toFixed(1)}%`}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
                />
              </div>
              <div>
                <FieldLabel label="PAYBACK (MESES)" tooltip={calcs.paybackMem} />
                <input
                  type="text"
                  disabled
                  value={calcs.payback.toFixed(1)}
                  className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[12.5px] font-extrabold text-neutral-800 cursor-not-allowed outline-none"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 10: PRIORIZAÇÃO (SCORE INTELIGENTE) */}
        <SectionCard
          title="10 · Priorização (Score Inteligente)"
          icon={<Flame className="h-4 w-4" />}
        >
          <div className="mb-5 bg-[#268200]/5 border border-emerald-100 p-3 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <input
                id="auto-priority-calc"
                type="checkbox"
                checked={autoPriorizacao}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setAutoPriorizacao(checked);
                  if (checked) {
                    const autoVals = getAutoPrioridadeValues(form);
                    setForm((prev) => ({
                      ...prev,
                      ...autoVals,
                    }));
                  }
                }}
                className="h-4 w-4 rounded border-slate-300 text-[#268200] focus:ring-[#268200] cursor-pointer"
              />
              <label
                htmlFor="auto-priority-calc"
                className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider cursor-pointer select-none"
              >
                Ativar Cálculo Inteligente Automático (Recomendado)
              </label>
            </div>
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/50 px-2.5 py-1 rounded">
              {autoPriorizacao ? "Automático" : "Manual"}
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-5">
            <SliderField
              label="IMPACTO NEGÓCIO"
              value={form.impacto_negocio}
              disabled={autoPriorizacao || !isAdmin}
              onChange={(v) => handleFieldChange("impacto_negocio", v)}
            />
            <SliderField
              label="IMPACTO CLIENTE"
              value={form.impacto_cliente}
              disabled={autoPriorizacao || !isAdmin}
              onChange={(v) => handleFieldChange("impacto_cliente", v)}
            />
            <SliderField
              label="IMPACTO FINANCEIRO"
              value={form.impacto_financeiro}
              disabled={autoPriorizacao || !isAdmin}
              onChange={(v) => handleFieldChange("impacto_financeiro", v)}
            />
            <SliderField
              label="ESFORÇO IMPLEMENTAÇÃO"
              value={form.esforco}
              disabled={autoPriorizacao || !isAdmin}
              onChange={(v) => handleFieldChange("esforco", v)}
            />
            <SliderField
              label="COMPLEXIDADE"
              value={form.complexidade}
              disabled={autoPriorizacao || !isAdmin}
              onChange={(v) => handleFieldChange("complexidade", v)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
            <div>
              <FieldLabel label="SCORE INTELIGENTE OBTIDO" tooltip={calcs.smartScoreMem} />
              <input
                type="text"
                disabled
                value={calcs.smartScore}
                className="h-9 w-full rounded-md border border-[#DBDBDB] bg-yellow-50 px-3 text-[14px] font-black text-neutral-800 cursor-not-allowed outline-none"
              />
            </div>
            <div>
              <FieldLabel label="NÍVEL DE PRIORIDADE DERIVADO" />
              <span
                className={`flex h-9 w-full items-center justify-center rounded-md border border-neutral-200 text-center text-[12.5px] font-extrabold uppercase shadow-sm ${
                  calcs.prioridadeTone === "red"
                    ? "bg-red-100 text-red-800 border-red-200"
                    : calcs.prioridadeTone === "orange"
                      ? "bg-amber-100 text-amber-800 border-amber-200"
                      : "bg-emerald-100 text-emerald-800 border-emerald-200"
                }`}
              >
                {calcs.prioridadeStr}
              </span>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 11: GOVERNANÇA DA EXECUÇÃO */}
        <SectionCard title="11 · Governança da Execução" icon={<Calendar className="h-4 w-4" />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <FieldLabel label="STATUS DA GOVERNANÇA" />
              <PicklistField
                categoria="Status"
                value={form.status}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("status", v)}
              />
            </div>
            <div>
              <FieldLabel label="PRIORIDADE DA EXECUÇÃO" />
              <PicklistField
                categoria="Prioridade"
                value={form.prioridade}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("prioridade", v)}
              />
            </div>
            <div>
              <FieldLabel label="DATA DE INÍCIO DA DIAGNÓSTICO" />
              <input
                type="date"
                disabled={!isAdmin}
                value={form.data_inicio}
                onChange={(e) => handleFieldChange("data_inicio", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
              />
            </div>
            <div>
              <FieldLabel label="PREVISÃO DE CONCLUSÃO" />
              <input
                type="date"
                disabled={!isAdmin}
                value={form.data_fim_prevista}
                onChange={(e) => handleFieldChange("data_fim_prevista", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
              />
            </div>
            <div>
              <FieldLabel label="CONCLUSÃO REAL" />
              <input
                type="date"
                disabled={!isAdmin}
                value={form.data_fim_real}
                onChange={(e) => handleFieldChange("data_fim_real", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50 bg-white"
              />
            </div>
            <div>
              <FieldLabel label="CONVERSÃO / IMPLEMENTAÇÃO (%)" />
              <input
                type="number"
                min="0"
                max="100"
                disabled={!isAdmin}
                value={form.expectativa_produtividade}
                onChange={(e) =>
                  handleFieldChange("expectativa_produtividade", Number(e.target.value))
                }
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <FieldLabel label="OBSERVAÇÕES ADICIONAIS" />
              <textarea
                disabled={!isAdmin}
                value={form.observacoes}
                placeholder="Insira detalhes sobre reuniões, decisões ou pontos em aberto..."
                onChange={(e) => handleFieldChange("observacoes", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 12: EVIDÊNCIAS E ANEXOS */}
        <SectionCard
          title="12 · Evidências e Anexos"
          icon={<FileSpreadsheet className="h-4 w-4" />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel label="LINKS DE APRESENTAÇÃO / DIAGNÓSTICO (Separados por vírgula)" />
              <input
                type="text"
                disabled={!isAdmin}
                value={form.links_relacionados}
                placeholder="Ex: https://sharepoint.com/doc1, https://youtube.com/video..."
                onChange={(e) => handleFieldChange("links_relacionados", e.target.value)}
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="EVIDÊNCIA DA SITUAÇÃO ATUAL (COMO É HOJE)" />
              <textarea
                disabled={!isAdmin}
                value={form.evidencia_atual}
                placeholder="Descrição dos gargalos, fluxos manuais pesados..."
                onChange={(e) => handleFieldChange("evidencia_atual", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="EVIDÊNCIA DA SITUAÇÃO FUTURA (COMO DEVE SER)" />
              <textarea
                disabled={!isAdmin}
                value={form.evidencia_futura}
                placeholder="Descrição do ganho, automação executando em segundos..."
                onChange={(e) => handleFieldChange("evidencia_futura", e.target.value)}
                onBlur={handleFieldBlur}
                rows={2}
                className="w-full rounded-md border border-[#DBDBDB] p-3 text-[12.5px] font-medium outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div className="sm:col-span-2 text-[11px] italic text-slate-400 mt-1 flex items-center gap-1.5">
              <span>
                📎 Nota: Arquivos físicos ou mídias anexas devem ser carregados e gerenciados
                diretamente através da aba <b>Mural de Imagens</b> ou nos anexos das tarefas.
              </span>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 13: CAMPOS ADICIONAIS */}
        <SectionCard
          title="13 · Campos Adicionais"
          icon={<Zap className="h-4 w-4 text-orange-500" />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <FieldLabel label="NÍVEL DE URGÊNCIA" />
              <PicklistField
                categoria="Urgência"
                value={form.urgencia}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("urgencia", v)}
              />
            </div>
            <div>
              <FieldLabel label="EXPECTATIVA PRODUTIVIDADE (%)" />
              <input
                type="number"
                min="0"
                max="100"
                disabled={!isAdmin}
                value={form.expectativa_produtividade}
                onChange={(e) =>
                  handleFieldChange("expectativa_produtividade", Number(e.target.value))
                }
                onBlur={handleFieldBlur}
                className="h-9 w-full rounded-md border border-[#DBDBDB] px-3 text-[12.5px] outline-none focus:border-[#268200] focus:ring-1 focus:ring-[#268200] text-slate-700 disabled:bg-slate-50"
              />
            </div>
            <div>
              <FieldLabel label="COMPLEXIDADE PROCESSO" />
              <PicklistField
                categoria="Complexidade do Processo"
                value={form.complexidade_processo}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("complexidade_processo", v)}
              />
            </div>
            <div>
              <FieldLabel label="DEPENDÊNCIA DE TI?" />
              <ToggleField
                value={form.dependencia_ti}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("dependencia_ti", v)}
              />
            </div>
            <div>
              <FieldLabel label="TIPO DE MELHORIA" />
              <PicklistField
                categoria="Tipo de Melhoria"
                value={form.tipo_melhoria}
                disabled={!isAdmin}
                onChange={(v) => handleFieldChange("tipo_melhoria", v)}
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* STICKY BOTTOM ACTIONS CONTROL BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E5E5E5] bg-neutral-900 px-6 py-4 shadow-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {savingStatus === "saving" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Salvando na Nuvem (GCP)...
              </span>
            )}
            {savingStatus === "saved" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <Check className="h-4 w-4" />
                Sincronizado e Salvo na Nuvem (GCP)
              </span>
            )}
            {savingStatus === "error" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-bold">
                <AlertTriangle className="h-4 w-4" />
                Erro ao sincronizar.
              </span>
            )}
            {savingStatus === "idle" && (
              <span className="text-[11px] text-slate-400">
                {isCreatingNew
                  ? "Preenchendo Rascunho. Clique em Criar para ativar o autosave."
                  : "Nenhuma iniciativa carregada para salvar."}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                type="button"
                onClick={handleLimparFormulario}
                className="rounded-lg border border-neutral-700 bg-transparent px-4 py-2 text-xs font-bold text-slate-300 hover:bg-neutral-800 transition"
              >
                Limpar
              </button>
            )}

            {isCreatingNew ? (
              isAdmin && (
                <button
                  type="button"
                  onClick={handleCreateInitiative}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#268200] hover:bg-[#1f6b00] px-5 py-2 text-xs font-bold text-white shadow-sm transition"
                >
                  <Plus className="h-4 w-4" />
                  Criar Iniciativa
                </button>
              )
            ) : (
              <>
                {activeInitiative && isAdmin && (
                  <button
                    type="button"
                    onClick={handleExcluirIniciativa}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-900 bg-red-950/40 hover:bg-red-950/80 px-4 py-2 text-xs font-bold text-red-400 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Excluir Iniciativa
                  </button>
                )}

                {activeInitiative && isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      if (autoSaveTimeoutRef.current) clearTimeout(autoSaveTimeoutRef.current);
                      saveToGCP(iniciativaId, form);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#268200] hover:bg-[#1a5b00] px-5 py-2 text-xs font-bold text-white shadow transition"
                  >
                    <Save className="h-4 w-4" />
                    Salvar Iniciativa
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component: KPI indicators Card
function KpiCard({
  title,
  value,
  tooltip,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  tooltip?: string;
  icon?: React.ReactNode;
  color?: "emerald" | "orange" | "yellow" | "red";
}) {
  const colorCls =
    color === "red"
      ? "text-red-700 border-red-200 bg-red-50"
      : color === "orange"
        ? "text-[#FF6900] border-orange-100 bg-orange-50/50"
        : color === "yellow"
          ? "text-amber-700 border-amber-100 bg-amber-50/50"
          : "text-[#268200] border-emerald-100 bg-[#268200]/5";

  return (
    <div
      className={`group relative rounded-lg border p-3 flex flex-col justify-between h-[78px] transition-all duration-200 hover:shadow-sm ${colorCls}`}
    >
      <div className="flex items-center justify-between text-[8px] font-black tracking-widest text-slate-400 uppercase">
        <span className="truncate">{title}</span>
        {icon}
      </div>
      <div className="text-[17px] font-black tracking-tight leading-none mt-2 truncate">
        {value}
      </div>

      {tooltip && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2.5 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 whitespace-pre-line leading-relaxed">
          <div className="font-extrabold uppercase text-[8.5px] border-b border-slate-700 pb-1 mb-1.5 text-slate-300 flex items-center gap-1">
            <Info className="h-3 w-3" /> Memória de Cálculo ({title})
          </div>
          {tooltip}
        </div>
      )}
    </div>
  );
}

// Sub-component: Form Section card wrapper
function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[13px] font-black uppercase tracking-wider text-neutral-800 border-b border-neutral-100 pb-2.5 flex items-center gap-2">
        <span className="text-[#268200]">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

// Helper to format minutes to hours and minutes suffix (Yh Zmin)
function formatMinutesToHoursMinutesSuffix(minutes: number): string {
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60);
  const remainingMinutes = rounded % 60;
  const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  return `${hours}h ${minutesStr}min`;
}

// Sub-component: Label & tooltip helper
function FieldLabel({
  label,
  tooltip,
  durationInMinutes,
  monetaryValue,
}: {
  label: string;
  tooltip?: string;
  durationInMinutes?: number | null;
  monetaryValue?: number | null;
}) {
  const timeStr =
    durationInMinutes !== undefined && durationInMinutes !== null && !isNaN(durationInMinutes)
      ? formatMinutesToHoursMinutesSuffix(durationInMinutes)
      : "";

  const moneyStr =
    monetaryValue !== undefined && monetaryValue !== null && !isNaN(monetaryValue)
      ? monetaryValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";

  return (
    <div className="flex items-center justify-between gap-1 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 w-full">
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {tooltip && (
          <div className="group relative cursor-help text-[#268200]">
            <Info className="h-3.5 w-3.5 shrink-0" />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 w-64 -translate-x-1/2 rounded-md bg-slate-800 p-2.5 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 whitespace-pre-line leading-relaxed">
              <div className="font-extrabold uppercase text-[8.5px] border-b border-slate-700 pb-1 mb-1.5 text-slate-300 flex items-center gap-1">
                <Info className="h-3 w-3" /> Fórmula
              </div>
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {timeStr && (
        <span className="text-[10px] font-black text-blue-600 normal-case ml-1">({timeStr})</span>
      )}
      {moneyStr && (
        <span className="text-[10.5px] font-black text-emerald-600 normal-case ml-1">
          {moneyStr}
        </span>
      )}
    </div>
  );
}

// Sub-component: Toggle field button (Sim/Não)
function ToggleField({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={`w-full h-9 rounded-md border text-center text-[12.5px] font-bold transition-all duration-150 ${
        value
          ? "bg-[#268200] text-white border-[#268200] hover:bg-[#1f6b00]"
          : "bg-white text-slate-700 border-[#DBDBDB] hover:bg-slate-50"
      } ${disabled ? "opacity-60 cursor-not-allowed bg-neutral-50" : ""}`}
    >
      {value ? "Sim" : "Não"}
    </button>
  );
}

// Sub-component: Styled range slider (1 to 5)
function SliderField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
      <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-[13px] font-black text-[#268200]">{value}</span>
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#268200] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-[9px] text-slate-400 font-extrabold px-0.5 mt-1.5">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}
