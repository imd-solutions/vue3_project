<template>
  <div class="dashboard container">
    <div v-show="showNoResults" class="notification is-warning">
      <button class="delete" @click="showNoResults = !showNoResults"></button>
      There are no records that match that search criteria. Please try again.
    </div>
    <section class="columns is-multiline">
      <div class="column is-6 is-offset-3">
        <Search
          :searches="searchFields"
          :optionData="clientsData"
          :buttons="buttonSearch"
          :enableColumns="true"
          @submit="onBtnSubmit"
          @noresults="noResults"
          @clearAll="clearAll"
          @updateSystemName="updateSystem"
        />
      </div>
      <div class="column is-12">
        <data-table
          v-if="showTable"
          :headers="dataHeaders"
          :src="table_data"
          :columns="columns"
          :query="search"
          :action="true"
          linkType="text"
          :removeAction="true"
          :buttons="customerBtn"
        ></data-table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import Search from "@components/includes/Search.vue";
import DataTable from "@components/includes/table/Data.vue";
import type { ButtonSearch } from "@/src/components/includes/event/types";
import { btnSearch } from "../datafields";
import { useCustomerStore } from "@stores/customer/customerStore";
import { useButtonStore } from "@stores/button/buttonStore";
import { useSystemStore } from "@stores/system/systemStore";

@Component({
  name: "CustomerSearch",
  components: {
    Search,
    DataTable,
  },
})
export default class CustomerSearch extends Vue {
  public customerData: any = [];

  public system: string = "";

  public showTable: boolean = false;
  public showNoResults: boolean = false;

  public processing: boolean = true;

  public clientsData: [] = [];

  public dataHeaders: any = [
    { name: "System Name", ref: "systemName", display: false },
    { name: "Customer Ref", ref: "systemRefId", display: false },
    { name: "Ref Number", ref: "referenceNumber", display: true },
    { name: "Status", ref: "status", display: true },
    { name: "Title", ref: "title", display: false },
    { name: "Firstname", ref: "firstName", display: true },
    { name: "Lastname", ref: "lastName", display: true },
    { name: "Address 1", ref: "address", display: true },
    { name: "Postcode", ref: "postcode", display: true },
    { name: "Phone Number", ref: "phone", display: false },
    { name: "Mobile Number", ref: "mobile", display: false },
    { name: "Email", ref: "email", display: false },
    { name: "DOB", ref: "dob", display: false },
    { name: "Club", ref: "clubName", display: true },
  ];

  public searchFields = {
    topCss: "searchBox column is-12",
    title: "Customer Search",
    titleCss: "column is-12 searchHeader mt-5",
    h1Css: "h1-bold",
    contentCss: "searchContent pl-10 pr-10",
    fields: [
      {
        id: "systemName",
        label: "Client:",
        cssClass: "column is-6",
        name: "system_name",
        inputType: "select",
        options: [
          { id: "legend", name: "Legend" },
          { id: "dfc", name: "DFC" },
          { id: "omnis", name: "OMNIS" },
          { id: "ddms", name: "DDMS" },
        ],
        placeholder: "Please select a system",
      },
      {
        id: "membNo",
        label: "Customer Ref No:",
        cssClass: "column is-6",
        name: "customer_ref_no",
        inputType: "text",
      },
      {
        label: "First Name:",
        cssClass: "column is-6",
        name: "first_name",
        inputType: "text",
      },
      {
        label: "Last Name:",
        cssClass: "column is-6",
        name: "last_name",
        inputType: "text",
      },
      {
        label: "Address Line:",
        cssClass: "column is-6",
        name: "address",
        inputType: "text",
      },
      {
        label: "Postcode:",
        cssClass: "column is-6",
        name: "postcode",
        inputType: "text",
      },
      {
        label: "Email:",
        cssClass: "column is-12",
        name: "email",
        inputType: "text",
      },
      {
        label: "Phone Number:",
        cssClass: "column is-6",
        name: "phone_number",
        inputType: "text",
      },
      {
        label: "Mobile Number:",
        cssClass: "column is-6",
        name: "mobile_number",
        inputType: "text",
      },
      {
        label: "Account Number:",
        cssClass: "column is-6",
        name: "account_no",
        inputType: "text",
      },
      {
        label: "Sort Code:",
        cssClass: "column is-6",
        name: "sortcode",
        inputType: "text",
      },
    ],
  };

  public buttonSearch: ButtonSearch[] = btnSearch;

  public customerBtn = [
    {
      topCss: "column is-6",
      title: "View",
      css: "is-warning",
      size: "is-normal",
      undisable: true,
      method: {
        name: "pushTo",
        action: "/security/customer",
      },
    },
  ];

  public columns: Array<any> = [
    {
      field: "customer_ref_no",
      label: "Customer Ref",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "club_name",
      label: "Club Name",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "bacs_ref",
      label: "BACS Ref",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "last_name",
      label: "Lastname",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "address",
      label: "Address",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "postcode",
      label: "Postcode",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "club_ref_no",
      label: "Client Ref",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "club_name",
      label: "Client Name",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "ddi_posted_date",
      label: "Contract Batch Date",
      required: true,
      display: false,
      type: "number",
    },
    {
      field: "status",
      label: "Status",
      required: true,
      display: true,
      type: "text",
    },
  ];

  public table_data: any[] = [];

  public search: string = "";

  async mounted() {
    await useCustomerStore().clearCustomerData();
  }

  clearAll() {
    // Hide the table if it is showing.
    if (this.showTable) {
      this.showTable = !this.showTable;
    }

    // Hide the table if it is showing.
    if (this.showNoResults) {
      this.showNoResults = !this.showNoResults;
    }
  }

  onBtnSubmit(data: any) {
    if (data.length === 1) {
      this.$router.push(`/security/customer/${data[0].referenceNumber}`);
      return;
    }

    useButtonStore().stopButtonLoading();

    // Send the table data to the component.
    this.table_data = data;

    // Show table.
    this.showTable = !this.showTable;
  }

  updateSystem(name: string) {
    const DFC = "dfc";
    const OMNIS = "omnis";

    useSystemStore().updateSystemName(name);

    if (name === DFC) {
      this.searchFields.fields = this.searchFields.fields.filter(
        (field) => field.id !== "bacsOminsRef"
      );
      this.searchFields.fields.splice(1, 0, {
        id: "bacsDFCRef",
        label: "BACS Ref for DFC:",
        cssClass: "column is-6",
        name: "bacs_ref",
        inputType: "text",
      });
    } else if (name === OMNIS) {
      this.searchFields.fields = this.searchFields.fields.filter(
        (field) => field.id !== "bacsDFCRef"
      );
      this.searchFields.fields.splice(1, 0, {
        id: "bacsOminsRef",
        label: "BACS Ref for OMNIS:",
        cssClass: "column is-6",
        name: "bacs_ref",
        inputType: "text",
      });
    } else {
      this.searchFields.fields = this.searchFields.fields.filter(
        (field) => field.id !== "bacsDFCRef" && field.id !== "bacsOminsRef"
      );
    }
  }

  noResults() {
    this.showNoResults = true;

    useButtonStore().stopButtonLoading();
  }
}
</script>
