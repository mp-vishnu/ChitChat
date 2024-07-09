// src/components/LogoutButton.js

import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('AuthStack');
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default LogoutButton;
