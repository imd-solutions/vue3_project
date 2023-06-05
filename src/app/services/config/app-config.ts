export interface AppConfig {
  production: boolean;
  ccaasBaseUrl: string;
  logoutUrl: string;
  auth: {
    issuer: string;
    clientId: string;
    redirectUri: string;
    scopes: Array<string>;
  };
}
