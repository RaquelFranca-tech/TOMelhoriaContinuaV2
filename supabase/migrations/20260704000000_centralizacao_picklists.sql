-- =====================================================
-- CENTRALIZAÇÃO E SINCRONIZAÇÃO GLOBAL DE PICKLISTS
-- =====================================================

-- 1. Remover chaves estrangeiras que apontam para public.profiles
ALTER TABLE public.iniciativas DROP CONSTRAINT IF EXISTS iniciativas_sponsor_id_fkey CASCADE;
ALTER TABLE public.iniciativas DROP CONSTRAINT IF EXISTS iniciativas_lider_id_fkey CASCADE;
ALTER TABLE public.iniciativas DROP CONSTRAINT IF EXISTS iniciativas_analista_id_fkey CASCADE;
ALTER TABLE public.iniciativas DROP CONSTRAINT IF EXISTS iniciativas_responsavel_id_fkey CASCADE;

ALTER TABLE public.acoes DROP CONSTRAINT IF EXISTS acoes_responsavel_id_fkey CASCADE;
ALTER TABLE public.tarefas DROP CONSTRAINT IF EXISTS tarefas_responsavel_id_fkey CASCADE;
ALTER TABLE public.macroprocessos DROP CONSTRAINT IF EXISTS macroprocessos_responsavel_id_fkey CASCADE;
ALTER TABLE public.processos DROP CONSTRAINT IF EXISTS processos_responsavel_id_fkey CASCADE;
ALTER TABLE public.riscos DROP CONSTRAINT IF EXISTS riscos_responsavel_id_fkey CASCADE;
ALTER TABLE public.kaizen DROP CONSTRAINT IF EXISTS kaizen_responsavel_id_fkey CASCADE;

-- 2. Alterar o tipo das colunas para TEXT para armazenar diretamente os nomes das picklists
ALTER TABLE public.iniciativas ALTER COLUMN sponsor_id TYPE TEXT USING sponsor_id::TEXT;
ALTER TABLE public.iniciativas ALTER COLUMN lider_id TYPE TEXT USING lider_id::TEXT;
ALTER TABLE public.iniciativas ALTER COLUMN analista_id TYPE TEXT USING analista_id::TEXT;
ALTER TABLE public.iniciativas ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;

ALTER TABLE public.acoes ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;
ALTER TABLE public.tarefas ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;
ALTER TABLE public.macroprocessos ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;
ALTER TABLE public.processos ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;
ALTER TABLE public.riscos ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;
ALTER TABLE public.kaizen ALTER COLUMN responsavel_id TYPE TEXT USING responsavel_id::TEXT;

-- 3. Adicionar novas colunas de texto para os novos campos de picklist do formulário
ALTER TABLE public.iniciativas ADD COLUMN IF NOT EXISTS vice_presidente TEXT;
ALTER TABLE public.iniciativas ADD COLUMN IF NOT EXISTS diretor TEXT;
ALTER TABLE public.iniciativas ADD COLUMN IF NOT EXISTS gerente TEXT;
ALTER TABLE public.iniciativas ADD COLUMN IF NOT EXISTS papel TEXT;
ALTER TABLE public.iniciativas ADD COLUMN IF NOT EXISTS area TEXT;

-- 4. Garantir que todas as categorias canônicas de picklists existam
INSERT INTO public.picklists (categoria, descricao) VALUES
  ('Sponsor', 'Sponsor da iniciativa'),
  ('Líder', 'Líder da iniciativa'),
  ('Analista', 'Analista da iniciativa'),
  ('Perfil Vinculado', 'Perfil ou responsável vinculado'),
  ('Diretoria', 'Diretoria organizadora'),
  ('Diretor(a)', 'Diretor(a) responsável'),
  ('Gerência', 'Gerência organizadora'),
  ('Gerente', 'Gerente responsável'),
  ('Vice-Presidência', 'Vice-Presidência'),
  ('Vice-Presidente', 'Vice-Presidente responsável'),
  ('Área', 'Área ou departamento'),
  ('Papel', 'Papel ou função na equipe'),
  ('Status da Iniciativa', 'Status da Iniciativa')
ON CONFLICT (categoria) DO NOTHING;

-- 5. Seeding inicial para as novas picklists a partir dos nomes de perfis ou de dados existentes
DO $$
DECLARE
  pl_sponsor uuid;
  pl_lider uuid;
  pl_analista uuid;
  pl_perfil uuid;
  pl_diretor uuid;
  pl_gerente uuid;
  pl_vp uuid;
  pl_papel uuid;
  pl_area uuid;
  rec RECORD;
BEGIN
  -- Buscar IDs das picklists
  SELECT id INTO pl_sponsor FROM public.picklists WHERE categoria = 'Sponsor';
  SELECT id INTO pl_lider FROM public.picklists WHERE categoria = 'Líder';
  SELECT id INTO pl_analista FROM public.picklists WHERE categoria = 'Analista';
  SELECT id INTO pl_perfil FROM public.picklists WHERE categoria = 'Perfil Vinculado';
  SELECT id INTO pl_diretor FROM public.picklists WHERE categoria = 'Diretor(a)';
  SELECT id INTO pl_gerente FROM public.picklists WHERE categoria = 'Gerente';
  SELECT id INTO pl_vp FROM public.picklists WHERE categoria = 'Vice-Presidente';
  SELECT id INTO pl_papel FROM public.picklists WHERE categoria = 'Papel';
  SELECT id INTO pl_area FROM public.picklists WHERE categoria = 'Área';

  -- Seed de nomes a partir dos perfis cadastrados
  FOR rec IN SELECT DISTINCT nome FROM public.profiles WHERE nome IS NOT NULL AND trim(nome) <> '' LOOP
    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_sponsor, rec.nome, 0, true) ON CONFLICT DO NOTHING;

    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_lider, rec.nome, 0, true) ON CONFLICT DO NOTHING;

    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_analista, rec.nome, 0, true) ON CONFLICT DO NOTHING;

    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_perfil, rec.nome, 0, true) ON CONFLICT DO NOTHING;

    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_diretor, rec.nome, 0, true) ON CONFLICT DO NOTHING;

    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_gerente, rec.nome, 0, true) ON CONFLICT DO NOTHING;

    INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo)
    VALUES (pl_vp, rec.nome, 0, true) ON CONFLICT DO NOTHING;
  END LOOP;

  -- Seed de papéis comuns
  INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo) VALUES
    (pl_papel, 'Sponsor', 1, true),
    (pl_papel, 'P.O.', 2, true),
    (pl_papel, 'Analista', 3, true),
    (pl_papel, 'Líder', 4, true),
    (pl_papel, 'Desenvolvedor', 5, true)
  ON CONFLICT DO NOTHING;

  -- Seed de áreas
  INSERT INTO public.picklist_valores (picklist_id, valor, ordem, ativo) VALUES
    (pl_area, 'TI', 1, true),
    (pl_area, 'Operações', 2, true),
    (pl_area, 'Financeiro', 3, true),
    (pl_area, 'RH', 4, true),
    (pl_area, 'Comercial', 5, true)
  ON CONFLICT DO NOTHING;
END $$;
