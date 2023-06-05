<template>
  <div>
    <slot v-if="err" name="error" :err="err" :vm="vm" :info="info">
      {{ err }}
      Something went wrong
    </slot>
    <RouterView v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { useCustomerStore } from "@stores/customer/customerStore";

@Component({
  name: "App",
  components: {},
  /* @ts-ignore */
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const customerStore = useCustomerStore();
  },
})
export default class App extends Vue {
  public err: Boolean = false;
  public vm: String = "";
  public info: String = "";

  errorCaptured(err: any, vm: any, info: any) {
    this.err = err;

    this.vm = vm;

    this.info = info;

    return false;
  }
}
</script>
