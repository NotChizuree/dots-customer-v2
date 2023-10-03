import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
    Appbar,
    Button,
    Caption,
    Headline,
    Subheading,
    TextInput
} from 'react-native-paper';
import {useToast} from 'react-native-paper-toast';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import RNSInfo from 'react-native-sensitive-info';
import {AuthContext} from '../../providers/AuthenticationProvider';
import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const IdentityPhotoScreen = ({navigation}) => {
  const {currentTenant, setTenant} = useContext(AuthContext);
  const toaster = useToast();

  // TODO: Use Formik for form state management
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  const {login} = useContext(AuthContext);

  const handleRegisterButton = () => {
    toaster.show({message: 'Pendaftaran telah berhasil dilakukan. Silahkan mengikuti langkah yang telah dikirimkan via e-mail untuk langkah selanjutnya'})
    navigation.dispatch(
        StackActions.replace('Login')
      );
  };

  return (
      <>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>

        <ScrollView style={styles.screen}>
        {loading && <LoadingOverlay />}
        <View style={{marginBottom: '8%'}}>
            <Headline style={styles.heading}>Upload Foto</Headline>            
        </View>
        <Text>Untuk keperluan data nasabah, anda akan mengambil tiga foto, yakni foto KTP, swafoto (selfie) dengan KTP, dan spesimen tanda tangan. Klik pada icon dibawah untuk mengambil foto</Text>

        <View style={{flexDirection: 'row'}}>
            <Image style={{marginTop: '5%', height: 100, width: 100}} source={require('../../../assets/img/blank-photo.webp')} />
            <Subheading style={{top: 20, marginLeft: 10}}>Foto KTP</Subheading>
        </View>

        <View style={{flexDirection: 'row'}}>
            <Image style={{marginTop: '5%', height: 100, width: 100}} source={require('../../../assets/img/blank-photo.webp')} />
            <Subheading style={{top: 20, marginLeft: 10}}>Foto Selfie dengan KTP</Subheading>
        </View>

        <View style={{flexDirection: 'row'}}>
            <Image style={{marginTop: '5%', height: 100, width: 100}} source={require('../../../assets/img/blank-photo.webp')} />
            <Subheading style={{top: 20, marginLeft: 10}}>Foto Spesimen Tanda Tangan</Subheading>
        </View>

        <Button style={{marginTop: '5%', marginBottom: '15%'}} mode="contained" onPress={() => handleRegisterButton()}>
            Daftar
        </Button>
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flex: 1,
    padding: 20,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: '#F5F8FB',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    marginTop: '2%',
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    borderColor: '#F5F8FB',
    backgroundColor: 'transparent',
  },
  showPasswordIcon: {
    marginTop: 15,
  },
});

export default IdentityPhotoScreen;
