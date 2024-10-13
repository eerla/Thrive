import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Top 15 common occupations worldwide
const occupations = [
  'Living life', 'Engineer', 'Doctor', 'Teacher', 'Farmer',
  'Software Developer', 'Salesperson', 'Nurse', 'Manager', 'Accountant',
  'Lawyer', 'Driver', 'Chef', 'Electrician', 'Plumber'
];

// Top 15 most spoken languages worldwide
const languages = [
  'English', 'Mandarin', 'Hindi', 'Spanish', 'French',
  'Arabic', 'Bengali', 'Russian', 'Portuguese', 'Indonesian',
  'Urdu', 'German', 'Japanese', 'Telugu', 'Chinese'
];

export default function ConfigScreen({ navigation, setUserName, deviceToken }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Neutral');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [language, setLanguage] = useState('');
  const [frequency, setFrequency] = useState(1);

  // Function to handle form submission and send user data to backend
  const handleSubmit = () => {
      // Check if deviceToken exists before using it
      if (!deviceToken) {
          Alert.alert('Error', 'Device token not available');
          return;
      }

      // Send updated user data to the backend
      fetch('http://10.0.2.2:3000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: deviceToken, // Assuming you are passing deviceToken as a global prop
              name,
              gender,
              age,
              occupation,
              language,
              frequency,
          }),
      })
          .then((response) => response.text())
          .then((result) => {
              console.log(result);

              // Show a single success alert with a clickable OK button
              Alert.alert(
                  'Success',
                  'Details updated',
                  [
                      {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                      },
                  ],
                  { cancelable: true } // Dismissible by tapping outside
              );
          })
          .catch((error) => {
              console.error('Error updating user data:', error);

              // Show a failure alert with a clickable OK button
              Alert.alert(
                  'Failed',
                  'Update failed, try again!',
                  [
                      {
                          text: 'OK',
                          onPress: () => console.log('OK Pressed'),
                      },
                  ],
                  { cancelable: true }
              );
          });
  };

  return (
    <ScrollView contentContainerStyle='flex-1 justify-center p-6 bg-white'>
      <View className='w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6'>
        <Text className='text-3xl font-bold mb-4 text-center text-gray-800'>Enter Your Details</Text>

        {/* Name Input */}
        <Text className='mb-2 text-lg text-gray-700'>Name:</Text>
        <TextInput
          className='border border-gray-300 p-3 mb-4 rounded-lg'
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        {/* Gender Dropdown */}
        <Text className='mb-2 text-lg text-gray-700'>Select Gender:</Text>
        <Picker
          selectedValue={gender}
          className='border border-gray-300 mb-4 rounded-lg'
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Neutral" value="Neutral" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        {/* Age Input */}
        <Text className='mb-2 text-lg text-gray-700'>Age:</Text>
        <TextInput
          className='border border-gray-300 p-3 mb-4 rounded-lg'
          placeholder="Enter your age"
          value={age.toString()}
          onChangeText={(text) => setAge(Number(text))}
          keyboardType="numeric"
        />

        {/* Occupation Dropdown */}
        <Text className='mb-2 text-lg text-gray-700'>Select Occupation:</Text>
        <Picker
          selectedValue={occupation}
          className='border border-gray-300 mb-4 rounded-lg'
          onValueChange={(itemValue) => setOccupation(itemValue)}
        >
          {occupations.map((occ) => (
            <Picker.Item key={occ} label={occ} value={occ} />
          ))}
        </Picker>

        {/* Language Dropdown */}
        <Text className='mb-2 text-lg text-gray-700'>Select Language:</Text>
        <Picker
          selectedValue={language}
          className='border border-gray-300 mb-4 rounded-lg'
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          {languages.map((lang) => (
            <Picker.Item key={lang} label={lang} value={lang} />
          ))}
        </Picker>

        {/* Frequency Dropdown */}
        <Text className='mb-2 text-lg text-gray-700'>Select Notification Frequency:</Text>
        <Picker
          selectedValue={frequency}
          className='border border-gray-300 mb-6 rounded-lg'
          onValueChange={(itemValue) => setFrequency(itemValue)}
        >
          <Picker.Item label="1 per day" value={1} />
          <Picker.Item label="2 per day" value={2} />
          <Picker.Item label="3 per day" value={3} />
          <Picker.Item label="4 per day" value={4} />
        </Picker>

        {/* Submit Button */}
        <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </ScrollView>
  );
}
