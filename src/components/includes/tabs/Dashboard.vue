<template>
  <div>
    <div class="column searchHeader">
      <h1 class="h1-bold">Customer Statuses</h1>
    </div>
    <div class="column is-12">
      <DataTable
        v-if="showTable"
        :headers="dataHeaders"
        :src="information"
        :columns="[]"
        :query="search"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import DataTable from "@components/includes/table/Data.vue";
import Search from "@components/includes/Search.vue";
import { required, numeric } from "@vuelidate/validators";
import type { Button } from "@components/includes/event/types";
import { btnPay } from "./../../../app/application/datafields";

@Component({
  name: "Dashboard",
  components: {
    Search,
    DataTable,
  },
})
export default class Dashboard extends Vue {
  @Prop({ type: Object })
  public information?: Object;

  public table_data: any[] = [];

  public search: string = "";

  public customerId: any = 1;
  public clientId: any = 1;
  public paymentDue: Array<any> = [];
  public showTable: boolean = true;
  public buttonPay: typeof Button = btnPay;
  public subTotal: number = 0;
  public statusData: Array<any> = [];
  public contentTitle: String = "";
  public contentType: String = "";
  public contentText: any;
  public contentData: any;
  public contentFooter: Object = {};
  public noteId: any;
  public correspondenceData: Array<any> = [];
  public freezeAction: String = "";
  public deleteStatus: boolean = false;
  public freezeId: number = 0;
  public statusId: number = 0;

  public showModal: boolean = false;

  public dataHeaders: any = [
    { name: "ID", ref: "id", display: false },
    { name: "Status", ref: "status", display: true },
    { name: "Event Code", ref: "eventCode", display: true },
    { name: "Applied On", ref: "appliedOn", display: true },
    { name: "Actioned By", ref: "userNameActionPerformedBy", display: true },
  ];

  public columnsAmount: Array<any> = [
    {
      field: "instalment_no",
      label: "Install No.",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "due_date",
      label: "Due Date",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "amount_due",
      label: "Amount Owed (£)",
      required: true,
      display: true,
      type: "text",
    },
  ];

  public cardPay = {
    topCss: "searchBoxAccount",
    titleCss: "column is-12",
    contentCss: "column is-12 searchContent",
    fields: [
      {
        label: "Admin Fees (£)",
        cssClass: "column is-4",
        placeholder: "£15",
        validation: {
          required,
        },
        name: "admin_fee",
        inputType: "text",
      },
      {
        label: "Sub Total (£)",
        cssClass: "column is-4 is-offset-4",
        validation: {
          required,
        },
        name: "customerOwedAmount",
        inputType: "informationOnly",
      },
    ],
  };

  public columnsCorrespondence: Array<any> = [
    {
      field: "code",
      label: "Code",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "despatch_via",
      label: "Via",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "status",
      label: "Status",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "date_sent",
      label: "Date sent/received",
      required: true,
      display: true,
      type: "text",
    },
  ];

  public columnsStatus: Array<any> = [
    {
      platform: ["dfc"],
      field: "code",
      label: "ID",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "meaning",
      label: "Status",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "eventCode",
      label: "Event Code",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "apply_from",
      label: "Applied On",
      required: true,
      display: true,
      type: "text",
      disableSort: true,
    },
    {
      field: "apply_until",
      label: "",
      required: true,
      display: true,
      type: "text",
    },
  ];

  public columnsFreeze: Array<any> = [
    {
      field: "meaning",
      label: "Status",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "code",
      label: "Code",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "apply_from",
      label: "Apply From",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "apply_until",
      label: "Apply Until",
      required: true,
      display: true,
      type: "text",
    },
  ];

  public columnsServices: Array<any> = [
    {
      field: "Description",
      label: "Description",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "StartDate",
      label: "StartDate",
      required: true,
      display: true,
      type: "text",
    },
    {
      field: "EndDate",
      label: "EndDate",
      required: true,
      display: true,
      type: "text",
    },
  ];

  public accountModal: any = {
    contentTitle: "Add New Status",
    contentType: "fields",
    contentText: [
      {
        platform: ["dfc"],
        id: "StatusAddSelect",
        title: "Status",
        vmodel: "status",
        type: "select",
        selectCode: "statusCodeData",
        selectID: "STATUS_CODE",
        selectName: "DISPLAY_NAME",
        placeHolder: "Select a status",
      },
      {
        platform: ["dfc"],
        title: "From",
        vmodel: "apply_from",
        type: "date",
        placeHolder: "01/01/2020",
      },
      {
        platform: ["dfc"],
        title: "Until",
        vmodel: "apply_until",
        type: "date",
        placeHolder: "dd/mm/yyyy",
      },
    ],
    contentFooter: {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          undisable: true,
          method: {
            name: "close",
          },
        },
        {
          title: "Add Status",
          id: "addStatusBtn",
          topCss: "column is-4",
          css: "is-success",
          undisable: true,
          method: {
            name: "submit",
            action: "addCustomerStatus",
          },
        },
      ],
    },
  };

  public cardLatestNotes = {
    topCss: "column is-12",
    title: "Latest Note",
    titleCss: "column is-12 searchHeader",
    h1Css: "h1-bold",
    contentCss: "column is-12 searchContent",
    fields: [
      {
        validation: {
          required,
        },
        label: "Note:",
        cssClass: "column is-12",
        topCss: "column is-12",
        name: "note_text",
        inputType: "textarea",
        rows: 10,
        disableField: true,
      },
    ],
  };

  public statusNotesBtn = [
    {
      topCss: "column is-12",
      title: "Delete",
      css: "is-danger",
      size: "is-normal",
      width: "is-fullwidth",
      method: {
        name: "submitBtn",
        action: "viewActionBtn",
      },
    },
  ];

  public freezeBtn = [
    {
      topCss: "column is-12",
      title: "Unfreeze",
      css: "is-primary",
      size: "is-normal",
      width: "is-fullwidth",
      method: {
        name: "submit",
        action: "unFreezeActionBtn",
      },
    },
  ];

  public serviceBtn = [
    {
      topCss: "column is-6",
      title: "Freeze",
      css: "is-primary",
      size: "is-normal",
      width: "is-fullwidth",
      method: {
        name: "submitModal",
        action: "freezeServiceActionBtn",
      },
    },
    {
      topCss: "column is-6",
      title: "Cancel",
      css: "is-danger",
      size: "is-normal",
      width: "is-fullwidth",
      method: {
        name: "submitModal",
        action: "cancelServiceActionBtn",
      },
    },
  ];

  public latestCorBtn = [
    {
      title: "View",
      css: "is-warning",
      size: "is-normal",
      width: "is-fullwidth",
      method: {
        name: "submitBtn",
        action: "viewActionBtn",
      },
    },
  ];

  mounted() {}

  cancelServiceAction(data: any) {
    this.contentTitle = "Cancel Service";
    this.contentText = [
      {
        platform: ["legend"],
        id: "CancelReasonSelect",
        title: "Reason:",
        vmodel: "cancel_reason",
        selectCode: "cancelCodeData",
        selectID: "DISPLAY_CODE",
        selectName: "DISPLAY_DESC",
        type: "select",
        placeHolder: "Select reason for cancel.",
        validation: {
          required,
        },
      },
      {
        platform: ["legend"],
        title: "From",
        vmodel: "cancel_from",
        type: "date",
        placeHolder: "13/01/2020",
        validation: {
          required,
        },
      },
    ];
    this.contentType = "fields";
    this.contentData = data;
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          method: {
            name: "close",
          },
        },
        {
          title: "Cancel Service",
          id: "cancelServiceBtn",
          topCss: "column is-4 is-offset-1",
          css: "is-danger",
          method: {
            name: "processModal",
            action: "cancelService",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  freezeServiceAction(data: any) {
    this.contentTitle = "Freeze Service";
    this.contentText = [
      {
        platform: ["legend"],
        id: "FreezeReasonSelect",
        title: "Reason:",
        vmodel: "freeze_reason",
        selectCode: "freezeCodeData",
        selectID: "dID",
        selectName: "dData",
        type: "select",
        placeHolder: "Select reason for freeze.",
        validation: {
          required,
        },
      },
      {
        platform: ["legend"],
        id: "FreezeTypeSelect",
        title: "Type",
        vmodel: "type_freeze",
        type: "select",
        selectCode: "legendFreezeTypes",
        selectID: "dID",
        selectName: "dData",
        placeHolder: "Please Select a type of freeze",
        validation: {
          required,
        },
      },
      {
        platform: ["legend"],
        title: "From",
        vmodel: "freeze_from",
        type: "date",
        placeHolder: "13/01/2020",
      },
      {
        platform: ["legend"],
        title: "Length:",
        vmodel: "freeze_length",
        type: "text",
        placeHolder: "Freeze length of time in months",
        validation: {
          required,
          numeric,
        },
      },
    ];
    this.contentType = "fields";
    this.contentData = data;
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          method: {
            name: "close",
          },
        },
        {
          title: "Freeze Service",
          id: "freezeServiceBtn",
          topCss: "column is-4 is-offset-1",
          css: "is-danger",
          method: {
            name: "processModal",
            action: "freezeService",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  unFreezeAction() {}

  // Calculate the total amount including admin fee.
  calculate() {}

  // Process the amount from the 3rd Party APi.
  processPaymentModal(form: any) {
    this.contentTitle = "Take Payment";
    this.contentData = {
      amount: this.subTotal > 0 ? this.subTotal : this.customerOwed,
      admin_fee: form.admin_fee,
      memb_ref: "",
      card_number: "",
      exp_date: "",
      cvv_number: "",
      first_name: "",
      last_name: "",
      address1: "",
      address2: "",
      town: "",
      county: "",
      postcode: "",
      phone: "",
      email: "",
    };
    this.contentType = "fields";
    // ToDo: Add this to a global file - Used in 2 places.
    this.contentText = [
      {
        title: "Amount :",
        vmodel: "amount",
        type: "text",
        placeHolder: "Enter amount here",
      },
      {
        title: "From which admin fee :",
        vmodel: "admin_fee",
        type: "text",
        placeHolder: "Enter admin fee here",
      },
      {
        title: "DFC Reference :",
        vmodel: "memb_ref",
        type: "text",
        placeHolder: "",
      },
      {
        title: "Card Number :",
        vmodel: "card_number",
        type: "text",
        placeHolder: "",
      },
      {
        title: "Expiry date :",
        vmodel: "exp_date",
        type: "text",
        placeHolder: "MM/YY",
      },
      {
        title: "CVV :",
        vmodel: "cvv_number",
        type: "text",
        placeHolder: "Enter CVV here.",
      },
      {
        title: "First Name :",
        vmodel: "first_name",
        type: "text",
        placeHolder: "First name",
      },
      {
        title: "Last Name :",
        vmodel: "last_name",
        type: "text",
        placeHolder: "Surname",
      },
      {
        title: "Address Line 1 :",
        vmodel: "address1",
        type: "text",
        placeHolder: "Address Line 1",
      },
      {
        title: "Address Line 2 :",
        vmodel: "address2",
        type: "text",
        placeHolder: "Address Line 2",
      },
      {
        title: "Town/City :",
        vmodel: "town",
        type: "text",
        placeHolder: "Town/ City",
      },
      {
        title: "County :",
        vmodel: "county",
        type: "text",
        placeHolder: "County",
      },
      {
        title: "Postcode :",
        vmodel: "postcode",
        type: "text",
        placeHolder: "Postcode",
      },
      {
        title: "Phone :",
        vmodel: "phone",
        type: "text",
        placeHolder: "Phone Number",
      },
      {
        title: "Email Address :",
        vmodel: "email",
        type: "text",
        placeHolder: "Email",
      },
    ];
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          undisable: true,
          method: {
            name: "close",
          },
        },
        {
          title: "Process Payment",
          id: "processPaymentBtn",
          topCss: "column is-4",
          css: "is-success",
          undisable: true,
          method: {
            name: "submit",
            action: "processPayment",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  // View letter/emails/SMS correspondences button. This allows you to download a copy of the letter/email/SMS
  viewLetters(value: any) {
    window.open(
      "https://app.debitfinance.co.uk/download_letter?letter_id=" +
        value.letter_id +
        "&despatch_via=" +
        value.despatch_via +
        "&date_sent=" +
        value.formatted_date,
      "_blank"
    );
  }

  // Delete the field in the table.
  deleteAction(value: any) {
    this.deleteStatus = true;
    this.statusId = value.status_id;
    this.contentTitle = "Delete " + value.code;
    this.contentText = "Are you sure you would like to delete " + value.code;
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          method: {
            name: "close",
          },
        },
        {
          title: "Delete",
          id: "deleteBtn",
          topCss: "column is-4 is-offset-1",
          css: "is-danger",
          method: {
            name: "submit",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  // Update the details in the table.
  editAction(value: any) {
    this.contentTitle = "Edit " + value.code;
    this.contentText = "This should be an object for the input fields.";
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          method: {
            name: "close",
          },
        },
        {
          title: "Update",
          id: "updateBtn",
          topCss: "column is-4 is-offset-1",
          css: "is-danger",
          method: {
            name: "submit",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  // Delete the freeze in the table.
  deleteFreezeAction(value: any) {
    this.freezeAction = "delete";
    this.contentTitle = "Delete Freeze";
    this.contentText = "Are you sure you want to delete this freeze? ";
    this.freezeId = value.schedule_id;
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          method: {
            name: "close",
          },
        },
        {
          title: "Delete",
          id: "deleteBtn",
          topCss: "column is-4 is-offset-1",
          css: "is-danger",
          method: {
            name: "submit",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  // Edit the freeze
  editFreezeAction(value: any) {
    this.contentTitle = "Edit Freeze";
    this.freezeId = value.schedule_id;
    this.freezeAction = "edit";
    this.contentText = [
      {
        title: "Apply From",
        type: "date",
        value: value.apply_from,
        placeholder: value.apply_from,
      },
      {
        title: "Apply Until",
        type: "date",
        value: value.apply_until,
        placeholder: value.apply_until,
      },
    ];
    this.contentType = "fields";
    this.contentFooter = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Close",
          id: "closeBtn",
          topCss: "column is-4",
          css: "",
          method: {
            name: "close",
          },
        },
        {
          title: "Update",
          id: "updateBtn",
          topCss: "column is-4 is-offset-1",
          css: "is-danger",
          method: {
            name: "submit",
          },
        },
      ],
    };

    this.showModal = !this.showModal;
  }

  // Submit the information from the buttons.
  submitButton() {
    this.showModal = !this.showModal;
  }

  // Update the information from the buttons.
  updateInformation() {}

  deleteFreeze() {}

  // Get the customer data.
  get customerData() {
    return {};
  }

  // Get customer owed information.
  get customerOwed() {
    return "";
  }

  get freeze(): any {
    return [];
  }

  get latestNote(): any {
    return [];
  }

  get statuses(): any {
    return [];
  }

  // Get the platform data from the local storage.
  get platformData() {
    return "legend";
  }
}
</script>
