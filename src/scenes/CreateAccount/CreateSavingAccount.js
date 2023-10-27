import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, TextInput, Button, Caption } from "react-native-paper";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { createSaving, findSavingProdukType } from "../../api/SavingApi";
import { useContext } from "react";
import DropDown from "react-native-paper-dropdown";

const CreateSavingAccount = ({ navigation }) => {
  const { token } = useContext(AuthContext);

  const [Service, setService] = useState("");
  const [showDropDownService, setshowDropDownService] = useState(false);

  const [dropdown, setDropdown] = useState([]);
  const fetchData = async () => {
    try {
      findSavingProdukType(token).then((result) => {
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
    } else {
      setMutationLoading(true);
      try {
        createSaving(token, {
          productType: Service,
          currentBalance: ProdukNumber,
        }).then((result) => {
          navigation.goBack();
          Alert.alert(
            "Sukses",
            "Berhasil Mengajukan Tabungan Baru. Silahkan cek notifikasi secara berkala"
          );
          console.log(result.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Ajukan Tabungan Baru" />
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
            style={styles.dropdown}
          />

          <Caption>Jumlah Pengajuan</Caption>
          <TextInput
            style={styles.input}
            mode="outlined"
            value={formatToRupiah(ProdukNumber)}
            onChangeText={handleInputChange}
            keyboardType="numeric"
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

export default CreateSavingAccount;
