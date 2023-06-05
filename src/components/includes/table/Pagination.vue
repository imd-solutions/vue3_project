<template>
  <nav class="pagination" role="navigation" aria-label="pagination">
    <button
      class="pagination-previous"
      @click="setPrevious"
      :disabled="value == 1"
    >
       <span class="icon is-small">
          <i class="fa fa-chevron-left" @click="setPrevious"></i>
        </span>
    </button>
    <button class="pagination-next" @click="setNext" :disabled="lastPage">
      <span class="icon is-small">
          <i class="fa fa-chevron-right" @click="setNext"></i>
        </span>
    </button>
    <transition-group
      name="fade"
      class="pagination-list"
      tag="ul"
      mode="out-in"
    >
      <li
        v-for="(ls, index) in pageList"
        :key="index"
        class="show-pointer"
        @click="changeSeries(ls)"
      >
        <a
          :class="{ 'pagination-link': true, 'is-current': ls == value }"
          v-if="!isNaN(ls)"
          @click.stop="$emit('input', ls)"
          >{{ ls }}</a
        >
        <span class="pagination-ellipsis" v-else>&hellip;</span>
      </li>
    </transition-group>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import type { DataInfo } from "./types";

@Component({
  name: "Pagination",
  emits: ["input"],
  components: {},
})
export default class Pagination extends Vue {
  @Prop({ type: Object, required: true })
  public info!: DataInfo;

  @Prop({ type: Number, required: true })
  public value!: number;

  public series: number = 1;
  public seriesLen: number = 5;

  setPrevious(): void {
    if (this.value == 1) {
      return;
    } else if (this.value === this.pageList[1] && this.value !== 2) {
      this.$emit("input", this.value - 1);
      this.series--;
    } else {
      this.$emit("input", this.value - 1);
    }
  }

  setNext(): void {
    if (!this.pageList.includes(this.value + 1)) {
      this.series++;
    }

    if (!this.lastPage) {
      this.$emit("input", this.value + 1);
    }
  }

  changeSeries(data: any): void {
    if (data == "nxtSeries") {
      this.series++;
    } else if (data == "prvSeries") {
      this.series--;
    }
  }

  get pageList(): any[] {
    let ret = [];
    let ttl = parseInt(this.info.total);
    let len = parseInt(this.info.len);
    let pages = Math.ceil(ttl / len);
    let ind = 1;
    let startNum = (this.series - 1) * this.seriesLen + 1;

    if (startNum > 1) {
      ret.push("prvSeries");
    }

    for (let i = startNum; i <= pages; i++) {
      if (ind > this.seriesLen) {
        ret.push("nxtSeries");
        break;
      }
      ret.push(i);
      ind++;
    }

    return ret;
  }
  get lastPage(): boolean {
    if (this.value * parseInt(this.info.len) >= this.info.total) {
      return true;
    } else {
      return false;
    }
  }
}
</script>
