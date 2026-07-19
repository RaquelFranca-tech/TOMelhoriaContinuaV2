import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DesignLogos {
  login_logo?: string;
  loading_logo?: string;
  module_logo?: string;
  footer_logo?: string;
  login_logo_size?: number;
  loading_logo_size?: number;
  module_logo_size?: number;
  footer_logo_size?: number;
}

export function useDesignLogos() {
  return useQuery<DesignLogos>({
    queryKey: ["design-logos"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("app_configuracoes")
          .select("valor")
          .eq("chave", "design_logos")
          .maybeSingle();

        if (error) throw error;

        // Return custom logos, merging with any local storage overrides
        const remoteLogos = (data?.valor as DesignLogos) || {};

        // Also sync with localStorage for fast, flicker-free initial load
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem("vibra_design_logos", JSON.stringify(remoteLogos));
        }

        return remoteLogos;
      } catch (err) {
        console.warn("Error fetching design logos, trying localStorage fallback:", err);
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          const cached = localStorage.getItem("vibra_design_logos");
          if (cached) {
            try {
              return JSON.parse(cached) as DesignLogos;
            } catch (e) {
              // ignore
            }
          }
        }
        return {};
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
    refetchOnWindowFocus: false,
  });
}

export function getCachedDesignLogosSync(): DesignLogos {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const cached = localStorage.getItem("vibra_design_logos");
    if (cached) {
      try {
        return JSON.parse(cached) as DesignLogos;
      } catch (e) {
        // ignore
      }
    }
  }
  return {};
}

export function useUpdateDesignLogos() {
  const qc = useQueryClient();

  return async (logos: DesignLogos) => {
    try {
      // 1. Update localStorage first for immediate local reactivity
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.setItem("vibra_design_logos", JSON.stringify(logos));
      }

      // 2. Persist to Firestore
      const { error } = await supabase.from("app_configuracoes").upsert({
        chave: "design_logos",
        valor: logos,
      });

      if (error) throw error;

      // 3. Invalidate TanStack query cache
      await qc.invalidateQueries({ queryKey: ["design-logos"] });
      toast.success("Design e logotipos atualizados com sucesso!");
      return true;
    } catch (err: any) {
      console.error("Error updating design logos:", err);
      toast.error(`Erro ao salvar logotipos: ${err.message || err}`);
      return false;
    }
  };
}
