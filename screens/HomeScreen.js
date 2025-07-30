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
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../Create context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';


const HomeScreen = () => {

const navigation = useNavigation(); // ✅ this gives you navigation
const [profiles, setProfiles] = useState([]);
const { user } = useContext(AuthContext); // ✅ This must be inside the component
const [loading, setLoading] = useState(true);

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 2;


 

useEffect(() => {
  const fetchProfiles = async () => {
    if (!user?.access) return;

    try {
      const response = await fetch("https://backend-1-hccr.onrender.com/api/pre-profiles/all/", {
        headers: {
          Authorization: `Bearer ${user.access}`,
        },
      });

      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfiles();
}, [user]);
if (loading) {
  return (
    <ScrollView contentContainerStyle={styles.skeletonContainer}>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={styles.card}>
          <ShimmerPlaceholder style={styles.imageBox} />
          <ShimmerPlaceholder style={styles.line1} />
          <ShimmerPlaceholder style={styles.line2} />
        </View>
      ))}
    </ScrollView>
  );
}


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
        {/* <Image
          source={
            item.image && item.image !== ""
              ? { uri: `data:image/jpeg;base64,${item.image}` }
              : require("../assets/men.png")
          }
          style={styles.image}
        /> */}
        <Image
          source={
            item?.image_base64
              ? { uri: `data:image/jpeg;base64,${item.image_base64}` }
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
    item.image_base64 && item.image_base64 !== ""
      ? { uri: `data:image/jpeg;base64,${item.image_base64}` }
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
    justifyContent: "space-around",
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
    loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
   skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  imageBox: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  line1: {
    width: '80%',
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
    marginBottom: 6,
  },
  line2: {
    width: '60%',
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
    marginBottom: 10,
  },
});

export default HomeScreen;
