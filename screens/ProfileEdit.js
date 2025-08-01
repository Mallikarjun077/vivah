import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const section = route.params?.section;

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [eatingHabits, setEatingHabits] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [languagesKnown, setLanguagesKnown] = useState("");
  const [religion, setReligion] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) {
        const data = JSON.parse(profile);
        setAge(data.age || "");
        setHeight(data.height || "");
        setMaritalStatus(data.maritalStatus || "");
        setEatingHabits(data.eatingHabits || "");
        setMotherTongue(data.motherTongue || "");
        setLanguagesKnown(data.languagesKnown || "");
        setReligion(data.religion || "");
      }
    };
    loadProfile();
  }, []);
const saveProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    const updated = {
     
      age,
      height,
      maritalStatus,
      eatingHabits,
      motherTongue,
      languagesKnown,
    
    };

    const response = await fetch("https://backend-1-hccr.onrender.com/api/pre-profile/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    });

    if (!response.ok) {
      let errorMessage = "Unknown error";

      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || JSON.stringify(errorData);
      } catch (jsonError) {
        // If response is not JSON, fallback to plain text
        const text = await response.text();
        errorMessage = text;
      }

      console.error("Server error:", errorMessage);
      alert("Failed to update profile: " + errorMessage);
      return;
    }

    // Success
    alert("Profile updated successfully!");
    navigation.goBack();

  } catch (error) {
    console.error("Save failed", error);
    alert("An error occurred while saving your profile.");
  }
};



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Personal Information</Text>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Height (in feet)</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Marital Status</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={maritalStatus}
          onValueChange={(itemValue) => setMaritalStatus(itemValue)}
        >
          <Picker.Item label="Select Marital Status" value="" />
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Divorced" value="Divorced" />
          <Picker.Item label="Widowed" value="Widowed" />
          <Picker.Item label="Separated" value="Separated" />
        </Picker>
      </View>

      <Text style={styles.label}>Eating Habits</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={eatingHabits}
          onValueChange={(itemValue) => setEatingHabits(itemValue)}
        >
          <Picker.Item label="Select Eating Habit" value="" />
          <Picker.Item label="Vegetarian" value="Vegetarian" />
          <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
          <Picker.Item label="Eggetarian" value="Eggetarian" />
        </Picker>
      </View>

      <Text style={styles.label}>Religion</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={religion}
          onValueChange={(itemValue) => setReligion(itemValue)}
        >
          <Picker.Item label="Select Religion" value="" />
          <Picker.Item label="Hindu" value="Hindu" />
          <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Jain" value="Jain" />
          <Picker.Item label="Sikh" value="Sikh" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Mother Tongue</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={motherTongue}
          onValueChange={(itemValue) => setMotherTongue(itemValue)}
        >
          <Picker.Item label="Select Mother Tongue" value="" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="Telugu" value="Telugu" />
          <Picker.Item label="Tamil" value="Tamil" />
          <Picker.Item label="Kannada" value="Kannada" />
          <Picker.Item label="Marathi" value="Marathi" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Languages Known</Text>
      <TextInput
        style={styles.input}
        value={languagesKnown}
        onChangeText={setLanguagesKnown}
        placeholder="e.g., Hindi, English"
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F2F0E8",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1C170D",
  },
  label: {
    fontSize: 16,
    color: "#1C170D",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#9C854A",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
