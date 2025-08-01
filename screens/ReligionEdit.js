import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const EditReligiousInfoScreen = () => {
  const navigation = useNavigation();

  const [religion, setReligion] = useState("");
  const [community, setCommunity] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [gothra, setGothra] = useState("");
  const [dosha, setDosha] = useState("");
  const [star, setStar] = useState("");
  const [rassi, setRassi] = useState("");
  const [horoscope, setHoroscope] = useState("");

  // Optional: Load existing profile data from API on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("https://backend-1-hccr.onrender.com/api/pre-profile/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReligion(data.religion || "");
          setCommunity(data.community || "");
          setSubCaste(data.subCaste || "");
          setGothra(data.gothra || "");
          setDosha(data.dosha || "");
          setStar(data.star || "");
          setRassi(data.rassi || "");
          setHoroscope(data.horoscope || "");
        } else {
          console.warn("Failed to fetch existing profile.");
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
    const updated = {
      religion,
      community,
      subCaste,
      gothra,
      dosha,
      star,
      rassi,
      horoscope,
    };

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch("https://backend-1-hccr.onrender.com/api/pre-profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Server JSON error:", errorData);
          Alert.alert("Error", errorData.detail || "Failed to update profile");
        } else {
          const errorText = await response.text();
          console.error("Server text error:", errorText);
          Alert.alert("Error", errorText || "Failed to update profile");
        }
        return;
      }

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();

    } catch (error) {
      console.error("Save failed", error);
      Alert.alert("Error", "An error occurred while saving your profile.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Religious Details</Text>

      <TextInput
        label="Religion"
        value={religion}
        onChangeText={setReligion}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Caste"
        value={community}
        onChangeText={setCommunity}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="SubCaste"
        value={subCaste}
        onChangeText={setSubCaste}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Gothra"
        value={gothra}
        onChangeText={setGothra}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Dosha"
        value={dosha}
        onChangeText={setDosha}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Star"
        value={star}
        onChangeText={setStar}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Rassi"
        value={rassi}
        onChangeText={setRassi}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Horoscope"
        value={horoscope}
        onChangeText={setHoroscope}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={saveProfile} style={styles.button}>
        Save Changes
      </Button>
    </ScrollView>
  );
};

export default EditReligiousInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    padding: 6,
  },
});
