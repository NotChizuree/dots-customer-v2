import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Button,
  Caption,
  Headline,
  Subheading,
  Text,
  Appbar,
  List,
  Divider,
} from "react-native-paper";
import { useToast } from "react-native-paper-toast";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { StackActions } from "@react-navigation/native";
import RNSInfo from "react-native-sensitive-info";
import * as SecureStore from "expo-secure-store";

const TenantSelectorScreen = ({ navigation }) => {
  const { setTenant } = useContext(AuthContext);
  const toaster = useToast();

  const handleTenantSelector = async (tenant) => {
    await SecureStore.setItemAsync("currentTenant", JSON.stringify(tenant));
    setTenant(tenant);
    navigation.dispatch(StackActions.replace("Login"));
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Kota Jakarta Timur", value: "01" },
    { label: "Kota Jakarta Barat", value: "02" },
    { label: "Kota Jakarta Pusat", value: "03" },
    { label: "Kota Jakarta Utara", value: "04" },
    { label: "Kota Jakarta Selatan", value: "05" },
    { label: "Kota Bekasi", value: "06" },
    { label: "Kota Depok", value: "07" },
    { label: "Kabupaten Bekasi", value: "08" },
    { label: "Kota Tangerang Selatan", value: "09" },
    { label: "Kota Tangerang", value: "10" },
  ]);

  const tenantsData = [
    {
      id: 1,
      name: "BPR Kreasi Nusantara",
      address: "Casablanca East",
      ljkType: "BPR",
    },
    {
      id: 2,
      name: "BPR Maliki Subur Sejahtera",
      address: "Jalan Durian",
      ljkType: "BPR",
    },
    { id: 3, name: "BPR Tetap Maju", address: "Jalan Apel", ljkType: "BPR" },
    { id: 4, name: "BPR Slamet Agung", address: "Jalan Bina", ljkType: "BPR" },
  ];

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pencarian" />
      </Appbar.Header>

      <View style={styles.screen}>
        <Text>Silahkan pilih Kota / Kabupaten</Text>
        <DropDownPicker
          style={{
            height: 40,
            marginTop: 10,
            marginBottom: 10,
            borderColor: "transparent",
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />

        {value &&
          tenantsData.map((val, key) => (
            <View key={val.id}>
              <List.Item
                title={val.name}
                description={val.address}
                right={() => (
                  <Button onPress={() => handleTenantSelector(val)}>
                    Pilih
                  </Button>
                )}
              />
              <Divider />
            </View>
          ))}
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
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    marginTop: "2%",
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
});

export default TenantSelectorScreen;
