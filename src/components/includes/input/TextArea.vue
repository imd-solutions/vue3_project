<template>
  <div class="field" :class="topCss">
    <label class="label" v-text="label"></label>
    <textarea
      class="textarea"
      :class="[{ 'is-danger': error }]"
      :placeholder="placeholder"
      :value="extraData ? extraData.note_text : value"
      :rows="row"
      :maxlength="max"
      :disabled="disableField"
      @input="updateValue($event.target)"
    ></textarea>
    <small v-if="information" v-text="information"></small>
    <span v-if="extraData && extraData.created_by">
      added by <strong>{{ extraData.created_by }}</strong> on
      {{ extraData.created_date }}</span
    >
    <p
      class="help is-danger"
      v-if="error && !errorMessage.required"
      v-text="`The ${name} field is required!`"
    ></p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";

@Component({
  name: "InputTextArea",
})
export default class InputTextArea extends Vue {
  @Prop({ type: String })
  public name!: string;

  @Prop({ type: [String, Number] })
  public inputData!: [String, Number];

  @Prop({ type: String })
  public placeholder!: string;

  @Prop({ type: String })
  public label!: string;

  @Prop({ type: String })
  public cssClass!: string;

  @Prop({ type: [String, Number, Boolean] })
  public value!: [String, Number, Boolean];

  @Prop({ type: String })
  public topCss!: string;

  @Prop({ type: String })
  public information!: string;

  @Prop({ type: Number })
  public row!: number;

  @Prop({ type: Number })
  public max!: number;

  @Prop({ type: Boolean })
  public error!: Boolean;

  @Prop({ type: Object })
  public errorMessage!: any;

  @Prop({ type: Object })
  public extraData!: any;

  @Prop({ type: Boolean })
  public disableField!: boolean;

  updateValue(value: any) {
    this.$emit("input", String(value));
  }
}
</script>

<style lang="scss" scoped>
.is-full-width {
  padding: 0px;
}
</style>
