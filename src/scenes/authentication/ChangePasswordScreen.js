import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Appbar, TextInput, Button, Caption } from 'react-native-paper';

const ChangePasswordScreen = ({ }) => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(true);

  const dummyPassword = 'Abcd1234';

  const handleChangePassword = () => {
    // Pemeriksaan kesalahan
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      Alert.alert('Kesalahan', 'Kolom wajib diisi');
    } else if (newPassword !== confirmPassword) {
      Alert.alert('Kesalahan', 'Kata sandi baru dan kata sandi konfirmasi tidak cocok');
    } else {
      // Pemeriksaan kata sandi lama
      handleCheckOldPassword();
    }
  };
  
  const handleCheckOldPassword = () => {
    console.log('Running handleCheckOldPassword');
    console.log('currentPassword:', currentPassword);
    console.log('dummyPassword:', dummyPassword);
  
    const isCorrect = currentPassword === dummyPassword;
    setIsOldPasswordCorrect(isCorrect);
  
    if (!isCorrect) {
      console.log('Kata sandi lama salah');
      Alert.alert('Kesalahan', 'Kata sandi lama salah');
    } else {
      // Prompt user to confirm password change
      Alert.alert(
        'Konfirmasi Perubahan Kata Sandi',
        'Apakah Anda yakin ingin mengubah kata sandi Anda ?',
        [
          {
            text: 'Batal',
            style: 'batal',
          },
          {
            text: 'Simpan',
            onPress: () => handlePasswordChangeConfirmation(),
          },
        ],
        { cancelable: false }
      );
    }
  };
  
  
  const handlePasswordChangeConfirmation = () => {
    Alert.alert('Berhasil', 'Kata sandi berhasil diubah', [
      {
        text: 'OK',
        onPress: () => {
          // Membersihkan formulir setelah perubahan kata sandi berhasil
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setIsOldPasswordCorrect(true); // Mengatur kembali status untuk percobaan berikutnya
  
          // Mengakses hook navigasi untuk kembali ke layar pengaturan
          navigation.goBack();
        },
      },
    ]);
  };


  return (
    <>
      <Appbar.Header>
        {/* Assuming `navigation` is defined somewhere */}
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ganti Kata sandi" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.box}>
          <Caption>Kata sandi lama</Caption>

          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry
            value={currentPassword}
            onChangeText={(text) => {
              console.log('Before setCurrentPassword:', currentPassword); // Debugging line
              setCurrentPassword(text);
              console.log('After setCurrentPassword:', text);
            }}
          />
          <Caption>Kata sandi baru</Caption>

          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />

          <Caption>Konfirmasi Kata sandi </Caption>
          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Button mode="contained" style={{ marginTop: 20, ...Color.primaryBackgroundColor, }} onPress={handleChangePassword}>Simpan</Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  input: {
    marginBottom: 10,
  }, button: {
    borderRadius: 20,

  },
});

export default ChangePasswordScreen;
