<template>
  <section>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="/src/assets/images/headers/logo.svg" alt="CCAAS - CCP"  height="40">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { useSystemStore } from "@stores/system/systemStore";

@Component({
  name: "ApplicationHeader",
  components: {},
})
export default class ApplicationHeader extends Vue {
  get siteTitle() {
    return useSystemStore().name;
  }
}
</script>
