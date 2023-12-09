import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const categoryResponse = await fetch(
        "http://10.121.46.79:3000/api/categories"
      );
      if (categoryResponse.ok) {
        console.log("entered ok");
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
    console.log(categories.toString());
  }, []);

  // return (
  //   <SafeAreaView>
  //     <SafeAreaView>
  //       {categories.map((category) => (
  //         <CategoryCard
  //           key={category.id}
  //           category={category}
  //           style={categoryList.item}
  //         />
  //       ))}
  //     </SafeAreaView>
  //   </SafeAreaView>
  //     <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
  //       <SafeAreaView
  //         style={{
  //           flexDirection: "row",
  //           marginTop: SIZES.padding,
  //           paddingHorizontal: SIZES.base,
  //         }}
  //       >
  //         {console.log("entered second safeareaview")}
  //         {categories &&
  //           categories.map((category) => (
  //             <CategoryCard key={category.id} category={category} />
  //           ))}
  //       </SafeAreaView>
  //     </SafeAreaView>
  //   );
  // };

  // const categoryList = StyleSheet.create({
  //   container: {
  //     flex: 1, // Fill the available space
  //     backgroundColor: "black", // Background color
  //     justifyContent: "center", // Center children vertically
  //     alignItems: "center", // Center children horizontally
  //     flexWrap: "wrap",
  //     flexDirection: "row",
  //     marginHorizontal: "auto",
  //     paddingVertical: "auto",
  //     width: 400,
  //   },
  //   item: {
  //     minWidth: 100,
  //     maxWidth: 100,
  //     margin: 10,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  // });

  const renderCategoryRow = ({ item }) => (
    <View style={categoryList.row}>
      {item.map((category) => (
        <CategoryCard
          key={category.CategoryID}
          category={category}
          style={categoryList.item}
        />
      ))}
    </View>
  );

  const groupedCategories = categories.reduce((result, category, index) => {
    const row = Math.floor(index / 3);
    if (!result[row]) {
      result[row] = [];
    }
    result[row].push(category);
    return result;
  }, []);

  return (
    <SafeAreaView style={categoryList.container}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={groupedCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCategoryRow}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const categoryList = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
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
