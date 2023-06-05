<template>
  <div v-if="type !== 'hidden'" class="input-text" :class="topCss">
    <label class="inputLabel" v-text="label"></label>
    <div
      :class="[
        cssClass,
        { 'required has-error': error },
        { 'has-icons-left': icon },
      ]"
    >
      <input
        ref="input"
        :id="selectID"
        :name="name"
        :disabled="disableField"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :type="type"
        class="input"
        :class="[{ 'is-danger': error }]"
        :value="inputData"
        @input="updateValue(name, $event.target)"
        required
      />
      <span class="icon is-small is-left" v-if="icon">
        <i class="fa" :class="[icon.faIcon, { faError: error }]"></i>
      </span>
    </div>
    <template v-if="error">
      <p
        class="help is-danger"
        v-if="errorMessage.email == true"
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} is not a valid email!`
        "
      ></p>
      <p
        class="help is-danger"
        v-else-if="errorMessage.numeric == true"
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} field must be numeric!`
        "
      ></p>
      <p
        class="help is-danger"
        v-else-if="errorMessage.decimal == true"
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} field must be numeric or decimal!`
        "
      ></p>
      <p
        class="help is-danger"
        v-else-if="errorMessage.minLength == true"
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} field is has a minimum character!`
        "
      ></p>
      <p
        class="help is-danger"
        v-else-if="errorMessage.monthYear == true"
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} field is has a to be in month/year format`
        "
      ></p>
      <p
        class="help is-danger"
        v-else-if="errorMessage.required == true"
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} field is required!`
        "
      ></p>
      <p
        class="help is-danger"
        v-else
        v-text="
          showErrorMessage
            ? showErrorMessage
            : `The ${humanReadable} field is required!`
        "
      ></p>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";
import type { Icon, ErrorMessage } from "./types";

@Component({
  name: "InputText",
  emits: ["input"],
})
export default class InputText extends Vue {
  @Prop({ type: String })
  public name!: string;
  @Prop({ type: [String, Number] })
  public inputData!: [String, Number];
  @Prop({ type: Number })
  public maxlength!: number;
  @Prop({ type: String })
  public placeholder!: string;
  @Prop({ type: String })
  public type!: string;
  @Prop({ type: [String, Number, Boolean] })
  public value!: [String, Number, Boolean];
  @Prop({ type: String })
  public label!: string;
  @Prop({ type: String })
  public topCss!: string;
  @Prop({ type: String })
  public cssClass!: string;
  @Prop({ type: String })
  public selectID!: string;
  @Prop({ type: String })
  public inputClass!: String;
  @Prop({ type: Object })
  public icon!: Icon;
  @Prop({ type: Boolean })
  public error!: boolean;
  @Prop({ type: Boolean })
  public disableField!: boolean;
  @Prop({ type: Object })
  public errorMessage!: ErrorMessage;
  @Prop({ type: String })
  public showErrorMessage!: string;

  updateValue(name: string, eventTarget: any) {
    // emit an input to our parent
    this.$emit("input", name, eventTarget.value);
  }

  // Remove any "_" from the name so the user read it.
  get humanReadable() {
    let newName = this.name;
    newName = newName.replace("_", " ");
    return newName.replace("cancel", "lapsed");
  }
}
</script>
