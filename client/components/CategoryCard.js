import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native-elements";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

// const CategoryCard = ({ category }) => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={[categoryStyles.cardContainer]}>
//       <TouchableOpacity
//         style={categoryStyles.touchable}
//         onPress={() => navigation.navigate("Available Providers")}
//       >
//         <Image
//           style={categoryStyles.categoryImage}
//           source={{ uri: category.categoryURL }}
//         />
//         <Text style={categoryStyles.categoryName}>{category.categoryName}</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

const CategoryCard = ({ category, bgColor, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onPress={onPress}
    >
      <SafeAreaView style={[styles.shadow, { width: 60, height: 60 }]}>
        <LinearGradient
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              backgroundColor: "red",
            },
          ]}
          colors={bgColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image
            source={{ uri: category.categoryURL }} //Need to change the icons
            resizeMode="cover"
            style={{
              tintColor: COLORS.white,
              width: 30,
              height: 30,
            }}
          />
        </LinearGradient>
      </SafeAreaView>
      <Text
      // style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}
      >
        {category.categoryName}
      </Text>
    </TouchableOpacity>
  );
};

// const categoryStyles = StyleSheet.create({
//   cardContainer: {
//     borderRadius: 10,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//     padding: 10,
//     margin: 10,
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   categoryImage: {
//     width: 100, // Set the desired width for your image
//     height: 100, // Set the desired height for your image
//     borderRadius: 50, // To make it circular, adjust as needed
//   },
//   categoryName: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   touchable: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default CategoryCard;
