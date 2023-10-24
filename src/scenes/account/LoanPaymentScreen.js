import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput,
} from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import RNSInfo from "react-native-sensitive-info";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { StackActions } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import DropDown from "react-native-paper-dropdown";

const LoanPaymentScreen = ({ navigation }) => {
  const { currentTenant } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemsDropdown, setItemDropdown] = useState(null);
  const [items] = useState([
    { label: "Transfer Bank BCA (Dicek Manual)", value: "01" },
    { label: "Transfer Bank Permata (Dicek Manual)", value: "02" },
  ]);

  const [amount, setAmount] = useState();

  const { login } = useContext(AuthContext);

  const handleCreateSavingAccount = () => {
    Alert.alert(
      "Terima kasih",
      "Pengajuan setoran anda telah berhasil dilakuka. Pihak Bank akan melakukan verifikasi atas transaksi anda. Apabila transaksi telah diverifikasi, anda akan menerima notifikasi mengenai status transaksi anda"
    );
    navigation.goBack();
  };

  const handleTextInputFocus = () => {
    setIsFocused(true);
  };

  const handleTextInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (text) => {
    const cleanedText = text.replace(/[^\d]/g, "");
    const numericValue = Number.parseInt(cleanedText, 10);
    if (!isNaN(numericValue)) {
      const formattedValue = "Rp. " + numericValue.toLocaleString();
      setAmount(formattedValue);
    }
  };

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Bayar Tagihan" />
      </Appbar.Header>

      <View style={styles.box}>
        <Caption>Jumlah</Caption>
        <TextInput
          style={styles.input}
          underlineColor=""
          placeholder={isFocused ? "Rp." : ""}
          placeholderTextColor="#999999"
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
          keyboardType="numeric"
          value={amount}
          onChangeText={handleInputChange}
        />
        <Caption style={styles.text}>Metode Pembayaran</Caption>
        <DropDown
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={itemsDropdown}
          setValue={setItemDropdown}
          list={items}
        />

        <TouchableOpacity>
          <Button style={styles.btn}>
            <Text style={styles.btnSubmit}>SUBMIT</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flex: 1,
    padding: 20,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    marginTop: "2%",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#080808",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
  },
  btn: {
    backgroundColor: Color.primaryBackgroundColor.backgroundColor,
    marginTop: 20,
  },
  btnSubmit: {
    color: "#ffffff",
  },
  box: {
    backgroundColor: "#ffffff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    marginBottom: 10,
    borderColor: "#F5F8FB",
    backgroundColor: "transparent",
  },
  showPasswordIcon: {
    marginTop: 15,
  },
  text: {
    marginTop: 10,
  },
});

export default LoanPaymentScreen;
