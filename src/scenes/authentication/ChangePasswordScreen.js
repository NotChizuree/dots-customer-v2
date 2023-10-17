import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Appbar,
  TextInput,
  Button,
  Caption,
  TextIconButton,
} from "react-native-paper";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { ChangePassword } from "../../api/UserApi";
import { useContext } from "react";

const ChangePasswordScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(true);

  // const dummyPassword = 'Abcd1234';

  const { token } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSumit = async() => {
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Kesalahan", "Kolom wajib diisi");
    } else if (newPassword !== confirmPassword) {
      Alert.alert(
        "Kesalahan",
        "Kata sandi baru dan kata sandi konfirmasi tidak cocok"
      );
    } else {
      console.log(1)
      try {
        const res = await ChangePassword(token, {
          old_password: currentPassword,
          new_password: newPassword,
        });
        console.log(2)
        console.log(token)

        if (res.message == "Wrong password") {
          Alert.alert(
            "Kesalahan",
            "Kata sandi Lama salah"
          );
          console.log(3)
        } else {
          navigation.goBack();
          console.log(4)

        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCheckOldPassword = () => {
    // console.log('Running handleCheckOldPassword');
    console.log("currentPassword:", currentPassword);
    console.log("newpassword:", newPassword);
    // console.log('dummyPassword:', dummyPassword);

    // const isCorrect = currentPassword === dummyPassword;
    // setIsOldPasswordCorrect(isCorrect);

    // if (!isCorrect) {
    //   console.log('Kata sandi lama salah');
    //   Alert.alert('Kesalahan', 'Kata sandi lama salah');
    // } else {
    //   Alert.alert(
    //     'Konfirmasi Perubahan Kata Sandi',
    //     'Apakah Anda yakin ingin mengubah kata sandi Anda ?',
    //     [
    //       {
    //         text: 'Batal',
    //         style: 'batal',
    //       },
    //       {
    //         text: 'Simpan',
    //         onPress: () => handlePasswordChangeConfirmation(),
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    // }
  };

  const handlePasswordChangeConfirmation = () => {
    Alert.alert("Berhasil", "Kata sandi berhasil diubah", [
      {
        text: "OK",
        onPress: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setIsOldPasswordCorrect(true);

          navigation.goBack();
        },
      },
    ]);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ganti Kata sandi" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.box}>
          <Caption>Kata sandi lama</Caption>
          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry={!passwordVisible}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            right={
              // Menambahkan ikon mata di sebelah kanan TextInput
              <TextIconButton
                icon={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />

          <Caption>Kata sandi baru</Caption>
          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />

          <Caption>Konfirmasi Kata Sandi</Caption>
          <TextInput
            style={styles.input}
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <Button
            mode="contained"
            style={{ marginTop: 20, ...Color.primaryBackgroundColor }}
            onPress={handleSumit}
          >
            Simpan
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  input: {
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
