
-- ============================================================
-- Reestruturação Hierárquica: Projeto -> Iniciativa -> Tarefa
-- ============================================================

-- 1) Renomear macroprocessos -> projetos
ALTER TABLE public.macroprocessos RENAME TO projetos;

-- 2) Adicionar projeto_id em iniciativas e popular a partir de processos
ALTER TABLE public.iniciativas ADD COLUMN IF NOT EXISTS projeto_id uuid;

UPDATE public.iniciativas i
SET projeto_id = p.macroprocesso_id
FROM public.processos p
WHERE p.id = i.processo_id AND i.projeto_id IS NULL;

-- Para iniciativas órfãs (sem processo válido), atribuir ao primeiro projeto disponível
UPDATE public.iniciativas
SET projeto_id = (SELECT id FROM public.projetos WHERE deleted_at IS NULL ORDER BY created_at LIMIT 1)
WHERE projeto_id IS NULL;

-- Tornar projeto_id NOT NULL e dropar processo_id
ALTER TABLE public.iniciativas ALTER COLUMN projeto_id SET NOT NULL;
ALTER TABLE public.iniciativas DROP COLUMN IF EXISTS processo_id;

-- 3) Atualizar mc3_registros.processo_id -> projeto_id
ALTER TABLE public.mc3_registros ADD COLUMN IF NOT EXISTS projeto_id uuid;
UPDATE public.mc3_registros m
SET projeto_id = p.macroprocesso_id
FROM public.processos p
WHERE p.id = m.processo_id AND m.projeto_id IS NULL;
ALTER TABLE public.mc3_registros DROP COLUMN IF EXISTS processo_id;

-- 4) Dropar tabela processos (nível removido)
DROP TABLE IF EXISTS public.processos CASCADE;

-- 5) Unificar acoes + tarefas em tarefas
-- A tabela tarefas atual (subtarefas, vazia) é descartada;
-- acoes é renomeada para tarefas e ganha campos extras.
DROP TABLE IF EXISTS public.tarefas CASCADE;
ALTER TABLE public.acoes RENAME TO tarefas;

-- Adicionar colunas que vieram da antiga tarefas
ALTER TABLE public.tarefas ADD COLUMN IF NOT EXISTS prioridade text;
ALTER TABLE public.tarefas ADD COLUMN IF NOT EXISTS checklist jsonb DEFAULT '[]'::jsonb;

-- 6) Recriar RLS / policies para tarefas (herdadas da antiga acoes precisam ser revistas)
-- As policies da antiga 'acoes' continuam ativas na tabela renomeada,
-- mas garantimos GRANTs e RLS:
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tarefas TO authenticated;
GRANT ALL ON public.tarefas TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projetos TO authenticated;
GRANT ALL ON public.projetos TO service_role;

ALTER TABLE public.tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projetos ENABLE ROW LEVEL SECURITY;

-- 7) Índices úteis
CREATE INDEX IF NOT EXISTS idx_iniciativas_projeto_id ON public.iniciativas(projeto_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_tarefas_iniciativa_id ON public.tarefas(iniciativa_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_mc3_projeto_id ON public.mc3_registros(projeto_id);
