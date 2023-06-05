import type { AppConfig } from "./app-config";

class ConfigService {
  readonly CONFIG_URL = "/ccp/assets/data/CCPWebClientConfig.json";
  readonly APP_CONFIG = "appConfig";
  private _data: {
    appConfig: AppConfig;
    ccaasBaseUrl: string;
  };

  constructor() {
    // @ts-ignore
    this._data = {};
  }

  loadConfig2(): Promise<AppConfig> {
    return fetch(this.CONFIG_URL).then((response) => response.json());
  }

  async loadConfig(): Promise<string> {
    return new Promise((resolve) => {
      fetch(this.CONFIG_URL)
        .then((response) => response.json())
        .then((appConfig: AppConfig) => {
          this.setAppconfig(appConfig);
          this.setCcaasBaseUrl(appConfig.ccaasBaseUrl);
          resolve("config loaded");
        });
    });
  }

  getAppconfig(): AppConfig {
    return this._data?.appConfig;
  }

  setAppconfig(appConfig: AppConfig): void {
    this._data.appConfig = appConfig;
  }

  getCcaasBaseUrl(): string {
    return this._data?.ccaasBaseUrl;
  }

  setCcaasBaseUrl(ccaasBaseUrl: string): void {
    this._data.ccaasBaseUrl = ccaasBaseUrl;
  }
}

export default new ConfigService();
