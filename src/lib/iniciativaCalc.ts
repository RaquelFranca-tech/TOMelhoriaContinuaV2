/**
 * Cálculos derivados da Iniciativa — todos com memória de cálculo (tooltip).
 * Fonte única de verdade para o Formulário-mestre e Dashboards.
 */

export type CalcInput = {
  impacto_negocio?: number | null;
  impacto_cliente?: number | null;
  impacto_financeiro?: number | null;
  esforco?: number | null;
  complexidade?: number | null;

  hc_atual?: number | null;
  hc_estimado?: number | null;
  fte_participacao?: number | null;

  tempo_min?: number | null;
  tempo_max?: number | null;
  tempo_ideal?: number | null;
  tempo_futuro?: number | null;
  tempo_espera?: number | null;
  execucoes_mes?: number | null;
  execucoes_dia?: number | null;
  execucoes_semana?: number | null;

  taxa_erro?: number | null;
  retrabalho?: number | null;

  dep_pessoa?: number | null;
  sem_substituto?: number | null;
  dep_pessoa_chave?: boolean | null;
  substituto_treinado?: boolean | null;
  tempo_treino?: number | null;
  tempo_capacitacao?: number | null;

  saving_previsto?: number | null;
  custo_implementacao?: number | null;
  ganho_horas?: number | null;
  custo_hora?: number | null;
  horas_gastas_mes?: number | null;
  horas_futuras_mes?: number | null;
  multas_evitadas?: number | null;

  atividade_manual?: boolean | null;
  digitacao_manual?: boolean | null;
  copia_cola?: boolean | null;
  excel_paralelo?: boolean | null;

  sistemas?: unknown;
  integracoes?: unknown;
  qtd_regras?: string | null;
  volume_excecoes?: string | null;
  alternancia_telas?: string[] | null;
  locais_consulta?: string[] | null;
  passos_manuais?: string[] | null;
};

const n = (v: number | null | undefined, d = 0) => (typeof v === "number" && !isNaN(v) ? v : d);
const b = (v: boolean | null | undefined) => (v ? 1 : 0);

/* ===================== TEMPO ===================== */
export function calcTempoMedio(i: CalcInput) {
  const tmin = n(i.tempo_min),
    tmax = n(i.tempo_max);
  const v = (tmin + tmax) / 2;
  return {
    value: v,
    memoria: `Tempo médio = (mín + máx) / 2 = (${tmin} + ${tmax}) / 2 = ${v.toFixed(2)} min`,
  };
}
export function calcGanhoTempo(i: CalcInput) {
  const medio = calcTempoMedio(i).value;
  const ideal = n(i.tempo_ideal);
  const v = Math.max(0, medio - ideal);
  return {
    value: v,
    memoria: `Ganho de tempo = tempo médio − tempo ideal = ${medio.toFixed(2)} − ${ideal} = ${v.toFixed(2)} min`,
  };
}
export function calcPercReducao(i: CalcInput) {
  const atual = calcTempoMedio(i).value;
  const futuro = n(i.tempo_futuro);
  if (atual <= 0)
    return {
      value: 0,
      memoria:
        "Percentual de redução = ((atual − futuro) / atual) × 100\nAtual = 0 → não calculado",
    };
  const v = ((atual - futuro) / atual) * 100;
  return {
    value: v,
    memoria: `Percentual de redução = ((atual − futuro) / atual) × 100\n= ((${atual.toFixed(2)} − ${futuro}) / ${atual.toFixed(2)}) × 100 = ${v.toFixed(1)}%`,
  };
}

/* ===================== VOLUME ===================== */
export function calcHorasDesperdicadasMes(i: CalcInput) {
  const ganho = calcGanhoTempo(i).value;
  const exec = n(i.execucoes_mes);
  const v = (ganho / 60) * exec;
  return {
    value: v,
    memoria: `Horas desperdiçadas/mês = (ganho de tempo / 60) × execuções/mês\n= (${ganho.toFixed(2)} / 60) × ${exec} = ${v.toFixed(2)} h`,
  };
}
export function calcHorasMes(i: CalcInput) {
  const t = calcTempoMedio(i).value;
  const exec = n(i.execucoes_mes);
  const v = (t * exec) / 60;
  return {
    value: v,
    memoria: `Horas/mês = (tempo médio × execuções/mês) / 60 = (${t.toFixed(2)} × ${exec}) / 60 = ${v.toFixed(2)} h`,
  };
}

/* ===================== QUALIDADE ===================== */
export function calcIndiceQualidade(i: CalcInput) {
  const erro = n(i.taxa_erro),
    retr = n(i.retrabalho);
  const v = (1 - erro / 100) * (1 - retr / 100) * 100;
  return {
    value: v,
    memoria: `Índice de qualidade = (1 − erro%) × (1 − retrabalho%) × 100\n= (1 − ${erro}/100) × (1 − ${retr}/100) × 100 = ${v.toFixed(1)}`,
  };
}

/* ===================== AUTOMAÇÃO ===================== */
export function calcScoreAutomacao(i: CalcInput) {
  const m = b(i.atividade_manual) * 10;
  const d = b(i.digitacao_manual) * 10;
  const c = b(i.copia_cola) * 10;
  const e = b(i.excel_paralelo) * 10;
  const v = m + d + c + e;
  return {
    value: v,
    memoria: `Score de Automação (0–40) = Manual(${m}) + Digitação(${d}) + Copia/Cola(${c}) + Excel(${e}) = ${v}`,
  };
}
const REG_W: Record<string, number> = {
  "Até 3": 1,
  "4 a 10": 2,
  "11 a 20": 3,
  "21 a 50": 4,
  "Mais de 50": 5,
};
const EXC_W: Record<string, number> = {
  Nenhuma: 1,
  Poucas: 2,
  Moderadas: 3,
  Muitas: 4,
  "Muito elevadas": 5,
};
export function calcComplexidadeAutomacao(i: CalcInput) {
  const sis = Array.isArray(i.sistemas) ? i.sistemas.length : 0;
  const alt = Array.isArray(i.alternancia_telas) ? i.alternancia_telas.length : 0;
  const loc = Array.isArray(i.locais_consulta) ? i.locais_consulta.length : 0;
  const pas = Array.isArray(i.passos_manuais) ? i.passos_manuais.length : 0;
  const intg = Array.isArray(i.integracoes) ? i.integracoes.length : 0;

  const reg = REG_W[String(i.qtd_regras ?? "")] ?? 0;
  const exc = EXC_W[String(i.volume_excecoes ?? "")] ?? 0;

  const manualAct = i.atividade_manual ? 3 : 0;
  const manualTyp = i.digitacao_manual ? 4 : 0;
  const manualCc = i.copia_cola ? 3 : 0;

  // Weighted sum
  const v =
    sis * 2 +
    alt * 2 +
    loc * 2 +
    pas * 2 +
    intg * 3 +
    reg * 2 +
    exc * 2 +
    manualAct +
    manualTyp +
    manualCc;

  let label = "Baixa";
  if (v > 35) label = "Muito Alta";
  else if (v > 25) label = "Alta";
  else if (v > 15) label = "Média";

  return {
    value: v,
    label: label,
    memoria:
      `Complexidade da Automação (Pontos: ${v} - Nível: ${label})\n` +
      `• Sistemas Conectados: ${sis} × 2 = ${sis * 2}\n` +
      `• Alternância de Telas: ${alt} × 2 = ${alt * 2}\n` +
      `• Locais de Consulta: ${loc} × 2 = ${loc * 2}\n` +
      `• Passos Manuais: ${pas} × 2 = ${pas * 2}\n` +
      `• Integrações Necessárias: ${intg} × 3 = ${intg * 3}\n` +
      `• Quantidade de Regras: Peso ${reg} × 2 = ${reg * 2}\n` +
      `• Volume de Exceções: Peso ${exc} × 2 = ${exc * 2}\n` +
      `• Atividades Manuais: Atividade (${manualAct}) + Digitação (${manualTyp}) + Copia/Cola (${manualCc}) = ${manualAct + manualTyp + manualCc}`,
  };
}

/* ===================== PESSOAS / RISCO ===================== */
export function calcRiscoOperacional(i: CalcInput) {
  const dep = b(i.dep_pessoa_chave) * 3;
  const sub = (i.substituto_treinado === false || i.substituto_treinado == null ? 1 : 0) * 2;
  const tr = n(i.tempo_capacitacao) * 0.5;
  const v = dep + sub + tr;
  return {
    value: Math.round(v * 10) / 10,
    memoria: `Risco Operacional = (Dep.Pessoa×3) + (Sem Substituto×2) + (Tempo Treino×0,5)\n= ${dep} + ${sub} + ${tr.toFixed(2)} = ${v.toFixed(2)}`,
  };
}

/* ===================== EVALUATOR ===================== */
function getFormulaFromLocalStorage(id: string, fallbackExpressao: string): string {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("vibra_db_formulas");
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list)) {
          const found = list.find((f) => f.id === id);
          if (found && found.expressao) {
            return found.expressao;
          }
        }
      }
    }
  } catch (e) {
    console.warn("Could not read formulas from localStorage:", e);
  }
  return fallbackExpressao;
}

export function evaluateFormula(expression: string, variables: Record<string, number>): number {
  try {
    let sanitized = expression;
    const keys = Object.keys(variables).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      const val = variables[key] ?? 0;
      const regex = new RegExp(`\\b${key}\\b`, "g");
      sanitized = sanitized.replace(regex, String(val));
    }
    sanitized = sanitized.replace(/[^0-9\s+\-*/().%]/g, "");
    const result = new Function(`return (${sanitized})`)();
    if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
      return result;
    }
    return 0;
  } catch (err) {
    console.error("Error evaluating expression:", expression, err);
    return 0;
  }
}

/* ===================== FINANCEIRO ===================== */
export function calcHorasEconomizadasMes(i: CalcInput) {
  const g = n(i.horas_gastas_mes),
    f = n(i.horas_futuras_mes);
  const v = Math.max(0, g - f);
  return {
    value: v,
    memoria: `Horas economizadas/mês = horas gastas − horas futuras = ${g} − ${f} = ${v.toFixed(2)} h`,
  };
}
export function calcEconomiaAnual(i: CalcInput) {
  const h = calcHorasEconomizadasMes(i).value;
  const c = n(i.custo_hora);
  const v = h * c * 12;
  return {
    value: v,
    memoria: `Economia anual = horas economizadas × custo/hora × 12 = ${h.toFixed(2)} × ${c} × 12 = R$ ${v.toFixed(2)}`,
  };
}
export function calcFteLiberado(i: CalcInput) {
  const h = calcHorasEconomizadasMes(i).value;
  const hc_estimado = n(i.hc_estimado);
  const hc_alcancado = n(i.hc_alcancado);

  const expr = getFormulaFromLocalStorage("f-fte", "hc_estimado - hc_alcancado");
  let value = evaluateFormula(expr, {
    hc_estimado,
    hc_alcancado,
  });

  if (value === 0 && h > 0) {
    value = h / 176;
  }

  return {
    value: value,
    memoria: `FTE Liberado calculado via fórmula dinâmica: ${expr}\nVariáveis: hc_estimado = ${hc_estimado}, hc_alcancado = ${hc_alcancado}\nResultado = ${value.toFixed(3)} FTE`,
  };
}
export function calcRoi(i: CalcInput) {
  const saving = n(i.saving_previsto) || calcEconomiaAnual(i).value;
  const custo = n(i.custo_implementacao);
  if (custo <= 0)
    return { value: 0, memoria: "ROI = (saving − custo) / custo × 100\nCusto = 0 → não calculado" };

  const expr = getFormulaFromLocalStorage(
    "f-roi",
    "((saving_realizado - custo_implementacao) / custo_implementacao) * 100",
  );
  const value = evaluateFormula(expr, {
    saving_realizado: saving,
    custo_implementacao: custo,
  });

  return {
    value: value,
    memoria: `ROI calculado via fórmula dinâmica: ${expr}\nVariáveis: saving_realizado = ${saving.toFixed(2)}, custo_implementacao = ${custo.toFixed(2)}\nResultado = ${value.toFixed(1)}%`,
  };
}
export function calcPayback(i: CalcInput) {
  const saving = n(i.saving_previsto) || calcEconomiaAnual(i).value;
  const custo = n(i.custo_implementacao);
  if (saving <= 0)
    return { value: 0, memoria: "Payback = custo / (saving/12). Saving = 0 → não calculado" };

  const expr = getFormulaFromLocalStorage(
    "f-payback",
    "custo_implementacao / (saving_previsto / 12)",
  );
  const value = evaluateFormula(expr, {
    custo_implementacao: custo,
    saving_previsto: saving,
  });

  return {
    value: value,
    memoria: `Payback calculado via fórmula dinâmica: ${expr}\nVariáveis: custo_implementacao = ${custo.toFixed(2)}, saving_previsto = ${saving.toFixed(2)}\nResultado = ${value.toFixed(1)} meses`,
  };
}

/* ===================== PRIORIZAÇÃO ===================== */
export function calcSmartScore(i: CalcInput) {
  const impNeg = n(i.impacto_negocio),
    impCli = n(i.impacto_cliente),
    impFin = n(i.impacto_financeiro);
  const esf = n(i.esforco),
    comp = n(i.complexidade);

  const expr = getFormulaFromLocalStorage(
    "f-score",
    "(impacto_negocio + impacto_cliente + impacto_financeiro) / (esforco + complexidade) * 10",
  );
  const value = evaluateFormula(expr, {
    impacto_negocio: impNeg,
    impacto_cliente: impCli,
    impacto_financeiro: impFin,
    esforco: esf,
    complexidade: comp,
  });

  return {
    value: Math.max(0, Math.min(100, Math.round(value))),
    memoria: `Score de Priorização calculado via fórmula dinâmica: ${expr}\nVariáveis: impacto_negocio = ${impNeg}, impacto_cliente = ${impCli}, impacto_financeiro = ${impFin}, esforço = ${esf}, complexidade = ${comp}\nResultado = ${value.toFixed(1)}`,
  };
}
export function nivelPrioridade(score: number) {
  if (score >= 50) return { label: "Crítica", tone: "red" as const };
  if (score >= 35) return { label: "Alta", tone: "orange" as const };
  if (score >= 20) return { label: "Média", tone: "yellow" as const };
  if (score >= 10) return { label: "Baixa", tone: "vibra" as const };
  return { label: "Muito Baixa", tone: "vibra" as const };
}
