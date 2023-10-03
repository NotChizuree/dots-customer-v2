import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Headline, Caption, Button} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {decode as atob, encode as btoa} from 'base-64';

const AttendanceReservationSuccessScreen = ({navigation, route}) => {
    const {reservation} = route.params;

    return (
    <View style={styles.screen}>
        <Image style={{height: 70, width: 70, marginBottom: 10}} source={require('../../../assets/img/success.webp')} />
        <Headline style={{fontSize: 30, marginBottom: 20}}>Reservasi Berhasil</Headline>
        <QRCode size={150} value={btoa(
              JSON.stringify({
                type: 'ATTENDANCE',
                id: reservation.id,
              }),
            )} />
        <View style={{marginTop: 20, alignItems: 'center', width: '90%'}}>
            <Caption>Kantor Tujuan</Caption>
            <Text>{reservation.branchID} </Text>
            <Caption>Tanggal dan Jam</Caption>
            <Text>{new Date(reservation.attendAtStart).toLocaleDateString() + ' ' +  new Date(reservation.attendAtStart).toLocaleTimeString()} </Text>
            <Caption>Layanan Tujuan</Caption>
            <Text>{reservation.destinationService} </Text>
        </View>

        <View style={{marginTop: 20, alignItems: 'center', width: '80%'}}>
            <Text style={{textAlign: 'center'}}>Screenshot halaman ini untuk menyimpan QR Code atau lihat pada menu Reservasi Kedatangan </Text>
            <Text style={{textAlign: 'center'}}>Anda dapat menunjukan QR Code ini di kantor tujuan pada waktu yang telah anda pilih </Text>
        </View>

        <Button style={{width: '80%', marginTop: 20}} mode='contained' onPress={() => navigation.goBack()}>Kembali</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginTop: '7%',
    marginBottom: '4%',
    fontSize: 30,
    marginLeft: '5%',
    paddingBottom: '2%',
    color: 'white'
  },
  settingMenuButton: {
    backgroundColor: 'white'
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: '#F5F8FB',
  },
  textInput: {
    height: 40,
    marginBottom: 5,
  },
});

export default AttendanceReservationSuccessScreen;
