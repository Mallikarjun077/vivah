import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [profilePhoto, setProfilePhoto] = useState(route.params?.profilePhoto);
  const [name, setName] = useState(route.params?.name || "");
  const [surname, setSurname] = useState(route.params?.surname || "");
  const [profession, setProfession] = useState(route.params?.profession || "");
  const [age, setAge] = useState(route.params?.age || "");
  const [religion, setReligion] = useState(route.params?.religion || "");

  // Convert image URI to base64
  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Failed to convert image to base64:", error);
      return null;
    }
  };

  // Launch image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePhoto({ uri });
    }
  };

  // Save profile to API
 const handleSave = async () => {
  if (!name || !age || !religion) {
    Alert.alert("Missing Fields", "Please fill in all required fields.");
    return;
  }

  let base64Photo = null;

  if (profilePhoto?.uri) {
    base64Photo = await convertToBase64(profilePhoto.uri);
  }

  try {
    const token = await AsyncStorage.getItem("token");

    console.log("Token:", token);

    const response = await fetch("https://backend-1-hccr.onrender.com/api/pre-profile/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        surname,
        profession,
        age,
        religion,
        image_base64: base64Photo,

      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (err) {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      Alert.alert("Error", "Server returned non-JSON data.");
      return;
    }

    if (response.ok) {
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Profile", { updatedProfile: data });
    } else {
      console.error("Error data:", data);
      Alert.alert("Error", data.detail || "Failed to update profile");
    }
  } catch (error) {
    console.error("Update failed:", error);
    Alert.alert("Error", "An unexpected error occurred.");
  }
};

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
         
         <Image
  source={
    profilePhoto?.image_base64
      ? { uri: `data:image/jpeg;base64,${profilePhoto.image_base64}` }
      : profilePhoto?.uri
      ? { uri: profilePhoto.uri }
      : require("../assets/men.png")
  }
  style={styles.profileImage}
/>

          <Ionicons
            name="camera"
            size={24}
            color="white"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Surname</Text>
      <TextInput style={styles.input} value={surname} onChangeText={setSurname} />

      <Text style={styles.label}>Profession</Text>
      <TextInput style={styles.input} value={profession} onChangeText={setProfession} />

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <View style={styles.gap} />
        <View style={styles.line} />
      </View>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <View style={styles.gap} />
        <View style={styles.line} />
      </View>

      <Text style={styles.label}>Religion</Text>
      <TextInput
        style={styles.input}
        value={religion}
        onChangeText={setReligion}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 15,
    paddingBottom: 200,
    backgroundColor: "#F2F0E8",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderColor: "#ccc",
    backgroundColor: "#E4DFD1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 3,
    left: 85,
    backgroundColor: "#0008",
    padding: 4,
    borderRadius: 20,
  },
 
 
 
  saveButton: {
    backgroundColor: "#f7ca36",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  saveText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
