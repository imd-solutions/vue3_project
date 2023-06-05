import axios from "axios";
import type { App } from "vue";

interface AxiosOptions {
  baseUrl?: string;
  token?: string;
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const api = axios.create({
      baseURL: options.baseUrl,
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : "",
        "Content-Type": "application/json",
      },
    });
    // Add a request interceptor
    api.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    api.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
    app.config.globalProperties.$axios = api;
  },
};
