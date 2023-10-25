import React, { useState } from "react";
import {
  Button,
  Caption,
  TextInput,
  Text, // Import Text from react-native
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Headline, Appbar, Subheading } from "react-native-paper";
import Color from "../common/Color";

const PaymentMethodSelectionScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      // Do what you need to do after selecting the payment method
      // For example, you can navigate back to the previous page with the selected payment method.
      navigation.goBack();
    } else {
      // Show an error message if a payment method hasn't been selected.
      alert("Pilih metode pembayaran terlebih dahulu.");
    }
  };

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pilih Metde Pembayaran" />
      </Appbar.Header>
      <View style={styles.box}>
        <TouchableOpacity
          style={{
            ...(
              selectedMethod === "Transfer BCA" ? styles.selectedMethod : styles.method
            ),
            borderWidth: 1, 
            borderColor: 'black',
            backgroundColor: selectedMethod === "Transfer BCA" ? Color.primaryBackgroundColor.backgroundColor : 'white', // Ganti warna latar belakang saat diklik
          }}
          onPress={() => handleMethodSelection("Transfer BCA")}
        >
          <Text>Transfer Bank BCA (Dicek Manual)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...(
              selectedMethod === "Transfer Permata" ? styles.selectedMethod : styles.method
            ),
            borderWidth: 1, 
            borderColor: 'black',
            backgroundColor: selectedMethod === "Transfer Permata" ? Color.primaryBackgroundColor.backgroundColor : 'white',
          }}
          onPress={() => handleMethodSelection("Transfer Permata")}
        >
          <Text>Transfer Bank Permata (Dicek Manual)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>LANJUT</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    box: {
      backgroundColor: "#ffffff",
      padding: 30,
      margin: 20,
      borderRadius: 10,
      marginTop: 20,
    },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  method: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedMethod: {
    backgroundColor: "lightblue",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: Color.primaryBackgroundColor.backgroundColor,
    padding: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default PaymentMethodSelectionScreen;
