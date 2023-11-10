import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Caption, Chip, Divider, Headline, List } from "react-native-paper";
import { SceneMap } from "react-native-tab-view";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { TabView } from "react-native-tab-view";
import { useToast } from "react-native-paper-toast";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import Color from "../../common/Color";
import { findAllSaving } from "../../api/SavingApi";
import { findAllLoan } from "../../api/LoanApi";
import { findAllDeposit } from "../../api/DepositApi";

const AccountsScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  const toaster = useToast();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "savings", title: "Simpanan" },
    { key: "loan", title: "Pinjaman" },
    { key: "deposit", title: "Sim. Berjangka" },
  ]);

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => (
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
        ))}
      </View>
    );
  };

  const AccountList = ({ fetchData, renderAccountItem }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchDataAndHandleErrors = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await fetchData(token);
          setLoading(false);
          setData(result.data.data);
        } catch (error) {
          setLoading(false);
          setError(error);
        }
      };

      fetchDataAndHandleErrors();
    }, [token]);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({
        message: `Terjadi error saat memuat data: ${error.message}`,
      });
    }

    return (
      <SafeAreaView style={{ marginTop: "-10%" }}>
        <View style={styles.listItem}>
          <FlatList
            data={data}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderAccountItem(item)}
          />
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
            style={{
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Ajukan Akun Baru
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const renderSavingItem = (data) => (
    <View style={styles.box}>
      <List.Item
        onPress={() => navigation.navigate("SavingDetail", { id: data.id })}
        titleStyle={{ marginBottom: 8 }}
        title={<Text>{data.productType.name}</Text>}
        description={<Text>{data.id}</Text>}
        left={(props) => (
          <List.Icon
            color="white"
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

  const renderLoanItem = (data) => (
    <View style={styles.box}>
      <List.Item
        onPress={() => navigation.navigate("LoanDetail", { id: data.id })}
        titleStyle={{ marginBottom: 8 }}
        title={<Text>{data.productType.name}</Text>}
        description={<Text>{data.id}</Text>}
        left={(props) => (
          <List.Icon
            color="white"
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

  const renderDepositItem = (data) => (
    <View style={styles.box}>
      <List.Item
        onPress={() => navigation.navigate("DepositDetail", { id: data.id })}
        titleStyle={{ marginBottom: 8 }}
        title={<Text>{data.productType.name}</Text>}
        description={<Text>{data.id}</Text>}
        left={(props) => (
          <List.Icon
            color="white"
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

  const renderScene = SceneMap({
    savings: () => (
      <AccountList
        fetchData={findAllSaving}
        renderAccountItem={renderSavingItem}
      />
    ),
    loan: () => (
      <AccountList fetchData={findAllLoan} renderAccountItem={renderLoanItem} />
    ),
    deposit: () => (
      <AccountList
        fetchData={findAllDeposit}
        renderAccountItem={renderDepositItem}
      />
    ),
  });

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
