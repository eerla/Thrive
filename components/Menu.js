// components/Menu.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Menu = ({ navigation, onClose }) => {

  return (
    <View className="bg-white p-1 rounded-lg">
      <TouchableOpacity onPress={() => { navigation.navigate('Home'); onClose(); }}>
        <Text className="p-1 text-lg text-gray-800">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Quote'); onClose(); }}>
        <Text className="p-1 text-lg text-gray-800">Quote Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Config'); onClose(); }}>
        <Text className="p-1 text-lg text-gray-800">Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
