import { ClientOnly, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { VibraLogo } from "@/components/VibraLogo";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Entrar | VIBRA MC" },
      { name: "description", content: "Acesso ao Sistema Inteligente de Melhoria Contínua VIBRA." },
    ],
  }),
  component: () => (
    <ClientOnly>
      <AuthPage />
    </ClientOnly>
  ),
});

const features = [
  { icon: "📊", title: "Dashboard Executivo 360°", sub: "Indicadores em tempo real" },
  { icon: "🗂️", title: "Kanban de Iniciativas", sub: "Gestão visual do portfólio" },
  { icon: "🗺️", title: "Mapeamento Completo", sub: "SIPOC, AS-IS, TO-BE, Lean, BPMN" },
  { icon: "🎯", title: "Metas & Mereo", sub: "Ganhos e resultados mensais" },
  { icon: "🧮", title: "Calculadora Lean", sub: "ROI, FTE e Payback automático" },
];

function AuthPage() {
  const navigate = useNavigate();
  const [firstAccessOpen, setFirstAccessOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/" });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (error) throw error;
      if (data.user)
        await supabase
          .from("user_session_log")
          .insert({ user_id: data.user.id, email: data.user.email, evento: "login" });
      toast.success("Bem-vindo de volta.");
      navigate({ to: "/executivo" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha no acesso.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (password !== confirmPassword) throw new Error("As senhas não coincidem.");
      if (!nome.trim()) throw new Error("Informe seu nome completo.");
      const normalizedEmail = email.trim().toLowerCase();
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: { nome: nome.trim() },
          emailRedirectTo: `${window.location.origin}/executivo`,
        },
      });
      if (error) throw error;
      if (data.session) {
        toast.success("Cadastro criado. Bem-vindo.");
        navigate({ to: "/executivo" });
      } else {
        toast.success("Cadastro criado. Se solicitado, confirme seu e-mail antes de entrar.");
        setFirstAccessOpen(false);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha no cadastro.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Informe seu e-mail corporativo.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });
    if (error) return toast.error(error.message);
    toast.success("E-mail de redefinição enviado.");
  }

  return (
    <main className="vibra-auth-page">
      <aside className="vibra-auth-brand">
        <div className="vibra-grid-layer" />
        <div className="vibra-brand-stack">
          <VibraLogo variant="light" className="vibra-auth-logo" type="login" />
          <p className="vibra-brand-kicker">Gestão Inteligente de Melhoria Contínua</p>
          <div className="vibra-feature-list">
            {features.map(({ icon, title, sub }) => (
              <div key={title} className="vibra-feature-item">
                <span className="vibra-feature-icon" aria-hidden="true">
                  {icon}
                </span>
                <span className="vibra-feature-copy">
                  <strong>{title}</strong>
                  <small>{sub}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="vibra-auth-panel">
        <div className="vibra-auth-form-wrap">
          <div className="vibra-mobile-logo">
            <VibraLogo variant="dark" />
          </div>
          <h1>Bem-vindo</h1>
          <p>Acesse o Painel de Governança e Controle</p>

          <form onSubmit={handleSignIn} className="vibra-auth-form">
            <Field
              label="E-mail Corporativo"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="admin@vibraenergia.com.br"
              required
              autoComplete="email"
            />
            <Field
              label="Senha"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              minLength={6}
            />
            <a href="#" className="vibra-forgot-link" onClick={handleForgotPassword}>
              Esqueci minha senha
            </a>

            <button type="submit" disabled={loading} className="vibra-primary-button">
              {loading ? "Aguarde..." : "Entrar"}
            </button>
          </form>

          <div className="vibra-auth-separator" />

          <button
            type="button"
            onClick={() => setFirstAccessOpen((open) => !open)}
            className="vibra-first-access-toggle"
            aria-expanded={firstAccessOpen}
          >
            <span>🆕 Primeiro Acesso</span>
            <span aria-hidden="true">{firstAccessOpen ? "▴" : "▾"}</span>
          </button>

          {firstAccessOpen && (
            <form onSubmit={handleSignUp} className="vibra-first-access-form">
              <Field
                label="Nome completo"
                type="text"
                value={nome}
                onChange={setNome}
                placeholder="Digite seu nome completo"
                required
                autoComplete="name"
                maxLength={120}
              />
              <Field
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="voce@empresa.com"
                required
                autoComplete="email"
              />
              <Field
                label="Senha"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Mínimo 6 caracteres"
                required
                autoComplete="new-password"
                minLength={6}
              />
              <Field
                label="Confirmar senha"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Repita a senha"
                required
                autoComplete="new-password"
                minLength={6}
              />
              <button type="submit" disabled={loading} className="vibra-register-button">
                {loading ? "Aguarde..." : "Cadastrar e Entrar"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <label className="vibra-field">
      <span>{label}</span>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
