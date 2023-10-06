import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../common/Color';

const MenuButton = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.buttonElement}>
        <Card {...props} style={{...styles.appCard, ...props.style}}>
          <Ionicons style={styles.buttonIcon} name={props.iconName} size={25} />
        </Card>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  appCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 12,
    marginLeft: 5,
    marginTop: 3,
    textAlign: 'center'
  },
  buttonIcon: {
    marginBottom: 15,
    color: Color.primaryBackgroundColor.backgroundColor,
    paddingTop: 19
  },
  buttonElement: {
    alignItems: 'center',
  },
});

export default MenuButton;
