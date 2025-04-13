// src/screens/CameraScreen.js

import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const captureImage = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        navigation.navigate('EmotionRecognitionScreen', { imageUri: result.uri });
      }
    }
  };

  return (
    <View>
      <Button title="Capture Face" onPress={captureImage} />
      {!hasPermission && <Text>No access to camera</Text>}
    </View>
  );
};

export default CameraScreen;
