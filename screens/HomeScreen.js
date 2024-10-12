import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this package installed
import Menu from '../components/Menu';

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuHeight] = useState(new Animated.Value(0)); // Initialize animated value

  const toggleMenu = () => {
    if (menuVisible) {
      // Close menu
      Animated.timing(menuHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setMenuVisible(false);

      });
    } else {
      // Open menu
      setMenuVisible(true);
      Animated.timing(menuHeight, {
        toValue: 150, // Adjust based on the number of items
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View className="flex-1 bg-blue-900 relative">
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleMenu} className="absolute top-6 right-6 z-10">
        <MaterialIcons name="menu" size={52} color="white" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Animated.View
        style={{
          height: menuHeight,
          overflow: 'hidden',
          position: 'absolute',
          top: 70, // Adjust based on your layout
          right: 15,
          width: 150, // Width of the menu
          borderRadius: 8,
          zIndex: 1000, // Ensure this is higher than other components
        }}
      >
        <Menu navigation={navigation} onClose={toggleMenu} />
      </Animated.View>

      {/* Welcome Message */}
      <View className='flex-1 justify-center items-center bg-blue-900'>
        <View className="bg-white p-6 rounded-lg shadow-lg mx-4">
          <Text className="text-4xl font-bold text-blue-600 mb-4 text-center">
            Welcome to Thrive!
          </Text>
          <Text className="text-lg text-gray-700 text-center">
            Empowering your personal growth journey, one quote at a time.
          </Text>
        </View>
      </View>
    </View>
  );
}
