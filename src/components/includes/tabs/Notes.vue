<template>
  <div>
    <DataTable
      :headers="dataHeaders"
      :src="information"
      :modal="modalInformation"
      :query="search"
      :action="true"
      :buttons="viewMoreBtn"
      :removeAction="true"
      @openModalData="openModal"
    />
    <div class="column">
      <Search
        :searches="cardRaiseNote"
        :shouldDisable="false"
        :enableColumns="true"
        :buttons="buttonNote"
        :multiline="true"
        :btnSide="true"
        @clicked="insertNote"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";
import DataTable from "@components/includes/table/Data.vue";
import Search from "@components/includes/Search.vue";
import type { Button } from "@components/includes/event/types";

interface iModal {
  header: String;
  body: String | Number;
  footer?: String | Number | Array<any> | Object;
}

@Component({
  name: "Notes",
  emits: ["openModalData"],
  components: {
    DataTable,
    Search,
  },
})
export default class Notes extends Vue {
  @Prop({ type: Array })
  public information: Array<any> = [];

  public modalInformation: iModal = {
    header: "View Customer Notes",
    body: "note",
  };

  public search: string = "";

  public dataHeaders: any = [
    { name: "ID", ref: "id", display: false },
    { name: "Note", ref: "note", display: true },
    { name: "Date", ref: "date", display: true },
    { name: "User", ref: "user", display: true },
  ];

  public viewMoreBtn = [
    {
      topCss: "column is-6",
      title: "View",
      css: "is-warning",
      size: "is-normal",
      undisable: true,
      method: {
        name: "openModal",
      },
    },
  ];

  public cardRaiseNote = {
    topCss: "searchBoxAccount column is-12",
    title: "Add Note",
    titleCss: "column is-12 searchHeader",
    h1Css: "h1-bold",
    contentCss: "column is-12 searchContent",
    fields: [
      {
        label: "Note Text:",
        cssClass: "column is-12",
        topCss: "column is-12",
        name: "note_text",
        inputType: "textarea",
        rows: 10,
        max: 2000,
        information: "2000 Max characters.",
      },
    ],
  };

  public buttonNote: (typeof Button)[] = [
    {
      topCss: "column is-4 is-offset-8",
      title: "Add Note",
      css: "is-warning",
      size: "is-normal",
      width: "is-fullwidth",
      undisable: true,
      method: {
        name: "submit",
      },
    },
  ];

  openModal(data: any) {
    this.$emit("openModalData", data);
  }

  insertNote() {}
}
</script>
