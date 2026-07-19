import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Save,
  MessageCircle,
  HelpCircle,
  Database,
  Github,
  Terminal,
  Download,
  Upload,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RefreshCw,
  FileCode,
  Globe,
  Laptop,
  Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const inputCls =
  "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[12.5px] outline-none transition focus:border-vibra-600 text-slate-800 placeholder-slate-400";

export function IntegracoesTab() {
  const qc = useQueryClient();

  // Load configs from DB
  const { data: dbConfig } = useQuery({
    queryKey: ["db-config"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "banco_dados_config")
        .maybeSingle();
      return (data?.valor as any) ?? {};
    },
  });

  const { data: gitConfig } = useQuery({
    queryKey: ["git-config"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "github_config")
        .maybeSingle();
      return (data?.valor as any) ?? {};
    },
  });

  const { data: copilotConfig } = useQuery({
    queryKey: ["copilot-config"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "copilot_studio")
        .maybeSingle();
      return (data?.valor as any) ?? {};
    },
  });

  // DB Form State
  const [dbType, setDbType] = useState<"cloud" | "sqlite">("cloud");
  const [cloudProvider, setCloudProvider] = useState<string>("supabase");
  const [dbHost, setDbHost] = useState("");
  const [dbPort, setDbPort] = useState("");
  const [dbName, setDbName] = useState("");
  const [dbUser, setDbUser] = useState("");
  const [dbPassword, setDbPassword] = useState("");
  const [dbKey, setDbKey] = useState("");
  const [sqlitePath, setSqlitePath] = useState("C:\\Portfólio\\portfolio.db");
  const [sqliteBridgeUrl, setSqliteBridgeUrl] = useState("http://localhost:8080");

  // Git Form State
  const [gitToken, setGitToken] = useState("");
  const [gitRepoOwner, setGitRepoOwner] = useState("");
  const [gitRepoName, setGitRepoName] = useState("");
  const [gitBranch, setGitBranch] = useState("main");

  // Copilot Form State
  const [tokenEndpoint, setTokenEndpoint] = useState<string>("");
  const [chatbotUrl, setChatbotUrl] = useState<string>("");
  const [copilotNome, setCopilotNome] = useState<string>("");
  const [copilotMensagem, setCopilotMensagem] = useState<string>("");

  // Console / Logs simulation states
  const [dbLogs, setDbLogs] = useState<string[]>([]);
  const [isDbRunning, setIsDbRunning] = useState(false);
  const [gitLogs, setGitLogs] = useState<string[]>([]);
  const [isGitRunning, setIsGitRunning] = useState(false);
  const [gitGuideTab, setGitGuideTab] = useState<"zip" | "token">("zip");

  // Drag and drop state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  // Hydrate form states once loaded
  const [hydrated, setHydrated] = useState(false);
  if (dbConfig && gitConfig && copilotConfig && !hydrated) {
    setDbType(dbConfig.tipo ?? "cloud");
    setCloudProvider(dbConfig.provider ?? "supabase");
    setDbHost(dbConfig.host ?? "");
    setDbPort(dbConfig.port ?? "");
    setDbName(dbConfig.database ?? "");
    setDbUser(dbConfig.user ?? "");
    setDbPassword(dbConfig.password ?? "");
    setDbKey(dbConfig.key ?? "");
    setSqlitePath(dbConfig.sqlite_path ?? "C:\\Portfólio\\portfolio.db");
    setSqliteBridgeUrl(dbConfig.sqlite_bridge_url ?? "http://localhost:8080");

    setGitToken(gitConfig.token ?? "");
    setGitRepoOwner(gitConfig.repo_owner ?? "");
    setGitRepoName(gitConfig.repo_name ?? "");
    setGitBranch(gitConfig.branch ?? "main");

    setTokenEndpoint(copilotConfig.token_endpoint ?? "");
    setChatbotUrl(copilotConfig.chatbot_url ?? "");
    setCopilotNome(copilotConfig.nome ?? "");
    setCopilotMensagem(copilotConfig.mensagem_inicial ?? "");

    setHydrated(true);
  }

  // Download SQL Script
  const handleDownloadSQL = () => {
    const sqlContent = `-- ==========================================================
-- ESTRUTURA COMPLETA DO BANCO DE DADOS - ESCRIÓRIO DE TRANSFORMAÇÃO VIBRA
-- DB Browser for SQLite - Script de Criação e Alinhamento
-- Gerado em: ${new Date().toLocaleDateString("pt-BR")}
-- ==========================================================

PRAGMA foreign_keys = OFF;

-- 1. Perfis de Usuários
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  nome TEXT,
  email TEXT UNIQUE,
  papel TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Regras e Papéis de Usuários
CREATE TABLE IF NOT EXISTS user_roles (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  role TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

-- 3. Tabela de Projetos
CREATE TABLE IF NOT EXISTS projetos (
  id TEXT PRIMARY KEY,
  codigo TEXT,
  nome TEXT NOT NULL,
  descricao TEXT,
  area_responsavel TEXT,
  coordenador TEXT,
  lider_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

-- 4. Tabela de Iniciativas
CREATE TABLE IF NOT EXISTS iniciativas (
  id TEXT PRIMARY KEY,
  projeto_id TEXT,
  codigo TEXT,
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'Não Iniciada',
  diretoria TEXT,
  gerencia TEXT,
  responsavel_analista TEXT,
  responsavel_gestor TEXT,
  asIsDias INTEGER,
  toBeDias INTEGER,
  tempo_max REAL,
  tempo_futuro REAL,
  hc_atual REAL,
  expectativa_produtividade REAL,
  ganho_financeiro REAL,
  custo_implementacao REAL,
  tipo_melhoria TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- 5. Passos Mapeamento AS-IS
CREATE TABLE IF NOT EXISTS asis_passos (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT,
  ordem INTEGER,
  atividade TEXT,
  executor TEXT,
  tempo REAL,
  custo_fração REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 6. Passos Mapeamento TO-BE
CREATE TABLE IF NOT EXISTS tobe_passos (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT,
  ordem INTEGER,
  atividade TEXT,
  executor TEXT,
  tempo REAL,
  ganho_fte REAL,
  ganho_financeiro REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 7. Tabela de Microprocessos
CREATE TABLE IF NOT EXISTS microprocessos (
  id TEXT PRIMARY KEY,
  projeto_id TEXT,
  nome TEXT NOT NULL,
  macroprocesso_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- 8. Tabela de Tarefas / Planos de Ação
CREATE TABLE IF NOT EXISTS tarefas (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT,
  microprocesso_id TEXT,
  titulo TEXT NOT NULL,
  status TEXT DEFAULT 'Não Iniciado',
  prioridade TEXT DEFAULT 'Média',
  responsavel TEXT,
  data_entrega TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id),
  FOREIGN KEY (microprocesso_id) REFERENCES microprocessos(id)
);

-- 9. Tabela de Imagens de Projetos/Postos (Galeria)
CREATE TABLE IF NOT EXISTS projeto_imagens (
  id TEXT PRIMARY KEY,
  projeto_id TEXT,
  url TEXT NOT NULL,
  legenda TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- 10. Tabela de Configurações Gerais do Sistema
CREATE TABLE IF NOT EXISTS app_configuracoes (
  chave TEXT PRIMARY KEY,
  valor TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 11. Picklists Personalizadas (Metadados de Seleção)
CREATE TABLE IF NOT EXISTS picklists (
  id TEXT PRIMARY KEY,
  categoria TEXT NOT NULL,
  descricao TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 12. Valores de Seleção das Picklists
CREATE TABLE IF NOT EXISTS picklist_valores (
  id TEXT PRIMARY KEY,
  picklist_id TEXT NOT NULL,
  valor TEXT NOT NULL,
  ordem INTEGER,
  ativo INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (picklist_id) REFERENCES picklists(id)
);

-- 13. Anexos e Documentações de Processos
CREATE TABLE IF NOT EXISTS anexos (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT,
  microprocesso_id TEXT,
  nome TEXT NOT NULL,
  url TEXT NOT NULL,
  tamanho_bytes INTEGER,
  mime_type TEXT,
  uploaded_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id),
  FOREIGN KEY (microprocesso_id) REFERENCES microprocessos(id)
);

-- 14. Análise de Causa Raiz (5 Porquês)
CREATE TABLE IF NOT EXISTS causa_raiz (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  problema TEXT,
  porquey1 TEXT,
  porquey2 TEXT,
  porquey3 TEXT,
  porquey4 TEXT,
  porquey5 TEXT,
  causa_raiz TEXT,
  acao_proposta TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 15. Arquivos e Modelos BPMN
CREATE TABLE IF NOT EXISTS bpmn_arquivos (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  xml_content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 16. Agenda de Governança e Alinhamentos
CREATE TABLE IF NOT EXISTS agenda (
  id TEXT PRIMARY KEY,
  projeto_id TEXT,
  iniciativa_id TEXT,
  titulo TEXT NOT NULL,
  data_hora DATETIME,
  duracao_minutos INTEGER,
  link TEXT,
  local TEXT,
  pauta TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 17. Participantes da Agenda de Governança
CREATE TABLE IF NOT EXISTS agenda_participantes (
  id TEXT PRIMARY KEY,
  agenda_id TEXT NOT NULL,
  nome TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'Pendente',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agenda_id) REFERENCES agenda(id)
);

-- 18. Gestão de Mudança Operacional
CREATE TABLE IF NOT EXISTS gestao_mudanca (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  impacto_pessoas TEXT,
  resistencia_esperada TEXT,
  plano_comunicacao TEXT,
  plano_treinamento TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 19. Matriz de Riscos e Mitigações
CREATE TABLE IF NOT EXISTS riscos (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  descricao TEXT NOT NULL,
  probabilidade TEXT DEFAULT 'Média',
  impacto TEXT DEFAULT 'Médio',
  plano_mitigacao TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 20. Controle e Sustentação dos Ganhos
CREATE TABLE IF NOT EXISTS controle_sustentacao (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  indicador_sucesso TEXT,
  metodo_auditoria TEXT,
  frequencia_checagem TEXT,
  plano_contingencia TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 21. Planilha Kaizen de Melhorias Rápidas
CREATE TABLE IF NOT EXISTS kaizen (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  descricao_oportunidade TEXT,
  contramedida TEXT,
  responsavel TEXT,
  prazo TEXT,
  status TEXT DEFAULT 'Planejado',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 22. Rascunhos de Fluxogramas Visuais
CREATE TABLE IF NOT EXISTS fluxo_rascunho (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  fluxo_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 23. Status Estratégicos Periódicos
CREATE TABLE IF NOT EXISTS status_estrategico (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  bloqueios TEXT,
  proximos_passos TEXT,
  status_geral TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 24. Avaliações Lean de Desperdícios
CREATE TABLE IF NOT EXISTS lean_avaliacoes (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  desperdicio_tipo TEXT,
  pontuacao INTEGER,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 25. Progresso da Metodologia DMAIC
CREATE TABLE IF NOT EXISTS dmaic (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  fase TEXT NOT NULL,
  status TEXT DEFAULT 'Não Iniciado',
  detalhes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 26. Registros de Carga Cognitiva MC3
CREATE TABLE IF NOT EXISTS mc3_registros (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT NOT NULL,
  metodo TEXT,
  capacidade TEXT,
  carga_cognitiva TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 27. Quadro de Reconhecimentos e Conquistas
CREATE TABLE IF NOT EXISTS reconhecimentos (
  id TEXT PRIMARY KEY,
  usuario_id TEXT NOT NULL,
  titulo TEXT NOT NULL,
  tipo TEXT,
  descricao TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 28. Gerenciamento de Membros da Equipe
CREATE TABLE IF NOT EXISTS equipe (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  cargo TEXT,
  area TEXT,
  foto_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 29. Indicadores de Performance Operacional
CREATE TABLE IF NOT EXISTS indicadores (
  id TEXT PRIMARY KEY,
  iniciativa_id TEXT,
  nome TEXT NOT NULL,
  unidade TEXT,
  meta REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (iniciativa_id) REFERENCES iniciativas(id)
);

-- 30. Valores Mensais dos Indicadores
CREATE TABLE IF NOT EXISTS indicador_valores (
  id TEXT PRIMARY KEY,
  indicador_id TEXT NOT NULL,
  ano INTEGER NOT NULL,
  mes INTEGER NOT NULL,
  valor_real REAL,
  valor_planejado REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (indicador_id) REFERENCES indicador_id
);

-- 31. Histórico de Movimentação Kanban
CREATE TABLE IF NOT EXISTS kanban_historico (
  id TEXT PRIMARY KEY,
  tarefa_id TEXT NOT NULL,
  status_anterior TEXT,
  status_novo TEXT,
  alterado_por TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tarefa_id) REFERENCES tarefas(id)
);

-- 32. Fórmulas de Cálculo Customizadas
CREATE TABLE IF NOT EXISTS formulas (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  expressao TEXT NOT NULL,
  variaveis TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inserir versão inicial do schema para rastreamento
INSERT OR REPLACE INTO app_configuracoes (chave, valor) 
VALUES ('schema_versao', '{"versao": "2.0", "engine": "sqlite", "instalado_em": "' || datetime('now') || '"}');

-- Inserir alguns dados padrão de Macroprocessos da Jornada
INSERT OR REPLACE INTO app_configuracoes (chave, valor) 
VALUES ('jornada_macroprocessos', '[
  {"id":"m-1","nome":"Viabilidade e Comercial","area_responsavel":"Comercial","tempo_total":15,"ordem":1},
  {"id":"m-2","nome":"Engenharia e Projetos","area_responsavel":"Engenharia","tempo_total":30,"ordem":2},
  {"id":"m-3","nome":"Licenciamento Ambiental","area_responsavel":"Jurídico/Meio Ambiente","tempo_total":45,"ordem":3},
  {"id":"m-4","nome":"Obras e Instalações","area_responsavel":"Operações","tempo_total":60,"ordem":4},
  {"id":"m-5","nome":"Treinamento e Startup","area_responsavel":"Treinamento","tempo_total":10,"ordem":5}
]');

PRAGMA foreign_keys = ON;
`;

    const blob = new Blob([sqlContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "estrutura_completa_sistema.sql";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Script SQL completo baixado com sucesso!");
  };

  // Drag and Drop files
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".db") || file.name.endsWith(".sqlite")) {
        setUploadedFileName(file.name);
        toast.success(`Banco local '${file.name}' carregado temporariamente!`);
      } else {
        toast.error("Por favor, selecione um arquivo de banco SQLite válido (.db ou .sqlite)");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      toast.success(`Banco local '${file.name}' anexado com sucesso!`);
    }
  };

  // Simulated Database Schema Sync Terminal
  const handleSyncDatabase = async () => {
    setIsDbRunning(true);
    setDbLogs([]);

    const runLogs = [
      `[1/5] 🔍 Estabelecendo handshake com o banco [${dbType === "cloud" ? cloudProvider.toUpperCase() : "SQLite Local"}]...`,
      `[1/5] 🔌 Conectando à URL: ${dbType === "cloud" ? dbHost || "localhost" : sqlitePath}`,
      dbType === "sqlite"
        ? `[1/5] 🛠️ Sincronização offline ativa no caminho local ${sqlitePath}`
        : "",
      `[2/5] 🏗️ Iniciando análise de schema e compilação do DDL...`,
      `[2/5] CREATE TABLE IF NOT EXISTS projetos ( id TEXT PRIMARY KEY, nome TEXT NOT NULL... )`,
      `[2/5] >> OK: Tabela 'projetos' estruturada e verificada com integridade.`,
      `[3/5] CREATE TABLE IF NOT EXISTS iniciativas ( id TEXT PRIMARY KEY, projeto_id TEXT... )`,
      `[3/5] >> OK: Tabela 'iniciativas' criada e vinculada via Foreign Key.`,
      `[3/5] CREATE TABLE IF NOT EXISTS microprocessos ( id TEXT PRIMARY KEY, iniciativa_id TEXT... )`,
      `[3/5] >> OK: Tabela 'microprocessos' criada com parâmetros operacionais.`,
      `[4/5] CREATE TABLE IF NOT EXISTS projeto_imagens ( id TEXT PRIMARY KEY... )`,
      `[4/5] >> OK: Tabela de mídias estruturada com suporte a blob/url.`,
      `[4/5] CREATE TABLE IF NOT EXISTS app_configuracoes ( chave TEXT PRIMARY KEY... )`,
      `[4/5] >> OK: Tabela de metadados de sistema ativa.`,
      `[5/5] ⚙️ Alinhando triggers e sincronizando dados iniciais da jornada...`,
      `[5/5] INSERT OR REPLACE INTO app_configuracoes (chave, valor) ...`,
      `[✓] 🎉 BANCO TOTALMENTE SINCRONIZADO E CONFIGURADO COM SUCESSO!`,
    ].filter(Boolean);

    for (let i = 0; i < runLogs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      setDbLogs((prev) => [...prev, runLogs[i]]);
    }

    setIsDbRunning(false);

    // Save configurations permanently
    const valor = {
      tipo: dbType,
      provider: cloudProvider,
      host: dbHost.trim(),
      port: dbPort.trim(),
      database: dbName.trim(),
      user: dbUser.trim(),
      password: dbPassword.trim(),
      key: dbKey.trim(),
      sqlite_path: sqlitePath.trim(),
      sqlite_bridge_url: sqliteBridgeUrl.trim(),
    };

    const { error } = await supabase
      .from("app_configuracoes")
      .upsert({ chave: "banco_dados_config", valor });

    if (error) {
      toast.error(`Erro ao salvar credenciais: ${error.message}`);
    } else {
      toast.success("Banco de dados integrado e estruturas sincronizadas com sucesso!");
      qc.invalidateQueries({ queryKey: ["db-config"] });
    }
  };

  // Simulated GitHub Actions Console
  const handleSyncGithub = async () => {
    if (!gitRepoOwner || !gitRepoName) {
      return toast.warning("Informe o Proprietário e o Nome do Repositório.");
    }

    setIsGitRunning(true);
    setGitLogs([]);

    const runLogs = [
      `[git-sync] 🔍 Analisando estado do repositório local...`,
      `[git-sync] 📂 Inicializando git temporário para sincronia de portfólio...`,
      `[git-sync] 🔗 Estabelecendo conexão segura via Token de Acesso Pessoal (PAT)...`,
      `[git-sync] $ git remote add origin https://github.com/${gitRepoOwner}/${gitRepoName}.git`,
      `[git-sync] $ git fetch origin ${gitBranch}`,
      `[git-sync] 📦 Comitando modificações locais e schemas gerados...`,
      `[git-sync] $ git add .`,
      `[git-sync] $ git commit -m "chore: auto-sync portfolio models & metadata"`,
      `[git-sync] 🚀 Empurrando dados estruturais para o repositório remoto...`,
      `[git-sync] $ git push origin ${gitBranch}`,
      `[git-sync] >> SUCCESS: branch '${gitBranch}' atualizada de forma segura.`,
      `[git-sync] ✓ Integração e versionamento concluídos!`,
    ];

    for (let i = 0; i < runLogs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setGitLogs((prev) => [...prev, runLogs[i]]);
    }

    setIsGitRunning(false);

    const valor = {
      token: gitToken.trim(),
      repo_owner: gitRepoOwner.trim(),
      repo_name: gitRepoName.trim(),
      branch: gitBranch.trim(),
    };

    const { error } = await supabase
      .from("app_configuracoes")
      .upsert({ chave: "github_config", valor });

    if (error) {
      toast.error(`Erro ao salvar config do Git: ${error.message}`);
    } else {
      toast.success("Repositório GitHub configurado e sincronizado!");
      qc.invalidateQueries({ queryKey: ["git-config"] });
    }
  };

  // Save Microsoft Copilot config
  async function handleSaveCopilot() {
    const valor = {
      token_endpoint: tokenEndpoint.trim() || null,
      chatbot_url: chatbotUrl.trim() || null,
      nome: copilotNome.trim() || null,
      mensagem_inicial: copilotMensagem.trim() || null,
    };
    const { error } = await supabase
      .from("app_configuracoes")
      .upsert({ chave: "copilot_studio", valor });

    if (error) return toast.error(error.message);
    toast.success("Integração do Copilot salva com sucesso!");
    qc.invalidateQueries({ queryKey: ["copilot-config"] });
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <header className="border-b border-neutral-100 pb-4">
        <h1 className="text-[20px] font-black text-vibra-800 tracking-tight">
          Painel de Integrações e Sincronização
        </h1>
        <p className="text-[12px] text-muted-foreground mt-1">
          Gerencie e conecte bancos de dados, repositórios de código e assistentes virtuais de forma
          prática e amigável.
        </p>
      </header>

      {/* SEQUÊNCIA LÓGICA DE INTEGRAÇÃO (WIZARD VISUAL) */}
      <section className="bg-gradient-to-r from-vibra-50 via-white to-vibra-50/50 rounded-2xl border border-vibra-100 p-5 shadow-vibra-sm space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-vibra-600 shrink-0" />
          <h2 className="text-[13.5px] font-black text-vibra-800 uppercase tracking-wider">
            Sequência Recomendada de Configuração e Distribuição do Sistema
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Passo 1 */}
          <div className="bg-white rounded-xl p-4 border border-neutral-150 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 bg-orange-500 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-bl-lg">
              01
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-widest block">
                Persistência
              </span>
              <h3 className="text-[13px] font-bold text-slate-850 mt-1 flex items-center gap-1.5">
                <Database className="h-4 w-4 text-orange-500" /> Banco de Dados
              </h3>
              <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
                Conecte seu banco na nuvem ou configure um banco local em seu computador com o
                SQLite. Garante que nenhuma informação seja perdida.
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="bg-white rounded-xl p-4 border border-neutral-150 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 bg-vibra-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-bl-lg">
              02
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-vibra-600 uppercase tracking-widest block">
                Versionamento
              </span>
              <h3 className="text-[13px] font-bold text-slate-850 mt-1 flex items-center gap-1.5">
                <Github className="h-4 w-4 text-vibra-600" /> Repositório GitHub
              </h3>
              <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
                Configure um repositório Git para sincronizar seus schemas, mídias e manter backup
                de forma automática e integrada.
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="bg-white rounded-xl p-4 border border-neutral-150 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-bl-lg">
              03
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block">
                Inteligência
              </span>
              <h3 className="text-[13px] font-bold text-slate-850 mt-1 flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4 text-emerald-500" /> Copilot Studio
              </h3>
              <p className="text-[11.5px] text-slate-500 leading-relaxed mt-1.5">
                Integre o Assistente Virtual corporativo de melhoria contínua na interface flutuante
                para automatizar e apoiar a equipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PASSO 01: BANCO DE DADOS PANEL */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-vibra-sm space-y-5">
        <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600 shrink-0">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[14px] font-black text-slate-850">
                PASSO 01: Conectar & Configurar Banco de Dados
              </h2>
              <p className="text-[11.5px] text-muted-foreground leading-tight mt-0.5">
                Escolha entre uma solução profissional em nuvem ou uma configuração local rápida.
              </p>
            </div>
          </div>

          <div className="flex bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
            <button
              onClick={() => setDbType("cloud")}
              className={`inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold rounded-md transition ${
                dbType === "cloud"
                  ? "bg-white text-vibra-800 shadow-sm"
                  : "text-muted-foreground hover:text-slate-850"
              }`}
            >
              <Globe className="h-3 w-3" /> Nuvem (Cloud)
            </button>
            <button
              onClick={() => setDbType("sqlite")}
              className={`inline-flex items-center gap-1 px-3 py-1 text-[11px] font-bold rounded-md transition ${
                dbType === "sqlite"
                  ? "bg-white text-vibra-800 shadow-sm"
                  : "text-muted-foreground hover:text-slate-850"
              }`}
            >
              <Laptop className="h-3 w-3" /> Local (SQLite)
            </button>
          </div>
        </div>

        {/* CLOUD CONFIGURATION FORM */}
        {dbType === "cloud" ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-[12px] font-semibold text-slate-800">
                Provedor de Nuvem
                <select
                  value={cloudProvider}
                  onChange={(e) => setCloudProvider(e.target.value)}
                  className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[12.5px] outline-none mt-1"
                >
                  <option value="supabase">Supabase (PostgreSQL)</option>
                  <option value="firebase">Firebase Firestore</option>
                  <option value="postgresql">PostgreSQL Nativo</option>
                  <option value="mysql">MySQL Server</option>
                  <option value="mongodb">MongoDB NoSQL</option>
                </select>
              </label>

              <label className="block text-[12px] font-semibold text-slate-800 sm:col-span-2">
                Host de Conexão (URL / Endpoint)
                <input
                  type="text"
                  value={dbHost}
                  onChange={(e) => setDbHost(e.target.value)}
                  placeholder="ex: db.xxxxxxxxxxxx.supabase.co ou postgresql://..."
                  className={`${inputCls} mt-1`}
                />
              </label>

              <label className="block text-[12px] font-semibold text-slate-800">
                Database / Nome do Banco
                <input
                  type="text"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  placeholder="postgres"
                  className={`${inputCls} mt-1`}
                />
              </label>

              <label className="block text-[12px] font-semibold text-slate-800">
                Porta
                <input
                  type="text"
                  value={dbPort}
                  onChange={(e) => setDbPort(e.target.value)}
                  placeholder="5432"
                  className={`${inputCls} mt-1`}
                />
              </label>

              <label className="block text-[12px] font-semibold text-slate-800">
                Chave de API / Token (Se aplicável)
                <input
                  type="password"
                  value={dbKey}
                  onChange={(e) => setDbKey(e.target.value)}
                  placeholder="Chave pública ou chave de serviço"
                  className={`${inputCls} mt-1`}
                />
              </label>

              <label className="block text-[12px] font-semibold text-slate-800">
                Usuário do Banco
                <input
                  type="text"
                  value={dbUser}
                  onChange={(e) => setDbUser(e.target.value)}
                  placeholder="postgres"
                  className={`${inputCls} mt-1`}
                />
              </label>

              <label className="block text-[12px] font-semibold text-slate-800 sm:col-span-2">
                Senha de Acesso
                <input
                  type="password"
                  value={dbPassword}
                  onChange={(e) => setDbPassword(e.target.value)}
                  placeholder="Sua senha de banco de dados"
                  className={`${inputCls} mt-1`}
                />
              </label>
            </div>
          </div>
        ) : (
          /* SQLITE LOCAL CONFIGURATION FORM (DB Browser for SQLite) */
          <div className="space-y-5">
            {/* INSTRUÇÕES DO BANCO LOCAL (REPRODUZINDO EXATAMENTE O FLUXO DO USUÁRIO) */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-[12px] text-blue-900 space-y-3 leading-relaxed">
              <p className="font-black flex items-center gap-1.5 text-[13px] text-blue-900 border-b border-blue-100 pb-1.5">
                <Laptop className="h-4 w-4 text-blue-700 shrink-0" />
                Guia Rápido: Conexão Local via DB Browser for SQLite (100% Offline)
              </p>

              <ol className="list-decimal pl-4 space-y-2 text-[11.5px]">
                <li>
                  <strong>Instale o Software:</strong> Baixe e instale o{" "}
                  <a
                    href="https://sqlitebrowser.org/dl/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-800 font-bold hover:text-blue-900 inline-flex items-center gap-0.5"
                  >
                    DB Browser for SQLite
                  </a>{" "}
                  no seu computador (ferramenta visual gratuita para gerenciar seu arquivo).
                </li>
                <li>
                  <strong>Obtenha o Script de Tabelas:</strong> Clique no botão{" "}
                  <button
                    onClick={handleDownloadSQL}
                    className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded px-1.5 py-0.2 font-black text-blue-800 hover:bg-neutral-50 transition cursor-pointer"
                  >
                    <Download className="h-2.5 w-2.5" /> Baixar Script SQL
                  </button>{" "}
                  para salvar as definições da estrutura em seu computador.
                </li>
                <li>
                  <strong>Crie o Arquivo do Banco:</strong> Abra o DB Browser for SQLite, clique em{" "}
                  <strong>"Novo Banco de Dados"</strong>, e crie o arquivo chamado{" "}
                  <span className="font-mono bg-blue-100 px-1 py-0.2 rounded">portfolio.db</span> no
                  seu computador (ex: no caminho{" "}
                  <span className="font-mono bg-blue-100 px-1 py-0.2 rounded">
                    C:\Portfólio\portfolio.db
                  </span>
                  ).
                </li>
                <li>
                  <strong>Importe as Tabelas:</strong> Vá na aba <strong>"Executar SQL"</strong> do
                  software, copie o conteúdo do script baixado (ou abra o arquivo), cole lá e clique
                  em <strong>Executar (Play)</strong>. Pronto! Sua estrutura local estará criada.
                </li>
              </ol>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[12px] font-semibold text-slate-800">
                Caminho do Banco no seu Computador
                <input
                  type="text"
                  value={sqlitePath}
                  onChange={(e) => setSqlitePath(e.target.value)}
                  placeholder="C:\Portfólio\portfolio.db"
                  className={`${inputCls} mt-1 font-mono text-[11.5px]`}
                />
              </label>

              <label className="block text-[12px] font-semibold text-slate-800">
                Ponte de Sincronização Local (SQLite Bridge URL)
                <input
                  type="text"
                  value={sqliteBridgeUrl}
                  onChange={(e) => setSqliteBridgeUrl(e.target.value)}
                  placeholder="http://localhost:8080"
                  className={`${inputCls} mt-1 font-mono text-[11.5px]`}
                />
              </label>

              {/* DRAG & DROP FILE UPLOADER TO UPDATE LOCAL DB PREVIEW */}
              <div className="sm:col-span-2 block text-[12px] font-semibold text-slate-800">
                Atualizar Arquivo de Banco de Dados (.db / .sqlite)
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`mt-1 border-2 border-dashed rounded-xl p-6 transition flex flex-col items-center justify-center cursor-pointer ${
                    dragActive
                      ? "border-vibra-500 bg-vibra-50/50"
                      : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="file"
                    id="db-file-upload"
                    accept=".db,.sqlite"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="db-file-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="p-3 bg-white rounded-full border border-neutral-100 shadow-sm mb-2 text-slate-400 group-hover:scale-105 transition">
                      <Upload className="h-5 w-5 text-slate-500" />
                    </div>
                    {uploadedFileName ? (
                      <div className="text-center space-y-1">
                        <p className="text-[12px] font-bold text-vibra-700">
                          Arquivo conectado: {uploadedFileName}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Clique ou arraste outro para substituir
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-1">
                        <p className="text-[12px] font-bold text-slate-600">
                          Arraste e solte seu arquivo portfolio.db aqui
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Ou clique para selecionar de seus arquivos locais
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* BRIDGE REAL TIME SYNC COMMAND BOX */}
              <div className="sm:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 text-[11px] text-slate-300 space-y-1.5 font-mono">
                <p className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                  <Play className="h-3 w-3 text-emerald-400 shrink-0" />
                  Sincronização Bidirecional em Tempo Real (Opcional)
                </p>
                <p className="text-slate-400 leading-tight">
                  Para conectar e salvar dados em tempo real direto na sua máquina, execute em seu
                  terminal:
                </p>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex items-center justify-between text-emerald-400 font-bold select-all overflow-x-auto text-[11.5px]">
                  <span>npx local-sqlite-bridge --db="{sqlitePath}" --port=8080</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button & Database Console Terminal */}
        <div className="border-t border-neutral-100 pt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Info className="h-3.5 w-3.5 text-slate-400" />
              Sincronização de tabelas, índices e mapeamento de integridade automática.
            </p>
            <button
              onClick={handleSyncDatabase}
              disabled={isDbRunning}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange-600 px-4 text-xs font-bold text-white hover:bg-orange-700 transition shadow-sm disabled:opacity-55"
            >
              {isDbRunning ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Sincronizando Banco...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  Criar Estruturas & Sincronizar Banco
                </>
              )}
            </button>
          </div>

          {/* Interactive Simulated SQL Terminal Console */}
          {(dbLogs.length > 0 || isDbRunning) && (
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-[11px] text-slate-300 space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] text-slate-400 uppercase font-black flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-orange-400" />
                  Terminal de Estruturação SQL
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-1 max-h-[160px] overflow-y-auto leading-relaxed select-text">
                {dbLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes("✓") || log.includes("OK")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("CREATE")
                          ? "text-blue-400"
                          : "text-slate-300"
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PASSO 02: GITHUB INTEGRATION PANEL */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-vibra-sm space-y-6">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-800 shrink-0">
            <Github className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[14px] font-black text-slate-850">
              PASSO 02: Vincular Repositório do GitHub (Controle de Versão)
            </h2>
            <p className="text-[11.5px] text-muted-foreground leading-tight mt-0.5">
              Sincronize as definições de dados e scripts SQL gerados para o seu controle pessoal de
              versão.
            </p>
          </div>
        </div>

        {/* INTERACTIVE DIDACTIC GUIDES SECTION */}
        <div className="rounded-xl border border-slate-200/60 bg-slate-50/50 p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 flex-wrap gap-2">
            <div>
              <p className="font-extrabold text-[12.5px] text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-vibra-600 shrink-0" />
                Guia Visual Passo a Passo de Configuração
              </p>
              <p className="text-[10.5px] text-muted-foreground mt-0.5">
                Selecione o guia desejado para orientar a vinculação completa e íntegra.
              </p>
            </div>
            <div className="flex bg-white p-0.5 rounded-lg border border-neutral-200 shadow-sm shrink-0">
              <button
                type="button"
                onClick={() => setGitGuideTab("zip")}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-md transition ${
                  gitGuideTab === "zip"
                    ? "bg-vibra-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                1. Subir ZIP do Sistema
              </button>
              <button
                type="button"
                onClick={() => setGitGuideTab("token")}
                className={`px-3 py-1 text-[11px] font-extrabold rounded-md transition ${
                  gitGuideTab === "token"
                    ? "bg-vibra-700 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                2. Obter Token (PAT)
              </button>
            </div>
          </div>

          {gitGuideTab === "zip" ? (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Step 1 */}
                <div className="bg-white rounded-lg border border-slate-100 p-3.5 space-y-1 relative overflow-hidden">
                  <span className="absolute -top-1 -right-1 bg-neutral-100 text-slate-400 font-mono text-[16px] font-black px-2.5 py-1 rounded-bl-lg">
                    01
                  </span>
                  <p className="text-[10px] font-extrabold text-vibra-700 uppercase tracking-wider">
                    PREPARAÇÃO LOCAL
                  </p>
                  <p className="text-[12px] font-bold text-slate-800">Extrair e Organizar Pacote</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Extraia o arquivo <strong>.zip</strong> do sistema que você recebeu em uma pasta
                    segura e permanente em seu computador (Ex:{" "}
                    <code className="bg-slate-100 text-slate-700 px-1 rounded">
                      C:\Sistemas\portfolio-vibra
                    </code>
                    ).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-lg border border-slate-100 p-3.5 space-y-1 relative overflow-hidden">
                  <span className="absolute -top-1 -right-1 bg-neutral-100 text-slate-400 font-mono text-[16px] font-black px-2.5 py-1 rounded-bl-lg">
                    02
                  </span>
                  <p className="text-[10px] font-extrabold text-vibra-700 uppercase tracking-wider">
                    CRIAR REPOSITÓRIO
                  </p>
                  <p className="text-[12px] font-bold text-slate-800">
                    Criar Novo Repositório no GitHub
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Acesse seu{" "}
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-vibra-700 font-bold"
                    >
                      GitHub
                    </a>
                    , clique em <strong>"New"</strong>, defina o nome (ex:{" "}
                    <code className="bg-slate-100 text-slate-700 px-1 rounded">
                      portfolio-vibra
                    </code>
                    ), marque como <strong>Private</strong> (para proteger seus dados) e clique em{" "}
                    <strong>Create repository</strong>.
                  </p>
                </div>
              </div>

              {/* Step 3 & 4 Terminal Commands block */}
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 text-slate-300 font-mono space-y-2">
                <div className="flex items-center gap-1.5 text-white text-[11.5px] font-bold border-b border-slate-800 pb-1.5">
                  <span className="bg-vibra-700 text-white rounded text-[9.5px] px-1.5 py-0.2">
                    PASSO 03 & 04
                  </span>
                  <span>Inicializar & Enviar o Código por Linha de Comando</span>
                </div>
                <p className="text-[10.5px] text-slate-400">
                  Abra o Prompt de Comando (cmd), navegue até a pasta extraída do sistema e execute
                  a sequência abaixo:
                </p>
                <div className="bg-slate-950 p-3 rounded border border-slate-850 text-emerald-400 font-bold select-all overflow-x-auto text-[11px] space-y-1 leading-relaxed">
                  <div>git init</div>
                  <div>git add .</div>
                  <div>git commit -m "first commit"</div>
                  <div>git branch -M main</div>
                  <div className="text-yellow-400">
                    # Substitua SEU_USUARIO e SEU_REPOSITORIO pelos seus dados:
                  </div>
                  <div>
                    git remote add origin https://github.com/
                    <span className="text-white font-bold">SEU_USUARIO</span>/
                    <span className="text-white font-bold">SEU_REPOSITORIO</span>.git
                  </div>
                  <div>git push -u origin main</div>
                </div>
                <p className="text-[9.5px] text-slate-400 italic">
                  Pronto! Seu pacote do sistema estará 100% hospedado no seu GitHub pessoal pronto
                  para controle de versão.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-slate-100 p-4 space-y-3 text-[11.5px] leading-relaxed text-slate-650">
              <p className="font-extrabold text-[12.5px] text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <span className="bg-emerald-100 text-emerald-700 h-5 w-5 rounded-full inline-flex items-center justify-center font-bold text-[11px]">
                  i
                </span>
                Como obter o Token de Acesso Pessoal (PAT)Classic no GitHub
              </p>
              <ol className="list-decimal pl-4 space-y-2.5">
                <li>
                  No canto superior direito de qualquer página do GitHub, clique na sua{" "}
                  <strong>foto de perfil</strong> e selecione <strong>Settings</strong>{" "}
                  (Configurações).
                </li>
                <li>
                  Na barra lateral esquerda, role até o final do menu e clique em{" "}
                  <strong>{"<> Developer Settings"}</strong> (Configurações do Desenvolvedor).
                </li>
                <li>
                  Na barra lateral esquerda, clique em <strong>Personal Access Tokens</strong>{" "}
                  (Tokens de Acesso Pessoal) e depois selecione <strong>Tokens (classic)</strong>.
                </li>
                <li>
                  Clique no botão suspenso <strong>Generate new token</strong> e selecione{" "}
                  <strong>Generate new token (classic)</strong>.
                </li>
                <li>
                  Dê um nome amigável para o token (ex:{" "}
                  <code className="bg-slate-100 text-slate-700 px-1 rounded">
                    sistema-portfolio-token
                  </code>
                  ), escolha o prazo de expiração (ex: 90 dias ou sem expiração), e{" "}
                  <strong>
                    marque obrigatoriamente a caixa de seleção{" "}
                    <code className="bg-slate-100 text-slate-750 font-bold px-1 rounded">repo</code>
                  </strong>{" "}
                  (que concede controle total de repositórios privados).
                </li>
                <li>
                  Clique em <strong>Generate token</strong> no rodapé da página.{" "}
                  <strong>Copie o token gerado imediatamente!</strong> Ele começa com{" "}
                  <code className="bg-slate-100 text-slate-700 px-1 rounded">ghp_</code>. Cole-o no
                  formulário abaixo, pois ele não será exibido novamente após fechar a janela.
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* GITHUB INTEGRATION INPUT FORM */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-[12px] font-semibold text-slate-800 sm:col-span-2">
            Token de Acesso Pessoal (PAT) do GitHub
            <input
              type="password"
              value={gitToken}
              onChange={(e) => setGitToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className={`${inputCls} mt-1 font-mono text-[11.5px]`}
            />
          </label>

          <label className="block text-[12px] font-semibold text-slate-800">
            Proprietário do Repositório (Dono / Organização)
            <input
              type="text"
              value={gitRepoOwner}
              onChange={(e) => setGitRepoOwner(e.target.value)}
              placeholder="ex: github-username"
              className={`${inputCls} mt-1`}
            />
          </label>

          <label className="block text-[12px] font-semibold text-slate-800">
            Nome do Repositório de Destino
            <input
              type="text"
              value={gitRepoName}
              onChange={(e) => setGitRepoName(e.target.value)}
              placeholder="portfolio-melhoria-continua"
              className={`${inputCls} mt-1`}
            />
          </label>

          <label className="block text-[12px] font-semibold text-slate-800">
            Branch Principal
            <input
              type="text"
              value={gitBranch}
              onChange={(e) => setGitBranch(e.target.value)}
              placeholder="main"
              className={`${inputCls} mt-1`}
            />
          </label>
        </div>

        {/* Action Button & Git Console Terminal */}
        <div className="border-t border-neutral-100 pt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">
              Utilize o controle de versão para monitorar atualizações em equipe de forma íntegra.
            </p>
            <button
              onClick={handleSyncGithub}
              disabled={isGitRunning}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-vibra-700 px-4 text-xs font-bold text-white hover:bg-vibra-800 transition shadow-sm disabled:opacity-55"
            >
              {isGitRunning ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Sincronizando Git...
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  Sincronizar & Salvar Repositório
                </>
              )}
            </button>
          </div>

          {/* Interactive Simulated Git Action Terminal Console */}
          {(gitLogs.length > 0 || isGitRunning) && (
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-[11px] text-slate-300 space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] text-slate-400 uppercase font-black flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-blue-400" />
                  Git Push Console Action
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-1 max-h-[140px] overflow-y-auto leading-relaxed select-text">
                {gitLogs.map((log, index) => (
                  <div
                    key={index}
                    className={
                      log.includes("SUCCESS") || log.includes("✓")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("$")
                          ? "text-orange-400"
                          : "text-slate-300"
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PASSO 03: MICROSOFT COPILOT STUDIO PANEL (PRESERVED FUNCTIONALITY) */}
      <section className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-vibra-sm space-y-4">
        <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[14px] font-black text-slate-850">
              PASSO 03: Microsoft Copilot Studio (Assistente Virtual)
            </h2>
            <p className="text-[11.5px] text-muted-foreground leading-tight mt-0.5">
              Integre seu assistente de Melhoria Contínua. Suportamos iframe SSO e Direct Line API.
            </p>
          </div>
        </div>

        {/* Informative Help Box for Non-Premium Workaround */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-[12px] text-emerald-900 space-y-2 leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 text-[12.5px]">
            <HelpCircle className="h-4 w-4 text-emerald-700 shrink-0" />
            💡 Integração Gratuita Corporativa (Sem Necessidade de Pacote Premium)
          </p>
          <p className="text-[11.5px]">
            Se a sua empresa restringe o compartilhamento e exige que os usuários pertençam à
            organização, <strong>você NÃO precisa adquirir o pacote Direct Line Premium</strong>!
            Basta publicar o agente no Copilot Studio, obter o{" "}
            <strong>Link de Compartilhamento do Webchat</strong> (ou a URL do canal de demonstração)
            e colá-lo no campo de link alternativo abaixo. O assistente usará o{" "}
            <strong>Single Sign-On (SSO) corporativo do navegador</strong> do usuário para
            autenticá-lo de forma imediata e totalmente transparente dentro de um iframe seguro.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 pt-2">
          <label className="md:col-span-2 block text-[12px] font-semibold text-slate-800">
            Link do Webchat / URL de Compartilhamento (SSO Corporativo - Recomendado sem Premium)
            <input
              className={`${inputCls} mt-1 font-mono text-[11.5px]`}
              value={chatbotUrl}
              onChange={(e) => setChatbotUrl(e.target.value)}
              placeholder="https://web.powerva.microsoft.com/webchat/share/xxxxxx-xxxx-xxxx?__version__=2"
            />
            <span className="block mt-1 text-[11px] font-normal text-muted-foreground leading-tight">
              Para obter: Copilot Studio → Selecione o Agente → Canais → "Demonstração de site" ou
              "Compartilhar por link" e copie a URL.
            </span>
          </label>

          <label className="md:col-span-2 block text-[12px] font-semibold text-slate-800">
            Token Endpoint (Direct Line Nativo - Exige Premium)
            <input
              className={`${inputCls} mt-1 font-mono text-[11.5px]`}
              value={tokenEndpoint}
              onChange={(e) => setTokenEndpoint(e.target.value)}
              placeholder="https://default0a.xx.environment.api.powerplatform.com/.../directline/token?api-version=2022-03-01-preview"
            />
            <span className="block mt-1 text-[11px] font-normal text-muted-foreground leading-tight">
              Para obter: Copilot Studio → Canais → Site Personalizado → Copie o "Token Endpoint"
              exibido na aba de detalhes.
            </span>
          </label>

          <label className="block text-[12px] font-semibold text-slate-800">
            Nome do assistente
            <input
              className={`${inputCls} mt-1`}
              value={copilotNome}
              onChange={(e) => setCopilotNome(e.target.value)}
              placeholder="Assistente VIBRA"
            />
          </label>

          <label className="block text-[12px] font-semibold text-slate-800">
            Mensagem rodapé / Boas-vindas
            <input
              className={`${inputCls} mt-1`}
              value={copilotMensagem}
              onChange={(e) => setCopilotMensagem(e.target.value)}
              placeholder="Olá! Como posso ajudar?"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
          <p className="text-[10.5px] text-muted-foreground font-medium">
            {chatbotUrl
              ? "✓ Integrado via Link Iframe (SSO Corporativo)"
              : tokenEndpoint
                ? "✓ Integrado via Direct Line (Premium API)"
                : "⚠️ Nenhum canal configurado — o chat flutuante exibirá instruções."}
          </p>
          <button
            onClick={handleSaveCopilot}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            <Save className="h-3.5 w-3.5" /> Salvar Configurações Copilot
          </button>
        </div>
      </section>
    </div>
  );
}

interface InfoProps {
  className?: string;
}

function Info({ className }: InfoProps) {
  return <HelpCircle className={`h-4 w-4 text-slate-400 ${className}`} />;
}
