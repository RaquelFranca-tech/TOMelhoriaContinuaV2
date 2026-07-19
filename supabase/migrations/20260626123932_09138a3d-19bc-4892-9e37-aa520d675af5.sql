
-- Helper: quem pode movimentar Kanban / mexer em tarefas (admin, líder, analista)
CREATE OR REPLACE FUNCTION public.can_move_kanban(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin')
      OR public.has_role(_user_id, 'editor_master')
      OR public.has_role(_user_id, 'editor_basico')
$$;

-- ============================================================
-- INICIATIVAS: líder/gestor pode deletar; analista pode mover (UPDATE)
-- ============================================================
DROP POLICY IF EXISTS "Admin deleta" ON public.iniciativas;
CREATE POLICY "Admin/Lider deleta" ON public.iniciativas FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

DROP POLICY IF EXISTS "Editor atualiza" ON public.iniciativas;
CREATE POLICY "Kanban atualiza" ON public.iniciativas FOR UPDATE TO authenticated
  USING (public.can_move_kanban(auth.uid()))
  WITH CHECK (public.can_move_kanban(auth.uid()));

-- ============================================================
-- PROJETOS: líder/gestor pode deletar
-- ============================================================
DROP POLICY IF EXISTS "Admin deleta" ON public.projetos;
CREATE POLICY "Admin/Lider deleta" ON public.projetos FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

-- ============================================================
-- MICROPROCESSOS: líder/gestor pode deletar
-- ============================================================
DROP POLICY IF EXISTS "microprocessos_delete_admin" ON public.microprocessos;
CREATE POLICY "microprocessos_delete_lider" ON public.microprocessos FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

-- ============================================================
-- TAREFAS: analista cria/atualiza/deleta as próprias e qualquer admin/líder gerencia
-- ============================================================
DROP POLICY IF EXISTS "Admin deleta" ON public.tarefas;
DROP POLICY IF EXISTS "Editor insere" ON public.tarefas;
DROP POLICY IF EXISTS "Editor atualiza" ON public.tarefas;

CREATE POLICY "Tarefa insere" ON public.tarefas FOR INSERT TO authenticated
  WITH CHECK (public.can_move_kanban(auth.uid()));
CREATE POLICY "Tarefa atualiza" ON public.tarefas FOR UPDATE TO authenticated
  USING (public.can_move_kanban(auth.uid()))
  WITH CHECK (public.can_move_kanban(auth.uid()));
CREATE POLICY "Tarefa deleta" ON public.tarefas FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

-- ============================================================
-- ASIS / TOBE / SIPOC: líder pode deletar (não só admin)
-- ============================================================
DROP POLICY IF EXISTS "Admin deleta" ON public.asis_passos;
CREATE POLICY "Admin/Lider deleta" ON public.asis_passos FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

DROP POLICY IF EXISTS "Admin deleta" ON public.tobe_passos;
CREATE POLICY "Admin/Lider deleta" ON public.tobe_passos FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

DROP POLICY IF EXISTS "Admin deleta" ON public.sipoc;
CREATE POLICY "Admin/Lider deleta" ON public.sipoc FOR DELETE TO authenticated
  USING (public.can_edit(auth.uid()));

-- ============================================================
-- ANEXOS: admin/líder deleta qualquer; analista só os próprios
-- ============================================================
DROP POLICY IF EXISTS "Anexos delete editor" ON public.anexos;
CREATE POLICY "Anexos delete" ON public.anexos FOR DELETE TO authenticated
  USING (
    public.can_edit(auth.uid())
    OR uploaded_by = auth.uid()
  );

-- Também permitir UPDATE (renomear/marcar) para o autor + admin/líder
DROP POLICY IF EXISTS "Anexos update" ON public.anexos;
CREATE POLICY "Anexos update" ON public.anexos FOR UPDATE TO authenticated
  USING (public.can_edit(auth.uid()) OR uploaded_by = auth.uid())
  WITH CHECK (public.can_edit(auth.uid()) OR uploaded_by = auth.uid());

-- ============================================================
-- PICKLISTS / PICKLIST_VALORES: admin + líder gerenciam
-- ============================================================
DROP POLICY IF EXISTS "Picklists admin escreve" ON public.picklists;
CREATE POLICY "Picklists admin/lider escreve" ON public.picklists FOR ALL TO authenticated
  USING (public.can_edit(auth.uid()))
  WITH CHECK (public.can_edit(auth.uid()));

DROP POLICY IF EXISTS "Valores admin escreve" ON public.picklist_valores;
CREATE POLICY "Valores admin/lider escreve" ON public.picklist_valores FOR ALL TO authenticated
  USING (public.can_edit(auth.uid()))
  WITH CHECK (public.can_edit(auth.uid()));

-- ============================================================
-- APP_CONFIGURACOES: admin + líder editam
-- ============================================================
DROP POLICY IF EXISTS "Config admin edita" ON public.app_configuracoes;
CREATE POLICY "Config admin/lider edita" ON public.app_configuracoes FOR ALL TO authenticated
  USING (public.can_edit(auth.uid()))
  WITH CHECK (public.can_edit(auth.uid()));
