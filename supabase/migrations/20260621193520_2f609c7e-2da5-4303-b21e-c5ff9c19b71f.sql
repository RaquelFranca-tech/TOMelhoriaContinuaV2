ALTER TABLE public.equipe
  ADD COLUMN IF NOT EXISTS projeto_id uuid REFERENCES public.projetos(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS extras jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS card_x integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS card_y integer NOT NULL DEFAULT 0;

ALTER TABLE public.indicadores
  ADD COLUMN IF NOT EXISTS projeto_id uuid REFERENCES public.projetos(id) ON DELETE SET NULL;

ALTER TABLE public.boards
  ADD COLUMN IF NOT EXISTS situacao text NOT NULL DEFAULT 'Rascunho',
  ADD COLUMN IF NOT EXISTS aba_destino text,
  ADD COLUMN IF NOT EXISTS concluido_em timestamptz;

CREATE INDEX IF NOT EXISTS idx_equipe_projeto_id ON public.equipe(projeto_id);
CREATE INDEX IF NOT EXISTS idx_indicadores_projeto_id ON public.indicadores(projeto_id);
CREATE INDEX IF NOT EXISTS idx_boards_situacao ON public.boards(situacao);

UPDATE public.equipe e
SET projeto_id = p.id
FROM public.projetos p
WHERE e.projeto_id IS NULL
  AND (
    lower(coalesce(e.papel_macroprocesso, '')) LIKE '%' || lower(split_part(p.nome, '—', 1)) || '%'
    OR lower(coalesce(e.papel_macroprocesso, '')) LIKE '%' || lower(p.nome) || '%'
  );

UPDATE public.indicadores i
SET projeto_id = ini.projeto_id
FROM public.iniciativas ini
WHERE i.projeto_id IS NULL AND i.iniciativa_id = ini.id;