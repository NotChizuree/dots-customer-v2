import React from "react";
import { Headline, Appbar, Subheading } from "react-native-paper";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from 'react-native-render-html';

function BlogScreen({ route, navigation }) {
  const { item } = route.params;
  console.log(item);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Blogs" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={{ fontSize: 30, alignSelf: "center" }}>
          {item.title}
        </Text>
        <Image
          style={{ width: "100%", height: 140, marginVertical: 10 }}
          source={{ uri: item.imageUrl }}
        />
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
    padding: 20
  },
  appbarHeader: {
    elevation: 0,
    backgroundColor: "#F5F8FB",
  },
});

export default BlogScreen;
