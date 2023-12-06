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
import { COLORS, icons, images, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/core";




const SectionListBasics = () => {
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();

  const Pop = ({ ProviderID, modalVisible, setModalVisible }) => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Provider Info</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleProviderPress(ProviderID)}>
                <Text style={styles.textStyle}>Select </Text>
              </Pressable>
              <Pressable 
                style={styles.buttonX}
                onPress={() => handleClosePress(ProviderID)}>
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
    console. log ("Second Provider id: ", ProviderID); 
    setModalVisible({ ...modalVisible, [ProviderID]: false });
    navigation. navigate ("Booking", { ProviderID });
  };

  const fetchSections = async () => {
    try {
      const provListResponse = await fetch(
        'http://10.121.19.142:3000/api/providers'
      );

      if (provListResponse.ok) {
        const providersData = await provListResponse.json();
        setProviders(providersData);
        // Initialize modalVisible state for each provider
        setModalVisible(
          providersData.reduce((acc, provider) => {
            acc[provider.id] = false;
            return acc;
          }, {})
        );
      } else {
        console.error(
          'Error fetching providers:',
          provListResponse.status,
          provListResponse.statusText
        );
      }
    } catch (error) {
      console.error('Error fetching providers:', error.message);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Ratings</Text>
        <SectionList
          sections={providers.reduce((acc, item) => {
            const existingSection = acc.find((section) => section.title === `${item.Rating} ★`);
  
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
              <TouchableOpacity onPress={() => handlePopPress(item.id)}>
                <View>
                  <Text style={styles.item}>{item.name}</Text>
                </View>
              </TouchableOpacity>
              <Pop
                ProviderID={item.id}
                modalVisible={modalVisible[item.id]}
                setModalVisible={(value) =>
                  setModalVisible({ ...modalVisible, [item.id]: value })
                }
              />
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 40, // Increased margin
    backgroundColor: 'white',
    borderRadius: 30, // Increased border radius
    padding: 50, // Increased padding
    alignItems: 'center',
    shadowColor: '#000',
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
    position: 'absolute',
    top: 10, // Adjust this value to set the distance from the top
    right: 10, // Adjust this value to set the distance from the right
    backgroundColor: '#B0B3B8',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SectionListBasics;






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
