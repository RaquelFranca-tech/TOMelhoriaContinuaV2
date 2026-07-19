
-- 1) Realtime nas picklists
ALTER PUBLICATION supabase_realtime ADD TABLE public.picklists;
ALTER PUBLICATION supabase_realtime ADD TABLE public.picklist_valores;

-- 2) Helper para converter CSV em text[] dentro de USING (sem subquery)
CREATE OR REPLACE FUNCTION public._csv_to_array(t text)
RETURNS text[]
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN t IS NULL OR btrim(t) = '' THEN NULL
    ELSE array_remove(
      array_agg(btrim(x)),
      ''
    )
  END
  FROM unnest(string_to_array(coalesce(t,''), ',')) AS x
$$;

DO $$
DECLARE
  col text;
  cols text[] := ARRAY['sistemas_paralelos','alternancia_telas','locais_consulta','passos_manuais','local_planilhas','cliente_processo'];
BEGIN
  FOREACH col IN ARRAY cols LOOP
    EXECUTE format(
      'ALTER TABLE public.iniciativas ALTER COLUMN %1$I TYPE text[] USING public._csv_to_array(%1$I)',
      col
    );
  END LOOP;
END $$;

DROP FUNCTION public._csv_to_array(text);

-- 3) Seed das picklists
INSERT INTO public.picklists (categoria, descricao)
VALUES
  ('Status de Iniciativa',       'Status do ciclo de vida das iniciativas'),
  ('Status de Projeto',          'Status do ciclo de vida dos projetos'),
  ('Status de Microprocesso',    'Status do ciclo de vida dos microprocessos'),
  ('Status da Tarefa',           'Status das tarefas'),
  ('Tipo de Melhoria',           'Tipologia de melhoria aplicada'),
  ('Gestor Responsável',         'Gestores responsáveis por iniciativas'),
  ('Analista Responsável',       'Analistas responsáveis por iniciativas'),
  ('Fornecedores',               'Fornecedores SIPOC'),
  ('Entradas',                   'Entradas SIPOC'),
  ('Processo',                   'Processos SIPOC'),
  ('Saídas',                     'Saídas SIPOC'),
  ('Clientes',                   'Clientes SIPOC'),
  ('Sistemas Paralelos',         'Sistemas paralelos consultados'),
  ('Alternância de Telas',       'Telas alternadas durante o processo'),
  ('Locais de Consulta',         'Locais consultados durante o processo'),
  ('Passos Manuais',             'Passos manuais executados'),
  ('Local das Planilhas',        'Locais onde as planilhas paralelas residem'),
  ('Cliente do Processo',        'Clientes/destinatários do processo')
ON CONFLICT (categoria) DO NOTHING;

-- 4) Valores iniciais (somente se a picklist estiver vazia)
WITH defaults(categoria, valor, ordem) AS (
  VALUES
    ('Status de Iniciativa','Não iniciado',1),
    ('Status de Iniciativa','Em Andamento',2),
    ('Status de Iniciativa','Em Risco',3),
    ('Status de Iniciativa','Atrasado',4),
    ('Status de Iniciativa','Concluído',5),
    ('Status de Iniciativa','Cancelado',6),
    ('Status de Projeto','Planejado',1),
    ('Status de Projeto','Em Andamento',2),
    ('Status de Projeto','Em Risco',3),
    ('Status de Projeto','Pausado',4),
    ('Status de Projeto','Concluído',5),
    ('Status de Projeto','Cancelado',6),
    ('Status de Microprocesso','Planejado',1),
    ('Status de Microprocesso','Em Execução',2),
    ('Status de Microprocesso','Em Risco',3),
    ('Status de Microprocesso','Atrasado',4),
    ('Status de Microprocesso','Concluído',5),
    ('Status da Tarefa','A Fazer',1),
    ('Status da Tarefa','Em Andamento',2),
    ('Status da Tarefa','Em Revisão',3),
    ('Status da Tarefa','Bloqueada',4),
    ('Status da Tarefa','Concluída',5),
    ('Tipo de Melhoria','Automação',1),
    ('Tipo de Melhoria','Padronização',2),
    ('Tipo de Melhoria','Eliminação de retrabalho',3),
    ('Tipo de Melhoria','Redução de tempo',4),
    ('Tipo de Melhoria','Redução de custo',5),
    ('Tipo de Melhoria','Compliance',6)
)
INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
SELECT p.id, d.valor, d.ordem, true
FROM defaults d
JOIN public.picklists p ON p.categoria = d.categoria
WHERE NOT EXISTS (
  SELECT 1 FROM public.picklist_valores v WHERE v.picklist_id = p.id
);
