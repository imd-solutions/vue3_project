<template>
  <ApplicationHeader />
  <div class="columns">
    <div class="column is-2">
      <ApplicationSidebar />
    </div>
    <div class="column is-10">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import ApplicationHeader from "@components/partials/application/Header.vue";
import ApplicationSidebar from "@components/partials/application/Sidebar.vue";

@Component({
  name: "Application",
  components: {
    ApplicationHeader,
    ApplicationSidebar,
  },
})
export default class Application extends Vue {}
</script>
