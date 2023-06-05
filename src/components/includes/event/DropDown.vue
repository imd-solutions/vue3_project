<template>
  <section class="dropdown">
    <MainModal v-if="showModal" @close="showModal = false" :data="modalData" />
    <div class="dropdown" :class="{ 'is-active': active }">
      <div class="dropdown-trigger">
        <button
          class="button is-success"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          @click="activateDropdown"
        >
          <span v-text="dropdown.name"></span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a
            v-for="(drop, i) in dropdown.lists"
            class="dropdown-item"
            :key="i"
            v-text="drop.title"
            @click="openModal(drop.modal)"
          ></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import MainModal from "@components/includes/notification/MainModal.vue";

@Component({
  name: "DropDown",
  components: {
    MainModal,
  },
})
export default class DropDown extends Vue {
  @Prop({ type: Object })
  public dropdown: any = {};

  public active: boolean = false;
  public showModal: boolean = false;
  public modalData: any = {};

  activateDropdown() {
    this.active = !this.active;
  }

  openModal(modalData: any) {
    this.modalData = modalData;
    this.showModal = true;
    this.active = !this.active;
  }
}
</script>
