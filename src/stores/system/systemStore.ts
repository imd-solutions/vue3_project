import { defineStore } from "pinia";
import type { System } from "./types";

export const useSystemStore = defineStore({
  id: "systemStore",

  state: () => ({
    systemInfo: {
      name: "CCaaS Platform",
      version: "v1.0.0",
    } as System,
    systemName: "" as string,
  }),

  getters: {
    name: (state) => state.systemInfo.name as string,
    version: (state) => state.systemInfo.version as string,
    system: (state) => state.systemName as string,
  },

  actions: {
    updateSystemName(name: string) {
      this.systemName = name;
    },
  },
});
