import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Caption, Headline } from 'react-native-paper';

const ChangePasswordScreen = () => {
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
    <View style={styles.screen}> 
    <View style={Color.primaryBackgroundColor}>
        <Headline style={styles.heading}>Notifikasi</Headline>
      </View>

    <View style={styles.container}>
      <Caption></Caption>
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi Lama"
        secureTextEntry
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi Baru"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Kata Sandi"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {

    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ChangePasswordScreen;
