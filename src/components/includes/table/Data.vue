<template>
  <section class="datatable">
  <div class="searchBox">
  <div class="column is-12 searchHeader">  
    <h1 class="h1-bold">Results</h1>
  </div> 
  <div class="searchContent">
    <div class="field has-addons">
      <div class="mr-5">
        <InputSelect
          :options="options"
          placeHolder="Results Per Page"
          @input="updateOptions"
        />
      </div>
      <div class="control is-expanded">
        <input
          class="input"
          placeholder="Search...(min three characters)"
          v-model="ftText"
        />
      </div>
      <div class="control">
        <a class="button is-dark" @click="ftText = ''"
          ><i class="fa fa-times"></i
        ></a>
      </div>
    </div>
    <table
      class="table is-fullwidth"
      :style="styleCss"
    >
      <thead>
        <tr class="is-selected">
          <th
            v-for="(header, i) in displayHeaders"
            :key="i"
            @click="setSortField(i, header.ref)"
          >
            <span
              :class="{
                'icon is-pulled-right': true,
                lightOpac: i != sortInfo[0],
              }"
            >
              <i
                class="fa fa-caret-up"
                v-show="
                  i != sortInfo[0] || (i == sortInfo[0] && sortInfo[1] == 0)
                "
              ></i>
              <i
                class="fa fa-caret-down setMargin"
                v-show="
                  i != sortInfo[0] || (i == sortInfo[0] && sortInfo[1] == 1)
                "
              ></i>
            </span>
            {{ header.name }}
          </th>
          <th v-if="action">
            <span v-show="!removeAction">ACTION</span>
          </th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td :colspan="colspanLength">
            <Pagination
              :info="{ len: pageLen, total: filteredData.length }"
              v-model="page"
              :value="page"
              @input="changePage"
            />
          </td>
        </tr>
      </tfoot>

      <transition-group name="tbl" tag="tbody" mode="out-in">
        <tr v-for="(tr, i) in displayedSrcs" :key="i">
          <td v-for="(dt, j) in displayData(tr)" :key="j">
            <span> {{ formatCells(dt.value) }} </span>
          </td>
          <td v-if="action">
            <router-link v-if="linkType === 'text'" class="xplorLink" :to="`/security/customer/${tr.referenceNumber}`">View</router-link>
            <EventButton
              v-else
              :buttons="buttons"
              @submitForm="submitButton"
              :data="tr.referenceNumber"
              @openModal="openModal(modal.header, displayedSrcs[i][modal.body])"
            />
          </td>
        </tr>
      </transition-group>
    </table>
  </div> 
  </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-facing-decorator";
import EventButton from "@components/includes/event/Button.vue";
import InputSelect from "@components/includes/input/Select.vue";
import Pagination from "./Pagination.vue";
import { stringShorten } from "@utils";

@Component({
  name: "DataTable",
  emits: ["openModalData"],
  components: {
    EventButton,
    Pagination,
    InputSelect,
  },
})
export default class DataTable extends Vue {
  @Prop({ type: Array, required: true })
  headers!: any;
  @Prop({ type: Array, required: true })
  src!: any;
  @Prop({ type: Object })
  modal!: any;
  @Prop({ type: Boolean })
  action: boolean = false;
  @Prop({ type: String, required: false })
  linkType: string = "";
  @Prop({ type: Boolean, required: false })
  removeAction: boolean = false;
  @Prop({ type: Array })
  buttons!: [];
  @Prop({ type: String })
  styleCss!: "";

  public sortInfo: [number, number] = [0, 0];
  public pageLen: number = 10;
  public page: number = 1;
  public pages: any = [];
  public ftText: string = "";
  public headerRef: string = "";
  public prevFtTextLen: number = 0;
  public modalData: Object = {};

  public options: any = [
    { id: 1, name: "Results Per Page" },
    { id: 2, name: "5 Per Page" },
    { id: 3, name: "10 Per Page" },
    { id: 4, name: "15 Per Page" },
    { id: 5, name: "20 Per Page" },
  ];

  setSortField(headerIndex: number, headerRef: any) {
    this.headerRef = headerRef;
    if (this.sortInfo[0] == headerIndex) {
      if (this.sortInfo[1] == 0) {
        this.sortInfo.pop();
        this.sortInfo.push(1);
      } else {
        this.sortInfo.pop();
        this.sortInfo.push(0);
      }
    } else {
      this.sortInfo.pop();
      this.sortInfo.pop();
      this.sortInfo.push(headerIndex);
      this.sortInfo.push(0);
    }
  }

  setPages() {
    let numberOfPages = Math.ceil(this.src.length / this.pageLen);

    for (let index = 1; index <= numberOfPages; index++) {
      this.pages.push(index);
    }
  }

  paginate(src: any) {
    let page = this.page;
    let pageLen = this.pageLen;
    let from = page * pageLen - pageLen;
    let to = page * pageLen;

    return src.slice(from, to);
  }

  updateOptions(name: string, index: string) {
    switch (index) {
      case "2":
        this.pageLen = 5;
        break;
      case "3":
        this.pageLen = 10;
        break;
      case "4":
        this.pageLen = 15;
        break;
      case "5":
        this.pageLen = 20;
        break;
      default:
        this.pageLen = 10;
    }
  }

  submitButton() {}

  changePage(page: number) {
    this.page = page;
  }

  formatCells(data: string) {
    return stringShorten(data);
  }

  displayData(data: any) {
    let displayData: any = [];

    Object.keys(data).forEach((oKey) => {
      Object.keys(this.headers).forEach((h) => {
        if (oKey === this.headers[h].ref && this.headers[h].display === true) {
          displayData.push({ value: data[oKey] });
        }
      });
    });

    return displayData;
  }

  openModal(header: string, body: any, footer: any = null) {
    this.$emit("openModalData", { header: header, body: body, footer: footer });
  }

  get displayedSrcs() {
    return this.paginate(this.src);
  }

  get filteredData() {
    this.src.filter((elInfo: any) => {
      let el: any = [];
      for (let [key, value] of (Object as any).entries(elInfo)) {
        el.push(key, value);
      }

      let valid = false;
      this.headers.forEach(() => {
        if (this.ftText.trim() == "" || this.ftText.trim().length < 3) {
          valid = true;
        } else if (
          el &&
          el != null &&
          el
            .toString()
            .toLowerCase()
            .indexOf(this.ftText.trim().toLowerCase()) > -1
        ) {
          valid = true;
        }
      });
      return valid;
    });

    return this.src.sort((a: any, b: any) => {
      if (this.sortInfo[1] == 0)
        if (a[this.headerRef] > b[this.headerRef]) return 1;
        else if (a[this.headerRef] < b[this.headerRef]) return -1;
        else return 0;
      else if (a[this.headerRef] < b[this.headerRef]) return 1;
      else if (a[this.headerRef] > b[this.headerRef]) return -1;
      else return 0;
    });
  }

  get colspanLength() {
    if (this.action) {
      return this.headers.length + 1;
    }
    return this.headers.length;
  }

  get displayHeaders(): any[] {
    let displayHeader: any = [];

    this.headers.forEach(function (head: any) {
      if (head.display) {
        displayHeader.push(head);
      }
    });
    return displayHeader;
  }

  @Watch("filteredData")
  filterData() {
    this.page = 1;
    this.prevFtTextLen = this.ftText.trim().length;
  }
}
</script>
