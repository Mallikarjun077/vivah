import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert, // ✅ FIXED: Added missing import
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const EditProfessionalInfo = () => {
  const navigation = useNavigation();

  const [qualification, setQualification] = useState("");
  const [jobSector, setJobSector] = useState("");
  const [income, setIncome] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setQualification(profile.qualification || "");
        setJobSector(profile.jobSector || "");
        setIncome(profile.income || "");
        setProfession(profile.profession || "");
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const updatedProfile = {
      qualification,
      jobSector,
      income,
      profession,
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

      Alert.alert("Success", "Professional information updated!");
      navigation.goBack();
    } catch (err) {
      console.error("PUT request failed:", err);
      Alert.alert("Error", "Network error. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Professional Information</Text>

      <Text style={styles.label}>Qualification</Text>
      <View style={styles.picker}>
        <Picker selectedValue={qualification} onValueChange={setQualification}>
          <Picker.Item label="Select Qualification" value="" />
          <Picker.Item label="High School" value="High School" />
          <Picker.Item label="Bachelor's Degree" value="Bachelor's Degree" />
          <Picker.Item label="Master's Degree" value="Master's Degree" />
          <Picker.Item label="PhD" value="PhD" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Job Sector</Text>
      <View style={styles.picker}>
        <Picker selectedValue={jobSector} onValueChange={setJobSector}>
          <Picker.Item label="Select Job Sector" value="" />
          <Picker.Item label="Government" value="Government" />
          <Picker.Item label="Private" value="Private" />
          <Picker.Item label="Business" value="Business" />
          <Picker.Item label="Self-Employed" value="Self-Employed" />
          <Picker.Item label="Student" value="Student" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Annual Income</Text>
      <View style={styles.picker}>
        <Picker selectedValue={income} onValueChange={setIncome}>
          <Picker.Item label="Select Annual Income" value="" />
          <Picker.Item label="Below ₹3 LPA" value="Below ₹3 LPA" />
          <Picker.Item label="₹3 LPA - ₹6 LPA" value="₹3-6 LPA" />
          <Picker.Item label="₹6 LPA - ₹10 LPA" value="₹6-10 LPA" />
          <Picker.Item label="₹10 LPA - ₹20 LPA" value="₹10-20 LPA" />
          <Picker.Item label="Above ₹20 LPA" value="Above ₹20 LPA" />
        </Picker>
      </View>

      <Text style={styles.label}>Profession</Text>
      <TextInput
        style={styles.input}
        value={profession}
        onChangeText={setProfession}
        placeholder="Enter your profession"
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfessionalInfo;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F2F0E8",
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
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  input: {
    borderColor: "#ccc",
    backgroundColor: "#E4DFD1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#9C854A",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
