import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput,
} from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import RNSInfo from 'react-native-sensitive-info';
import { AuthContext } from '../../providers/AuthenticationProvider';
import { StackActions } from '@react-navigation/native';
import Color from '../../common/Color';

const LoginScreen = ({ navigation }) => {
  const { currentTenant, setTenant } = useContext(AuthContext);
  const toaster = useToast();
  const [showPassword, setShowPassword] = useState(false);

  // TODO: Use Formik for form state management
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    setLoading(true);
    login(username, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        toaster.show({ message: error.toString() });
        setLoading(false);
      });
  };

  const changeTenant = () => {
    RNSInfo.deleteItem('currentTenant', {}).then(() => {
      navigation.dispatch(
        StackActions.replace('MainOnboarding')
      );
      setTenant(null);
    });
  };

  return (
    <View style={styles.screen}>
      {loading && <LoadingOverlay />}
      <View style={{ marginTop: '40%', marginBottom: '12%' }}>
        <Headline style={styles.heading}>Halo.</Headline>
        <Headline style={styles.heading}>Selamat Datang</Headline>
        <View style={{ flexDirection: 'row' }}>
          <Subheading style={styles.subheading}>{currentTenant ? currentTenant.name : null}</Subheading>
          {/* <Button
            mode='outlined'
            onPress={() => changeTenant()}
            style={{ marginLeft: 'auto', marginRight: '3%'}} labelStyle={{
              color: Color.primaryTextColor.color,
            }}>
            Ubah
          </Button> */}
        </View>
      </View>
      <Caption>Username</Caption>
      <TextInput
        style={styles.textInput}
        value={username}
        mode='outlined'
        placeholder='Masukan Username'
        placeholderTextColor={'#99999'}
        underlineColor="transparent"
        onChangeText={(text) => setUsername(text)}
      />
      <Caption>Password</Caption>
      <TextInput
        style={styles.textInput}
        secureTextEntry={!showPassword}
        value={password}
        mode='outlined'
        placeholder='Masukan Password'
        placeholderTextColor={'#99999'}
        underlineColor="transparent"
        onChangeText={(text) => setPassword(text)}
        right={
          <TextInput.Icon
            style={styles.showPasswordIcon}
            name={showPassword ? 'eye-off' : 'eye'}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        }
      />
      <Caption style={{ ...Color.primaryTextColor, marginBottom: '3%', fontWeight: 'bold', fontSize: 13 }}>Lupa Password? </Caption>
      <Button style={{ marginTop: '5%', marginBottom: '5%', ...Color.primaryBackgroundColor,}} mode="contained" onPress={() => handleLogin()}>
        Login
      </Button>

      <Caption onPress={() => navigation.navigate('UserRegistration')} style={{ alignSelf: 'center', fontSize: 14 }}>Belum punya akun? Buat sekarang!</Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    marginTop: '3%',
    marginBottom: '5%',
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
