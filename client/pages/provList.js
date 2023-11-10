import React from "react";
import { StatusBar, Stack } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SectionList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { COLORS, icons, images, SIZES } from '../constants';
import BookL from './provBook';
import { useNavigation } from "@react-navigation/core";

const SectionListBasics = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Ratings</Text>
        <SectionList
          sections={[
            { title: '5 ★', data: ['Alae', 'Sara'] },
            { title: '4 ★', data: ['Hamid'] },
            { title: '3 ★', data: ['Sami', 'Hussam', 'Azziz'] },
            { title: '2 ★', data: ['Badr'] },
            { title: '1 ★', data: ['Salim', 'Omar'] },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Booking")}>
              <View>
                <Text style={styles.item}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item) => `basicListEntry-${item}`}
        />
      </ScrollView>
      
    </SafeAreaView>
  );
};

// const handleItemPress = (item) => {
//   <BookL/>
// };



// const SectionListBasics = () => {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.title}> Ratings </Text>

//         <SectionList

//           sections={[
//             {title: '5 ★', data: ['Alae', 'Sara']},
//             {title: '4 ★', data: ['Hamid']},
//             {title: '3 ★', data: ['Sami', 'Hussam', 'Azziz']},
//             {title: '2 ★', data: ['Badr']},
//             {title: '1 ★', data: ['Salim', 'Omar']},
//           ]}

//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemPress(item)}>
//               <View>
//               <Text style={styles.item}>{item}</Text>
//               </View>
//             </TouchableOpacity>
//           )}

//           renderSectionHeader={({section}) => (
//             <Text style={styles.sectionHeader}>{section.title}</Text>
//           )}

//           keyExtractor={item => `basicListEntry-${item}`}

//         />
//       </SafeAreaView>
//     );
// };



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
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    fontSize: 20, // Change the font size for the title
    fontWeight: 'bold',
    marginBottom: 5, 
    lineHeight: 30,
  },

});

export default SectionListBasics;



// const fetchSections = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("providers-test")
//         .select("name, rating"); // Select the name and rating columns
  
//       if (error) {
//         console.error("Error fetching data:", error);
//         return [];
//       }
  
//       // Group the data by the "rating" column and format it for your SectionList
//       const sections = data.reduce((acc, item) => {
//         const existingSection = acc.find((section) => section.title === item.rating);
//         if (existingSection) {
//           existingSection.data.push(item.name);
//         } else {
//           acc.push({
//             title: item.rating,
//             data: [item.name],
//           });
//         }
//         return acc;
//       }, []);
  
//       // Now you have the data in the required format
//       return sections;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return [];
//     }
//   };
  


// const SectionListBasics = () => {
//     const [sections, setSections] = useState([]);
  
//     useEffect(() => {
//       fetchSections().then((data) => setSections(data));
//     }, []);
  
//     return (
//       <View style={styles.container}>
//         <SectionList
//           sections={sections}
//           renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
//           renderSectionHeader={({ section }) => (
//             <Text style={styles.sectionHeader}>{section.title}</Text>
//           )}
//           keyExtractor={(item) => `basicListEntry-${item}`}
//         />
//       </View>
//     );
//   };



