import { StatusBar, Stack } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";

export const TopBar = ({}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={icons.leftIcon} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.title}></Text>
        <Image
          source={icons.settings}
          style={styles.Sicon}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#245501",
  },
  title: {
    fontSize: 20, // Change the font size for the title
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    width: 30, // Change the width and height for the images
    height: 30,
  },
  Sicon: {
    width: 40, // Change the width and height for the images
    height: 40,
  },
});
