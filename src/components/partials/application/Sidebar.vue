<template>
  <section>
    <PageLoader v-if="loading" title="Page Loading..." />
    <MainModal v-if="showModal" @close="showModal = false" :data="modalData" />
    <nav class="navbar has-background-white is-hidden-desktop">
      <div class="navbar-brand is-align-items-center">
        <button
          :class="{ 'is-active': mobileHidden }"
          class="navbar-burger navbar-menu-open"
          role="button"
          aria-expanded="false"
          @click="mobileHidden = !mobileHidden"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
    </nav>
    <div
      class="navbar-side is-relative"
      :class="{ 'is-hidden-touch': !mobileHidden }"
      style="z-index: 9999"
      data-side-class="is-hidden-touch"
    >
      <div
        class="navbar-backdrop is-fixed is-top-0 is-left-0 is-bottom-0 is-right-0 has-background-dark"
        style="opacity: 0.5"
      ></div>
      <div
        class="is-fixed is-top-0 is-left-0 is-bottom-0 has-mw-xs has-background-white"
        style="width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden"
      >
        <aside class="menu has-background-white">
          <ul class="mb-5 menu-list is-size-6">
            <li>
              <hr />
            </li>
            <li>
              <div class="columns is-multiline">
                <div class="column ml-3">
                  <EventButton :buttons="buttons" />
                </div>
                <div class="column">
                  <DropDown :dropdown="dropdown" />
                </div>
              </div>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <div class="column is-12">
                <div class="columns">
                  <div class="usericon column is-3 is-hidden-touch">
                    <img
                      alt="Vue logo"
                      :src="`/src/assets/images/users/${status}.png`"
                    />
                  </div>
                  <div class="column is-9">
                    <div class="column is-12 is-hidden-desktop">
                      <p>Status:</p>
                      <small>Active</small>
                    </div>
                    <div class="column is-12">
                      <p>Name:</p>
                      <small v-text="name"></small>
                    </div>
                    <div class="column is-12">
                      <p>Account Number:</p>
                      <small v-text="account"></small>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <hr />
            </li>
            <li v-for="(membership, i) in membershipData" :key="i">
              <div class="column is-6 is-12-desktop mb-5">
                <div class="is-flex">
                  <div>
                    <h4 class="is-size-5 mb-2" v-text="membership.title"></h4>
                    <p
                      class="has-text-grey-dark"
                      v-text="membership.information"
                    ></p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <hr />
            </li>
            <li v-for="(customer, i) in customerData" :key="i">
              <div class="column is-6 is-12-desktop mb-5">
                <div class="is-flex">
                  <div>
                    <h4 class="is-size-5 mb-2" v-text="customer.title"></h4>
                    <p
                      class="has-text-grey-dark"
                      v-text="customer.information"
                    ></p>
                  </div>
                  <div></div>
                </div>
                <div v-if="customer.updateBtn" class="mt-3 buttons is-right">
                  <button
                    class="button is-primary is-small"
                    @click="editBtnAction(customer.activeTabName)"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <hr v-if="customer.hr" />
            </li>
          </ul>
        </aside>
      </div>
    </div>
    <div class="ml-0-touch" style="margin-left: 320px"></div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import EventButton from "@components/includes/event/Button.vue";
import DropDown from "@components/includes/event/DropDown.vue";
import type { Button } from "@components/includes/event/types";
import PageLoader from "@components/page/Loader.vue";
import MainModal from "@components/includes/notification/MainModal.vue";
import { useCustomerStore } from "@stores/customer/customerStore";

@Component({
  name: "ApplicationSidebar",
  components: {
    EventButton,
    DropDown,
    PageLoader,
    MainModal,
  },
})
export default class ApplicationSidebar extends Vue {
  public loading: boolean = false;
  public showModal: boolean = false;
  public mobileHidden: boolean = false;
  public membershipData: any = [];
  public customer: any = [];
  public customerData: any = [];
  public modalData: any = {};

  public buttons: typeof Button = [
    {
      title: "Done",
      css: "is-danger",
      size: "is-normal",
      undisable: true,
      width: "is-fullwidth",
      method: {
        name: "goTo",
        action: "/security",
      },
    },
  ];

  public dropdown: any = {};

  async mounted() {
    this.loading = true;
    this.customer = await useCustomerStore().getCustomerDetails(
      this.$route.params.system,
      this.$route.params.id
    );
    this.membershipData = [
      {
        title: "Club:",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.club
            : "",
      },
      {
        title: "Membership:",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.membership
            : "",
      },
      {
        title: "Status:",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.status
            : "",
      },
      {
        title: "Payment Type:",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.paymentType
            : "",
      },
    ];

    this.customerData = [
      {
        title: "DOB:",
        hr: true,
        updateBtn: true,
        activeTabName: "PersonalInfo",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.personalInfo.dob
            : "",
      },
      {
        title: "Bank Account:",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.bankInfo.accountNo
            : "",
      },
      {
        title: "Sortcode:",
        hr: true,
        updateBtn: true,
        activeTabName: "BankDetails",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.bankInfo.sortCode
            : "",
      },
      {
        title: "Mobile:",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.contactInfo.mobile
            : "",
      },
      {
        title: "Email:",
        hr: true,
        updateBtn: true,
        activeTabName: "ContactDetails",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.contactInfo.email
            : "",
      },
      {
        title: "Address:",
        updateBtn: true,
        activeTabName: "AddressDetails",
        information:
          this.customer && this.customer.personalDetails
            ? this.customer.personalDetails.addressInfo.address1
            : "",
      },
    ];

    this.dropdown = {
    name: "Actions",
    lists: [
      {
        title: "Lapse Account",
        modal: {
          header: "Lapse Account",
          body: {
            type: "component",
            component: "LapseAccount",
            data: {
              text: [
                { title: "Last Billing Date:", info: this.customer.historicalPayments[0].dueDate},
                { title: "Next Billing Date:", info: this.customer.futurePayments[0].dueDate},
                { title: "Billing Amount:", info: this.customer.personalDetails.nextPayment},
              ],
              dropdown: [
                {
                  name: "Lapse Code",
                  lists: [
                    {title: "Cancelled Instructed by service provider - Expire", code: "R1" }, 
                    {title: "Cancelled proof of relocation", code: "L4" }, 
                    {title: "Cancelled proof of Medical Condition Received", code: "L17" }, 
                    {title: "Cancelled prood of redundancy/unemployment received", code: "L18" }, 
                    {title: "Cooling off period", code: "L14COP" }, 
                    {title: "Payment still due within the contracted period", code: "L12" }, 
                    {title: "Signed by under 18 not legal", code: "L8" }, 
                  ]
                }
              ]
            },
          },
          footer: {
            style: "justify-content: flex-end",
            buttons: [
              {
                title: "Lapse Contract",
                id: "lapseContract",
                css: "is-success modal-default-button",
                undisable: true,
                method: {
                  name: "submit",
                  action: "lapseContract",
                },
              },
            ],
          },
        },
      },
      {
        title: "Freeze Account",
        modal: {
          header: "Freeze Account",
          body: "",
          footer: {
            style: "justify-content: flex-end",
            buttons: [
              {
                title: "Freeze Customer",
                id: "freezeCustomer",
                css: "is-success modal-default-button",
                undisable: true,
                method: {
                  name: "submit",
                  action: "updateCustomerDetails",
                },
              },
            ],
          },
        },
      },
      {
        title: "Take Payment",
        modal: {
          header: "Take Payment",
          body: "",
          footer: {
            style: "justify-content: flex-end",
            buttons: [
              {
                title: "Take Payment",
                id: "takePayment",
                css: "is-success modal-default-button",
                undisable: true,
                method: {
                  name: "submit",
                  action: "updateCustomerDetails",
                },
              },
            ],
          },
        },
      },
    ],
  };

    this.loading = false;
  }

  editBtnAction(activeTab: string) {
    let header = "Update Account";
    let body = {
      activeTab: 1,
      type: "tabs",
      information: this.customer,
      tabs: [
        {
          label: "Personal Info",
          tabContent: "SidebarTab",
          tabParent: "PersonalInfo",
          static: true,
          fields: [
            {
              id: "piTitle",
              title: "Title",
              vmodel: "title",
              type: "text",
              parent: "personalInfo",
            },
            {
              id: "piFirstname",
              title: "Firstname",
              vmodel: "firstName",
              type: "text",
              parent: "personalInfo",
            },
            {
              id: "piLastname",
              title: "Lastname",
              vmodel: "lastName",
              type: "text",
              parent: "personalInfo",
            },
            {
              id: "piDOB",
              title: "Date of Birth",
              vmodel: "dob",
              type: "text",
              parent: "personalInfo",
            },
          ],
        },
        {
          label: "Bank Details",
          tabContent: "SidebarTab",
          tabParent: "BankDetails",
          information: "information",
          static: true,
          fields: [
            {
              id: "bdAccountNo",
              title: "Account No.",
              vmodel: "accountNo",
              type: "text",
              parent: "bankInfo",
            },
            {
              id: "bdSortcode",
              title: "Sort Code",
              vmodel: "sortCode",
              type: "text",
              parent: "bankInfo",
            },
            {
              id: "bdFunding",
              platform: ["legend"],
              title: "Funding ID",
              vmodel: "fundingID",
              type: "hidden",
              parent: "bankInfo",
            },
          ],
        },
        {
          label: "Contact",
          tabContent: "SidebarTab",
          tabParent: "ContactDetails",
          information: "information",
          static: true,
          fields: [
            {
              id: "cEmail",
              title: "Email",
              vmodel: "email",
              type: "text",
              parent: "contactInfo",
            },
            {
              id: "cMobile",
              title: "Mobile",
              vmodel: "mobile",
              type: "text",
              parent: "contactInfo",
            },
            {
              id: "cPhone",
              title: "Phone",
              vmodel: "phone",
              type: "text",
              parent: "contactInfo",
            },
          ],
        },
        {
          label: "Address",
          tabContent: "SidebarTab",
          tabParent: "AddressDetails",
          information: "information",
          static: true,
          fields: [
            {
              id: "aAddress1",
              title: "Address 1",
              vmodel: "address1",
              type: "text",
              parent: "addressInfo",
            },
            {
              id: "aAddress2",
              title: "Address 2",
              vmodel: "address2",
              type: "text",
              parent: "addressInfo",
            },
            {
              id: "aAddress3",
              title: "Address 3",
              vmodel: "address3",
              type: "text",
              parent: "addressInfo",
            },
            {
              id: "aPostcode",
              title: "Postcode",
              vmodel: "postcode",
              type: "text",
              parent: "addressInfo",
            },
            {
              id: "aTown",
              title: "Town",
              vmodel: "town",
              type: "text",
              parent: "addressInfo",
            },
            {
              id: "aCounty",
              title: "County",
              vmodel: "county",
              type: "text",
              parent: "addressInfo",
            },
          ],
        },
      ],
    };
    let footer = {
      style: "justify-content: flex-end",
      buttons: [
        {
          title: "Update Customer",
          id: "updateCustomer",
          css: "is-success modal-default-button",
          undisable: true,
          method: {
            name: "submit",
            action: "updateCustomerDetails",
          },
        },
      ],
    };

    this.modalData = {
      header,
      body,
      footer,
      activeTab,
    };
    this.showModal = !this.showModal;
  }

  get customerPersonalDetails() {
    return useCustomerStore().customerDetail.personalDetails;
  }

  get name() {
    return this.customerPersonalDetails &&
      this.customerPersonalDetails.personalInfo
      ? `${this.customerPersonalDetails.personalInfo.title} ${this.customerPersonalDetails.personalInfo.firstName} ${this.customerPersonalDetails.personalInfo.lastName}`
      : "";
  }

  get account() {
    return this.customerPersonalDetails
      ? this.customerPersonalDetails.referenceNumber
      : "";
  }

  get status() {
    return this.customerPersonalDetails
      ? this.customerPersonalDetails.status
      : "";
  }
}
</script>
