-- ============================================================================
-- ENTERPRISE ARCHITECTURE PERSISTENCE SCHEMA (POSTGRESQL / GCP CLOUD SQL / ALLOYDB)
-- Version: 1.0.0
-- Normalization: 3rd Normal Form (3FN)
-- UUID-v4 Keys | Soft Deletes | Triggers for Audit & Logs
-- Prepared for Cloud SQL and AlloyDB Migration
-- ============================================================================

-- Create Extension for UUID Generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Audit Log table to track historical changes across all schemas (Change Data Capture)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE
    old_data JSONB,
    new_data JSONB,
    performed_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast audit lookups
CREATE INDEX IF NOT EXISTS idx_audit_table_record ON public.audit_logs(table_name, record_id);

-- Helper function to automatically record changes to audit_logs
CREATE OR REPLACE FUNCTION public.fn_audit_trigger_handler()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, performed_by)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, to_jsonb(OLD), OLD.updated_by);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, new_data, performed_by)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, to_jsonb(OLD), to_jsonb(NEW), NEW.updated_by);
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, new_data, performed_by)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, to_jsonb(NEW), NEW.created_by);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================================
-- DOMAIN 1: ORGANIZATIONAL STRUCTURE, PROFILES & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.business_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id),
    nome VARCHAR(255) NOT NULL,
    sigla VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.vice_presidencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID REFERENCES public.business_units(id),
    nome VARCHAR(255) NOT NULL,
    responsavel_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vice_presidencia_id UUID REFERENCES public.vice_presidencies(id),
    nome VARCHAR(255) NOT NULL,
    centro_custo VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id VARCHAR(255) PRIMARY KEY, -- Maps directly to firebase auth user uid
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cargo VARCHAR(150),
    departamento VARCHAR(150),
    vice_presidencia VARCHAR(150),
    diretoria VARCHAR(150),
    gerencia VARCHAR(150),
    area VARCHAR(150),
    funcao VARCHAR(150),
    papel VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) REFERENCES public.profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'editor_master', 'editor_basico', 'visualizador')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);


-- ============================================================================
-- DOMAIN 2: PROCESS MAPPING & DIAGNOSTIC SCHEMA
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.macroprocesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id),
    codigo VARCHAR(20) UNIQUE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.subprocesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    macroprocess_id UUID REFERENCES public.macroprocesses(id) ON DELETE CASCADE,
    codigo VARCHAR(20) UNIQUE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.process_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subprocess_id UUID REFERENCES public.subprocesses(id),
    analista_id VARCHAR(255) REFERENCES public.profiles(id),
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(50) DEFAULT 'Mapeado',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- SIPOC Tables (3FN mapping)
CREATE TABLE IF NOT EXISTS public.sipoc_suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    fornecedor VARCHAR(255) NOT NULL,
    ordem INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.sipoc_inputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    entrada VARCHAR(255) NOT NULL,
    ordem INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.sipoc_outputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    saida VARCHAR(255) NOT NULL,
    ordem INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.sipoc_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    cliente VARCHAR(255) NOT NULL,
    ordem INT DEFAULT 0
);

-- Process mapping flow elements
CREATE TABLE IF NOT EXISTS public.asis_flows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    passo INT NOT NULL,
    atividade TEXT NOT NULL,
    responsavel VARCHAR(150),
    sistema_utilizado VARCHAR(150),
    tempo_medio INT, -- in minutes
    volume_mensal INT
);

CREATE TABLE IF NOT EXISTS public.tobe_flows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    passo INT NOT NULL,
    atividade TEXT NOT NULL,
    responsavel VARCHAR(150),
    sistema_utilizado VARCHAR(150),
    tempo_medio INT,
    reducao_esperada INT
);

CREATE TABLE IF NOT EXISTS public.mapping_painpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    dor TEXT NOT NULL,
    categoria VARCHAR(100),
    frequencia VARCHAR(50),
    severidade INT, -- 1-5 scale
    impacto_financeiro NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS public.mapping_systems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    sistema_nome VARCHAR(100) NOT NULL,
    tempo_tela INT, -- hours/month
    dificuldade_integracao VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS public.process_complexities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    parametro_nome VARCHAR(150) NOT NULL,
    valor_configurado TEXT,
    complexidade_calculada VARCHAR(20) CHECK (complexidade_calculada IN ('Baixa', 'Média', 'Alta'))
);


-- ============================================================================
-- DOMAIN 3: INITIATIVES, PORTFOLIOS & PROJECT TEAMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES public.portfolios(id),
    nome VARCHAR(255) NOT NULL,
    budget_max NUMERIC(15,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.projetos (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    cor VARCHAR(7) DEFAULT '#268200',
    status VARCHAR(50) DEFAULT 'Planejamento',
    lider_id VARCHAR(255) REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.iniciativas (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    projeto_id VARCHAR(255) REFERENCES public.projetos(id) ON DELETE CASCADE,
    codigo VARCHAR(50) UNIQUE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    as_is TEXT,
    to_be TEXT,
    solucao_proposta TEXT,
    tipo_melhoria VARCHAR(100),
    status VARCHAR(100) DEFAULT 'Mapeada',
    prioridade VARCHAR(100),
    impacto_negocio INT CHECK (impacto_negocio BETWEEN 1 AND 5),
    impacto_cliente INT CHECK (impacto_cliente BETWEEN 1 AND 5),
    impacto_financeiro INT CHECK (impacto_financeiro BETWEEN 1 AND 5),
    esforco INT CHECK (esforco BETWEEN 1 AND 5),
    complexidade INT CHECK (complexidade BETWEEN 1 AND 5),
    lider_id VARCHAR(255),
    sponsor_id VARCHAR(255),
    analista_id VARCHAR(255),
    responsavel_id VARCHAR(255),
    percentual_avanco NUMERIC(5,2) DEFAULT 0,
    data_implantacao DATE,
    data_inicio DATE,
    data_inicio_real DATE,
    data_fim_prevista DATE,
    data_fim_real DATE,
    hc_atual NUMERIC(5,2),
    fte_participacao NUMERIC(5,2),
    hc_estimado NUMERIC(5,2),
    hc_alcancado NUMERIC(5,2),
    hc_liberado NUMERIC(5,2),
    saving_previsto NUMERIC(15,2),
    saving_realizado NUMERIC(15,2),
    custo_implementacao NUMERIC(15,2),
    impactos_qualitativos TEXT,
    memoria_roi TEXT,
    impedimento TEXT,
    decisoes_tomadas TEXT,

    -- Diagnostic and form-specific columns synchronized from production
    alternancia_telas TEXT[],
    analista_responsavel VARCHAR(255),
    area_responsavel VARCHAR(255),
    atividade_manual BOOLEAN,
    automacao_sugerida TEXT,
    categoria_dor VARCHAR(255),
    causa_raiz_inicial TEXT,
    cliente_processo TEXT[],
    complexidade_automacao_score NUMERIC(5,2),
    complexidade_processo VARCHAR(255),
    copia_cola BOOLEAN,
    custo_hora NUMERIC(15,2),
    data_diagnostico DATE,
    dep_pessoa INT,
    dep_pessoa_chave BOOLEAN,
    dependencia_ti BOOLEAN,
    desperdicios_lean JSONB,
    digitacao_manual BOOLEAN,
    diretoria VARCHAR(255),
    dor_identificada TEXT,
    evidencia_atual TEXT,
    evidencia_futura TEXT,
    excel_paralelo BOOLEAN,
    execucoes_dia INT,
    execucoes_mes INT,
    execucoes_semana INT,
    expectativa_produtividade NUMERIC(15,2),
    frequencia VARCHAR(255),
    ganho_financeiro NUMERIC(15,2),
    ganho_horas NUMERIC(10,2),
    gerencia VARCHAR(255),
    gestor_responsavel VARCHAR(255),
    horas_futuras_mes NUMERIC(10,2),
    horas_gastas_mes NUMERIC(10,2),
    impacto_cliente_sn BOOLEAN,
    impacto_compliance_sn BOOLEAN,
    impacto_financeiro_sn BOOLEAN,
    links_relacionados TEXT,
    locais_consulta TEXT[],
    local_planilhas TEXT[],
    motivo_reducao TEXT,
    multas_evitadas NUMERIC(15,2),
    objetivo_processo TEXT,
    observacoes TEXT,
    passos_manuais TEXT[],
    pessoas_envolvidas INT,
    processo TEXT,
    qtd_planilhas INT,
    qtd_regras VARCHAR(255),
    risco_operacional NUMERIC(5,2),
    roi NUMERIC(15,2),
    score INT,
    score_automacao INT,
    sem_substituto INT,
    sistemas JSONB,
    sistemas_paralelos TEXT[],
    sla_existe BOOLEAN,
    sla_min INT,
    substituto_treinado BOOLEAN,
    substitutos_detalhes TEXT,
    taxa_erro NUMERIC(5,2),
    tempo_capacitacao INT,
    tempo_espera INT,
    tempo_futuro INT,
    tempo_ideal INT,
    tempo_max INT,
    tempo_min INT,
    tempo_treino INT,
    urgencia VARCHAR(255),
    vice_presidencia VARCHAR(255),
    vice_presidente VARCHAR(255),
    diretor VARCHAR(255),
    gerente VARCHAR(255),
    papel VARCHAR(255),
    area VARCHAR(255),
    volume_excecoes VARCHAR(255),
    volume_financeiro NUMERIC(15,2),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.initiative_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    user_id VARCHAR(255) REFERENCES public.profiles(id),
    papel_membro VARCHAR(100),
    alocacao_percentual INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS public.initiative_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    data_prevista DATE NOT NULL,
    data_conclusao DATE,
    responsavel VARCHAR(150),
    percentual_avanco INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.initiative_sprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    numero_sprint INT NOT NULL,
    meta TEXT,
    data_inicio DATE,
    data_fim DATE,
    entregue_no_prazo BOOLEAN
);

CREATE TABLE IF NOT EXISTS public.microprocessos (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    codigo VARCHAR(50),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    status VARCHAR(100) DEFAULT 'Não iniciado',
    prioridade VARCHAR(50),
    percentual_avanco NUMERIC(5,2) DEFAULT 0,
    data_fim_prevista DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.microprocess_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    microprocesso_id VARCHAR(255) REFERENCES public.microprocessos(id) ON DELETE CASCADE,
    ordem INT NOT NULL,
    acao TEXT NOT NULL,
    responsavel VARCHAR(150),
    tempo_estimado_minutos INT
);

CREATE TABLE IF NOT EXISTS public.tarefas (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    microprocesso_id VARCHAR(255) REFERENCES public.microprocessos(id) ON DELETE SET NULL,
    codigo VARCHAR(50),
    titulo VARCHAR(255) NOT NULL,
    status VARCHAR(100) DEFAULT 'Pendente',
    prioridade VARCHAR(100),
    responsavel_id VARCHAR(255),
    data_inicio DATE,
    data_fim_prevista DATE,
    data_fim_real DATE,
    percentual_avanco NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.task_checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tarefa_id VARCHAR(255) REFERENCES public.tarefas(id) ON DELETE CASCADE,
    item_texto VARCHAR(255) NOT NULL,
    concluido BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.task_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tarefa_id VARCHAR(255) REFERENCES public.tarefas(id) ON DELETE CASCADE,
    profile_id VARCHAR(255) REFERENCES public.profiles(id),
    funcao VARCHAR(100)
);


-- ============================================================================
-- DOMAIN 4: AGILE MANAGEMENT, KANBAN BOARDS & SWIMLANES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.kanban_boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    projeto_id VARCHAR(255) REFERENCES public.projetos(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.kanban_columns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    board_id UUID REFERENCES public.kanban_boards(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    cor VARCHAR(7) DEFAULT '#cccccc',
    ordem INT NOT NULL,
    wip_limit INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.kanban_swimlanes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    board_id UUID REFERENCES public.kanban_boards(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    ordem INT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.kanban_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    column_id UUID REFERENCES public.kanban_columns(id) ON DELETE CASCADE,
    swimlane_id UUID REFERENCES public.kanban_swimlanes(id) ON DELETE SET NULL,
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    ordem INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.kanban_card_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_id UUID REFERENCES public.kanban_cards(id) ON DELETE CASCADE,
    origem_col_id UUID REFERENCES public.kanban_columns(id),
    destino_col_id UUID REFERENCES public.kanban_columns(id),
    movido_por VARCHAR(255),
    movido_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.sprint_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    entregas_previstas INT DEFAULT 0,
    entregas_concluidas INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.sprint_burndowns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sprint_id UUID REFERENCES public.sprint_schedules(id) ON DELETE CASCADE,
    dia_ref DATE NOT NULL,
    pontos_planejados INT NOT NULL,
    pontos_restantes INT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.agile_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    cycle_time_days NUMERIC(5,2),
    lead_time_days NUMERIC(5,2),
    throughput INT DEFAULT 1,
    unidade_tempo DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS public.retro_feedbacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sprint_id UUID REFERENCES public.sprint_schedules(id) ON DELETE CASCADE,
    categoria VARCHAR(50) CHECK (categoria IN ('bom', 'melhorar', 'ideias', 'agradecimento')),
    feedback TEXT NOT NULL,
    autor_id VARCHAR(255) REFERENCES public.profiles(id)
);

CREATE TABLE IF NOT EXISTS public.team_capacities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sprint_id UUID REFERENCES public.sprint_schedules(id) ON DELETE CASCADE,
    profile_id VARCHAR(255) REFERENCES public.profiles(id),
    fte_disponivel NUMERIC(4,2) DEFAULT 1.0,
    horas_totais INT DEFAULT 168
);


-- ============================================================================
-- DOMAIN 5: CONTINUOUS IMPROVEMENT, LEAN, KAIZEN & SIX SIGMA
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.kaizen_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    lider_evento_id VARCHAR(255) REFERENCES public.profiles(id),
    data_inicio DATE,
    data_fim DATE,
    status VARCHAR(50) DEFAULT 'Planejado',
    investimento_inicial NUMERIC(15,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.kaizen_ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kaizen_event_id UUID REFERENCES public.kaizen_events(id) ON DELETE SET NULL,
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    ideia TEXT NOT NULL,
    autor VARCHAR(150),
    pontuacao_esforco INT,
    pontuacao_impacto INT,
    status VARCHAR(50) DEFAULT 'Em análise'
);

CREATE TABLE IF NOT EXISTS public.lean_wastes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    tipo_desperdicio VARCHAR(100) NOT NULL, -- Ex: Superprodução, Espera, Transporte
    detalhe_desperdicio TEXT NOT NULL,
    custo_estimado NUMERIC(15,2) DEFAULT 0,
    acoes_eliminacao TEXT
);

CREATE TABLE IF NOT EXISTS public.lean_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    dimensao VARCHAR(100) NOT NULL, -- Kanban, 5S, Standard Work
    nota INT CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    avaliado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Root cause (Fishbone & 5 Whys mapping)
CREATE TABLE IF NOT EXISTS public.root_causes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    problema_principal TEXT NOT NULL,
    categoria_fishbone VARCHAR(50) CHECK (categoria_fishbone IN ('Método', 'Mão de Obra', 'Material', 'Máquina', 'Medida', 'Meio Ambiente')),
    causa_identificada TEXT NOT NULL,
    severidade_raiz INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.root_cause_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    root_cause_id UUID REFERENCES public.root_causes(id) ON DELETE CASCADE,
    acao TEXT NOT NULL,
    prazo DATE,
    responsavel VARCHAR(150),
    concluida BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.root_cause_5whys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    problema TEXT NOT NULL,
    porque_1 TEXT,
    porque_2 TEXT,
    porque_3 TEXT,
    porque_4 TEXT,
    porque_5 TEXT,
    causa_raiz_final TEXT
);

CREATE TABLE IF NOT EXISTS public.dmaic_phases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    fase VARCHAR(10) CHECK (fase IN ('Define', 'Measure', 'Analyze', 'Improve', 'Control')),
    percentual_avanco INT DEFAULT 0,
    data_inicio DATE,
    data_conclusao DATE,
    avaliador_id VARCHAR(255) REFERENCES public.profiles(id)
);

CREATE TABLE IF NOT EXISTS public.dmaic_gateways (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dmaic_phase_id UUID REFERENCES public.dmaic_phases(id) ON DELETE CASCADE,
    entregavel_critico VARCHAR(255) NOT NULL,
    status_aprovacao VARCHAR(50) DEFAULT 'Pendente',
    comentarios_gateway TEXT
);

CREATE TABLE IF NOT EXISTS public.value_stream_maps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mapping_id UUID REFERENCES public.process_mappings(id) ON DELETE CASCADE,
    etapa_nome VARCHAR(255) NOT NULL,
    tempo_processamento_min INT DEFAULT 0,
    tempo_fila_min INT DEFAULT 0,
    eficiencia_ciclo NUMERIC(5,2)
);


-- ============================================================================
-- DOMAIN 6: BENEFIT TRACKING, METRICS, FTE & FINANCIAL FORECASTING
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.financial_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('CAPEX', 'OPEX', 'Saving Hard', 'Saving Soft')),
    codigo_contabil VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    projeto_id VARCHAR(255) REFERENCES public.projetos(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.financial_categories(id),
    valor_planejado NUMERIC(15,2) NOT NULL,
    valor_comprometido NUMERIC(15,2) DEFAULT 0,
    valor_realizado NUMERIC(15,2) DEFAULT 0,
    ano INT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.benefit_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    mes_ano DATE NOT NULL,
    saving_esperado NUMERIC(15,2) DEFAULT 0,
    fte_esperado_liberado NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.actual_savings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    mes_ano DATE NOT NULL,
    saving_apurado NUMERIC(15,2) NOT NULL,
    fte_apurado_liberado NUMERIC(5,2) DEFAULT 0,
    certificado_por VARCHAR(150),
    data_certificado DATE
);

CREATE TABLE IF NOT EXISTS public.investment_costs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    descricao_item VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) CHECK (tipo IN ('Software', 'Hardware', 'Treinamento', 'Serviço', 'Infraestrutura')),
    custo_real NUMERIC(15,2) NOT NULL,
    pago_em DATE
);

CREATE TABLE IF NOT EXISTS public.resource_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    projeto_id VARCHAR(255) REFERENCES public.projetos(id) ON DELETE CASCADE,
    profile_id VARCHAR(255) REFERENCES public.profiles(id),
    mes_referencia DATE NOT NULL,
    horas_alocadas INT NOT NULL,
    custo_alocacao NUMERIC(15,2)
);

CREATE TABLE IF NOT EXISTS public.fte_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    profile_id VARCHAR(255) REFERENCES public.profiles(id),
    fte_alocado NUMERIC(4,2) NOT NULL CHECK (fte_alocado BETWEEN 0.0 AND 1.0),
    data_inicio DATE NOT NULL,
    data_fim DATE
);

CREATE TABLE IF NOT EXISTS public.cost_centers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(150) NOT NULL,
    diretoria_vinculada VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS public.financial_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    evento_financeiro VARCHAR(255) NOT NULL,
    valor_impactado NUMERIC(15,2) NOT NULL,
    data_log DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.benefit_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    status_verificacao VARCHAR(50) CHECK (status_verificacao IN ('Auditado', 'Em auditoria', 'Rejeitado', 'Consolidado')),
    comentarios TEXT,
    auditado_por VARCHAR(150),
    auditado_em DATE
);


-- ============================================================================
-- DOMAIN 7: GOVERNANCE, RISKS, FORMULAS & CONFIGURATION LOGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.riscos (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    classificacao VARCHAR(100),
    nivel VARCHAR(100), -- Crítico, Alto, Médio, Baixo
    probabilidade VARCHAR(50),
    impacto VARCHAR(50),
    plano_contingencia TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.risk_mitigations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    risco_id VARCHAR(255) REFERENCES public.riscos(id) ON DELETE CASCADE,
    acao_mitigadora TEXT NOT NULL,
    responsavel VARCHAR(150),
    status VARCHAR(50) DEFAULT 'Em andamento'
);

CREATE TABLE IF NOT EXISTS public.risk_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    risco_id VARCHAR(255) REFERENCES public.riscos(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    concluida BOOLEAN DEFAULT FALSE,
    prazo DATE
);

CREATE TABLE IF NOT EXISTS public.audit_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    projeto_id VARCHAR(255) REFERENCES public.projetos(id) ON DELETE CASCADE,
    foco_auditoria VARCHAR(255) NOT NULL,
    resultado_texto TEXT,
    nota_gof_compliance INT CHECK (nota_gof_compliance BETWEEN 0 AND 100)
);

CREATE TABLE IF NOT EXISTS public.quality_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    item_revisado VARCHAR(255) NOT NULL,
    aprovado BOOLEAN DEFAULT FALSE,
    data_revisao DATE
);

CREATE TABLE IF NOT EXISTS public.non_conformances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    desvio_detalhe TEXT NOT NULL,
    acao_corretiva TEXT,
    prazo_resolucao DATE
);

CREATE TABLE IF NOT EXISTS public.formulas (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    nome VARCHAR(150) NOT NULL UNIQUE,
    descricao TEXT,
    expressao TEXT NOT NULL,
    contexto VARCHAR(100),
    variaveis JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    updated_by VARCHAR(255),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.formulas_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    formula_id VARCHAR(255) REFERENCES public.formulas(id) ON DELETE CASCADE,
    expressao_anterior TEXT NOT NULL,
    expressao_nova TEXT NOT NULL,
    modificado_por VARCHAR(150),
    modificado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.app_configuracoes (
    chave VARCHAR(100) PRIMARY KEY,
    valor JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.user_session_log (
    id VARCHAR(255) PRIMARY KEY, -- Aligned with firebase model
    user_id VARCHAR(255) REFERENCES public.profiles(id) ON DELETE CASCADE,
    email VARCHAR(255),
    evento VARCHAR(255) NOT NULL, -- login, logoff, update_profile
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================================
-- SYSTEM CODES & PICKLISTS SUPPORT TABLES (Canonic Metadata Core)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.picklists (
    id VARCHAR(255) PRIMARY KEY, -- Matches firebase
    categoria VARCHAR(255) UNIQUE NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.picklist_valores (
    id VARCHAR(255) PRIMARY KEY, -- Matches firebase
    picklist_id VARCHAR(255) REFERENCES public.picklists(id) ON DELETE CASCADE,
    valor VARCHAR(255) NOT NULL,
    ordem INT DEFAULT 0,
    cor VARCHAR(7) DEFAULT '#268200',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.controle_sustentacao (
    id VARCHAR(255) PRIMARY KEY, -- Matches firebase
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    data_referencia DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    ganho_financeiro NUMERIC(15,2) DEFAULT 0,
    horas_economizadas NUMERIC(10,2) DEFAULT 0,
    fte_preservado NUMERIC(5,2) DEFAULT 0,
    desvio NUMERIC(15,2) DEFAULT 0,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.anexos (
    id VARCHAR(255) PRIMARY KEY, -- Matches firebase
    iniciativa_id VARCHAR(255) REFERENCES public.iniciativas(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    url TEXT NOT NULL,
    tamanho_bytes INT,
    mime_type VARCHAR(100),
    uploaded_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================================
-- MOCK SEEDS FOR 6 EXISTING PROJECTS & CANONIC PICKLIST VALUES
-- ============================================================================

-- Inserting default profiles
INSERT INTO public.profiles (id, nome, email, cargo, departamento, papel) VALUES
('profile-1', 'Rodrigo França', 'rfranca@vibraenergia.com.br', 'Gerente', 'TI', 'Administrador Global'),
('profile-2', 'Sandro Quequel', 'sfquequel@gmail.com', 'Diretor', 'Operações', 'Líder/Gestor de Projeto'),
('profile-3', 'Raquel França', 'raquel.franca@vibraenergia.com.br', 'Coordenadora', 'Escritório de Transformação', 'Administrador Global'),
('profile-4', 'Bruno Santos', 'bruno.santos@vibraenergia.com.br', 'Líder', 'Recursos Humanos', 'Analista/Executor')
ON CONFLICT (id) DO NOTHING;

-- Inserting default roles
INSERT INTO public.user_roles (user_id, role) VALUES
('profile-1', 'admin'),
('profile-2', 'editor_master'),
('profile-3', 'admin'),
('profile-4', 'editor_basico')
ON CONFLICT DO NOTHING;

-- Inserting 6 projects
INSERT INTO public.projetos (id, nome, descricao, cor, status) VALUES
('proj-1', 'Eficiência de Distribuição', 'Otimização logística de fretes e carregamento nos terminais', '#0284c7', 'Em Andamento'),
('proj-2', 'Modernização de TI', 'Migração de sistemas legados para nuvem e melhoria de processos SAP', '#4f46e5', 'Em Andamento'),
('proj-3', 'Excelência em Postos', 'Padronização de atendimento e checklist operacional em postos revendedores', '#16a34a', 'Em Andamento'),
('proj-4', 'Transição Energética', 'Iniciativas de descarbonização e novos negócios em bioenergia', '#059669', 'Planejamento'),
('proj-5', 'Atendimento ao Cliente 2.0', 'Reestruturação de canais digitais e automação com inteligência artificial', '#ea580c', 'Planejamento'),
('proj-6', 'Compliance Operacional', 'Auditoria contínua e mitigação de riscos regulatórios em terminais', '#dc2626', 'Planejamento')
ON CONFLICT (id) DO NOTHING;


-- ============================================================================
-- ROW-LEVEL TRIGGERS FOR ALL SCHEMAS FOR AUTO-AUDITING
-- ============================================================================

-- Create general function to dynamically assign triggers for tables
CREATE OR REPLACE PROCEDURE public.pr_enable_auditing_for_table(target_table_name TEXT)
LANGUAGE plpgsql AS $$
BEGIN
    EXECUTE format('
        CREATE OR REPLACE TRIGGER tr_audit_%s
        AFTER INSERT OR UPDATE OR DELETE ON public.%s
        FOR EACH ROW EXECUTE FUNCTION public.fn_audit_trigger_handler()', 
        target_table_name, target_table_name);
END;
$$;

-- Apply Audit to Core Tables
CALL public.pr_enable_auditing_for_table('profiles');
CALL public.pr_enable_auditing_for_table('projetos');
CALL public.pr_enable_auditing_for_table('iniciativas');
CALL public.pr_enable_auditing_for_table('microprocessos');
CALL public.pr_enable_auditing_for_table('tarefas');
CALL public.pr_enable_auditing_for_table('riscos');
CALL public.pr_enable_auditing_for_table('formulas');
CALL public.pr_enable_auditing_for_table('controle_sustentacao');
