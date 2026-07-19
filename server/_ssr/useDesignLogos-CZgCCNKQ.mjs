import { n as supabase } from "./client-BqoqJNkg.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useDesignLogos-CZgCCNKQ.js
function useDesignLogos() {
	return useQuery({
		queryKey: ["design-logos"],
		queryFn: async () => {
			try {
				const { data, error } = await supabase.from("app_configuracoes").select("valor").eq("chave", "design_logos").maybeSingle();
				if (error) throw error;
				const remoteLogos = data?.valor || {};
				if (typeof window !== "undefined" && typeof localStorage !== "undefined") localStorage.setItem("vibra_design_logos", JSON.stringify(remoteLogos));
				return remoteLogos;
			} catch (err) {
				console.warn("Error fetching design logos, trying localStorage fallback:", err);
				if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
					const cached = localStorage.getItem("vibra_design_logos");
					if (cached) try {
						return JSON.parse(cached);
					} catch (e) {}
				}
				return {};
			}
		},
		staleTime: 1e3 * 60 * 10,
		refetchOnWindowFocus: false
	});
}
function getCachedDesignLogosSync() {
	if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
		const cached = localStorage.getItem("vibra_design_logos");
		if (cached) try {
			return JSON.parse(cached);
		} catch (e) {}
	}
	return {};
}
function useUpdateDesignLogos() {
	const qc = useQueryClient();
	return async (logos) => {
		try {
			if (typeof window !== "undefined" && typeof localStorage !== "undefined") localStorage.setItem("vibra_design_logos", JSON.stringify(logos));
			const { error } = await supabase.from("app_configuracoes").upsert({
				chave: "design_logos",
				valor: logos
			});
			if (error) throw error;
			await qc.invalidateQueries({ queryKey: ["design-logos"] });
			toast.success("Design e logotipos atualizados com sucesso!");
			return true;
		} catch (err) {
			console.error("Error updating design logos:", err);
			toast.error(`Erro ao salvar logotipos: ${err.message || err}`);
			return false;
		}
	};
}
//#endregion
export { useDesignLogos as n, useUpdateDesignLogos as r, getCachedDesignLogosSync as t };
