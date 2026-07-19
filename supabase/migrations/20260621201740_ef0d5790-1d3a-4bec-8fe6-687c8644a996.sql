ALTER TABLE public.tarefas ADD COLUMN IF NOT EXISTS diretoria text;
ALTER TABLE public.tarefas ALTER COLUMN iniciativa_id DROP NOT NULL;