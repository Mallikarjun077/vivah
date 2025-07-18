import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../Create context/AuthContext";

const NewPwdScreen = () => {
  const { resetPassword } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();

  // Safe fallback if route.params is undefined
  const uidb64 = route?.params?.uidb64 || '';
  const token = route?.params?.token || '';

  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (!password || !confirmpassword) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    if (password !== confirmpassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const success = await resetPassword(uidb64, token, password); 

    if (success) {
      Alert.alert("Success", "Password updated successfully!");
      navigation.navigate("SignIn");
    } else {
      Alert.alert("Error", "Failed to update password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#9C854A"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#9C854A"
        secureTextEntry
        value={confirmpassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0E8',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#1C170D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#9C854A',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#000',
    fontSize: 16,
    backgroundColor: '#E4DFD1',
  },
  button: {
    backgroundColor: '#f7ca36',
    padding: 14,
    borderRadius: 8,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#1C170D',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default NewPwdScreen;
