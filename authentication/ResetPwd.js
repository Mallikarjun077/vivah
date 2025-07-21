import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../Create context/AuthContext';

const ResetPwd = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { requestResetEmail } = useContext(AuthContext); 

  const handleNext = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    const success = await requestResetEmail(email); 
    if (success) {
      Alert.alert('✅ Success', 'Check your email for the reset link.');
            navigation.navigate('OtpPwd');


   
      
    } else {
      Alert.alert('Error', 'Email not found or failed to send reset link.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#9C854A"
        backgroundColor="#E4DFD1"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText} >Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#F2F0E8"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1C170D',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f7ca36',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1C170D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPwd;
