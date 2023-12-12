import React from "react";
import { Alert } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SettingsHomePage = ({ navigation }) => {
  const handleApplicationSettings = () => {
    Alert.alert("This feature will be implemented later.");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AccountSettings")}
      >
        <Text style={styles.buttonText}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleApplicationSettings}
      >
        <Text style={styles.buttonText}>Application Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
  },
});

export default SettingsHomePage;
