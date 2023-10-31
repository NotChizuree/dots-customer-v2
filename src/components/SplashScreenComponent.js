import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import hook navigasi
import splashImage from "../../assets/img/logo.png";

const SplashScreenComponent = () => {
  const navigation = useNavigation(); // Inisialisasi hook navigasi
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
      
      // Navigasi ke halaman loginPage setelah lima detik
      navigation.navigate("Login"); // Gantilah "loginPage" dengan nama yang sesuai dengan halaman login Anda
    }, 5000);

    return () => {
      clearTimeout(splashTimeout);
    };
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
