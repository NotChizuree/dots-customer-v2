import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import { Appbar, Headline, List, Divider, Caption, IconButton, Button, Subheading } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';  // Import Shimmer Placeholder
import { useQuery } from '@apollo/client';
import { FindSavingByID } from '../../query/ProductQuery';
import { useToast } from 'react-native-paper-toast';
import { FindSavingTransactionsBySavingID } from '../../query/ProductTransactionQuery';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { FlatGrid } from 'react-native-super-grid';
import MenuButton from '../../components/common/MenuButton';
import Color from '../../common/Color';


const SavingAccountDetailScreen = ({ navigation, route }) => {
  const menus = [
    {
      id: 1,
      title: 'Setoran Tabungan',
      icon: 'wallet-outline',
      onPress: () => navigation.navigate('SavingDepositRequest'),
    },
    // {
    //   id: 2,
    //   title: 'Beli / Bayar',
    //   icon: 'cash-outline',
    //   onPress: () => navigation.navigate('CustomerList'),
    // },
  ];

  const { savingID } = route.params;
  const toaster = useToast();
  const [isBalanceShown, setIsBalanceShown] = useState(false);

  let { loading: savingLoading, error: savingError, data: savingData } = useQuery(FindSavingByID, {
    variables: { id: savingID },
  });

  let { loading: transactionsLoading, error: transactionsError, data: transactionsData } = useQuery(FindSavingTransactionsBySavingID, {
    variables: { id: savingID },
  });

  if (savingError) {
    toaster.show({ message: 'Terjadi kesalahan dalam mengambil data tabungan' });
  }

  if (transactionsError) {
    toaster.show({ message: 'Terjadi kesalahan dalam mengambil data transaksi' + transactionsError });
  }

  const renderAccountInfoPlaceholder = () => {
    return (
      <>
        <ShimmerPlaceholder
          style={{
            width: '80%',
            height: 25,
            marginTop: '7.5%',
            marginBottom: '13%'}}
          autoRun={true}
        >
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={{
            width: '50%',
            height: 20,
            marginBottom: '13%'}}
          autoRun={true}
        >
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={{
            width: '30%',
            height: 15,
            marginBottom: '5%'}}
          autoRun={true}
        >
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          style={{
            width: '46%',
            height: 20,
            marginBottom: '7.5%'}}
          autoRun={true}
        >
        </ShimmerPlaceholder>
      </>
    );
  };

  const renderAccountInfo = account => {
    return (
      <>
        <Text adjustFontSizeToFit style={styles.bankName}>
          {account.productType.name}
        </Text>
        <Text style={styles.accountNumber}>
          {account.id}
        </Text>
        <Text style={styles.balanceTitle}>Saldo Aktif</Text>
        <View style={{ flexDirection: 'row' }}>
          <Headline adjustFontSizeToFit style={styles.balance}>
            Rp {isBalanceShown ? parseFloat(account.availableBalance).toLocaleString('en') : '******'}
          </Headline>
          <IconButton onPress={() => setIsBalanceShown(!isBalanceShown)} icon={isBalanceShown ? 'eye-off' : 'eye'} size={25} style={{ bottom: 5 }} />
        </View>
      </>
    );
  }

  const renderTransactionHistoryList = item => {
    const readableCreatedAt = new Date(item.createdAt).toString();
    return (
      <List.Item titleStyle={{ marginBottom: 7 }} style={{ backgroundColor: 'white' }}
        title={<Text>{item.title}</Text>}
        description={<Text>{new Date(readableCreatedAt).toDateString()}</Text>}
        right={() => <Caption style={[styles.transactionAmountCaption, item.transactionType == 'DEBIT' ? styles.debitTrxAmount : styles.creditTrxAmount]}>{item.transactionType == 'DEBIT' ? '-' : '+'}Rp {item.amount}</Caption>}
      />
    );
  }
  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tabungan" />
      </Appbar.Header>
      <ScrollView style={styles.screen}>
        <View style={styles.headingBlock}>
          <LinearGradient style={styles.headingGradient} colors={Color.primaryGradientColor} >
            {savingLoading ? renderAccountInfoPlaceholder() : renderAccountInfo(savingData.findSavingByID)}
            {/* {renderAccountInfoPlaceholder()} */}
          </LinearGradient>
        </View>

        <View style={styles.contentBlock}>

          <FlatGrid
            data={menus}
            keyExtractor={(item, index) => index}
            itemDimension={80}
            renderItem={({ item }) => (
              <View style={styles.buttonRow}>
                <MenuButton
                  style={styles.menuButton}
                  iconName={item.icon}
                  title={item.title}
                  numColumns={2}
                  onPress={item.onPress}
                />
              </View>
            )}
          />
          <Headline style={styles.detailHeading}>
            Sejarah Transaksi
          </Headline>
          {transactionsLoading ? <View style={{ marginTop: "15%" }}><LoadingOverlay /></View> :
            <FlatList
              style={styles.transactionList}
              data={transactionsData.findSavingTransactionsBySavingID}
              renderItem={({ item }) => renderTransactionHistoryList(item)}
              ItemSeparatorComponent={() => <Divider />}
            />}

        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flexGrow: 1,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: '#F5F8FB',
  },
  headingBlock: {
    marginTop: '3%',
    width: '95%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  pointInfoGradient: {
    borderRadius: 10,
    paddingLeft: '7%',
    paddingVertical: 10
  },
  headingGradient: {
    borderRadius: 10,
    paddingLeft: '7%',
  },
  balanceTitle: {
    marginTop: '7%',
    color: 'white',
  },
  balance: {
    marginBottom: '6%',
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  accountNumber: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Credit-Regular'
  },
  bankName: {
    marginTop: '7.5%',
    marginBottom: '13%',
    fontSize: 18,
    color: 'white',
  },
  contentBlock: {
    paddingTop: '5%',
    flex: 1,
    height: '100%',
  },
  detailHeading: {
    marginTop: '1%',
    marginLeft: '3%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  transactionList: {
    marginTop: '3%',
  },
  transactionAmountCaption: {
    fontSize: 16,
    top: 10,
    fontWeight: 'bold',
    marginRight: 10,
  },
  debitTrxAmount: {
    color: 'grey',
  },
  creditTrxAmount: {
    color: '#95D362',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#EAEBF8',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'column',
    margin: 5
  },
  placeholderItem: {
  },
});

export default SavingAccountDetailScreen;