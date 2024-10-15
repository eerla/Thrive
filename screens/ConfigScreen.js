import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { BACKEND_URL, OCCUPATIONS, LANGUAGES } from '@env';

// Top 15 common occupations worldwide
const occupations = OCCUPATIONS.split(',');

// Top 15 most spoken languages worldwide
const languages = LANGUAGES.split(',');

export default function ConfigScreen({ navigation, setUserName, deviceToken }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Neutral');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [language, setLanguage] = useState('');
  const [frequency, setFrequency] = useState(1);

  // Fetch user data from AsyncStorage when the screen loads
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedGender = await AsyncStorage.getItem('gender');
        const savedAge = await AsyncStorage.getItem('age');
        const savedOccupation = await AsyncStorage.getItem('occupation');
        const savedLanguage = await AsyncStorage.getItem('language');
        const savedFrequency = await AsyncStorage.getItem('frequency');

        if (savedName) setName(savedName);
        if (savedGender) setGender(savedGender);
        if (savedAge) setAge(Number(savedAge));
        if (savedOccupation) setOccupation(savedOccupation);
        if (savedLanguage) setLanguage(savedLanguage);
        if (savedFrequency) setFrequency(Number(savedFrequency));
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Function to handle form submission and send user data to backend
    const handleSubmit = async () => {
      try {
        if (!deviceToken) {
          Alert.alert('Error', 'Device token not available');
          return;
        }

        // Save updated user data to AsyncStorage
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('gender', gender);
        await AsyncStorage.setItem('age', age.toString());
        await AsyncStorage.setItem('occupation', occupation);
        await AsyncStorage.setItem('language', language);
        await AsyncStorage.setItem('frequency', frequency.toString());

        // Update global app state with the updated name
        setUserName(name);

        // Send updated user data to the backend
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: deviceToken,
            name,
            gender,
            age,
            occupation,
            language,
            frequency,
          }),
        });

        const result = await response.text();
        console.log(result);

        // Show success alert
        Alert.alert('Success', 'Details updated', [{ text: 'OK' }], { cancelable: true });
      } catch (error) {
        console.error('Error updating user data:', error);
        Alert.alert('Failed', 'Update failed, try again!', [{ text: 'OK' }], { cancelable: true });
      }
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
