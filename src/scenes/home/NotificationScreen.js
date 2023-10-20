import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Headline, Card, Divider } from "react-native-paper";
import { AuthContext } from "../../providers/AuthenticationProvider";
import Color from "../../common/Color";
import { findAllNotificationByToken } from "../../api/NotificationApi";
import LoadingOverlay from "../../components/common/LoadingOverlay";

const NotificationScreen = () => {
  const { logout } = useContext(AuthContext);
  const [pressedNotifications, setPressedNotifications] = useState([]);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      findAllNotificationByToken(token).then((result) => {
        const apiData = result.data.data;
        setData(apiData);
        setRefreshing(false);
        console.log(apiData);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalVisible1(false);
    setIsModalVisible2(false);
  };

  const isNotificationPressed = (notificationId) => {
    return pressedNotifications.includes(notificationId);
  };

  const toggleNotificationPress = (notification) => {
    console.log(notification.type);
    if (
      notification.type === 1 ||
      notification.type === 2 ||
      notification.type === 3
    ) {
      setIsModalVisible1(true);
    } else if (
      notification.type === 4 ||
      notification.type === 5 ||
      notification.type === 6
    ) {
      setIsModalVisible2(true);
    } else {
      return null;
    }

    // setPressedNotifications((prevState) =>
    //   isNotificationPressed(notification.id)
    //     ? prevState.filter((id) => id !== notification.id)
    //     : [...prevState, notification.id]
    // );
  };
  console.log(isModalVisible1);
  console.log(isModalVisible2);
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <View style={styles.screen}>
      <View style={Color.primaryBackgroundColor}>
        <Headline style={styles.heading}>Notifikasi</Headline>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Card>
          {data && data.length > 0 ? (
            data.map((notification) => (
              <React.Fragment key={notification.id}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Notifikasi diklik:", notification.title);
                    toggleNotificationPress(notification);
                  }}
                >
                  <Card.Content
                    style={[
                      styles.notificationItem,
                      {
                        backgroundColor: isNotificationPressed(notification.id)
                          ? "#F1EFEF"
                          : "transparent",
                      },
                    ]}
                  >
                    <View style={styles.titleContainer}>
                      <Text style={styles.notificationTitle}>
                        {notification.title}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.circleButton,
                        {
                          backgroundColor: isNotificationPressed(
                            notification.id
                          )
                            ? "white"
                            : "blue",
                        },
                      ]}
                    >
                      <View style={styles.circle} />
                    </View>
                    <Text style={styles.dateItem}>
                      {formatDateString(notification.created_at)}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            // <Card.Content>
            <>             
             <LoadingOverlay />
            </>
            // </Card.Content> 
          )}
        </Card>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible1}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Ini adalah Modal 1</Text>
              <Button title="Tutup" onPress={toggleModal} />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible2}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Ini adalah Modal 2</Text>
              <Button title="Tutup" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </ScrollView>
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
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    position: "relative",
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
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
    width: "80%",
    height: "50%",
    backgroundColor: "white",
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
  },
  dateItem: {
    position: "absolute",
    bottom: 0,
    right: 10,
    color: "grey",
  },
  notificationTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default NotificationScreen;
