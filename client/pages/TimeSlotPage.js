import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import TimeSlotList from "../components/TimeSlotList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../components/AuthContext";
import { Alert } from "react-native";

const TimeSlotPage = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { ProviderID } = route.params;

  const navigation = useNavigation();
  const addTimeSlot = async (selectedTimeSlot) => {
    try {
      setLoading(true);
      const userID = user?.id;

      const response = await fetch(
        "http://10.126.10.237:3000/api/userschedule/add-timeslot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserID: userID,
            TimeSlotID: selectedTimeSlot.TimeSlotID,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Time slot added to user schedule", data.ScheduleID);
      } else {
        const errorData = await response.json();
        console.error("Error adding time slot to user schedule");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("First provider id: ", ProviderID);

  const getTimeSlots = async () => {
    try {
      console.log("User: ", user);
      const timeSlotResponse = await fetch(
        `http://10.126.10.237:3000/api/timeslots/${ProviderID}`
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
    addTimeSlot(selectedTimeSlot);
    Alert.alert("Booked!", "This time slot has been added to your schedule.");
    navigation.navigate("Categories");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Available Time Slots</Text>
      <TimeSlotList
        timeSlots={timeSlots}
        onTimeSlotPress={handleTimeSlotPress}
      />
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
