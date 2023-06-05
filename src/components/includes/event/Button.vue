<template>
  <section :class="{ columns: btnSide, 'is-multiline': multiline }">
    <div v-for="(btn, index) in buttons" :class="btn.topCss" :key="index">
      <button
        v-if="btn.hide !== false"
        :key="index"
        :disabled="(disable && loading) || !btn.undisable"
        :title="btn.btnTitle ? btn.btnTitle : btn.title"
        @click.prevent="
          processMethods(
            btn.method.name,
            btn.method.action,
            btn.method?.additional
          )
        "
        :id="btn.id"
        :class="[
          { 'is-loading': loading && btn.id === btnId },
          'button',
          btn.css,
          btn.size,
          btn.width,
        ]"
      >
        <i v-if="btn.icon" :class="['fa', btn.icon]"></i>
        <span>{{ btn.title }}</span>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";
import type { Button } from "./types";
import { useButtonStore } from "@stores/button/buttonStore";

@Component({
  name: "Buttons",
  emits: ["submitForm", "openModal"],
})
export default class Buttons extends Vue {
  @Prop({ type: Array })
  public buttons!: Button[];
  @Prop({ type: Boolean })
  public valid!: boolean;
  @Prop({ type: Boolean })
  public btnSide!: boolean;
  @Prop({ type: Boolean })
  public multiline!: boolean;
  @Prop({ type: String })
  public additionalCss!: string | null;
  @Prop({ type: String })
  public data!: string | null;

  // Process the function calls from the parent component.
  processMethods(
    function_name: string,
    function_action: string | undefined,
    additional_action: string | undefined
  ): void {
    (this as any)[function_name](function_action, additional_action);
  }

  close() {
    this.$emit("closeModal");
  }

  backToSearch() {
    (this as any).$router.push("/application/client");
  }

  endTask() {
    (this as any).$router.push("/application/tasks");
  }

  // Debtbox button action.
  paymentTableAction(action: string) {
    this.$emit("processActionBtn", action, this.data);
  }

  // Push the user to the page.
  goTo(action: string) {
    (this as any).$router.push(`${action}`);
  }

  // Push the user to the page.
  pushTo(action: string) {
    (this as any).$router.push(`${action}/${this.data}`);
  }

  // Return to the main task page (If customer fails)
  return(action: string) {
    this.$router.push(action);
  }

  // Open modal.
  openModal() {
    this.$emit("openModal");
  }

  // Specific for the check and calculation of the admin fee.
  check(action: any) {
    this.$emit(action);
  }

  submitBtn(action: string) {
    this.$emit("submitForm", action, this.data);
  }

  submit(action: string, additional: string) {
    this.$emit("submitForm", action, additional);
  }

  submitModal(action: string, additional: string) {
    if (additional !== "" && additional !== undefined) {
      (this as any).data.btnText = additional;
    }
    this.$emit("submitForm", action);
  }

  processModal(action: string) {
    this.$emit("submitModalForm", action);
  }

  // Refund form action button
  refundFormAction(action: any) {
    this.$emit("processActionBtn", action, this.data);
  }

  get btnId() {
    return useButtonStore().getId;
  }

  get loading() {
    return useButtonStore().getLoading;
  }

  get disable() {
    return useButtonStore().getDisabled;
  }
}
</script>
