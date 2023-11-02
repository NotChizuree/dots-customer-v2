import React, { useState, useEffect, useContext } from "react";
import AppNavigation from "./AppNavigation";
import AuthenticationNavigation from "./AuthenticationNavigation";
import { AuthContext } from "../providers/AuthenticationProvider";
import { useToast } from "react-native-paper-toast";
// import SplashScreen from '../components/common/SplashScreen';
import SplashScreenComponent from "../components/SplashScreenComponent";
import * as SecureStore from "expo-secure-store";

const RootNavigation = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const toaster = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await SecureStore.getItemAsync("authInfo");
        if (data !== null) {
          const u = JSON.parse(data);
          setUser(u.user, u.accessToken);
        }
        setLoadingUser(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const isLoggedIn = !!user;
  if (loadingUser) {
    <AppNavigation />;
    return <SplashScreenComponent />;
  }
  return isLoggedIn ? <AppNavigation /> : <AuthenticationNavigation />;
};

export default RootNavigation;
