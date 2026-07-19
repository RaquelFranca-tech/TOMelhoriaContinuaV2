import { create } from "zustand";

/**
 * Hierarquia: Projeto → Iniciativa → Tarefa
 * Mantemos os getters legados (`macroprocessoId`, `processoId`, `acaoId`, `setMacro`, `setProcesso`, `setAcao`)
 * apontando para os novos campos para compatibilidade com componentes ainda não migrados.
 */
export type HierarchySelection = {
  projetoId: string | null;
  /** Multi-seleção de projetos. `[]` = nenhum selecionado; `null` = todos selecionados explicitamente. */
  projetoIds: string[] | null;
  iniciativaId: string | null;
  microprocessoId: string | null;
  tarefaId: string | null;
  drawerOpen: boolean;
  setProjeto: (id: string | null) => void;
  setProjetoIds: (ids: string[] | null) => void;
  setIniciativa: (id: string | null) => void;
  setMicroprocesso: (id: string | null) => void;
  setTarefa: (id: string | null) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  reset: () => void;
  // Aliases legados (deprecated)
  macroprocessoId: string | null;
  processoId: string | null;
  acaoId: string | null;
  setMacro: (id: string | null) => void;
  setProcesso: (id: string | null) => void;
  setAcao: (id: string | null) => void;
};

export const useHierarchy = create<HierarchySelection>()((set, get) => ({
  projetoId: null,
  projetoIds: [],
  iniciativaId: null,
  microprocessoId: null,
  tarefaId: null,
  drawerOpen: false,
  setProjeto: (id) =>
    set({
      projetoId: id,
      projetoIds: id ? [id] : [],
      iniciativaId: null,
      microprocessoId: null,
      tarefaId: null,
    }),
  setProjetoIds: (ids) =>
    set({
      projetoIds: ids,
      projetoId: ids && ids.length === 1 ? ids[0] : null,
      iniciativaId: null,
      microprocessoId: null,
      tarefaId: null,
    }),
  setIniciativa: (id) => set({ iniciativaId: id, microprocessoId: null, tarefaId: null }),
  setMicroprocesso: (id) => set({ microprocessoId: id, tarefaId: null }),
  setTarefa: (id) => set({ tarefaId: id }),
  openDrawer: () => set({ drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  reset: () =>
    set({
      projetoId: null,
      projetoIds: [],
      iniciativaId: null,
      microprocessoId: null,
      tarefaId: null,
    }),
  // Aliases legados
  get macroprocessoId() {
    return get().projetoId;
  },
  get processoId() {
    return null;
  },
  get acaoId() {
    return get().tarefaId;
  },
  setMacro: (id) =>
    set({ projetoId: id, projetoIds: id ? [id] : [], iniciativaId: null, tarefaId: null }),
  setProcesso: () => {
    /* nível removido */
  },
  setAcao: (id) => set({ tarefaId: id }),
}));
