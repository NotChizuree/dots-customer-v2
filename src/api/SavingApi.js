import { ApiManager } from "./ApiManager";

export const createSaving = async (token, data) => {
  try {
    const result = ApiManager(``, {
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
export const createSavingDeposit = async (token,id,data) => {
  try {
    const result = ApiManager(``, {
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
export const findAllSaving = async (token)=>{
  console.log(8);

  try {
    console.log(7);

    const result = ApiManager(`/saving`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(9);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const findSavingById = async (token, id) => {
  try {
    const result = ApiManager(`/saving/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const findSavingHistory = async (token, id) => {
  try {
    const result = ApiManager(``,{
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
