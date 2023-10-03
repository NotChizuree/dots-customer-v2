import React, {useState, useContext} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput
} from 'react-native-paper';
import {useToast} from 'react-native-paper-toast';
import { StackActions } from '@react-navigation/native';

const MainOnboardingScreen = ({navigation}) => {
  const toaster = useToast();

  return (
    <View style={styles.screen}>
      <View style={{marginTop: '12%'}}> 
        <Headline style={styles.heading}>Selamat Datang di</Headline>
        <Headline style={styles.heading}>dots Customer</Headline>
      </View>
      <Image style={{marginTop: '5%', height: '30%', width: '70%', alignSelf: 'center'}} source={require('../../../assets/img/onboarding.webp')} />
      <Caption onPress={() => {}} style={{alignSelf: 'center', fontSize: 14, textAlign: 'center', marginHorizontal: 10}}>dots Customer membantu anda untuk melakukan kegiatan finansial secara mudah, mulai dari menabung, membuka deposito, sampai mengajukan pinjaman melalui lembaga keuangan mikro terdekat dari lokasi Anda!</Caption>

      <Caption style={{color: '#000000', marginTop: '15%', alignSelf: 'center', fontWeight: 'bold', fontSize: 14}}>Anda telah menjadi nasabah?</Caption>
      <Button style={{marginTop: '4%'}} mode="contained" onPress={() => navigation.dispatch(StackActions.replace('TenantSelector'))}>
        Saya sudah menjadi nasabah
      </Button>
      <Button style={{marginTop: '4%'}} mode="outlined" onPress={() => navigation.dispatch(StackActions.replace('TenantSelector'))}>
        Belum menjadi nasabah
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    marginTop: '2%',
  },
});

export default MainOnboardingScreen;
