import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Appbar, Caption, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { useToast } from 'react-native-paper-toast';
import { FindAllOffices } from '../../query/CompanyQuery';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CreateAttendanceReservation } from '../../query/AttendanceReservationQuery';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import { StackActions } from '@react-navigation/native';

const AttendanceReservationScreen = ({ navigation }) => {
  // TODO: get office operational hours from reducer
  const operationalHourStartInt = 9
  const operationalHourEndInt = 15

  const toaster = useToast();

  const [showDestinationServiceDropdown, setShowDestinationServiceDropdown] = useState(false);
  const [destinationService, setDestinationService] = useState(null);
  const destinationServices = [
    { label: "Teller", value: "TELLER" },
    { label: "Customer Service", value: "CUSTOMER_SERVICE" },
  ];

  const [reason, setReason] = useState(null);

  const currentLocalTime = new Date();
  const intTime = currentLocalTime.getHours() + (currentLocalTime.getMinutes() / 60);

  const [showAttendanceTimeRangeDropdown, setShowAttendanceTimeRangeDropdown] = useState(false);
  const [attendanceTimeRange, setAttendanceTimeRange] = useState(null);

  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);
  const [office, setOffice] = useState(null);

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [date, setDate] = useState(intTime < operationalHourEndInt ? currentLocalTime : new Date(currentLocalTime.getTime() + 86400000));

  const openDatePicker = () => {
    setShowDatepicker(true);
  };

  const { loading, error, data } = useQuery(FindAllOffices);

  if (error) {
    toaster.show({ message: 'Gagal mendapatkan data kantor' });
  }

  const generateOfficeList = () => {
    let res = []
    data.findAllOffices.map((value, _) => {
      res.push({ label: value.name, value: value.id });
    });

    return res;
  }

  const intTimeToReadableTime = (i) => {
    if (parseInt(i) == i) {
      return i + '.00 - ' + i + '.30';
    } else {
      const hour = i - 0.5;
      const nextHour = hour + 1;
      return hour + '.30 - ' + nextHour + '.00';
    }
  }

  const generateTimeList = () => {
    let attendanceTimeList = [];

    let currentTime;
    if (intTime > operationalHourStartInt && intTime < operationalHourEndInt) {
      if (parseInt(intTime) == intTime) {
        currentTime = intTime;
      } else {
        currentTime = parseInt(intTime) + 0.5;
      }
    } else {
      currentTime = operationalHourStartInt
    }


    while (currentTime !== operationalHourEndInt) {
      attendanceTimeList.push({ label: intTimeToReadableTime(currentTime), value: currentTime.toString() });
      currentTime += 0.5;
    }

    return attendanceTimeList;
  }

  const attendAtStartToStr = type => {
    const parsedHour = parseInt(attendanceTimeRange);
    const parsedMinute = Number(attendanceTimeRange) - parsedHour;
    const attendAtDate = new Date(date);

    const res = new Date(attendAtDate.setHours(parsedHour)).setMinutes(parsedMinute * 60);

    if (type === 'START') {
      const newDate = new Date(res).setSeconds(0);
      return new Date(newDate).toISOString();
    } else {
      const newDate = new Date(res + 30 * 60000).setSeconds(0);
      return new Date(newDate).toISOString();
    }
  }

  const [createReservation, { loading: mutationLoading, error: mutationError }] = useMutation(CreateAttendanceReservation, {
    variables: {
      branchID: office,
      destinationService: destinationService,
      reason: reason,
      attendAtStart: attendanceTimeRange ? attendAtStartToStr('START') : null,
      attendAtEnd: attendanceTimeRange ? attendAtStartToStr('END') : null
    }
  });


  if (mutationError) {
    toaster.show({ message: 'Gagal melakukan booking ' + mutationError.message });
  }

  const onSubmitForm = () => {
    if (!mutationLoading) {
      createReservation()
        .then(res => {
          navigation.dispatch(
            StackActions.replace('AttendanceReservationSuccess', { reservation: res.data.createAttendanceReservation })
          );
        })
        .catch(err => { });
    }
  };

  return (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Reservasi Kedatangan" />
      </Appbar.Header>
      <ScrollView style={styles.screen}>
        {mutationLoading && <LoadingOverlay />}
        <View style={{ width: '95%', alignSelf: 'center', backgroundColor: 'white', padding: 20, borderRadius: 18 }}>
          <Caption>Kantor Tujuan</Caption>
          <DropDown
            placeholder={!data ? 'Loading...' : null}
            value={office}
            setValue={setOffice}
            list={!data ? [] : generateOfficeList()}
            visible={showOfficeDropdown}
            showDropDown={() => setShowOfficeDropdown(true)}
            onDismiss={() => setShowOfficeDropdown(false)}
            inputProps={{
              right: loading ? null : <TextInput.Icon name={"menu-down"} />,
            }}
          />
          <Caption>Layanan Tujuan</Caption>
          <DropDown
            value={destinationService}
            setValue={setDestinationService}
            list={destinationServices}
            visible={showDestinationServiceDropdown}
            showDropDown={() => setShowDestinationServiceDropdown(true)}
            onDismiss={() => setShowDestinationServiceDropdown(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
          />
          <Caption>Tujuan Kedatangan</Caption>
          <TextInput style={styles.textInput} value={reason} onChangeText={text => setReason(text)} />
          <Caption>Tanggal Kedatangan</Caption>
          <TouchableWithoutFeedback onPress={() => setShowDatepicker(true)}>
            <View>
              <TextInput
                style={{ height: 55, marginBottom: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ccc' }}
                value={date.toDateString()}
                editable={false}
              />
            </View>
          </TouchableWithoutFeedback>
          {showDatepicker && (
            <DateTimePicker
              value={date}
              mode="date"
              minimumDate={date}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatepicker(Platform.OS === 'ios');
                setDate(currentDate);
              }}
            />
          )}
          <Caption>Waktu Kedatangan</Caption>
          <DropDown
            value={attendanceTimeRange}
            setValue={setAttendanceTimeRange}
            list={generateTimeList()}
            visible={showAttendanceTimeRangeDropdown}
            showDropDown={() => setShowAttendanceTimeRangeDropdown(true)}
            onDismiss={() => setShowAttendanceTimeRangeDropdown(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
            style={{ ...styles.textInput }}
            />
          <Button mode="contained" onPress={() => onSubmitForm()} style={{ marginTop: 15, ...Color.primaryBackgroundColor, }}>Submit</Button>
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
    height: 55,
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
});

export default AttendanceReservationScreen;
