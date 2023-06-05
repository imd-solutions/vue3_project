import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { alias } from "./alias";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ccp/",
  build: {
    target: "esnext",
  },
  define: {
    "process.env": {},
  },
  server: {
    port: 3000,
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import '@/assets/variables.scss';` },
    },
  },
  resolve: {
    alias: {
      ...alias,
    },
  },
});
