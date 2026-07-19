
-- ============================================================
-- FASE 1: Fundação Microprocesso + Tarefas/Anexos
-- ============================================================

-- 1) Sequence + tabela microprocessos
CREATE SEQUENCE IF NOT EXISTS public.microprocesso_codigo_seq START 1;

CREATE TABLE IF NOT EXISTS public.microprocessos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  iniciativa_id uuid NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  codigo text UNIQUE,
  titulo text NOT NULL,
  descricao text,
  objetivo text,
  justificativa text,
  escopo text,
  area_responsavel text,
  responsavel_id uuid,
  sponsor_id uuid,
  lider_id uuid,
  status text DEFAULT 'Não iniciado',
  prioridade text,
  categoria text,
  -- benefícios esperados (jsonb flexível)
  beneficios jsonb DEFAULT '{}'::jsonb,
  -- indicadores
  baseline_atual numeric,
  meta_futura numeric,
  valor_atual numeric,
  valor_projetado numeric,
  percentual_evolucao numeric,
  -- cronograma
  data_inicio date,
  data_fim_prevista date,
  data_fim_real date,
  marcos jsonb DEFAULT '[]'::jsonb,
  -- progresso (calculado)
  percentual_avanco numeric DEFAULT 0,
  -- equipe / áreas
  participantes jsonb DEFAULT '[]'::jsonb,
  areas_envolvidas jsonb DEFAULT '[]'::jsonb,
  -- mapeamento AS IS
  asis_fluxo text,
  asis_entradas text,
  asis_saidas text,
  asis_sistemas jsonb DEFAULT '[]'::jsonb,
  asis_fornecedores text,
  asis_clientes text,
  asis_areas text,
  asis_gargalos text,
  asis_retrabalhos text,
  asis_esperas text,
  asis_problemas text,
  -- mapeamento TO BE
  tobe_fluxo text,
  tobe_melhorias text,
  tobe_automacoes text,
  tobe_ia text,
  tobe_eliminacoes text,
  tobe_simplificacoes text,
  -- SIPOC
  sipoc_suppliers text,
  sipoc_inputs text,
  sipoc_process text,
  sipoc_outputs text,
  sipoc_customers text,
  -- Diagnóstico
  diag_problema text,
  diag_causa_raiz text,
  diag_impacto text,
  diag_oportunidade text,
  diag_risco text,
  -- Indicadores operacionais
  lead_time_atual numeric,
  lead_time_futuro numeric,
  volume_atual numeric,
  volume_futuro numeric,
  hc_atual numeric,
  hc_futuro numeric,
  custo_atual numeric,
  custo_futuro numeric,
  saving_previsto numeric,
  -- extras / livre
  extras jsonb DEFAULT '{}'::jsonb,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_microprocessos_iniciativa ON public.microprocessos(iniciativa_id);
CREATE INDEX IF NOT EXISTS idx_microprocessos_status ON public.microprocessos(status);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.microprocessos TO authenticated;
GRANT ALL ON public.microprocessos TO service_role;

ALTER TABLE public.microprocessos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "microprocessos_select_auth" ON public.microprocessos
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "microprocessos_insert_editor" ON public.microprocessos
  FOR INSERT TO authenticated WITH CHECK (public.can_edit(auth.uid()));
CREATE POLICY "microprocessos_update_editor" ON public.microprocessos
  FOR UPDATE TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE POLICY "microprocessos_delete_admin" ON public.microprocessos
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Auto código + updated_at
CREATE OR REPLACE FUNCTION public.tg_microprocesso_codigo()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := 'MP-' || lpad(nextval('public.microprocesso_codigo_seq')::text, 5, '0');
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER tg_microprocessos_codigo BEFORE INSERT ON public.microprocessos
  FOR EACH ROW EXECUTE FUNCTION public.tg_microprocesso_codigo();

CREATE TRIGGER tg_microprocessos_updated_at BEFORE UPDATE ON public.microprocessos
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 2) tarefas: add microprocesso_id + observacoes
ALTER TABLE public.tarefas
  ADD COLUMN IF NOT EXISTS microprocesso_id uuid REFERENCES public.microprocessos(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS observacoes text;

CREATE INDEX IF NOT EXISTS idx_tarefas_microprocesso ON public.tarefas(microprocesso_id);

-- Validação: se microprocesso_id informado, deve pertencer à mesma iniciativa
CREATE OR REPLACE FUNCTION public.tg_tarefa_validar_microprocesso()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE v_ini uuid;
BEGIN
  IF NEW.microprocesso_id IS NOT NULL THEN
    IF NEW.iniciativa_id IS NULL THEN
      RAISE EXCEPTION 'É obrigatório selecionar uma Iniciativa antes de selecionar um Microprocesso.';
    END IF;
    SELECT iniciativa_id INTO v_ini FROM public.microprocessos WHERE id = NEW.microprocesso_id;
    IF v_ini IS DISTINCT FROM NEW.iniciativa_id THEN
      RAISE EXCEPTION 'O Microprocesso selecionado não pertence à Iniciativa informada.';
    END IF;
  END IF;
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS tg_tarefas_valida_micro ON public.tarefas;
CREATE TRIGGER tg_tarefas_valida_micro
  BEFORE INSERT OR UPDATE ON public.tarefas
  FOR EACH ROW EXECUTE FUNCTION public.tg_tarefa_validar_microprocesso();

-- 3) anexos: add microprocesso_id (mantém iniciativa_id, tarefa_id, acao_id existentes)
ALTER TABLE public.anexos
  ADD COLUMN IF NOT EXISTS microprocesso_id uuid REFERENCES public.microprocessos(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_anexos_microprocesso ON public.anexos(microprocesso_id);
