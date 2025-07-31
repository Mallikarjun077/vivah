import React, { useEffect, useState } from "react";
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

export default function PreProfileStep3() {
  const navigation = useNavigation();
  const route = useRoute();
  const previousData = route.params;

  const [form, setForm] = useState({
    familyStatus: "",
    familyType: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
  });

  const [familyStatusOptions, setFamilyStatusOptions] = useState([]);
  const [familyTypeOptions, setFamilyTypeOptions] = useState([]);
  const [fatherOccupationOptions, setFatherOccupationOptions] = useState([]);
  const [motherOccupationOptions, setMotherOccupationOptions] = useState([]);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const baseUrl = "https://backend-1-hccr.onrender.com/api/masters";

        const res1 = await fetch(`${baseUrl}/family-status`);
        setFamilyStatusOptions(await res1.json());

        const res2 = await fetch(`${baseUrl}/family-type`);
        setFamilyTypeOptions(await res2.json());

        const res3 = await fetch(`${baseUrl}/father-occupation`);
        setFatherOccupationOptions(await res3.json());

        const res4 = await fetch(`${baseUrl}/mother-occupation`);
        setMotherOccupationOptions(await res4.json());
      } catch (err) {
        console.error("Error fetching family master data", err);
      }
    };

    fetchMasters();
  }, []);

  const handleNext = () => {
    if (!form.familyStatus || !form.familyType) {
      Alert.alert("Validation", "Please fill Family Status and Type.");
      return;
    }

    navigation.navigate("PreProfileStep4", { ...previousData, ...form });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Step 3: Family Info</Text>

        <Text style={styles.label}>Family Status *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.familyStatus}
            onValueChange={(value) => setForm({ ...form, familyStatus: value })}
          >
            <Picker.Item label="Select Family Status" value="" />
            {familyStatusOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Family Type *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.familyType}
            onValueChange={(value) => setForm({ ...form, familyType: value })}
          >
            <Picker.Item label="Select Family Type" value="" />
            {familyTypeOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Father's Occupation</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.fatherOccupation}
            onValueChange={(value) => setForm({ ...form, fatherOccupation: value })}
          >
            <Picker.Item label="Select Father's Occupation" value="" />
            {fatherOccupationOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Mother's Occupation</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.motherOccupation}
            onValueChange={(value) => setForm({ ...form, motherOccupation: value })}
          >
            <Picker.Item label="Select Mother's Occupation" value="" />
            {motherOccupationOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Siblings (e.g., 1 brother)"
          mode="outlined"
          value={form.brothers}
          onChangeText={(text) => setForm({ ...form, brothers: text })}
          style={styles.input}
        />
        <TextInput
          label="Siblings (e.g., 1 brother)"
          mode="outlined"
          value={form.sisters}
          onChangeText={(text) => setForm({ ...form, sisters: text })}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
          contentStyle={{ paddingVertical: 10 }}
        >
          Continue ➡️
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
  },
});
