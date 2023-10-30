import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import splashImage from "../../assets//img/logo.png";

const SplashScreenComponent = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      {showSplash ? (
        <View style={styles.splash}>
          <Image source={splashImage} style={styles.splashImage} />
          {/* <Text style={styles.splashText}>Dotc mmuahahah</Text> */}
        </View>
      ) : (
        <Text>Main App Content Goes Here</Text>
      )}
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
  splashText: {
    marginTop: 20,
    fontSize: 24,
  },
});

export default SplashScreenComponent;
