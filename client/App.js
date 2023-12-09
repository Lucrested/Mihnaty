import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SectionListBasics from "./pages/provList";
import { TopBar } from "./components/topbar";
import TimeSlotPage from "./pages/TimeSlotPage";
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
          screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: styles.headerTitle.color,
            headerBackTitleStyle: styles.backTitle, // Style for the back button text
            headerBackTitle: " ", // Custom text for the back button
          }}
        >
          <Stack.Screen name="Categories" component={CategoryPage} />
          <Stack.Screen
            name="Available Providers"
            component={SectionListBasics}
          />
          <Stack.Screen name="Booking" component={TimeSlotPage} />
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
  header: {
    backgroundColor: "#245501",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
  },
  backTitle: {
    color: "transparent", // Customize the color of the back button text
  },
});
