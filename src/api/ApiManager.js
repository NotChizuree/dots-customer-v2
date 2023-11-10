import axios from "axios";
import {API_URL} from '@env'

export const ApiManager = axios.create({
  baseURL: API_URL,
  responseType: 'json',
  withCredentials: true
})