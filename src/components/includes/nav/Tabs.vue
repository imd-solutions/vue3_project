<template>
  <div v-if="tabs">
    <ul class="tabs__header">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        @click="selectTab(i)"
        :class="{ 'is-active': i == selectedIndex }"
      >
        {{ tab.label }}
      </li>
    </ul>
  </div>
  <template v-if="information">
    <template v-for="(tab, i) in tabs" :key="i">
      <component
        v-if="activeTab === tab.tabParent"
        :is="tab.tabContent"
        :information="information[tab.information]"
        :fields="tab.fields"
        :fieldInformation="information"
        @openModalData="openModal"
      >
      </component>
    </template>
  </template>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import Dashboard from "@components/includes/tabs/Dashboard.vue";
import AccountView from "@components/includes/tabs/AccountView.vue";
import FuturePayments from "@components/includes/tabs/FuturePayments.vue";
import Notes from "@components/includes/tabs/Notes.vue";
import SidebarTab from "@components/includes/tabs/SidebarTab.vue";

@Component({
  name: "Tabs",
  emits: ["openModalData"],
  components: {
    Dashboard,
    AccountView,
    FuturePayments,
    Notes,
    SidebarTab,
  },
})
export default class Tabs extends Vue {
  @Prop({ type: Array, required: true })
  public tabs!: any;

  @Prop({ type: Object })
  public information!: any;

  @Prop({ type: String })
  public tabActive!: any;

  public active: String = "";

  public selectedIndex: Number = 0;

  public modalData: any = {};

  mounted() {
    let activeTabIndex = this.tabs.findIndex(
      (tab: any) => tab.tabParent == this.tabActive
    );
    this.selectedIndex = activeTabIndex;
  }

  openModal(data: any) {
    this.$emit("openModalData", data);
  }

  selectTab(i: any) {
    this.selectedIndex = i;
    // loop over all the tabs
    this.tabs.forEach((tab: any, index: number) => {
      tab.isActive = index === i;
    });
    this.active = this.tabs[i].tabParent;
  }

  get activeTab() {
    return this.active.length > 0 ? this.active : this.tabActive;
  }
}
</script>
