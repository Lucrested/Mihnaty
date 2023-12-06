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
} from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/core";

// const SectionListBasics = () => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <Text style={styles.title}>Ratings</Text>
//         <SectionList
//           sections={[
//             { title: '5 ★', data: ['Alae', 'Sara'] },
//             { title: '4 ★', data: ['Hamid'] },
//             { title: '3 ★', data: ['Sami', 'Hussam', 'Azziz'] },
//             { title: '2 ★', data: ['Badr'] },
//             { title: '1 ★', data: ['Salim', 'Omar'] },
//           ]}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
//               <View>
//                 <Text style={styles.item}>{item}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           renderSectionHeader={({ section }) => (
//             <Text style={styles.sectionHeader}>{section.title}</Text>
//           )}
//           keyExtractor={(item) => `basicListEntry-${item}`}
//         />
//       </ScrollView>

//     </SafeAreaView>
//   );
// };

const SectionListBasics = () => {
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();

  const fetchSections = async () => {
    try {
      const provListResponse = await fetch(
        "http://10.121.46.79:3000/api/providers"
      );

      if (provListResponse.ok) {
        const providersData = await provListResponse.json();
        setProviders(providersData);
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

  const handleProviderPress = (ProviderID) => {
    console.log("Second Provider id: ", ProviderID);
    navigation.navigate("Booking", { ProviderID });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Ratings</Text>
        <SectionList
          sections={providers.map((item) => ({
            title: `${item.Rating} ★`,
            data: [item],
          }))}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleProviderPress(item.ProviderID)}
            >
              {console.log("Third provider id: ", item.ProviderID)}
              <View>
                <Text style={styles.item}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item) => `basicListEntry-${item.id}`}
        />
      </ScrollView>
    </SafeAreaView>
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
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    fontSize: 20, // Change the font size for the title
    fontWeight: "bold",
    marginBottom: 5,
    lineHeight: 30,
  },
});

export default SectionListBasics;
