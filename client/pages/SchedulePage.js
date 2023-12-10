import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const UserSchedulePage = ({ userId }) => {
  const [userSchedule, setUserSchedule] = useState([]);

  useEffect(() => {
    const getUserSchedule = async () => {
      try {
        const response = await fetch(
          `http://10.121.46.102:3000/api/userschedule/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserSchedule(data);
        } else {
          console.error("Error fetching user schedule");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    getUserSchedule();
  }, [userId]);

  return (
    <View>
      {userSchedule.map((scheduleItem) => (
        <View key={scheduleItem.TimeSlotID}>
          <Text>{`Date: ${scheduleItem.Date}`}</Text>
          <Text>{`Time: ${scheduleItem.StartTime} - ${scheduleItem.EndTime}`}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserSchedulePage;
