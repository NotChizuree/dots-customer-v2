import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import { Appbar, Headline, List, Caption, IconButton, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';  // Import Shimmer Placeholder
import { useQuery } from '@apollo/client';
import { FindLoanByID, FindLoanRepaymentScheduleByLoanID } from '../../query/ProductQuery';
import { useToast } from 'react-native-paper-toast';
import { FlatGrid } from 'react-native-super-grid';
import MenuButton from '../../components/common/MenuButton';


const LoanAccountDetailScreen = ({ navigation, route }) => {
  const { loanID } = route.params;
  const toaster = useToast();
  const [isBalanceShown, setIsBalanceShown] = useState(false);

  let { loading: loanLoading, error: loanError, data: loanData } = useQuery(FindLoanByID, {
    variables: { id: loanID },
  });

  let { loading: repaymentLoading, error: repaymentError, data: repaymentData } = useQuery(FindLoanRepaymentScheduleByLoanID, {
    variables: { id: loanID },
  });

  if (loanError) {
    toaster.show({ message: 'Terjadi kesalahan dalam mengambil data kredit' });
  }

  if (repaymentError) {
    toaster.show({ message: 'Terjadi kesalahan dalam mengambil data tagihan' });
  }

  const menus = [
    {
      id: 1,
      title: 'Ajukan Restrukturisasi',
      icon: 'clipboard-outline',
      onPress: () => navigation.navigate('RestructureRequest'),
    },
    {
      id: 2,
      title: 'Ajukan Top-up Kredit',
      icon: 'journal-outline',
      onPress: () => navigation.navigate('LoanTopupRequest'),
    },
    {
      id: 3,
      title: 'Bayar Tagihan',
      icon: 'cash-outline',
      onPress: () => navigation.navigate(''),
    },
    {
      id: 4,
      title: 'Lihat Jadwal Tagihan',
      icon: 'list-outline',
      onPress: () => navigation.navigate('LoanRepaymentSchedule', { loan: loanData ? loanData?.findLoanByID : null }),
    },
  ];

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

  const renderRepaymentSchedulePlaceholder = () => {
    return (
      <>
        {/* <SkeletonPlaceholder>
          <View style={{ marginLeft: 25 }}>
            <View style={{ width: '30%', height: 15, marginTop: '7.5%', marginBottom: '8%' }} />
            <View style={{ width: '70%', height: 15, marginBottom: '4%' }} />
          </View>
        </SkeletonPlaceholder> */}
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
        <Text style={styles.balanceTitle}>Sisa Terutang</Text>
        <View style={{ flexDirection: 'row' }}>
          <Headline adjustFontSizeToFit style={styles.balance}>
            Rp {isBalanceShown ? account.outstandingBalance : '******'}
          </Headline>
          <IconButton onPress={() => setIsBalanceShown(!isBalanceShown)} icon={isBalanceShown ? 'eye-off' : 'eye'} size={25} style={{ bottom: 5 }} />
        </View>
      </>
    );
  }

  const renderUpcomingRepayment = data => {
    let totalRepayment = 0;
    for (let i = 0; i < data.length; i++) {
      totalRepayment += Number(data[i].amount);
    }

    return (
      <List.Section>
        <List.Accordion title={<Headline style={styles.detailHeading}>Total Tagihan s.d. Bulan Ini</Headline>} description={<Text style={{ fontSize: 17 }}>Rp {totalRepayment}</Text>}>
          <View>
            {data.map((val, _) => {
              return (
                <View>
                  <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 15 }}>Tagihan ke - {val.term}</Text>
                  <List.Item title={<Text>Pokok</Text>} description={<Text>Rp {val.principalAmount}</Text>} />
                  <List.Item title={<Text>Bunga</Text>} description={<Text>Rp {val.interestAmount}</Text>} />
                  <List.Item title={<Text>Denda</Text>} description={<Text>Rp {val.penaltyAmount}</Text>} />
                  <Divider />
                </View>
              )
            })}
          </View>
        </List.Accordion>
      </List.Section>
    );
  }

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Kredit" />
      </Appbar.Header>
      <ScrollView style={styles.screen}>
        <View style={styles.headingBlock}>
          <LinearGradient style={styles.headingGradient} colors={['#055aa3', '#0472d1']} >
            {loanLoading ? renderAccountInfoPlaceholder() : renderAccountInfo(loanData.findLoanByID)}
          </LinearGradient>
        </View>
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
        <View style={styles.contentBlock}>
          {repaymentLoading ? renderRepaymentSchedulePlaceholder() : renderUpcomingRepayment(repaymentData.findLoanRepaymentScheduleByLoanID)}
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
    paddingTop: '2%',
    flex: 1,
    width: '95%',
    backgroundColor: 'white',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 17,
    height: '100%',
    marginBottom: 20,
  },
  detailHeading: {
    marginTop: 5,
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
    margin: 4
  },
});

export default LoanAccountDetailScreen;