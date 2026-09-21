import { create } from "zustand";

export const useLinksStore = create((set) => ({
  links: [],
  isLoading: false,
  error: null,
  selectedLinkId: null,

  setLinks: (links) => set({ links }),

  addLink: (link) => set((state) => ({ links: [...state.links, link] })),

  updateLink: (id, updates) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updates } : link,
      ),
    })),

  removeLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),

  reorderLinks: (fromIndex, toIndex) =>
    set((state) => {
      const next = [...state.links];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return { links: next };
    }),

  setSelectedLinkId: (id) => set({ selectedLinkId: id }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ links: [], selectedLinkId: null, error: null }),
}));
