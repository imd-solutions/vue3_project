<template>
  <div class="security container">
    <div class="searchBox column is-12 is-offset-3">
      <div class="column is-6 searchHeader">
        <h1 class="h1-security column">{{ customerName }}</h1>
      </div>
      <div class="searchContent column is-6">
        <CheckBox
          v-for="(content, index) in contents"
          :key="index"
          :id="content.id"
          :name="content.name"
          :title="content.title"
          @items="updateButton"
          :showTitle="showTitle"
        />
        <EventButton
          :btnSide="true"
          :buttons="buttons"
          :activeButtonStatus="false"
          @submitForm="submitButton"
        />

        <small class="tickAnswer"
          >* you need to tick at least 2 answers to move forward
        </small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import CheckBox from "@components/includes/input/CheckBox.vue";
import EventButton from "@components/includes/event/Button.vue";
import type { Button } from "@components/includes/event/types";
import type { CustomerResponse } from "@stores/customer/types.ts";
import { useCustomerStore } from "@stores/customer/customerStore";

@Component({
  name: "Security",
  components: {
    CheckBox,
    EventButton,
  },
})
export default class Security extends Vue {
  public id: number | null = 0;

  public processing: boolean = true;

  public customerRefId: string | string[] = "";
  public customer: typeof CustomerResponse;
  public customerName: string | null = null;
  public customerLinked: [] | null = [];

  public checkedItems: Array<boolean> = [];

  public disable: boolean = false;

  public contents: any | null = [];

  public showModal: boolean = true;

  public contentTitle: String = "Important instructions";

  public contentType: String = "string";

  public contentText: Array<any> = [];

  public showTitle: boolean = true;

  public errorPage: boolean = false;
  public errorMessage: string = "";

  public buttons: typeof Button = [];

  async mounted() {
    let customerData = await useCustomerStore().customerData;

    this.customerRefId = this.$route.params.id;
    this.customer = customerData.find(
      (cust: any) => cust.referenceNumber === this.$route.params.id
    );

    this.buttons = [
      {
        topCss: "column is-4",
        title: "Did not pass security",
        css: "is-danger",
        size: "is-normal",
        width: "is-fullwidth",
        undisable: true,
        method: {
          name: "return",
          action: "/security",
        },
      },
      {
        topCss: "column is-8",
        title: "Continue to Customer",
        css: "is-warning",
        size: "is-normal",
        width: "is-fullwidth",
        method: {
          name: "goTo",
          action: "/application/customer",
        },
      },
    ];

    // Set the club name.
    this.customerName = `${this.customer?.title} ${this.customer?.firstName} ${this.customer?.lastName}`;
    // Add the information to the contents for the checkbox.

    this.contents = [
      {
        id: "customerName",
        name: "Client Name",
        css: "column is-6",
        title: `${this.customer?.firstName} ${this.customer?.lastName}`,
        checkBoxCss: "securityCheckBox",
      },
      {
        id: "customerAddress",
        name: "Address",
        css: "column is-6",
        title: this.customer?.address,
        checkBoxCss: "securityCheckBox",
      },
      {
        id: "customerPostcode",
        name: "Postcode",
        css: "column is-6",
        title: this.customer?.postcode,
        checkBoxCss: "securityCheckBox",
      },
      {
        id: "customerDOB",
        name: "DOB",
        css: "column is-6",
        title: this.customer?.dob,
        checkBoxCss: "securityCheckBox",
      },
      {
        id: "customerEmail",
        name: "Email",
        css: "column is-6",
        title: this.customer?.email,
        checkBoxCss: "securityCheckBox",
      },
      {
        id: "customerPhone",
        name: "Contact Phone",
        css: "column is-6",
        title: this.customer?.phone,
        checkBoxCss: "securityCheckBox",
      },
      {
        id: "customerMobile",
        name: "Mobile Phone",
        css: "column is-6",
        title: this.customer?.mobile,
        checkBoxCss: "securityCheckBox",
      },
    ];

    await useCustomerStore().syncCustomer(this.customer);
  }

  submitButton() {}

  updateButton(value: any) {
    // Get the value into a variable
    let item = value;
    // Check that the value is not already in the CheckItems
    if (this.checkedItems.indexOf(item) === -1) {
      // Add the the checkItems.
      this.checkedItems.push(item);
    } else {
      // Get the index of the value in the checkItems.
      let index = this.checkedItems.indexOf(item);
      // Remove from the checkItems.
      this.checkedItems.splice(index, 1);
    }

    if (Object.keys(this.checkedItems).length >= 2) {
      this.buttons = [
        {
          topCss: "column is-4",
          title: "Did not pass security",
          css: "is-danger",
          size: "is-normal",
          width: "is-fullwidth",
          undisable: true,
          method: {
            name: "return",
            action: "/security",
          },
        },
        {
          topCss: "column is-8",
          title: "Continue to Customer",
          css: "is-warning",
          size: "is-normal",
          width: "is-fullwidth",
          undisable: true,
          method: {
            name: "goTo",
            action: `/application/customer/${this.customer.systemName}/${this.customer.systemRefId}`,
          },
        },
      ];
    } else {
      this.buttons = [
        {
          topCss: "column is-4",
          title: "Did not pass security",
          css: "is-danger",
          size: "is-normal",
          width: "is-fullwidth",
          undisable: true,
          method: {
            name: "return",
            action: "/security",
          },
        },
        {
          topCss: "column is-8",
          title: "Continue to Customer",
          css: "is-warning",
          size: "is-normal",
          width: "is-fullwidth",
          method: {
            name: "goTo",
            action: "/application/customer",
          },
        },
      ];
    }
  }
}
</script>
