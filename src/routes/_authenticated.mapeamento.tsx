import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { AppShell, type Tab } from "@/components/AppShell";
import { SipocTab } from "@/modules/mapeamento/SipocTab";
import { AsisTab } from "@/modules/mapeamento/AsisTab";
import { TobeTab } from "@/modules/mapeamento/TobeTab";
import { CausaRaizTab } from "@/modules/mapeamento/CausaRaizTab";
import { LeanTab } from "@/modules/mapeamento/LeanTab";
import { FluxoTab } from "@/modules/mapeamento/FluxoTab";
import { BpmnTab } from "@/modules/mapeamento/BpmnTab";
import { KaizenTab } from "@/modules/mapeamento/KaizenTab";
import { AjudaTab } from "@/modules/mapeamento/AjudaTab";
import { AgendaTab } from "@/modules/mapeamento/AgendaTab";
import { StatusEstrategicoTab } from "@/modules/mapeamento/StatusTab";
import { RiscosTab } from "@/modules/mapeamento/RiscosTab";
import { MatrizTab } from "@/modules/mapeamento/MatrizTab";
import { CronogramaTab } from "@/modules/mapeamento/CronogramaTab";
import { DmaicTab } from "@/modules/mapeamento/DmaicTab";
import { EvolucaoTab } from "@/modules/mapeamento/EvolucaoTab";
import { ResultadosTab } from "@/modules/mapeamento/ResultadosTab";
import { CalculadoraTab } from "@/modules/mapeamento/CalculadoraTab";
import { Top15Tab } from "@/modules/mapeamento/Top15Tab";
import { PlaybookTab } from "@/modules/mapeamento/PlaybookTab";
import { ControleTab } from "@/modules/mapeamento/ControleTab";
import { MuralImagensTab } from "@/modules/mapeamento/MuralImagensTab";
import { ChecklistTab } from "@/modules/mapeamento/ChecklistTab";
import { GroupTab } from "@/modules/mapeamento/_GroupTab";
import { FormularioTab } from "@/modules/mapeamento/FormularioTab";
import { PostosPetrobrasTab } from "@/modules/mapeamento/PostosPetrobrasTab";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/mapeamento")({
  component: MapeamentoPage,
});

const TABS: Tab[] = [
  { id: "formulario", label: "Formulário" },
  { id: "postos", label: "Postos Petrobras" },
  { id: "analise", label: "Análise" },
  { id: "causa", label: "Metodologias" },
  { id: "resultados", label: "Resultados" },
  { id: "mural", label: "Mural de Imagens" },
  { id: "governanca", label: "Governança" },
  { id: "ferramentas", label: "Ferramentas" },
  { id: "bpmn", label: "BPMN" },
  { id: "agenda", label: "Agenda" },
  { id: "ajuda", label: "Pedido de Ajuda" },
];

const RENDER: Record<string, () => React.ReactElement> = {
  formulario: FormularioTab,
  postos: PostosPetrobrasTab,
  analise: () => (
    <GroupTab
      subtabs={[
        { id: "sipoc", label: "SIPOC", render: SipocTab },
        { id: "asis", label: "AS IS", render: AsisTab },
        { id: "tobe", label: "TO BE", render: TobeTab },
        { id: "resultados", label: "AS IS × TO BE", render: ResultadosTab },
      ]}
    />
  ),
  causa: () => (
    <GroupTab
      subtabs={[
        { id: "causa", label: "Causa Raiz", render: CausaRaizTab },
        { id: "lean", label: "Lean", render: LeanTab },
        { id: "kaizen", label: "Kaizen", render: KaizenTab },
        { id: "dmaic", label: "DMAIC / Six Sigma", render: DmaicTab },
        { id: "matriz", label: "Matriz Esforço×Impacto", render: MatrizTab },
      ]}
    />
  ),
  resultados: () => (
    <GroupTab
      subtabs={[
        { id: "evolucao", label: "Evolução", render: EvolucaoTab },
        { id: "top15", label: "Top 15", render: Top15Tab },
        { id: "status", label: "Status Estratégico", render: StatusEstrategicoTab },
      ]}
    />
  ),
  mural: MuralImagensTab,
  governanca: () => (
    <GroupTab
      subtabs={[
        { id: "riscos", label: "Riscos", render: RiscosTab },
        { id: "cronograma", label: "Cronograma", render: CronogramaTab },
        { id: "controle", label: "Controle & Sustentação", render: ControleTab },
      ]}
    />
  ),
  ferramentas: () => (
    <GroupTab
      subtabs={[
        { id: "fluxo", label: "Fluxo", render: FluxoTab },
        { id: "playbook", label: "Playbook", render: PlaybookTab },
        { id: "calculadora", label: "Calculadora", render: CalculadoraTab },
        { id: "checklist", label: "Checklist de Mapeamento", render: ChecklistTab },
      ]}
    />
  ),
  bpmn: BpmnTab,
  agenda: AgendaTab,
  ajuda: AjudaTab,
};

function MapeamentoPage() {
  const [tab, setTab] = useState("formulario");

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

  const visibleTabs = TABS.filter((t) => hasPermission(`aba_mapeamento_${t.id}`, true));
  const currentTab = visibleTabs.some((t) => t.id === tab)
    ? tab
    : (visibleTabs[0]?.id ?? "formulario");

  const Comp =
    RENDER[currentTab] ?? (() => <div className="p-6 text-slate-500">Nenhuma aba disponível.</div>);

  return (
    <AppShell moduleId="mapeamento" tabs={TABS} activeTab={currentTab} onTabChange={setTab}>
      <Comp />
    </AppShell>
  );
}
