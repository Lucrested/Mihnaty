import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../components/AuthContext";

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
    <View>
      {userSchedule.map((scheduleItem) => (
        <View key={scheduleItem.ScheduleID}>
          <Text>{`Date: ${scheduleItem.TimeSlot.Date}`}</Text>
          <Text>{`Time: ${scheduleItem.TimeSlot.StartTime} - ${scheduleItem.TimeSlot.EndTime}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserSchedulePage;
