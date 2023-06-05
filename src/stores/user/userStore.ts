import { defineStore } from "pinia";
import type { User, UserLogin } from "./types";

export const useUserStore = defineStore({
  id: "userStore",

  state: () => ({
    userInfo: {
      id: "",
      name: "",
      email: "",
      isAuthenticated: true,
    } as User,
  }),

  getters: {
    name: (state) => state.userInfo.name as string,
    authenticated: (state) => state.userInfo.isAuthenticated as boolean,
  },

  actions: {
    async userLogin(data: UserLogin) {
      await (this as any).$axios
        .post("/user/login", {
          ...data,
        })
        .then((response: any) => (this.userInfo = response))
        .catch((error: any) => (this as any).$handleError(error));
    },

    async userLogout(id: String) {
      await (this as any).$axios
        .post("/user/logout", {
          id: id,
        })
        .then(
          () =>
            (this.userInfo = {
              id: "",
              name: "",
              email: "",
              isAuthenticated: false,
            })
        )
        .catch((error: any) => (this as any).$handleError(error));
    },
  },
});
