import { defineStore } from "pinia";
export const useButtonStore = defineStore({
  id: "buttonStore",

  state: () => ({
    id: "" as String,
    loading: false as Boolean,
    disabled: false as Boolean,
  }),

  getters: {
    getId: (state) => state.id as String,
    getLoading: (state) => state.loading as any,
    getDisabled: (state) => state.disabled as any,
  },

  actions: {
    updateButtonId(id: string) {
      this.id = id;
      this.loading = !this.loading;
      this.disabled = !this.disabled;
    },
    stopButtonLoading() {
      this.loading = false;
    },
    stopButtonDisabled() {
      this.disabled = false;
    },
  },
});
