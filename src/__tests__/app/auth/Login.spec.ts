import { shallowMount } from "@vue/test-utils";
import { it, describe, expect } from "vitest";
import Login from "@/app/auth/components/Login.vue";

describe("Login Component", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(Login, {});
  });

  afterEach(() => {
    wrapper.destroy;
  });

  it("is a valid vue component", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
