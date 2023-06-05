import { defineStore } from "pinia";

export type CounterState = {
  counter: Number;
  incrementedTimes: Number;
  decrementedTimes: Number;
};

const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export const useMainStore = defineStore({
  id: "mainStore",

  state: () => ({
    number: 0,
    incrementedTimes: 0,
    decrementedTimes: 0,
    numbers: [] as number[],
  }),

  getters: {
    double: (state) => state.number * 2,
  },

  actions: {
    increment(amount = 1) {
      this.incrementedTimes++;
      this.number += amount;
    },

    changeMe() {},

    async fail() {
      const n = this.number;
      await delay(1000);
      this.numbers.push(n);
      await delay(1000);
      if (this.number !== n) {
        throw new Error("Someone changed n!");
      }

      return n;
    },

    async decrementToZero(interval: number = 300) {
      if (this.number <= 0) return;

      while (this.number > 0) {
        this.$patch((state) => {
          state.number--;
          state.decrementedTimes++;
        });
        await delay(interval);
      }
    },
  },
});
