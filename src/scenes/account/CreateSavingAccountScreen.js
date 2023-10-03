import React, {useState, useContext} from 'react';
import {StyleSheet, View, Image, Text, Alert} from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';

const CreateSavingAccountScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Tabungan Masa Depan', value: '01'},
  ]);

  const {login} = useContext(AuthContext);

  const handleCreateSavingAccount = () => {
    Alert.alert(
      'Berhasil',
      'Pembukaan rekening tabungan anda telah berhasil diajukan. Anda akan menerima notifikasi apabila permohonan anda telah disetujui!'
    );
    navigation.goBack();
  };

  return (
      <>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Buat Tabungan Baru" />
        </Appbar.Header>

        <View style={styles.screen}>        

        <Text>Pilih produk tabungan yang akan dibuka</Text>
        <DropDownPicker
              style={{height: 40, marginTop: 10, marginBottom: 10, borderColor: 'transparent'}}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
        />

        {value &&
        <>
          <Subheading style={{marginTop: '10%', fontWeight: 'bold', fontSize: 20}}>Tabungan Masa Depan</Subheading>
          <Text style={{marginBottom: 10}}>Tabungan Masa Depan merupakan produk tabungan BPR Kreasi Nusantara...</Text>

          <Text>Saldo Minimum: </Text>

          <Button style={{marginTop: '5%', marginBottom: '5%'}} mode="contained" onPress={() => handleCreateSavingAccount()}>
              Buat Sekarang!
          </Button>
        </>

        }
        </View>
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

export default CreateSavingAccountScreen;
