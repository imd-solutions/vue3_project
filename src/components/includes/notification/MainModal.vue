<template>
  <div id="modal-template">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">{{ data.header }}</slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <Tabs
                v-if="data.body.type === 'tabs'"
                :tabs="data.body.tabs"
                :information="data.body.information"
                :tabActive="data.activeTab"
              />
              <component v-else-if="data.body.type === 'component'" :is="data.body.component" :information="data.body.data"/>
              <p v-else v-text="data.body"></p>
            </slot>
          </div>
          <div class="modal-footer my-3">
            <slot name="footer">
              <br />
              <EventButton
                v-if="data.footer && data.footer.buttons"
                :buttons="data.footer.buttons"
              />
              <button
                class="button is-default modal-default-button mr-2"
                @click="$emit('close')"
              >
                Close
              </button>
              <br />
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import EventButton from "@components/includes/event/Button.vue";
import Tabs from "@components/includes/nav/Tabs.vue";
import LapseAccount from "@components/includes/modal/LapseAccount.vue";

@Component({
  name: "MainModal",
  emits: ["close"],
  components: {
    EventButton,
    LapseAccount,
    Tabs,
  },
})
export default class MainModal extends Vue {
  @Prop({ type: Object, required: true })
  public data: any = {};
}
</script>
