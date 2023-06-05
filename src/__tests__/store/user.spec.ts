import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";
import { it, expect, beforeEach, vitest } from "vitest";
import { useUserStore } from "@stores/user/userStore";

describe("User Store", () => {
  let user: any;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ createSpy: vitest.fn }));
    user = useUserStore();
  });

  it("User is not authorised", () => {
    expect(user.authenticated).toBeFalsy();
  });

  it("User is authorised", async () => {
    expect(user.authenticated).toBeFalsy();
    await user.userLogin();
    expect(user.userLogin).toHaveBeenCalledTimes(1);
    user.$patch({ userInfo: { isAuthenticated: true } });
    nextTick();
    expect(user.authenticated).toBe(true);
  });
});
