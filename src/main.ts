import { createApp } from "vue";
import { createPinia } from "pinia";
import { OktaAuth } from "@okta/okta-auth-js";
import OktaVue from "@okta/okta-vue";

import App from "./App.vue";
import router from "./router";
import axios from "./plugins/axios";
import handleError from "./plugins/handleError";
import { useMainStore } from "./stores";

import "./assets/main.scss";
import type { AppConfig } from "./app/services/config/app-config";
import configService from "./app/services/config/config-service";
import authService from "./app/services/auth/auth-service";
import { Interceptor } from "./app/services";

Interceptor();

const app = createApp(App);

await configService.loadConfig();
configureOkta(configService.getAppconfig());

const pinia = createPinia();

app.use(handleError);
app.use(axios, {
  baseUrl: import.meta.env.VITE_AXIOS_BASEURL,
  token: import.meta.env.VITE_AXIOS_TOKEN,
});
app.use(pinia);
app.config.globalProperties.mainStore = useMainStore();

app.use(router);
app.mount("#app");

function configureOkta(appConfig: AppConfig) {
  const oktaAuth = new OktaAuth({
    issuer: appConfig.auth.issuer,
    clientId: appConfig.auth.clientId,
    redirectUri: window.location.origin + appConfig.auth.redirectUri,
    scopes: appConfig.auth.scopes,
  });

  oktaAuth.authStateManager.subscribe((authState) => {
    // handle the latest evaluated authState, like integrate with client framework's state management store
    authService.setAuth(authState);
  });

  // @ts-ignore
  app.use(OktaVue, { oktaAuth });
}
