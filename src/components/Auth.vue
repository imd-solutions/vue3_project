<template>
  <AuthHeader />
  <RouterView />
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import AuthHeader from "@components/partials/auth/Header.vue";

@Component({
  name: "Auth",
  components: {
    AuthHeader,
  },
})
export default class Auth extends Vue {}
</script>
