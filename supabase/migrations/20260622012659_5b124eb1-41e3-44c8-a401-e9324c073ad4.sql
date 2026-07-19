REVOKE ALL ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid) FROM anon;
REVOKE ALL ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.converter_iniciativa_para_microprocesso(uuid, uuid) TO service_role;