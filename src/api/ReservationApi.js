import { ApiManager } from "./ApiManager";

export const createReservation = async (token, data) => {
  try {
    const result = await ApiManager("", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const findReservationById = async (token, id) => {
  try {
    const result = await ApiManager(``, {
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
