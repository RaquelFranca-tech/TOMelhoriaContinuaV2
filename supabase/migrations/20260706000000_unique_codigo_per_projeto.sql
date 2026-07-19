-- Drop the global unique constraint on iniciativas.codigo and replace it with a per-project unique constraint
ALTER TABLE public.iniciativas DROP CONSTRAINT IF EXISTS iniciativas_codigo_key;
DROP INDEX IF EXISTS public.iniciativas_codigo_key;

-- Add a unique constraint for the combination of (projeto_id, codigo)
ALTER TABLE public.iniciativas ADD CONSTRAINT iniciativas_projeto_codigo_key UNIQUE (projeto_id, codigo);
