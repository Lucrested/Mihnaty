import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import CategoryPage from "./CategoryPage";
import {supabase} from "../supabase"

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log(data);
      if (error) {
        Alert.alert("Error", error.message);
      } else if (data) {
        const user = data.user;

        if (user) {
          navigation.navigate("Categories");
        } else {
          Alert.alert(
            "Error",
            "An unexpected response occurred. Please try again later."
          );
        }
      }
    } catch (error) {
      // Alert.alert(
      //   "Error",
      //   "An unexpected error occurred. Please try again later."
      // );
      navigation.navigate("Categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // Check if the user with the given email already exists
      const { data: existingUser, error: existingUserError } =
        await supabase.auth.api.getUserByEmail(email);

      if (existingUserError) {
        Alert.alert("Error", existingUserError.message);
        return;
      }

      if (existingUser) {
        Alert.alert(
          "Error",
          "This email is already in use. Please choose another email or login."
        );
      } else {
        // Email is not in use, proceed with creating a new account
        const { data: newUser, error: signUpError } =
          await supabase.auth.signUp({
            email: email,
            password: password,
          });

        if (signUpError) {
          Alert.alert("Error", signUpError.message);
        } else {
          Alert.alert("Success", "Sign up successful! You can now login.");
          navigation.goBack(); // Navigate back to the login screen
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/unnamed.png")} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.Text}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Btn}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.Text}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 280,
    height: 100,
    marginBottom: 70,
  },
  inputView: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 25,
    width: "75%",
    height: 50,
    marginBottom: 25,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    color: COLORS.black,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: COLORS.catgreen,
  },
  Btn: {
    width: "50%",
    borderRadius: 25,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: COLORS.darkgreen,
  },
  Text: {
    color: COLORS.white,
  },
});

export default Login;