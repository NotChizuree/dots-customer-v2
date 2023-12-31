import React from "react";
import { Headline, Appbar, Subheading } from "react-native-paper";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import Lightbox from "react-native-lightbox-v2";

function BlogScreen({ route, navigation, navigator }) {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Text style={{ fontSize: 20, marginLeft: "20%", }}>{item.title}</Text>
      </Appbar.Header>
      <View style={styles.content}>
        <Lightbox navigator={navigator}>
          <Image
            style={{ width: "100%", height: 140, marginVertical: 10 }}
            source={{ uri: item.imageUrl }}
          />
        </Lightbox>
        {/* <Text>{item.description}</Text> */}
        <HTML source={{ html: item.description }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Ensure the content fills the entire available height
  },
  content: {
    padding: 20,
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
});

export default BlogScreen;
