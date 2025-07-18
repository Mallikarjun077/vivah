import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useNavigation, useRoute } from "@react-navigation/native";



const EditProfileScreen = () => {

  
  const navigation = useNavigation();
  const route = useRoute();

  const [profilePhoto,setProfilePhoto]=useState(route.params.profilePhoto)
  const [name, setName] = useState(route.params.name);
    const [surname, setSurname] = useState(route.params.surname);
  
  const [profession, setProfession] = useState(route.params.profession);
  const [about, setAbout] = useState(route.params.about);
const [age, setAge] = useState(route.params.age);
  const [height, setHeight] = useState(route.params.height);
  const [religion, setReligion] = useState(route.params.religion);
  const [motherTongue, setMotherTongue] = useState(route.params.motherTongue);
  const [community, setCommunity] = useState(route.params.community);
  const [city, setCity] = useState(route.params.city);
  

  const handleSave = () => {
    navigation.navigate("Profile", {
      updatedProfile: {
        profilePhoto,
        name,
        surname,
        profession,
        about,
           age,
      height,
      religion,
      motherTongue,
      community,
      city,
      },
    });
  };


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


  return (
    <ScrollView style={styles.scrollContainer}>
              <View style={styles.profileContainer}>
               <TouchableOpacity onPress={pickImage}>

      <Image source={profilePhoto} style={styles.profileImage}  />
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

      <Text style={styles.label}>About</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={about}
        onChangeText={setAbout}
        multiline
      />

      <Text style={styles.label}>Details</Text>
      {/* Row 1: Age & Height */}
<View style={styles.separatorContainer}>
  <View style={styles.line} />
  <View style={styles.gap} />
  <View style={styles.line} />
</View>
<View style={styles.columnContainer}>
  <View style={styles.column}>
    <Text style={styles.label}>Age</Text>
    <TextInput
      style={styles.input}
      value={age}
      onChangeText={setAge}
      keyboardType="numeric"
    />
  </View>
  <View style={styles.column}>
    <Text style={styles.label}>Height</Text>
    <TextInput
      style={styles.input}
      value={height}
      onChangeText={setHeight}
    />
  </View>
</View>

{/* Row 2: Religion & Mother Tongue */}
<View style={styles.separatorContainer}>
  <View style={styles.line} />
  <View style={styles.gap} />
  <View style={styles.line} />
</View>
<View style={styles.columnContainer}>
  <View style={styles.column}>
    <Text style={styles.label}>Religion</Text>
    <TextInput
      style={styles.input}
      value={religion}
      onChangeText={setReligion}
    />
  </View>
  <View style={styles.column}>
    <Text style={styles.label}>Mother Tongue</Text>
    <TextInput
      style={styles.input}
      value={motherTongue}
      onChangeText={setMotherTongue}
    />
  </View>
</View>

{/* Row 3: Community & City */}
<View style={styles.separatorContainer}>
  <View style={styles.line} />
  <View style={styles.gap} />
  <View style={styles.line} />
</View>
<View style={styles.columnContainer}>
  <View style={styles.column}>
    <Text style={styles.label}>Community</Text>
    <TextInput
      style={styles.input}
      value={community}
      onChangeText={setCommunity}
    />
  </View>
  <View style={styles.column}>
    <Text style={styles.label}>City</Text>
    <TextInput
      style={styles.input}
      value={city}
      onChangeText={setCity}
    />
  </View>
</View>

     
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 16 ,
    backgroundColor:"#F2F0E8",

  },
  scrollContainer: { 
    padding: 15, 
    paddingBottom: 200,
        backgroundColor:"#F2F0E8"

   },

  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    // borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor:"#E4DFD1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
    profileContainer: { alignItems: "center", marginTop:20 },

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
  row: { flexDirection: "row", justifyContent: "space-between" },
  detailBox: { flex: 1, marginRight: 10 },
  detailLabel: { color: "#9C854A", marginBottom: 4 },
  saveButton: {
    backgroundColor: "#f7ca36",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    marginBottom:40
  },
  saveText: { color: "black", fontWeight: "bold" },
});

export default EditProfileScreen;
