import axios from "axios";

export const ApiManager = axios.create({
  baseURL: 'http://192.168.8.143:8000/api',
  responseType: 'json',
  withCredentials: true
})