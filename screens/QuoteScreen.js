import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
//import { fetchMotivationalQuote } from '../services/OpenAIService'; // Ensure you have the service to fetch the quote
import OpenAIService from '../services/OpenAIService';

export default function QuoteScreen({ route, navigation }) {
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the quote
    const getQuote = async () => {
      try {
        setLoading(true);
        const quote = await OpenAIService.fetchMotivationalQuote(); // Fetch the quote from your API service
        setMotivationalQuote(quote);
      } catch (error) {
        console.error("Error fetching quote: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function when the component mounts
    getQuote();
  }, []);

  // Show a loading spinner while the quote is being fetched
  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-[#2E3440] p-4'>
        <ActivityIndicator size="large" color="#81A1C1" />
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center items-center bg-[#2E3440] p-4'>
      <Text className='text-3xl font-bold mb-4 text-[#D8DEE9] text-center'>Hello {route.params?.userName || "User"},</Text>
      <Text className='text-4xl font-extrabold mb-6 text-[#A3BE8C] text-center'>Your Quote of the Day:</Text>
      <Text className='text-xl italic text-[#E5E9F0] text-center mb-8'>{motivationalQuote}</Text>

      <Button title="Back" onPress={() => navigation.navigate('Home')} color="#81A1C1" />
    </View>
  );
}

