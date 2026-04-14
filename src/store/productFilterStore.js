import { create } from "zustand";

const useProductFilterStore = create((set) => ({
  filter: {
    delete_at: null,
    sub_category_slug: [],
    parent_category_slug: "",
    sub_sub_category_slug: "",
    is_best_selling: null,
    is_trending: null,
    is_top_rated: null,
    is_on_sell: null,
    is_featured: null,
    is_online_store: null,
    keyword: "",
  },

  // Update any filter fields
  updateFilter: (data) =>
    set((state) => ({
      filter: { ...state.filter, ...data },
    })),

  // Toggle category slug list
  toggleSubCategory: (slug) =>
    set((state) => {
      const exists = state.filter.sub_category_slug.includes(slug);

      return {
        filter: {
          ...state.filter,
          sub_category_slug: exists
            ? state.filter.sub_category_slug.filter((x) => x !== slug)
            : [...state.filter.sub_category_slug, slug],
        },
      };
    }),

  // Reset everything
  resetFilter: () =>
    set({
      filter: {
        delete_at: null,
        sub_category_slug: [],
      },
    }),
}));

export default useProductFilterStore;
