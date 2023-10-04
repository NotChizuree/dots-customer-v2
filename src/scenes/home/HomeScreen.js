import React, {useContext, useState} from 'react';
import {StyleSheet, ScrollView, View, Image, Dimensions, Text, Alert} from 'react-native';
import {Headline, Appbar, Subheading} from 'react-native-paper';
import MenuButton from '../../components/common/MenuButton';
import {AuthContext} from '../../providers/AuthenticationProvider';
import {FlatGrid} from 'react-native-super-grid';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Color from '../../common/Color';

const HomeScreen = ({navigation}) => {
  const {user, currentTenant} = useContext(AuthContext);
  
  // TODO: get menus from reducer
  const menus = [
    {
      id: 1,
      title: 'Top-up',
      icon: 'wallet-outline',
      onPress: () => {
        // Cek akses di sini jika diperlukan
        if (user.hasTopUpAccess) {
          navigation.navigate('CustomerList');
        } else {
          Alert.alert('Akses Ditolak', 'Anda tidak memiliki akses untuk Top-up.');
        }
      },
    },
    {
      id: 2,
      title: 'Beli - Bayar',
      icon: 'receipt-outline',
      onPress: () => {
        // Cek akses di sini jika diperlukan
        if (user.hasPurchaseAccess) {
          navigation.navigate('CustomerList');
        } else {
          Alert.alert('Akses Ditolak', 'Anda tidak memiliki akses untuk Beli - Bayar.');
        }
      },
    },
    {
      id: 3,
      title: 'Transfer',
      icon: 'cash-outline',
      onPress: () => {
        // Cek akses di sini jika diperlukan
        if (user.hasTransferAccess) {
          navigation.navigate('CustomerList');
        } else {
          Alert.alert('Akses Ditolak', 'Anda tidak memiliki akses untuk Transfer.');
        }
      },
    },
    {
      id: 4,
      title: 'Reservasi Kedatangan',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('AttendanceReservation'),
    },

    // {
    //   id: 5,
    //   title: 'Catatan Keuangan',
    //   icon: 'book-outline',
    //   onPress: () => navigation.navigate('CustomerList'),
    // },
    // {
    //   id: 6,
    //   title: 'Lainnya',
    //   icon: 'grid-outline',
    //   onPress: () => navigation.navigate('CustomerList'),
    // },
  ];

  const carouselEntries = [
    {'title': "Test 1", 'imageUrl': 'https://kreasinusantara-dots-test.s3.ap-southeast-1.amazonaws.com/dots-mobile/carousel-1.png'}, 
    {'title': "Test 2", 'imageUrl': 'https://kreasinusantara-dots-test.s3.ap-southeast-1.amazonaws.com/dots-mobile/carousel-2.png'}, 
    {'title': "Test 3", 'imageUrl': 'https://kreasinusantara-dots-test.s3.ap-southeast-1.amazonaws.com/dots-mobile/carousel-3.png'}
  ];

  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1.0)

  const [currentSlide, setCurrentSlide] = useState({ activeSlide: 0 });

  const renderCarouselItem = ({item, index}) => {
    return (
      <View style={{alignSelf: 'center'}}>
        <Image style={{width: ITEM_WIDTH, height: 140}} source={{uri: item.imageUrl}} />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header style={Color.primaryBackgroundColor}>
        <Appbar.Content
          style={styles.appbarContent}
          title={currentTenant.name}
          titleStyle={{ color: '#EAEBF8' }} 
        />
      </Appbar.Header>
      <ScrollView>
        <View style={Color.primaryBackgroundColor}>
          <Headline adjustFontSizeToFit style={styles.heading}>
            Selamat Datang
          </Headline>
          <Subheading adjustFontSizeToFit style={styles.subheading}>
            {user.firstName} {user.lastName}
          </Subheading>
        </View>
        <View style={{marginTop: 15}}>
          <Carousel
                layout='default'
                data={carouselEntries}
                renderItem={renderCarouselItem}
                sliderWidth={ITEM_WIDTH}
                useScrollView={true}
                onSnapToItem={(index) => setCurrentSlide({ activeSlide: index }) }
                itemWidth={ITEM_WIDTH}
                loop={true}
                autoplayDelay={5}
                autoplayInterval={5}
              />
          <Pagination
            dotsLength={carouselEntries.length}
            activeDotIndex={currentSlide}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 6,
                backgroundColor: 'black'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}  
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View>
          <FlatGrid
            data={menus}
            keyExtractor={(item, index) => index}
            itemDimension={80}
            renderItem={({item}) => (
              <View style={styles.buttonRow}>
                <MenuButton
                  style={styles.menuButton}
                  iconName={item.icon}
                  title={item.title}
                  numColumns={2}
                  onPress={item.onPress}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F8FB',
    flex: 1,
  },
  heading: {
    marginLeft: '5%',
    marginTop: '5%',
    fontSize: 25,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subheading: {
    marginLeft: '5%',
    marginTop: '1%',
    color: '#EFF0F5',
    marginBottom: '5%',
    fontSize: 18,
  },
  menuTitle: {
    marginLeft: '5%',
    marginTop: '8%',
    marginBottom: '4%',
    fontSize: 27,
  },
  date: {
    marginLeft: '5%',
    marginTop: '1.5%',
    fontSize: 18,
  },
  headingBlock: {
    backgroundColor: '#0E47A0',
  },
  activityCountCardRipple: {
    marginLeft: '5%',
    marginTop: 20,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#EAEBF8',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    marginTop: 10,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: '#0E47A0',
  },
  appbarContent: {
    // alignItems: 'center',
  },
});

export default HomeScreen;
