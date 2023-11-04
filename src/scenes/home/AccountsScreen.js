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
import { useToast } from "react-native-paper-toast";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import Color from "../../common/Color";
import { findAllSaving } from "../../api/SavingApi";
import { findAllLoan } from "../../api/LoanApi";
import { findAllDeposit } from "../../api/DepositApi";

const AccountsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const toaster = useToast();

  const renderSavingAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const { token } = useContext(AuthContext);

    // if (loading && data == []) {
    //   return <LoadingOverlay />;
    // }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await findAllSaving(token);
        setLoading(false);
        setData(result.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (loading && !data) {
      return <LoadingOverlay />;
    }


    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    const renderSavingItem = (data) => {
      return (
        <View style={styles.box}>
          <List.Item
            onPress={() => navigation.navigate("SavingDetail", { id: data.id })}
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: Color.primaryBackgroundColor.backgroundColor,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "3%",
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
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderSavingItem(item)}
          />
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateSavingAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan Simpanan Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderLoanAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const { token } = useContext(AuthContext);

    // if (loading && data == []) {
    //   return <LoadingOverlay />;
    // }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await findAllLoan(token);

        setLoading(false);
        setData(result.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    const renderLoanItem = (data) => {
      return (
        <View style={styles.box}>
          <List.Item
            onPress={() => navigation.navigate("LoanDetail", { id: data.id })}
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: Color.primaryBackgroundColor.backgroundColor,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "3%",
                }}
                icon="credit-card"
              />
            )}
          />
        </View>
      );
    };

    return (
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderLoanItem(item)}
          />
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateLoanAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan Pinjaman Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderDepositAccountsList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const { token } = useContext(AuthContext);

    // if (loading && data == []) {
    //   return <LoadingOverlay />;
    // }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await findAllDeposit(token);
        setLoading(false);
        setData(result.data.data);
      } catch (error) {   
        setLoading(false);
        setError(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
    if (loading) {
      return <LoadingOverlay />;
    }


    if (error) {
      navigation.goBack();
      toaster.show({
        message: "Terjadi error saat memuat data tabungan: " + error.message,
      });
    }

    // if (data.length === 0) {
    //   // Tampilkan pesan jika tidak ada data.
    //   return (
    //     <View style={styles.noDataContainer}>
    //       <Text style={styles.noDataText}>Tidak ada data tabungan yang tersedia.</Text>
    //     </View>
    //   );
    // }


    const renderDepositItem = (data) => {
      return (
        <View style={styles.box}>
          <List.Item
            onPress={() =>
              navigation.navigate("DepositDetail", { id: data.id })
            }
            titleStyle={{ marginBottom: 8 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={(props) => (
              <List.Icon
                color={Colors.white}
                style={{
                  backgroundColor: Color.primaryBackgroundColor.backgroundColor,
                  borderRadius: 10,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "3%",
                }}
                icon="cash"
              />
            )}
          />
        </View>
      );
    };

    return (
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderDepositItem(item)}
          />
        </View>

        {/* Tombol "Ajukan Deposit Baru" di bawah tab bar */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateDepositAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan Simpanan Berjangka Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
              key={route.key}
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
    { key: "savings", title: "Simpanan" },
    { key: "loan", title: "Pinjaman" },
    { key: "deposit", title: "Sim. Berjangka" },
  ]);

  return (
    <View style={styles.screen}>
      <View style={Color.primaryBackgroundColor}>
        <Headline style={styles.heading}>Rekening Saya</Headline>
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
    height: "100%",
  },
  heading: {
    marginTop: "15%",
    fontSize: 30,
    marginLeft: "5%",
    paddingBottom: "2%",
    color: "white",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "8%",
    paddingRight: "8%",
    paddingTop: "3%",
    paddingBottom: "3%",
    // backgroundColor: "#F5F8FB",
  },
  box: {
    padding: 10,
  },
  listItem: {
    marginTop: 50,
  },
  createButtonContainer: {
    position: "absolute",
    top: 35,
    width: "100%",
    backgroundColor: "White",
    padding: 10,
  },
});

export default AccountsScreen;
