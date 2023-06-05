import { shallowMount } from "@vue/test-utils";
import { it, describe, expect } from "vitest";
import Home from "@/app/site/components/Home.vue";

describe("Home Component", () => {
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
