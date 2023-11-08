import React from "react";
import Navbar from "../components/Navbar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CategoryCard from "../components/CategoryCard";

const CategoryPage = () => {
  const [categories, setCategories] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView style={categoryList.container}>
        {categories.map((category) => {
          <CategoryCard key={category.id} category={category} />;
        })}
      </SafeAreaView>
      <Navbar />
    </SafeAreaView>
  );
};

const categoryList = StyleSheet.create({
  container: {},
});

export default CategoryPage;
