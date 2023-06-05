<template>
  <div
    class="pageloader is-active"
    :class="[
      cssStyle,
      { 'is-bottom-to-top': bottom },
      { 'is-left-to-right': left },
      { 'is-right-to-left': right },
    ]"
  >
    <span class="title" v-text="title"></span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
@Component({
  name: "PageLoader",
})
export default class PageLoader extends Vue {
  @Prop({ type: String, required: true })
  public title!: String;
  @Prop({ type: String })
  public cssStyle!: String;
  @Prop({ type: Boolean })
  public bottom!: Boolean;
  @Prop({ type: Boolean })
  public left!: Boolean;
  @Prop({ type: Boolean })
  public right!: Boolean;
}
</script>
