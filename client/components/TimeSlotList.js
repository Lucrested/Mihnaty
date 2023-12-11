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
      keyExtractor={(item) => item.TimeSlotID.toString()}
      renderItem={renderTimeSlot}
      numColumns={3} // Set the number of columns to 3
      columnWrapperStyle={styles.row} // Style for the row
    />
  );
};

const styles = StyleSheet.create({
  timeSlotContainer: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  timeitemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#777",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default TimeSlotList;
