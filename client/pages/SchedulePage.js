import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../components/AuthContext";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import Navbar from "../components/Navbar";
import { theme } from "../constants/theme";

const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return useCallback(() => setValue((value) => value + 1), []);
};

const UserSchedulePage = () => {
  const [userSchedule, setUserSchedule] = useState([]);
  const { user } = useAuth();
  const userID = user?.id;
  const forceUpdate = useForceUpdate();

  const confirmDelete = (scheduleID, timeSlotID) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this entry?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("ScheduleID: ", scheduleID);
            handleDelete(scheduleID, timeSlotID);
            getUserSchedule();
            forceUpdate();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (scheduleID, timeSlotID) => {
    try {
      const response = await fetch(
        `http://10.121.46.79:3000/api/userschedule/remove-timeslot/${scheduleID}/${timeSlotID}`,
        {
          method: "DELETE",
        }
      );
      console.log("ScheduleID in fetch: ", scheduleID);
      if (response.ok) {
        console.log("Time slot removed from user schedule");
        getUserSchedule();
      }
      //  else {
      //   console.error("Error removing time slot from user schedule");
      // }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserSchedule = async () => {
    try {
      console.log(userID);
      const response = await fetch(
        `http://10.121.19.142:3000/api/userschedule/${userID}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserSchedule(data);
      } else {
        console.error("Error fetching user schedule");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserSchedule();
  }, [userID]);

  return (
    <FlatList
      data={userSchedule}
      keyExtractor={(item) => item.ScheduleID.toString()}
      renderItem={({ item }) => (
        <View style={styles.scheduleItem}>
          <TouchableOpacity
            style={styles.scheduleBubble}
            onPress={() => {
              console.log("timeslot in press: ", item.TimeSlot.TimeSlotID);
              confirmDelete(item.ScheduleID, item.TimeSlot.TimeSlotID);
            }}
          >
            <Text style={styles.dateText}>{`${item.TimeSlot.Date}`}</Text>
            <Text
              style={styles.timeitemText}
            >{`${item.TimeSlot.StartTime} - ${item.TimeSlot.EndTime}`}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  scheduleItem: {
    flexDirection: "column",
    alignItems: "center",
    margin: 8,
  },
  scheduleBubble: {
    backgroundColor: "white", // Use your preferred grey color
    borderRadius: 10,
    padding: 20,
    marginBottom: 8, // Add margin between the date and time bubbles
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeitemText: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
    alignItems: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default UserSchedulePage;
