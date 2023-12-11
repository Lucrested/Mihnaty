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
    />
  );
 
};

const styles = StyleSheet.create({
  scheduleItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
  },
  scheduleBubble: {
    backgroundColor: '#d6e4f0', // Light blue background
    borderRadius: 30, // Increased border radius
    padding: 25, // Increased padding for a wider bubble
    marginBottom: 16, // More margin
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  
  dateText: {
    color: '#3498db', // Blue color for date
    fontWeight: 'bold',
    fontSize: 18, // Slightly larger font size
    marginBottom: 12, // More space between date and time text
    textAlign: 'center',
  },
  timeitemText: {
    color: '#2c3e50', // Darker blue color for time
    fontWeight: 'normal',
    fontSize: 16, // Slightly larger font size for time
    textAlign: 'center',
  },
});











export default UserSchedulePage;
