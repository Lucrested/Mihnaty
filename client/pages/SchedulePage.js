import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../components/AuthContext";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import {theme} from "../constants/theme";

const UserSchedulePage = () => {
  const [userSchedule, setUserSchedule] = useState([]);
  const { user } = useAuth();
  const userID = user?.id;

  useEffect(() => {
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

    getUserSchedule();
  }, [userID]);

  return (
    <FlatList
      data={userSchedule}
      keyExtractor={(item) => item.ScheduleID.toString()}
      renderItem={({ item }) => (
        <View style={styles.scheduleItem}>
          <View style={styles.scheduleBubble}>
            <Text style={styles.dateText}>{`${item.TimeSlot.Date}`}</Text>
            <Text style={styles.timeitemText}>{`${item.TimeSlot.StartTime} - ${item.TimeSlot.EndTime}`}</Text>
          </View>
        </View>
      )}
      // Remove the numColumns prop
    />
  );
  
 
};

const styles = StyleSheet.create({
  scheduleItem: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 8,
  },
  scheduleBubble: {
    backgroundColor: 'white', // Use your preferred grey color
    borderRadius: 10,
    padding: 20,
    marginBottom: 8, // Add margin between the date and time bubbles
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    color: 'black', // Adjust text color as needed
    fontWeight: 'bold',
    marginBottom: 4, // Add margin between date and time text
    textAlign: 'center',
  },
  timeitemText: {
    color: 'black', // Adjust text color as needed
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});











export default UserSchedulePage;
