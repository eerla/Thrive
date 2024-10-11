import React from 'react';
import { View, Text, Button } from 'react-native';

export default function QuoteScreen({ route, navigation }) {
  const { userName, motivationalQuote } = route.params;

  return (
    <View className='flex-1 justify-center items-center bg-[#2E3440] p-4'>
      <Text className='text-3xl font-bold mb-4 text-[#D8DEE9] text-center'>Hello {userName},</Text>
      <Text className='text-4xl font-extrabold mb-6 text-[#A3BE8C] text-center'>Your Quote of the Day:</Text>
      <Text className='text-xl italic text-[#E5E9F0] text-center mb-8'>{motivationalQuote}</Text>

      <Button title="Back" onPress={() => navigation.goBack()} color="#81A1C1" />
    </View>
  );
}
