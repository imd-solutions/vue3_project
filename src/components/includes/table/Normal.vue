<template>
  <section>
    <div class="normalContent column is-12">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(colomn, i) in columns"
              :key="i"
              v-html="colomn.label"
            ></th>
            <th v-if="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(info, i) in tableInfo" :key="i">
            <tr :class="info['failed'] ? 'lightRed' : 'lightGrey'">
              <td
                v-for="(column, i) in columns"
                :key="i"
                :class="
                  column.label === 'Failed' && info[column.field] === false
                    ? 'red'
                    : ''
                "
                v-text="
                  column.label !== 'Failed' && column.secondField
                    ? isFloat(
                        info[column.field][column.secondField],
                        column.float
                      )
                    : isFloat(info[column.field], column.float)
                "
              ></td>
              <td></td>
            </tr>
            <tr
              v-for="(pay, index) in information[i][secondary]"
              :key="index"
              :class="[
                redPaymentCodes.includes(pay['trans_code']) ? 'red' : '',
                greenPaymentCodes.includes(pay['trans_code']) ? 'green' : '',
                amberPaymentCodes.includes(pay['trans_code']) ? 'amber' : '',
              ]"
            >
              <template v-if="index > 0">
                <td
                  v-for="(column, i) in columns"
                  :key="i"
                  v-text="pay[column.field]"
                ></td>
                <td>
                  <EventsButtons
                    v-if="
                      redPaymentCodes.includes(pay['trans_code']) ||
                      greenPaymentCodes.includes(pay['trans_code'])
                    "
                    :buttons="
                      redPaymentCodes.includes(pay['trans_code'])
                        ? redButtons
                        : greenButtons
                    "
                    :btnSide="true"
                    :multiline="true"
                    :data="
                      JSON.stringify({
                        payment_id: pay['payment_id'],
                        trans_code: pay['trans_code'],
                      })
                    "
                    @submitForm="processBtn"
                  ></EventsButtons>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import EventsButtons from "@components/includes/event/Button.vue";

@Component({
  name: "NormalTable",
  components: {
    EventsButtons,
  },
})
export default class NoramlTable extends Vue {
  @Prop({ type: Array, required: true })
  public columns!: Array<any>;
  @Prop({ type: Array })
  public additionalColumns!: Array<any>;
  @Prop({ type: Array, required: true })
  public information!: any;
  @Prop({ type: String })
  public secondary!: string;
  @Prop({ type: Boolean })
  public actions!: false;

  public redPaymentCodes: any = ["UP", "DP", "PE"];
  public amberPaymentCodes: any = ["IC"];
  public greenPaymentCodes: any = ["SCP", "PC", "AC", "MC"];

  public redButtons: any = [
    {
      topCss: "btnMT",
      title: "Pay",
      css: "is-danger is-outlined ma-10",
      method: {
        name: "submitBtn",
        action: "payAmount",
      },
    },
  ];

  public greenButtons: any = [
    {
      topCss: "btnMT",
      title: "Refund",
      css: "button is-success is-outlined ma-10",
      method: {
        name: "submitBtn",
        action: "refundAmount",
      },
    },
  ];

  processBtn() {}

  // Format the amount to human readable.
  amountFormat(amount: number) {
    return amount.toFixed(2);
  }

  // Return a float.
  isFloat(data: any, float: boolean) {
    // Check to see if it is supposed to be a float.
    if (Number.isInteger(data) && float) {
      // Return the data with a float figure.
      return this.amountFormat(data);
    }
    // Return original data
    return data;
  }

  get tableInfo() {
    let data: any = [];

    for (let i = 0; i < this.information.length; i++) {
      let obj = {};
      for (let j = 0; j < this.columns.length; j++) {
        (obj as any)[this.columns[j].field] =
          this.information[i][this.columns[j].field];

        if (this.columns[j].field === "t_amount") {
          (obj as any)[this.columns[j].field] = this.information[i].amount;
        }

        if (
          this.information[i].payments > 0 &&
          this.columns[j].field === "amount"
        ) {
          (obj as any)[this.columns[j].field] =
            this.information[i].payments[0].amount;
        }

        if (
          this.information[i].payments &&
          this.information[i].payments.length > 0 &&
          (this.columns[j].field === "trans_code" ||
            this.columns[j].field === "trans_date" ||
            this.columns[j].field === "sort_code" ||
            this.columns[j].field === "account_no")
        ) {
          (obj as any)[this.columns[j].field] =
            this.information[i].payments[0][this.columns[j].field];
        }
      }

      data.push(obj);
    }

    return data;
  }
}
</script>

<style scoped lang="scss">
/* ToDo: Hannah - Move this to global SCSS */
</style>
