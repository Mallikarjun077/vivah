import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function PreProfileStep1() {
  const route = useRoute();
  const { email, username, password } = route.params || {};

  const [form, setForm] = useState({
    name: "",
    surname: "",
    gender: "",
    dob: "",
    age: "",
    height: "",
    eatingHabits: "",
    motherTongue: "",
    languagesKnown: "",
    mobile: "",
    socialMedia: "",
    image_base64: null,
  });

  const [imageUri, setImageUri] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const [genderOptions, setGenderOptions] = useState([]);
  const [motherTongueOptions, setMotherTongueOptions] = useState([]);
  const [languagesKnownOptions, setLanguagesKnownOptions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please allow media access.");
      }
    })();

    const fetchMasters = async () => {
      try {
        const backendUrl = "https://backend-1-hccr.onrender.com/api/masters";

        const [genderRes, motherRes, langRes] = await Promise.all([
          fetch(`${backendUrl}/gender`),
          fetch(`${backendUrl}/mother_tongue`),
          fetch(`${backendUrl}/language`),
        ]);

        setGenderOptions(await genderRes.json());
        setMotherTongueOptions(await motherRes.json());
        setLanguagesKnownOptions(await langRes.json());
      } catch (err) {
        console.error("Error fetching master data:", err);
      }
    };

    fetchMasters();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const picked = result.assets[0];
      setForm({ ...form, image_base64: picked.base64 });
      setImageUri(`data:image/jpeg;base64,${picked.base64}`);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const dob = moment(selectedDate).format("YYYY-MM-DD");
      const age = moment().diff(moment(selectedDate), "years");
      setForm({ ...form, dob, age: age.toString() });
    }
  };

  const handleNext = () => {
    if (!form.name || !form.gender || !form.age) {
      Alert.alert("Validation", "Please fill in Name, Gender and Age.");
      return;
    }

    navigation.navigate("PreProfileStep2", {
      ...form,
      email,
      username,
      password,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Step 1: Personal Info</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>

        <Text style={styles.photoHint}>Tap to add profile photo</Text>

        <TextInput
          label="Full Name"
          mode="outlined"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={styles.input}
        />
   <TextInput
          label="Surname Name"
          mode="outlined"
          value={form.surname}
          onChangeText={(text) => setForm({ ...form, surname: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.gender}
            onValueChange={(value) => setForm({ ...form, gender: value })}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            {genderOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            label="DOB"
            mode="outlined"
            value={form.dob}
            editable={false}
            style={styles.input}
            right={<TextInput.Icon icon="calendar" />}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <TextInput
          label="Age"
          mode="outlined"
          keyboardType="numeric"
          value={form.age}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.label}>Mother Tongue</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.motherTongue}
            onValueChange={(value) => setForm({ ...form, motherTongue: value })}
            style={styles.picker}
          >
            <Picker.Item label="Select Mother Tongue" value="" />
            {motherTongueOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Languages Known</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.languagesKnown}
            onValueChange={(value) => setForm({ ...form, languagesKnown: value })}
            style={styles.picker}
          >
            <Picker.Item label="Select Language" value="" />
            {languagesKnownOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Mobile Number"
          mode="outlined"
          keyboardType="phone-pad"
          value={form.mobile}
          onChangeText={(text) => setForm({ ...form, mobile: text })}
          style={styles.input}
        />

        <TextInput
          label="Instagram / Facebook Link"
          mode="outlined"
          value={form.socialMedia}
          onChangeText={(text) => setForm({ ...form, socialMedia: text })}
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
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    paddingBottom: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1a1a1a",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 6,
    marginTop: 6,
    fontSize: 14,
    color: "#555",
  },
  pickerWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  imagePicker: {
    marginBottom: 10,
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  photoHint: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    width: "100%",
    borderRadius: 12,
  },
});
