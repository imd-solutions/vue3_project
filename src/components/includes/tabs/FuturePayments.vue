<template>
  <div>
    <div>
      <NormalTable
        :columns="columnsInstallment"
        :information="information"
        :actions="false"
        :additionalColumns="[]"
        :secondary="'payments'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import NormalTable from "@components/includes/table/Normal.vue";

@Component({
  name: "FuturePayments",
  components: {
    NormalTable,
  },
})
export default class FuturePayments extends Vue {
  @Prop({ type: Array })
  public information: Array<any> = [];

  public columnsInstallment: Array<any> = [
    {
      field: "id",
      label: "ID",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "amount",
      label: "Amount",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "dueDate",
      label: "Due date",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "sortCode",
      label: "Sort Code",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "accountNo",
      label: "Account No",
      required: true,
      display: true,
      type: "text",
    },
  ];

  // Get the customer data
  get customerData(): any {
    return [];
  }
}
</script>
