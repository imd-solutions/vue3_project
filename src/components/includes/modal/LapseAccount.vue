<template>
   <p v-for="(text, i) in information.text" :key="i" v-text="`${text.title} ${text.info}`"></p>
   <section v-for="(dropdown, i) in information.dropdown" class="mt-3 mb-3" :key="i">
        <DropDown  :dropdown="dropdown"/>
   </section>  
   <input type="date"> 
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import DropDown from "./ModalDropDown.vue";
@Component({
    name: "LapseAccount",
    components: {
        DropDown
    },
})
export default class LapseAccount extends Vue {
  @Prop({ type: Object })
  public information!: any;
  }
</script>
  