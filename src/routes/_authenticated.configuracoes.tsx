import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, type Tab } from "@/components/AppShell";
import { ConfiguracoesTabs } from "@/modules/configuracoes/ConfiguracoesTabs";
import { IntegracoesTab } from "@/modules/configuracoes/IntegracoesTab";
import { BancoGcpTab } from "@/modules/configuracoes/BancoGcpTab";
import { DesignTab } from "@/modules/configuracoes/DesignTab";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/configuracoes")({
  component: ConfiguracoesPage,
});

const TABS: Tab[] = [
  { id: "usuarios", label: "Gestão de Usuários" },
  { id: "picklists", label: "Picklists" },
  { id: "integracoes", label: "Integrações" },
  { id: "design", label: "Design & Logotipos" },
  { id: "banco", label: "Gestão de Banco de Dados" },
];

function ConfiguracoesPage() {
  const [tab, setTab] = useState("usuarios");

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

  const visibleTabs = TABS.filter((t) =>
    hasPermission(`aba_configuracoes_${t.id}`, myRole === "admin"),
  );
  const currentTab = visibleTabs.some((t) => t.id === tab)
    ? tab
    : (visibleTabs[0]?.id ?? "usuarios");

  return (
    <AppShell moduleId="configuracoes" tabs={TABS} activeTab={currentTab} onTabChange={setTab}>
      {currentTab === "integracoes" ? (
        <IntegracoesTab />
      ) : currentTab === "banco" ? (
        <BancoGcpTab />
      ) : currentTab === "design" ? (
        <DesignTab />
      ) : (
        <ConfiguracoesTabs
          tab={currentTab as "usuarios" | "picklists" | "hierarquia" | "formulas"}
        />
      )}
    </AppShell>
  );
}
