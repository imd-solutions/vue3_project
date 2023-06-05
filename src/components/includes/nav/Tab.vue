<template>
  <div class="tab" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
@Component({
  name: "Tab",
  components: {},
})
export default class Tab extends Vue {
  @Prop({ type: String })
  public title!: string;

  public isActive: Boolean = true;
}
</script>
