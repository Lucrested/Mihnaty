import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TimeSlotList = ({ timeSlots, onTimeSlotPress }) => {
  const renderTimeSlot = ({ item }) => (
    <TouchableOpacity
      style={styles.timeSlotContainer}
      onPress={() => onTimeSlotPress(item)}
    >
      <Text style={styles.timeitemText}>
        {item.StartTime} - {item.EndTime}
      </Text>
      <Text style={styles.dateText}>{item.Date}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={timeSlots}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderTimeSlot}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  timeSlotContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
  },
});

export default TimeSlotList;
