// src/screens/RegistrationScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const handleRegister = async () => {
    // Save user data locally
    await AsyncStorage.setItem('userInfo', JSON.stringify({ name, phone, emergencyContact }));
    navigation.navigate('CameraScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={styles.label}>Emergency Contact:</Text>
      <TextInput style={styles.input} value={emergencyContact} onChangeText={setEmergencyContact} keyboardType="phone-pad" />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
});

export default RegistrationScreen;
