import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import TimeSlotList from "../components/TimeSlotList";
import { useRoute } from "@react-navigation/native";

const TimeSlotPage = () => {
  // const [timeSlots, setTimeSlots] = useState([
  //   {
  //     id: "1",
  //     StartTime: "09:00 AM",
  //     EndTime: "10:00 AM",
  //     Date: "2023-12-03",
  //   },
  //   {
  //     id: "2",
  //     StartTime: "10:00 AM",
  //     EndTime: "11:00 AM",
  //     Date: "2023-12-03",
  //   },
  //   {
  //     id: "3",
  //     StartTime: "11:00 AM",
  //     EndTime: "12:00 PM",
  //     Date: "2023-12-03",
  //   },
  //   {
  //     id: "4",
  //     StartTime: "12:00 PM",
  //     EndTime: "01:00 PM",
  //     Date: "2023-12-03",
  //   },
  //   {
  //     id: "5",
  //     StartTime: "02:00 PM",
  //     EndTime: "03:00 PM",
  //     Date: "2023-12-03",
  //   },
  // ]);

  const [timeSlots, setTimeSlots] = useState([]);

  const route = useRoute();
  const { ProviderID } = route.params;
  console.log("First provider id: ", ProviderID);

  const getTimeSlots = async () => {
    try {
      const timeSlotResponse = await fetch(
        `http://10.121.19.142:3000/api/timeslots/${ProviderID}`
      );
      if (timeSlotResponse.ok) {
        const data = await timeSlotResponse.json();
        setTimeSlots(data);
      } else console.error("Error fetching time slots.");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTimeSlots();
  }, [ProviderID]);

  const handleTimeSlotPress = (selectedTimeSlot) => {
    console.log("Selected Time Slot:", selectedTimeSlot);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Available Time Slots</Text>
      {/* {timeSlots.map((timeSlot) => ( */}
      <TimeSlotList
        timeSlots={timeSlots}
        onTimeSlotPress={handleTimeSlotPress}
      />
      {/* ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TimeSlotPage;

// export const BookL = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Open Booking Slots</Text>
//       <FlatList
//         data={DATA}
//         renderItem={({ item }) => <Item title={item.title} />}
//         keyExtractor={(item) => item.id}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: "#1d3557",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 10,
//   },
//   times: {
//     fontSize: 32,
//     textAlign: "center", // Center the text horizontally
//     color: "white",
//     fontWeight: "bold",
//   },
//   title: {
//     fontSize: 20, // Change the font size for the title
//     fontWeight: "bold",
//     marginTop: 10,
//     lineHeight: 20,
//     textAlign: "center",
//   },
// });

// export default BookL;
