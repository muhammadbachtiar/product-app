// import { getSessionHrd, getSessionCore, getSessionWms } from "@/lib/session";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_API_EXTERNAL_URL
const API_EXTERNAL_VERSION = "/api/web/v1";

const axiosConfig = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
});



axiosConfig.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error: AxiosError) {
    if (error.response) {
      if (error.response.status === 401) {
        try {
          window.location.href = "/";
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const axiosExternal = axios.create({
  baseURL: API_URL + API_EXTERNAL_VERSION,
  headers: {
    Accept: "application/json",
  },
});

// axiosConfig.interceptors.request.use(
//   async function (config) {
//     const session = getSessionHrd();
//     if (session) {
//       config.headers.Authorization = "Bearer " + session;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export default axiosConfig;
