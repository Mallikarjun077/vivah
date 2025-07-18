import { View, Text, TextInput, Button, ScrollView, Alert,  TouchableOpacity,StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ProfileForm({ navigation }) {

  const [form, setForm] = useState({
    profession: '',
    qualification: '',
    annualIncome:'',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
    const [profession, setProfession] = useState("");


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
    fetch('http://192.168.1.34:8081/api/professional_details/', {
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
   navigation.replace('Home');

    alert("success")
  };
   

  return (
    <ScrollView style={ styles.container }>
      

           <Text style={{ fontSize:20, marginBottom:10,marginTop:10,fontWeight:"900" }}>Your Proffesional Details :</Text>


      <View style={{ borderRadius:10,  marginBottom:10 ,backgroundColor:'#E4DFD1' }}>
        <Picker
          selectedValue={form.qualification}
          onValueChange={(val) => handleChange('qualification', val)}
        >
          <Picker.Item label="Select Qualification" value="" />
          <Picker.Item label="High School" value="High School" />
          <Picker.Item label="Diploma" value="Diploma" />
          <Picker.Item label="Graduate" value="Graduate" />
          <Picker.Item label="Post Graduate" value="Post Graduate" />
        </Picker>
      </View>


      <View style={{ borderRadius:10,  marginBottom:10 ,backgroundColor:'#E4DFD1' }}>
      <Picker
  selectedValue={form.profession}
  onValueChange={(val) => {
    setProfession(val);             // Local state (optional)
    handleChange('profession', val); // Save to form
  }}
>

          <Picker.Item label="Job Sector" value="" />
          <Picker.Item label="Software" value="Software" />
          <Picker.Item label="Govt Employee" value="Govt Employee" />
          <Picker.Item label="Teacher" value="Teacher" />
          <Picker.Item label="Business" value="Business" />

        </Picker>
      </View>

  <TextInput
    placeholder="Enter Annual Income"
    value={form.annualIncome}
    onChangeText={(val) => handleChange('annualIncome', val)}
    keyboardType="numeric"
    style={{
   borderRadius:10,  marginBottom:10 ,backgroundColor:'#E4DFD1',height:50 ,padding:15,    fontSize: 16,

    }}
  />

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
