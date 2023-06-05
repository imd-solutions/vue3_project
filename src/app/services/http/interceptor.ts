import axios, { type AxiosInstance } from "axios";
import authService from "../../../app/services/auth/auth-service";
import { v4 as uuidv4 } from "uuid";
import configService from "../config/config-service";

export function Interceptor(axiosInstance?: AxiosInstance) {
  let ccaasBaseUrl = configService.getCcaasBaseUrl;

  (axiosInstance || axios).interceptors.request.use((request) => {
    if (request.url?.startsWith(configService.getCcaasBaseUrl())) {
      console.log("Interceptor > request");
      let exchangeId = `ccp-${uuidv4()}`;
      request.headers["merchantId"] = "1111";
      request.headers["exchangeId"] = exchangeId;
      request.headers["Authorization"] = `Bearer ${
        authService.getAuth()?.accessToken?.accessToken
      }`;
    }
    console.log("idToken");
    console.log(authService.getAuth()?.idToken?.idToken);
    console.log("accessToken");
    console.log(authService.getAuth()?.accessToken?.accessToken);
    return request;
  });

  (axiosInstance || axios).interceptors.response.use(
    (response) => {
      console.log("Interceptor > response");
      return response;
    },
    (error) => {
      console.log("Interceptor > response (error)");
      const { response } = error;
      if (!response) {
        // network error
        console.error(error);
        return;
      }

      if ([400].includes(response.status)) {
        console.log("request error");
      }

      if ([401].includes(response.status)) {
        console.log("unauthorized");
      }

      if ([403].includes(response.status)) {
        console.log("forbidden");
      }

      if ([404].includes(response.status)) {
        console.log("invalid endpoint");
      }

      const errorMessage = response.data?.message || response.statusText;
      console.error("ERROR:", errorMessage);
    }
  );
}
