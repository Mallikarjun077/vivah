import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const EditLocationInfo = () => {
  const navigation = useNavigation();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ancestralOrigin, setAncestralOrigin] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setCountry(profile.country || "");
        setState(profile.state || "");
        setCity(profile.city || "");
        setAncestralOrigin(profile.ancestralOrigin || "");
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const storedProfile = await AsyncStorage.getItem("userProfile");
    const oldProfile = storedProfile ? JSON.parse(storedProfile) : {};

    const updatedProfile = {
      ...oldProfile,
      country,
      state,
      city,
      ancestralOrigin,
    };

    await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Location Information</Text>

      <Text style={styles.label}>Country</Text>
      <View style={styles.picker}>
        <Picker selectedValue={country} onValueChange={setCountry}>
          <Picker.Item label="Select Country" value="" />
          <Picker.Item label="India" value="India" />
          <Picker.Item label="USA" value="USA" />
          <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="Australia" value="Australia" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>State</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter State"
        value={state}
        onChangeText={setState}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Ancestral Origin</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Ancestral Origin"
        value={ancestralOrigin}
        onChangeText={setAncestralOrigin}
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditLocationInfo;

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
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
