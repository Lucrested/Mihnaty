import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from "../supabase";
// Import the Icon component, if you have the react-native-vector-icons library
 import Icon from 'react-native-vector-icons/FontAwesome';

const ChangePasswordPage = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Add any other password validations here

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert('Password updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error.message);
      alert('Failed to update password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={!isPasswordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        {/* Replace this TouchableOpacity with an Icon if you have the react-native-vector-icons library */}
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={!isPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdatePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
 container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#f7f7f7', // A light grey background
   },
   button: {
     width: '80%', // Take up 80% of container width
     padding: 15, // Padding inside the button for spacing
     marginVertical: 10, // Margin vertically for spacing between buttons
     alignItems: 'center', // Center the text inside the button
     justifyContent: 'center', // Center the text vertically
     backgroundColor: '#ffffff', // White background for the button
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
     color: '#333333', // Text color, a dark grey
     fontWeight: 'bold', // Make the font bold
   },
 });

export default ChangePasswordPage;
