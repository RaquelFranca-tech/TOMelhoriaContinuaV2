import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  Workflow,
  Settings2,
  Layers,
  Plus,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ClienteNaVeiaLogo } from "./ClienteNaVeiaLogo";
import { GembaViewLogo } from "./GembaViewLogo";
import { VibraLogo } from "./VibraLogo";
import { HierarchyDrawer } from "./HierarchyDrawer";
import { useHierarchy } from "@/stores/hierarchy";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDesignLogos, getCachedDesignLogosSync } from "@/hooks/useDesignLogos";

const MODULES = [
  { id: "executivo", label: "Executivo", to: "/executivo", icon: LayoutDashboard },
  { id: "mapeamento", label: "Mapeamento", to: "/mapeamento", icon: Workflow },
  { id: "configuracoes", label: "Configurações", to: "/configuracoes", icon: Settings2 },
] as const;

export type Tab = { id: string; label: string };

export function AppShell({
  moduleId,
  tabs,
  activeTab,
  onTabChange,
  children,
}: {
  moduleId: "executivo" | "mapeamento" | "configuracoes";
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibra-theme") as "light" | "dark";
      if (saved) return saved;
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  const [notifOpen, setNotifOpen] = useState(false);
  const [newProjOpen, setNewProjOpen] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const { projetoId, projetoIds, setProjeto, setProjetoIds, openDrawer } = useHierarchy();
  const [projOpen, setProjOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("vibra-theme", theme);
  }, [theme]);

  async function criarProjetoRapido() {
    const nome = newProjName.trim();
    if (!nome) return toast.error("Informe o nome do projeto");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("projetos")
      .insert({ nome, created_by: user?.id ?? null })
      .select("id")
      .single();
    if (error) return toast.error(error.message);
    toast.success("Projeto criado");
    qc.invalidateQueries({ queryKey: ["macroprocessos-list"] });
    setProjeto(data.id);
    setNewProjName("");
    setNewProjOpen(false);
  }

  const { data: macros = [] } = useQuery({
    queryKey: ["macroprocessos-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projetos")
        .select("id,nome")
        .is("deleted_at", null)
        .order("nome");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("nome,email")
        .eq("id", user.id)
        .single();
      return data;
    },
  });

  // Get user role
  const { data: myRole = "visualizador" } = useQuery({
    queryKey: ["my-role", profile?.email],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return "visualizador";
      const emailLower = user.email?.toLowerCase() || "";
      if (
        emailLower === "rfranca@vibraenergia.com.br" ||
        emailLower === "rfranca@vibra.com.br" ||
        (emailLower.includes("raquel") && emailLower.includes("vibra")) ||
        emailLower === "admin@vibraenergia.com.br" ||
        emailLower === "sfquequel@gmail.com" ||
        emailLower === "juliano.maluf@mjv.com.br"
      ) {
        return "admin";
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.role ?? "visualizador";
    },
  });

  // Get role permissions
  const { data: rolePermissions = {} } = useQuery({
    queryKey: ["permissions-config", myRole],
    enabled: !!myRole,
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", `permissions_${myRole}`)
        .maybeSingle();
      return (data?.valor as Record<string, boolean>) ?? {};
    },
  });

  const hasPermission = (key: string, defaultVal: boolean = true) => {
    if (myRole === "admin") return true;
    if (rolePermissions[key] !== undefined) {
      return rolePermissions[key];
    }
    if (key === "modulo_configuracao" || key.startsWith("aba_configuracoes_")) {
      return myRole === "admin";
    }
    return defaultVal;
  };

  const { data: footerConfig } = useQuery({
    queryKey: ["app-footer-config"],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", "rodape")
        .maybeSingle();
      return data;
    },
  });

  const { data: logosQuery } = useDesignLogos();
  const cachedLogos = getCachedDesignLogosSync();
  const logos = logosQuery || cachedLogos;

  async function signOut() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user)
      await supabase
        .from("user_session_log")
        .insert({ user_id: user.id, email: user.email, evento: "logoff" });
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
    navigate({ to: "/auth" });
  }

  const initials = (profile?.nome ?? profile?.email ?? "U")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const defaultFooterText =
    "Transformação Digital 🔹 Eficiência Operacional 🔹 Melhoria Contínua 🧩Desenvolvido por Raquel França do Escritório de Transformação 🚀";
  const finalFooterText = (footerConfig?.valor as any)?.texto || defaultFooterText;

  return (
    <div className="flex min-h-screen w-full flex-col bg-vibra-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-vibra-800 text-white shadow-vibra">
        <div className="flex h-[60px] items-center gap-3 px-4">
          <div className="flex items-center gap-3 shrink-0">
            <VibraLogo variant="light" className="h-7 w-auto shrink-0" />
          </div>

          {/* Discreet system description */}
          <span className="hidden lg:inline text-[11px] font-medium text-white/50 tracking-wide border-l border-white/20 pl-3 select-none">
            Sistema de Gestão de Melhoria Contínua do Escritório de Transformação
          </span>

          {/* Projeto global picklist + criação rápida (multi-seleção) */}
          <div className="relative ml-2 hidden items-center gap-1.5 sm:flex">
            <button
              onClick={() => setProjOpen((v) => !v)}
              className="flex h-9 min-w-[240px] items-center justify-between gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-[12.5px] font-medium text-white outline-none backdrop-blur transition hover:bg-white/15"
              title="Selecionar projetos"
            >
              <span className="truncate">
                {projetoIds === null
                  ? "Todos os projetos"
                  : projetoIds.length === 0
                    ? "Sem filtro de projeto"
                    : projetoIds.length === 1
                      ? (macros.find((m) => m.id === projetoIds[0])?.nome ?? "1 projeto")
                      : `${projetoIds.length} projetos selecionados`}
              </span>
              <span className="text-white/70">▾</span>
            </button>
            {projOpen && (
              <div className="absolute left-0 top-full z-40 mt-1 w-[300px] rounded-md border border-border bg-white p-2 text-foreground shadow-vibra">
                <div className="mb-1 flex items-center justify-between gap-2 border-b border-border pb-1.5">
                  <button
                    onClick={() => {
                      setProjetoIds(null);
                    }}
                    className="text-[11px] font-semibold text-vibra-700 hover:underline"
                  >
                    Selecionar todos
                  </button>
                  <button
                    onClick={() => {
                      setProjetoIds([]);
                      qc.invalidateQueries();
                    }}
                    className="text-[11px] text-muted-foreground hover:underline"
                  >
                    Limpar
                  </button>
                </div>
                <div className="max-h-[280px] overflow-y-auto">
                  {macros.map((m) => {
                    const checked = projetoIds === null ? true : projetoIds.includes(m.id);
                    return (
                      <label
                        key={m.id}
                        className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-[12px] hover:bg-vibra-50"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            const base = projetoIds ?? macros.map((x) => x.id);
                            const next = e.target.checked
                              ? Array.from(new Set([...base, m.id]))
                              : base.filter((id) => id !== m.id);
                            setProjetoIds(next);
                          }}
                        />
                        <span className="truncate">{m.nome}</span>
                      </label>
                    );
                  })}
                  {macros.length === 0 && (
                    <p className="px-2 py-3 text-center text-[11px] italic text-muted-foreground">
                      Nenhum projeto cadastrado.
                    </p>
                  )}
                </div>
                <div className="mt-1 flex justify-end border-t border-border pt-1.5">
                  <button
                    onClick={() => setProjOpen(false)}
                    className="rounded bg-vibra-700 px-2 py-1 text-[11px] font-semibold text-white hover:bg-vibra-800"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => setNewProjOpen(true)}
              className="inline-flex h-9 items-center gap-1 rounded-md border border-white/15 bg-white/10 px-2.5 text-[11.5px] font-semibold text-white backdrop-blur transition hover:bg-white/15"
              title="Criar novo projeto"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Novo Projeto</span>
            </button>
          </div>

          {/* Hierarchy drawer trigger */}
          <button
            onClick={openDrawer}
            className="hidden h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-3 text-[11.5px] font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:inline-flex"
            title="Abrir hierarquia"
          >
            <Layers className="h-3.5 w-3.5" />
            Hierarquia
          </button>

          {/* Module switcher — compact segmented control */}
          <nav className="ml-auto flex items-center gap-0.5 rounded-full border border-white/15 bg-white/[0.06] p-0.5 backdrop-blur">
            {MODULES.filter((m) => {
              if (m.id === "executivo") return hasPermission("modulo_executivo", true);
              if (m.id === "mapeamento") return hasPermission("modulo_mapeamento", true);
              if (m.id === "configuracoes") return hasPermission("modulo_configuracao", false);
              return true;
            }).map((m) => {
              const active = pathname.startsWith(m.to);
              const Icon = m.icon;
              return (
                <Link
                  key={m.id}
                  to={m.to}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-all ${
                    active
                      ? "bg-white text-vibra-800 shadow-vibra-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{m.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Alternar tema"
            title={theme === "light" ? "Tema escuro" : "Tema claro"}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Notificações"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-border bg-white p-3 text-foreground shadow-vibra">
                <p className="mb-2 text-[12px] font-bold text-vibra-800">Notificações</p>
                <p className="text-[12px] text-muted-foreground">
                  Você não tem notificações novas.
                </p>
              </div>
            )}
          </div>

          {/* User */}
          <div className="ml-1 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-[12px] font-bold uppercase text-white">
              {initials}
            </div>
            <button
              onClick={signOut}
              className="rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab strip */}
        <div className="border-t border-white/10 bg-white text-foreground">
          <div className="flex items-center gap-1 overflow-x-auto px-4">
            {tabs
              .filter((t) => {
                const key = `aba_${moduleId}_${t.id}`;
                return hasPermission(key, true);
              })
              .map((t) => {
                const active = t.id === activeTab;
                return (
                  <button
                    key={t.id}
                    onClick={() => onTabChange(t.id)}
                    className={`relative shrink-0 px-3 py-3 text-[12.5px] font-semibold transition-colors ${
                      active ? "text-vibra-800" : "text-muted-foreground hover:text-vibra-800"
                    }`}
                  >
                    {t.label}
                    {active && (
                      <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-t bg-vibra-600" />
                    )}
                  </button>
                );
              })}
            <div className="ml-auto hidden items-center gap-2 py-2 text-[11px] text-muted-foreground sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-vibra-600" />
              <span>
                Módulo:{" "}
                <strong className="text-vibra-800">
                  {MODULES.find((m) => m.id === moduleId)?.label}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">{children}</main>

      <footer className="border-t border-white/5 bg-[#044317] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-inner">
        <p className="text-center sm:text-left text-[11.5px] font-medium text-slate-300 max-w-4xl leading-relaxed">
          {finalFooterText}
        </p>
        <div className="shrink-0">
          {logos?.footer_logo ? (
            <img
              src={logos.footer_logo}
              alt="Logo do Rodapé"
              style={{
                height: logos.footer_logo_size ? `${logos.footer_logo_size}px` : "32px",
                width: "auto",
                objectFit: "contain",
              }}
              referrerPolicy="no-referrer"
            />
          ) : (
            <GembaViewLogo className="h-10 w-auto" />
          )}
        </div>
      </footer>

      <HierarchyDrawer />

      {newProjOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setNewProjOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border border-border bg-white p-5 shadow-vibra"
          >
            <h3 className="mb-3 text-[15px] font-bold text-vibra-800">Novo Projeto</h3>
            <label className="text-[12px] font-semibold text-vibra-800">Nome do projeto</label>
            <input
              autoFocus
              value={newProjName}
              onChange={(e) => setNewProjName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") criarProjetoRapido();
              }}
              placeholder="Ex.: Transformação Digital Comercial"
              className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-[13px]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setNewProjOpen(false)}
                className="rounded-md border border-border px-3 py-1.5 text-[12px]"
              >
                Cancelar
              </button>
              <button
                onClick={criarProjetoRapido}
                className="rounded-md bg-vibra-700 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-vibra-800"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
