import { ApiManager } from "./ApiManager";

export const userLogin = async data => {
  try {
    console.log(data)
    const result = await ApiManager("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const userRegister = async data => {
  try {
    const result = await ApiManager("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const findAllUser = async (token) => {
  try {
    const result = ApiManager("/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return result
  } catch (error) {
    console.log(error)
  }
}