CREATE OR REPLACE FUNCTION public.converter_iniciativa_para_microprocesso(_iniciativa_id uuid, _destino_iniciativa_id uuid, _actor_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_ini public.iniciativas%ROWTYPE;
  v_novo_id uuid;
BEGIN
  IF _actor_id IS NULL OR NOT public.can_edit(_actor_id) THEN
    RAISE EXCEPTION 'Você não tem permissão para converter iniciativas.';
  END IF;

  IF _iniciativa_id IS NULL OR _destino_iniciativa_id IS NULL THEN
    RAISE EXCEPTION 'Informe a iniciativa de origem e a iniciativa de destino.';
  END IF;

  IF _iniciativa_id = _destino_iniciativa_id THEN
    RAISE EXCEPTION 'A iniciativa de destino deve ser diferente da iniciativa convertida.';
  END IF;

  SELECT * INTO v_ini
  FROM public.iniciativas
  WHERE id = _iniciativa_id
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Iniciativa de origem não encontrada.';
  END IF;

  PERFORM 1
  FROM public.iniciativas
  WHERE id = _destino_iniciativa_id
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Iniciativa de destino não encontrada.';
  END IF;

  INSERT INTO public.microprocessos (
    iniciativa_id,
    titulo,
    descricao,
    status,
    prioridade,
    responsavel_id,
    sponsor_id,
    lider_id,
    data_inicio,
    data_fim_prevista,
    data_fim_real,
    percentual_avanco,
    saving_previsto,
    hc_atual,
    created_by
  ) VALUES (
    _destino_iniciativa_id,
    v_ini.titulo,
    v_ini.descricao,
    COALESCE(v_ini.status, 'Não iniciado'),
    v_ini.prioridade,
    v_ini.responsavel_id,
    v_ini.sponsor_id,
    v_ini.lider_id,
    v_ini.data_inicio,
    v_ini.data_fim_prevista,
    v_ini.data_fim_real,
    v_ini.percentual_avanco,
    v_ini.saving_previsto,
    v_ini.hc_atual,
    _actor_id
  )
  RETURNING id INTO v_novo_id;

  UPDATE public.tarefas
  SET iniciativa_id = _destino_iniciativa_id,
      microprocesso_id = v_novo_id
  WHERE iniciativa_id = _iniciativa_id;

  UPDATE public.anexos
  SET iniciativa_id = NULL,
      microprocesso_id = v_novo_id
  WHERE iniciativa_id = _iniciativa_id;

  UPDATE public.iniciativas
  SET deleted_at = now()
  WHERE id = _iniciativa_id;

  RETURN v_novo_id;
END;
$$;

REVOKE ALL ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid, uuid) FROM anon;
REVOKE ALL ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid, uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid, uuid) TO service_role;