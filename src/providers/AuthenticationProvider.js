import React, { createContext, useReducer } from "react";
import RNSInfo from "react-native-sensitive-info";
import RestClient from "../query/RestClient";
import * as SecureStore from "expo-secure-store";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "SET_TENANT":
      return {
        ...state,
        currentTenant: action.payload.tenant,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {});

  const setUser = (user, token) => {
    dispatch({
      type: "SET_USER",
      payload: { user: user, token: token },
    });
  };

  const setTenant = (tenant) => {
    dispatch({
      type: "SET_TENANT",
      payload: { tenant: tenant },
    });
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("authInfo");
      setUser(null, "");
    } catch (error) {
      console.error("Error deleting authInfo:", error);
    }
    console.log("RNSInfo:", RNSInfo); // Pastikan ini bukan undefined
    console.log("deleteItem:", RNSInfo.deleteItem); // Pastikan ini bukan undefined
  };

  const login = async (username, password) => {
    try {
      const data = await RestClient.post("/login", {
        username: username,
        password: password,
        clientType: "CUSTOMER",
        tenantID: "bpr_kn_dev",
      });

      await SecureStore.setItemAsync("authInfo", JSON.stringify(data.data));
      setUser(data.data.user, data.data.accessToken);
      setTenant(data.data.user.tenantReadableName)
      return data;
    } catch (error) {
      switch (error.response?.status) {
        case 401:
          throw "Username atau password salah";
        default:
          throw `Terjadi kesalahan saat login (code: ${error})`;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        currentTenant: state.currentTenant,
        setUser,
        logout,
        login,
        setTenant,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
