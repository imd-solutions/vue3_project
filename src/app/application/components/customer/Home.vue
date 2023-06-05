<template>
  <div>
    <MainModal v-if="showModal" @close="showModal = false" :data="modalData" />
    <Tabs
      v-if="tabs && customer"
      :tabs="tabs"
      :information="customer"
      tabActive="Dashboard"
      @openModalData="openModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import MainModal from "@components/includes/notification/MainModal.vue";
import Tabs from "@components/includes/nav/Tabs.vue";
import { useCustomerStore } from "@stores/customer/customerStore";

@Component({
  name: "CustomerHomepage",
  emits: ["openModalData"],
  components: {
    MainModal,
    Tabs,
  },
})
export default class CustomerHomepage extends Vue {
  public customer: any;
  public showModal: Boolean = false;
  public modalData: any = {};

  async mounted() {
    this.customer = await useCustomerStore().getCustomerDetails(
      this.$route.params.system,
      this.$route.params.id
    );
  }

  public tabs: Array<any> = [
    {
      label: "Dashboard",
      tabContent: "Dashboard",
      tabParent: "Dashboard",
      information: "dashboard",
      static: true,
    },
    {
      label: "Historic Payments",
      tabContent: "AccountView",
      tabParent: "AccountView",
      information: "historicalPayments",
      static: true,
    },
    {
      label: "Future Payments",
      tabContent: "FuturePayments",
      tabParent: "FuturePayments",
      information: "futurePayments",
      static: true,
    },
    {
      label: "Notes",
      tabContent: "Notes",
      tabParent: "Notes",
      information: "notes",
      static: true,
    },
  ];

  openModal(data: any) {
    this.showModal = !this.showModal;
    this.modalData = data;
  }
}
</script>
