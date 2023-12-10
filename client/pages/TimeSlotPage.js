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

const handleTimeSlotPress = async (selectedTimeSlot) => {
  try {
    const response = await fetch(
      "http://10.126.10.237:3000/api/userschedule/add-timeslot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "your_user_id", // Replace with the actual user ID
          timeSlotId: selectedTimeSlot.TimeSlotID,
        }),
      }
    );

    if (response.ok) {
      console.log("Time slot added to user schedule");
    } else {
      console.error("Error adding time slot to user schedule");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const TimeSlotPage = () => {
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
