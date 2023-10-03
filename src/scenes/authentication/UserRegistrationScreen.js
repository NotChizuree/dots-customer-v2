import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
    Appbar,
    Button,
    Caption,
    Checkbox,
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

const UserRegistrationScreen = ({navigation}) => {
  const {currentTenant, setTenant} = useContext(AuthContext);
  const toaster = useToast();
  const [checked, setChecked] = React.useState(false);

  // TODO: Use Formik for form state management
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false)

  const {login} = useContext(AuthContext);

  const handleSubmitButton = () => {
    navigation.navigate('IdentityPhoto')
  };

  return (
      <>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>

        <ScrollView style={styles.screen}>
        {loading && <LoadingOverlay />}
        <View style={{marginBottom: '8%'}}>
            <Headline style={styles.heading}>Registrasi</Headline>            
        </View>

        <Caption>Nama sesuai Identitas</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Nama sesuai Identitas'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

        <Caption>Nomor Induk Kependudukan (NIK)</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan NIK'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

        <Caption>Tempat Lahir</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Tempat Lahir'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

        <Caption>Tanggal Lahir</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Tanggal Lahir'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />
       
       <Caption>Nama Ibu Kandung</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Nama Ibu Kandung'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

        <Caption>Email</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Email'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

        <Caption>Kode Refferal (opsional)</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Kode Refferal (opsional)'   
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

        <Caption>Username</Caption>
        <TextInput
            style={styles.textInput}
            mode='outlined'
            placeholder='Masukan Username'
            placeholderTextColor={'#99999'}
            underlineColor="transparent"
            // value={username}
            // onChangeText={(text) => setUsername(text)}
        />

    <Caption>Password</Caption>
      <TextInput
         mode='outlined'
         placeholder='Masukan Password'
         placeholderTextColor={'#99999'}
         underlineColor="transparent"
        style={styles.textInput}
        secureTextEntry={!showPassword}
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

        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
            }}
            />
            <Text style={{marginRight: 30}}>Dengan mendaftar, saya setuju atas syarat & ketentuan yang berlaku serta menjamin bahwa data yang saya masukkan adalah data yang sebenarnya</Text>
        </View>
       

        <Button style={{marginTop: '5%', marginBottom: '15%', ...Color.primaryBackgroundColor,}}  disabled={!checked} mode="contained" onPress={() => handleSubmitButton()}>
            Lanjut
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
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  showPasswordIcon: {
    marginTop: 15,
  },
});

export default UserRegistrationScreen;
