
-- =====================================================
-- SISTEMA INTELIGENTE DE MELHORIA CONTÍNUA - VIBRA
-- =====================================================

-- ENUM de papéis
CREATE TYPE public.app_role AS ENUM ('admin', 'editor_master', 'editor_basico', 'visualizador');

-- Função utilitária de updated_at
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- =====================================================
-- PROFILES
-- =====================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL DEFAULT '',
  email TEXT,
  diretoria TEXT,
  gerencia TEXT,
  area TEXT,
  vice_presidencia TEXT,
  papel TEXT,
  funcao TEXT,
  consultoria TEXT,
  foto_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles legíveis por autenticados" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Usuário edita o próprio profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Usuário insere o próprio profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER tg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- USER ROLES (separado por segurança)
-- =====================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Usuário lê os próprios papéis" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin gerencia papéis" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Helper: usuário pode editar (admin ou editor_master)
CREATE OR REPLACE FUNCTION public.can_edit(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'editor_master')
$$;

-- =====================================================
-- AUTO-CREATE PROFILE NO SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)), NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'visualizador');
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- PICKLISTS
-- =====================================================
CREATE TABLE public.picklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.picklist_valores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  picklist_id UUID NOT NULL REFERENCES public.picklists(id) ON DELETE CASCADE,
  valor TEXT NOT NULL,
  ordem INT DEFAULT 0,
  cor TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.picklists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.picklist_valores TO authenticated;
GRANT ALL ON public.picklists, public.picklist_valores TO service_role;
ALTER TABLE public.picklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.picklist_valores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Picklists legíveis" ON public.picklists FOR SELECT TO authenticated USING (true);
CREATE POLICY "Picklists admin escreve" ON public.picklists FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Valores legíveis" ON public.picklist_valores FOR SELECT TO authenticated USING (true);
CREATE POLICY "Valores admin escreve" ON public.picklist_valores FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER tg_picklists_updated BEFORE UPDATE ON public.picklists FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- MACROPROCESSOS → PROCESSOS → INICIATIVAS → AÇÕES → TAREFAS
-- =====================================================
CREATE TABLE public.macroprocessos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  cor TEXT DEFAULT '#013820',
  responsavel_id UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE public.processos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  macroprocesso_id UUID NOT NULL REFERENCES public.macroprocessos(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  responsavel_id UUID REFERENCES public.profiles(id),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE public.iniciativas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  processo_id UUID NOT NULL REFERENCES public.processos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  as_is TEXT,
  to_be TEXT,
  solucao_proposta TEXT,
  tipo_melhoria TEXT,
  status TEXT DEFAULT 'Mapeada',
  prioridade TEXT,
  impacto_negocio INT CHECK (impacto_negocio BETWEEN 1 AND 5),
  impacto_cliente INT CHECK (impacto_cliente BETWEEN 1 AND 5),
  impacto_financeiro INT CHECK (impacto_financeiro BETWEEN 1 AND 5),
  esforco INT CHECK (esforco BETWEEN 1 AND 5),
  complexidade INT CHECK (complexidade BETWEEN 1 AND 5),
  score NUMERIC GENERATED ALWAYS AS (
    (COALESCE(impacto_negocio,0) + COALESCE(impacto_cliente,0) + COALESCE(impacto_financeiro,0))::NUMERIC
    / NULLIF((COALESCE(esforco,0) + COALESCE(complexidade,0)), 0)
  ) STORED,
  responsavel_id UUID REFERENCES public.profiles(id),
  vice_presidencia TEXT,
  diretoria TEXT,
  gerencia TEXT,
  data_inicio DATE,
  data_fim_prevista DATE,
  data_fim_real DATE,
  percentual_avanco NUMERIC DEFAULT 0,
  ganho_financeiro NUMERIC,
  ganho_horas NUMERIC,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE public.acoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id UUID NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  responsavel_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'Pendente',
  data_inicio DATE,
  data_fim_prevista DATE,
  data_fim_real DATE,
  percentual_avanco NUMERIC DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE public.tarefas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  acao_id UUID NOT NULL REFERENCES public.acoes(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  responsavel_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'A Fazer',
  prioridade TEXT,
  data_inicio DATE,
  data_fim_prevista DATE,
  data_fim_real DATE,
  checklist JSONB DEFAULT '[]'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Grants + RLS para hierarquia
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['macroprocessos','processos','iniciativas','acoes','tarefas'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "Leitura autenticada" ON public.%I FOR SELECT TO authenticated USING (deleted_at IS NULL)', t);
    EXECUTE format('CREATE POLICY "Editor insere" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.can_edit(auth.uid()))', t);
    EXECUTE format('CREATE POLICY "Editor atualiza" ON public.%I FOR UPDATE TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()))', t);
    EXECUTE format('CREATE POLICY "Admin deleta" ON public.%I FOR DELETE TO authenticated USING (public.has_role(auth.uid(),''admin''))', t);
    EXECUTE format('CREATE TRIGGER tg_%I_updated BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at()', t, t);
  END LOOP;
END $$;

-- =====================================================
-- INDICADORES (KPIs)
-- =====================================================
CREATE TABLE public.indicadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  unidade TEXT,
  tipo_grafico TEXT DEFAULT 'linha',
  cor_meta TEXT DEFAULT '#1E8A00',
  cor_realizado TEXT DEFAULT '#013820',
  formula TEXT,
  meta_anual NUMERIC,
  iniciativa_id UUID REFERENCES public.iniciativas(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE TABLE public.indicador_valores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indicador_id UUID NOT NULL REFERENCES public.indicadores(id) ON DELETE CASCADE,
  ano INT NOT NULL,
  mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
  meta NUMERIC,
  realizado NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (indicador_id, ano, mes)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.indicadores, public.indicador_valores TO authenticated;
GRANT ALL ON public.indicadores, public.indicador_valores TO service_role;
ALTER TABLE public.indicadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indicador_valores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Indicadores leitura" ON public.indicadores FOR SELECT TO authenticated USING (deleted_at IS NULL);
CREATE POLICY "Indicadores editor" ON public.indicadores FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE POLICY "Valores leitura" ON public.indicador_valores FOR SELECT TO authenticated USING (true);
CREATE POLICY "Valores editor" ON public.indicador_valores FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER tg_indicadores_updated BEFORE UPDATE ON public.indicadores FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- KANBAN HISTÓRICO
-- =====================================================
CREATE TABLE public.kanban_historico (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id UUID NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  status_de TEXT,
  status_para TEXT NOT NULL,
  movido_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.kanban_historico TO authenticated;
GRANT ALL ON public.kanban_historico TO service_role;
ALTER TABLE public.kanban_historico ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kanban leitura" ON public.kanban_historico FOR SELECT TO authenticated USING (true);
CREATE POLICY "Kanban insert editor" ON public.kanban_historico FOR INSERT TO authenticated WITH CHECK (public.can_edit(auth.uid()) OR public.has_role(auth.uid(),'editor_basico'));

-- =====================================================
-- CAUSA RAIZ
-- =====================================================
CREATE TABLE public.causa_raiz (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id UUID NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  metodologia TEXT NOT NULL CHECK (metodologia IN ('PDCA','5_Porques','Ishikawa','DMAIC')),
  conteudo JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.causa_raiz TO authenticated;
GRANT ALL ON public.causa_raiz TO service_role;
ALTER TABLE public.causa_raiz ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Causa raiz leitura" ON public.causa_raiz FOR SELECT TO authenticated USING (true);
CREATE POLICY "Causa raiz editor" ON public.causa_raiz FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER tg_causa_raiz_updated BEFORE UPDATE ON public.causa_raiz FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- RISCOS
-- =====================================================
CREATE TABLE public.riscos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id UUID NOT NULL REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  probabilidade INT CHECK (probabilidade BETWEEN 1 AND 5),
  impacto INT CHECK (impacto BETWEEN 1 AND 5),
  severidade NUMERIC GENERATED ALWAYS AS (COALESCE(probabilidade,0) * COALESCE(impacto,0)) STORED,
  mitigacao TEXT,
  responsavel_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'Aberto',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.riscos TO authenticated;
GRANT ALL ON public.riscos TO service_role;
ALTER TABLE public.riscos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Riscos leitura" ON public.riscos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Riscos editor" ON public.riscos FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER tg_riscos_updated BEFORE UPDATE ON public.riscos FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- ANEXOS
-- =====================================================
CREATE TABLE public.anexos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id UUID REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  acao_id UUID REFERENCES public.acoes(id) ON DELETE CASCADE,
  tarefa_id UUID REFERENCES public.tarefas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  url TEXT NOT NULL,
  tamanho_bytes BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.anexos TO authenticated;
GRANT ALL ON public.anexos TO service_role;
ALTER TABLE public.anexos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anexos leitura" ON public.anexos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anexos insert" ON public.anexos FOR INSERT TO authenticated WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "Anexos delete editor" ON public.anexos FOR DELETE TO authenticated USING (public.can_edit(auth.uid()) OR uploaded_by = auth.uid());

-- =====================================================
-- COMENTÁRIOS
-- =====================================================
CREATE TABLE public.comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  iniciativa_id UUID REFERENCES public.iniciativas(id) ON DELETE CASCADE,
  acao_id UUID REFERENCES public.acoes(id) ON DELETE CASCADE,
  tarefa_id UUID REFERENCES public.tarefas(id) ON DELETE CASCADE,
  autor_id UUID NOT NULL REFERENCES auth.users(id),
  conteudo TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.comentarios TO authenticated;
GRANT ALL ON public.comentarios TO service_role;
ALTER TABLE public.comentarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Comentários leitura" ON public.comentarios FOR SELECT TO authenticated USING (true);
CREATE POLICY "Comentários autor" ON public.comentarios FOR ALL TO authenticated USING (autor_id = auth.uid() OR public.has_role(auth.uid(),'admin')) WITH CHECK (autor_id = auth.uid());

-- =====================================================
-- AUDIT LOG (polimórfico)
-- =====================================================
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tabela TEXT NOT NULL,
  registro_id UUID,
  acao TEXT NOT NULL,
  payload JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Audit admin leitura" ON public.audit_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Audit insert" ON public.audit_log FOR INSERT TO authenticated WITH CHECK (true);

-- =====================================================
-- EQUIPE & RECONHECIMENTOS
-- =====================================================
CREATE TABLE public.equipe (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  diretoria TEXT,
  papel_macroprocesso TEXT,
  area TEXT,
  ordem INT DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.reconhecimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  pontos INT DEFAULT 0,
  concedido_por UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.equipe, public.reconhecimentos TO authenticated;
GRANT ALL ON public.equipe, public.reconhecimentos TO service_role;
ALTER TABLE public.equipe ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reconhecimentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Equipe leitura" ON public.equipe FOR SELECT TO authenticated USING (true);
CREATE POLICY "Equipe editor" ON public.equipe FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE POLICY "Reconhecimentos leitura" ON public.reconhecimentos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Reconhecimentos editor" ON public.reconhecimentos FOR ALL TO authenticated USING (public.can_edit(auth.uid())) WITH CHECK (public.can_edit(auth.uid()));
CREATE TRIGGER tg_equipe_updated BEFORE UPDATE ON public.equipe FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- FÓRMULAS
-- =====================================================
CREATE TABLE public.formulas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  expressao TEXT NOT NULL,
  variaveis JSONB DEFAULT '{}'::jsonb,
  contexto TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.formulas TO authenticated;
GRANT ALL ON public.formulas TO service_role;
ALTER TABLE public.formulas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Formulas leitura" ON public.formulas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Formulas admin" ON public.formulas FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER tg_formulas_updated BEFORE UPDATE ON public.formulas FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- =====================================================
-- SEED PICKLISTS BÁSICOS
-- =====================================================
INSERT INTO public.picklists (categoria, descricao) VALUES
  ('Status Iniciativa', 'Status do ciclo de vida das iniciativas'),
  ('Tipo Melhoria', 'Tipos de melhoria contínua'),
  ('Prioridade', 'Níveis de prioridade'),
  ('Diretoria', 'Diretorias da VIBRA'),
  ('Vice-Presidência', 'VPs da VIBRA');

INSERT INTO public.picklist_valores (picklist_id, valor, ordem, cor)
SELECT id, v.valor, v.ordem, v.cor FROM public.picklists, (VALUES
  ('Status Iniciativa','Mapeada',1,'#9e9e9e'),
  ('Status Iniciativa','Em Andamento',2,'#1E8A00'),
  ('Status Iniciativa','Em Validação',3,'#f0ad4e'),
  ('Status Iniciativa','Implementada',4,'#013820'),
  ('Status Iniciativa','Arquivada',5,'#767676'),
  ('Tipo Melhoria','Automação',1,'#1E8A00'),
  ('Tipo Melhoria','Processo',2,'#013820'),
  ('Tipo Melhoria','Tecnologia',3,'#025c30'),
  ('Tipo Melhoria','Pessoas',4,'#1E8A00'),
  ('Prioridade','Baixa',1,'#9e9e9e'),
  ('Prioridade','Média',2,'#f0ad4e'),
  ('Prioridade','Alta',3,'#d9534f'),
  ('Prioridade','Crítica',4,'#c0392b')
) AS v(categoria, valor, ordem, cor)
WHERE public.picklists.categoria = v.categoria;
