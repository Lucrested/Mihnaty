import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native-elements";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const CategoryCard = ({ category }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[categoryStyles.cardContainer]}>
      <TouchableOpacity
        style={categoryStyles.touchable}
        onPress={() => navigation.navigate("Available Providers")}
      >
        <Image
          style={categoryStyles.categoryImage}
          source={{ uri: category.CategoryURL }}
        />
        <Text style={categoryStyles.categoryName}>{category.CategoryName}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// const CategoryCard = ({ category }) => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={(styles.shadow, styles.button)}>
//       <TouchableOpacity
//         style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//       >
//         <SafeAreaView>
//           <Image
//             source={{ uri: category.categoryURL }} //Need to change the icons
//             resizeMode="cover"
//             style={{
//               width: 60,
//               height: 60,
//             }}
//           />
//           <Text
//           // style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}
//           >
//             {category.categoryName}
//           </Text>
//         </SafeAreaView>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

const categoryStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    margin: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  categoryImage: {
    width: 100, // Set the desired width for your image
    height: 100, // Set the desired height for your image
    borderRadius: 50, // To make it circular, adjust as needed
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
  },
});

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
  button: {
    width: 60,
    height: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default CategoryCard;
