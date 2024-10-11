import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this package installed

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleMenu = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View className="flex-1 bg-blue-900 relative">
      {/* Hamburger Icon */}
      <TouchableOpacity onPress={toggleMenu} className="absolute top-6 right-6 z-10">
        <MaterialIcons name="menu" size={32} color="white" />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleMenu}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-80 p-6 rounded-lg shadow-lg">
            <Text className="text-lg font-bold mb-4 text-gray-800 text-center">Menu</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home');
                toggleMenu();
              }}>
              <Text className="text-lg text-gray-700 mb-2">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Quote');
                toggleMenu();
              }}>
              <Text className="text-lg text-gray-700 mb-2">Quote Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Config');
                toggleMenu();
              }}>
              <Text className="text-lg text-gray-700 mb-2">Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
