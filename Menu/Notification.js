import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";

const MatchScreen = () => {
  
  useEffect(() => {
    alert("Coming Soon!");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F0E8" }}>
      <Text style={{ fontSize: 20, color: "#1C170D" }}>Coming Soon</Text>
    </View>
  );
};

export default MatchScreen;
