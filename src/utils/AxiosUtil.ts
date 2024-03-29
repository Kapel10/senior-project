/*
, { AxiosInstance } from "axios";
import { LocalStorageUtil } from "./LocalStorageUtil";

export const api: AxiosInstance = axios.create({
  baseURL: "http://64.23.188.226:8000",
});

api.interceptors.request.use((request) => {
  const token = LocalStorageUtil.getJWTToken();
  if (token) {
    request.headers!["Authorization"] = "Bearer " + token;
  }

  return request;
});
*/
import axios from "axios";
import { LocalStorageUtil } from "./LocalStorageUtil";

export const api = axios.create({
  baseURL: 'http://64.23.188.226:',
  headers: {Authorization: "Bearer " + LocalStorageUtil.getJWTToken()}
});

export const newApi = (port:string)=>{ return axios.create({
  baseURL: `http://64.23.188.226:${port}/`,
  headers: { Authorization: "Bearer " + LocalStorageUtil.getJWTToken() },});
}
