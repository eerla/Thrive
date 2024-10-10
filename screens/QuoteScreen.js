import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwindcss-react-native';

export default function QuoteScreen({ route, navigation }) {
  const { userName, motivationalQuote } = route.params;
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-1 justify-center p-4')}>
      <Text style={tailwind('text-lg mb-4')}>Hello {userName},</Text>
      <Text style={tailwind('text-2xl font-bold mb-6')}>Your Quote of the Day:</Text>
      <Text style={tailwind('text-lg italic text-center')}>{motivationalQuote}</Text>

      <Button title="Back" onPress={() => navigation.goBack()} color="#4CAF50" />
    </View>
  );
}
