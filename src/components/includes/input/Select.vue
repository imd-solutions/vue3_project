<template>
  <div class="input-select" :class="topCss">
    <label v-if="label" class="inputLabel" v-text="label"></label>
    <div class="select is-fullwidth" :class="{ 'is-danger': error }" :style="styleCSS">
      <select
        ref="input"
        class="is-fullwidth"
        :id="fieldReference"
        :style="styleCSS"
        @change="updateValue(name, ($event.target as HTMLInputElement).value)"
      >
        <!-- placeholder -->
        <option v-if="placeholder" disabled :selected="isPlaceholderSelected">
          {{ selectValue !== "" ? selectValue : placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option[selectID] ? option[selectID] : option.id"
          :value="option[selectID] ? option[selectID] : option.id"
          :selected="
            currentValue === (option[selectID] ? option[selectID] : option.id)
          "
        >
          {{ option[selectName] ? option[selectName] : option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component({
  name: "InputSelect",
  emits: ["input", "inputAction"],
})
export default class InputSelect extends Vue {
  $event: any;

  @Prop({ type: String })
  public topCss?: string;
  @Prop({ type: String })
  public name!: String;
  @Prop({ type: [String, Boolean] })
  public label?: string;
  @Prop({ type: String })
  public css?: string;
  @Prop({ type: String })
  public styleCSS?: string;
  @Prop({ type: Boolean })
  public disabled?: boolean;
  @Prop({ type: [String, Boolean] })
  public placeholder?: string;
  @Prop({ type: [String, Boolean] })
  public addon?: string;
  @Prop({ type: Boolean })
  public required?: boolean;
  @Prop({ type: [String, Boolean, Array, Object, Number] })
  public value: any;
  @Prop({ type: [String, Boolean, Array, Object, Number] })
  public options: any;
  @Prop({ type: String })
  public error?: string;
  @Prop({ type: Object })
  public errorMessage?: Object;
  @Prop({ type: String })
  public selectID!: string;
  @Prop({ type: String })
  public selectName!: string;

  public selectValue: String = "";

  get humanReadable() {
    let newName = this.name;
    newName = newName.replace("_", " ");
    return newName.replace("cancel", "lapsed");
  }

  get currentValue() {
    let options = this.options;
    if (this.value && this.value.id) {
      let currentValue = options;
      let val = JSON.stringify(this.value.id),
        filtered = options.map((result: { id: string }) => {
          return JSON.stringify(parseInt(result.id));
        });

      if (currentValue[filtered.indexOf(val)] !== undefined) {
        // return our index
        return parseInt(currentValue[filtered.indexOf(val)].id);
      } else {
        return this.value.id;
      }
    } else {
      return this.placeholder;
    }
  }

  // get unique field reference
  get fieldReference() {
    if (this.selectID) {
      return this.selectID;
    }

    let uniqId = Math.floor(new Date().valueOf() * Math.random()).toString(36);
    return "field-" + uniqId;
  }

  // check if a value is already selected
  get isPlaceholderSelected() {
    return !this.value;
  }

  public updateValue(name: any, index: any) {
    this.selectValue = index;
    this.$emit("input", name, index);
  }
}
</script>
