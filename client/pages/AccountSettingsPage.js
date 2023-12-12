import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../supabase";
import Login from "./Login";
import { Alert } from "react-native";
import { useAuth } from "../components/AuthContext";

const AccountSettingsPage = ({ navigation }) => {
  const { user } = useAuth();
  const userID = user?.id;

  // Navigate to ChangePasswordPage
  const handleChangePassword = () => {
    navigation.navigate("ChangePasswordPage");
  };

  const handleDeactivateAccount = async () => {
    try {
      // Correctly get the current user's ID
      //   const user = supabase.auth.user();
      console.log("UserID is: ", userID);

      if (user) {
        const { data, error } = await supabase.auth.admin.deleteUser(user);
        Alert.alert("Deleted!", "This account has been deleted.");
        // Navigate to login after successful deletion
        navigation.navigate("Login");
      } else {
        console.error("User is not logged in.");
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeactivateAccount}>
        <Text style={styles.buttonText}>Deactivate Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7", // A light grey background
  },
  button: {
    width: "80%", // Take up 80% of container width
    padding: 15, // Padding inside the button for spacing
    marginVertical: 10, // Margin vertically for spacing between buttons
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text vertically
    backgroundColor: "#ffffff", // White background for the button
    borderRadius: 25, // Rounded corners
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2, // Shadow position
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    fontSize: 16, // Text size
    color: "#333333", // Text color, a dark grey
    fontWeight: "bold", // Make the font bold
  },
});

export default AccountSettingsPage;
