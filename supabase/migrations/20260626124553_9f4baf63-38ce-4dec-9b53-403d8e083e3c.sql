
-- 1. Consolidar duplicatas
DO $$
DECLARE
  pair RECORD;
  v_canon uuid;
  v_alias uuid;
  v_max_ord int;
BEGIN
  FOR pair IN
    SELECT * FROM (VALUES
      ('Status da Iniciativa', 'Status de Iniciativa'),
      ('Status da Iniciativa', 'Status Iniciativa'),
      ('Tipo de Melhoria', 'Tipo Melhoria'),
      ('Tipo de Melhoria', 'Tipos de Melhoria'),
      ('Prioridade', 'Prioridades')
    ) AS t(canonica, alias)
  LOOP
    SELECT id INTO v_canon FROM public.picklists WHERE categoria = pair.canonica;
    SELECT id INTO v_alias FROM public.picklists WHERE categoria = pair.alias;
    IF v_canon IS NULL OR v_alias IS NULL OR v_canon = v_alias THEN CONTINUE; END IF;
    SELECT COALESCE(MAX(ordem),0) INTO v_max_ord FROM public.picklist_valores WHERE picklist_id = v_canon;
    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, cor, ativo)
    SELECT v_canon, av.valor, v_max_ord + ROW_NUMBER() OVER (ORDER BY av.ordem), av.cor, av.ativo
    FROM public.picklist_valores av
    WHERE av.picklist_id = v_alias
      AND NOT EXISTS (
        SELECT 1 FROM public.picklist_valores cv
        WHERE cv.picklist_id = v_canon AND lower(trim(cv.valor)) = lower(trim(av.valor))
      );
    DELETE FROM public.picklists WHERE id = v_alias;
  END LOOP;
END $$;

-- 2. Garantir que TODAS as categorias usadas no sistema existam
INSERT INTO public.picklists (categoria, descricao)
SELECT cat, 'Campo de sistema'
FROM (VALUES
  ('Vice-Presidência'),('Diretoria'),('Gerência'),('Áreas'),('Gestor Responsável'),
  ('Analista Responsável'),('Cliente do Processo'),('Processo'),
  ('Status da Iniciativa'),('Status de Projeto'),('Status de Microprocesso'),('Status da Tarefa'),
  ('Tipo de Melhoria'),('Prioridade'),('Urgência'),
  ('Categorias de Dor'),('Frequências'),('Sistemas Utilizados'),('Desperdícios Lean'),
  ('Sistemas Paralelos'),('Alternância de Telas'),('Locais de Consulta'),('Passos Manuais'),
  ('Local das Planilhas'),('Integrações'),('Quantidade de Regras'),('Volume de Exceções'),
  ('Complexidade do Processo')
) AS x(cat)
ON CONFLICT (categoria) DO NOTHING;

-- 3. Seed automático de Gerência / Vice-Presidência / Analista Responsável / Gestor Responsável
-- a partir dos perfis existentes (apenas quando ainda não houver valor)
DO $$
DECLARE
  pl uuid; v RECORD; n int;
BEGIN
  -- Gerência
  SELECT id INTO pl FROM public.picklists WHERE categoria='Gerência';
  SELECT count(*) INTO n FROM public.picklist_valores WHERE picklist_id=pl AND ativo;
  IF n = 0 THEN
    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    SELECT pl, gerencia, ROW_NUMBER() OVER (ORDER BY gerencia), true
    FROM (
      SELECT DISTINCT gerencia FROM public.profiles WHERE gerencia IS NOT NULL AND trim(gerencia)<>''
      UNION
      SELECT DISTINCT gerencia FROM public.iniciativas WHERE gerencia IS NOT NULL AND trim(gerencia)<>''
    ) s WHERE gerencia IS NOT NULL;
  END IF;

  -- Vice-Presidência
  SELECT id INTO pl FROM public.picklists WHERE categoria='Vice-Presidência';
  SELECT count(*) INTO n FROM public.picklist_valores WHERE picklist_id=pl AND ativo;
  IF n < 3 THEN
    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    SELECT pl, vp, ROW_NUMBER() OVER (ORDER BY vp), true
    FROM (
      SELECT DISTINCT vice_presidencia AS vp FROM public.profiles WHERE vice_presidencia IS NOT NULL AND trim(vice_presidencia)<>''
      UNION
      SELECT DISTINCT vice_presidencia FROM public.iniciativas WHERE vice_presidencia IS NOT NULL AND trim(vice_presidencia)<>''
    ) s
    WHERE NOT EXISTS (SELECT 1 FROM public.picklist_valores pv WHERE pv.picklist_id=pl AND lower(pv.valor)=lower(s.vp));
  END IF;

  -- Analista Responsável
  SELECT id INTO pl FROM public.picklists WHERE categoria='Analista Responsável';
  SELECT count(*) INTO n FROM public.picklist_valores WHERE picklist_id=pl AND ativo;
  IF n = 0 THEN
    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    SELECT pl, nome, ROW_NUMBER() OVER (ORDER BY nome), true
    FROM (SELECT DISTINCT nome FROM public.profiles WHERE nome IS NOT NULL) s;
  END IF;

  -- Gestor Responsável  
  SELECT id INTO pl FROM public.picklists WHERE categoria='Gestor Responsável';
  SELECT count(*) INTO n FROM public.picklist_valores WHERE picklist_id=pl AND ativo;
  IF n < 3 THEN
    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    SELECT pl, nome, ROW_NUMBER() OVER (ORDER BY nome), true
    FROM (SELECT DISTINCT nome FROM public.profiles WHERE nome IS NOT NULL) s
    WHERE NOT EXISTS (SELECT 1 FROM public.picklist_valores pv WHERE pv.picklist_id=pl AND lower(pv.valor)=lower(s.nome));
  END IF;
END $$;
