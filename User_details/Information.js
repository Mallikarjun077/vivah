import { View, Text, TextInput, Button, ScrollView, Alert,  TouchableOpacity,StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileForm({ navigation }) {

  const [form, setForm] = useState({
    dob: '',
    gender: '',
    height:"",
    marital_status: '',
    religion: '',
    caste:'',
    subcaste:"",
    languages: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleChange('dob', formattedDate);
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.1.34:8081/api/user_profile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          Alert.alert('Success', 'Profile completed!');
          navigation.replace('Home');
        } 
        else {
          Alert.alert('Error', 'Profile may already exist or invalid data.');
        }
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to submit profile.');
      });

    navigation.replace('EduDetails');

    alert("success")
    return true
  };

  return (
    <ScrollView style={ styles.container }>
      <Text style={{ fontSize:20, marginBottom:10,marginTop:20,fontWeight:"900" }}>Your Profile Details :</Text>

      <TouchableOpacity
        style={{borderRadius:10,  marginBottom:10,height:50, padding:15,backgroundColor:'#E4DFD1',fontSize:15 }}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{form.dob || 'Select Date of Birth'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.dob ? new Date(form.dob) : new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
          
        />
      )}

      <View style={{borderRadius:10,backgroundColor:'#E4DFD1', marginBottom:10 }}>
        <Picker
          selectedValue={form.gender}
          onValueChange={(val) => handleChange('gender', val)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>

      </View>
  



      <View style={{borderRadius:10, marginBottom:10 ,backgroundColor:'#E4DFD1'}}>
        <Picker
          selectedValue={form.religion}
          onValueChange={(val) => handleChange('religion', val)}
        >
          <Picker.Item label="Select Religion" value="" />
          <Picker.Item label="Hindu" value="Hindu" />
          <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Sikh" value="Sikh" />
        </Picker>
      </View>

      <View style={{borderRadius:10, marginBottom:10 ,backgroundColor:'#E4DFD1'}}>
        <Picker
          selectedValue={form.caste}
          onValueChange={(val) => handleChange('caste', val)}
        >
          <Picker.Item label="Select Caste" value="" />
          <Picker.Item label="Lingayata" value="Lingayata" />
          <Picker.Item label="Vokkaliga" value="Vokkaliga" />
          <Picker.Item label="Kuruba" value="Kuruba" />
          <Picker.Item label="Nayaka" value="Nayaka" />
        </Picker>
      </View>


      <View style={{borderRadius:10, marginBottom:10 ,backgroundColor:'#E4DFD1'}}>
        <Picker
          selectedValue={form.subcaste}
          onValueChange={(val) => handleChange('subcaste', val)}
        >
          <Picker.Item label="Select SubCaste" value="" />
          <Picker.Item label="Veerashaiva Lingayat" value="Veerashaiva Lingayat" />
           <Picker.Item label="Optional" value="Optional" /> 
          {/* <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Sikh" value="Sikh" /> */}
        </Picker>
      </View>

      
      <View style={{borderRadius:10, marginBottom:10 ,backgroundColor:'#E4DFD1'}}>
        <Picker
          selectedValue={form.subcaste}
          onValueChange={(val) => handleChange('subcaste', val)}
        >
          <Picker.Item label="Gothra" value="" />
          <Picker.Item label="Veerashaiva Lingayat" value="Veerashaiva Lingayat" />
           <Picker.Item label="Optional" value="Optional" /> 
          {/* <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Sikh" value="Sikh" /> */}
        </Picker>
      </View>

     <View style={{borderRadius:10, marginBottom:10 ,backgroundColor:'#E4DFD1'}}>
        <Picker
          selectedValue={form.subcaste}
          onValueChange={(val) => handleChange('subcaste', val)}
        >
          <Picker.Item label="Dosha" value="" />
          <Picker.Item label="Veerashaiva Lingayat" value="Veerashaiva Lingayat" />
           <Picker.Item label="Optional" value="Optional" /> 
          {/* <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Sikh" value="Sikh" /> */}
        </Picker>
      </View>


    



      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  
}
const styles = StyleSheet.create({
  container:{
padding:20,
  },
    button: {
    backgroundColor: '#f7ca36',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#1C170D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

