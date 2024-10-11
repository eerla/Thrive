import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ConfigScreen from './screens/ConfigScreen';
import QuoteScreen from './screens/QuoteScreen';
import { Platform, StyleSheet, View, Text, LogBox } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

// Suppress any logs related to NativeWind (Optional)
LogBox.ignoreLogs(['NativeWindStyleSheet']);
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('Notification permissions are required!');
      }
    });
  }, []);

    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Config" component={ConfigScreen} />
            <Stack.Screen name="Quote" component={QuoteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

