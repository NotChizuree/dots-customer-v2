import React, { useState, useEffect, useContext } from "react";
import AppNavigation from "./AppNavigation";
import AuthenticationNavigation from "./AuthenticationNavigation";
// import LoadingOverlay from "../components/common/LoadingOverlay";
import { AuthContext } from "../providers/AuthenticationProvider";
// import { useToast } from "react-native-paper-toast";
import * as SecureStore from "expo-secure-store";
import SplashScreenComponent from "../components/SplashScreenComponent";

const RootNavigation = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const { user, setUser, setTenant } = useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await SecureStore.getItemAsync("authInfo");
        if (data !== null) {
          const u = JSON.parse(data);
          setUser(u.data.user, u.data.accessToken);
          console.log(u);
          setToken(u.data.accessToken);
        }

        let tenantData = await SecureStore.getItemAsync("currentTenant");
        if (tenantData !== null) {
          const t = JSON.parse(tenantData);
          setTenant(t);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchData();
  }, []);

  const isLoggedIn = token;
  if (loadingUser) {
    return <SplashScreenComponent />;
  }
  return isLoggedIn !== null ? <AppNavigation /> : <AuthenticationNavigation />;
};

export default RootNavigation;
