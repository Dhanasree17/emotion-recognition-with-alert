// src/App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from './screens/RegistrationScreen';
import CameraScreen from './screens/CameraScreen';
import EmotionRecognitionScreen from './screens/EmotionRecognitionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistrationScreen">
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="EmotionRecognitionScreen" component={EmotionRecognitionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
