
-- Onda 2A.2: completar schema da Iniciativa para o Formulário-mestre

ALTER TABLE public.iniciativas
  -- Tempo
  ADD COLUMN IF NOT EXISTS tempo_ideal numeric,
  ADD COLUMN IF NOT EXISTS tempo_espera numeric,
  ADD COLUMN IF NOT EXISTS motivo_reducao text,
  -- Volume
  ADD COLUMN IF NOT EXISTS execucoes_dia integer,
  ADD COLUMN IF NOT EXISTS execucoes_semana integer,
  -- Qualidade
  ADD COLUMN IF NOT EXISTS sla_existe boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS sla_min numeric,
  -- Automação detalhada
  ADD COLUMN IF NOT EXISTS atividade_manual boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS sistemas_paralelos text,
  ADD COLUMN IF NOT EXISTS alternancia_telas text,
  ADD COLUMN IF NOT EXISTS digitacao_manual boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS copia_cola boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS passos_manuais text,
  ADD COLUMN IF NOT EXISTS locais_consulta text,
  ADD COLUMN IF NOT EXISTS excel_paralelo boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS qtd_planilhas integer,
  ADD COLUMN IF NOT EXISTS local_planilhas text,
  ADD COLUMN IF NOT EXISTS integracoes jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS qtd_regras text,
  ADD COLUMN IF NOT EXISTS volume_excecoes text,
  ADD COLUMN IF NOT EXISTS automacao_sugerida text,
  ADD COLUMN IF NOT EXISTS complexidade_automacao_score numeric,
  -- Pessoas detalhado
  ADD COLUMN IF NOT EXISTS pessoas_envolvidas integer,
  ADD COLUMN IF NOT EXISTS dep_pessoa_chave boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS tempo_capacitacao numeric,
  ADD COLUMN IF NOT EXISTS substituto_treinado boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS substitutos_detalhes text,
  -- Financeiro
  ADD COLUMN IF NOT EXISTS custo_hora numeric,
  ADD COLUMN IF NOT EXISTS horas_gastas_mes numeric,
  ADD COLUMN IF NOT EXISTS horas_futuras_mes numeric,
  ADD COLUMN IF NOT EXISTS multas_evitadas numeric,
  -- Diagnóstico Sim/Não
  ADD COLUMN IF NOT EXISTS impacto_cliente_sn boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS impacto_financeiro_sn boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS impacto_compliance_sn boolean DEFAULT false,
  -- Governança expandida
  ADD COLUMN IF NOT EXISTS cliente_processo text,
  ADD COLUMN IF NOT EXISTS area_responsavel text,
  ADD COLUMN IF NOT EXISTS gestor_responsavel text,
  ADD COLUMN IF NOT EXISTS analista_responsavel text,
  ADD COLUMN IF NOT EXISTS observacoes text,
  -- Evidências
  ADD COLUMN IF NOT EXISTS links_relacionados text,
  ADD COLUMN IF NOT EXISTS evidencia_atual text,
  ADD COLUMN IF NOT EXISTS evidencia_futura text,
  -- Adicionais
  ADD COLUMN IF NOT EXISTS expectativa_produtividade numeric,
  ADD COLUMN IF NOT EXISTS complexidade_processo text,
  ADD COLUMN IF NOT EXISTS dependencia_ti boolean DEFAULT false;

-- Seeds idempotentes de picklists ainda faltantes
INSERT INTO public.picklists (categoria, descricao) VALUES
  ('Sistemas Utilizados','Sistemas usados nos processos'),
  ('Desperdícios Lean','8 desperdícios do Lean'),
  ('Integrações','Integrações disponíveis'),
  ('Quantidade de Regras','Faixas de regras de negócio'),
  ('Volume de Exceções','Volume de exceções no processo'),
  ('Potencial de Automação','Nível de potencial de automação'),
  ('Vice-Presidência','Vice-Presidências'),
  ('Gerência','Gerências'),
  ('Urgência','Níveis de urgência'),
  ('Complexidade do Processo','Complexidade do processo'),
  ('Status da Iniciativa','Status do ciclo de vida da iniciativa'),
  ('Tipo de Melhoria','Tipos de melhoria'),
  ('Prioridade','Níveis de prioridade')
ON CONFLICT (categoria) DO NOTHING;

-- Garantir unique em categoria (caso ainda não exista)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='picklists_categoria_key') THEN
    BEGIN
      ALTER TABLE public.picklists ADD CONSTRAINT picklists_categoria_key UNIQUE (categoria);
    EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $$;

-- Inserir valores padrão (idempotente via NOT EXISTS)
DO $$
DECLARE r record; lst text[]; v text; i int;
BEGIN
  FOR r IN SELECT id, categoria FROM public.picklists WHERE categoria IN (
    'Sistemas Utilizados','Desperdícios Lean','Integrações','Quantidade de Regras',
    'Volume de Exceções','Potencial de Automação','Urgência','Complexidade do Processo',
    'Status da Iniciativa','Tipo de Melhoria','Prioridade'
  ) LOOP
    lst := CASE r.categoria
      WHEN 'Sistemas Utilizados' THEN ARRAY['SAP','Salesforce','ServiceNow','Excel','E-mail','SharePoint','Power BI','Outro']
      WHEN 'Desperdícios Lean'   THEN ARRAY['Espera','Retrabalho','Transporte','Movimentação','Estoque','Superprodução','Processamento Excessivo','Talentos Não Aproveitados']
      WHEN 'Integrações'         THEN ARRAY['SAP','Salesforce','ServiceNow','Power BI','SharePoint','Outros']
      WHEN 'Quantidade de Regras'THEN ARRAY['Até 3','4 a 10','11 a 20','21 a 50','Mais de 50']
      WHEN 'Volume de Exceções'  THEN ARRAY['Nenhuma','Poucas','Moderadas','Muitas','Muito elevadas']
      WHEN 'Potencial de Automação' THEN ARRAY['Baixo','Médio','Alto']
      WHEN 'Urgência'            THEN ARRAY['Baixa','Média','Alta','Crítica']
      WHEN 'Complexidade do Processo' THEN ARRAY['Baixa','Média','Alta','Muito Alta']
      WHEN 'Status da Iniciativa'THEN ARRAY['Backlog','Em Análise','Planejada','Em Execução','Em Validação','Concluída','Cancelada']
      WHEN 'Tipo de Melhoria'    THEN ARRAY['Otimização','Automação','Padronização','Eliminação de Desperdício','Quick Win','Projeto Estratégico']
      WHEN 'Prioridade'          THEN ARRAY['Baixa','Média','Alta','Crítica']
    END;
    i := 1;
    FOREACH v IN ARRAY lst LOOP
      IF NOT EXISTS (SELECT 1 FROM public.picklist_valores WHERE picklist_id = r.id AND valor = v) THEN
        INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo) VALUES (r.id, v, i, true);
      END IF;
      i := i + 1;
    END LOOP;
  END LOOP;
END $$;
