import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet, Button } from "react-native-elements";

const onTabPress = () => {};

export default function Navbar() {
  return (
    <View style={navBarStyles.container}>
      <TouchableOpacity onPress={() => onTabPress(0)}>
        <Text>edgihwugb</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress(1)}>
        <Text>edgihwugb</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress(2)}>
        <Text>edgihwugb</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={navBarStyles.Button}
        onPress={() => onTabPress(4)}
      ></TouchableOpacity>
    </View>
  );
}

const navBarStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // flex: 1,
    // justifyContent: "space-between",
    display: "inline",
  },
  Button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    backgroundColor: "rgb(255,53,33)",
  },
  ButtonText: {
    alignItems: "center",
    padding: 10,
  },
});
