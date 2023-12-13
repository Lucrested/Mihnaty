import React from "react";
import { StatusBar, Stack } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { COLORS, icons, images, SIZES, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/core";
import { supabase } from "../supabase";

const SectionListBasics = ({ route }) => {
  const { category } = route.params;
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();

  //POP up

  const Pop = ({
    ProviderID,
    modalVisible,
    setModalVisible,
    picture,
    rating,
    description,
    Pname,
  }) => {
    console.log("Description in Modal:", description);
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.shadow}>
                    <Image
                      source={{ uri: picture }} // Use the picture URL from props
                      resizeMode="cover"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      marginHorizontal: SIZES.radius,
                      justifyContent: "space-around",
                    }}
                  >
                    <Text style={{ ...FONTS.h3 }}>{Pname}</Text>

                    <StarReview rate={rating} />
                  </View>
                </View>

                <View style={{ marginTop: SIZES.radius }}>
                  <Text
                    style={{
                      color: COLORS.gray,
                      ...FONTS.body3,
                      marginBottom: 20,
                    }}
                  >
                    {description}
                             
                  </Text>
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleProviderPress(ProviderID)}
              >
                <Text style={styles.textStyle}>Select</Text>
              </Pressable>
              <Pressable
                style={styles.buttonX}
                onPress={() => handleClosePress(ProviderID)}
              >
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const [modalVisible, setModalVisible] = useState({});

  const handlePopPress = (ProviderID) => {
    setModalVisible({ ...modalVisible, [ProviderID]: true });
  };

  const handleClosePress = (ProviderID) => {
    setModalVisible({ ...modalVisible, [ProviderID]: false });
  };

  const handleProviderPress = (ProviderID) => {
    console.log("Second Provider id: ", ProviderID);
    setModalVisible({ ...modalVisible, [ProviderID]: false });
    navigation.navigate("Booking", { ProviderID });
  };

  //FETCHING DATA

  const fetchSections = async () => {
    try {
      const provListResponse = await fetch(
        "http://10.126.10.237:3000/api/providers"
      );
      console.log("Selected Category:", category);

      if (provListResponse.ok) {
        const providersData = await provListResponse.json();
        console.log("All Providers Data:", providersData);

        const filteredProviders = providersData.filter(
          (provider) => provider.Category === category.CategoryID
        );

        console.log("Filtered Providers:", filteredProviders);

        // Initialize modalVisible state for each provider
        setModalVisible(
          filteredProviders.reduce((acc, provider) => {
            acc[provider.ProviderID] = false;
            return acc;
          }, {})
        );

        // Fetch image URL and rating for each provider from Supabase
        const promises = filteredProviders.map(async (provider) => {
          const { data: imagesData, error: imagesError } = await supabase
            .from("provider-test")
            .select("pic_url")
            .eq("ProviderID", provider.ProviderID)
            .single();

          const { data: ratingsData, error: ratingsError } = await supabase
            .from("provider-test")
            .select("Rating")
            .eq("ProviderID", provider.ProviderID)
            .single();

          const { data: nameData, error: nameError } = await supabase
            .from("provider-test")
            .select("name")
            .eq("ProviderID", provider.ProviderID)
            .single();

          const { data: descriptionData, error: descriptionError } =
            await supabase
              .from("provider-test")
              .select("Description")
              .eq("ProviderID", provider.ProviderID)
              .single();

          return {
            ...provider,
            picture: imagesData?.pic_url || "",
            rating: ratingsData?.Rating || 0,
            Pname: nameData?.name || "",
            description: descriptionData?.Description || "", // Check for null
          };
        });

        // Wait for all promises to resolve
        const updatedProviders = await Promise.all(promises);

        // Update state with the fetched data
        setProviders(updatedProviders);
      } else {
        console.error(
          "Error fetching providers:",
          provListResponse.status,
          provListResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching providers:", error.message);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [category]);

  //RENDERING providers
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>By Ratings</Text>
        <SectionList
          sections={providers
            .sort((a, b) => b.Rating - a.Rating) // Sort providers by rating in descending order
            .reduce((acc, item) => {
              const existingSection = acc.find(
                (section) => section.title === `${item.Rating} ★`
              );

              if (existingSection) {
                existingSection.data.push(item);
              } else {
                acc.push({
                  title: `${item.Rating} ★`,
                  data: [item],
                });
              }

              return acc;
            }, [])} // Reverse the order of sections
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => handlePopPress(item.ProviderID)}>
                <View>
                  <Text style={styles.item}>{item.name}</Text>
                </View>
              </TouchableOpacity>
              {/* <View style={styles.separator} /> */}
              <Pop
                ProviderID={item.ProviderID}
                modalVisible={modalVisible[item.ProviderID]}
                setModalVisible={(value) =>
                  setModalVisible({ ...modalVisible, [item.ProviderID]: value })
                }
                picture={item.pic_url}
                rating={item.Rating}
                Pname={item.name}
                description={item.Description}
              />
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item) => `basicListEntry-${item.ProviderID}`}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

//STAR RATING CALCULATOR
const StarReview = ({ rate }) => {
  var starComponents = [];
  var fullStar = Math.floor(rate);
  var noStar = Math.floor(5 - rate);
  var halfStar = 5 - fullStar - noStar;

  // Full Star
  for (var i = 0; i < fullStar; i++) {
    starComponents.push(
      <Image
        key={`full-${i}`}
        source={icons.starFull}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
        }}
      />
    );
  }

  // Half Star
  for (var i = 0; i < halfStar; i++) {
    starComponents.push(
      <Image
        key={`half-${i}`}
        source={icons.starHalf}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
        }}
      />
    );
  }

  // No Star
  for (var i = 0; i < noStar; i++) {
    starComponents.push(
      <Image
        key={`empty-${i}`}
        source={icons.starEmpty}
        resizeMode="cover"
        style={{
          width: 20,
          height: 20,
        }}
      />
    );
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {starComponents}
      <Text
        style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}
      >
        {rate}
      </Text>
    </View>
  );
};

//provider image

const IconLabel = ({ icon, label }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text
        style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "lightgrey",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 40,
  },
  title: {
    fontSize: 20, // Change the font size for the title
    fontWeight: "bold",
    marginBottom: 10, // Adjust the value to add more space at the bottom
    marginTop: 10, // Adjust the value to add more space at the top
    lineHeight: 30,
    marginLeft: 10, // Adjust the value to move it to the right
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 40, // Increased margin
    backgroundColor: "white",
    borderRadius: 30, // Increased border radius
    padding: 30, // Increased padding
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Increased shadow offset height
    },
    shadowOpacity: 0.5, // Increased shadow opacity
    shadowRadius: 8, // Increased shadow radius
    elevation: 10, // Increased elevation
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonX: {
    borderRadius: 15, // Half of the width and height
    width: 30, // Set the width
    height: 30, // Set the height
    padding: 7,
    elevation: 2,
    position: "absolute",
    top: 10, // Adjust this value to set the distance from the top
    right: 10, // Adjust this value to set the distance from the right
    backgroundColor: "#B0B3B8",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc", // Grey color
    marginVertical: 10,
  },
});

export default SectionListBasics;
