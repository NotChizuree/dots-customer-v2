import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../scenes/authentication/LoginScreen';
// import MainOnboardingScreen from '../scenes/authentication/MainOnboardingScreen';
// import { AuthContext } from '../providers/AuthenticationProvider';
// import UserRegistrationScreen from '../scenes/authentication/UserRegistrationScreen';
// import IdentityPhotoScreen from '../scenes/authentication/IdentityPhotoScreen';

const AuthenticationNavigation = () => {
  // const { currentTenant } = useContext(AuthContext);

  const AuthenticationNavigator = createStackNavigator();

  return (
    <AuthenticationNavigator.Navigator
      initialRouteName={'Login'}
    >
      <AuthenticationNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <AuthenticationNavigator.Screen
        name="UserRegistration"
        component={UserRegistrationScreen}
        options={{ headerShown: false }}
      />
      <AuthenticationNavigator.Screen
        name="IdentityPhoto"
        component={IdentityPhotoScreen}
        options={{ headerShown: false }}
      /> */}
    </AuthenticationNavigator.Navigator>
  );
};

export default AuthenticationNavigation;
