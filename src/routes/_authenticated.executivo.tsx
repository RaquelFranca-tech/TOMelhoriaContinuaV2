import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, type Tab } from "@/components/AppShell";
import { DashboardTab } from "@/modules/executivo/DashboardTab";
import { IniciativasTab } from "@/modules/executivo/IniciativasTab";
import { GanhosTab } from "@/modules/executivo/GanhosTab";
import { EquipeTab } from "@/modules/executivo/EquipeTab";
import { MC3Tab } from "@/modules/executivo/MC3Tab";
import { RelatoriosTab } from "@/modules/executivo/RelatoriosTab";
import { MeuDiaTab } from "@/modules/executivo/MeuDiaTab";
import { TarefasTab } from "@/modules/executivo/TarefasTab";
import { GestaoMudancaTab } from "@/modules/mapeamento/GestaoMudancaTab";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/executivo")({
  component: ExecutivoPage,
});

const TABS: Tab[] = [
  { id: "meudia", label: "Meu Dia" },
  { id: "dashboard", label: "Visão Executiva" },
  { id: "iniciativas", label: "Iniciativas" },
  { id: "equipe", label: "Stakeholders" },
  { id: "ganhos", label: "Metas" },
  { id: "mudanca", label: "Gestão de Mudança" },
  { id: "relatorios", label: "Relatórios" },
  { id: "tarefas", label: "Tarefas" },
  { id: "mc3", label: "MC³| Motivação Contínua🚀" },
];

function ExecutivoPage() {
  const [tab, setTab] = useState("meudia");

  // Get user role & permissions
  const { data: myRole = "visualizador" } = useQuery({
    queryKey: ["my-role"],
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
    return defaultVal;
  };

  const visibleTabs = TABS.filter((t) => hasPermission(`aba_executivo_${t.id}`, true));
  const currentTab = visibleTabs.some((t) => t.id === tab) ? tab : (visibleTabs[0]?.id ?? "meudia");

  return (
    <AppShell moduleId="executivo" tabs={TABS} activeTab={currentTab} onTabChange={setTab}>
      {currentTab === "meudia" && <MeuDiaTab />}
      {currentTab === "dashboard" && <DashboardTab />}
      {currentTab === "iniciativas" && <IniciativasTab />}
      {currentTab === "equipe" && <EquipeTab />}
      {currentTab === "ganhos" && <GanhosTab />}
      {currentTab === "mudanca" && <GestaoMudancaTab />}
      {currentTab === "relatorios" && <RelatoriosTab />}
      {currentTab === "tarefas" && <TarefasTab />}
      {currentTab === "mc3" && <MC3Tab />}
    </AppShell>
  );
}
