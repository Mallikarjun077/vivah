// import React, { useContext, useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../Create context/AuthContext";
// import { Ionicons } from "@expo/vector-icons";

// const ChatScreen = () => {
//   const navigation = useNavigation();
//   const { user } = useContext(AuthContext);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const flatListRef = useRef();

//   useEffect(() => {
//     if (messages.length > 0) {
//       flatListRef.current?.scrollToEnd({ animated: true });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (messages.length === 0) return;
//     const lastMessage = messages[messages.length - 1];
//     if (lastMessage.sender === "You") {
//       const timer = setTimeout(() => {
//         const botReply = {
//           id: Date.now().toString(),
//           text: "This is an auto reply!",
//           time: new Date().toLocaleTimeString(),
//           sender: "AI",
//         };
//         setMessages((prev) => [...prev, botReply]);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [messages]);

//   const sendMessage = () => {
//     if (input.trim()) {
//       const newMessage = {
//         id: Date.now().toString(),
//         text: input,
//         time: new Date().toLocaleTimeString(),
//         sender: "You",
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setInput("");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <KeyboardAvoidingView
//           style={styles.flex}
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           keyboardVerticalOffset={80}
//         >
//           <View style={styles.flex}>

//             <FlatList
//               ref={flatListRef}
//               data={messages}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View
//                   style={[
//                     styles.messageItem,
//                     item.sender === "You" ? styles.userMsg : styles.botMsg,
//                   ]}
//                 >
//                   <Text style={styles.sender}>{item.sender}:</Text>
//                   <Text style={styles.messageText}>{item.text}</Text>
//                   <Text style={styles.time}>{item.time}</Text>
//                 </View>
//               )}
//               contentContainerStyle={{ padding: 10 }}
//               onContentSizeChange={() =>
//                 flatListRef.current?.scrollToEnd({ animated: true })
//               }
//               style={{ flex: 1 }}
//             />

//             <View style={styles.inputContainer}>
//               <TextInput
//                 placeholder="Type message..."
//                 style={styles.input}
//                 value={input}
//                 onChangeText={setInput}
//               />
//               <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//                 <Text style={styles.sendText}>Send</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </TouchableWithoutFeedback>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomBar}>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => navigation.navigate("Home")}
//         >
//           <Ionicons name="home-outline" size={25} color="#9C854A" />
//           <Text style={styles.iconLabel}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => navigation.navigate("Matches")}
//         >
//           <Ionicons name="people-outline" size={25} color="#9C854A" />
//           <Text style={styles.iconLabel}>Matches</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => navigation.navigate("Messages")}
//         >
//           <Ionicons name="chatbubble-ellipses" size={25} color="#1C170D" />
//           <Text style={[styles.iconLabel, { color: "#1C170D" }]}>Messages</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.iconButton}
//           onPress={() => navigation.navigate("Profile")}
//         >
//           <Ionicons name="person-outline" size={25} color="#9C854A" />
//           <Text style={styles.iconLabel}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#F2F0E8",
//   },
//   flex: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     padding: 10,
//     color: "#1C170D",
//     textAlign: "center",
//   },
//   messageItem: {
//     marginVertical: 5,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: "80%",
//   },
//   userMsg: {
//     backgroundColor: "#D9CBA3",
//     alignSelf: "flex-end",
//   },
//   botMsg: {
//     backgroundColor: "#E4DFD1",
//     alignSelf: "flex-start",
//   },
//   sender: {
//     fontWeight: "bold",
//     marginBottom: 2,
//   },
//   messageText: {
//     fontSize: 16,
//     marginBottom: 2,
//   },
//   time: {
//     fontSize: 10,
//     color: "#888",
//     textAlign: "right",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 10,
//     // borderTopWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#F2F0E8",
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     // borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     backgroundColor: "#fff",
//   },
//   sendButton: {
//     justifyContent: "center",
//     backgroundColor: "#9C854A",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//   },
//   sendText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   bottomBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//     backgroundColor: "#F2F0E8",
//   },
//   iconButton: {
//     alignItems: "center",
//   },
//   iconLabel: {
//     fontSize: 14,
//     color: "#9C854A",
//     marginTop: 4,
//   },
// });

// export default ChatScreen;
