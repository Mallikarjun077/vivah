import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const API_URL = "https://backend-1-hccr.onrender.com/api/profile/"; // <-- FastAPI base URL

const getProfile = async () => {
  const storedUser = await AsyncStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const token = user?.access;

  console.log("Token being sent:", token);

  if (!token) {
    console.warn("No token found.");
    return null;
  }

  const res = await fetch("https://backend-1-hccr.onrender.com/api/profile/", {
    method: "GET", // ✅ RESTful method
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) {
    console.error(" Forbidden: Token expired or invalid");
    return null;
  }

  const data = await res.json();
  console.log("✅ Profile Data:", data);
  console.log("Loaded profile photo URL:", data.profilePhoto);
  console.log("✅ Full profile response:", data);


  return data;
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [fullScreenPhotoUri, setFullScreenPhotoUri] = useState(null);

  const [profilePhoto, setProfilePhoto] = useState(
    require("../assets/men.png")
  );
  const [surname, setSurname] = useState("");
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [religion, setReligion] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [community, setCommunity] = useState("");
  const [city, setCity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [eatingHabits, setEatingHabits] = useState("");
  const [subCaste, setSubCaste] = useState("");
  const [gothra, setGothra] = useState("");
  const [dosha, setDosha] = useState("");
  const [star, setStar] = useState("");
  const [rassi, setRassi] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [qualification, setQualification] = useState("");
  const [jobSector, setJobSector] = useState("");
  const [income, setIncome] = useState("");
  const [familyStatus, setFamilyStatus] = useState("");
  const [familyType, setFamilyType] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [brothers, setBrothers] = useState("");
  const [sisters, setSisters] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [ancestralOrigin, setAncestralOrigin] = useState("");
  const [mobile, setMobile] = useState("");
  const [socialMedia, setSocialMedia] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile();
      if (data) {
        
if (data.image || data.image_path) {
  const imageStr = data.image_path || data.image;

  if (imageStr.startsWith("data:image")) {
    // Already base64 with prefix
    setProfilePhoto({ uri: imageStr });
  } else if (imageStr.length > 100) {
    // Assume it's base64 but without prefix
    setProfilePhoto({ uri: `data:image/jpeg;base64,${imageStr}` });
  } else {
    console.warn("⚠️ Image string too short or invalid");
    setProfilePhoto(require('../assets/men.png'));
  }
} else {
  console.warn("⚠️ No image in response.");
  setProfilePhoto(require('../assets/men.png'));
}


        setName(data.name || "");
        setSurname(data.surname || "Not provided");
        setAge(data.age || "Not provided");
        setHeight(data.height || "Not provided");
        setMotherTongue(data.motherTongue || "Not Provided");
        setMaritalStatus(data.maritalStatus || "Not Provided");
        setEatingHabits(data.eatingHabits || "Not Provided");
        setReligion(data.religion || "Not Provided");
        setCommunity(data.community || "Not Provided");
        setSubCaste(data.subCaste || "Not Provided");
        setGothra(data.gothra || "Not Provided");
        setDosha(data.dosha || "Not Provided");
        setStar(data.star || "Not Provided");
        setRassi(data.rassi || "Not Provided");
        setHoroscope(data.horoscope || "Not Provided");
        setProfession(data.profession || "Not Provided");
        setQualification(data.qualification || "Not Provided");
        setJobSector(data.jobSector || "Not Provided");
        setIncome(data.income || "Not Provided");
        setFamilyStatus(data.familyStatus || "Not Provided");
        setFamilyType(data.familyType || "Not Provided");
        setFatherOccupation(data.fatherOccupation || "Not Provided");
        setMotherOccupation(data.motherOccupation || "Not Provided");
        setBrothers(data.brothers || "Not Provided");
        setSisters(data.sisters || "Not Provided");
        setCountry(data.country || "Not Provided");
        setState(data.state || "Not Provided");
        setCity(data.city || "Not Provided");
        setAncestralOrigin(data.ancestralOrigin || "Not Provided");
        setMobile(data.mobile || "Not Provided");
        setSocialMedia(data.socialMedia || "Not Provided");
        setAbout(data.about || "Not Provided");
        // setProfilePhoto({ uri: data.profile_photo });
        // setPhotos(data.photos?.map((uri) => ({ uri })) || []);

        await AsyncStorage.setItem("userProfile", JSON.stringify(data));
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("user"); // adjust key if needed

      const body = {
        name,
        surname,
        age,
        height,
        maritalStatus,
        eatingHabits,
        religion,
        community,
        subCaste,
        gothra,
        dosha,
        star,
        rassi,
        horoscope,
        profession,
        qualification,
        jobSector,
        income,
        familyStatus,
        familyType,
        fatherOccupation,
        motherOccupation,
        brothers,
        sisters,
        country,
        state,
        city,
        ancestralOrigin,
        mobile,
        socialMedia,
        about,
        // profile_photo: profilePhoto?.uri,
        // photos: photos.map((p) => p.uri),
      };

      const res = await fetch(API_URL, {
        method: "POST", // or "PUT" based on your backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Auto-save error:", data);
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveProfile();
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeout);
  }, [
    // profilePhoto,
    name,
    surname,
    age,
    height,
    motherTongue,
    maritalStatus,
    eatingHabits,
    religion,
    community,
    subCaste,
    gothra,
    dosha,
    star,
    rassi,
    horoscope,
    profession,
    qualification,
    jobSector,
    income,
    familyStatus,
    familyType,
    fatherOccupation,
    motherOccupation,
    brothers,
    sisters,
    country,
    state,
    city,
    ancestralOrigin,
    mobile,
    socialMedia,
    about,
    // profile_photo: profilePhoto?.uri,
    // photos: photos.map((p) => p.uri),
  ]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <View>
            <Image
  source={
    profilePhoto
      ? profilePhoto
      : require("../assets/men2.png")
  }
  style={styles.profileImage}
/>

          </View>
          <View>
            <View style={styles.surname}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.name}>{surname}</Text>
            </View>
            <View style={styles.caste}>
              {/* <Text style={styles.profession}>{religion} |</Text> */}

              <Text style={styles.profession}>Caste - {community}</Text>
            </View>
            <View style={styles.caste}>
              <Text style={styles.profession}>Age - {age} yrs</Text>
              {/* <Text style={styles.profession}>{height} in feet </Text> */}
            </View>
            {/* <View style={styles.caste}>
              <Text style={styles.profession}>{motherTongue} |</Text>
              <Text style={styles.profession}>{city} </Text>
            </View> */}
            <View style={styles.caste}>
              <Text style={styles.profession}>Profession - {profession} </Text>
              {/* <Text style={styles.profession}>{profession}  </Text> */}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("EditProfile", {
              name,
              surname,
              age,
              height,
              motherTongue,
              maritalStatus,
              eatingHabits,
              religion,
              community,
              subCaste,
              gothra,
              dosha,
              star,
              rassi,
              horoscope,
              profession,
              qualification,
              jobSector,
              income,
              familyStatus,
              familyType,
              fatherOccupation,
              motherOccupation,
              brothers,
              sisters,
              country,
              state,
              city,
              ancestralOrigin,
              mobile,
              socialMedia,
              about,
              profile_photo: profilePhoto?.uri,
              photos: photos.map((p) => p.uri),
            })
          }
        >
          <Ionicons name="create-outline" size={18} color="#1C170D" />
        </TouchableOpacity>

        {/* <Text style={styles.head}>About</Text>
        <Text style={styles.head1}>{about}</Text> */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Ionicons
              name={isEditing ? "checkmark-outline" : "create-outline"}
              size={20}
              color="#1C170D"
            />
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <TextInput
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              color: "#1C170D",
              minHeight: 100,
              marginBottom: 10,
              textAlignVertical: "top",
            }}
            multiline
            value={about}
            onChangeText={setAbout}
            placeholder="Write about yourself..."
          />
        ) : (
          <TextInput
            style={{
              backgroundColor: "#E4DFD1",
              borderRadius: 10,
              padding: 10,
              fontSize: 16,
              color: "#9C854A",
              minHeight: 100,
              marginBottom: 10,
              textAlignVertical: "top",
            }}
            multiline
            value={about}
            // onChangeText={setAbout}
            placeholder="Write about yourself..."
          />
        )}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Add Photos</Text>
        </View>
        <FlatList
          horizontal
          data={photos}
          renderItem={({ item, index }) => (
            <View style={styles.photoItemWrapper}>
              <TouchableOpacity onPress={() => setFullScreenPhotoUri(item.uri)}>
                <Image source={{ uri: item.uri }} style={styles.photoItem} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => {
                  Alert.alert(
                    "Delete Photo",
                    "Are you sure you want to delete this photo?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          setPhotos((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                          if (fullScreenPhotoUri === item.uri)
                            setFullScreenPhotoUri(null);
                        },
                      },
                    ]
                  );
                }}
              >
                <Ionicons name="trash" size={22} color="#1C170D" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={() => pickImage(false)}
            >
              <Ionicons name="add" size={30} color="#9C854A" />
            </TouchableOpacity>
          }
        />

        {fullScreenPhotoUri && (
          <View style={styles.fullScreenOverlay}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFullScreenPhotoUri(null)}
            >
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <Image
              source={{ uri: profilePhoto }}
              style={styles.profilePhoto}
            />
          </View>
        )}

        {/* <Text style={styles.head}>Details</Text> */}

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileEdit", { section: "personal" })
            }
          >
            <Ionicons name="create-outline" size={18} color="#1C170D" />
          </TouchableOpacity>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Date Of Birth</Text>
            <Text style={styles.value}>{age} </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>{height}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{maritalStatus} years</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Eating Habits</Text>
            <Text style={styles.value}>{eatingHabits}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>
        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>MotherTongue</Text>
            <Text style={styles.value}>{motherTongue}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Languages Knows</Text>
            <Text style={styles.value}>{height}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Religion Information</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReligionEdit", { section: "personal" })
            }
          >
            <Ionicons name="create-outline" size={18} color="#1C170D" />
          </TouchableOpacity>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Religion</Text>
            <Text style={styles.value}>{religion}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Caste</Text>
            <Text style={styles.value}>{community}</Text>
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
            <Text style={styles.label}>SubCaste</Text>
            <Text style={styles.value}>{subCaste}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Gothra</Text>
            <Text style={styles.value}>{gothra}</Text>
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
            <Text style={styles.label}>Dosha</Text>
            <Text style={styles.value}>{dosha}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Star</Text>
            <Text style={styles.value}>{star}</Text>
          </View>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>
        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Rassi</Text>
            <Text style={styles.value}>{rassi}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Horoscope</Text>
            <Text style={styles.value}>{horoscope}</Text>
          </View>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("QualificationEdit", { section: "personal" })
            }
          >
            <Ionicons name="create-outline" size={18} color="#1C170D" />
          </TouchableOpacity>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Qualification</Text>
            <Text style={styles.value}>{qualification}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Job Sector</Text>
            <Text style={styles.value}>{jobSector}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Annual Income</Text>
            <Text style={styles.value}>{income}</Text>
          </View>
          {/* <View style={styles.column}>
                           <Text style={styles.label}>Eating Habits</Text>
                           <Text style={styles.value}>{height}</Text>
                         </View> */}
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Family Information</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FamilyEdit", { section: "personal" })
            }
          >
            <Ionicons name="create-outline" size={18} color="#1C170D" />
          </TouchableOpacity>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Family Status</Text>
            <Text style={styles.value}>{familyStatus}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Family Type</Text>
            <Text style={styles.value}>{familyType}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Father's Occupation</Text>
            <Text style={styles.value}>{fatherOccupation}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Mother's Occupation</Text>
            <Text style={styles.value}>{motherOccupation}</Text>
          </View>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Brother's</Text>
            <Text style={styles.value}>{brothers}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Sister's</Text>
            <Text style={styles.value}>{sisters}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LocationEdit", { section: "personal" })
            }
          >
            <Ionicons name="create-outline" size={18} color="#1C170D" />
          </TouchableOpacity>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Country</Text>
            <Text style={styles.value}>{country}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>State</Text>
            <Text style={styles.value}>{state}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{city}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Ancestral Origin</Text>
            <Text style={styles.value}>{ancestralOrigin}</Text>
          </View>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContactEdit", { section: "personal" })
            }
          >
            <Ionicons name="create-outline" size={18} color="#1C170D" />
          </TouchableOpacity>
        </View>

        <View style={styles.columnContainer}>
          <View style={styles.column}>
            <Text style={styles.label}>Mobile No</Text>
            <Text style={styles.value}>{mobile}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Social Media</Text>
            <Text style={styles.value}>{socialMedia}</Text>
          </View>
        </View>

        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <View style={styles.gap} />
          <View style={styles.line} />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={25} color="#9C854A" />
          <Text style={[styles.iconLabel, { color: "#9C854A" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Matches")}
        >
          <Ionicons name="search-outline" size={25} color="#9C854A" />
          <Text style={[styles.iconLabel]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Matches")}
        >
          <Ionicons name="people-outline" size={25} color="#9C854A" />
          <Text style={styles.iconLabel}>Matches</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Messages')}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={25}
                  color="#9C854A"
                />
                <Text style={styles.iconLabel}>Messages</Text>
              </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={25} color="#1C170D" />
          <Text style={[styles.iconLabel, { color: "#1C170D" }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F0E8" },
  scrollContainer: { padding: 15, paddingBottom: 100 },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    gap: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  name: { fontWeight: "bold", fontSize: 15, color: "#333" },
  surname: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  caste: {
    flexDirection: "row",
    gap: 10,
  },

  profession: { fontSize: 11, color: "#9C854A", fontWeight: 900 },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#1C170D",
    marginBottom: 10,
  },
  section: {
    width: "100%",
    backgroundColor: "#E4DFD1",
    padding: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: 30,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#1C170D",
    fontWeight: "bold",
    marginBottom: 5,
  },
  head1: {
    fontSize: 16,
    textAlign: "justify",
    color: "#000",
    marginBottom: 10,
    backgroundColor: "#E4DFD1",
  },
  photoItem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  photoItemWrapper: { position: "relative" },
  addPhotoButton: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9C854A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  separatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  gap: { width: 30 },
  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: { flex: 1, paddingHorizontal: 8 },
  label: { fontSize: 16, color: "#9C854A" },
  value: { fontSize: 16, color: "#666", marginTop: 4 },
  button: {
    backgroundColor: "#E4DFD1",
    paddingVertical: 4,
    paddingHorizontal: 2,
    borderRadius: 4,
    alignItems: "center",
    width: "10%",
    position: "absolute",
    left: "310",
    top: "10",
  },
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
  fullScreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  sectionRow: {
    width: "100%",
    backgroundColor: "#E4DFD1",
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fullScreenImage: { width: "100%", height: "100%", resizeMode: "contain" },
  closeButton: { position: "absolute", top: 200, right: 20, zIndex: 11 },
  deleteIcon: { position: "absolute", top: 5, right: 5 },
});

export default ProfileScreen;
