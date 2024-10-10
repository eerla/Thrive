import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';
import * as Notifications from 'expo-notifications';
import OpenAIService from '../services/OpenAIService';
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
  'Urdu', 'German', 'Japanese', 'Swahili', 'Marathi'
];

export default function ConfigScreen({ navigation }) {
  const tailwind = useTailwind();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Neutral');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [language, setLanguage] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [quote, setQuote] = useState('');


  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Motivation',
        body: `Hey ${name}, here's your daily motivation!`,
      },
      trigger: { seconds: 60 }, // Sends after 60 seconds for testing purposes
    });
  };

  const handleSubmit = async () => {
    try {
      // Fetch motivational quote from OpenAI
      const generatedQuote = await OpenAIService.fetchMotivationalQuote(
        name,
        gender,
        age,
        occupation,
        language
      );
      setQuote(generatedQuote);

      // Schedule notification
      await scheduleNotification();

      // Navigate to QuoteScreen with fetched quote
      navigation.navigate('Quote', {
        userName: name,
        motivationalQuote: generatedQuote,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  return (
      <ScrollView contentContainerStyle={tailwind('flex-1 justify-center p-4')}>
        <View style={tailwind('w-full max-w-md mx-auto')}>
          <Text style={tailwind('text-2xl font-bold mb-6 text-center')}>Enter Your Details</Text>

          {/* Name Input */}
          <Text style={tailwind('mb-2 text-lg')}>Name:</Text>
          <TextInput
            style={tailwind('border p-3 mb-4 rounded-lg')}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          {/* Gender Dropdown */}
          <Text style={tailwind('mb-2 text-lg')}>Select Gender:</Text>
          <Picker
            selectedValue={gender}
            style={tailwind('border p-3 mb-4 rounded-lg')}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Neutral" value="Neutral" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          {/* Age Input */}
          <Text style={tailwind('mb-2 text-lg')}>Age:</Text>
          <TextInput
            style={tailwind('border p-3 mb-4 rounded-lg')}
            placeholder="Enter your age"
            value={age.toString()}
            onChangeText={(text) => setAge(Number(text))}
            keyboardType="numeric"
          />

          {/* Occupation Dropdown */}
          <Text style={tailwind('mb-2 text-lg')}>Select Occupation:</Text>
          <Picker
            selectedValue={occupation}
            style={tailwind('border p-3 mb-4 rounded-lg')}
            onValueChange={(itemValue) => setOccupation(itemValue)}
          >
            {occupations.map((occ) => (
              <Picker.Item key={occ} label={occ} value={occ} />
            ))}
          </Picker>

          {/* Language Dropdown */}
          <Text style={tailwind('mb-2 text-lg')}>Select Language:</Text>
          <Picker
            selectedValue={language}
            style={tailwind('border p-3 mb-4 rounded-lg')}
            onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            {languages.map((lang) => (
              <Picker.Item key={lang} label={lang} value={lang} />
            ))}
          </Picker>

          {/* Frequency Dropdown */}
          <Text style={tailwind('mb-2 text-lg')}>Select Notification Frequency:</Text>
          <Picker
            selectedValue={frequency}
            style={tailwind('border p-3 mb-4 rounded-lg')}
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
