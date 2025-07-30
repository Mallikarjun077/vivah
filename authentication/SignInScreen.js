import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";

import { AuthContext } from "../Create context/AuthContext";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>
              Welcome To {"\n"}Nekar Vivah Vedike
            </Text>

            <Image
              source={require("../assets/bride.png")}
              style={styles.image}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined" // or "flat"
              keyboardType="email-address"
              autoCapitalize="none"
              theme={{ colors: { primary: "#9C854A", outline: "transparent" } }}
              style={styles.input}
            />

            <TextInput
              label={"Password"}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#9C854A", outline: "transparent" } }}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text
              style={styles.signupTextPwd}
              onPress={() => navigation.navigate("ResetPwd")}
            >
              Forget Password?
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate("SignUp")}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F2F0E8",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#9C854A",
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 30,
    resizeMode: "contain",
  },
  input: {
    height: 50,
    borderColor: "white",
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: "black",
    fontSize: 16,
    backgroundColor: "#E4DFD1",
  },
  button: {
    backgroundColor: "#f7ca36",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1C170D",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
    color: "#9C854A",
  },
  signupTextPwd: {
    color: "#658cf7",
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 20,
  },
  signupLink: {
    color: "#658cf7",
    fontWeight: "bold",
  },
});

export default SignInScreen;
