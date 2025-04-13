// src/screens/EmotionRecognitionScreen.js

import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EmotionRecognitionScreen = ({ route, navigation }) => {
  const { imageUri } = route.params;
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      try {
        const response = await axios.post('http://your-flask-server-ip:5000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEmotion(response.data.emotion);
      } catch (error) {
        console.error(error);
      }
    };

    uploadImage();
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {emotion ? <Text style={styles.emotionText}>Detected Emotion: {emotion}</Text> : <Text>Processing...</Text>}
      <Button title="Back to Camera" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 300, height: 300, marginBottom: 20 },
  emotionText: { fontSize: 20, fontWeight: 'bold' },
});

export default EmotionRecognitionScreen;
