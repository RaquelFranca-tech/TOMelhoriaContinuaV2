import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SubTab = { id: string; label: string; render: () => React.ReactElement };

export function GroupTab({ subtabs, initial }: { subtabs: SubTab[]; initial?: string }) {
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

  // Filter subtabs based on permission key: `sub_mapeamento_${id}`
  const visibleSubtabs = subtabs.filter((s) => {
    return hasPermission(`sub_mapeamento_${s.id}`, true);
  });

  const [active, setActive] = useState(initial ?? visibleSubtabs[0]?.id);

  // Make sure if active tab was hidden, we switch to first visible
  const activeTabId = visibleSubtabs.some((s) => s.id === active)
    ? active
    : (visibleSubtabs[0]?.id ?? "");

  const Comp =
    visibleSubtabs.find((s) => s.id === activeTabId)?.render ?? visibleSubtabs[0]?.render;

  if (visibleSubtabs.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-muted-foreground shadow-vibra-sm">
        Você não tem permissão para visualizar nenhuma sub-aba deste módulo.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-0.5 overflow-x-auto rounded-xl border border-border bg-card px-2 py-1.5 shadow-vibra-sm">
        {visibleSubtabs.map((s) => {
          const isActive = s.id === activeTabId;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-all ${
                isActive
                  ? "bg-vibra-700 text-white shadow-vibra-sm"
                  : "text-muted-foreground hover:bg-vibra-50 hover:text-vibra-800"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
      {Comp && <Comp />}
    </div>
  );
}
