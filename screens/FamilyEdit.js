import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert, // ✅ Added to fix the ReferenceError
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const FamilyEdit = () => {
  const navigation = useNavigation();

  const [familyStatus, setFamilyStatus] = useState("");
  const [familyType, setFamilyType] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [brothers, setBrothers] = useState("0");
  const [sisters, setSisters] = useState("0");

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        const data = JSON.parse(storedProfile);
        setFamilyStatus(data.familyStatus || "");
        setFamilyType(data.familyType || "");
        setFatherOccupation(data.fatherOccupation || "");
        setMotherOccupation(data.motherOccupation || "");
        setBrothers(data.brothers || "0");
        setSisters(data.sisters || "0");
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const updatedProfile = {
      familyStatus,
      familyType,
      fatherOccupation,
      motherOccupation,
      brothers,
      sisters,
    };

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "https://backend-1-hccr.onrender.com/api/pre-profile/me", 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          console.error("Server error:", errorData);
          Alert.alert("Error", errorData.detail || "Failed to update profile.");
        } else {
          const errorText = await response.text();
          console.error("Raw error:", errorText);
          Alert.alert("Error", errorText || "Failed to update profile.");
        }
        return;
      }

      Alert.alert("Success", "Family information updated!");
      navigation.goBack();
    } catch (err) {
      console.error("PUT request failed:", err);
      Alert.alert("Error", "Network error. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Family Information</Text>

      <Text style={styles.label}>Family Status</Text>
      <TextInput
        style={styles.input}
        value={familyStatus}
        onChangeText={setFamilyStatus}
        placeholder="Enter Family Status"
      />

      <Text style={styles.label}>Family Type</Text>
      <TextInput
        style={styles.input}
        value={familyType}
        onChangeText={setFamilyType}
        placeholder="Enter Family Type"
      />

      <Text style={styles.label}>Father's Occupation</Text>
      <TextInput
        style={styles.input}
        value={fatherOccupation}
        onChangeText={setFatherOccupation}
        placeholder="Enter Father's Occupation"
      />

      <Text style={styles.label}>Mother's Occupation</Text>
      <TextInput
        style={styles.input}
        value={motherOccupation}
        onChangeText={setMotherOccupation}
        placeholder="Enter Mother's Occupation"
      />

      <Text style={styles.label}>Number of Brothers</Text>
      <View style={styles.picker}>
        <Picker selectedValue={brothers} onValueChange={setBrothers}>
          {["0", "1", "2", "3", "4", "5+"].map((num) => (
            <Picker.Item key={num} label={num} value={num} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Number of Sisters</Text>
      <View style={styles.picker}>
        <Picker selectedValue={sisters} onValueChange={setSisters}>
          {["0", "1", "2", "3", "4", "5+"].map((num) => (
            <Picker.Item key={num} label={num} value={num} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FamilyEdit;

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
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
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
