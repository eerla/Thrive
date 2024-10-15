import React, { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ConfigScreen from './screens/ConfigScreen';
import QuoteScreen from './screens/QuoteScreen';
import { Platform, StyleSheet, View, Text, LogBox } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { EXPO_PROJECT_ID, BACKEND_URL } from '@env';

// Suppress any logs related to NativeWind (Optional)
LogBox.ignoreLogs(['NativeWindStyleSheet']);
const Stack = createStackNavigator();

async function registerForPushNotificationsAsync(setDeviceToken) {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
            alert('Please turn on notifications to receive daily quotes');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
        projectId: EXPO_PROJECT_ID, // expo project id
    })).data;
    console.log('TOKEN',token); // need to store in server device token

    // Set the token globally
    setDeviceToken(token);

    // Default user data (you can change these default values)
    const defaultUserData = {
        token,
        name: 'User', // Default name
        gender: 'Neutral', // Default gender
        age: 25, // Default age
        occupation: 'Living Life', // Default occupation
        language: 'English', // Default language
        frequency: 1  // Default frequency of notifications
    };
    console.log(defaultUserData)
    console.log('calling backend')
    // Send token to backend
    fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(defaultUserData),
    })
    .then(response => response.text())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error updating user data:', error));
}

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigationRef = useRef();
  const [userName, setUserName] = useState("User"); // Default username
  const [motivationalQuote, setMotivationalQuote] = useState(''); // Store the motivational quote
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync(setDeviceToken);

    // Set the notification handler
    Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true, // Show an alert for notifications
          }),
        });

    // Listener for receiving notifications while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          console.log('Notification received in foreground:', notification);
          // You might want to update the quote here if necessary
          setMotivationalQuote(notification.request.content.body);
        });

    // Listener for handling notification taps
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
       console.log('Notification tap received:', response);
       const quoteFromNotification = response.notification.request.content.body;
       console.log('quoteFromNotification', quoteFromNotification);
       setMotivationalQuote(quoteFromNotification); // Update the app state with new quote

        // Navigate to the QuoteScreen with the notification content
        console.log('navigating to quote screen')
         navigationRef.current?.navigate('Quote', { userName, quoteFromNotification });
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [userName]);

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Settings">
            {(props) => (
              <ConfigScreen
                {...props}
                setUserName={setUserName}
                deviceToken={deviceToken} // Pass device token to ConfigScreen
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Quote">
            {(props) => (
              <QuoteScreen
                {...props}
                motivationalQuote={motivationalQuote} // Pass the quote from App state
                userName={userName} // Pass the userName from App state
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

