import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Create context/AuthContext";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {

const navigation = useNavigation(); // ✅ this gives you navigation
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
  return (
     <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.head}>Featured Profiles</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.isArray(profiles) &&
  profiles.map((item, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate("Partner", { profile: item })}
    >
      <View style={styles.profileCard}>
        <Image
          source={
            item.image && item.image !== ""
              ? { uri: `data:image/jpeg;base64,${item.image}` }
              : require("../assets/men.png")
          }
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.profession}>{item.profession}</Text>
      </View>
    </TouchableOpacity>
  ))}

        </ScrollView>

        <Text style={styles.head}>Quick Match</Text>

        <FlatList
          data={profiles} 
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Partner", { profile: item })}
            >
              <View style={styles.quickMatchCard}>
<Image
  source={
    item.image && item.image !== ""
      ? { uri: `data:image/jpeg;base64,${item.image}` }
      : require("../assets/men.png") // ✅ Your fallback image
  }
  style={styles.image}
/>

                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.profession}>{item.profession}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color="#1C170D" />
          <Text style={[styles.iconLabel, { color: "#1C170D" }]}>Home</Text>
        </TouchableOpacity>
         <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigation.navigate("Matches")}
                >
                  <Ionicons name="search-outline" size={25} color="#9C854A" />
                  <Text style={[styles.iconLabel]}>Search</Text>
                </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Matches')}>
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
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={25} color="#9C854A" />
          <Text style={styles.iconLabel}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F0E8",
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 60,
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C170D",
    marginBottom: 25,
  },
  profileCard: {
    marginRight: 15,
  },
  image: {
    width: 145,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  profession: {
    fontSize: 14,
    color: "#9C854A",
    marginBottom: 25,
  },
  quickMatchCard: {
    flex: 1,
    alignItems: "center",
  },
  quickMatchImage: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-between",
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
  iconButton: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 14,
    color: "#9C854A",
    marginTop: 4,
  },
});

export default HomeScreen;
