import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const CategoryCard = ({ category }) => {
  return (
    <SafeAreaView style={categoryStyles.cardContainer}>
      <image
        style={categoryStyles.categoryImage}
        source={{ uri: category.imageURL }}
      />
      <Text style={categoryStyles.categoryName}>{category.categoryName}</Text>
    </SafeAreaView>
  );
};

const categoryStyles = StyleSheetSheet.create({
  cardContainer: {
    backgroundColor: "gray",
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
});

export default CategoryCard;
