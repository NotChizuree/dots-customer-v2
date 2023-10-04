import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar,TextInput,Button, Caption } from 'react-native-paper'; 

const ChangePasswordScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Implement logic to handle password change
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
    } else {
      // You can add your logic here to handle the password change
      // For example, make an API request to update the password
      // You might want to handle success and error scenarios accordingly
      Alert.alert('Success', 'Password changed successfully');
      // Clear the form after successful password change
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
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
            placeholder="Kata Sandi Lama"
            secureTextEntry
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          />
                  <Caption>Kata sandi baru</Caption>

          <TextInput
            style={styles.input}
            mode="outlined"
            placeholder="Kata Sandi Baru"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
                            <Caption>Konfirmasi Kata sandi </Caption>

          <TextInput
            style={styles.input}
            mode="outlined"
            placeholder="Konfirmasi Kata Sandi"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <Button mode="contained"  style={{ marginTop: 20, ...Color.primaryBackgroundColor, }}>Change</Button>
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
      marginBottom:10,
  },button:{
    borderRadius:20,

  },
});

export default ChangePasswordScreen;
