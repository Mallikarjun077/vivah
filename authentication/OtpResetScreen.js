import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AuthContext } from "../Create context/AuthContext";

export default function OtpResetScreen({ navigation }) {
  const { verifyOtpAndResetPassword } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    const success = await verifyOtpAndResetPassword(email, otp, newPassword);
    if (success) {
      Alert.alert("Success", "Password updated successfully.");
      navigation.navigate("SignIn");
    }
  };

  return (
    <View style={{ padding: 30,top:150,backgroundColor:"#F2F0E8" }}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#9C854A"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        placeholder="OTP"
        placeholderTextColor="#9C854A"
        keyboardType="numeric"
        maxLength={6}
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#9C854A"
        value={newPassword}
        onChangeText={setNewPassword}
        autoCapitalize="none"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#C0B283",
    backgroundColor: "#E4DFD1",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "black",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f7ca36",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#1C170D",
    fontSize: 16,
    fontWeight: "bold",
  },
});
