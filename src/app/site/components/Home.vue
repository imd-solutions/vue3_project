<template>
  <PageLoader v-if="loading" title="Page Loading..." />
  <div class="container">
    <h1>Page Loading...</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageLoader from "@components/page/Loader.vue";

@Component({
  name: "Home",
  components: {
    PageLoader,
  },
})
export default class Home extends Vue {
  public loading: Boolean = false;
}
</script>
