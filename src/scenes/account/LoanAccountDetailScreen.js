import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { Appbar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import MenuButton from "../../components/common/MenuButton";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { findLoanBillById, findLoanById, findLoanNowlById } from "../../api/LoanApi";
import { FlatGrid } from "react-native-super-grid";
import { Card, Paragraph, Title } from "react-native-paper";
import { useFonts } from "expo-font";

const LoanAccountDetailScreen = ({ navigation, route }) => {
  let [fontLoaded] = useFonts({
    "SomeTypeMono-Bold": require("../../../assets/fonts/SometypeMono-Bold.ttf"),
  });

  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const [loanLoading, setLoanLoading] = useState(true);
  const { user, exp } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const { id } = route.params;
  const parameter = {
    route: "LoanPayment",
    norek: id,
  };
  const [data, setData] = useState({});
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await findLoanById(token, id);
      setData(result.data.data);
      setSkeletonLoading(false);
      setLoanLoading(false);
    } catch (error) {
      console.error("Error API:", error);
      setSkeletonLoading(false);
      setLoanLoading(false);
    }
  };

  const [bill, setBill] = useState([]);

  const fetchDataBill = async () => {
    try {
      const result = await findLoanNowlById(token, id);
      setBill(result.data.data);
      setSkeletonLoading(false);
      setLoanLoading(false);
    } catch (error) {
      console.error("Error API:", error);
      setSkeletonLoading(false);
      setLoanLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataBill();
  }, []);

  const menus = [
    {
      id: 1,
      title: "Top-up Pinjaman",
      icon: "journal-outline",
      onPress: () => navigation.navigate("LoanTopupRequest", { id: data.id }),
    },
    {
      id: 2,
      title: "Bayar Tagihan",
      icon: "cash-outline",
      onPress: () =>
        navigation.navigate("PaymentMethodSelection", { parameter }),
    },
    {
      id: 3,
      title: "Lihat Jadwal Tagihan",
      icon: "list-outline",
      onPress: () =>
        navigation.navigate("LoanRepaymentScheduleScreen", { id: data.id }),
    },
  ];

  const renderSkeletonLoader = () => {
    return (
      <>
        <ShimmerPlaceholder
          style={{
            width: "40%",
            height: 25,
            marginBottom: 15,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "80%",
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
      <View>
        <Text style={styles.bankName}>
          {data.productType && data.productType.name
            ? data.productType.name
            : "Product Name Not Available"}
        </Text>
        <Text
          style={{
            fontFamily: "SomeTypeMono-Bold",
            color: "white",
            fontSize: 25,
          }}
        >
          {data.id ? data.id : "Account Number Not Available"}{" "}
        </Text>
        <Text style={styles.balanceTitle}>Sisa Pinjaman</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.balance}>
            Rp{" "}
            {isBalanceShown
              ? data.outstandingBalance
                ? ` ${parseFloat(data.outstandingBalance).toLocaleString(
                    "en-US"
                  )}`
                : "Balance Not Available"
              : "******"}
          </Text>
          <IconButton
            onPress={() => setIsBalanceShown(!isBalanceShown)}
            icon={isBalanceShown ? "eye-off" : "eye"}
            size={25}
          />
        </View>
      </View>
    );
  };

  const renderUpcomingRepayment = () => {
    let totalRepayment = 0;
    for (let i = 0; i < bill.length; i++) {
      totalRepayment += Number(bill[i].amount);
    }
    return (
      <Card style={{ ...styles.card, backgroundColor: "white" }}>
        <Card.Content>
          <Title style={styles.detailHeading}>
            Total Tagihan s.d. Bulan Ini
          </Title>
          <Paragraph style={styles.totalAmount}>
            Rp {totalRepayment.toLocaleString("en")}
          </Paragraph>
          <FlatList
            data={bill}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.billItem}>
                <Text style={styles.billInfo}>Tagihan ke - {item.term}</Text>
                <Text style={styles.paragraph}>Pokok :</Text>
                <Paragraph>
                  Rp {parseFloat(item.principalAmount).toLocaleString("en")}
                </Paragraph>
                <Text style={styles.paragraph}>Bunga :</Text>
                <Paragraph>
                  Rp {parseFloat(item.interestAmount).toLocaleString("en")}
                </Paragraph>
                <Text style={styles.paragraph}>Denda :</Text>
                <Paragraph>
                  Rp {parseFloat(item.penaltyAmount).toLocaleString("en")}
                </Paragraph>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pinjaman" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.headingBlock}>
          <LinearGradient
            style={styles.headingGradient}
            colors={Color.primaryGradientColor}
          >
            {skeletonLoading ? renderSkeletonLoader() : renderAccountInfo()}
          </LinearGradient>
          <FlatList
            horizontal={true}
            data={menus}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.menuButton}>
                <MenuButton
                  style={styles.menuButton}
                  iconName={item.icon}
                  title={item.title}
                  onPress={item.onPress}
                />
              </View>
            )}
          />
        </View>
        {renderUpcomingRepayment()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flexGrow: 1,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
  headingBlock: {
    marginTop: "3%",
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
  },
  headingGradient: {
    borderRadius: 10,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
  },
  balanceTitle: {
    marginTop: "7%",
    color: "white",
  },
  balance: {
    marginBottom: "6%",
    marginTop: 5,
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
  },
  bankName: {
    marginBottom: 20,
    fontSize: 20,
    color: "white",
  },
  menuButton: {
    marginBottom: 5,
    marginRight:10,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  billItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
  billInfo: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "400",
  },
  paragraph: {
    marginTop: 5,
    fontSize: 17,
  },

  card: {
    margin: 20,
    marginBottom: "30%",
  },
  menuButtonTextContainer: {
    alignItems: "center",
  },
  menuButtonText: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
});

export default LoanAccountDetailScreen;
