import { shallowMount } from "@vue/test-utils";
import { it, describe, expect } from "vitest";
import Home from "@/app/application/components/Home.vue";

describe("Customer Home Component", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(Home, {});
  });

  afterEach(() => {
    wrapper.destroy;
  });

  it("is a valid vue component", () => {
    expect(wrapper.vm).toBeTruthy();
  });
});
