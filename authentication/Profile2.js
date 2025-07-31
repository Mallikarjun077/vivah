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

export default function PreProfileStep2() {
  const navigation = useNavigation();
  const route = useRoute();
  const previousData = route.params;

  const [form, setForm] = useState({
    religion: "",
    community: "",
    subCaste: "",
    gothra: "",
    dosha: "",
    star: "",
    rassi: "",
    horoscope: "",
  });

  const [religionOptions, setReligionOptions] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const baseUrl = "https://backend-1-hccr.onrender.com/api/masters";

        const relRes = await fetch(`${baseUrl}/religion`);
        setReligionOptions(await relRes.json());

        const casteRes = await fetch(`${baseUrl}/caste`);
        setCasteOptions(await casteRes.json());
      } catch (err) {
        console.error("Error fetching religious master data", err);
      }
    };

    fetchMasters();
  }, []);

  const handleNext = () => {
    if (!form.religion || !form.caste || !form.star) {
      Alert.alert("Validation", "Please fill Religion, Caste, and Star.");
      return;
    }

    navigation.navigate("PreProfileStep3", { ...previousData, ...form });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Step 2: Religious Info</Text>

        <Text style={styles.label}>Religion *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.religion}
            onValueChange={(value) => setForm({ ...form, religion: value })}
          >
            <Picker.Item label="Select Religion" value="" />
            {religionOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Caste *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.caste}
            onValueChange={(value) => setForm({ ...form, caste: value })}
          >
            <Picker.Item label="Select Caste" value="" />
            {casteOptions.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Sub Caste"
          mode="outlined"
          value={form.subCaste}
          onChangeText={(text) => setForm({ ...form, subCaste: text })}
          style={styles.input}
        />
        <TextInput
          label="Gothra"
          mode="outlined"
          value={form.gothra}
          onChangeText={(text) => setForm({ ...form, gothra: text })}
          style={styles.input}
        />
        <TextInput
          label="Dosha"
          mode="outlined"
          value={form.dosha}
          onChangeText={(text) => setForm({ ...form, dosha: text })}
          style={styles.input}
        />
        <TextInput
          label="Star *"
          mode="outlined"
          value={form.star}
          onChangeText={(text) => setForm({ ...form, star: text })}
          style={styles.input}
        />
        <TextInput
          label="Rassi"
          mode="outlined"
          value={form.rassi}
          onChangeText={(text) => setForm({ ...form, rassi: text })}
          style={styles.input}
        />
        <TextInput
          label="Horoscope"
          mode="outlined"
          value={form.horoscope}
          onChangeText={(text) => setForm({ ...form, horoscope: text })}
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
