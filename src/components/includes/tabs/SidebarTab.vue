<template>
  {{ information }}
  <section class="container personalinfo">
    <template v-for="(field, i) in fields" :key="i">
      <InputText
        v-if="field.type === 'text'"
        :selectID="field.id"
        :name="field.vmodel"
        :inputData="
          customerDetails && customerDetails[field.parent][field.vmodel]
            ? customerDetails[field.parent][field.vmodel]
            : fieldInformation['personalDetails'][field.parent][field.vmodel]
        "
        :label="field.title"
        :maxlength="field.minMaxLength"
        :disableField="field.disable"
        @input="updateForm"
      />
      <InputCheckbox
        v-if="field.type === 'checkbox'"
        :name="field.title"
        :model="field.vmodel"
        :small="field.small"
        @items="updateCheckboxValue"
      />
      <small
        style="margin-top: 10px"
        v-if="field.type === 'small'"
        v-html="field.value"
      ></small>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import InputText from "@components/includes/input/Text.vue";
import InputCheckbox from "@components/includes/input/CheckBox.vue";
import { useCustomerStore } from "@stores/customer/customerStore";

@Component({
  name: "SidebarTabs",
  emits: ["openModalData"],
  components: {
    InputText,
    InputCheckbox,
  },
})
export default class SidebarTabs extends Vue {
  @Prop({ type: Array })
  public information: Array<any> = [];
  @Prop({ type: Array })
  public fieldInformation: any = {};
  @Prop({ type: Array })
  public fields: Array<any> = [];

  public path: [] = [];

  public parent = "";

  updateForm(model: any, value: string) {
    const parent = Object.entries(this.fieldInformation.personalDetails).find(
      ([, p]) => Object.keys(p).includes(model)
    );

    if (this.fieldInformation.personalDetails[parent[0]][model] !== value) {
      useCustomerStore().updateDetails([parent[0]], model, value);
    } else {
      delete useCustomerStore().updateCustomerDetail[parent[0]][model];
    }
  }

  updateCheckboxValue() {}

  get customerDetails() {
    return useCustomerStore().updateCustomerDetail;
  }
}
</script>
