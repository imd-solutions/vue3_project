<template>
  <SiteHeader />
  <RouterView />
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import SiteHeader from "@components/partials/site/Header.vue";

@Component({
  name: "Site",
  components: {
    SiteHeader,
  },
})
export default class Site extends Vue {}
</script>
