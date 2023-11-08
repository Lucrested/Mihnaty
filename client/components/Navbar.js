import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet, Button, Icon } from "react-native-elements";

const Tab = createBottomTabNavigatoravigator();

const CustomTabIcon = ({ source, color, size }) => (
  <Image
    source={source}
    style={{ tintColor: color, width: size, height: size }}
  />
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false, // Hide tab labels
        }}
      >
        {[
          { name: "Home", icon: require() },
          { name: "Calendar", icon: require("/icons/calendar.png") },
          { name: "Search", icon: require("/icons/search.png") },
          { name: "AccountSettings", icon: require("/icons/account.png") },
        ].map((tab) => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            // component={tab.component} // Replace with the actual component for this tab
            options={{
              tabBarIcon: ({ color, size }) => (
                <CustomTabIcon source={tab.icon} color={color} size={size} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

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
