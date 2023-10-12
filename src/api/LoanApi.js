import { ApiManager } from "./ApiManager";

export const createLoan = async (token, data) => {
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

export const createLoanTopup = async (token, id,data) => {
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

export const createLoanRestructure = async (token,id,data) => {
  try {
    const result = ApiManager(``,{
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,   
    });

    return result;
    console.log(result)
  } catch (error) {
    console.log(error);
  }
};

export const findAllLoan = async (token) => {
  try {
    const result = ApiManager(``, {
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

export const findLoanById = async (token, id) => {
  try {
    const result = ApiManager(``, {
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




