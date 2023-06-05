<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong v-text="siteTitle"></strong> by
        <a href="https://www.xplortechnologies.com/gb">Xplor Technologies</a>.
        <span>Version {{ siteVersion }}</span>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { useSystemStore } from "@stores/system/systemStore";

@Component({
  name: "ApplicationFooter",
  components: {},
})
export default class ApplicationFooter extends Vue {
  get siteTitle() {
    return useSystemStore().name;
  }
  get siteVersion() {
    return useSystemStore().version;
  }
}
</script>
