import axios from "axios";
import { ApiManager } from "./ApiManager";

export const findAllOffices = async (token, data) => {
  try {
    const result = ApiManager(`/office`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};