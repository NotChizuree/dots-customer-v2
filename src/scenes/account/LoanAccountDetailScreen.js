import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar, Headline, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import MenuButton from "../../components/common/MenuButton";
import { AuthContext } from "../../providers/AuthenticationProvider";
import { findLoanById } from "../../api/LoanApi";

const LoanAccountDetailScreen = ({ navigation, route }) => {
  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const [loanLoading, setLoanLoading] = useState(true);

  const { token } = useContext(AuthContext);
  const { id } = route.params;
  console.log(id);
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

  useEffect(() => {
    fetchData();
  }, []);

  const menus = [
    {
      id: 1,
      title: "Restructure",
      icon: "clipboard-outline",
      onPress: () => navigation.navigate("RestructureRequest"),
    },
    {
      id: 2,
      title: "Top-up Loan",
      icon: "journal-outline",
      onPress: () => navigation.navigate("LoanTopupRequest"),
    },
    {
      id: 3,
      title: "Pay Bill",
      icon: "cash-outline",
      onPress: () => navigation.navigate(""),
    },
    {
      id: 4,
      title: "View Repayment Schedule",
      icon: "list-outline",
      onPress: () =>
        navigation.navigate("LoanRepaymentSchedule", {
          loan: data, 
        }),
    },
  ];

  

  const renderSkeletonLoader = () => {
    return (
      <View>
        <ShimmerPlaceholder
          style={{
            width: "80%",
            height: 25,
            marginTop: 10,
            marginBottom: 20,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "50%",
            height: 20,
            marginBottom: 20,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "30%",
            height: 15,
            marginBottom: 10,
          }}
          autoRun={true}
        />
        <ShimmerPlaceholder
          style={{
            width: "46%",
            height: 20,
            marginBottom: 20,
          }}
          autoRun={true}
        />
      </View>
    );
  };
  console.log(data)

  const renderAccountInfo = () => {
    return (
      <View>
        <Text style={styles.bankName}>{data.productType.name || "gada nama"}</Text>
        <Text style={styles.accountNumber}>
          {data.id ? data.id : "Account Number Not Available"}
        </Text>
        <Text style={styles.balanceTitle}>Active Balance</Text>
        <View style={{ flexDirection: "row" }}>
          <Headline style={styles.balance}>
            {isBalanceShown
              ? data.outstandingBalance
                ? `Rp ${parseFloat(data.outstandingBalance).toLocaleString("en-US")}`
                : "Balance Not Available"
              : "******"}
          </Headline>
          <IconButton
            onPress={() => setIsBalanceShown(!isBalanceShown)}
            icon={isBalanceShown ? "eye-off" : "eye"}
            size={25}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Loan Account" />
      </Appbar.Header>
      <ScrollView style={styles.screen}>
        <View style={styles.headingBlock}>
          <LinearGradient
            style={styles.headingGradient}
            colors={["#1E90FF", "#0073E6"]}
          >
            {skeletonLoading ? renderSkeletonLoader() : renderAccountInfo()}
          </LinearGradient>
        </View>
        <View style={styles.menuButtonsContainer}>
          {menus.map((item) => (
            <View style={styles.menuButton} key={item.id}>
              <MenuButton
                iconName={item.icon}
                title={item.title}
                onPress={item.onPress}
              />
            </View>
          ))}
        </View>
      </ScrollView>
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
    marginTop: 10,
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
  menuButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  menuButton: {
    flex: 1,
    margin: 5,
  },
});

export default LoanAccountDetailScreen;
