import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet, Button, Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

// const Tab = createBottomTabNavigator();

// const Navbar = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName="CategoryPage"
//         tabBarOptions={{
//           showLabel: false, // Hide tab labels
//         }}
//       >
//         {[
//           { name: "CategoryPage", icon: "home" },
//           { name: "Calendar", icon: "calendar" },
//           { name: "Search", icon: "search1" },
//           { name: "AccountSettings", icon: "profile" },
//         ].map((tab) => (
//           <Tab.Screen
//             key={tab.name}
//             name={tab.name}
//             options={{
//               tabBarIcon: ({ color, size }) => (
//                 <AntDesign name={tab.icon} size={size} color={color} />
//               ),
//             }}
//           />
//         ))}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

const Navbar = () => {
  return (
    <View style={navBarStyles.container}>
      {[
        { name: "Home", icon: "home" },
        { name: "Calendar", icon: "calendar" },
        { name: "Search", icon: "search1" },
        { name: "AccountSettings", icon: "profile" },
      ].map((tab) => (
        <TouchableOpacity key={tab.name} style={navBarStyles.tab}>
          <AntDesign name={tab.icon} size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const navBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tab: {
    padding: 10,
  },
});

export default Navbar;

// const navBarStyles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     bottom: 25,
//     right: 0,
//     left: 0,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     // flex: 1,
//     // justifyContent: "space-between",
//     display: "inline",
//   },
//   Button: {
//     padding: 10,
//     borderRadius: 5,
//     width: 100,
//     backgroundColor: "rgb(255,53,33)",
//   },
//   ButtonText: {
//     alignItems: "center",
//     padding: 10,
//   },
// });
