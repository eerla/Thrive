import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConfigScreen from './screens/ConfigScreen';
import QuoteScreen from './screens/QuoteScreen';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  // Move useEffect inside the functional component
  useEffect(() => {
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('Notification permissions are required!');
      }
    });
  }, []);

  return (
    <TailwindProvider platform={Platform.OS}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Config">
          <Stack.Screen name="Config" component={ConfigScreen} />
          <Stack.Screen name="Quote" component={QuoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
