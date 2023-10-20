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

const SavingAccountDetailScreen = ({ navigation, route }) => {
  const menus = [
    {
      id: 1,
      title: "Setoran Tabungan",
      icon: "wallet-outline",
      onPress: () => navigation.navigate("SavingDepositRequest"),
    },
  ];

  const toaster = useToast();
  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [availableBalance, setAvailableBalance] = useState("");

  const { id } = route.params;
  const { token } = useContext(AuthContext);
  const [amout, setAmout] = useState([]);

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
      setAmout(result.data.data);
      console.log(result.data.data);
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
      <ShimmerPlaceholder
        style={{
          width: "80%",
          height: 25,
          marginTop: 10,
          marginBottom: 20,
        }}
        autoRun={true}
      />
    );
  };

  const renderAccountInfo = () => {
    return (
      <>
        <Text adjustFontSizeToFit style={styles.bankName}>
          {Name}
        </Text>
        <Text style={styles.accountNumber}>{accountNumber}</Text>
        <Text style={styles.balanceTitle}>Saldo Aktif</Text>
        <View style={{ flexDirection: "row" }}>
          <Headline adjustFontSizeToFit style={styles.balance}>
            Rp{" "}
            {isBalanceShown
              ? parseFloat(availableBalance).toLocaleString("en")
              : "******"}
          </Headline>
          <IconButton
            onPress={() => setIsBalanceShown(!isBalanceShown)}
            icon={isBalanceShown ? "eye-off" : "eye"}
            size={20}
            style={{ bottom: 5 }}
          />
        </View>
      </>
    );
  };

  const renderTransactionHistoryList = (item) => {
    const readableCreatedAt = new Date(item.createdAt).toString();
    return (
      <List.Item
        titleStyle={{ marginBottom: 7 }}
        style={{ backgroundColor: "white" }}
        title={<Text>{item.title}</Text>}
        description={<Text>{new Date(readableCreatedAt).toDateString()}</Text>}
        right={() => (
          <Caption
            style={[
              styles.transactionAmountCaption,
              item.transactionType === "D"
                ? styles.debitTrxAmount
                : styles.creditTrxAmount,
            ]}
          >
            {item.transactionType === "D" ? "-" : "+"}Rp {item.amount}
          </Caption>
        )}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tabungan" />
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
            data={amout}
            renderItem={({ item }) => renderTransactionHistoryList(item)}
            ItemSeparatorComponent={() => <Divider />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flex: 1,
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
    padding: 10,
  },
  balanceTitle: {
    marginTop: 10,
    color: "white",
  },
  balance: {
    marginBottom: 10,
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
  accountNumber: {
    fontSize: 18,
    color: "white",
    fontFamily: "Credit-Regular",
  },
  bankName: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    color: "white",
  },
  contentBlock: {
    height: "50%",
    padding: 15,
  },
  detailHeading: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
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