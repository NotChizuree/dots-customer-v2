import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Appbar, Caption, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useToast } from 'react-native-paper-toast';
import { FindAllOffices } from '../../query/CompanyQuery';
import { CreateAttendanceReservation } from '../../query/AttendanceReservationQuery';
import LoadingOverlay from '../../components/common/LoadingOverlay';

const LoanTopupRequestScreen = ({ navigation }) => {
  const toaster = useToast();

  const [topupAmount, setTopupAmount] = useState(null);


  const [createRestructurationRequest, { loading: mutationLoading, error: mutationError }] = useMutation(CreateAttendanceReservation, {
    variables: {
    }
  });


  if (mutationError) {
    toaster.show({ message: 'Gagal melakukan booking ' + mutationError.message });
  }

  //   const onSubmitForm = () => {
  //     if (!mutationLoading) {
  //       createReservation()
  //       .then(res => {
  //         navigation.dispatch(
  //           StackActions.replace('AttendanceReservationSuccess', {reservation: res.data.createAttendanceReservation})
  //         );
  //       })
  //       .catch(err => {});
  //     }
  //   };

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
            left={<TextInput.Affix text='Rp.' />}
            value={topupAmount}
            onChangeText={(text) => setTopupAmount(text)}
          />

          <Button
            mode="contained"
            onPress={() => onSubmitForm()}
            style={{
              marginTop: 15,
              backgroundColor: Color.primaryBackgroundColor.backgroundColor,
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

export default LoanTopupRequestScreen;
