import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SectionListBasics from "./pages/provList";
import { TopBar } from "./components/topbar";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {/* <TopBar /> */}
        <Stack.Navigator
          initialRouteName={"Categories"}
          screenOptions={{ headerStyle: { backgroundColor: "green" } }}
        >
          <Stack.Screen name="Categories" component={CategoryPage} />
          <Stack.Screen name="ProvList" component={SectionListBasics} />
        </Stack.Navigator>
        <Navbar />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
  },
  item: {
    // backgroundColor: "black",
  },
});
