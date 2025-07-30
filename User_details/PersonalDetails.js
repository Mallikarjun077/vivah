import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Text, Button, HelperText } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Create context/AuthContext";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
const validateRequired = (value) => value && value.trim().length > 0;
const validateAge = (age) => age >= 18 && age <= 120;
const validateHeight = (height) => height >= 100 && height <= 250;

export default function ProfileForm({ navigation }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilePhoto, setProfilePhoto] = useState({
    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    base64: null,
  });

  const [form, setForm] = useState({
    name: "",
    surname: "",
    profession: "",
    about: "",
    age: "",
    height: "",
    religion: "",
    motherTongue: "",
    community: "",
    city: "",
    maritalStatus: "",
    eatingHabits: "",
    subCaste: "",
    gothra: "",
    dosha: "",
    star: "",
    rassi: "",
    horoscope: "",
    qualification: "",
    jobSector: "",
    income: "",
    familyStatus: "",
    familyType: "",
    fatherOccupation: "",
    motherOccupation: "",
    brothers: "",
    sisters: "",
    country: "",
    state: "",
    ancestralOrigin: "",
    mobile: "",
    socialMedia: "",
    dob: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateRequired(form.name)) newErrors.name = "Name is required";
    if (!validateRequired(form.surname)) newErrors.surname = "Surname is required";
    if (!validateRequired(form.mobile)) {
      newErrors.mobile = "Mobile is required";
    } else if (!validateMobile(form.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    if (form.age && !validateAge(Number(form.age))) newErrors.age = "Age must be 18-120";
    if (form.height && !validateHeight(Number(form.height))) newErrors.height = "Height must be 100-250cm";
    if (!profilePhoto.base64) newErrors.profilePhoto = "Profile photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processImage = async (uri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      let compressedUri = uri;
      if (fileInfo.size > 1000000) {
        const result = await ImageManipulator.manipulateAsync(uri, [], {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        });
        compressedUri = result.uri;
      }
      const base64 = await FileSystem.readAsStringAsync(compressedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Image processing error:", error);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const base64 = await processImage(uri);
        setProfilePhoto({ uri, base64 });
        setErrors((prev) => ({ ...prev, profilePhoto: null }));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image");
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const profileData = {
        email: user?.email,
        ...form,
        image_base64: profilePhoto.base64,
      };
      const response = await fetch("https://backend-1-hccr.onrender.com/api/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Profile saved successfully");
        navigation.navigate("Home");
      } else {
        Alert.alert("Failed", data.message || "Failed to save profile");

      }
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to save profile");

    } finally {
      setIsLoading(false);
    }
  };


  
  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Profile Details</Text>

        <View style={styles.imageContainer}>
          <Image source={{ uri: profilePhoto.uri }} style={styles.profileImage} />
          <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
          {errors.profilePhoto && (
            <Text style={styles.errorText}>{errors.profilePhoto}</Text>
          )}
        </View>

        {/* BASIC */}
        <TextInput
          label="Name *"
          value={form.name}
          onChangeText={(val) => handleChange("name", val)}
          mode="outlined"
          style={styles.input}
          error={!!errors.name}
        />
        <HelperText type="error" visible={!!errors.name}>{errors.name}</HelperText>

        <TextInput
          label="Surname *"
          value={form.surname}
          onChangeText={(val) => handleChange("surname", val)}
          mode="outlined"
          style={styles.input}
          error={!!errors.surname}
        />
        <HelperText type="error" visible={!!errors.surname}>{errors.surname}</HelperText>

        <TextInput
          label="Mobile *"
          value={form.mobile}
          onChangeText={(val) => handleChange("mobile", val)}
          keyboardType="phone-pad"
          mode="outlined"
          style={styles.input}
          error={!!errors.mobile}
        />
        <HelperText type="error" visible={!!errors.mobile}>{errors.mobile}</HelperText>

        {/* <TextInput
          label="DOB"
          value={form.dob}
          onChangeText={(val) => handleChange("dob", val)}
          mode="outlined"
          style={styles.input}
        /> */}

        <TextInput
          label="Age"
          value={form.age}
          onChangeText={(val) => handleChange("age", val)}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          error={!!errors.age}
        />
        <HelperText type="error" visible={!!errors.age}>{errors.age}</HelperText>

        <TextInput
          label="Height (cm)"
          value={form.height}
          onChangeText={(val) => handleChange("height", val)}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          error={!!errors.height}
        />
        <HelperText type="error" visible={!!errors.height}>{errors.height}</HelperText>

        {/* <TextInput
          label="About"
          value={form.about}
          onChangeText={(val) => handleChange("about", val)}
          mode="outlined"
          style={styles.input}
          multiline
        /> */}

        {/* DROPDOWNS & TEXT INPUTS */}
        {/* <TextInput
          label="Religion"
          value={form.religion}
          onChangeText={(val) => handleChange("religion", val)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput label="Community" value={form.community} onChangeText={(val) => handleChange("community", val)} mode="outlined" style={styles.input} />
        <TextInput label="Sub-Caste" value={form.subCaste} onChangeText={(val) => handleChange("subCaste", val)} mode="outlined" style={styles.input} />
        <TextInput label="Gothra" value={form.gothra} onChangeText={(val) => handleChange("gothra", val)} mode="outlined" style={styles.input} />
        <TextInput label="Dosha" value={form.dosha} onChangeText={(val) => handleChange("dosha", val)} mode="outlined" style={styles.input} />
        <TextInput label="Star" value={form.star} onChangeText={(val) => handleChange("star", val)} mode="outlined" style={styles.input} />
        <TextInput label="Rassi" value={form.rassi} onChangeText={(val) => handleChange("rassi", val)} mode="outlined" style={styles.input} />
        <TextInput label="Horoscope" value={form.horoscope} onChangeText={(val) => handleChange("horoscope", val)} mode="outlined" style={styles.input} />

        <TextInput label="Mother Tongue" value={form.motherTongue} onChangeText={(val) => handleChange("motherTongue", val)} mode="outlined" style={styles.input} />
        <TextInput label="Marital Status" value={form.maritalStatus} onChangeText={(val) => handleChange("maritalStatus", val)} mode="outlined" style={styles.input} />
        <TextInput label="Eating Habits" value={form.eatingHabits} onChangeText={(val) => handleChange("eatingHabits", val)} mode="outlined" style={styles.input} />

        <TextInput label="City" value={form.city} onChangeText={(val) => handleChange("city", val)} mode="outlined" style={styles.input} />
        <TextInput label="State" value={form.state} onChangeText={(val) => handleChange("state", val)} mode="outlined" style={styles.input} />
        <TextInput label="Country" value={form.country} onChangeText={(val) => handleChange("country", val)} mode="outlined" style={styles.input} />
        <TextInput label="Ancestral Origin" value={form.ancestralOrigin} onChangeText={(val) => handleChange("ancestralOrigin", val)} mode="outlined" style={styles.input} />

        <TextInput label="Profession" value={form.profession} onChangeText={(val) => handleChange("profession", val)} mode="outlined" style={styles.input} />
        <TextInput label="Qualification" value={form.qualification} onChangeText={(val) => handleChange("qualification", val)} mode="outlined" style={styles.input} />
        <TextInput label="Job Sector" value={form.jobSector} onChangeText={(val) => handleChange("jobSector", val)} mode="outlined" style={styles.input} />
        <TextInput label="Income" value={form.income} onChangeText={(val) => handleChange("income", val)} keyboardType="numeric" mode="outlined" style={styles.input} />

        <TextInput label="Family Status" value={form.familyStatus} onChangeText={(val) => handleChange("familyStatus", val)} mode="outlined" style={styles.input} />
        <TextInput label="Family Type" value={form.familyType} onChangeText={(val) => handleChange("familyType", val)} mode="outlined" style={styles.input} />
        <TextInput label="Father Occupation" value={form.fatherOccupation} onChangeText={(val) => handleChange("fatherOccupation", val)} mode="outlined" style={styles.input} />
        <TextInput label="Mother Occupation" value={form.motherOccupation} onChangeText={(val) => handleChange("motherOccupation", val)} mode="outlined" style={styles.input} />
        <TextInput label="Brothers" value={form.brothers} onChangeText={(val) => handleChange("brothers", val)} keyboardType="numeric" mode="outlined" style={styles.input} />
        <TextInput label="Sisters" value={form.sisters} onChangeText={(val) => handleChange("sisters", val)} keyboardType="numeric" mode="outlined" style={styles.input} />
        <TextInput label="Social Media" value={form.socialMedia} onChangeText={(val) => handleChange("socialMedia", val)} mode="outlined" style={styles.input} /> */}

        <Button
          mode="contained"
          onPress={handleSave}
          disabled={isLoading}
          style={styles.submitButton}
        >
          {isLoading ? "Saving..." : "Submit Profile"}
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
}


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 100,
    backgroundColor: "#333",
    padding: 6,
    borderRadius: 20,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
});
