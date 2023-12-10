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
        onPress={() =>
          navigation.navigate("Available Providers", {
            category: category,  // Pass the selected category
          })
        }
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



const categoryStyles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    width: 150, // Set a fixed width for the container
  },
  touchable: {
    borderRadius: 15,
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});


export default CategoryCard;
