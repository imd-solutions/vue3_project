<template>
  <div>
    <div>
      <NormalTable
        :columns="columnsInstallment"
        :information="information"
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
  name: "AccountView",
  components: {
    NormalTable,
  },
})
export default class AccountView extends Vue {
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
      field: "installNo",
      label: "Install No",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "dueDate",
      label: "Due Date",
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
      field: "trans_code",
      label: "Payment Code",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "paymentDate",
      label: "Payment date",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "paymentAmount",
      label: "Payment Amount",
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
