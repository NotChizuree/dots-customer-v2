import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigation from "./HomeNavigation";
// import {createGraphqlClient} from '../query/GraphqlClient';
// import {ApolloProvider} from '@apollo/client';
import BlogScreen from "../scenes/blogs/BlogsScreen";
import SavingAccountDetailScreen from "../scenes/account/SavingAccountDetailScreen";
import LoanAccountDetailScreen from "../scenes/account/LoanAccountDetailScreen";
import AttendanceReservationScreen from "../scenes/attendanceReservation/AttendanceReservationScreen";
// import AttendanceReservationSuccessScreen from '../scenes/attendanceReservation/AttendanceReservationSuccessScreen';
// import RestructureRequestScreen from '../scenes/account/RestructureRequestScreen';
// import LoanTopupRequestScreen from '../scenes/account/LoanTopupRequestScreen';
// import LoanRepaymentScheduleScreen from '../scenes/account/LoanRepaymentScheduleScreen';
import DepositAccountDetailScreen from "../scenes/account/DepositAccountDetailScreen";
import SavingDepositRequestScreen from "../scenes/account/SavingDepositRequestScreen";
// import IdentityPhotoScreen from '../scenes/authentication/IdentityPhotoScreen';
import ChangePasswordScreen from "../scenes/authentication/ChangePasswordScreen";
import CreateSavingAccount from "../scenes/CreateAccount/CreateSavingAccount";
import CreateDepositAccount from "../scenes/CreateAccount/CreateDepositAccount";
import CreateLoanAccount from "../scenes/CreateAccount/CreateLoanAccount";
import LoanRepaymentScheduleScreen from "../scenes/account/LoanRepaymentScheduleScreen";
import LoanTopupRequestScreen from "../scenes/account/LoanTopupRequestScreen";
import LoanPaymentScreen from "../scenes/account/LoanPaymentScreen";
import PaymentMethodSelectionScreen from "../components/PaymentMethodSelectionScreen";

const AppNavigation = () => {
  const AppNavigator = createStackNavigator();
  // const GraphqlClient = createGraphqlClient();
  return (
    // <ApolloProvider client={GraphqlClient}>
    <AppNavigator.Navigator initialRouteName="Home">
      <AppNavigator.Screen
        name="Home"
        component={HomeNavigation}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="Blog"
        component={BlogScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="SavingDetail"
        component={SavingAccountDetailScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="DepositDetail"
        component={DepositAccountDetailScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="LoanDetail"
        component={LoanAccountDetailScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="AttendanceReservation"
        component={AttendanceReservationScreen}
        options={{ headerShown: false }}
      />
      {/* <AppNavigator.Screen
          name="AttendanceReservationSuccess"
          component={AttendanceReservationSuccessScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="RestructureRequest"
          component={RestructureRequestScreen}
          options={{headerShown: false}}
        /> */}
      <AppNavigator.Screen
        name="SavingDepositRequest"
        component={SavingDepositRequestScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="CreateSavingAccount"
        component={CreateSavingAccount}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="CreateLoanAccount"
        component={CreateLoanAccount}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="CreateDepositAccount"
        component={CreateDepositAccount}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="LoanRepaymentScheduleScreen"
        component={LoanRepaymentScheduleScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="LoanTopupRequest"
        component={LoanTopupRequestScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="LoanPayment"
        component={LoanPaymentScreen}
        options={{ headerShown: false }}
      />
      <AppNavigator.Screen
        name="PaymentMethodSelection"
        component={PaymentMethodSelectionScreen}
        options={{ headerShown: false }}
      />
    </AppNavigator.Navigator>
    // </ApolloProvider>
  );
};

export default AppNavigation;
