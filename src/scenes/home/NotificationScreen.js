import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Button,
} from "react-native";
import { Headline, List, Divider } from "react-native-paper";
import { AuthContext } from "../../providers/AuthenticationProvider";
import Color from "../../common/Color";

const NotificationScreen = () => {
  const { logout } = useContext(AuthContext);
  const [pressedNotifications, setPressedNotifications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Notifikasi 1",
      description: "Deskripsi notifikasi 1",
      date: "21-04-06",
    },
    {
      id: 2,
      title: "Notifikasi 2",
      description: "Deskripsi notifikasi 2",
      date: "21-04-06",
    },
  ];

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const isNotificationPressed = (notificationId) => {
    return pressedNotifications.includes(notificationId);
  };

  const toggleNotificationPress = (notificationId) => {
    setPressedNotifications((prevState) =>
      isNotificationPressed(notificationId)
        ? prevState.filter((id) => id !== notificationId)
        : [...prevState, notificationId]
    );
  };  

  return (
    <View style={styles.screen}>
      <View style={Color.primaryBackgroundColor}>
        <Headline style={styles.heading}>Notifikasi</Headline>
      </View>

      <List.Section>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <TouchableOpacity
              onPress={() => {
                console.log("Notifikasi diklik:", notification.title);
                toggleNotificationPress(notification.id);
                toggleModal();
              }}
            >
              <View
                style={[
                  styles.notificationItem,
                  {
                    backgroundColor: isNotificationPressed(notification.id)
                      ? "#F1EFEF"
                      : "transparent",
                  },
                ]}
              >
                <List.Item
                  title={notification.title}
                  description={notification.description}     
                />
                <View
                  style={[
                    styles.circleButton,
                    {
                      backgroundColor: isNotificationPressed(notification.id)
                        ? "white"
                        : "blue",
                    },
                  ]}
                >
                  <View style={styles.circle} />
                </View>
                <Text style={styles.dateItem}>{notification.date}</Text>

              </View> 
              
            </TouchableOpacity>
            <Divider />
          </React.Fragment>
        ))}
      </List.Section>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Isi konten modal Anda di sini.</Text>
          <Button title="Tutup" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F8FB",
    flex: 1,
  },
  heading: {
    marginTop: "15%",
    fontSize: 30,
    marginLeft: "5%",
    paddingBottom: "2%",
    color: "white",
  },
  settingMenuButton: {
    backgroundColor: "white",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    position: "relative",
    paddingVertical: 10,
  },
  circleButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.2,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "black",
  },dateItem:{
    top:25,
    color:'grey',
  }
  
});

export default NotificationScreen;