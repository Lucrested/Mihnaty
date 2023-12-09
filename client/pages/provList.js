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
import {supabase} from "../supabase"

const SectionListBasics = () => {
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();

  //POP up

  const Pop = ({ ProviderID, modalVisible, setModalVisible, picture, rating }) => {
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
                    <Text style={{ ...FONTS.h3 }}>Provider Name</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                      Category
                    </Text>
  
                    <StarReview rate={rating} />
                  </View>
                </View>
  
                <View style={{ marginTop: SIZES.radius }}>
                  <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                    More info and description if needed
                  </Text>
                </View>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleProviderPress(ProviderID)}
              >
                <Text style={styles.textStyle}>Select </Text>
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

  const handleProviderPress = () => {
    console.log("Second Provider id: ", ProviderID);
    setModalVisible({ ...modalVisible, [ProviderID]: false });
    navigation.navigate("Booking", { ProviderID });
  };

  //FETCHING DATA

  const fetchSections = async () => {
    try {
      const provListResponse = await fetch(
        "http://10.121.19.142:3000/api/providers"
      );

      if (provListResponse.ok) {
        const providersData = await provListResponse.json();

        // Initialize modalVisible state for each provider
        setModalVisible(
          providersData.reduce((acc, provider) => {
            acc[provider.ProviderID] = false;
            return acc;
          }, {})
        );

        // Fetch image URL and rating for each provider from Supabase
        const promises = providersData.map(async (provider) => {
          const { data: imagesData, error: imagesError } = await supabase
            .from('provider-test')
            .select('pic_url')
            .eq('ProviderID', provider.ProviderID)
            .single();

          const { data: ratingsData, error: ratingsError } = await supabase
            .from('provider-test')
            .select('Rating')
            .eq('ProviderID', provider.ProviderID)
            .single();

          return {
            ...provider,
            picture: imagesData?.pic_url || '',
            rating: ratingsData?.Rating || 0,
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
  }, []);

  //RENDERING providers
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Ratings</Text>
        <SectionList
          sections={providers.reduce((acc, item) => {
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
          }, [])}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => handlePopPress(item.ProviderID)}>
                <View>
                  <Text style={styles.item}>{item.name}</Text>
                </View>
              </TouchableOpacity>
              <Pop
                ProviderID={item.ProviderID}
                modalVisible={modalVisible[item.ProviderID]}
                setModalVisible={(value) =>
                  setModalVisible({ ...modalVisible, [item.ProviderID]: value })
                }
                picture={item.pic_url} // Pass the picture URL from the fetched data
                rating={item.Rating}   // Pass the rating from the fetched data
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
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 40,
  },
  title: {
    fontSize: 20, // Change the font size for the title
    fontWeight: "bold",
    marginBottom: 5,
    lineHeight: 30,
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
});

export default SectionListBasics;
