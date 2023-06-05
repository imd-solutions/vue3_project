import type { App } from "vue";

export default {
  install: (app: App) => {
    function handleError(err: any) {
      console.log("ErrorHandle", err);
    }

    app.config.globalProperties.$handleError = handleError;

    app.provide("handleError", { handleError });
  },
};
