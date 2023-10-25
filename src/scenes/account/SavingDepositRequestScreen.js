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
import PaymentMethodSelection from "../../components/PaymentMethodSelectionScreen";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const SavingDepositRequestScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const { currentTenant } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [rekeningPengirim, setRekeningPengirim] = useState("");
  const [showTabunganContainer, setShowTabunganContainer] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [itemsDropdown, setItemDropdown] = useState(null);
  const [items] = useState([
    { label: "Transfer Bank BCA (Dicek Manual)", value: "01" },
    { label: "Transfer Bank Permata (Dicek Manual)", value: "02" },
  ]);

  const [amount, setAmount] = useState("Rp. 0");

  const array = [
    "hjashefjk Tata Cara Setoran",
    "askljdlkas bMasuk pada menu transfer di ATM/M-Banking anda",
    ' alksdlkasPilih "Transfer sesama bank"',
    "Pada Bagian rekening tujuan, Masukan 0010101010101 a.n PT BPR Kreasi Nusantara",
    'Pada Bagian Nominal Masukan Sebesar Rp. {amount} "jangan dibulatkan ke atas"',
    'Apabila Telah melakukan transfer Klik Tombol "saya Sudah Transfer" Dibawah ini',
  ];

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

  const handleRekeningPengirimChange = (text) => {
    setRekeningPengirim(text);
    checkTabunganContainerVisibility(inputValue, text, itemsDropdown);
  };

  const handlePaymentChange = (itemValue) => {
    setPaymentDropdown(itemValue);
    checkTabunganContainerVisibility(inputValue, rekeningPengirim, itemValue);
  };

  const handleInputChange = (text) => {
    const cleanedText = text.replace(/[^\d]/g, "");
    const numericValue = Number.parseInt(cleanedText, 10);
    if (!isNaN(numericValue)) {
      const formattedValue = "Rp. " + numericValue.toLocaleString();
      setAmount(formattedValue);
    }
  };

  const checkTabunganContainerVisibility = (
    inputValue,
    rekeningPengirim,
    paymentDropdown
  ) => {
    if ((inputValue, paymentDropdown, rekeningPengirim)) {
      setShowTabunganContainer(true);
    } else {
      setShowTabunganContainer(false);
    }
  };

  const handleSubmit = async () => {
    try {
      createSavingDeposit(token, id, {
        amount: parseInt(amount.replace(/[^0-9]/g, "")),
      }).then((result) => {
        setData(result.data);
        console.log(data);
        navigation.navigate("DetailSaving", { id });
      });
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  const handleSelectPaymentMethod = () => {
    navigation.navigate("PaymentMethodSelection");
  };

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Setoran Tabungan" />
      </Appbar.Header>

      <ScrollView>
        <View style={styles.box}>
          <Caption style={styles.text}>Jumlah</Caption>
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
          <TouchableOpacity onPress={handleSelectPaymentMethod}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Pilih Metode Pembayaran"
                editable={false}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.pickerContainer}>
            <Caption style={styles.text}>Nama Rekening Pengirim</Caption>
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              placeholderTextColor="#999999"
              onChangeText={handleRekeningPengirimChange}
            />
          </View>
          {showTabunganContainer && (
            <View style={styles.tabunganContainer}>
              <Text style={styles.tabunganText}>Tata Cara Setoran</Text>
              {array.map((item, index) => (
                <Text key={index} style={styles.txt}>
                  {index + 1}. {item}
                </Text>
              ))}
              <TouchableOpacity
                style={styles.customButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>SAYA SUDAH TRANSFER</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* <TouchableOpacity>
          <Button style={styles.btn}>
          <Text style={styles.btnSubmit}>SUBMIT</Text>
          </Button>
        </TouchableOpacity> */}
        </View>
      </ScrollView>
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
    fontSize: 18,
  },
  DropDown: {
    textAlign: "auto",
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
    marginTop: 15,
  },
  tabunganContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 16,
  },
  tabunganText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  txt: {
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: Color.primaryBackgroundColor.backgroundColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SavingDepositRequestScreen;
