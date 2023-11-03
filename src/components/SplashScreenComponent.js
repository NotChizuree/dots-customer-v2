import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import splashImage from "../../assets/img/logo.png";
import { findTenantByid } from "../api/tenant";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreenComponent = () => {
  const navigation = useNavigation(); 
  const [showSplash, setShowSplash] = useState(true);
  const [tenantName, setTenantName] = useState("");

  const fetchData = async () => {
    try {
      const id = "bpr_kn_dev"; 
      const result = await findTenantByid(id);
      const data = result.data.data;
      console.log("Tenant Data:", data);
      console.log("Tenant Name:", data.name);
      setTenantName(data.name);
      await AsyncStorage.setItem('tenantName', data.name);  
      const splashTimeout = setTimeout(() => {
        setShowSplash(false);
      }, 2000);     

      return () => {
        clearTimeout(splashTimeout);
      };
    } catch (error) {
      console.error("Error fetching tenant data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {showSplash ? (
        <View style={styles.splash}>
          <Image source={splashImage} style={styles.splashImage} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: 300,
    height: 300,
  },
});

export default SplashScreenComponent;