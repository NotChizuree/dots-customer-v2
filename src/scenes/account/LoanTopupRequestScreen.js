import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Appbar, Caption, Button } from 'react-native-paper';
import { useToast } from 'react-native-paper-toast';
import { useMutation } from '@apollo/client';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { CreateAttendanceReservation } from '../../query/AttendanceReservationQuery';
import { terbilang } from '../../common/Common';

const LoanTopupRequestScreen = ({ navigation }) => {
  const toaster = useToast();
  const [topupAmount, setTopupAmount] = useState('');

  const [createRestructurationRequest, { loading: mutationLoading, error: mutationError }] = useMutation(CreateAttendanceReservation, {
    variables: {
      // variables for mutation if needed
    }
  });

  const formatCurrency = (value) => {
    return `Rp. ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // ... (kode lainnya)

const convertThreeDigitsToWords = (number) => {
  const ones = number % 10;
  const tens = Math.floor((number % 100) / 10);
  const hundreds = Math.floor(number / 100);

  const words = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

  let result = "";

  if (hundreds > 0) {
    result += `${words[hundreds]} ratus`;
  }

  if (tens === 1) {
    result += (result !== "" ? " " : "") + `${words[ones + 10]}`;
  } else if (tens > 1) {
    result += (result !== "" ? " " : "") + `${words[tens * 10]}`;
    if (ones > 0) {
      result += ` ${words[ones]}`;
    }
  } else if (ones > 0) {
    result += (result !== "" ? " " : "") + `${words[ones]}`;
  }

  return result;
};

  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setTopupAmount(formatCurrency(numericValue));
  };

  const onSubmitForm = () => {
    // Your form submission logic here
    // Example: call createRestructurationRequest mutation
    // and handle success or error
    if (!mutationLoading) {
      createRestructurationRequest()
        .then(res => {
          // handle success, navigate or show success message
        })
        .catch(err => {
          // handle error, show error message
          toaster.show({ message: 'Gagal melakukan booking ' + err.message });
        });
    }
  };

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pengajuan Top-up" />
      </Appbar.Header>
      <ScrollView style={styles.screen}>
        {mutationLoading && <LoadingOverlay />}
        <View style={{ width: '95%', alignSelf: 'center', backgroundColor: 'white', padding: 20, borderRadius: 18 }}>
          <Caption>Jumlah</Caption>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            value={topupAmount}
            onChangeText={handleTextChange}
          />

          <Caption style={{ marginTop: 5, fontStyle: 'italic' }}>
            {terbilang(topupAmount.replace(/\D/g, ''))}
          </Caption>

          <Button
            mode="contained"
            onPress={onSubmitForm}
            style={{
              marginTop: 15,
              backgroundColor: Color.primaryBackgroundColor.backgroundColor, // Make sure Color is defined or replace with a color value
            }}
          >
            Ajukan
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flex: 1,
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

export default LoanTopupRequestScreen;
