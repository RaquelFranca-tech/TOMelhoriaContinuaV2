import type { Database } from "./types";

// Safe UUID Generator for all contexts (HTTPS, HTTP, iframe, etc.)
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return (
    "f" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );
}

// Seeded Data Generator for all tables
function getSeededData(table: string): any[] {
  const seedKey = `seeded_${table}`;
  if (localStorage.getItem(seedKey)) return [];

  let data: any[] = [];
  const now = new Date().toISOString();

  if (table === "profiles") {
    data = [
      {
        id: "user-admin",
        nome: "Administrador do Escritório",
        email: "admin@vibraenergia.com.br",
        papel: "Administrador Global",
        created_at: now,
      },
      {
        id: "user-rfranca",
        nome: "Raquel França",
        email: "rfranca@vibraenergia.com.br",
        papel: "Administrador Global",
        created_at: now,
      },
    ];
  } else if (table === "user_roles") {
    data = [
      { id: "role-admin", user_id: "user-admin", role: "admin", created_at: now },
      { id: "role-rfranca", user_id: "user-rfranca", role: "admin", created_at: now },
    ];
  } else if (table === "projetos") {
    data = [
      {
        id: "proj-1",
        nome: "Expansão de Postos Petrobras Nordeste",
        descricao:
          "Jornada de embandeiramento estratégico, padronização e redução de lead time de postos de combustíveis.",
        coordenador: "Raquel França",
        created_at: now,
      },
      {
        id: "proj-2",
        nome: "Digitalização e Automação de Backoffice",
        descricao:
          "Otimização de processos operacionais e robotização (RPA) de rotinas administrativas.",
        coordenador: "Roberto Silva",
        created_at: now,
      },
    ];
  } else if (table === "iniciativas") {
    data = [
      {
        id: "ini-1",
        projeto_id: "proj-1",
        codigo: "INI-001",
        titulo: "Totem de Autoatendimento na Pista",
        status: "Em Andamento",
        diretoria: "Varejo",
        gerencia: "Operações",
        responsavel_analista: "Carlos Oliveira",
        responsavel_gestor: "Sonia Santos",
        asIsDias: 45,
        toBeDias: 25,
        tempo_max: 21600, // 45 dias em minutos (45 * 8 * 60)
        tempo_futuro: 12000, // 25 dias em minutos
        hc_atual: 12,
        expectativa_produtividade: 45, // 45% automação
        ganho_financeiro: 120000, // 120k saving
        custo_implementacao: 35000,
        tipo_melhoria: "Automação RPA",
        created_at: now,
      },
      {
        id: "ini-2",
        projeto_id: "proj-1",
        codigo: "INI-002",
        titulo: "Treinamento Técnico de Pista",
        status: "Planejado",
        diretoria: "Varejo",
        gerencia: "Treinamento",
        responsavel_analista: "Ana Beatriz",
        responsavel_gestor: "Sonia Santos",
        asIsDias: 20,
        toBeDias: 15,
        tempo_max: 9600,
        tempo_futuro: 7200,
        hc_atual: 8,
        expectativa_produtividade: 25,
        ganho_financeiro: 45000,
        custo_implementacao: 5000,
        tipo_melhoria: "Simplificação de Processo",
        created_at: now,
      },
      {
        id: "ini-3",
        projeto_id: "proj-2",
        codigo: "INI-003",
        titulo: "Faturamento Automático com IA",
        status: "Em Andamento",
        diretoria: "Financeiro",
        gerencia: "Faturamento",
        responsavel_analista: "Fernando Santos",
        responsavel_gestor: "Julio Cesar",
        asIsDias: 60,
        toBeDias: 10,
        tempo_max: 28800,
        tempo_futuro: 4800,
        hc_atual: 15,
        expectativa_produtividade: 80, // 80% automação
        ganho_financeiro: 320000,
        custo_implementacao: 90000,
        tipo_melhoria: "Sistema Integrado - Dev IA",
        created_at: now,
      },
    ];
  } else if (table === "asis_passos") {
    data = [
      {
        id: "asis-1",
        iniciativa_id: "ini-1",
        ordem: 1,
        atividade: "Recebimento da proposta de embandeiramento",
        executor: "Analista de Cadastro",
        tempo: 240,
        custo_fração: 50,
      },
      {
        id: "asis-2",
        iniciativa_id: "ini-1",
        ordem: 2,
        atividade: "Análise de crédito e documentação",
        executor: "Analista Financeiro",
        tempo: 480,
        custo_fração: 100,
      },
      {
        id: "asis-3",
        iniciativa_id: "ini-1",
        ordem: 3,
        atividade: "Vistoria técnica da pista",
        executor: "Engenheiro de Campo",
        tempo: 960,
        custo_fração: 300,
      },
    ];
  } else if (table === "tobe_passos") {
    data = [
      {
        id: "tobe-1",
        iniciativa_id: "ini-1",
        ordem: 1,
        atividade: "Submissão digital unificada",
        executor: "Cliente / Portal",
        tempo: 30,
        ganho_fte: 0.5,
        ganho_financeiro: 10000,
      },
      {
        id: "tobe-2",
        iniciativa_id: "ini-1",
        ordem: 2,
        atividade: "Análise de crédito pré-aprovada com IA",
        executor: "Motor Cognitivo",
        tempo: 15,
        ganho_fte: 1.2,
        ganho_financeiro: 40000,
      },
      {
        id: "tobe-3",
        iniciativa_id: "ini-1",
        ordem: 3,
        atividade: "Vistoria técnica agendada via app",
        executor: "Engenheiro",
        tempo: 360,
        ganho_fte: 0.8,
        ganho_financeiro: 15000,
      },
    ];
  } else if (table === "microprocessos") {
    data = [
      {
        id: "micro-1",
        projeto_id: "proj-1",
        nome: "Análise de Viabilidade Financeira",
        macroprocesso_id: "proj-1",
      },
      {
        id: "micro-2",
        projeto_id: "proj-1",
        nome: "Vistoria e Engenharia de Campo",
        macroprocesso_id: "proj-1",
      },
      {
        id: "micro-3",
        projeto_id: "proj-2",
        nome: "Lançamento de Notas Fiscais",
        macroprocesso_id: "proj-2",
      },
    ];
  } else if (table === "tarefas") {
    data = [
      {
        id: "tar-1",
        iniciativa_id: "ini-1",
        microprocesso_id: "micro-1",
        titulo: "Definir modelo de scorecard de risco",
        status: "Concluído",
        prioridade: "Alta",
      },
      {
        id: "tar-2",
        iniciativa_id: "ini-1",
        microprocesso_id: "micro-1",
        titulo: "Aprovar matriz financeira de ROI",
        status: "Em Andamento",
        prioridade: "Alta",
      },
      {
        id: "tar-3",
        iniciativa_id: "ini-1",
        microprocesso_id: "micro-2",
        titulo: "Comprar equipamentos de totem de teste",
        status: "Não Iniciado",
        prioridade: "Média",
      },
    ];
  } else if (table === "app_configuracoes") {
    data = [
      {
        id: "conf-perms-admin",
        chave: "permissions_admin",
        valor: {
          modulo_executivo: true,
          modulo_mapeamento: true,
          modulo_configuracao: true,
          aba_executivo_meudia: true,
          aba_executivo_dashboard: true,
          aba_executivo_iniciativas: true,
          aba_executivo_equipe: true,
          aba_executivo_ganhos: true,
          aba_executivo_mudanca: true,
          aba_executivo_relatorios: true,
          aba_executivo_tarefas: true,
          aba_executivo_mc3: true,
          aba_mapeamento_formulario: true,
          aba_mapeamento_analise: true,
          aba_mapeamento_causa: true,
          aba_mapeamento_resultados: true,
          aba_mapeamento_mural: true,
          aba_mapeamento_governanca: true,
          aba_mapeamento_ferramentas: true,
          aba_mapeamento_bpmn: true,
          aba_mapeamento_agenda: true,
          aba_mapeamento_ajuda: true,
          aba_configuracoes_usuarios: true,
          aba_configuracoes_picklists: true,
          aba_configuracoes_hierarquia: true,
          aba_configuracoes_formulas: true,
          aba_configuracoes_integracoes: true,
          aba_configuracoes_banco: true,
          aba_kanban: true,
          aba_timeline: true,
          aba_acoes: true,
          aba_sipoc: true,
          aba_dmaic: true,
          aba_kaizen: true,
          aba_calculadora: true,
          view_financial_fields: true,
          edit_any_picklist: true,
        },
      },
    ];
  } else if (table === "picklists") {
    data = [
      { id: "pick-1", nome: "diretoria", descricao: "Diretoria da Vibra" },
      { id: "pick-2", nome: "status_iniciativa", descricao: "Status de Iniciativa" },
    ];
  } else if (table === "picklist_valores") {
    data = [
      { id: "val-1", picklist_id: "pick-1", valor: "Varejo", ordem: 1 },
      { id: "val-2", picklist_id: "pick-1", valor: "Financeiro", ordem: 2 },
      { id: "val-3", picklist_id: "pick-1", valor: "Operações", ordem: 3 },
      { id: "val-4", picklist_id: "pick-2", valor: "Planejado", ordem: 1 },
      { id: "val-5", picklist_id: "pick-2", valor: "Em Andamento", ordem: 2 },
      { id: "val-6", picklist_id: "pick-2", valor: "Concluído", ordem: 3 },
    ];
  }

  localStorage.setItem(seedKey, "true");
  localStorage.setItem(`db_${table}`, JSON.stringify(data));
  return data;
}

// Local SQLite Simulation Adapter Query Builder
class LocalQueryBuilder {
  private table: string;
  private filters: Array<(item: any) => boolean> = [];
  private orderCol: string | null = null;
  private orderAsc: boolean = true;
  private limitCount: number | null = null;
  private isMutation: boolean = false;
  private mutationResult: any = null;

  constructor(table: string) {
    this.table = table;
  }

  private getTableData(): any[] {
    const key = `db_${this.table}`;
    const raw = localStorage.getItem(key);
    if (!raw) {
      return getSeededData(this.table);
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  private saveTableData(data: any[]) {
    const key = `db_${this.table}`;
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new Event("storage"));
    } catch (error: any) {
      console.error(`Error saving table ${this.table} to localStorage:`, error);
      const isQuotaError =
        error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED" ||
        error.code === 22 ||
        error.code === 1014 ||
        error.message?.toLowerCase().includes("quota") ||
        error.message?.toLowerCase().includes("exceeded");

      if (isQuotaError) {
        try {
          console.warn(
            "LocalStorage quota exceeded! Attempting to clear non-essential caches to free space...",
          );
          // Clear non-critical caches
          localStorage.removeItem("vibra_design_logos");
          // Re-try save
          localStorage.setItem(key, JSON.stringify(data));
          window.dispatchEvent(new Event("storage"));
          return;
        } catch (retryError) {
          throw new Error(
            "Limite de armazenamento local excedido. Por favor, remova imagens muito grandes de seus projetos ou redefina os logotipos para liberar espaço no navegador.",
          );
        }
      }
      throw error;
    }
  }

  select(columns: string = "*") {
    return this;
  }

  eq(col: string, val: any) {
    this.filters.push((item) => {
      if (val === null) return item[col] === null;
      return String(item[col]) === String(val);
    });
    return this;
  }

  neq(col: string, val: any) {
    this.filters.push((item) => String(item[col]) !== String(val));
    return this;
  }

  in(col: string, vals: any[]) {
    const valStrings = vals.map(String);
    this.filters.push((item) => valStrings.includes(String(item[col])));
    return this;
  }

  is(col: string, val: any) {
    this.filters.push((item) => item[col] === val);
    return this;
  }

  gte(col: string, val: any) {
    this.filters.push((item) => item[col] >= val);
    return this;
  }

  lte(col: string, val: any) {
    this.filters.push((item) => item[col] <= val);
    return this;
  }

  ilike(col: string, val: string) {
    const clean = val.replace(/%/g, "").toLowerCase();
    this.filters.push((item) =>
      String(item[col] ?? "")
        .toLowerCase()
        .includes(clean),
    );
    return this;
  }

  order(col: string, options?: { ascending?: boolean }) {
    this.orderCol = col;
    this.orderAsc = options?.ascending !== false;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  maybeSingle() {
    return this.then().then((res) => {
      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      return { data: data || null, error: null };
    });
  }

  single() {
    return this.then().then((res) => {
      const data = Array.isArray(res.data) ? res.data[0] : res.data;
      if (!data) {
        return { data: null, error: { message: "Row not found" } };
      }
      return { data, error: null };
    });
  }

  async then(onfulfilled?: (value: any) => any) {
    if (this.isMutation) {
      const res = { data: this.mutationResult, error: null };
      return onfulfilled ? onfulfilled(res) : res;
    }

    let data = this.getTableData();
    for (const f of this.filters) {
      data = data.filter(f);
    }
    if (this.orderCol) {
      data.sort((a, b) => {
        const valA = a[this.orderCol!];
        const valB = b[this.orderCol!];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        if (typeof valA === "number" && typeof valB === "number") {
          return this.orderAsc ? valA - valB : valB - valA;
        }
        return this.orderAsc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }
    if (this.limitCount !== null) {
      data = data.slice(0, this.limitCount);
    }
    const res = { data, error: null };
    return onfulfilled ? onfulfilled(res) : res;
  }

  insert(rowOrRows: any | any[]) {
    const data = this.getTableData();
    const rows = Array.isArray(rowOrRows) ? rowOrRows : [rowOrRows];
    const newRows = rows.map((r) => {
      const id = r.id || generateUUID();
      const now = new Date().toISOString();
      return {
        id,
        created_at: now,
        updated_at: now,
        ...r,
      };
    });
    this.saveTableData([...data, ...newRows]);
    this.isMutation = true;
    this.mutationResult = Array.isArray(rowOrRows) ? newRows : newRows[0];
    return this;
  }

  upsert(rowOrRows: any | any[], options?: { onConflict?: string }) {
    const data = this.getTableData();
    const rows = Array.isArray(rowOrRows) ? rowOrRows : [rowOrRows];
    const onConflictCol = options?.onConflict;
    const now = new Date().toISOString();

    const updatedData = [...data];
    const results: any[] = [];

    for (const r of rows) {
      let index = -1;

      if (onConflictCol && r[onConflictCol] !== undefined) {
        index = updatedData.findIndex(
          (item) => String(item[onConflictCol]) === String(r[onConflictCol]),
        );
      } else {
        if (r.id !== undefined) {
          index = updatedData.findIndex((item) => String(item.id) === String(r.id));
        }
        if (index === -1 && r.chave !== undefined) {
          index = updatedData.findIndex((item) => String(item.chave) === String(r.chave));
        }
      }

      if (index !== -1) {
        const existing = updatedData[index];
        const updatedItem = {
          ...existing,
          ...r,
          updated_at: now,
        };
        updatedData[index] = updatedItem;
        results.push(updatedItem);
      } else {
        const newItem = {
          id: r.id || generateUUID(),
          created_at: now,
          updated_at: now,
          ...r,
        };
        updatedData.push(newItem);
        results.push(newItem);
      }
    }

    this.saveTableData(updatedData);
    this.isMutation = true;
    this.mutationResult = Array.isArray(rowOrRows) ? results : results[0];
    return this;
  }

  update(updates: any) {
    const data = this.getTableData();
    let updatedCount = 0;
    const now = new Date().toISOString();

    const updatedData = data.map((item) => {
      let match = true;
      for (const f of this.filters) {
        if (!f(item)) {
          match = false;
          break;
        }
      }
      if (match) {
        updatedCount++;
        return {
          ...item,
          ...updates,
          updated_at: now,
        };
      }
      return item;
    });

    this.saveTableData(updatedData);
    const affected = updatedData.filter((item) => {
      let m = true;
      for (const f of this.filters) {
        if (!f(item)) {
          m = false;
          break;
        }
      }
      return m;
    });
    this.isMutation = true;
    this.mutationResult = affected;
    return this;
  }

  delete() {
    const data = this.getTableData();
    const beforeCount = data.length;
    const remaining = data.filter((item) => {
      let match = true;
      for (const f of this.filters) {
        if (!f(item)) {
          match = false;
          break;
        }
      }
      return !match;
    });

    this.saveTableData(remaining);
    this.isMutation = true;
    this.mutationResult = [];
    return this;
  }
}

// Emulated Supabase Client
export const supabase = {
  auth: {
    getSession: async () => {
      const isLoggedIn = localStorage.getItem("local_logged_in") === "true";
      if (!isLoggedIn) return { data: { session: null }, error: null };
      return {
        data: {
          session: {
            user: {
              id: "user-admin",
              email: "admin@vibraenergia.com.br",
              user_metadata: { nome: "Administrador do Escritório" },
            },
          },
        },
        error: null,
      };
    },
    getUser: async () => {
      const isLoggedIn = localStorage.getItem("local_logged_in") === "true";
      if (!isLoggedIn) return { data: { user: null }, error: null };
      return {
        data: {
          user: {
            id: "user-admin",
            email: "admin@vibraenergia.com.br",
            user_metadata: { nome: "Administrador do Escritório" },
          },
        },
        error: null,
      };
    },
    signInWithPassword: async ({ email }: { email: string }) => {
      localStorage.setItem("local_logged_in", "true");
      // Add email to profiles if not exists
      const key = `db_profiles`;
      const profiles = JSON.parse(localStorage.getItem(key) || "[]");
      if (!profiles.some((p: any) => p.email === email)) {
        profiles.push({
          id: generateUUID(),
          nome: email.split("@")[0],
          email: email,
          papel: "Administrador Global",
          created_at: new Date().toISOString(),
        });
        localStorage.setItem(key, JSON.stringify(profiles));
      }
      return {
        data: {
          user: {
            id: "user-admin",
            email: email,
            user_metadata: { nome: email.split("@")[0] },
          },
        },
        error: null,
      };
    },
    signUp: async ({ email, options }: any) => {
      localStorage.setItem("local_logged_in", "true");
      const key = `db_profiles`;
      const profiles = JSON.parse(localStorage.getItem(key) || "[]");
      profiles.push({
        id: generateUUID(),
        nome: options?.data?.nome || email.split("@")[0],
        email: email,
        papel: "Administrador Global",
        created_at: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(profiles));
      return {
        data: {
          session: {
            user: {
              id: "user-admin",
              email: email,
              user_metadata: { nome: options?.data?.nome },
            },
          },
        },
        error: null,
      };
    },
    signOut: async () => {
      localStorage.setItem("local_logged_in", "false");
      return { error: null };
    },
    resetPasswordForEmail: async () => {
      return { error: null };
    },
  },
  from: (table: string) => {
    return new LocalQueryBuilder(table);
  },
  channel: (name?: string, opts?: any) => {
    const chan: any = {
      on: (event: string, filter: any, callback?: any) => {
        return chan;
      },
      subscribe: (callback?: any) => {
        if (callback) {
          setTimeout(() => callback("SUBSCRIBED"), 0);
        }
        return {
          unsubscribe: () => {},
        };
      },
      presenceState: () => ({}),
      track: async () => {},
      untrack: async () => {},
    };
    return chan;
  },
  removeChannel: (channel: any) => {},
  storage: {
    from: () => ({
      upload: async () => ({ data: { path: "local-image.png" }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: "/favicon.ico" } }),
    }),
  },
  forceResetDatabase: async () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    console.log("[Local DB] Storage cleared and databases reset successfully!");
  },
};

export const db = null as any;
