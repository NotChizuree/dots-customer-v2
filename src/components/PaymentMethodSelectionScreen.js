import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PaymentMethodSelectionScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      // Lakukan apa yang Anda perlu lakukan setelah pemilihan metode pembayaran
      // Misalnya, Anda bisa menavigasi kembali ke halaman sebelumnya dengan metode pembayaran yang dipilih.
      navigation.goBack();
    } else {
      // Tampilkan pesan kesalahan jika metode pembayaran belum dipilih.
      alert("Pilih metode pembayaran terlebih dahulu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pilih Metode Pembayaran</Text>
      <TouchableOpacity
        style={selectedMethod === "Transfer BCA" ? styles.selectedMethod : styles.method}
        onPress={() => handleMethodSelection("Transfer BCA")}
      >
        <Text>Transfer Bank BCA (Dicek Manual)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={selectedMethod === "Transfer Permata" ? styles.selectedMethod : styles.method}
        onPress={() => handleMethodSelection("Transfer Permata")}
      >
        <Text>Transfer Bank Permata (Dicek Manual)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>LANJUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F8FB",
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
    backgroundColor: "blue",
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
