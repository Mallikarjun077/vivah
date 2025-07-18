import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import {View} from "react-native";
import SignInScreen from "../authentication/SignInScreen";
import SignUpScreen from "../authentication/SignUpScreen";
import ResetPwd from "../authentication/ResetPwd";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MatchScreen from "../screens/MatchScreen";
// import ChatScreen from "../screens/ChatScreen";
import NewPwdScreen from "../authentication/NewPwdScreen"
import SettingScreen from "../Menu/SettingScreen";
import EditProfile  from "../screens/EditProfile"
import ProfileEdit from "../screens/ProfileEdit"
import ReligionEdit from "../screens/ReligionEdit"
import QulificationEdit from "../screens/QulificationEdit"
import FamilyEdit from "../screens/FamilyEdit"
import LocationEdit from "../screens/LocationEdit"
import PartnersDetails from "../screens/PartnersDetails"
import Information from "../User_details/Information"
import EducationDetails from "../User_details/EductionalDetails"
import PersonalDetails from "../User_details/PersonalDetails"
import Notification from "../Menu/Notification"
import ContactEdit from "../screens/ContactEdit"
import OtpResetScreen from "../authentication/OtpResetScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "Nekar Vivah Vedike",
          headerShown: false,
          headerTitleStyle: {
            color: "#1C170D", // Title text color
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      
      <Stack.Screen
        name="ResetPwd"
        component={ResetPwd}
        options={{
          title: "Nekar Vivah Vedike",
          headerTitleStyle: {
            color: "#1C170D",
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
        <Stack.Screen
        name="NewPwd"
        component={NewPwdScreen}
        options={{
          title: "Nekar Vivah Vedike",
          headerTitleStyle: {
            color: "#1C170D",
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
           <Stack.Screen
        name="OtpPwd"
        component={OtpResetScreen}
        options={{
          title: "Nekar Vivah Vedike",
          headerTitleStyle: {
            color: "#1C170D",
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    title: "Match Finder",
    headerLeft: null,
    headerTitleAlign: "center",
    headerTitleStyle: {
      color: "#1C170D",
      fontWeight: "bold",
      fontSize: 20,
    },
    headerRight: () => (
      <Ionicons
        name="settings-outline"
        size={24}
        color="#1C170D"
        style={{ marginRight: 15 }}
        onPress={() => navigation.navigate('SettingScreen')}
      />
    ),
    headerStyle: {
      backgroundColor: "#F2F0E8",
    },
  })}
/>

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: true ,
          headerStyle: {
            backgroundColor: "#F2F0E8",
            
          },
        }}
      />
             <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{
          title: "Profile",
          headerShown: false ,

          headerStyle: {
            backgroundColor: "#F2F0E8",
          },
        }}
      />

            <Stack.Screen
        name="UserDetails"
        component={Information}
        options={{
          title: "Profile",
          headerShown: false ,
          headerStyle: {
            backgroundColor: "#F2F0E8",
          },
        }}
      />
       
           <Stack.Screen
        name="EduDetails"
        component={EducationDetails}
        options={{
          title: "Profile",
          headerShown: false ,

          headerStyle: {
            backgroundColor: "#F2F0E8",
          },
        }}
      />

      <Stack.Screen
        name="Matches"
        component={MatchScreen}
        options={{
          title: "Find your match",
             headerStyle: {
            backgroundColor: "#F2F0E8",
          },
          headerRight: () => (
            <Ionicons
              name="filter-outline"
              size={24}
              color="black"
              style={{ marginRight: 16 }}
              onPress={() => alert("You pressed the icon!")}
            />
          ),
        }}
      />
      




  <Stack.Screen
  name="Partner"
  component={PartnersDetails}
  options={{ title: 'New Matches' }}
/>
      

      <Stack.Screen
  name="SettingScreen"
  component={SettingScreen}
  options={{ title: 'Settings' }}
/>
      <Stack.Screen
  name="EditProfile"
  component={EditProfile}
  options={{ title: 'Setting',headerShown:false }}
/>
  <Stack.Screen
  name="ReligionEdit"
  component={ReligionEdit}
  options={{ title: 'Setting',headerShown:false }}
/>
     <Stack.Screen
  name="ProfileEdit"
  component={ProfileEdit}
  options={{ title: 'Profile Setting',headerShown:true }}
/>
   <Stack.Screen
  name="FamilyEdit"
  component={FamilyEdit}
  options={{ title: 'Setting',headerShown:true }}
/>  
 <Stack.Screen
  name="LocationEdit"
  component={LocationEdit}
  options={{ title: 'Setting',headerShown:true }}
/>
 <Stack.Screen
  name="QualificationEdit"
  component={QulificationEdit}
  options={{ title: 'Setting',headerShown:true }}
/>
<Stack.Screen
  name="ContactEdit"
  component={ContactEdit}
  options={{ title: 'Setting',headerShown:true }}
/>
   <Stack.Screen
  name="Notification"
  component={Notification}
  options={{ title: 'Setting',headerShown:null }}
/>

    </Stack.Navigator>
  );
}
