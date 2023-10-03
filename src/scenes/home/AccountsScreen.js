import React, { useContext, useState } from 'react';
import { StyleSheet, ScrollView, View, useWindowDimensions, FlatList, TouchableOpacity, Text, Button, Dimensions } from 'react-native';
import { Caption, Chip, Divider, Headline, List } from 'react-native-paper';
import { SceneMap } from 'react-native-tab-view';
import { AuthContext } from '../../providers/AuthenticationProvider';
import { TabView } from 'react-native-tab-view';
import { useQuery } from '@apollo/client';
import { FindLoansByCustomerID, FindSavingsByCustomerID } from '../../query/ProductQuery';
import { useToast } from 'react-native-paper-toast';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../common/Color';

const AccountsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const toaster = useToast();

  const renderSavingAccountsList = () => {
    const { loading, error, data } = useQuery(FindSavingsByCustomerID);

    if (loading) {
      return <LoadingOverlay />;
    }

    if (error) {
      navigation.goBack();
      toaster.show({ message: 'Terjadi error saat memuat data tabungan: ' + error.message })
    }

    const renderSavingItem = (data) => {
      return (
        <View>
          <List.Item
            onPress={() => navigation.navigate('SavingDetail', { savingID: data.id })}
            titleStyle={{ marginBottom: 5 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={props => <List.Icon color={Colors.white} style={{ ...Color.primaryBackgroundColor, borderRadius: 10, width: 50, marginLeft: 15, height: 50 }} icon="wallet" />}
          />
        </View>
      );
    }

    const { height } = Dimensions.get('window');

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: Color.primaryBackgroundColor.backgroundColor,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('CreateSavingAccount')}
        >
          <Text style={{ color: 'white', textTransform: 'uppercase' }}>Ajukan Tabungan Baru</Text>
        </TouchableOpacity>

        <ScrollView style={{ flexGrow: 1, height: '95%' }}>
          <FlatList
            data={data?.findSavingsByCustomerID}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderSavingItem(item)}
          />
        </ScrollView>
      </View>
    );
  }


  const renderLoanAccountsList = () => {
    const { loading, error, data } = useQuery(FindLoansByCustomerID);
  
    if (loading) {
      return <LoadingOverlay />;
    }
  
    if (error) {
      navigation.goBack();
      toaster.show({ message: 'Terjadi error saat memuat data kredit: ' + error.message })
    }
  
    const renderLoanItem = (data) => {
      return (
        <View>
          <List.Item
            onPress={() => navigation.navigate('LoanDetail', { loanID: data.id })}
            titleStyle={{ marginBottom: 5 }}
            title={<Text>{data.productType.name}</Text>}
            description={<Text>{data.id}</Text>}
            left={props => <List.Icon color={Colors.white} style={{ ...Color.primaryBackgroundColor, borderRadius: 10, width: 50, marginLeft: 15, height: 50 }} icon="cash" />}
          />
        </View>
      );
    }
  
    const { height } = Dimensions.get('window');
  
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: Color.primaryBackgroundColor.backgroundColor,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('CreateLoanAccount')}
        >
          <Text style={{ color: 'white', textTransform: 'uppercase' }}>Ajukan Kredit Baru</Text>
        </TouchableOpacity>
  
        <ScrollView style={{ flexGrow: 1, height: '95%' }}>
          <FlatList
            data={data?.findLoansByCustomerID}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderLoanItem(item)}
          />
        </ScrollView>
      </View>
    );
  }
  

  const renderDepositAccountsList = () => {
    const { loading, error, data } = useQuery(FindSavingsByCustomerID);
  
    if (loading) {
      return <LoadingOverlay />;
    }
  
    if (error) {
      navigation.goBack();
      toaster.show({ message: 'Terjadi error saat memuat data deposito: ' + error.message })
    }
  
    const renderDepositItem = (data) => {
      return (
        <View>
          <List.Item
            onPress={() => navigation.navigate('DepositDetail', { savingID: data.id })}
            titleStyle={{ marginBottom: 5 }}
            title={<Text>DEPOSITO 6 BLN</Text>}
            description={<Text>{data.id}</Text>}
            left={props => <List.Icon color={Colors.white} style={{ ...Color.primaryBackgroundColor, borderRadius: 10, width: 50, marginLeft: 15, height: 50 }} icon="cash" />}
          />
        </View>
      );
    }
  
    const { height } = Dimensions.get('window');
  
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: Color.primaryBackgroundColor.backgroundColor,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('CreateDepositAccount')}
        >
          <Text style={{ color: 'white', textTransform: 'uppercase' }}>Ajukan Deposito Baru</Text>
        </TouchableOpacity>
  
        <ScrollView style={{ flexGrow: 1, height: '95%' }}>
          <FlatList
            data={data?.findSavingsByCustomerID}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => renderDepositItem(item)}
          />
        </ScrollView>
      </View>
    );
  }
  

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              {index === i && <Chip style={{ marginRight: 10 }} textStyle={{ fontWeight: 'bold', fontSize: 16 }}><Text>{route.title}</Text></Chip>}
              {index !== i && <Text style={{ marginTop: 6, marginRight: 10, fontSize: 16 }}>{route.title}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const renderScene = SceneMap({
    savings: renderSavingAccountsList,
    loan: renderLoanAccountsList,
    deposit: renderDepositAccountsList,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'savings', title: 'Tabungan' },
    { key: 'loan', title: 'Kredit' },
    { key: 'deposit', title: 'Deposito' },
  ]);

  return (
    <View style={styles.screen}>
      <View style={Color.primaryBackgroundColor}>
        <Headline style={styles.heading}>Daftar Rekening</Headline>
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
    backgroundColor: 'white',
    flex: 1,
    height: '100%'
  },
  heading: {
    marginTop: '15%',
    fontSize: 30,
    marginLeft: '5%',
    paddingBottom: '2%',
    color: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingTop: '3%',
    paddingBottom: '3%',
    backgroundColor: '#F5F8FB'
  },
});

export default AccountsScreen;
