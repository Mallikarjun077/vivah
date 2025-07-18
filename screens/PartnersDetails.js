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


const ProfileDetailScreen = ({ route }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

// const { user } = useContext(AuthContext);
  // const { profile } = route.params;
  console.log("Profile data:", profile);

  // const { profile: item } = route.params;
const profile = route?.params?.profile; // Expect one profile object


  const handleConnect = () => {
    Alert.alert("Successfully Sent", `request to ${profile.name}`);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://192.168.236.102:8081/api/all-profiles/", {
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

  return (
    
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
  {/* Top Full Photo */}
 <Image
  source={
    profile?.image
      ? { uri: profile.image }
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
<View style={styles.arrow}>

 <TouchableOpacity style={styles.buttonLeft} onPress={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}>
        {/* <Text style={styles.buttonText}>Left</Text> */}
        <Ionicons name="arrow-back" size={40} color="black" />

      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRight} onPress={() => currentIndex < profiles.length - 1 && setCurrentIndex(currentIndex + 1)}>
        {/* <Text style={styles.buttonText}>Right</Text> */}
        <Ionicons name="arrow-forward" size={40} color="black" />
      </TouchableOpacity>
      </View>

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
  buttonLeft: {
    // padding: 12,
    position:"absolute",
    right:130,
    height:50,
    backgroundColor:"#E4DFD1",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:50,
  
  },
  buttonRight: {
    // padding: 12,
     position:"absolute",
    left:130,
      height:50,
    backgroundColor:"#E4DFD1",
     alignItems:"center",
    justifyContent:"center",
    borderRadius:50

  },
// arrow:{
// flexDirection:"row",
// justifyContent:"space-around"
// }
});

export default ProfileDetailScreen;

