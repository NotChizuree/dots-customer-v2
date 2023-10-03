import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, List, Divider } from 'react-native-paper';
import { AuthContext } from '../../providers/AuthenticationProvider';
import Color from '../../common/Color';

const NotificationScreen = () => {
  const { logout } = useContext(AuthContext);

  // Contoh data notifikasi, Anda dapat menggantinya dengan data sebenarnya
  const notifications = [
    { id: 1, title: 'Notifikasi 1', description: 'Deskripsi notifikasi 1' },
    { id: 2, title: 'Notifikasi 2', description: 'Deskripsi notifikasi 2' },
    // ... tambahkan notifikasi lainnya
  ];

  return (
    <View style={styles.screen}>
      <View style={Color.primaryBackgroundColor}>
        <Headline style={styles.heading}>Notifikasi</Headline>
      </View>

      <List.Section>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <List.Item
              title={notification.title}
              description={notification.description}
              onPress={() => {
                // Tambahkan logika yang sesuai ketika notifikasi diklik
                console.log('Notifikasi diklik:', notification.title);
              }}
            />
            <Divider />
          </React.Fragment>
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flex: 1,
  },
  heading: {
    marginTop: '15%',
    fontSize: 30,
    marginLeft: '5%',
    paddingBottom: '2%',
    color: 'white',
  },
  settingMenuButton: {
    backgroundColor: 'white',
  },
});

export default NotificationScreen;
