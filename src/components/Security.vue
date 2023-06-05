<template>
  <ApplicationHeader />
  <RouterView />
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import ApplicationHeader from "@components/partials/application/Header.vue";

@Component({
  name: "Application",
  components: {
    ApplicationHeader,
  },
})
export default class Application extends Vue {}
</script>
