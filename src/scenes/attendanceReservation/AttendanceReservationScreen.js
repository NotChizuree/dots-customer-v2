import React, { useState, useEffect, useContext } from "react";
import DropDown from "react-native-paper-dropdown";
import { useToast } from "react-native-paper-toast";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { StackActions } from "@react-navigation/native";
import { findAllOffices } from "../../api/OfficeApi";
// import { FindAllOffices } from '../../query/CompanyQueZry';
import { View, StyleSheet, ScrollView } from "react-native";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, Appbar, Caption, Button } from "react-native-paper";
// import { CreateAttendanceReservation } from "../../query/AttendanceReservationQuery";
import { AuthContext } from "../../providers/AuthenticationProvider";
import createReservation from "../../api/ReservationApi";
import { createReservationRest } from "../../api/ReservationApi";

const AttendanceReservationScreen = ({ navigation }) => {
  // TODO: get office operational hours from reducer
  const operationalHourStartInt = 9;
  const operationalHourEndInt = 15;

  const toaster = useToast();

  const [showDestinationServiceDropdown, setShowDestinationServiceDropdown] =
    useState(false);
  const [destinationService, setDestinationService] = useState(null);

  const destinationServices = [
    { label: "Teller", value: "1" },
    { label: "Customer Service", value: "2" },
  ];

  const [showDropDownService, setshowDropDownService] = useState(false);
  const [Service, setService] = useState(null);
  const dataService = [
    {
      label: "Keluhan",
      value: "Keluhan",
    },
    {
      label: "Pembayaran",
      value: "Pembayaran",
    },
  ];

  const [reason, setReason] = useState(null);

  const currentLocalTime = new Date();
  const intTime =
    currentLocalTime.getHours() + currentLocalTime.getMinutes() / 60;

  const [showOfficeDropdown, setShowOfficeDropdown] = useState(false);
  const [office, setOffice] = useState(null);

  const [showDatepicker, setShowDatepicker] = useState(false);
  const [date, setDate] = useState(
    intTime < operationalHourEndInt
      ? currentLocalTime
      : new Date(currentLocalTime.getTime() + 86400000)
  );

  const openDatePicker = () => {
    setShowDatepicker(true);
  };

  // const { loading, error, data } = useQuery(FindAllOffices);
  // const { loading, error, data } =
  const [officesData, setOfficeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const fetchData = async () => {
    try {
      setLoading(true);
      findAllOffices(token).then((result) => {
        setOfficeData(result.data.data);
      });
    } catch (error) {
      console.error("Error fetching offices: ", error);
      setError(error);
      setLoading(false);
      toaster.show({ message: "Gagal mendapatkan data kantor" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    toaster.show({ message: "Gagal mendapatkan data kantor" });
  }

  const generateOfficeList = () => {
    let res = [];
    officesData.map((value, _) => {
      res.push({ label: value.name, value: value.id });
    });
    return res;
  };

  const intTimeToReadableTime = (i) => {
    if (parseInt(i) == i) {
      return i + ".00 - " + i + ".30";
    } else {
      const hour = i - 0.5;
      const nextHour = hour + 1;
      return hour + ".30 - " + nextHour + ".00";
    }
  };

  const [showAttendanceTimeRangeDropdown, setShowAttendanceTimeRangeDropdown] =
    useState(false);
  const [attendanceTimeRange, setAttendanceTimeRange] = useState(null);
  const generateTimeList = [
    {
      label: "08:00 - 09:00",
      value: "0800-0900",
    },
    {
      label: "09:00 - 10:00",
      value: "0900-1000",
    },
    {
      label: "10:00 - 11:00",
      value: "1000-1100",
    },
    {
      label: "11:00 - 12:00",
      value: "1100-1200",
    },
    {
      label: "12:00 - 01:00",
      value: "1200-0100",
    },
    {
      label: "01:00 - 02:00",
      value: "0100-0200",
    },
    {
      label: "02:00 - 03:00",
      value: "0200-0300",
    },
    {
      label: "03:00 - 04:00",
      value: "0300-0400",
    },
  ];

  const attendAtStartToStr = (type) => {
    const parsedHour = parseInt(attendanceTimeRange);
    const parsedMinute = Number(attendanceTimeRange) - parsedHour;
    const attendAtDate = new Date(date);

    const res = new Date(attendAtDate.setHours(parsedHour)).setMinutes(
      parsedMinute * 60
    );

    if (type === "START") {
      const newDate = new Date(res).setSeconds(0);
      return new Date(newDate).toISOString();
    } else {
      const newDate = new Date(res + 30 * 60000).setSeconds(0);
      return new Date(newDate).toISOString();
    }
  };

  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);
  const onSubmitForm = () => {
    if (!mutationLoading) {
      if (!office) {
        Alert.alert("Error", "Kantor Tujuan is required");
      } else if (!destinationService) {
        Alert.alert("Error", "Layanan Tujuan is required");
      } else if (!Service) {
        Alert.alert("Error", "Tujuan Kedatangan is required");
      } else if (!attendanceTimeRange) {
        Alert.alert("Error", "Waktu Kedatangan is required");
      } else {
        setMutationLoading(true);
        const clock = attendanceTimeRange.split("-");
        const jam1 = `${Math.floor(clock[0] / 100)}:${clock[0] % 100}`;
        const jam2 = `${Math.floor(clock[1] / 100)}:${clock[1] % 100}`;
        const tanggalDanJam1 = new Date(date);
        tanggalDanJam1.setHours(Math.floor(clock[0] / 100));
        tanggalDanJam1.setMinutes(clock[0] % 100);
        const tanggalDanJam2 = new Date(date);
        tanggalDanJam2.setHours(Math.floor(clock[1] / 100));
        tanggalDanJam2.setMinutes(clock[1] % 100);
        const timestamp1 = tanggalDanJam1;
        const timestamp2 = tanggalDanJam2;

        createReservationRest(
          token,
          {
            branchId: office,
            destinationService: destinationService,
            reason: Service,
            attendAtStart: timestamp1,
            attendAtEnd: timestamp2,
            time: clock,
          },
          setMutationLoading, 
          setMutationError
        )
          .then((res) => {
            setMutationLoading(false);
            navigation.navigate("Home");
            Alert.alert(
              "Sukses",
              "Berhasil Mengajukan Reservasi. Silahkan cek notifikasi secara berkala"
            );
          })
          .catch((err) => {
            Alert.alert("Error", "Failed to create reservation");
          });
      }
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
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 18,
          }}
        >
          <Caption>Kantor Tujuan</Caption>
          <DropDown
            style={{ backgroundColor: "white" }}
            placeholder={!officesData.length ? "Loading..." : null}
            mode={"outlined"}
            value={office}
            setValue={setOffice}
            list={
              officesData && officesData.length > 0
                ? officesData.map((index) => ({
                    label: index.name,
                    value: index.id,
                  }))
                : []
            }
            visible={showOfficeDropdown}
            showDropDown={() => setShowOfficeDropdown(true)}
            onDismiss={() => setShowOfficeDropdown(false)}
            inputProps={{
              right: loading ? null : <TextInput.Icon name={"menu-down"} />,
            }}
          />
          <Caption>Layanan Tujuan</Caption>
          <DropDown
            style={{ backgroundColor: "white" }}
            mode={"outlined"}
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
          <DropDown
            style={{ backgroundColor: "white" }}
            mode={"outlined"}
            visible={showDropDownService}
            showDropDown={() => setshowDropDownService(true)}
            onDismiss={() => setshowDropDownService(false)}
            value={Service}
            setValue={setService}
            list={dataService}
          />
          <Caption>Tanggal Kedatangan</Caption>
          <TouchableWithoutFeedback onPress={() => setShowDatepicker(true)}>
            <View>
              <TextInput
                style={{
                  height: 55,
                  marginBottom: 5,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                }}
                mode="outlined"
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
                setShowDatepicker(Platform.OS === "ios");
                setDate(currentDate);
              }}
            />
          )}
          <Caption>Waktu Kedatangan</Caption>
          <DropDown
            style={{ backgroundColor: "white" }}
            mode={"outlined"}
            value={attendanceTimeRange}
            setValue={setAttendanceTimeRange}
            list={generateTimeList}
            visible={showAttendanceTimeRangeDropdown}
            showDropDown={() => setShowAttendanceTimeRangeDropdown(true)}
            onDismiss={() => setShowAttendanceTimeRangeDropdown(false)}
            inputProps={{
              right: <TextInput.Icon name={"menu-down"} />,
            }}
          />
          <Button
            mode="contained"
            onPress={() => onSubmitForm()}
            style={{ marginTop: 20, ...Color.primaryBackgroundColor }}
            disabled={mutationLoading}
            loading={mutationLoading}
          >
            {mutationLoading ? "Mengirim..." : "Submit"}
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flex: 1,
  },
  heading: {
    marginTop: "10%",
    marginBottom: "4%",
    fontSize: 30,
    marginLeft: "5%",
    paddingBottom: "2%",
    color: "white",
  },
  settingMenuButton: {
    backgroundColor: "white",
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
  textInput: {
    height: 55,
    marginBottom: 5,
  },
});

export default AttendanceReservationScreen;
