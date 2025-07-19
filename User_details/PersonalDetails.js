import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import { useState, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Create context/AuthContext";
import * as ImageManipulator from 'expo-image-manipulator';


// Validation helper functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
const validateRequired = (value) => value && value.trim().length > 0;
const validateAge = (age) => age >= 18 && age <= 120;
const validateHeight = (height) => height >= 100 && height <= 250; // in cm

export default function ProfileForm({ navigation }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilePhoto, setProfilePhoto] = useState({
    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    base64: null
  });

  // Form state
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
    dob: ""
  });

  // Handle form field changes
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!validateRequired(form.name)) newErrors.name = "Name is required";
    if (!validateRequired(form.surname)) newErrors.surname = "Surname is required";
    if (!validateRequired(form.mobile)) {
      newErrors.mobile = "Mobile is required";
    } else if (!validateMobile(form.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }
    
    // Numeric validations
    if (form.age && !validateAge(Number(form.age))) {
      newErrors.age = "Age must be between 18-120";
    }
    if (form.height && !validateHeight(Number(form.height))) {
      newErrors.height = "Height must be between 100-250 cm";
    }
    
    // Image validation
    if (!profilePhoto.base64) {
      newErrors.profilePhoto = "Profile photo is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Optimized image compression and base64 conversion
  const processImage = async (uri) => {
    try {
        // Get image info
        const fileInfo = await FileSystem.getInfoAsync(uri);

        // Compress if image is too large (> 1MB)
        let compressedUri = uri;
        if (fileInfo.size > 1000000) {
            const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
                compress: 0.7,
                format: ImageManipulator.SaveFormat.JPEG,
            });
            compressedUri = manipResult.uri;
        }

        // Read as base64
        const base64 = await FileSystem.readAsStringAsync(compressedUri, {
            encoding: FileSystem.EncodingType.Base64
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
            base64: true
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const base64 = await processImage(uri);

            setProfilePhoto({
                uri,
                base64
            });

            // Clear any previous image error
            setErrors(prev => ({ ...prev, profilePhoto: null }));
        }
    } catch (error) {
        Alert.alert("Error", "Failed to process image");
        console.error(error);
    }
};
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const profileData = {
        email: user?.email,
        ...form,
        image_base64: profilePhoto.base64
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
          <Text style={styles.title}>Your Profile Details:</Text>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: profilePhoto.uri }}
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
              <Ionicons name="camera" size={24} color="white" />
            </TouchableOpacity>
            {errors.profilePhoto && (
              <Text style={styles.errorText}>{errors.profilePhoto}</Text>
            )}
          </View>

          {/* Required Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <TextInput
              placeholder="Name *"
              value={form.name}
              onChangeText={(val) => handleChange("name", val)}
              style={[styles.input, errors.name && styles.errorInput]}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              placeholder="Surname *"
              value={form.surname}
              onChangeText={(val) => handleChange("surname", val)}
              style={[styles.input, errors.surname && styles.errorInput]}
            />
            {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}

            <TextInput
              placeholder="Mobile *"
              value={form.mobile}
              onChangeText={(val) => handleChange("mobile", val)}
              keyboardType="phone-pad"
              style={[styles.input, errors.mobile && styles.errorInput]}
            />
            {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
          </View>

          {/* Other Fields */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TextInput
              placeholder="Age"
              value={form.age}
              onChangeText={(val) => handleChange("age", val)}
              keyboardType="numeric"
              style={[styles.input, errors.age && styles.errorInput]}
            />
            {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

            <TextInput
              placeholder="Height (cm)"
              value={form.height}
              onChangeText={(val) => handleChange("height", val)}
              keyboardType="numeric"
              style={[styles.input, errors.height && styles.errorInput]}
            />
            {errors.height && <Text style={styles.errorText}>{errors.height}</Text>}
            
            {/* Add other fields similarly */}
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  cameraButton: {
    position: 'absolute',
    bottom: 5,
    right: 95,
    backgroundColor: '#575858ff',
    borderRadius: 20,
    padding: 8,
  },
});