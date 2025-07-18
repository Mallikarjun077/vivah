import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);



  const settingsOptions = [
    { title: 'Profile', icon: 'person-circle',screen:null },
    { title: 'Notifications', icon: 'notifications' },
    // { title: 'New Password', icon: 'lock-open' },
    { title: 'Language', icon: 'language' },

    { title: 'Privacy Policy', icon: 'shield-checkmark' },
    { title: 'Logout', icon: 'log-out',screen:null},
  ];

    const handlePress = (item) => {
    if (item.screen) {
      navigation.navigate("SignIn");
    } else if (item.title === 'Logout') {
            navigation.navigate("SignIn");
            

    } else if (item.title==="Profile") {
            navigation.navigate("Profile");
    
    }else if(item.title==="Language"){
            alert("Comming Soon!")
    }else if(item.title==="Privacy Policy"){
      alert("Comming Soon!")
    }else if(item.title==="Notifications"){
      navigation.navigate("Notification");
   
    }
  };
  return (
    <ScrollView style={styles.container}>
     


      {settingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
         onPress={() => handlePress(item)}

        >
          <Ionicons name={item.icon} size={26} color="#9C854A" />
          <Text style={styles.optionText}>{item.title}</Text>
        </TouchableOpacity>
        
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F0E8',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#ccc',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
   
     fontSize: 17,
    fontWeight: "bold",
    color: "#1C170D",
    // marginBottom: 10,
    marginLeft:10
  },
  
});


export default SettingScreen;
