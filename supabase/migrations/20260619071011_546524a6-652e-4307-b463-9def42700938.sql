
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE OR REPLACE FUNCTION public.tg_audit_log()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE v_id uuid; v_payload jsonb;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_id := (row_to_json(OLD)->>'id')::uuid;
    v_payload := jsonb_build_object('antes', to_jsonb(OLD));
  ELSIF TG_OP = 'UPDATE' THEN
    v_id := (row_to_json(NEW)->>'id')::uuid;
    v_payload := jsonb_build_object('antes', to_jsonb(OLD), 'depois', to_jsonb(NEW));
  ELSE
    v_id := (row_to_json(NEW)->>'id')::uuid;
    v_payload := jsonb_build_object('depois', to_jsonb(NEW));
  END IF;
  INSERT INTO public.audit_log (tabela, registro_id, acao, payload, user_id)
  VALUES (TG_TABLE_NAME, v_id, TG_OP, v_payload, auth.uid());
  RETURN COALESCE(NEW, OLD);
END $$;

CREATE SEQUENCE IF NOT EXISTS public.iniciativa_codigo_seq START 1000;

ALTER TABLE public.iniciativas
  ADD COLUMN IF NOT EXISTS codigo text UNIQUE,
  ADD COLUMN IF NOT EXISTS sponsor_id uuid REFERENCES public.profiles(id),
  ADD COLUMN IF NOT EXISTS lider_id uuid REFERENCES public.profiles(id),
  ADD COLUMN IF NOT EXISTS analista_id uuid REFERENCES public.profiles(id),
  ADD COLUMN IF NOT EXISTS categoria_dor text,
  ADD COLUMN IF NOT EXISTS frequencia text,
  ADD COLUMN IF NOT EXISTS sistemas jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS urgencia text,
  ADD COLUMN IF NOT EXISTS hc_atual numeric,
  ADD COLUMN IF NOT EXISTS hc_estimado numeric,
  ADD COLUMN IF NOT EXISTS hc_alcancado numeric,
  ADD COLUMN IF NOT EXISTS hc_liberado numeric,
  ADD COLUMN IF NOT EXISTS fte_participacao numeric,
  ADD COLUMN IF NOT EXISTS tempo_min numeric,
  ADD COLUMN IF NOT EXISTS tempo_max numeric,
  ADD COLUMN IF NOT EXISTS tempo_futuro numeric,
  ADD COLUMN IF NOT EXISTS execucoes_mes numeric,
  ADD COLUMN IF NOT EXISTS taxa_erro numeric,
  ADD COLUMN IF NOT EXISTS retrabalho numeric,
  ADD COLUMN IF NOT EXISTS potencial_automacao text,
  ADD COLUMN IF NOT EXISTS complexidade_automacao text,
  ADD COLUMN IF NOT EXISTS score_automacao numeric,
  ADD COLUMN IF NOT EXISTS dep_pessoa integer,
  ADD COLUMN IF NOT EXISTS sem_substituto integer,
  ADD COLUMN IF NOT EXISTS tempo_treino numeric,
  ADD COLUMN IF NOT EXISTS risco_operacional numeric,
  ADD COLUMN IF NOT EXISTS saving_previsto numeric,
  ADD COLUMN IF NOT EXISTS saving_realizado numeric,
  ADD COLUMN IF NOT EXISTS custo_implementacao numeric,
  ADD COLUMN IF NOT EXISTS volume_financeiro numeric,
  ADD COLUMN IF NOT EXISTS roi numeric,
  ADD COLUMN IF NOT EXISTS memoria_roi text,
  ADD COLUMN IF NOT EXISTS desperdicios_lean jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS impactos_qualitativos text,
  ADD COLUMN IF NOT EXISTS decisoes_tomadas text,
  ADD COLUMN IF NOT EXISTS impedimento text,
  ADD COLUMN IF NOT EXISTS dor_identificada text,
  ADD COLUMN IF NOT EXISTS causa_raiz_inicial text,
  ADD COLUMN IF NOT EXISTS objetivo_processo text,
  ADD COLUMN IF NOT EXISTS data_diagnostico date;

CREATE OR REPLACE FUNCTION public.tg_iniciativa_codigo()
RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := 'INI-' || lpad(nextval('public.iniciativa_codigo_seq')::text, 5, '0');
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS set_iniciativa_codigo ON public.iniciativas;
CREATE TRIGGER set_iniciativa_codigo BEFORE INSERT ON public.iniciativas
  FOR EACH ROW EXECUTE FUNCTION public.tg_iniciativa_codigo();

CREATE TABLE IF NOT EXISTS public.sipoc (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  categoria text NOT NULL CHECK (categoria IN ('suppliers','inputs','process','outputs','customers')),
  valor text NOT NULL,
  ordem integer DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.asis_passos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  ordem integer DEFAULT 0,
  processo text, passo text, ator text, tipo text,
  tempo numeric, volume numeric, dor text, impacto text,
  quick_win boolean DEFAULT false, ti boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.tobe_passos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  ordem integer DEFAULT 0,
  processo text, passo text, ator text, tipo text,
  tempo numeric, volume numeric, ganho_fte numeric, ganho_financeiro numeric,
  lead_time numeric,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.lean_avaliacoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  superproducao integer DEFAULT 0,
  espera integer DEFAULT 0,
  transporte integer DEFAULT 0,
  superprocessamento integer DEFAULT 0,
  estoque integer DEFAULT 0,
  movimentacao integer DEFAULT 0,
  defeitos integer DEFAULT 0,
  talento integer DEFAULT 0,
  observacoes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (iniciativa_id)
);

CREATE TABLE IF NOT EXISTS public.kaizen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  problema text, meta text, causa text, acao text, resultado text,
  responsavel_id uuid REFERENCES public.profiles(id),
  data_evento date,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.pedido_ajuda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  titulo text NOT NULL, descricao text,
  gestor_id uuid REFERENCES public.profiles(id),
  email_destino text, status text DEFAULT 'aberto',
  teams_payload jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.agenda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid REFERENCES public.iniciativas(id) ON DELETE SET NULL,
  titulo text NOT NULL, data_evento timestamptz NOT NULL,
  tipo_reuniao text, duracao_min integer DEFAULT 0,
  notas text, observacoes text,
  concluida boolean DEFAULT false, concluida_em timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.agenda_participantes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agenda_id uuid NOT NULL REFERENCES public.agenda(id) ON DELETE CASCADE,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  minutos_creditados integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (agenda_id, profile_id)
);

CREATE TABLE IF NOT EXISTS public.status_estrategico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  o_que_mudou text, riscos text, decisoes text,
  retorno text, proximas_acoes text, indicadores_sucesso text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.dmaic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  define_phase text, measure_phase text, analyze_phase text, improve_phase text, control_phase text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (iniciativa_id)
);

CREATE TABLE IF NOT EXISTS public.boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL, tipo text DEFAULT 'custom',
  descricao text, layout jsonb DEFAULT '{}'::jsonb,
  publico boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.board_widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
  tipo text NOT NULL, titulo text,
  config jsonb DEFAULT '{}'::jsonb,
  pos_x integer DEFAULT 0, pos_y integer DEFAULT 0,
  largura integer DEFAULT 4, altura integer DEFAULT 3,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.mc3_registros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kpi_humano text NOT NULL,
  categoria_diferenciada text,
  processo_id uuid REFERENCES public.processos(id),
  iniciativa_id uuid REFERENCES public.iniciativas(id),
  tempo_dedicado_min integer DEFAULT 0,
  tipo_esforco text, custo numeric,
  dor text, solucao text, resultado_imediato text,
  contribuicao text, responsabilidades text, acoes text,
  pessoas_envolvidas jsonb DEFAULT '[]'::jsonb,
  ferramentas jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  atitude_inovadora text,
  status text DEFAULT 'ativo',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.controle_sustentacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  data_referencia date NOT NULL DEFAULT CURRENT_DATE,
  status text, ganho_financeiro numeric, horas_economizadas numeric,
  fte_preservado numeric, desvio numeric, observacoes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS public.fluxo_rascunho (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  canvas jsonb DEFAULT '{}'::jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (iniciativa_id)
);

CREATE TABLE IF NOT EXISTS public.bpmn_arquivos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  tipo text NOT NULL CHECK (tipo IN ('as_is','to_be')),
  url text NOT NULL, nome text, anotacoes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'sipoc','asis_passos','tobe_passos','lean_avaliacoes','kaizen',
    'pedido_ajuda','agenda','agenda_participantes','status_estrategico',
    'dmaic','boards','board_widgets','mc3_registros','controle_sustentacao',
    'fluxo_rascunho','bpmn_arquivos'
  ]) LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated;', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role;', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
  END LOOP;
END $$;

DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'sipoc','asis_passos','tobe_passos','lean_avaliacoes','kaizen',
    'pedido_ajuda','agenda','status_estrategico','dmaic','boards',
    'mc3_registros','controle_sustentacao','fluxo_rascunho','bpmn_arquivos'
  ]) LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Leitura autenticada" ON public.%I;', t);
    EXECUTE format('CREATE POLICY "Leitura autenticada" ON public.%I FOR SELECT TO authenticated USING (deleted_at IS NULL);', t);
    EXECUTE format('DROP POLICY IF EXISTS "Editor insere" ON public.%I;', t);
    EXECUTE format('CREATE POLICY "Editor insere" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.can_edit(auth.uid()));', t);
    EXECUTE format('DROP POLICY IF EXISTS "Editor atualiza" ON public.%I;', t);
    EXECUTE format('CREATE POLICY "Editor atualiza" ON public.%I FOR UPDATE TO authenticated USING (public.can_edit(auth.uid()));', t);
    EXECUTE format('DROP POLICY IF EXISTS "Admin deleta" ON public.%I;', t);
    EXECUTE format('CREATE POLICY "Admin deleta" ON public.%I FOR DELETE TO authenticated USING (public.has_role(auth.uid(), ''admin''::app_role));', t);
  END LOOP;
END $$;

DROP POLICY IF EXISTS "Leitura autenticada" ON public.agenda_participantes;
CREATE POLICY "Leitura autenticada" ON public.agenda_participantes FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Editor escreve" ON public.agenda_participantes;
CREATE POLICY "Editor escreve" ON public.agenda_participantes FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));

DROP POLICY IF EXISTS "Leitura autenticada" ON public.board_widgets;
CREATE POLICY "Leitura autenticada" ON public.board_widgets FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Editor escreve" ON public.board_widgets;
CREATE POLICY "Editor escreve" ON public.board_widgets FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));

DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'sipoc','asis_passos','tobe_passos','lean_avaliacoes','kaizen',
    'pedido_ajuda','agenda','status_estrategico','dmaic','boards',
    'board_widgets','mc3_registros','controle_sustentacao','fluxo_rascunho','bpmn_arquivos'
  ]) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON public.%I;', t);
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();', t);
  END LOOP;

  FOR t IN SELECT unnest(ARRAY[
    'macroprocessos','processos','iniciativas','acoes','tarefas',
    'sipoc','asis_passos','tobe_passos','lean_avaliacoes','kaizen',
    'pedido_ajuda','agenda','status_estrategico','dmaic','boards',
    'board_widgets','mc3_registros','controle_sustentacao','riscos','indicadores'
  ]) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS audit_changes ON public.%I;', t);
    EXECUTE format('CREATE TRIGGER audit_changes AFTER INSERT OR UPDATE OR DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.tg_audit_log();', t);
  END LOOP;
END $$;

DO $$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'iniciativas','acoes','tarefas','kanban_historico','mc3_registros',
    'agenda','sipoc','asis_passos','tobe_passos','board_widgets'
  ]) LOOP
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I;', t);
    EXCEPTION WHEN duplicate_object THEN NULL;
              WHEN undefined_object THEN NULL;
    END;
  END LOOP;
END $$;

WITH novos(categoria, descricao) AS (VALUES
  ('Status Iniciativa','Raias do Kanban'),
  ('Prioridades','Nível de prioridade'),
  ('Tipos de Melhoria','Classificação da melhoria'),
  ('Áreas','Áreas organizacionais'),
  ('Categorias de Dor','Tipos de dor identificada'),
  ('Frequências','Frequência de ocorrência'),
  ('Sistemas','Sistemas utilizados'),
  ('Potencial de Automação','Potencial estimado'),
  ('Complexidade da Automação','Nível de complexidade'),
  ('Diretoria','Diretorias da Vibra'),
  ('Função','Cargos / funções'),
  ('Papel no Projeto','Papel atribuído'),
  ('Status de Participação','Status do colaborador'),
  ('Responsabilidades','RACI estendido'),
  ('Nível Vibra','Hierarquia interna'),
  ('Nível Parceiros','Hierarquia consultoria'),
  ('Parceiros','Empresas parceiras'),
  ('Tags','Etiquetas livres'),
  ('KPI Humano MC³','17 KPIs comportamentais')
)
INSERT INTO public.picklists (categoria, descricao)
SELECT n.categoria, n.descricao FROM novos n
WHERE NOT EXISTS (SELECT 1 FROM public.picklists p WHERE p.categoria = n.categoria);

WITH dados(categoria, valor, ordem) AS (VALUES
  ('Status Iniciativa','Nova Iniciativa',1),('Status Iniciativa','Em Diagnóstico',2),
  ('Status Iniciativa','Desenvolvimento da Solução',3),('Status Iniciativa','Sprints – Dev da Solução',4),
  ('Status Iniciativa','Deploy – Entrega',5),('Status Iniciativa','Concluída',6),('Status Iniciativa','Cancelada',7),
  ('Prioridades','Crítica',1),('Prioridades','Alta',2),('Prioridades','Média',3),('Prioridades','Baixa',4),
  ('Tipos de Melhoria','Automação',1),('Tipos de Melhoria','Processo',2),('Tipos de Melhoria','TI',3),
  ('Tipos de Melhoria','Compliance',4),('Tipos de Melhoria','Pessoas',5),('Tipos de Melhoria','Custo',6),('Tipos de Melhoria','Qualidade',7),
  ('Áreas','CX',1),('Áreas','Financeiro',2),('Áreas','TI',3),('Áreas','Supply',4),('Áreas','RH',5),
  ('Áreas','Jurídico',6),('Áreas','Operações',7),('Áreas','Marketing',8),
  ('Categorias de Dor','Retrabalho',1),('Categorias de Dor','Desperdício',2),('Categorias de Dor','Atraso',3),
  ('Categorias de Dor','Custo Excessivo',4),('Categorias de Dor','Erro Humano',5),
  ('Categorias de Dor','Compliance',6),('Categorias de Dor','Gargalo',7),
  ('Frequências','Diária',1),('Frequências','Semanal',2),('Frequências','Mensal',3),('Frequências','Esporádica',4),
  ('Sistemas','SAP',1),('Sistemas','Salesforce',2),('Sistemas','ServiceNow',3),('Sistemas','Excel',4),
  ('Sistemas','E-mail',5),('Sistemas','SharePoint',6),('Sistemas','Power BI',7),('Sistemas','Outro',8),
  ('Potencial de Automação','Alto',1),('Potencial de Automação','Médio',2),
  ('Potencial de Automação','Baixo',3),('Potencial de Automação','Nenhum',4),
  ('Complexidade da Automação','Muito Baixa',1),('Complexidade da Automação','Baixa',2),
  ('Complexidade da Automação','Média',3),('Complexidade da Automação','Alta',4),('Complexidade da Automação','Muito Alta',5),
  ('Diretoria','Operações',1),('Diretoria','TI',2),('Diretoria','RH',3),('Diretoria','Financeiro',4),
  ('Diretoria','Comercial',5),('Diretoria','Suprimentos',6),('Diretoria','Jurídico',7),('Diretoria','Marketing',8),
  ('Função','Analista',1),('Função','Especialista',2),('Função','Coordenador',3),('Função','Gerente',4),
  ('Função','Diretor',5),('Função','Consultor',6),('Função','Estagiário',7),
  ('Papel no Projeto','Sponsor',1),('Papel no Projeto','Líder',2),('Papel no Projeto','Analista',3),
  ('Papel no Projeto','Gestor Responsável',4),('Papel no Projeto','Stakeholder',5),
  ('Papel no Projeto','Time de Apoio',6),('Papel no Projeto','Especialista',7),
  ('Status de Participação','Ativo',1),('Status de Participação','Pausado',2),
  ('Status de Participação','Encerrado',3),('Status de Participação','Aguardando',4),
  ('Responsabilidades','Aprovação',1),('Responsabilidades','Execução',2),('Responsabilidades','Consulta',3),
  ('Responsabilidades','Informação',4),('Responsabilidades','Suporte',5),('Responsabilidades','Validação',6),
  ('Nível Vibra','Diretor',1),('Nível Vibra','Gerente Executivo',2),('Nível Vibra','Gerente',3),
  ('Nível Vibra','Coordenador',4),('Nível Vibra','Especialista',5),('Nível Vibra','Analista Sr',6),
  ('Nível Vibra','Analista Pl',7),('Nível Vibra','Analista Jr',8),('Nível Vibra','Estagiário',9),
  ('Nível Parceiros','Partner',1),('Nível Parceiros','Senior Manager',2),('Nível Parceiros','Manager',3),
  ('Nível Parceiros','Consultor Sr',4),('Nível Parceiros','Consultor Pl',5),('Nível Parceiros','Consultor Jr',6),
  ('Parceiros','Vibra',1),('Parceiros','Accenture',2),('Parceiros','Deloitte',3),('Parceiros','EY',4),
  ('Parceiros','KPMG',5),('Parceiros','PwC',6),('Parceiros','IBM',7),('Parceiros','Outro',8),
  ('Tags','Decisor',1),('Tags','Influenciador',2),('Tags','Aprovador',3),('Tags','Executor',4),
  ('Tags','Bloqueador',5),('Tags','Risco',6),('Tags','VIP',7),
  ('KPI Humano MC³','🕵️ Sherlock de Melhorias',1),('KPI Humano MC³','💡 Arquiteto de Soluções',2),
  ('KPI Humano MC³','📊 Oráculo dos Dados',3),('KPI Humano MC³','🤖 Mestre da IA',4),
  ('KPI Humano MC³','⚙️ Mestre da Automação',5),('KPI Humano MC³','💬 Crítico Construtivo',6),
  ('KPI Humano MC³','🧠 Compartilhador de Conhecimento',7),('KPI Humano MC³','🚀 Agente de Transformação',8),
  ('KPI Humano MC³','🔍 Auditor de Excelência',9),('KPI Humano MC³','🏅 Guardião da Eficiência',10),
  ('KPI Humano MC³','🎯 Caçador de Gargalos',11),('KPI Humano MC³','🕸️ Decifrador de Processos',12),
  ('KPI Humano MC³','⚡ Gerador de Atalhos',13),('KPI Humano MC³','🦾 Amplificador Humano',14),
  ('KPI Humano MC³','⚙️ Caçador de Cliques',15),('KPI Humano MC³','🏭 Operador Invisível',16),
  ('KPI Humano MC³','📡 Caçador de Insights',17)
)
INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
SELECT p.id, d.valor, d.ordem, true
FROM dados d
JOIN public.picklists p ON p.categoria = d.categoria
WHERE NOT EXISTS (
  SELECT 1 FROM public.picklist_valores pv
  WHERE pv.picklist_id = p.id AND pv.valor = d.valor
);

INSERT INTO public.formulas (nome, descricao, expressao, contexto)
SELECT * FROM (VALUES
  ('Score Inteligente','Priorização inteligente de iniciativas','(ImpNeg*25 + ImpCli*15 + ImpFin*25 + Auto*15 + Vol*10 + ROI*10) - (Esforco*10 + Complex*10)','priorizacao'),
  ('FTE / HC Liberado','Conversão de horas economizadas em FTE','Horas_Economizadas / 176','fte'),
  ('ROI','Retorno sobre investimento','(Economia_Anual - Custo_Implementacao) / Custo_Implementacao * 100','financeiro'),
  ('Risco Operacional','Score de risco operacional','(Dep_Pessoa*3) + (Sem_Substituto*2) + (Tempo_Treino*0.5)','risco'),
  ('Índice de Qualidade','Qualidade do processo','(1 - TaxaErro/100) * (1 - Retrabalho/100) * 100','qualidade'),
  ('Complexidade da Automação','Complexidade ponderada','(Sistemas*1)+(Integracoes*2)+(Regras*2)+(Excecoes*2)+(QualDados*1)+(DepHumana*1)+(FreqMudancas*1)+(Criticidade*2)+(Compliance*2)+(EsforcoTec*3)','automacao'),
  ('GTESG00207','Mereo — Redução dias assinatura Nova Imagem','((Meta - Real) / Meta) * 100 + 100','mereo'),
  ('GTESG00208','Mereo — Melhoria fechamento contratos','média dos valores pontuais','mereo'),
  ('Horas Desperdiçadas/Mês','Horas perdidas mensalmente','(Ganho_Tempo / 60) * Execucoes_Mes','tempo'),
  ('Tempo Médio Atual','Tempo médio do processo','(Tempo_Min + Tempo_Max) / 2','tempo'),
  ('Percentual de Redução','% de redução de tempo','((Tempo_Atual - Tempo_Futuro) / Tempo_Atual) * 100','tempo'),
  ('Economia Anual Estimada','Projeção anual de economia','Horas_Economizadas * Custo_Hora * 12','financeiro'),
  ('CEP','Coeficiente de Engajamento de Performance','Participacao_Ativa / Total_Participantes * 100','mc3')
) AS f(nome, descricao, expressao, contexto)
WHERE NOT EXISTS (SELECT 1 FROM public.formulas x WHERE x.nome = f.nome);
