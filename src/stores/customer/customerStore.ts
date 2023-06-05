import { defineStore } from "pinia";
import type { CustomerResponse } from "./types";
import axios from "axios";
import configService from "../../app/services/config/config-service";
import { Interceptor } from "../../app/services/http/interceptor";

const api = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASEURL,
  headers: {
    Authorization: import.meta.env.VITE_AXIOS_TOKEN
      ? `Bearer ${import.meta.env.VITE_AXIOS_TOKEN}`
      : "",
    "Content-Type": "application/json",
  },
});

Interceptor(api);

export const useCustomerStore = defineStore({
  id: "customerStore",

  state: () => ({
    customersInfo: [] as any,
    customer: {} as CustomerResponse,
    customerDetails: {} as any,
    updateCustomerDetails: {
      addressInfo: {},
      bankInfo: {},
      contactInfo: {},
      personalInfo: {},
    } as any,
  }),

  getters: {
    customerData: (state) => state.customersInfo as CustomerResponse[],
    customerDetail: (state) => state.customerDetails as any,
    updateCustomerDetail: (state) => state.updateCustomerDetails as any,
    name: (state) =>
      `${state.customer.title ? state.customer.title : ""} ${
        state.customer.firstName ? state.customer.firstName : ""
      } ${state.customer.lastName ? state.customer.lastName : ""}` as String,
    account: (state) => state.customer.referenceNumber ?? ("" as String),
    status: (state) => {
      switch (state.customer.status) {
        case "Active" as any:
          return "active";
        case "Frozen" as any:
          return "frozen";
        default:
          return "cancelled";
      }
    },
    dashBoard: (state) => state.customerDetails.dashboard as any,
    historicPayments: (state) =>
      state.customerDetails.historicalPayments as any,
  },

  actions: {
    async customerSearch(queryString: any) {
      const resp = await api
        .get(
          `${configService.getCcaasBaseUrl()}/api/ccaas/v1.0/customer/SearchCustomer?${queryString}`
        )
        .then((response: any) => (this.customersInfo = response.data.data))
        .catch((error: any) => (this as any).$handleError(error));

      return resp ? resp : [];
    },
    async getCustomerDetails(systemName: string, refId: string) {
      const resp = await api
        .get(
          `${configService.getCcaasBaseUrl()}/api/ccaas/v1.0/customer/MemberDetails?SystemName=${systemName}&SystemRefId=${refId}`
        )
        .then((response: any) => (this.customerDetails = response.data))
        .catch((error: any) => (this as any).$handleError(error));

      return resp;
    },
    async syncCustomer(customer: any) {
      this.customer = customer;
    },
    async clearCustomerData() {
      this.customersInfo = [];
      this.customer = {} as CustomerResponse;
    },
    async updateDetails(parent: string, model: string, value: any) {
      this.updateCustomerDetails[parent[0]][model] = value;
    },
    async updateCustomer() {},
  },
});
