import { shallowMount } from "@vue/test-utils";
import { it, describe, expect } from "vitest";
import Security from "@/app/application/components/Security.vue";

describe("Security Component", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(Security, {});
  });

  afterEach(() => {
    wrapper.destroy;
  });

  it("is a valid vue component", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
