import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createUserAsync } from '../../redux/auth/authSlice';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  });

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleRegister = () => {
    const { name, email, password, image } = user;
    if (!name || !email || !password || !image) {
      Alert.alert('Please fill in all fields');
      return;
    } else {
      dispatch(
        createUserAsync({
          name,
          email,
          password,
          image
        })
      );
      Alert.alert(
        'Registration Successful',
        'You have been registered successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate("Login") // Navigate to login screen after successful registration
          }
        ]
      );
      // Optionally clear the form fields here if needed
      // setUser({ name: "", email: "", password: "", image: "" });
    }
  };
  useEffect(() => {
    console.log('User image updated:', user.image);
  }, [user.image]);
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 20 }}>
              Set up your profile
            </Text>

            <Pressable onPress={() => console.log('Add image')}>
              <Image
                source={{
                  uri: user.image
                  ? user.image
                  : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
              }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
              <Text style={{ textAlign: 'center', marginTop: 4, color: 'gray', fontSize: 12 }}>
                Add
              </Text>
            </Pressable>

            <TextInput
              value={user.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Enter your name"
              style={styles.input}
              
            />

            <TextInput
              value={user.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter your email"
              style={styles.input}
            />

            <TextInput
              value={user.password}
              onChangeText={(text) => handleChange('password', text)}
              placeholder="Enter your password"
              secureTextEntry={true}
              style={styles.input}
            />

            <TextInput
              value={user.image}
              onChangeText={(text) => handleChange('image', text)}
              placeholder="Enter your image URL"
              style={styles.input}
            />

            <Pressable onPress={handleRegister} style={styles.registerButton}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Register
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16, marginTop: 12 }}>
                Already have an account? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: 15,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontFamily: 'GeezaPro-Bold',
  },
  registerButton: {
    width: 200,
    backgroundColor: '#4A55A2',
    padding: 15,
    marginTop: 38,
    borderRadius: 6,
    alignSelf: 'center',
  },
});

export default RegisterScreen;
