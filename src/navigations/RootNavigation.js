// RootNavigation.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import AuthenticationNavigation from "./AuthenticationNavigation";
import { AuthContext } from "../providers/AuthenticationProvider";
import * as SecureStore from "expo-secure-store";
import SplashScreenComponent from "../components/SplashScreenComponent";

const RootNavigation = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const { setUser, setTenant, token } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let authData = await SecureStore.getItemAsync("authInfo");
        if (authData !== null) {
          const { user, accessToken } = JSON.parse(authData);
          setUser(user, accessToken);
        }

        let tenantData = await SecureStore.getItemAsync("currentTenant");
        if (tenantData !== null) {
          const tenant = JSON.parse(tenantData);
          setTenant(tenant);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchData();
  }, [setUser, setTenant]);

  if (loadingUser) {
    return <SplashScreenComponent />;
  }

  return token ? <AppNavigation /> : <AuthenticationNavigation />;
};

export default RootNavigation;
