import axios from "axios";

export const ApiManager = axios.create({
  baseURL: 'http://192.168.18.100:8000',
  responseType: 'json',
  withCredentials: true
})