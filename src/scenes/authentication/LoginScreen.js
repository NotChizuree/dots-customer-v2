import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput,
} from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import RNSInfo from "react-native-sensitive-info";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { StackActions } from "@react-navigation/native";
import Color from "../../common/Color";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const toaster = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tenantName, setTenantName] = useState(""); 
  // console.log(AsyncStorage.setItem('tenantName', data.name));

  useEffect(() => {
    const getTenantFromStorage = async () => {
      try {
        const storedTenantName = await AsyncStorage.getItem('tenantName');
        if (storedTenantName) {
          setTenantName(storedTenantName);
        }
      } catch (error) {
        console.error("Error getting tenant name from AsyncStorage:", error);
      }
    }

    getTenantFromStorage();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      toaster.show({
        message: "Harap isi username dan password terlebih dahulu",
      });
      return;
    }

    setLoading(true);
    login(username, password)       
      .then((result) => {
        console.log("asdwasdwdadkhaidw muahhaha", result.data);
        const msg = result.data.message;
        if (msg === "Unauthorized") {
          toaster.show({
            message: "Username atau password tidak ditemukan",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        toaster.show({ message: error.toString() });
        setLoading(false);
      });
  };

  return (
    <View style={styles.screen}>
      {loading && <LoadingOverlay />}
      <View style={{ marginTop: "40%", marginBottom: "12%" }}>
        <Headline style={styles.heading}>Halo.</Headline>
        <Headline style={styles.heading}>Selamat Datang</Headline>
        <View style={{ flexDirection: "row" }}>
          <Subheading style={styles.subheading}>{tenantName}</Subheading>
        </View>
      </View>
      <Caption>Username</Caption>
      <TextInput
        style={[styles.textInput, { backgroundColor: "white" }]}
        value={username}
        mode="outlined"
        placeholder="Masukan Username"
        placeholderTextColor={"#99999"}
        underlineColor="transparent"
        onChangeText={(text) => setUsername(text)}
      />
      <Caption>Password</Caption>
      <TextInput
        style={[styles.textInput, { backgroundColor: "white" }]}
        secureTextEntry={!showPassword}
        value={password}
        mode="outlined"
        placeholder="Masukan Password"
        placeholderTextColor={"#99999"}
        underlineColor="transparent"
        onChangeText={(text) => setPassword(text)}
        right={
          <TextInput.Icon
            style={styles.showPasswordIcon}
            name={showPassword ? "eye-off" : "eye"}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      <Caption
        style={{
          ...Color.primaryTextColor,
          marginBottom: "1%",
          marginTop: "3%",
          fontWeight: "bold",
          fontSize: 13,
        }}
      >
        Lupa Password?
      </Caption>
      <Button
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          ...Color.primaryBackgroundColor,
        }}
        mode="contained"
        onPress={() => handleLogin()}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    marginTop: "3%",
    marginBottom: "5%",
  },
  textInput: {
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  showPasswordIcon: {
    marginTop: 15,
  },
});

export default LoginScreen;
