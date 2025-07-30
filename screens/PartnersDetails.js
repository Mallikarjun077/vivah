import React from "react";
import {useState, useEffect,useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from '../Create context/AuthContext'; 



const ProfileDetailScreen = ({ route }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

const { user } = useContext(AuthContext);
  // const { profile } = route.params;
  console.log("Profile data:", profile);

  // const { profile: item } = route.params;
// const profile = route?.params?.profile; // Expect one profile object

const profile = profiles.length > 0 ? profiles[currentIndex] : route?.params?.profile;

  // const handleConnect = () => {
  //   Alert.alert("Successfully Sent", `request to ${profile.name}`);
  // };

//   const handleConnect = async () => {
//      const token = await AsyncStorage.getItem("token");
//   const profileUserId = profile._id;
//   if (!user || !user.access) {
//     Alert.alert("Error", "You need to be logged in to send interest.");
//     console.log("No profileUserId found");

//     return;
//   }

//   try {
//     const response = await fetch("https://backend-1-hccr.onrender.com/api/like/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.access}`,
//       },
//       body: JSON.stringify({
//         liked_user_id: profile.id, 
//         user_id: user.id || user.user_id,   // 👈 Ensure this is the correct field from the profile object
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       Alert.alert("Interest Sent", `Successfully sent interest to ${profile.name}`);
//     } else if (response.status === 400) {
//       Alert.alert("Already Liked", data?.detail || "You have already liked this profile.");
//     } else {
//       console.log("Error response:", data);
//       Alert.alert("Error", "Failed to send interest.");
//     }
//   } catch (error) {
//     console.error("Send interest error:", error);
//     Alert.alert("Error", "Something went wrong.");
//   }
// };
const handleConnect = async () => {
  try {
    const likedUserId = profile?.user_id; // Use user_id, NOT _id

    if (!likedUserId) {
      console.error("Missing liked user_id");
      return;
    }

    const response = await fetch("https://backend-1-hccr.onrender.com/api/like/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.access}`,
      },
      body: JSON.stringify({
        liked_user_id: likedUserId, 
      }),
    });

    const result = await response.json();
    console.log("Send interest result:", result);

    if (response.ok) {
      alert("Interest sent successfully!");
    } else {
      alert(`Failed: ${result.detail}`);
    }
  } catch (error) {
    console.error("Send interest error:", error);
    alert("Network error. Please try again.");
  }
};



 useEffect(() => {
  const fetchProfiles = async () => {
    if (!user || !user.access) {
      console.log("User not logged in or token missing");
      return;
    }

    try {
      const response = await fetch("https://backend-1-hccr.onrender.com/api/pre-profiles/all/", {
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch profiles:", response.status, errorText);
        return;
      }

      const data = await response.json();
      setProfiles(data);
      console.log("✅ Fetched Profiles:", data);
    } catch (error) {
      console.error("❌ Error fetching profiles:", error);
    }
  };

  fetchProfiles();
}, [user]); 


  return (
    <View>
      <View style={styles.arrow}>

<TouchableOpacity
  style={styles.buttonLeft}
  onPress={() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }}
>
  <Ionicons name="arrow-back" size={40} color={currentIndex === 0 ? "gray" : "black"} />
</TouchableOpacity>

<TouchableOpacity
  style={styles.buttonRight}
  onPress={() => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }}
>
  <Ionicons name="arrow-forward" size={40} color={currentIndex === profiles.length - 1 ? "gray" : "black"} />
</TouchableOpacity>


      </View>
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
  {/* Top Full Photo */}
 <Image
  source={
    profile?.image_base64
      ? { uri: `data:image/jpeg;base64,${profile.image_base64}` }
      : require("../assets/women.png") // fallback image
  }
  style={styles.topImage}
  resizeMode="cover"
/>

  {/* Overlay Card */}
  <View style={styles.overlayCard}>
      <View style={styles.Bio}>
        <Text style={styles.name}>
          {profile.name}, {profile.age}
        </Text> 
        
         <Text style={styles.profession}>{profile.profession}</Text>
        <Text style={styles.info}>
          {profile.religion} | {profile.location}
        </Text>
      </View>

  

    
  </View>
</View>

      <View style={styles.container}>


        <View style={styles.Bio}>
        
        
        <Text style={styles.name}>
          {profile.name}
        </Text>
         <Text style={styles.name}>
           {profile.age} yrs
        </Text>
        {/* <Text style={styles.profession}>{item.profession}</Text> */}
        <Text style={styles.info}>
          {profile.religion} | {profile.location}
        </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.bio}>{profile.mothertongue}</Text>
        </View>
        
             
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Date Of Birth</Text>
                    <Text style={styles.value}>{profile.age}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Height</Text>
                    <Text style={styles.value}>{profile.height}</Text>
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
                    <Text style={styles.value}>{profile.maritalStatus}years</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Eating Habits</Text>
                    <Text style={styles.value}>{profile.eatingHabits}</Text>
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
                    <Text style={styles.value}>{profile.motherTongue}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Languages Knows</Text>
                    <Text style={styles.value}>{profile.motherTongue}</Text>
                  </View>
                </View>
        
                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <View style={styles.gap} />
                  <View style={styles.line} />
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Religion Information </Text>
                  {/* <Text style={styles.bio}>{profile.religion}</Text> */}
        </View>
           
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Religion</Text>
                    <Text style={styles.value}>{profile.religion}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Caste</Text>
                    <Text style={styles.value}>{profile.community}</Text>
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
                    <Text style={styles.value}>{profile.subCaste}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Gothra</Text>
                    <Text style={styles.value}>{profile.gothra}</Text>
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
                    <Text style={styles.value}>{profile.dosha}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Star</Text>
                    <Text style={styles.value}>{profile.star}</Text>
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
                    <Text style={styles.value}>{profile.rassi}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Horoscope</Text>
                    <Text style={styles.value}>{profile.horoscope}</Text>
                  </View>
                  
                </View>
                   <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <View style={styles.gap} />
                  <View style={styles.line} />
                </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          {/* <Text style={styles.bio}>{profile.mothertongue}</Text> */}
        </View>
                
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Qualification</Text>
                    <Text style={styles.value}>{profile.qualification}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Job Sector</Text>
                    <Text style={styles.value}>{profile.jobSector}</Text>
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
                    <Text style={styles.value}>{profile.income}</Text>
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
        
                       <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Information</Text>
          <Text style={styles.bio}>{profile.mothertongue}</Text>
        </View>
                     
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Family Status</Text>
                    <Text style={styles.value}>{profile.familyStatus}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Ancestral Origin</Text>
                    <Text style={styles.value}>{profile.ancestralOrigin}</Text>
                  </View>
                </View>
        
              
        
                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <View style={styles.gap} />
                  <View style={styles.line} />
                </View>

  <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Information</Text>
          <Text style={styles.bio}>{profile.mothertongue}</Text>
        </View>
                     
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Country</Text>
                    <Text style={styles.value}>{profile.country}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>State</Text>
                    <Text style={styles.value}>{profile.state}</Text>
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
                    <Text style={styles.value}>{profile.city}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Ancestral Origin</Text>
                    <Text style={styles.value}>{profile.ancestralOrigin}</Text>
                  </View>
                </View>
        
              
        
                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <View style={styles.gap} />
                  <View style={styles.line} />
                </View>



                       <View style={styles.section}>

                       <Text style={styles.sectionTitle}>Contact Details</Text>
          <Text style={styles.bio}>{profile.mothertongue}</Text>
        </View>
                     
                <View style={styles.columnContainer}>
                  <View style={styles.column}>
                    <Text style={styles.label}>Mobile No</Text>
                    <Text style={styles.value}>{profile.mobileNo}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{profile.email}</Text>
                  </View>
                </View>
        
              
        
                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <View style={styles.gap} />
                  <View style={styles.line} />
                </View>
               
       
       
                
    
        <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
          <Text style={styles.connectText}>Send Interest</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F0E8",
    alignItems: "center",
    padding: 15,
  },
   profileImage: {
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C170D",
  },
  info: {
    fontSize: 16,
    color: "#9C854A",
  },
  section: {
    width: "100%",
    backgroundColor: "#E4DFD1",
    padding: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical:3,
    paddingHorizontal:10,
    height:30,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#1C170D",
    fontWeight: "bold",
    marginBottom: 5,
  },
  Bio:{
    flexDirection:"column",
    justifyContent:'center',
    alignItems:'flex-start',
    
    marginBottom:20,
  },
  bio: {
    
    fontSize: 16,
    color: "#1C170D",
  },
  connectButton: {
    marginTop: 20,
    backgroundColor: "#9C854A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  connectText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    separatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  line: { flex: 1, height: 1, backgroundColor: "#ccc" },
  gap: { width: 30 },
  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:  0,
  },
  column: { flex: 1, paddingHorizontal: 8 },
  label: { fontSize: 16, color: "#9C854A" },
  value: { fontSize: 16, color: "black", marginTop: 4 },
  button: {
    backgroundColor: "#E4DFD1",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  topImage: {
  width: "100%",
  height: 350,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
},

overlayCard: {
  position: "absolute",
  top: 330, // overlaps with topImage
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#F2F0E8",
  borderTopLeftRadius: 25,
  borderTopRightRadius: 25,
  padding: 20,
  flex: 1,
},
   arrow: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  buttonLeft: {
    // backgroundColor: "white",
    borderRadius: 25,
    padding: 5,
    elevation: 10,
  },
  buttonRight: {
    // backgroundColor: "white",
    borderRadius: 25,
    padding: 5,
    elevation: 10,
  },
  
// arrow:{
// flexDirection:"row",
// justifyContent:"space-around"
// }
});

export default ProfileDetailScreen;

