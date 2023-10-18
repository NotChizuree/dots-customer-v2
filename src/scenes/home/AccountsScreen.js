import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Button,
  Dimensions,
} from "react-native";
import { Caption, Chip, Divider, Headline, List } from "react-native-paper";
import { SceneMap } from "react-native-tab-view";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { TabView } from "react-native-tab-view";
import { useQuery } from "@apollo/client";

import { useToast } from "react-native-paper-toast";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { findAllSaving } from "../../api/SavingApi";

const AccountsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const toaster = useToast();

  const renderSavingAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const { token } = useContext(AuthContext);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(1);
        const result = await findAllSaving(token);

        console.log(2);
        setLoading(false);
        setData(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (loading) {
      console.log("loading hehe");
      return <LoadingOverlay />;
    }

    if (error) {
      console.log("error heheh");
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    console.log(data);
    console.log(loading);
    console.log(error);
    console.log(token);

    const renderSavingItem = (data) => {
      return (
        <View style={{backgroundColor:'blue'}}>
          <List.Item
            onPress={() =>
              navigation.navigate("SavingDetail", { savingID: data.id })
            }
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: "#3629B7",
                  backgroundColor: "#3629B7",
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft:'3%'
                }}
                icon="wallet"
              />
            )}
          />
        </View>
      );
    };

    const { height } = Dimensions.get("window");

    return (
      <SafeAreaView>
        <FlatList
          contentContainerStyle={{ height: "100%" }}
          data={data} // Gunakan langsung data, karena ini adalah array objek
          ListFooterComponent={
            <Button
              onPress={() => navigation.navigate("CreateSavingAccount")}
              title="Buat Tabungan Baru"
            />
          }
          ListFooterComponentStyle={{
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => renderSavingItem(item)}
        />
      </SafeAreaView>
    );
  };

  const renderLoanAccountsList = () => {


    const { loading, error, data } = useQuery(FindLoansByCustomerID);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data kredit: " + error.message,
      });
    }

    const renderLoanItem = (data) => {
      return (
        <View>
          <List.Item
            onPress={() =>
              navigation.navigate("LoanDetail", { loanID: data.id })
            }
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{ backgroundColor: "#3629B7", borderRadius: 10 }}
                icon="cash"
              />
            )}
          />
        </View>
      );
    };

    return (
      <SafeAreaView style={{ flexGrow: 1 }}>
        <FlatList
          contentContainerStyle={{ height: "100%" }}
          data={data?.findLoansByCustomerID}
          ListFooterComponent={
            <Button
              onPress={() => navigation.navigate("CreateSavingAccount")}
              title="Ajukan Kredit Baru"
            />
          }
          ListFooterComponentStyle={{
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => renderLoanItem(item)}
        />
      </SafeAreaView>
    );
  };

  const renderDepositAccountsList = () => {
    const { loading, error, data } = useQuery(FindSavingsByCustomerID);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data deposito: " + error.message,
      });
    }

    const renderDepositItem = (data) => {
      return (
        <View>
          <List.Item
            onPress={() =>
              navigation.navigate("DepositDetail", { savingID: data.id })
            }
            titleStyle={{ marginBottom: 8 }}
            title={<Text>DEPOSITO 6 BLN</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{ backgroundColor: "#3629B7", borderRadius: 10 }}
                icon="cash"
              />
            )}
          />
        </View>
      );
    };

    return (
      <ScrollView>
        <FlatList
          data={data.findSavingsByCustomerID}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => renderDepositItem(item)}
        />
      </ScrollView>
    );
  };

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              {index === i && (
                <Chip
                  style={{ marginRight: 10 }}
                  textStyle={{ fontWeight: "bold", fontSize: 16 }}
                >
                  <Text>{route.title}</Text>
                </Chip>
              )}
              {index !== i && (
                <Text style={{ marginTop: 6, marginRight: 10, fontSize: 16 }}>
                  {route.title}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    savings: renderSavingAccountsList,
    loan: renderLoanAccountsList,
    deposit: renderDepositAccountsList,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "savings", title: "Tabungan" },
    { key: "loan", title: "Kredit" },
    { key: "deposit", title: "Deposito" },
  ]);

  return (
    <View style={styles.screen}>
      <View style={{ backgroundColor: "#0E47A0" }}>
        <Headline style={styles.heading}>Akun Saya</Headline>
      </View>

      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    height: "100%",
  },
  heading: {
    marginTop: "7%",
    marginBottom: "4%",
    fontSize: 30,
    fontWeight: "800",
    marginLeft: "5%",
    paddingBottom: "2%",
    color: "white",
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: "3%",
    paddingLeft: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
    // backgroundColor: "#F5F8FB",
    backgroundColor: "blue",
  },
});

export default AccountsScreen;
