import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, TextInput, Button, Caption } from "react-native-paper";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { useContext } from "react";
import DropDown from "react-native-paper-dropdown";
import { createLoan, findLoanProdukType } from "../../api/LoanApi";

const CreateLoanAccount = ({ navigation }) => {
  const { token } = useContext(AuthContext);

  const [Service, setService] = useState("");
  const [showDropDownService, setshowDropDownService] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [dropdown, setDropdown] = useState([]);
  const fetchData = async () => {
    try {
      findLoanProdukType(token).then((result) => {
        setDropdown(result.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [ProdukNumber, setProdukNumber] = useState("");

  const handleInputChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setProdukNumber(cleanedText);
  };

  const formatToRupiah = (angka) => {
    return `Rp. ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };
  const [mutationLoading, setMutationLoading] = useState(false);

  const handleSumit = async () => {
    if (!Service) {
      Alert.alert("Error", "Kolom Produk Belum Dipilih.");
    } else if (!ProdukNumber) {
      Alert.alert("Error", "Kolom Jumlah Pengajuan Belum Dipilih.");
    } else if (!JangkaDropdown) {
      Alert.alert("Error", "Kolom Jangka Dropdown Belum Dipilih.");
    } else {
      setMutationLoading(true)
      try {
        createLoan(token, {
          productType: Service,
          currentBalance: ProdukNumber,
          period: JangkaDropdown,
        }).then((result) => {
          navigation.goBack();
          Alert.alert(
            "Sukses",
            "Berhasil Mengajukan Pinjaman Baru. Silahkan cek notifikasi secara berkala"
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [showDropDow, setShowDropDown] = useState(false);
  const [JangkaDropdown, setJangkaDropdown] = useState("");
  const Jangka = Array.from({ length: 60 }, (_, index) => ({
    label: `${index + 1} bulan`,
    value: index + 1,
  }));
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ajukan Pinjaman Baru" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.box}>
          <Caption>Produk</Caption>
          <DropDown
            mode={"outlined"}
            visible={showDropDownService}
            showDropDown={() => setshowDropDownService(true)}
            onDismiss={() => setshowDropDownService(false)}
            value={Service}
            setValue={setService}
            list={dropdown}
            style={[styles.dropdown, { backgroundColor: "white" }]}
            />

          <Caption>Jumlah Pengajuan</Caption>
          <TextInput
            style={styles.input}
            mode="outlined"
            value={formatToRupiah(ProdukNumber)}
            onChangeText={handleInputChange}
            keyboardType="numeric"
          />

          <Caption>Periode Jangka Waktu</Caption>
          <DropDown
            mode={"outlined"}
            visible={showDropDow}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={JangkaDropdown}
            setValue={setJangkaDropdown}
            list={Jangka}
          />

          <Button
            mode="contained"
            style={{ marginTop: 20, ...Color.primaryBackgroundColor }}
            onPress={handleSumit}
            disabled={mutationLoading}
            loading={mutationLoading}
          >
            {mutationLoading ? "Mengirim..." : ""}
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
  dropdown: {
    marginBottom: 10,
  },
});

export default CreateLoanAccount;
