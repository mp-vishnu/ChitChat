import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Device = () => {
  return (
    <View style={[styles.container, Platform.OS === 'ios' && styles.containerIOS]}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  containerIOS: {
    paddingTop: 50, // Adjust as needed
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Device;
