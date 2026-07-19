import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Download,
  Edit3,
  KeyRound,
  ListPlus,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { findSystemPicklist, SYSTEM_PICKLISTS } from "@/lib/systemPicklists";
import {
  deleteProjectCascade,
  deleteInitiativeCascade,
  deleteTaskSimple,
} from "@/lib/deleteService";
import { useConfirm } from "@/hooks/useConfirm";
import { syncSharedPeopleChange } from "@/hooks/usePicklist";

type Role =
  | "admin"
  | "editor_master"
  | "editor_basico"
  | "visualizador"
  | "especial"
  | "lider"
  | "master"
  | "gestao";
type TabId = "usuarios" | "picklists" | "hierarquia" | "formulas";

const roleLabels: Record<Role, string> = {
  admin: "Administrador Global",
  editor_master: "Líder/Gestor de Projeto",
  editor_basico: "Analista/Executor",
  visualizador: "Executivo/Visualizador",
  especial: "Especial",
  lider: "Líder",
  master: "Master",
  gestao: "Gestão",
};

const roleDescriptions: Record<Role, string> = {
  admin: "Acesso total. Gerencia usuários, picklists, fórmulas, abas e módulos.",
  editor_master: "Cria, edita e exclui iniciativas e tarefas. Visão por macroprocessos vinculados.",
  editor_basico: "Movimenta Kanban e interage com tarefas. Não cria nem exclui iniciativas.",
  visualizador: "Read-only, com visualizações executivas personalizadas.",
  especial: "Acesso especial com permissões customizadas de visualização e edição.",
  lider: "Liderança operacional e acompanhamento de equipes.",
  master: "Controle analítico amplo com relatórios, fórmulas e metas.",
  gestao: "Gestão executiva com foco em resultados, atas, reuniões e pendências.",
};

const inputCls =
  "h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[12.5px] outline-none transition focus:border-vibra-600";
const areaCls =
  "min-h-20 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-[12.5px] outline-none transition focus:border-vibra-600";
const btnBase =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 text-[12px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary = `${btnBase} bg-vibra-700 text-white hover:bg-vibra-800`;
const btnSecondary = `${btnBase} border border-neutral-200 bg-white text-vibra-800 hover:bg-vibra-50`;
const btnDanger = `${btnBase} border border-red-200 bg-red-50 text-red-700 hover:bg-red-100`;

export function ConfiguracoesTabs({ tab }: { tab: TabId }) {
  if (tab === "usuarios") return <UsuariosTab />;
  if (tab === "picklists") return <PicklistsTab />;
  if (tab === "hierarquia") return <HierarquiaTab />;
  return <FormulasTab />;
}

function Toolbar({
  onNew,
  onRefresh,
  onExport,
}: {
  onNew?: () => void;
  onRefresh?: () => void;
  onExport?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {onNew && (
        <button className={btnPrimary} onClick={onNew}>
          <Plus className="h-3.5 w-3.5" /> Novo
        </button>
      )}
      {onRefresh && (
        <button className={btnSecondary} onClick={onRefresh}>
          <RefreshCw className="h-3.5 w-3.5" /> Atualizar
        </button>
      )}
      {onExport && (
        <button className={btnSecondary} onClick={onExport}>
          <Download className="h-3.5 w-3.5" /> Exportar
        </button>
      )}
    </div>
  );
}

function Shell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 pb-16">
      <header className="flex flex-col gap-3 border-b border-neutral-200 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-vibra-800">{title}</h1>
          <p className="mt-1 text-[12.5px] text-muted-foreground">{subtitle}</p>
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}

function exportCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return toast.info("Não há dados para exportar.");
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(";"),
    ...rows.map((row) =>
      headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(";"),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportExcel(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return toast.info("Não há dados para exportar.");
  const headers = Object.keys(rows[0]);
  const body = rows
    .map((row) => `<tr>${headers.map((h) => `<td>${String(row[h] ?? "")}</td>`).join("")}</tr>`)
    .join("");
  const html = `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function UsuariosTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  useRealtimeTable("profiles", ["config-profiles"]);
  useRealtimeTable("user_roles", ["config-roles"]);
  useRealtimeTable("user_session_log", ["config-session-log"]);

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>("editor_master");

  const { data: profiles = [], refetch: refetchProfiles } = useQuery({
    queryKey: ["config-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("nome");
      if (error) throw error;
      return data ?? [];
    },
  });
  const { data: roles = [] } = useQuery({
    queryKey: ["config-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("id,user_id,role");
      if (error) throw error;
      return data ?? [];
    },
  });
  const { data: logs = [], refetch: refetchLogs } = useQuery({
    queryKey: ["config-session-log"],
    queryFn: async () => {
      const since = new Date();
      since.setMonth(since.getMonth() - 1);
      const { data, error } = await supabase
        .from("user_session_log")
        .select("*")
        .gte("created_at", since.toISOString())
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Query to fetch role-specific granular permissions
  const { data: rolePermissions = {} } = useQuery({
    queryKey: ["permissions-config", selectedRole],
    queryFn: async () => {
      const { data } = await supabase
        .from("app_configuracoes")
        .select("valor")
        .eq("chave", `permissions_${selectedRole}`)
        .maybeSingle();
      const isConfigTab = selectedRole === "admin";
      return (
        (data?.valor as Record<string, boolean>) ?? {
          modulo_executivo: true,
          modulo_mapeamento: true,
          modulo_configuracao: isConfigTab,
          aba_executivo_meudia: true,
          aba_executivo_dashboard: true,
          aba_executivo_iniciativas: true,
          aba_executivo_equipe: true,
          aba_executivo_ganhos: true,
          aba_executivo_mudanca: true,
          aba_executivo_relatorios: true,
          aba_executivo_tarefas: true,
          aba_executivo_mc3: true,
          aba_mapeamento_formulario: true,
          aba_mapeamento_analise: true,
          aba_mapeamento_causa: true,
          aba_mapeamento_resultados: true,
          aba_mapeamento_mural: true,
          aba_mapeamento_governanca: true,
          aba_mapeamento_ferramentas: true,
          aba_mapeamento_bpmn: true,
          aba_mapeamento_agenda: true,
          aba_mapeamento_ajuda: true,
          aba_configuracoes_usuarios: isConfigTab,
          aba_configuracoes_picklists: isConfigTab,
          aba_configuracoes_hierarquia: isConfigTab,
          aba_configuracoes_formulas: isConfigTab,
          aba_configuracoes_integracoes: isConfigTab,
          aba_configuracoes_banco: isConfigTab,
          aba_kanban: true,
          aba_timeline: true,
          aba_acoes: true,
          aba_sipoc: true,
          aba_dmaic: true,
          aba_kaizen: true,
          aba_calculadora: true,
          view_financial_fields: true,
          edit_any_picklist: selectedRole === "admin" || selectedRole === "editor_master",
        }
      );
    },
  });

  const roleByUser = useMemo(
    () => new Map(roles.map((r: any) => [r.user_id, r.role as Role])),
    [roles],
  );
  const filtered = profiles.filter((p: any) =>
    `${p.nome ?? ""} ${p.email ?? ""}`.toLowerCase().includes(search.toLowerCase()),
  );

  async function togglePermission(key: string) {
    const updatedPerms = {
      ...rolePermissions,
      [key]: !rolePermissions[key],
    };
    const { error } = await supabase.from("app_configuracoes").upsert({
      chave: `permissions_${selectedRole}`,
      valor: updatedPerms,
    });
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["permissions-config", selectedRole] });
    toast.success("Permissão atualizada em tempo real!");
  }

  async function saveUser() {
    if (!editing?.id) return;
    const role = editing.role as Role;
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        nome: editing.nome || "",
        email: editing.email || null,
        vice_presidencia: editing.vice_presidencia || null,
        diretoria: editing.diretoria || null,
        gerencia: editing.gerencia || null,
        area: editing.area || null,
        funcao: editing.funcao || null,
        papel: roleLabels[role],
      })
      .eq("id", editing.id);
    if (profileError) return toast.error(profileError.message);

    const existing = roles.find((r: any) => r.user_id === editing.id);
    const { error: roleError } = existing
      ? await supabase.from("user_roles").update({ role }).eq("id", existing.id)
      : await supabase.from("user_roles").insert({ user_id: editing.id, role });
    if (roleError) return toast.error(roleError.message);
    toast.success("Usuário atualizado.");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["config-profiles"] });
    qc.invalidateQueries({ queryKey: ["config-roles"] });
  }

  async function resetPassword(email?: string | null) {
    if (!email) return toast.error("Usuário sem e-mail cadastrado.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });
    if (error) return toast.error(error.message);
    toast.success("E-mail de redefinição enviado.");
  }

  async function deleteUser(userId: string, userName: string) {
    const confirmDelete = await confirm(
      "Excluir Usuário?",
      `Deseja realmente remover o usuário "${userName}" definitivamente? Essa operação é irreversível.`,
    );
    if (!confirmDelete) return;

    // Delete user role first
    const { error: roleErr } = await supabase.from("user_roles").delete().eq("user_id", userId);
    if (roleErr) return toast.error(roleErr.message);

    // Delete profile
    const { error: profileErr } = await supabase.from("profiles").delete().eq("id", userId);
    if (profileErr) return toast.error(profileErr.message);

    toast.success(`Usuário "${userName}" removido com sucesso.`);
    qc.invalidateQueries({ queryKey: ["config-profiles"] });
    qc.invalidateQueries({ queryKey: ["config-roles"] });
  }

  const permissionItems = [
    { key: "modulo_executivo", label: "Acesso Módulo Executivo", category: "Módulos" },
    { key: "modulo_mapeamento", label: "Acesso Módulo Mapeamento", category: "Módulos" },
    { key: "modulo_configuracao", label: "Acesso Módulo Configuração", category: "Módulos" },

    // Módulo Executivo Abas
    { key: "aba_executivo_meudia", label: "Executivo: Meu Dia", category: "Módulo Executivo" },
    {
      key: "aba_executivo_dashboard",
      label: "Executivo: Visão Executiva",
      category: "Módulo Executivo",
    },
    {
      key: "aba_executivo_iniciativas",
      label: "Executivo: Iniciativas",
      category: "Módulo Executivo",
    },
    { key: "aba_executivo_equipe", label: "Executivo: Stakeholders", category: "Módulo Executivo" },
    { key: "aba_executivo_ganhos", label: "Executivo: Metas", category: "Módulo Executivo" },
    {
      key: "aba_executivo_mudanca",
      label: "Executivo: Gestão de Mudança",
      category: "Módulo Executivo",
    },
    {
      key: "aba_executivo_relatorios",
      label: "Executivo: Relatórios",
      category: "Módulo Executivo",
    },
    { key: "aba_executivo_tarefas", label: "Executivo: Tarefas", category: "Módulo Executivo" },
    {
      key: "aba_executivo_mc3",
      label: "Executivo: MC³ | Motivação Contínua🚀",
      category: "Módulo Executivo",
    },

    // Módulo Mapeamento Abas
    {
      key: "aba_mapeamento_formulario",
      label: "Mapeamento: Formulário",
      category: "Módulo Mapeamento",
    },
    {
      key: "aba_mapeamento_analise",
      label: "Mapeamento: Análise (SIPOC, AS IS, TO BE, etc)",
      category: "Módulo Mapeamento",
    },
    {
      key: "aba_mapeamento_causa",
      label: "Mapeamento: Metodologias (DMAIC, Lean, Kaizen, etc)",
      category: "Módulo Mapeamento",
    },
    {
      key: "aba_mapeamento_resultados",
      label: "Mapeamento: Resultados",
      category: "Módulo Mapeamento",
    },
    {
      key: "aba_mapeamento_mural",
      label: "Mapeamento: Mural de Imagens",
      category: "Módulo Mapeamento",
    },
    {
      key: "aba_mapeamento_governanca",
      label: "Mapeamento: Governança (Riscos, Cronograma)",
      category: "Módulo Mapeamento",
    },
    {
      key: "aba_mapeamento_ferramentas",
      label: "Mapeamento: Ferramentas (Checklist, Calculadora)",
      category: "Módulo Mapeamento",
    },
    { key: "aba_mapeamento_bpmn", label: "Mapeamento: BPMN", category: "Módulo Mapeamento" },
    { key: "aba_mapeamento_agenda", label: "Mapeamento: Agenda", category: "Módulo Mapeamento" },
    {
      key: "aba_mapeamento_ajuda",
      label: "Mapeamento: Pedido de Ajuda",
      category: "Módulo Mapeamento",
    },

    // Módulo Configurações Abas
    {
      key: "aba_configuracoes_usuarios",
      label: "Configurações: Gestão de Usuários",
      category: "Módulo Configurações",
    },
    {
      key: "aba_configuracoes_picklists",
      label: "Configurações: Picklists",
      category: "Módulo Configurações",
    },
    {
      key: "aba_configuracoes_hierarquia",
      label: "Configurações: Projetos & Hierarquia",
      category: "Módulo Configurações",
    },
    {
      key: "aba_configuracoes_formulas",
      label: "Configurações: Fórmulas & Gráficos",
      category: "Módulo Configurações",
    },
    {
      key: "aba_configuracoes_integracoes",
      label: "Configurações: Integrações",
      category: "Módulo Configurações",
    },
    {
      key: "aba_configuracoes_banco",
      label: "Configurações: Gestão de Banco de Dados",
      category: "Módulo Configurações",
    },

    // Legado/Outros
    { key: "aba_kanban", label: "Visualizar Kanban", category: "Abas (Legado)" },
    { key: "aba_timeline", label: "Visualizar Timeline", category: "Abas (Legado)" },
    { key: "aba_acoes", label: "Visualizar Ações/Tabela", category: "Abas (Legado)" },
    { key: "aba_sipoc", label: "Visualizar SIPOC (Legado)", category: "Abas (Legado)" },
    { key: "aba_dmaic", label: "Visualizar DMAIC / Six Sigma (Legado)", category: "Abas (Legado)" },
    { key: "aba_kaizen", label: "Visualizar Kaizen & Lean (Legado)", category: "Abas (Legado)" },
    { key: "aba_calculadora", label: "Visualizar Calculadora (Legado)", category: "Abas (Legado)" },
    {
      key: "view_financial_fields",
      label: "Ver Campos Financeiros (ROI, Saving)",
      category: "Campos & Finanças",
    },
    { key: "edit_any_picklist", label: "Criar/Editar Picklists", category: "Campos & Finanças" },
  ];

  return (
    <Shell
      title="Gestão de Usuários"
      subtitle="Papéis, permissões granulares, redefinição de senha e log de acessos do último mês."
      actions={
        <Toolbar
          onRefresh={() => {
            refetchProfiles();
            refetchLogs();
          }}
          onExport={() => exportExcel("logs-usuarios.xls", logs as any[])}
        />
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-vibra-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              className="h-8 flex-1 bg-transparent text-[13px] outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuário por nome ou e-mail"
            />
          </div>
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-vibra-sm">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-vibra-50 text-[11px] uppercase tracking-wide text-vibra-800">
                <tr>
                  <th className="px-3 py-2">Usuário</th>
                  <th className="px-3 py-2">Papel</th>
                  <th className="px-3 py-2">Área</th>
                  <th className="px-3 py-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filtered.map((p: any) => {
                  const role = roleByUser.get(p.id) ?? "visualizador";
                  return (
                    <tr key={p.id} className="align-top">
                      <td className="px-3 py-2">
                        <strong className="block text-vibra-800">{p.nome || "—"}</strong>
                        <span className="text-muted-foreground">{p.email || "—"}</span>
                      </td>
                      <td className="px-3 py-2">
                        <span className="rounded-full bg-vibra-50 px-2 py-1 font-semibold text-vibra-800">
                          {roleLabels[role]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {p.diretoria || p.area || "—"}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex justify-end gap-1">
                          <button
                            className={btnSecondary}
                            onClick={() => setEditing({ ...p, role })}
                          >
                            <Edit3 className="h-3.5 w-3.5" /> Editar
                          </button>
                          <button className={btnSecondary} onClick={() => resetPassword(p.email)}>
                            <KeyRound className="h-3.5 w-3.5" /> Senha
                          </button>
                          <button
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-rose-250 bg-rose-50 text-rose-700 hover:bg-rose-100/80 transition shadow-sm"
                            onClick={() => deleteUser(p.id, p.nome || p.email)}
                            title="Excluir Usuário"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {(Object.keys(roleLabels) as Role[]).map((role) => (
              <div
                key={role}
                className="rounded-lg border border-neutral-200 bg-white p-3 shadow-vibra-sm"
              >
                <h3 className="text-[13px] font-bold text-vibra-800">{roleLabels[role]}</h3>
                <p className="mt-1 text-[12px] text-muted-foreground">{roleDescriptions[role]}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-vibra-800">Permissões Granulares</h2>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="h-8 rounded border border-neutral-200 bg-white px-2 text-[11.5px] font-bold text-vibra-700 outline-none"
              >
                {Object.entries(roleLabels).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-1 text-[11px] text-muted-foreground">
              Selecione o papel para gerenciar e salvar imediatamente os níveis de acesso.
            </p>

            <div className="mt-3 max-h-[550px] space-y-4 overflow-y-auto pr-1">
              {Array.from(new Set(permissionItems.map((item) => item.category))).map((cat) => (
                <div
                  key={cat}
                  className="space-y-1.5 border-t border-neutral-100 pt-2 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-vibra-700">
                    {cat}
                  </h3>
                  {permissionItems
                    .filter((item) => item.category === cat)
                    .map((item) => (
                      <label
                        key={item.key}
                        className="flex cursor-pointer items-center justify-between rounded-md bg-vibra-50/70 px-2.5 py-1.5 text-[11.5px] text-neutral-800 transition hover:bg-vibra-50"
                      >
                        <span>{item.label}</span>
                        <input
                          type="checkbox"
                          checked={!!rolePermissions[item.key]}
                          onChange={() => togglePermission(item.key)}
                          className="h-3.5 w-3.5 rounded border-neutral-300 text-vibra-600 focus:ring-vibra-600/20"
                        />
                      </label>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm">
            <h2 className="text-[14px] font-bold text-vibra-800">Log de usuários</h2>
            <div className="mt-3 max-h-72 space-y-2 overflow-auto">
              {logs.slice(0, 30).map((log: any) => (
                <div
                  key={log.id}
                  className="rounded-md border border-neutral-100 px-3 py-2 text-[11.5px]"
                >
                  <strong className="text-vibra-800">{log.evento}</strong> ·{" "}
                  {log.email || log.user_id}
                  <br />
                  <span className="text-muted-foreground">
                    {new Date(log.created_at).toLocaleString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-neutral-200 bg-white p-5 shadow-vibra">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-vibra-800">Editar usuário</h2>
              <button className={btnSecondary} onClick={() => setEditing(null)}>
                Fechar
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Nome"
                value={editing.nome ?? ""}
                onChange={(v) => setEditing({ ...editing, nome: v })}
              />
              <Field
                label="E-mail"
                value={editing.email ?? ""}
                onChange={(v) => setEditing({ ...editing, email: v })}
              />
              <Select
                label="Papel"
                value={editing.role}
                onChange={(v) => setEditing({ ...editing, role: v as Role })}
                options={(Object.keys(roleLabels) as Role[]).map((r) => ({
                  value: r,
                  label: roleLabels[r],
                }))}
              />
              <Field
                label="Diretoria"
                value={editing.diretoria ?? ""}
                onChange={(v) => setEditing({ ...editing, diretoria: v })}
              />
              <Field
                label="Gerência"
                value={editing.gerencia ?? ""}
                onChange={(v) => setEditing({ ...editing, gerencia: v })}
              />
              <Field
                label="Área"
                value={editing.area ?? ""}
                onChange={(v) => setEditing({ ...editing, area: v })}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className={btnSecondary} onClick={() => setEditing(null)}>
                Cancelar
              </button>
              <button className={btnPrimary} onClick={saveUser}>
                <Save className="h-3.5 w-3.5" /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

function PicklistValorRow({
  val,
  onUpdate,
  onDelete,
  isAdmin,
}: {
  val: any;
  onUpdate: (id: string, patch: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isAdmin: boolean;
}) {
  const [localValor, setLocalValor] = useState(val.valor);
  const [localOrdem, setLocalOrdem] = useState(val.ordem ?? 0);
  const [localCor, setLocalCor] = useState(val.cor ?? "#268200");

  useEffect(() => {
    setLocalValor(val.valor);
  }, [val.valor]);

  useEffect(() => {
    setLocalOrdem(val.ordem ?? 0);
  }, [val.ordem]);

  useEffect(() => {
    setLocalCor(val.cor ?? "#268200");
  }, [val.cor]);

  return (
    <div className="grid grid-cols-[1fr_64px_56px_auto_auto] items-center gap-2 rounded-md border border-neutral-100 bg-slate-50/40 p-2 hover:bg-slate-50 transition shadow-sm">
      <input
        className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[12.5px] outline-none transition focus:border-vibra-600 disabled:bg-neutral-100 disabled:text-neutral-500"
        value={localValor}
        disabled={!isAdmin}
        onChange={(e) => setLocalValor(e.target.value)}
        onBlur={() => {
          if (localValor.trim() && localValor !== val.valor) {
            onUpdate(val.id, { valor: localValor.trim() });
          }
        }}
        title="Nome do valor"
        placeholder="Texto da opção"
      />
      <input
        className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-[12.5px] outline-none transition focus:border-vibra-600 disabled:bg-neutral-100 disabled:text-neutral-500"
        type="number"
        value={localOrdem}
        disabled={!isAdmin}
        onChange={(e) => setLocalOrdem(Number(e.target.value))}
        onBlur={() => {
          if (localOrdem !== val.ordem) {
            onUpdate(val.id, { ordem: localOrdem });
          }
        }}
        title="Ordem de exibição"
      />
      <input
        className="h-9 w-full rounded-md border border-neutral-200 bg-white cursor-pointer disabled:opacity-50"
        type="color"
        value={localCor}
        disabled={!isAdmin}
        onChange={(e) => setLocalCor(e.target.value)}
        onBlur={() => {
          if (localCor !== val.cor) {
            onUpdate(val.id, { cor: localCor });
          }
        }}
        title="Cor da tag"
      />
      <button
        type="button"
        className={`h-9 px-3 text-[11px] font-bold rounded-md border transition disabled:opacity-50 ${
          val.ativo
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/50"
            : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100/50"
        }`}
        disabled={!isAdmin}
        onClick={() => onUpdate(val.id, { ativo: !val.ativo })}
      >
        {val.ativo ? "Ativo" : "Inativo"}
      </button>
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition disabled:opacity-50"
        disabled={!isAdmin}
        onClick={() => onDelete(val.id)}
        title="Excluir valor"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function PicklistsTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  useRealtimeTable("picklists", ["config-picklists"]);
  useRealtimeTable("picklist_valores", ["config-picklists"]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newCategoria, setNewCategoria] = useState("");
  const [newValor, setNewValor] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "system" | "custom" | "empty">("all");

  const { data: userRole = "admin" } = useQuery({
    queryKey: ["currentUserRole"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return "admin";
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.role || "admin";
    },
  });
  const isAdmin = userRole === "admin";

  const { data: picklists = [], refetch } = useQuery({
    queryKey: ["config-picklists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("picklists")
        .select("*, picklist_valores(*)")
        .order("categoria");
      if (error) throw error;
      return (data ?? []).map((p: any) => ({
        ...p,
        picklist_valores: [...(p.picklist_valores ?? [])].sort(
          (a, b) => (a.ordem ?? 0) - (b.ordem ?? 0),
        ),
      }));
    },
  });

  useEffect(() => {
    if (picklists.length === 0) return;
    (async () => {
      const dbCats = new Set(picklists.map((p: any) => p.categoria.toLowerCase()));
      const missing = SYSTEM_PICKLISTS.filter(
        (s) =>
          !dbCats.has(s.categoria.toLowerCase()) &&
          !(window as any).__seededCategories?.has(s.categoria.toLowerCase()),
      );
      if (missing.length > 0) {
        if (!(window as any).__seededCategories) {
          (window as any).__seededCategories = new Set();
        }
        missing.forEach((s) => (window as any).__seededCategories.add(s.categoria.toLowerCase()));

        console.log(
          "Seeding missing system picklists:",
          missing.map((m) => m.categoria),
        );
        for (const s of missing) {
          try {
            const { data: inserted } = await supabase
              .from("picklists")
              .insert({
                categoria: s.categoria,
                descricao: s.descricao || `Campo do sistema: ${s.campos.join(", ")}`,
              })
              .select("id")
              .single();

            if (inserted && s.valoresDefault) {
              const defaults = s.valoresDefault;
              for (let i = 0; i < defaults.length; i++) {
                await supabase.from("picklist_valores").insert({
                  picklist_id: inserted.id,
                  valor: defaults[i],
                  ordem: i + 1,
                  ativo: true,
                });
              }
            }
          } catch (err) {
            console.error("Error seeding picklist", s.categoria, err);
          }
        }
        qc.invalidateQueries({ queryKey: ["config-picklists"] });
      }
    })();
  }, [picklists, qc]);

  async function resetAllSystemPicklists() {
    if (!isAdmin) return toast.error("Apenas administradores podem resetar as picklists.");
    const confirmReset = await confirm(
      "Resetar e Sincronizar Picklists?",
      "ATENÇÃO: Isso excluirá os valores atuais de TODAS as picklists do sistema e as restaurará para os valores padrão de fábrica. Valores personalizados criados por você nessas categorias de sistema serão redefinidos. Deseja continuar?",
    );
    if (!confirmReset) return;

    const toastId = toast.loading("Resetando e sincronizando todas as picklists do sistema...");
    try {
      const categories = SYSTEM_PICKLISTS.map((s) => s.categoria);

      const { data: existingPls } = await supabase
        .from("picklists")
        .select("id, categoria")
        .in("categoria", categories);

      if (existingPls && existingPls.length > 0) {
        const plIds = existingPls.map((p) => p.id);

        // Delete all picklist_valores for these picklists first (avoiding foreign key constraint errors)
        const { error: delValsErr } = await supabase
          .from("picklist_valores")
          .delete()
          .in("picklist_id", plIds);

        if (delValsErr) throw delValsErr;

        // Delete the picklists themselves
        const { error: delPlsErr } = await supabase.from("picklists").delete().in("id", plIds);

        if (delPlsErr) throw delPlsErr;
      }

      // Reset the window cache so they are seeded fresh
      if ((window as any).__seededCategories) {
        (window as any).__seededCategories.clear();
      }

      // Re-seed all system picklists manually now
      for (const s of SYSTEM_PICKLISTS) {
        const { data: inserted, error: insertErr } = await supabase
          .from("picklists")
          .insert({
            categoria: s.categoria,
            descricao: s.descricao || `Campo do sistema: ${s.campos.join(", ")}`,
          })
          .select("id")
          .single();

        if (insertErr) {
          console.error("Error inserting picklist during reset", s.categoria, insertErr);
          continue;
        }

        if (inserted && s.valoresDefault) {
          const defaults = s.valoresDefault;
          for (let i = 0; i < defaults.length; i++) {
            await supabase.from("picklist_valores").insert({
              picklist_id: inserted.id,
              valor: defaults[i],
              ordem: i + 1,
              ativo: true,
            });
          }
        }
      }

      toast.success("Picklists do sistema resetadas e sincronizadas com sucesso!", { id: toastId });
      qc.invalidateQueries({ queryKey: ["config-picklists"] });
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(`Erro ao resetar as picklists: ${err.message || err}`, { id: toastId });
    }
  }

  const enriched = useMemo(
    () =>
      picklists.map((p: any) => {
        const sys = findSystemPicklist(p.categoria);
        return {
          ...p,
          _system: sys,
          _ativos: (p.picklist_valores ?? []).filter((v: any) => v.ativo).length,
        };
      }),
    [picklists],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enriched.filter((p: any) => {
      if (filter === "system" && !p._system) return false;
      if (filter === "custom" && p._system) return false;
      if (filter === "empty" && p._ativos > 0) return false;
      if (term && !p.categoria.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [enriched, search, filter]);

  const selected = enriched.find((p: any) => p.id === selectedId) ?? filtered[0] ?? enriched[0];

  async function createPicklist() {
    if (!isAdmin) return toast.error("Apenas administradores podem criar picklists.");
    const nome = newCategoria.trim();
    if (!nome) return toast.error("Informe o nome da picklist.");
    if (picklists.some((p: any) => p.categoria.toLowerCase() === nome.toLowerCase())) {
      return toast.error("Já existe uma picklist com esse nome.");
    }
    const { data, error } = await supabase
      .from("picklists")
      .insert({ categoria: nome, descricao: "Picklist personalizada" })
      .select("id")
      .single();
    if (error) return toast.error(error.message);
    setNewCategoria("");
    setSelectedId(data?.id ?? null);
    toast.success("Picklist criada.");
    qc.invalidateQueries({ queryKey: ["config-picklists"] });
  }

  async function updatePicklist(id: string, patch: any) {
    if (!isAdmin) return toast.error("Apenas administradores podem atualizar picklists.");
    const { error } = await supabase.from("picklists").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Picklist salva.");
    qc.invalidateQueries({ queryKey: ["config-picklists"] });
  }

  async function removePicklist(id: string) {
    if (!isAdmin) return toast.error("Apenas administradores podem remover picklists.");
    const target = enriched.find((p: any) => p.id === id);
    if (target?._system) {
      return toast.error(
        "Esta picklist é usada por campos do sistema e não pode ser excluída. Você pode inativar valores individualmente.",
      );
    }
    if (
      !(await confirm(
        "Excluir picklist?",
        `Excluir a picklist "${target?.categoria}" e todos os seus valores?`,
      ))
    )
      return;
    const { error: valuesError } = await supabase
      .from("picklist_valores")
      .delete()
      .eq("picklist_id", id);
    if (valuesError) return toast.error(valuesError.message);
    const { error } = await supabase.from("picklists").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Picklist removida.");
    setSelectedId(null);
    qc.invalidateQueries({ queryKey: ["config-picklists"] });
  }

  async function addValue() {
    if (!isAdmin) return toast.error("Apenas administradores podem adicionar valores.");
    const v = newValor.trim();
    if (!selected?.id || !v) return;
    const isSharedPeople = [
      "Participantes",
      "Colaborador",
      "Para quem",
      "Perfil Vinculado",
    ].includes(selected.categoria);
    if (isSharedPeople) {
      await syncSharedPeopleChange("add", v);
    } else {
      if (
        (selected.picklist_valores ?? []).some(
          (x: any) => x.valor.toLowerCase() === v.toLowerCase(),
        )
      ) {
        return toast.error("Esse valor já existe nesta picklist.");
      }
      const ordem = (selected.picklist_valores?.length ?? 0) + 1;
      const { error } = await supabase
        .from("picklist_valores")
        .insert({ picklist_id: selected.id, valor: v, ordem, ativo: true });
      if (error) return toast.error(error.message);
    }
    setNewValor("");
    toast.success("Valor adicionado.");
    qc.invalidateQueries({ queryKey: ["config-picklists"] });
  }

  async function updateValue(id: string, patch: any) {
    if (!isAdmin) return toast.error("Apenas administradores podem modificar valores.");
    const isSharedPeople = [
      "Participantes",
      "Colaborador",
      "Para quem",
      "Perfil Vinculado",
    ].includes(selected?.categoria);
    if (isSharedPeople && patch.valor !== undefined) {
      const { data: valObj } = await supabase
        .from("picklist_valores")
        .select("valor")
        .eq("id", id)
        .maybeSingle();
      if (valObj?.valor) {
        await syncSharedPeopleChange("update", patch.valor, valObj.valor);
      }
    } else {
      const { error } = await supabase.from("picklist_valores").update(patch).eq("id", id);
      if (error) return toast.error(error.message);
    }
    qc.invalidateQueries({ queryKey: ["config-picklists"] });
  }

  async function deleteValue(id: string) {
    if (!isAdmin) return toast.error("Apenas administradores podem remover valores.");
    if (!(await confirm("Excluir valor?", "Excluir este valor definitivamente?"))) return;
    const isSharedPeople = [
      "Participantes",
      "Colaborador",
      "Para quem",
      "Perfil Vinculado",
    ].includes(selected?.categoria);
    if (isSharedPeople) {
      const { data: valObj } = await supabase
        .from("picklist_valores")
        .select("valor")
        .eq("id", id)
        .maybeSingle();
      if (valObj?.valor) {
        await syncSharedPeopleChange("delete", valObj.valor);
      }
    } else {
      const { error } = await supabase.from("picklist_valores").delete().eq("id", id);
      if (error) return toast.error(error.message);
    }
    toast.success("Valor removido.");
    qc.invalidateQueries({ queryKey: ["config-picklists"] });
  }

  return (
    <Shell
      title="Picklists"
      subtitle={`${enriched.length} categorias cadastradas · alterações refletidas em tempo real em todos os formulários.`}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={resetAllSystemPicklists}
            disabled={!isAdmin}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-red-50 px-3 text-[11px] font-bold text-red-700 border border-red-200 hover:bg-red-100/50 transition shadow-sm disabled:opacity-50"
            title="Resetar e Sincronizar todas as picklists do sistema"
          >
            <RefreshCw className="h-3 w-3 shrink-0" /> Resetar e Sincronizar
          </button>
          <Toolbar
            onRefresh={() => refetch()}
            onExport={() =>
              exportCsv(
                "picklists.csv",
                picklists.flatMap((p: any) =>
                  (p.picklist_valores ?? []).map((v: any) => ({
                    picklist: p.categoria,
                    valor: v.valor,
                    ordem: v.ordem,
                    ativo: v.ativo,
                  })),
                ) as any[],
              )
            }
          />
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-vibra-sm">
          <div className="flex gap-2">
            <input
              className={inputCls}
              value={newCategoria}
              onChange={(e) => setNewCategoria(e.target.value)}
              placeholder="Nova picklist personalizada"
              onKeyDown={(e) => e.key === "Enter" && createPicklist()}
              disabled={!isAdmin}
            />
            <button
              className={btnPrimary}
              onClick={createPicklist}
              title="Criar"
              disabled={!isAdmin}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar categoria…"
              className="h-8 flex-1 bg-transparent text-[12px] outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1 text-[10.5px]">
            {(
              [
                ["all", "Todas"],
                ["system", "Sistema"],
                ["custom", "Personalizadas"],
                ["empty", "Vazias"],
              ] as const
            ).map(([k, lbl]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`rounded-full px-2 py-1 font-semibold transition ${filter === k ? "bg-vibra-700 text-white" : "bg-vibra-50 text-vibra-800 hover:bg-vibra-100"}`}
              >
                {lbl}
              </button>
            ))}
          </div>
          <div className="max-h-[560px] space-y-1 overflow-auto pr-1">
            {filtered.map((p: any) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-[12px] font-semibold transition ${selected?.id === p.id ? "bg-vibra-700 text-white" : "hover:bg-vibra-50 text-vibra-800"}`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  {p._system && (
                    <span
                      title="Campo do sistema"
                      className={`inline-block h-1.5 w-1.5 rounded-full ${selected?.id === p.id ? "bg-white" : "bg-vibra-700"}`}
                    />
                  )}
                  <span className="truncate">{p.categoria}</span>
                </span>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] ${selected?.id === p.id ? "bg-white/20 text-white" : p._ativos === 0 ? "bg-red-100 text-red-700" : "bg-neutral-100 text-neutral-700"}`}
                >
                  {p._ativos}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-2 py-4 text-center text-[11.5px] text-muted-foreground">
                Nenhuma categoria.
              </p>
            )}
          </div>
        </aside>

        {selected && (
          <div className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm">
            {!isAdmin && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[11.5px] font-medium text-amber-800 flex items-center gap-2 mb-2 animate-fadeIn">
                <span>
                  ⚠️ Modo de Leitura: Apenas administradores do sistema possuem permissão para
                  criar, atualizar ou excluir picklists e seus valores.
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-bold text-vibra-800">{selected.categoria}</h2>
                  {selected._system ? (
                    <span className="rounded-full bg-vibra-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-vibra-700">
                      Campo do sistema
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                      Personalizada
                    </span>
                  )}
                  {selected._system?.multi && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                      Múltipla escolha
                    </span>
                  )}
                </div>
                {selected._system?.campos?.length ? (
                  <p className="mt-1 text-[11.5px] text-muted-foreground">
                    Usada em:{" "}
                    <strong className="text-vibra-800">
                      {selected._system.campos.join(" · ")}
                    </strong>
                  </p>
                ) : null}
              </div>
              <button
                className={btnDanger}
                onClick={() => removePicklist(selected.id)}
                disabled={!!selected._system || !isAdmin}
                title={
                  selected._system
                    ? "Picklist do sistema não pode ser excluída"
                    : "Excluir picklist"
                }
              >
                <Trash2 className="h-3.5 w-3.5" /> Excluir
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Nome da picklist"
                value={selected.categoria ?? ""}
                onChange={(v) => updatePicklist(selected.id, { categoria: v })}
                onBlur
                disabled={!isAdmin}
              />
              <Field
                label="Descrição"
                value={selected.descricao ?? ""}
                onChange={(v) => updatePicklist(selected.id, { descricao: v })}
                onBlur
                disabled={!isAdmin}
              />
            </div>

            <div className="mt-3 flex gap-2">
              <input
                className={inputCls}
                value={newValor}
                onChange={(e) => setNewValor(e.target.value)}
                placeholder="Adicionar novo valor"
                onKeyDown={(e) => e.key === "Enter" && addValue()}
                disabled={!isAdmin}
              />
              <button className={btnPrimary} onClick={addValue} disabled={!isAdmin}>
                <ListPlus className="h-3.5 w-3.5" /> Incluir
              </button>
            </div>

            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {(selected.picklist_valores ?? []).map((v: any) => (
                <PicklistValorRow
                  key={v.id}
                  val={v}
                  onUpdate={updateValue}
                  onDelete={deleteValue}
                  isAdmin={isAdmin}
                />
              ))}
              {(selected.picklist_valores ?? []).length === 0 && (
                <p className="md:col-span-2 rounded-md border border-dashed border-neutral-200 p-3 text-center text-[12px] text-muted-foreground">
                  Nenhum valor cadastrado. Use o campo acima para criar o primeiro.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}

function HierarquiaTab() {
  const qc = useQueryClient();
  const confirm = useConfirm();
  useRealtimeTable("projetos", ["config-hierarquia"]);
  useRealtimeTable("iniciativas", ["config-hierarquia"]);
  useRealtimeTable("tarefas", ["config-hierarquia"]);
  const [macroDraft, setMacroDraft] = useState({ nome: "", descricao: "", cor: "#268200" });
  const [acaoDraft, setAcaoDraft] = useState({ iniciativa_id: "", titulo: "", status: "Pendente" });

  const emptyRows = { macros: [] as any[], iniciativas: [] as any[], acoes: [] as any[] };
  const { data: rows = emptyRows, refetch } = useQuery({
    queryKey: ["config-hierarquia"],
    queryFn: async () => {
      const [{ data: macros }, { data: iniciativas }, { data: acoes }] = await Promise.all([
        supabase.from("projetos").select("*").is("deleted_at", null).order("nome"),
        supabase
          .from("iniciativas")
          .select("id,codigo,titulo,projeto_id,status,deleted_at")
          .is("deleted_at", null)
          .order("titulo"),
        supabase
          .from("tarefas")
          .select("id,titulo,status,iniciativa_id,deleted_at")
          .is("deleted_at", null)
          .order("titulo"),
      ]);
      return { macros: macros ?? [], iniciativas: iniciativas ?? [], acoes: acoes ?? [] };
    },
  });

  async function createMacro() {
    if (!macroDraft.nome.trim()) return toast.error("Informe o projeto.");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("projetos")
      .insert({ ...macroDraft, created_by: user?.id });
    if (error) return toast.error(error.message);
    setMacroDraft({ nome: "", descricao: "", cor: "#268200" });
    toast.success("Projeto criado.");
    qc.invalidateQueries({ queryKey: ["config-hierarquia"] });
  }
  async function createAcao() {
    if (!acaoDraft.titulo.trim() || !acaoDraft.iniciativa_id)
      return toast.error("Informe iniciativa e tarefa.");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("tarefas").insert({ ...acaoDraft, created_by: user?.id });
    if (error) return toast.error(error.message);
    setAcaoDraft({ ...acaoDraft, titulo: "" });
    toast.success("Tarefa criada.");
    qc.invalidateQueries({ queryKey: ["config-hierarquia"] });
  }
  async function update(table: "projetos" | "iniciativas" | "tarefas", id: string, patch: any) {
    const { error } = await (supabase.from(table) as any).update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["config-hierarquia"] });
  }
  async function performHardDelete(table: "projetos" | "iniciativas" | "tarefas", id: string) {
    if (table === "projetos") {
      if (
        !(await confirm(
          "Excluir PROJETO?",
          "Tem certeza que deseja excluir este PROJETO permanentemente? Isto excluirá todas as iniciativas, microprocessos, tarefas e anexos vinculados de forma irreversível!",
        ))
      )
        return;
      await deleteProjectCascade(id, qc);
    } else if (table === "iniciativas") {
      if (
        !(await confirm(
          "Excluir INICIATIVA?",
          "Tem certeza que deseja excluir esta INICIATIVA permanentemente? Todos os microprocessos, tarefas e anexos vinculados a ela serão excluídos.",
        ))
      )
        return;
      await deleteInitiativeCascade(id, qc);
    } else if (table === "tarefas") {
      if (!(await confirm("Excluir TAREFA?", "Excluir esta TAREFA permanentemente?"))) return;
      await deleteTaskSimple(id, qc);
    }
  }

  return (
    <Shell
      title="Projetos, Iniciativas e Tarefas"
      subtitle="CRUD com vinculação Iniciativa → Projeto · Tarefa → Iniciativa."
      actions={
        <Toolbar
          onRefresh={() => refetch()}
          onExport={() =>
            exportCsv("hierarquia.csv", [
              ...rows.macros,
              ...rows.iniciativas,
              ...rows.acoes,
            ] as any[])
          }
        />
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Projetos">
          <div className="grid gap-2">
            <input
              className={inputCls}
              value={macroDraft.nome}
              onChange={(e) => setMacroDraft({ ...macroDraft, nome: e.target.value })}
              placeholder="Novo projeto"
            />
            <textarea
              className={areaCls}
              value={macroDraft.descricao}
              onChange={(e) => setMacroDraft({ ...macroDraft, descricao: e.target.value })}
              placeholder="Descrição"
            />
            <input
              className={inputCls}
              type="color"
              value={macroDraft.cor}
              onChange={(e) => setMacroDraft({ ...macroDraft, cor: e.target.value })}
            />
            <button className={btnPrimary} onClick={createMacro}>
              <Plus className="h-3.5 w-3.5" /> Novo
            </button>
          </div>
          <List
            rows={rows.macros}
            fields={["nome", "descricao"]}
            onSave={(id, p) => update("projetos", id, p)}
            onRemove={(id) => performHardDelete("projetos", id)}
          />
        </Panel>
        <Panel title="Iniciativas">
          <List
            rows={rows.iniciativas}
            fields={["titulo", "status"]}
            onSave={(id, p) => update("iniciativas", id, p)}
            onRemove={(id) => performHardDelete("iniciativas", id)}
          />
        </Panel>
        <Panel title="Tarefas vinculadas">
          <div className="grid gap-2">
            <select
              className={inputCls}
              value={acaoDraft.iniciativa_id}
              onChange={(e) => setAcaoDraft({ ...acaoDraft, iniciativa_id: e.target.value })}
            >
              <option value="">Iniciativa pai</option>
              {rows.iniciativas.map((i: any) => (
                <option key={i.id} value={i.id}>
                  {i.codigo ? `${i.codigo} · ` : ""}
                  {i.titulo}
                </option>
              ))}
            </select>
            <input
              className={inputCls}
              value={acaoDraft.titulo}
              onChange={(e) => setAcaoDraft({ ...acaoDraft, titulo: e.target.value })}
              placeholder="Nova tarefa"
            />
            <select
              className={inputCls}
              value={acaoDraft.status}
              onChange={(e) => setAcaoDraft({ ...acaoDraft, status: e.target.value })}
            >
              <option>Pendente</option>
              <option>Em andamento</option>
              <option>Concluída</option>
            </select>
            <button className={btnPrimary} onClick={createAcao}>
              <Plus className="h-3.5 w-3.5" /> Novo
            </button>
          </div>
          <List
            rows={rows.acoes}
            fields={["titulo", "status"]}
            onSave={(id, p) => update("tarefas", id, p)}
            onRemove={(id) => performHardDelete("tarefas", id)}
          />
        </Panel>
      </div>
    </Shell>
  );
}

function FormulasTab() {
  const qc = useQueryClient();
  useRealtimeTable("formulas", ["config-formulas"]);
  useRealtimeTable("app_configuracoes", ["config-footer"]);
  const [draft, setDraft] = useState({ nome: "", contexto: "", descricao: "", expressao: "" });

  const { data: formulas = [], refetch } = useQuery({
    queryKey: ["config-formulas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("formulas").select("*").order("nome");
      if (error) throw error;
      return data ?? [];
    },
  });
  const { data: footer } = useQuery({
    queryKey: ["config-footer"],
    queryFn: async () =>
      (await supabase.from("app_configuracoes").select("valor").eq("chave", "rodape").maybeSingle())
        .data,
  });
  const footerText = ((footer?.valor as any)?.texto ?? "") as string;

  async function createFormula() {
    if (!draft.nome.trim() || !draft.expressao.trim())
      return toast.error("Informe nome e expressão.");
    const { error } = await supabase.from("formulas").insert({ ...draft, variaveis: {} });
    if (error) return toast.error(error.message);
    setDraft({ nome: "", contexto: "", descricao: "", expressao: "" });
    toast.success("Fórmula criada.");
    qc.invalidateQueries({ queryKey: ["config-formulas"] });
  }
  async function updateFormula(id: string, patch: any) {
    const { error } = await supabase.from("formulas").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["config-formulas"] });
  }
  async function removeFormula(id: string) {
    const { error } = await supabase.from("formulas").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Fórmula removida.");
    qc.invalidateQueries({ queryKey: ["config-formulas"] });
  }
  async function saveFooter(texto: string) {
    const { error } = await supabase
      .from("app_configuracoes")
      .upsert({ chave: "rodape", valor: { texto } });
    if (error) return toast.error(error.message);
    toast.success("Rodapé salvo.");
    qc.invalidateQueries({ queryKey: ["config-footer"] });
    qc.invalidateQueries({ queryKey: ["app-footer-config"] });
  }

  return (
    <Shell
      title="Fórmulas & Gráficos"
      subtitle="CRUD de fórmulas, coeficientes editáveis e memória de cálculo em tooltips no sistema."
      actions={
        <Toolbar
          onNew={createFormula}
          onRefresh={() => refetch()}
          onExport={() => exportCsv("formulas.csv", formulas as any[])}
        />
      }
    >
      <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <Field
            label="Fórmula"
            value={draft.nome}
            onChange={(v) => setDraft({ ...draft, nome: v })}
          />
          <Field
            label="Contexto"
            value={draft.contexto}
            onChange={(v) => setDraft({ ...draft, contexto: v })}
          />
          <Field
            label="Descrição"
            value={draft.descricao}
            onChange={(v) => setDraft({ ...draft, descricao: v })}
          />
          <div className="flex items-end">
            <button className={btnPrimary} onClick={createFormula}>
              <Plus className="h-3.5 w-3.5" /> Novo
            </button>
          </div>
        </div>
        <textarea
          className={`${areaCls} mt-3`}
          value={draft.expressao}
          onChange={(e) => setDraft({ ...draft, expressao: e.target.value })}
          placeholder="Expressão da fórmula"
        />
      </div>
      <div className="grid gap-3">
        {formulas.map((f: any) => (
          <div
            key={f.id}
            className="rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm"
          >
            <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <input
                className={inputCls}
                defaultValue={f.nome}
                onBlur={(e) => updateFormula(f.id, { nome: e.target.value })}
              />
              <input
                className={inputCls}
                defaultValue={f.contexto ?? ""}
                onBlur={(e) => updateFormula(f.id, { contexto: e.target.value })}
              />
              <button className={btnDanger} onClick={() => removeFormula(f.id)}>
                <Trash2 className="h-3.5 w-3.5" /> Remover
              </button>
            </div>
            <textarea
              className={`${areaCls} mt-3 font-mono`}
              defaultValue={f.expressao}
              onBlur={(e) => updateFormula(f.id, { expressao: e.target.value })}
            />
            <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11.5px] text-amber-900">
              Memória de cálculo: {f.descricao || f.expressao}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm">
        <h2 className="text-[14px] font-bold text-vibra-800">Rodapé editável</h2>
        <textarea
          className={`${areaCls} mt-3`}
          defaultValue={footerText}
          onBlur={(e) => saveFooter(e.target.value)}
        />
        <p className="mt-2 text-[11.5px] text-muted-foreground">
          Persistência no backend ao sair do campo; o rodapé do sistema usa este texto.
        </p>
      </div>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: boolean;
}) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  return (
    <label className="block text-[12px] font-semibold text-vibra-800">
      {label}
      <input
        className={`${inputCls} mt-1`}
        value={onBlur ? local : value}
        onChange={(e) => (onBlur ? setLocal(e.target.value) : onChange(e.target.value))}
        onBlur={() => onBlur && onChange(local)}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-[12px] font-semibold text-vibra-800">
      {label}
      <select
        className={`${inputCls} mt-1`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-vibra-sm">
      <h2 className="text-[14px] font-bold text-vibra-800">{title}</h2>
      {children}
    </section>
  );
}

function List({
  rows,
  fields,
  onSave,
  onRemove,
}: {
  rows: any[];
  fields: string[];
  onSave: (id: string, patch: any) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="mt-4 max-h-[420px] space-y-2 overflow-auto">
      {rows.map((row) => (
        <div key={row.id} className="rounded-md border border-neutral-100 p-2">
          <div className="grid gap-2">
            {fields.map((field) => (
              <input
                key={field}
                className={inputCls}
                defaultValue={row[field] ?? ""}
                placeholder={field}
                onBlur={(e) => onSave(row.id, { [field]: e.target.value })}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <button
              className={btnSecondary}
              onClick={() => toast.info("Edite inline e saia do campo para salvar.")}
            >
              <Edit3 className="h-3.5 w-3.5" /> Editar
            </button>
            <button className={btnDanger} onClick={() => onRemove(row.id)}>
              <Trash2 className="h-3.5 w-3.5" /> Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
