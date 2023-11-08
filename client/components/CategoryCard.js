import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native-elements";

const CategoryCard = ({ category }) => {
  return (
    <SafeAreaView style={[categoryStyles.cardContainer]}>
      <TouchableOpacity style={categoryStyles.touchable}>
        <Image
          style={categoryStyles.categoryImage}
          source={category.imageURL}
        />
        <Text style={categoryStyles.categoryName}>{category.categoryName}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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

export default CategoryCard;
