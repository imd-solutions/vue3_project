<template>
    <section class="modalDropdown">
        <div class="dropdown" :class="{ 'is-active': active }">
        <div class="dropdown-trigger">
            <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click="activateDropdown"
            >
                <span v-text="activeName ? activeName : dropdown.name"></span>
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
                @click="setActiveName(drop.title)"
            ></a>
            </div>
        </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";

@Component({
    name: "ModalDropDown",
    components: {},
})
export default class ModalDropDown extends Vue {
    @Prop({ type: Object })
    public dropdown: any = {};

    public active: boolean = false;
    public activeName: string = "";
    public showModal: boolean = false;

    activateDropdown() {
        this.active = !this.active;
    }

    setActiveName(name: string) {
        this.activeName = name
        this.active = !this.active
    }
}
</script>

<style lang="scss">
.modalDropdown {
    .dropdown {
    width: 100%;

    .dropdown-trigger {
        width: 100%
    }

    .dropdown-menu {
        width: 100%;
    }

    .button {
        display: flex;
        width: 100%;
        justify-content: space-between
    }
    }
}
</style>
  