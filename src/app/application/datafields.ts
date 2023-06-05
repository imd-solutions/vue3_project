import { required, numeric } from "@vuelidate/validators";

export const Quick = {
  topCss: "searchBox column is-12",
  title: "Quick Search",
  titleCss: "column is-12 searchHeader",
  h1Css: "h1-bold",
  contentCss: "searchContent pl-10 pr-10",
  fields: [
    {
      label: "Client No:",
      cssClass: "column is-12",
      validation: {
        numeric,
      },
      name: "client_number",
      inputType: "text",
      disableField: true,
    },
    {
      label: "Customer No:",
      cssClass: "column is-12",
      validation: {
        numeric,
      },
      name: "customer_number",
      inputType: "text",
    },
  ],
};

export const Postcode = {
  topCss: "searchBox column is-12",
  title: "Search by Postcode",
  titleCss: "column is-12 searchHeader",
  h1Css: "h1-bold",
  contentCss: "searchContent pl-10 pr-10",
  fields: [
    {
      label: "Postcode:",
      cssClass: "column is-12",
      validation: {
        required,
      },
      name: "postcode",
      inputType: "text",
    },
  ],
};

export const Fields = {
  topCss: "searchBox column is-12",
  title: "Search by other fields",
  titleCss: "column is-12 searchHeader",
  h1Css: "h1-bold",
  contentCss: "searchContent",
  fields: [
    {
      label: "Client Name:",
      cssClass: "column is-4",
      name: "club_name",
      inputType: "text",
      disableField: true,
    },
    {
      label: "Client Ref No:",
      cssClass: "column is-4",
      name: "club_ref_no",
      inputType: "text",
    },
    {
      label: "Client Reference:",
      cssClass: "column is-4",
      name: "memb_ref",
      inputType: "text",
    },
    {
      label: "Firstname:",
      cssClass: "column is-6",
      name: "first_name",
      inputType: "text",
    },
    {
      label: "Lastname:",
      cssClass: "column is-6",
      name: "last_name",
      inputType: "text",
    },
    {
      label: "Address Line 1:",
      cssClass: "column is-6",
      name: "address1",
      inputType: "text",
    },
    {
      label: "Postcode:",
      cssClass: "column is-6",
      name: "postcode",
      inputType: "text",
    },
    {
      label: "Email:",
      cssClass: "column is-4",
      name: "email",
      inputType: "text",
    },
    {
      label: "Phone Number:",
      cssClass: "column is-4",
      name: "phone",
      inputType: "text",
    },
    {
      label: "Mobile Number:",
      cssClass: "column is-4",
      name: "mobile_number",
      inputType: "text",
    },
    {
      label: "Account Number:",
      cssClass: "column is-4",
      name: "account_no",
      inputType: "text",
    },
    {
      label: "Sortcode:",
      cssClass: "column is-4",
      name: "sortcode",
      inputType: "text",
    },
    {
      id: "StatusSelect",
      label: "Status:",
      cssClass: "column is-4",
      name: "status",
      inputType: "select",
      placeholder: "Please select customer status",
      inputData: [
        { id: 1, name: "Live", code: "L" },
        { id: 2, name: "Frozen", code: "F" },
        { id: 3, name: "Expired", code: "D" },
        { id: 4, name: "Cancelled", code: "C" },
      ],
    },
  ],
};

export const btnQuick = [
  {
    topCss: "column is-3 is-offset-9",
    title: "View",
    css: "is-warning",
    size: "is-normal",
    width: "is-fullwidth",
    method: {
      name: "submit",
      action: "/application/customer",
    },
  },
];

export const btnPostcode = [
  {
    topCss: "column is-3 is-offset-9",
    title: "Search",
    css: "is-warning",
    size: "is-normal",
    width: "is-fullwidth",
    method: {
      name: "submit",
      action: "/application/customer",
    },
  },
];

export const btnSearch = [
  {
    id: "btnSearch",
    topCss: "column is-3 is-offset-9",
    title: "Search",
    css: "is-purple is-rounded",
    size: "is-normal",
    width: "is-fullwidth",
    undisable: true,
    method: {
      name: "submit",
      action: "/application/customer",
      additional: "btnSearch",
    },
  },
];

export const btnPay = [
  {
    topCss: "column is-3 is-offset-6",
    title: "Calculate",
    css: "is-default",
    size: "is-normal",
    width: "is-fullwidth",
    method: {
      name: "check",
      action: "calculateAmount",
    },
  },
  {
    topCss: "column is-3",
    title: "Pay",
    css: "is-warning",
    size: "is-normal",
    width: "is-fullwidth",
    method: {
      name: "check",
      action: "pay",
    },
  },
];
