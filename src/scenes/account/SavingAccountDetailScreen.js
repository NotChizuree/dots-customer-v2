import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import {
  Appbar,
  Headline,
  List,
  Divider,
  Caption,
  IconButton,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { useToast } from "react-native-paper-toast";
import { findSavingById, findSavingHistory } from "../../api/SavingApi";
import { AuthContext } from "../../providers/AuthenticationProvider";
import Color from "../../common/Color";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import MenuButton from "../../components/common/MenuButton";
import { ScrollView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

const SavingAccountDetailScreen = ({ navigation, route }) => {
  let [fontLoaded] = useFonts({
    "SomeTypeMono-Bold": require("../../../assets/fonts/SometypeMono-Bold.ttf"),
  });

  const { id } = route.params;
  const parameter = {
    route: "SavingDepositRequest",
    norek: id,
  };
  const menus = [
    {
      id: 1,
      title: "Setoran Simpanan",
      icon: "wallet-outline",
      onPress: () =>
        navigation.navigate("PaymentMethodSelection", { parameter }),
    },
  ];

  const toaster = useToast();
  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");

  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      findSavingById(token, id)
        .then((result) => {
          const data = result.data.data;
          setName(data.productType.name);
          setAccountNumber(data.id);
          setAvailableBalance(data.currentBalance);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error API:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchDataHistory = async () => {
    try {
      const result = await findSavingHistory(token, id);
      setAmount(result.data.data);
    } catch (error) {
      console.error("Error API:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataHistory();
  }, []);

  const renderAccountInfoPlaceholder = () => {
    return (
      <>
        <ShimmerPlaceholder
          style={{
            width: "80%",
            height: 25,
            marginBottom: 15,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "40%",
            height: 20,
            marginBottom: 15,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "20%",
            height: 15,
            marginBottom: 15,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "50%",
            height: 17,
            marginBottom: 18,
          }}
          autoRun={true}
        />
      </>
    );
  };

  const renderAccountInfo = () => {
    return (
      <>
        <Text adjustFontSizeToFit style={styles.bankName}>
          {Name}
        </Text>
        <Text
          style={{
            fontFamily: "SomeTypeMono-Bold",
            color: "white",
            fontSize: 25,
            marginBottom: 16,
          }}
        >
          {accountNumber}
        </Text>

        <Text style={styles.balanceTitle}>Saldo Simpanan</Text>
        <View style={{ flexDirection: "row" }}>
          <Headline adjustFontSizeToFit style={styles.balance}>
            Rp{" "}
            {isBalanceShown
              ? parseFloat(availableBalance).toLocaleString("en")
              : "**********"}
          </Headline>
          <IconButton
            onPress={() => setIsBalanceShown(!isBalanceShown)}
            icon={isBalanceShown ? "eye-off" : "eye"}
            size={20}
            color="white"
          />
        </View>
      </>
    );
  };

  const renderTransactionHistoryList = (item) => {
    const timestamp = new Date(item.createdAt).toLocaleString();
    const formatToRupiah = (angka) => {
      return `${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
    };
    const isDebit = item.transactionType == "C ";

    return (
      <List.Item
        titleStyle={{ marginBottom: 7 }}
        style={{ backgroundColor: "white" }}
        title={<Text>{item.title}</Text>}
        description={<Text>{timestamp}</Text>}
        right={() => (
          <Caption
            style={[
              styles.transactionAmountCaption,
              isDebit ? styles.creditTrxAmount : styles.debitTrxAmount,
            ]}
          >
            {isDebit ? "+" : "-"}Rp{" "}
            {formatToRupiah(item.amount)}
          </Caption>
        )}
      />
    );
  };

  return (
    <ScrollView style={styles.screen}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Simpanan" />
      </Appbar.Header>
      <View style={styles.headingBlock}>
        <LinearGradient
          style={styles.headingGradient}
          colors={Color.primaryGradientColor}
        >
          {loading ? renderAccountInfoPlaceholder() : renderAccountInfo()}
        </LinearGradient>
      </View>

      <View>
        {menus.map((item) => (
          <View style={styles.buttonRow} key={item.id}>
            <MenuButton
              style={styles.menuButton}
              iconName={item.icon}
              title={item.title}
              numColumns={2}
              onPress={item.onPress}
            />
          </View>
        ))}
      </View>
      <View style={styles.contentBlock}>
        <Headline style={styles.detailHeading}>Sejarah Transaksi</Headline>
        {loading ? (
          <View style={{ marginTop: 15 }}>
            <LoadingOverlay />
          </View>
        ) : (
          <FlatList
            style={styles.transactionList}
            data={amount}
            renderItem={({ item }) => renderTransactionHistoryList(item)}
            ItemSeparatorComponent={() => <Divider />}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flex: 1,
    flexGrow: 1,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
  headingBlock: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
  },
  headingGradient: {
    borderRadius: 10,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
  },
  balanceTitle: {
    marginTop: 10,
    fontSize: 15,
    color: "white",
  },
  balance: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
  accountNumber: {
    fontSize: 25,
    marginBottom: 16,
    marginTop: 25,
    fontWeight: "bold",
    color: "white",
    fontFamily: "SomeTypeMono-Bold",
  },
  bankName: {
    marginBottom: 20,
    fontSize: 20,
    color: "white",
  },

  detailHeading: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    padding: 20,
  },
  transactionList: {
    marginTop: 10,
  },
  transactionAmountCaption: {
    fontSize: 16,
    top: 10,
    fontWeight: "bold",
    marginRight: 10,
  },
  debitTrxAmount: {
    color: "red",
  },
  creditTrxAmount: {
    color: "#95D362",
  },
  menuButton: {
    margin: 10,
    backgroundColor: "#EAEBF8",
    height: 90,
  },
  buttonRow: {
    flexDirection: "row",
    margin: 5,
    height: 100,
  },
});

export default SavingAccountDetailScreen;
