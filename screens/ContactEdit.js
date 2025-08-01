import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ContactEdit = () => {
  const navigation = useNavigation();

  const [mobile, setMobile] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        const data = JSON.parse(storedProfile);
        setMobile(data.mobile || "");
        setSocialMedia(data.socialMedia || "");
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    if (!mobile) {
      Alert.alert("Validation Error", "Mobile number is required.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Auth Error", "User not authenticated.");
        return;
      }

      const updatedData = {
        mobile,
        socialMedia,
      };

      const response = await fetch(
        "https://backend-1-hccr.onrender.com/api/pre-profile/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const result = await response.json();

        // Update AsyncStorage
        const storedProfile = await AsyncStorage.getItem("userProfile");
        const oldData = storedProfile ? JSON.parse(storedProfile) : {};
        const updatedProfile = {
          ...oldData,
          ...updatedData,
        };
        await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile));

        Alert.alert("Success", "Contact details updated.");
        navigation.goBack();
      } else {
        const err = await response.json();
        Alert.alert("Server error", err.detail || "Failed to update.");
      }
    } catch (error) {
      console.error("Update failed", error);
      Alert.alert("Network error", "Could not update profile.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Contact Information</Text>

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        placeholder="Enter your mobile number"
        maxLength={15}
      />

      <Text style={styles.label}>Social Media (optional)</Text>
      <TextInput
        style={styles.input}
        value={socialMedia}
        onChangeText={setSocialMedia}
        placeholder="Enter Instagram/Facebook ID"
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ContactEdit;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F2F0E8",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C170D",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#1C170D",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#9C854A",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
