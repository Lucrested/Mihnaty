import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import CategoryCard from "../components/CategoryCard";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const categoryResponse = await fetch(
        "http://10.121.46.79:3000/api/categories"
      );
      if (categoryResponse.ok) {
        const data = await categoryResponse.json();
        setCategories(data);
      } else {
        console.error("Error fetching categories");
      }
      const categoriesData = await categoryResponse.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
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
