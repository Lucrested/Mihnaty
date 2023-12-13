import React from "react";
import { Alert } from "react-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../components/AuthContext";

const SettingsHomePage = ({ navigation }) => {
  const { user, signOut } = useAuth();

  const handleApplicationSettings = () => {
    Alert.alert("This feature will be implemented later.");
  };

  const handleLogOut = () => {
    signOut();
    navigation.navigate("Login");
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
      <TouchableOpacity style={styles.logout} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
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
  logoutText: {
    fontSize: "18",
    color: "white",
    fontWeight: "bold",
  },
  logout: {
    width: "80%",
    padding: 20,
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 10,
    elevation: 3,
    opacity: 0.8,
  },
});

export default SettingsHomePage;
