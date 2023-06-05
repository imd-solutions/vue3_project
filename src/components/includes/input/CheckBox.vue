<template>
  <section
    class="input-checkbox"
    :class="{ 'pl-15': padding }"
    :style="styleCss"
  >
    <div
      v-if="name !== 'Contacts' && title != null && title !== ''"
      class="columns"
    >
      <label
        v-if="name"
        class="checkbox column is-3"
        v-text="`${name}`"
      ></label>
      <div class="column" :class="{ 'is-1': small, 'is-8': !small }">
        <input
          type="checkbox"
          name="checkbox[]"
          :id="id"
          @change="check($event, model)"
          :value="title"
          :disabled="disabled"
          :checked="checked"
        />
        <label :for="id" v-if="showTitle === true" v-text="title"></label>
        <br />
      </div>
      <div v-if="small" class="column is-8" style="white-space: normal">
        <small v-text="small"></small>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";

@Component({
  name: "CheckBox",
  emits: ["items"],
})
export default class CheckBox extends Vue {
  @Prop({ type: String })
  public name!: string;
  @Prop({ type: String })
  public model!: string;
  @Prop({ type: String })
  public styleCss!: string;
  @Prop({ type: String })
  public small!: string;
  @Prop({ type: String })
  public title!: string;
  @Prop({ type: String })
  public id!: string;
  @Prop({ type: Boolean })
  public padding!: boolean;
  @Prop({ type: Boolean })
  public showTitle!: boolean;
  @Prop({ type: Boolean })
  public checked!: boolean;
  @Prop({ type: Boolean })
  public disabled!: boolean;
  @Prop({ type: [String, Array, Number] })
  public checkArray: any;
  public checkedItems: Array<string> = [];
  public items: Array<string> = [];
  public show!: boolean;

  check(event: any, model: any) {
    // If the checkbox has a model assigned to it.
    if (model) {
      // Get the value of the checkbox.
      let checkValue = event.srcElement.checked;
      // Send the value via emit to the Security page.
      this.$emit("items", checkValue, model);
    } else {
      // Get the value of the checkbox.
      let checkValue = event.target.value;
      // Send the value via emit to the Security page.
      this.$emit("items", checkValue);
    }
  }
}
</script>
