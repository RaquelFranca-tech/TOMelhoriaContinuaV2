CREATE TABLE IF NOT EXISTS public.user_session_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text,
  evento text NOT NULL CHECK (evento IN ('login','logoff')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.user_session_log TO authenticated;
GRANT ALL ON public.user_session_log TO service_role;
ALTER TABLE public.user_session_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Usuário registra própria sessão" ON public.user_session_log;
CREATE POLICY "Usuário registra própria sessão"
ON public.user_session_log
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Admin lê logs de sessão" ON public.user_session_log;
CREATE POLICY "Admin lê logs de sessão"
ON public.user_session_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Usuário lê próprio log de sessão" ON public.user_session_log;
CREATE POLICY "Usuário lê próprio log de sessão"
ON public.user_session_log
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);