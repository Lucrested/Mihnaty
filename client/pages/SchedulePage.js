import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../components/AuthContext";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import Navbar from "../components/Navbar";

const UserSchedulePage = () => {
  const [userSchedule, setUserSchedule] = useState([]);
  const { user } = useAuth();
  const userID = user?.id;

  useEffect(() => {
    const getUserSchedule = async () => {
      try {
        console.log(userID);
        const response = await fetch(
          `http://10.121.46.79:3000/api/userschedule/${userID}`
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
          <Text style={styles.dateText}>{`${item.TimeSlot.Date}`}</Text>
          <Text
            style={styles.timeitemText}
          >{`${item.TimeSlot.StartTime} - ${item.TimeSlot.EndTime}`}</Text>
          {/* <Text style={styles.timeitemText}>{`${
            item.providers - test.name
          }`}</Text> */}
        </View>
      )}
      // numColumns={3} // Set the number of columns to 3
      // columnWrapperStyle={styles.row} // Style for the row
    />
  );
};

const styles = StyleSheet.create({
  scheduleItem: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    width: "100%",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
  timeitemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
  },
});

export default UserSchedulePage;
