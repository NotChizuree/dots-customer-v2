import { useMutation, useQuery } from '@apollo/client';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Appbar, Caption, Button} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useToast } from 'react-native-paper-toast';
import { FindAllOffices } from '../../query/CompanyQuery';
import { CreateAttendanceReservation } from '../../query/AttendanceReservationQuery';
import LoadingOverlay from '../../components/common/LoadingOverlay';

const RestructureRequestScreen = ({navigation}) => {
  const toaster = useToast();

  const [showResturctureTypeDropdown, setShowResturctureTypeDropdown] = useState(false);
  const [resturctureType, setResturctureType] = useState(null);


  const [createRestructurationRequest, {loading: mutationLoading, error: mutationError}] = useMutation(CreateAttendanceReservation, {variables: {
  }});


  if (mutationError) {
    toaster.show({message: 'Gagal melakukan booking ' + mutationError.message});
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
          <Appbar.Content title="Pengajuan Restrukturisasi" />
      </Appbar.Header>
    <ScrollView style={styles.screen}>
      { mutationLoading && <LoadingOverlay /> }
      <View style={{width: '95%', alignSelf: 'center', backgroundColor: 'white', padding: 20, borderRadius: 18}}>
        <Caption>Jenis Restrukturisasi</Caption>
        <DropDown
          mode={"outlined"}
          value={resturctureType}
          setValue={setResturctureType}
          list={[
            { label: 'Penurunan Suku Bunga', value: '1' },
            { label: 'Perpanjangan Jangka Waktu', value: '2' },
            { label: 'Pengurangan Tunggakan Pokok', value: '3' },
            { label: 'Pengurangan Tunggakan Bunga', value: '4' },
            { label: 'Penambahan Fasilitas Kredit', value: '5' },
          ]}
          visible={showResturctureTypeDropdown}
          showDropDown={() => setShowResturctureTypeDropdown(true)}
          onDismiss={() => setShowResturctureTypeDropdown(false)}
          right={<TextInput.Icon name={"menu-down"} style={{top: 4}} onPress={() => setShowResturctureTypeDropdown(true)} />}
        />
       
        <Button mode="contained" onPress={() => onSubmitForm()} style={{marginTop: 15}}>Ajukan</Button>
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

export default RestructureRequestScreen;
