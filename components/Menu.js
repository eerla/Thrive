// components/Menu.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Menu = ({ navigation, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <View className="absolute top-0 left-0 right-0 bg-white p-5 shadow-md">
      <TouchableOpacity onPress={() => { navigation.navigate('Home'); onClose(); }}>
        <Text className="p-2 text-lg text-gray-800">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Quote'); onClose(); }}>
        <Text className="p-2 text-lg text-gray-800">Quote Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Config'); onClose(); }}>
        <Text className="p-2 text-lg text-gray-800">Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
