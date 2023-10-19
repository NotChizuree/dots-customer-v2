import React, { useState, useContext } from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import {
  Appbar,
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput
} from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import RNSInfo from 'react-native-sensitive-info';
import { AuthContext } from '../../providers/AuthenticationProvider';
import { StackActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const SavingDepositRequestScreen = ({ navigation }) => {
  const { currentTenant } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Transfer Bank BCA (Dicek Manual)', value: '01' },
    { label: 'Transfer Bank Permata (Dicek Manual)', value: '02' },
  ]);

  const [amount, setAmount] = useState();

  const { login } = useContext(AuthContext);

  const handleCreateSavingAccount = () => {
    Alert.alert(
      'Terima kasih',
      'Pengajuan setoran anda telah berhasil dilakuka. Pihak Bank akan melakukan verifikasi atas transaksi anda. Apabila transaksi telah diverifikasi, anda akan menerima notifikasi mengenai status transaksi anda',
    
    );
    navigation.goBack();
  };
     
  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Setoran Tabungan" />
      </Appbar.Header>

      <View style={styles.screen}>

        <Caption>Jumlah Setoran</Caption>
        <TextInput
          style={styles.textInput}
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <Text>Metode Pembayaran</Text>
        <DropDownPicker
          style={{ height: 40, marginTop: 10, marginBottom: 10, borderColor: 'transparent' }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        <Caption>Nama Rekening Pengirim</Caption>
        <TextInput
          style={styles.textInput}
        />

        {(value && amount) &&
          <>
            <Subheading style={{ marginTop: '10%', fontWeight: 'bold', fontSize: 20 }}>Tata Cara Setoran</Subheading>
            <Text>1. Masuk pada menu transfer di ATM/M-Banking anda</Text>
            <Text>2. Pilih "Transfer Sesama Bank"</Text>
            <Text>3. Pada bagian rekening tujuan, masukan 0010101010101 a.n PT. {currentTenant.name}</Text>
            <Text>4. Pada bagian nominal, masukan sebesar Rp. {parseInt(amount) + 123} (jangan dibulatkan keatas)</Text>
            <Text>5. Apabila telah melakukan transfer, klik tombol "Saya Sudah Transfer" dibawah ini</Text>

            <Button
              style={{
                marginTop: '5%',
                marginBottom: '5%',
                backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              }}
              mode="contained"
              onPress={() => handleCreateSavingAccount()}
            >
              Saya Sudah Transfer
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

export default SavingDepositRequestScreen;
