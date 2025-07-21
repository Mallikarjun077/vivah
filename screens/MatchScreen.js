import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Create context/AuthContext";

const MatchScreen = () => {
  const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');


  const [open, setOpen] = useState(false);
  const [openReligion, setOpenReligion] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // const [searchQuery, setSearchQuery] = useState("");

  const [items, setItems] = useState([
    { label: "20", value: "20" },
    { label: "25", value: "25" },
    { label: "28", value: "28" },
    { label: "30", value: "30" },
  ]);
  const [religionItems, setReligionItems] = useState([
    { label: "Hindu", value: "Hindu" },
    { label: "Muslim", value: "Muslim" },
    { label: "Christian", value: "Christian" },
  ]);
  const [locationItems, setLocationItems] = useState([
    { label: "Chennai", value: "Chennai" },
    { label: "Bangalore", value: "Bangalore" },
    { label: "Hyderabad", value: "Hyderabad" },
  ]);
  const [jobItems, setJobItems] = useState([
    { label: "Software", value: "Software" },
    { label: "Govt Employee", value: "Govt Employee" },
    { label: "Teacher", value: "Teacher" },
  ]);

const [profiles, setProfiles] = useState([]);
const { user } = useContext(AuthContext); // ✅ This must be inside the component



 
useEffect(() => {
  const fetchProfiles = async () => {
    try {
      const response = await fetch("https://backend-1-hccr.onrender.com/api/all-profiles/", {
        headers: {
          Authorization: `Bearer ${user?.access}`,
        },
      });

      const data = await response.json();
      setProfiles(data);
      console.log("Fetched Profiles:", data); 
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  fetchProfiles();
}, []);

const filteredProfiles = Array.isArray(profiles)
  ? profiles.filter((profile) => {
      const matchName = profile.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchAge = selectedGender ? profile.age === selectedGender : true;
      const matchReligion = selectedReligion
        ? profile.religion === selectedReligion
        : true;
      const matchLocation = selectedLocation
        ? profile.location === selectedLocation
        : true;

      return matchName && matchAge && matchReligion && matchLocation;
    })
  : [];


  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#9C854A" />
        <TextInput
          label={"Search by name or ID"}
          mode="outlined"
          placeholder="Search by name or ID"
          placeholderTextColor="#9C854A"
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Horizontal Scroll Dropdowns */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dropdownWrapper}
      >
        {/* Age Dropdown */}
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={open}
            value={selectedGender}
            items={items}
            setOpen={(o) => {
              setOpen(o);
              setOpenReligion(false);
              setOpenLocation(false);
            }}
            setValue={setSelectedGender}
            setItems={setItems}
            placeholder="Age"
            style={styles.picker}
            dropDownContainerStyle={styles.dropContainer}
            listMode="MODAL"
          />
        </View>

        {/* Religion Dropdown */}
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={openReligion}
            value={selectedReligion}
            items={religionItems}
            setOpen={(o) => {
              setOpenReligion(o);
              setOpen(false);
              setOpenLocation(false);
            }}
            setValue={setSelectedReligion}
            setItems={setReligionItems}
            placeholder="Religion"
            style={styles.picker}
            dropDownContainerStyle={styles.dropContainer}
            listMode="MODAL"
          />
        </View>

        {/* Location Dropdown */}
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={openLocation}
            value={selectedLocation}
            items={locationItems}
            setOpen={(o) => {
              setOpenLocation(o);
              setOpen(false);
              setOpenReligion(false);
            }}
            setValue={setSelectedLocation}
            setItems={setLocationItems}
            placeholder="Location"
            style={styles.picker}
            dropDownContainerStyle={styles.dropContainer}
            listMode="MODAL"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            open={openLocation}
            value={selectedJob}
            items={jobItems}
            setOpen={(o) => {
              setOpenLocation(o);
              setOpen(false);
              setOpenReligion(false);
            }}
            setValue={setSelectedJob}
            setItems={setJobItems}
            placeholder="Job"
            style={styles.picker}
            dropDownContainerStyle={styles.dropContainer}
            listMode="MODAL"
          />
        </View>
      </ScrollView>

      {/* Profiles List */}
      <Text style={styles.head}>Profiles for you</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {filteredProfiles.map((profile, index) => (
          <TouchableOpacity
            key={profile.id ? profile.id.toString() : index.toString()}
            onPress={() => navigation.navigate("Partner", { profile })}
          >
            <View style={styles.profileRow}>
              <View style={styles.textSection}>
                <Text style={styles.label}>Premium</Text>
                <Text style={styles.value}>
                  {profile.name},{profile.age }
                </Text>
                <Text style={styles.value1}>
                  {profile.religion}, {profile.location}
                </Text>
              </View>
              
<Image
  source={
    profile.image
      ? { uri: `data:image/jpeg;base64,${profile.image}` }
      : require("../assets/men.png") // fallback if image is missing
  }
  style={styles.profileImage}
/>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={25} color="#9C854A" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Matches")}
        >
          <Ionicons name="people" size={25} color="#1C170D" />
          <Text style={[styles.iconLabel, { color: "#1C170D" }]}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={25} color="#9C854A" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F0E8", padding: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: "#E4DFD1",
    marginBottom: 12,
  },
  searchBar: { flex: 1, fontSize: 16, color: "#333" },
  dropdownWrapper: {
    flexDirection: "row",
    paddingVertical: 5,
    columnGap: 10,
  },
  dropdownContainer: {
    width: 120,
    height: 50,
    marginBottom:15,
  },
  picker: {
    backgroundColor: "#E4DFD1",
    borderWidth: 0,
    height: 40,
  },
  dropContainer: {
    backgroundColor: "#E4DFD1",
    borderWidth: 0,
  },
  head: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1C170D",
    padding: 10,
    marginTop: 10,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  profileImage: {
    height: 90,
    width: 130,
    borderRadius: 15,
  },
  textSection: {
    flex: 1,
    marginRight: 10,
  },
  label: { color: "#9C854A", fontSize: 16 },
  value: { color: "#1C170D", fontWeight: "900", fontSize: 16 },
  value1: { color: "#9C854A", fontSize: 16 },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F2F0E8",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconButton: { alignItems: "center" },
  iconLabel: { fontSize: 14, color: "#9C854A", marginTop: 4 },
});

export default MatchScreen;
