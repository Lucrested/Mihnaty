import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import CategoryCard from "../components/CategoryCard";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  // const getCategories = async () => {
  //   try {
  //     const categoriesResponse = await fetch(
  //       "http://10.121.46.79:3000/api/categories"
  //     );
  //     const categoriesData = await categoriesResponse.json();
  //     setCategories(categoriesData);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const hardCodedCategories = [
    {
      id: 1,
      categoryName: "Cleaning",
      imageURL:
        "https://img.freepik.com/free-vector/pack-surface-cleaning-products_23-2148534089.jpg",
    },
    { id: 2, categoryName: "Plumbing", imageURL: "fadfqwef" },
    { id: 3, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 4, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 5, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 6, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 7, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 8, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 9, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 10, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 11, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 12, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 13, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 14, categoryName: "Tutoring", imageURL: "adfqefqa" },
    { id: 15, categoryName: "Tutoring", imageURL: "adfqefqa" },
  ];

  useEffect(() => {
    setCategories(hardCodedCategories);
  }, []);

  return (
    <SafeAreaView>
      <SafeAreaView style={categoryList.container}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            style={categoryList.item}
          />
        ))}
      </SafeAreaView>
      <Navbar />
    </SafeAreaView>
  );
};

const categoryList = StyleSheet.create({
  container: {
    flex: 1, // Fill the available space
    backgroundColor: "gray", // Background color
    justifyContent: "center", // Center children vertically
    alignItems: "center", // Center children horizontally
    flexWrap: "wrap",
    flexDirection: "row",
    marginHorizontal: "auto",
    width: 400,
    marginVertical: 10,
  },
  item: {
    minWidth: 100,
    maxWidth: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryPage;
