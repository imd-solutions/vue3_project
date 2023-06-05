import { setActivePinia, createPinia } from "pinia";
import { it, expect } from "vitest";
import { useMainStore } from "./../../stores";

describe("Counter Store", () => {
  let counter: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    counter = useMainStore();
  });

  it("increments", () => {
    expect(counter.number).toBe(0);
    counter.increment();
    expect(counter.number).toBe(1);
  });

  it("increments by amount", () => {
    counter.increment(10);
    expect(counter.number).toBe(10);
  });
});
