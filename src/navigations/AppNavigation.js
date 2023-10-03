import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from './HomeNavigation';
import {createGraphqlClient} from '../query/GraphqlClient';
import {ApolloProvider} from '@apollo/client';
import SavingAccountDetailScreen from '../scenes/account/SavingAccountDetailScreen';
import LoanAccountDetailScreen from '../scenes/account/LoanAccountDetailScreen';
import AttendanceReservationScreen from '../scenes/attendanceReservation/AttendanceReservationScreen';
import AttendanceReservationSuccessScreen from '../scenes/attendanceReservation/AttendanceReservationSuccessScreen';
import RestructureRequestScreen from '../scenes/account/RestructureRequestScreen';
import LoanTopupRequestScreen from '../scenes/account/LoanTopupRequestScreen';
import LoanRepaymentScheduleScreen from '../scenes/account/LoanRepaymentScheduleScreen';
import DepositAccountDetailScreen from '../scenes/account/DepositAccountDetailScreen';
import CreateSavingAccountScreen from '../scenes/account/CreateSavingAccountScreen';
import SavingDepositRequestScreen from '../scenes/account/SavingDepositRequestScreen';
import IdentityPhotoScreen from '../scenes/authentication/IdentityPhotoScreen';

const AppNavigation = () => {
  const AppNavigator = createStackNavigator();
  const GraphqlClient = createGraphqlClient();
  return (
    <ApolloProvider client={GraphqlClient}>
      <AppNavigator.Navigator initialRouteName="Home">
        <AppNavigator.Screen
          name="Home"
          component={HomeNavigation}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="SavingDetail"
          component={SavingAccountDetailScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="DepositDetail"
          component={DepositAccountDetailScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="LoanDetail"
          component={LoanAccountDetailScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="AttendanceReservation"
          component={AttendanceReservationScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="AttendanceReservationSuccess"
          component={AttendanceReservationSuccessScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="RestructureRequest"
          component={RestructureRequestScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="LoanTopupRequest"
          component={LoanTopupRequestScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="LoanRepaymentSchedule"
          component={LoanRepaymentScheduleScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="CreateSavingAccount"
          component={CreateSavingAccountScreen}
          options={{headerShown: false}}
        />
        <AppNavigator.Screen
          name="SavingDepositRequest"
          component={SavingDepositRequestScreen}
          options={{headerShown: false}}
        />
      </AppNavigator.Navigator>
    </ApolloProvider>
  );
};

export default AppNavigation;
