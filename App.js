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

async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
        projectId: '17ce3928-9295-45e6-a288-3cbe9e714418' // expo project id
    })).data;
    console.log('TOKEN',token); // need to store in server device token

    return token;
}




export default function App() {
  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync();

    // Set the notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, // Show an alert for notifications
      }),
    });
//Notifications.addNotificationReceivedListener(notification => {
//    alert(`New notification: ${notification.request.content.title}`);
//});
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

