import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../Create context/AuthContext";
import { ScrollView } from "react-native-gesture-handler";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSignUp = async () => {
  console.log("Submitted:", { email, username, password });

  if (!email || !username || !password) {
    Alert.alert("Error", "All fields are required!");
    return;
  }

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return;
  }

  if (username.length < 3) {
    Alert.alert("Username too short", "Minimum 3 characters required.");
    return;
  }

  if (password.length < 6) {
    Alert.alert("Weak Password", "Password must be at least 6 characters.");
    return;
  }

  console.log("✅ Passed validation, navigating...");

  navigation.navigate("PreProfileStep1", {
    email,
    username,
    password,
  });
};


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require("../assets/bach.png")}
              style={styles.image}
            />

            <Text style={styles.title}>Nekar Vivah Vedike</Text>

            <TextInput
              label="Username"
              mode="outlined"
              theme={{ colors: { primary: "#9C854A", outline: "transparent" } }}
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              theme={{ colors: { primary: "#9C854A", outline: "transparent" } }}
              style={styles.input}
            />

            <TextInput
              label="Password"
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#9C854A", outline: "transparent" } }}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.signinText}>
              Already have an account?{" "}
              <Text
                style={styles.signinLink}
                onPress={() => navigation.navigate("SignIn")}
              >
                Sign In
              </Text>
            </Text>

            <Text style={styles.term}>
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F2F0E8",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#9C854A",
  },
  input: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#E4DFD1",
  },
  image: {
    height: 300,
    width: "100%",
    resizeMode: "contain",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#f7ca36",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1C170D",
    fontSize: 16,
    fontWeight: "bold",
  },
  signinText: {
    marginTop: 20,
    textAlign: "center",
    color: "#9C854A",
  },
  signinLink: {
    color: "#658cf7",
    fontWeight: "bold",
  },
  term: {
    marginTop: 40,
    textAlign: "center",
    color: "#9C854A",
    fontSize: 14,
  },
});

export default SignUpScreen;
