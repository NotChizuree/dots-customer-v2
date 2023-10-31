import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../scenes/home/HomeScreen";
import NotificationScreen from "../scenes/home/NotificationScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingScreen from "../scenes/home/SettingScreen";
import AccountsScreen from "../scenes/home/AccountsScreen";
import Color from "../common/Color";
import { AuthContext } from "../providers/AuthenticationProvider";
import { useContext } from "react";
import { useEffect } from "react";

const HomeNavigation = ({ navigation }) => {
  const { user, exp } = useContext(AuthContext);
  const HomeBottomTab = createBottomTabNavigator();

  // useEffect(() => {
  //   const handleCheckToken = () => {
  //     expToken = exp * 1000
  //     const currentTime = new Date().getTime();
  //     console.log('currentTime: ', currentTime);
  //     console.log('exp: ', expToken);
      
  //     if (expToken && expToken < currentTime) {
  //       navigation.navigate("Login")
  //     }
  //   };
  //   const interval = setInterval(handleCheckToken, 5000);

  //   return () => clearInterval(interval);
  // }, [navigation, expToken]);

  return (
    <HomeBottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.primaryBackgroundColor.backgroundColor,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          display: "flex",
        },
      }}
    >
      <HomeBottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeBottomTab.Screen
        name="Rekening"
        component={AccountsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" color={color} size={size} />
          ),
        }}
      />
      <HomeBottomTab.Screen
        name="Notifikasi"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <HomeBottomTab.Screen
        name="Pengaturan"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </HomeBottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    position: "absolute",
    bottom: 5, // space from bottombar
    height: 58,
    width: 58,
    borderRadius: 58,
    backgroundColor: "#0E47A0",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeNavigation;
