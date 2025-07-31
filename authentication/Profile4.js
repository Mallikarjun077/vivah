import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../Create context/AuthContext";

export default function PreProfileStep4() {
  const navigation = useNavigation();
  const route = useRoute();
  const previousData = route.params;

  const { submitPreProfile } = useContext(AuthContext);

  const [form, setForm] = useState({
    qualification: "",
    jobSector: "",
    annualIncome: "",
    country: "",
    state: "",
    city: "",
    ancestralOrigin: "",
  });

  const [masters, setMasters] = useState({
    qualifications: [],
    jobSectors: [],
    countries: [],
    states: [],
    cities: [],
  });

  // useEffect(() => {
  //   const fetchMasters = async () => {
  //     try {
  //       const res = await fetch("https://backend-1-hccr.onrender.com/api/master/all");
  //       const data = await res.json();
  //       setMasters(data);
  //     } catch (err) {
  //       console.error("Error fetching professional/location masters", err);
  //     }
  //   };

  //   fetchMasters();
  // }, []);

  useEffect(() => {
  const fetchMasters = async () => {
    try {
      const baseUrl = "https://backend-1-hccr.onrender.com/api/masters";

      const [qualRes, jobRes, countryRes, stateRes, cityRes] = await Promise.all([
        fetch(`${baseUrl}/qualification`),
        fetch(`${baseUrl}/job_sector`),
        fetch(`${baseUrl}/country`),
        fetch(`${baseUrl}/state`),
        fetch(`${baseUrl}/city`),
      ]);

      const [qualifications, jobSectors, countries, states, cities] = await Promise.all([
        qualRes.json(),
        jobRes.json(),
        countryRes.json(),
        stateRes.json(),
        cityRes.json(),
      ]);

      setMasters({
        qualifications,
        jobSectors,
        countries,
        states,
        cities,
      });
    } catch (err) {
      console.error("Error fetching professional/location masters", err);
    }
  };

  fetchMasters();
}, []);
const { register } = useContext(AuthContext); // ADD this along with submitPreProfile



const handleSubmit = async () => {
  const { email, username, password, ...restProfileData } = previousData || {};

  if (!email || !username || !password) {
    Alert.alert("Error", "Missing user credentials. Please restart signup.");
    return;
  }

  if (
    !form.qualification ||
    !form.jobSector ||
    !form.country ||
    !form.state ||
    !form.city
  ) {
    Alert.alert("Missing Information", "Please fill all required fields marked with *");
    return;
  }

  const preProfileData = {
    ...restProfileData, // ✅ Only profile-related info
    qualification: form.qualification,
    job_sector: form.jobSector,
    annual_income: form.annualIncome,
    country: form.country,
    state: form.state,
    city: form.city,
    ancestral_origin: form.ancestralOrigin,
  };

  try {
    console.log("📤 Sending to register:", { email, username, password, preProfileData });
    const registered = await register(email, username, password, preProfileData);
    if (registered) {
      Alert.alert("✅ Success", "Registration complete!");
      navigation.navigate("SignIn");
    } else {
      Alert.alert("❌ Error", "Registration failed.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    Alert.alert("❌ Error", "Something went wrong.");
  }
};


  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Step 4: Professional & Location</Text>

        <Text style={styles.label}>Qualification *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.qualification}
            onValueChange={(value) => setForm({ ...form, qualification: value })}
          >
            <Picker.Item label="Select Qualification" value="" />
            {masters.qualifications.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Job Sector *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.jobSector}
            onValueChange={(value) => setForm({ ...form, jobSector: value })}
          >
            <Picker.Item label="Select Job Sector" value="" />
            {masters.jobSectors.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Annual Income"
          mode="outlined"
          keyboardType="numeric"
          value={form.annualIncome}
          onChangeText={(text) => setForm({ ...form, annualIncome: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Country *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.country}
            onValueChange={(value) => setForm({ ...form, country: value })}
          >
            <Picker.Item label="Select Country" value="" />
            {masters.countries.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>State *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.state}
            onValueChange={(value) => setForm({ ...form, state: value })}
          >
            <Picker.Item label="Select State" value="" />
            {masters.states.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>City *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.city}
            onValueChange={(value) => setForm({ ...form, city: value })}
          >
            <Picker.Item label="Select City" value="" />
            {masters.cities.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Ancestral Origin"
          mode="outlined"
          value={form.ancestralOrigin}
          onChangeText={(text) => setForm({ ...form, ancestralOrigin: text })}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          contentStyle={{ paddingVertical: 10 }}
        >
          Submit & Register
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 14,
    color: "#555",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#6200ee",
  },
});
