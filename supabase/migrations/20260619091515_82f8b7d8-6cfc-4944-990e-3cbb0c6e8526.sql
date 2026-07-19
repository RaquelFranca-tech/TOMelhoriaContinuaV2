GRANT EXECUTE ON FUNCTION public.can_edit(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

DROP POLICY IF EXISTS "Admin atualiza profiles" ON public.profiles;
CREATE POLICY "Admin atualiza profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.app_configuracoes (
  chave text PRIMARY KEY,
  valor jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_configuracoes TO authenticated;
GRANT ALL ON public.app_configuracoes TO service_role;
ALTER TABLE public.app_configuracoes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Config leitura autenticada" ON public.app_configuracoes;
CREATE POLICY "Config leitura autenticada"
ON public.app_configuracoes
FOR SELECT
TO authenticated
USING (true);
DROP POLICY IF EXISTS "Config admin edita" ON public.app_configuracoes;
CREATE POLICY "Config admin edita"
ON public.app_configuracoes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP TRIGGER IF EXISTS set_app_configuracoes_updated_at ON public.app_configuracoes;
CREATE TRIGGER set_app_configuracoes_updated_at
BEFORE UPDATE ON public.app_configuracoes
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

INSERT INTO public.app_configuracoes (chave, valor)
SELECT 'rodape', jsonb_build_object('texto', 'Transformação Digital · Eficiência Operacional · Melhoria Contínua · Desenvolvido por Raquel França · TO — Escritório de Transformação')
WHERE NOT EXISTS (SELECT 1 FROM public.app_configuracoes WHERE chave = 'rodape');

WITH defs(categoria, valores) AS (
  VALUES
    ('Status Iniciativa', ARRAY['Nova Iniciativa','Em Diagnóstico','Desenvolvimento da Solução','Sprints – Dev da Solução','Deploy – Entrega','Concluída','Cancelada']),
    ('Prioridades', ARRAY['Crítica','Alta','Média','Baixa']),
    ('Tipos de Melhoria', ARRAY['Automação','Processo','TI','Compliance','Pessoas','Custo','Qualidade']),
    ('Áreas', ARRAY['CX','Financeiro','TI','Supply','RH','Jurídico','Operações','Marketing']),
    ('Categorias de Dor', ARRAY['Retrabalho','Desperdício','Atraso','Custo Excessivo','Erro Humano','Compliance','Gargalo']),
    ('Frequências', ARRAY['Diária','Semanal','Mensal','Esporádica']),
    ('Sistemas', ARRAY['SAP','Salesforce','ServiceNow','Excel','E-mail','SharePoint','Power BI','Outro']),
    ('Potencial de Automação', ARRAY['Alto','Médio','Baixo','Nenhum']),
    ('Complexidade da Automação', ARRAY['Muito Baixa','Baixa','Média','Alta','Muito Alta']),
    ('Diretoria', ARRAY['Operações','TI','RH','Financeiro','Comercial','Suprimentos','Jurídico','Marketing']),
    ('Função', ARRAY['Analista','Especialista','Coordenador','Gerente','Diretor','Consultor','Estagiário']),
    ('Papel no Projeto', ARRAY['Sponsor','Líder','Analista','Gestor Responsável','Stakeholder','Time de Apoio','Especialista']),
    ('Status de Participação', ARRAY['Ativo','Pausado','Encerrado','Aguardando']),
    ('Responsabilidades', ARRAY['Aprovação','Execução','Consulta','Informação','Suporte','Validação']),
    ('Nível Vibra', ARRAY['Diretor','Gerente Executivo','Gerente','Coordenador','Especialista','Analista Sr','Analista Pl','Analista Jr','Estagiário']),
    ('Nível Parceiros', ARRAY['Partner','Senior Manager','Manager','Consultor Sr','Consultor Pl','Consultor Jr']),
    ('Parceiros', ARRAY['Vibra','Accenture','Deloitte','EY','KPMG','PwC','IBM','Outro']),
    ('Tags', ARRAY['Decisor','Influenciador','Aprovador','Executor','Bloqueador','Risco','VIP']),
    ('KPI Humano MC³', ARRAY['Participação ativa','Presença em ritos','Ações concluídas','Ações no prazo','Ações atrasadas','Colaboração','Suporte ao time','Decisões registradas','Impedimentos removidos','Kaizens propostos','Kaizens implementados','Conhecimento compartilhado','Pontualidade','Qualidade de entrega','Engajamento','Influência positiva','Evolução MC³'])
)
INSERT INTO public.picklists (categoria, descricao)
SELECT d.categoria, 'Picklist obrigatória do sistema'
FROM defs d
WHERE NOT EXISTS (SELECT 1 FROM public.picklists p WHERE p.categoria = d.categoria);

WITH defs(categoria, valores) AS (
  VALUES
    ('Status Iniciativa', ARRAY['Nova Iniciativa','Em Diagnóstico','Desenvolvimento da Solução','Sprints – Dev da Solução','Deploy – Entrega','Concluída','Cancelada']),
    ('Prioridades', ARRAY['Crítica','Alta','Média','Baixa']),
    ('Tipos de Melhoria', ARRAY['Automação','Processo','TI','Compliance','Pessoas','Custo','Qualidade']),
    ('Áreas', ARRAY['CX','Financeiro','TI','Supply','RH','Jurídico','Operações','Marketing']),
    ('Categorias de Dor', ARRAY['Retrabalho','Desperdício','Atraso','Custo Excessivo','Erro Humano','Compliance','Gargalo']),
    ('Frequências', ARRAY['Diária','Semanal','Mensal','Esporádica']),
    ('Sistemas', ARRAY['SAP','Salesforce','ServiceNow','Excel','E-mail','SharePoint','Power BI','Outro']),
    ('Potencial de Automação', ARRAY['Alto','Médio','Baixo','Nenhum']),
    ('Complexidade da Automação', ARRAY['Muito Baixa','Baixa','Média','Alta','Muito Alta']),
    ('Diretoria', ARRAY['Operações','TI','RH','Financeiro','Comercial','Suprimentos','Jurídico','Marketing']),
    ('Função', ARRAY['Analista','Especialista','Coordenador','Gerente','Diretor','Consultor','Estagiário']),
    ('Papel no Projeto', ARRAY['Sponsor','Líder','Analista','Gestor Responsável','Stakeholder','Time de Apoio','Especialista']),
    ('Status de Participação', ARRAY['Ativo','Pausado','Encerrado','Aguardando']),
    ('Responsabilidades', ARRAY['Aprovação','Execução','Consulta','Informação','Suporte','Validação']),
    ('Nível Vibra', ARRAY['Diretor','Gerente Executivo','Gerente','Coordenador','Especialista','Analista Sr','Analista Pl','Analista Jr','Estagiário']),
    ('Nível Parceiros', ARRAY['Partner','Senior Manager','Manager','Consultor Sr','Consultor Pl','Consultor Jr']),
    ('Parceiros', ARRAY['Vibra','Accenture','Deloitte','EY','KPMG','PwC','IBM','Outro']),
    ('Tags', ARRAY['Decisor','Influenciador','Aprovador','Executor','Bloqueador','Risco','VIP']),
    ('KPI Humano MC³', ARRAY['Participação ativa','Presença em ritos','Ações concluídas','Ações no prazo','Ações atrasadas','Colaboração','Suporte ao time','Decisões registradas','Impedimentos removidos','Kaizens propostos','Kaizens implementados','Conhecimento compartilhado','Pontualidade','Qualidade de entrega','Engajamento','Influência positiva','Evolução MC³'])
)
INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
SELECT p.id, v.valor, v.ordem::int, true
FROM defs d
JOIN public.picklists p ON p.categoria = d.categoria
CROSS JOIN LATERAL unnest(d.valores) WITH ORDINALITY AS v(valor, ordem)
WHERE NOT EXISTS (
  SELECT 1 FROM public.picklist_valores pv
  WHERE pv.picklist_id = p.id AND pv.valor = v.valor
);

WITH defs(nome, descricao, expressao, contexto) AS (
  VALUES
    ('Score Inteligente','Priorização consolidada','(ImpNeg×25 + ImpCli×15 + ImpFin×25 + Auto×15 + Vol×10 + ROI×10) − (Esforço×10 + Complex×10)','Iniciativas'),
    ('FTE / HC Liberado','Conversão de horas economizadas em capacidade','HC_Liberado = Horas Economizadas / 176','Ganhos'),
    ('ROI','Retorno sobre investimento','ROI = (Economia Anual − Custo Impl.) / Custo Impl. × 100','Financeiro'),
    ('Risco Operacional','Pontuação de risco operacional','(Dep.Pessoa×3) + (Sem Substituto×2) + (Tempo Treino×0,5)','Riscos'),
    ('Índice de Qualidade','Qualidade ponderada por erro e retrabalho','(1 − TaxaErro/100) × (1 − Retrabalho/100) × 100','Qualidade'),
    ('Complexidade da Automação','Complexidade técnica e operacional','(Sistemas×1)+(Integrações×2)+(Regras×2)+(Exceções×2)+(QualDados×1)+(DepHumana×1)+(FreqMudanças×1)+(Criticidade×2)+(Compliance×2)+(EsforçoTéc×3)','Automação'),
    ('GTESG00207','Nota por meta e realizado','Nota = ((Meta − Real) / Meta) × 100 + 100','Indicadores'),
    ('GTESG00208','Média dos valores pontuais','Nota = média dos valores pontuais','Indicadores'),
    ('Horas Desperdiçadas/Mês','Horas perdidas por volume mensal','(Ganho de Tempo / 60) × Execuções por Mês','Tempo'),
    ('Tempo Médio Atual','Média simples entre mínimo e máximo','(Tempo Mín. + Tempo Máx.) / 2','Tempo'),
    ('Percentual de Redução','Redução percentual de tempo','((Tempo Atual − Tempo Futuro) / Tempo Atual) × 100','Tempo'),
    ('Economia Anual Estimada','Economia anual por horas e custo','Horas Economizadas × Custo por Hora × 12','Financeiro'),
    ('CEP (Coeficiente de Eng. de Performance)','Participação ativa no total','Participação Ativa / Total de Participantes × 100','MC³')
)
INSERT INTO public.formulas (nome, descricao, expressao, contexto, variaveis)
SELECT d.nome, d.descricao, d.expressao, d.contexto, '{}'::jsonb
FROM defs d
WHERE NOT EXISTS (SELECT 1 FROM public.formulas f WHERE f.nome = d.nome);

UPDATE public.formulas f
SET descricao = d.descricao, expressao = d.expressao, contexto = d.contexto
FROM (VALUES
    ('Score Inteligente','Priorização consolidada','(ImpNeg×25 + ImpCli×15 + ImpFin×25 + Auto×15 + Vol×10 + ROI×10) − (Esforço×10 + Complex×10)','Iniciativas'),
    ('FTE / HC Liberado','Conversão de horas economizadas em capacidade','HC_Liberado = Horas Economizadas / 176','Ganhos'),
    ('ROI','Retorno sobre investimento','ROI = (Economia Anual − Custo Impl.) / Custo Impl. × 100','Financeiro'),
    ('Risco Operacional','Pontuação de risco operacional','(Dep.Pessoa×3) + (Sem Substituto×2) + (Tempo Treino×0,5)','Riscos'),
    ('Índice de Qualidade','Qualidade ponderada por erro e retrabalho','(1 − TaxaErro/100) × (1 − Retrabalho/100) × 100','Qualidade'),
    ('Complexidade da Automação','Complexidade técnica e operacional','(Sistemas×1)+(Integrações×2)+(Regras×2)+(Exceções×2)+(QualDados×1)+(DepHumana×1)+(FreqMudanças×1)+(Criticidade×2)+(Compliance×2)+(EsforçoTéc×3)','Automação'),
    ('GTESG00207','Nota por meta e realizado','Nota = ((Meta − Real) / Meta) × 100 + 100','Indicadores'),
    ('GTESG00208','Média dos valores pontuais','Nota = média dos valores pontuais','Indicadores'),
    ('Horas Desperdiçadas/Mês','Horas perdidas por volume mensal','(Ganho de Tempo / 60) × Execuções por Mês','Tempo'),
    ('Tempo Médio Atual','Média simples entre mínimo e máximo','(Tempo Mín. + Tempo Máx.) / 2','Tempo'),
    ('Percentual de Redução','Redução percentual de tempo','((Tempo Atual − Tempo Futuro) / Tempo Atual) × 100','Tempo'),
    ('Economia Anual Estimada','Economia anual por horas e custo','Horas Economizadas × Custo por Hora × 12','Financeiro'),
    ('CEP (Coeficiente de Eng. de Performance)','Participação ativa no total','Participação Ativa / Total de Participantes × 100','MC³')
) AS d(nome, descricao, expressao, contexto)
WHERE f.nome = d.nome;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['macroprocessos','processos','iniciativas','acoes','tarefas','riscos','sipoc','asis_passos','tobe_passos','agenda','equipe','formulas','picklists','picklist_valores'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS audit_%I ON public.%I', t, t);
    EXECUTE format('CREATE TRIGGER audit_%I AFTER INSERT OR UPDATE OR DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.tg_audit_log()', t, t);
  END LOOP;
END $$;