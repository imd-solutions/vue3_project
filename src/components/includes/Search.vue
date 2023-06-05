<template>
  <div :class="searches.topCss">
    <div v-if="searches.title" :class="searches.titleCss">
      <h1 :class="searches.h1Css">
        {{ searches.title }}
      </h1>
    </div>
    <div :class="searches.contentCss">
      <div :class="{ 'columns is-multiline mt-0 pl-20 pr-20': enableColumns }">
        <template v-for="(content, index) in searches.fields" :key="index">
          <InputText
            v-if="content.inputType === 'text'"
            :disableField="content.disableField && shouldDisable"
            :selectID="content.id"
            :name="content.name"
            :label="content.label"
            :class="content.cssClass"
            :placeholder="content.placeholder"
            @input="updateInputFormData"
            :inputData="form[content.name]"
            v-model="form[content.name]"
          />
          <InputTextArea
            v-else-if="content.inputType === 'textarea'"
            :selectID="content.id"
            :name="content.vmodel"
            :placeholder="content.placeHolder"
            :inputData="content.vmodel"
            :label="content.title"
            v-model="content.vmodel"
          />
          <InputSelect
            v-else
            :options="content.options"
            :name="content.name"
            :selectID="content.id"
            :selectName="content.name"
            :placeholder="content.placeholder"
            :label="content.label"
            :topCss="content.cssClass"
            :key="index"
            v-model="form[content.name]"
            :inputData="form[content.name]"
            @input="updateInputFormData"
          />
        </template>
      </div>
      <div :class="additionalCss">
        <EventButton
          :buttons="buttons"
          :multiline="multilines"
          :btnSide="btnSides"
          @submitForm="submitButton"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-facing-decorator";
import EventButton from "@components/includes/event/Button.vue";
import InputText from "@components/includes/input/Text.vue";
import InputSelect from "@components/includes/input/Select.vue";
import InputTextArea from "@components/includes/input/TextArea.vue";
import type { Button } from "@components/includes/event/types";
import { useCustomerStore } from "@stores/customer/customerStore";
import { useButtonStore } from "@stores/button/buttonStore";
@Component({
  name: "Search",
  emits: ["submit", "updateSystemName", "noresults", "clearAll"],
  components: {
    EventButton,
    InputText,
    InputSelect,
    InputTextArea,
  },
})
export default class Search extends Vue {
  public returnError: boolean = false;

  @Prop({ type: Object })
  public searches!: any;

  @Prop({ type: Array })
  public optionData!: any;

  @Prop({ type: Boolean })
  public enableColumns!: boolean;

  @Prop({ type: Boolean })
  public redirect!: boolean;

  @Prop({ type: Boolean })
  public multilines!: boolean;

  @Prop({ type: Boolean })
  public btnSides!: boolean;

  @Prop({ type: Boolean })
  public shouldDisable!: boolean;

  @Prop({ type: String })
  public additionalCss!: string | null;

  @Prop({ type: Array })
  public buttons!: typeof Button;

  @Prop({ type: Array })
  public data!: any[];

  // Form data to be used to log into the site.
  form: any = {};

  async updateInputFormData(name: string, data: any): Promise<void> {
    this.$emit("updateSystemName", data);
    this.form[name] = data;
  }
  // Submit the form.
  async submitButton(action: string, additional: string) {
    this.$emit("clearAll");
    const queryString = new URLSearchParams();

    this.form.account_no
      ? queryString.set("AccountNumber", this.form.account_no)
      : null;
    this.form.address ? queryString.set("Address", this.form.address) : null;
    this.form.system_name
      ? queryString.set("SystemName", this.form.system_name)
      : null;
    this.form.email ? queryString.set("Email", this.form.email) : null;
    this.form.first_name
      ? queryString.set("FirstName", this.form.first_name)
      : null;
    this.form.last_name
      ? queryString.set("LastName", this.form.last_name)
      : null;
    this.form.customer_ref_no
      ? queryString.set("CustomerRefNo", this.form.customer_ref_no)
      : null;
    this.form.mobile_number
      ? queryString.set("MobileNumber", this.form.mobile_number)
      : null;
    this.form.phone_number
      ? queryString.set("PhoneNumber", this.form.phone_number)
      : null;
    this.form.bacs_ref ? queryString.set("BACSRef", this.form.bacs_ref) : null;
    this.form.postcode ? queryString.set("PostCode", this.form.postcode) : null;
    this.form.sortcode ? queryString.set("SortCode", this.form.sortcode) : null;

    useButtonStore().updateButtonId(additional);

    const resp = await useCustomerStore().customerSearch(queryString);

    if (resp.length === 0) {
      this.$emit("noresults");
      return;
    }

    this.$emit("submit", resp);
  }

  // Process the given action.
  process(action: any) {
    return (this as any)[action];
  }

  redirectToCustomerPage() {
    (this as any).$router.push("/application/customer");
  }
}
</script>
