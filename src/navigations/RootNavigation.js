import React, {useState, useEffect, useContext} from 'react';
import AppNavigation from './AppNavigation';
import AuthenticationNavigation from './AuthenticationNavigation';
import LoadingOverlay from '../components/common/LoadingOverlay';
import {AuthContext} from '../providers/AuthenticationProvider';
import {useToast} from 'react-native-paper-toast';
import SplashScreen from '../components/common/SplashScreen';
import * as SecureStore from 'expo-secure-store';

const RootNavigation = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const {user, setUser, setTenant} = useContext(AuthContext);
  const toaster = useToast();

  useEffect(async () => {

    let data = await SecureStore.getItemAsync('authInfo');
    if (data !== null) {
      const u = JSON.parse(data);
      setUser(u.user, u.accessToken);
    }

    let tenantData = await SecureStore.getItemAsync('currentTenant');
    if (tenantData !== null) {
      const t = JSON.parse(tenantData);
      setTenant(t);
    }

    setLoadingUser(false);
  }, []);

  const isLoggedIn = !!user;
  if (loadingUser) {
    return <SplashScreen />;
  }
  return isLoggedIn ? <AppNavigation /> : <AuthenticationNavigation />;
};

export default RootNavigation;
