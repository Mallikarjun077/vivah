import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const EditReligionInfo = () => {
  const navigation = useNavigation();

  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [gothra, setGothra] = useState("");
  const [dosha, setDosha] = useState("");
  const [star, setStar] = useState("");
  const [rassi, setRassi] = useState("");
  const [horoscope, setHoroscope] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) {
        const data = JSON.parse(profile);
        setReligion(data.religion || "");
        setCaste(data.caste || "");
        setSubCaste(data.subCaste || "");
        setGothra(data.gothra || "");
        setDosha(data.dosha || "");
        setStar(data.star || "");
        setRassi(data.rassi || "");
        setHoroscope(data.horoscope || "");
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const stored = await AsyncStorage.getItem("userProfile");
    const profile = stored ? JSON.parse(stored) : {};
    const updated = {
      ...profile,
      religion,
      caste,
      subCaste,
      gothra,
      dosha,
      star,
      rassi,
      horoscope,
    };
    await AsyncStorage.setItem("userProfile", JSON.stringify(updated));
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Religion Information</Text>

      <Text style={styles.label}>Religion</Text>
      <View style={styles.picker}>
        <Picker selectedValue={religion} onValueChange={setReligion}>
          <Picker.Item label="Select Religion" value="" />
          <Picker.Item label="Hindu" value="Hindu" />
          <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Sikh" value="Sikh" />
          <Picker.Item label="Jain" value="Jain" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Caste</Text>
      <View style={styles.picker}>
        <Picker selectedValue={caste} onValueChange={setCaste}>
          <Picker.Item label="Select Caste" value="" />
          <Picker.Item label="Brahmin" value="Brahmin" />
          <Picker.Item label="Kshatriya" value="Kshatriya" />
          <Picker.Item label="Vaishya" value="Vaishya" />
          <Picker.Item label="Shudra" value="Shudra" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>SubCaste</Text>
      <View style={styles.picker}>
        <Picker selectedValue={subCaste} onValueChange={setSubCaste}>
          <Picker.Item label="Select SubCaste" value="" />
          <Picker.Item label="Iyer" value="Iyer" />
          <Picker.Item label="Iyengar" value="Iyengar" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Gothra</Text>
      <View style={styles.picker}>
        <Picker selectedValue={gothra} onValueChange={setGothra}>
          <Picker.Item label="Select Gothra" value="" />
          <Picker.Item label="Kashyapa" value="Kashyapa" />
          <Picker.Item label="Bharadwaj" value="Bharadwaj" />
          <Picker.Item label="Vashishtha" value="Vashishtha" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Dosha</Text>
      <View style={styles.picker}>
        <Picker selectedValue={dosha} onValueChange={setDosha}>
          <Picker.Item label="Select Dosha" value="" />
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Manglik" value="Manglik" />
          <Picker.Item label="Kalasarpa" value="Kalasarpa" />
          <Picker.Item label="Nadi" value="Nadi" />
        </Picker>
      </View>

      <Text style={styles.label}>Star</Text>
      <View style={styles.picker}>
        <Picker selectedValue={star} onValueChange={setStar}>
          <Picker.Item label="Select Star" value="" />
          <Picker.Item label="Ashwini" value="Ashwini" />
          <Picker.Item label="Bharani" value="Bharani" />
          <Picker.Item label="Krittika" value="Krittika" />
          <Picker.Item label="Rohini" value="Rohini" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Rassi</Text>
      <View style={styles.picker}>
        <Picker selectedValue={rassi} onValueChange={setRassi}>
          <Picker.Item label="Select Rassi" value="" />
          <Picker.Item label="Aries" value="Aries" />
          <Picker.Item label="Taurus" value="Taurus" />
          <Picker.Item label="Gemini" value="Gemini" />
          <Picker.Item label="Cancer" value="Cancer" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Horoscope Match Required?</Text>
      <View style={styles.picker}>
        <Picker selectedValue={horoscope} onValueChange={setHoroscope}>
          <Picker.Item label="Select Option" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Doesn't Matter" value="Doesn't Matter" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditReligionInfo;

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
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
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
