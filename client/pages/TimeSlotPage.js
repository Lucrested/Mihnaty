import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const DATA = [
  {
    id: "1",
    title: "1:00pm - 2:00pm",
  },
  {
    id: "2",
    title: "3:00pm - 4:00pm",
  },
  {
    id: "3",
    title: "5:00pm - 6:00pm",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.times}>{title}</Text>
  </View>
);

export const BookL = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Open Booking Slots</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#1d3557",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  times: {
    fontSize: 32,
    textAlign: "center", // Center the text horizontally
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20, // Change the font size for the title
    fontWeight: "bold",
    marginTop: 10,
    lineHeight: 20,
    textAlign: "center",
  },
});

export default BookL;
