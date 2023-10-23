import React from 'react'; 
import { Headline, Appbar, Subheading } from "react-native-paper";
import { View, Text, Image, StyleSheet } from 'react-native';

function BlogScreen({ route }) {
  const { item } = route.params;

  return (
    <View>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Blogs" />
      </Appbar.Header>
      <Text style={{ fontSize: 20, alignSelf: "center", margin: 10, }}>{item.title}</Text>
      <Image
        style={{ width: "100%", height: 140 }}
        source={{ uri: item.imageUrl }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    appbarHeader: {
        elevation: 0,
        backgroundColor: "#F5F8FB",
      },
});

export default BlogScreen;
