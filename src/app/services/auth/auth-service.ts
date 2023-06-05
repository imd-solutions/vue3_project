import { StorageService } from "../storage/storage-service";
import type { AuthState } from "node_modules/@okta/okta-auth-js/types/lib/core";

class AuthService {
  readonly AUTH_STATE = "authState";

  getAuth(): AuthState {
    return StorageService.getSessionObject(this.AUTH_STATE);
  }

  setAuth(authState: AuthState): void {
    StorageService.setSessionObject(this.AUTH_STATE, authState);
  }
}

export default new AuthService();
