import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {selectName } from '../../redux/user/userSlice';
import { loginUserAsync } from '../../redux/auth/authSlice';
import { useDispatch , useSelector} from 'react-redux';
import { selectLoggedInUser,selectUserId } from '../../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const dispatch = useDispatch();
   const token = useSelector(selectLoggedInUser);
  //const token = null;
  const userId=useSelector(selectUserId);
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  useEffect(() => {
    if (token) {
      navigation.replace('MainStack');
    }
  }, [token, navigation, userId]);
  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };
   const handleLogin = () => {
    const {  email, password } = user;
    if (!email || !password ) {
      Alert.alert('Please fill in all fields');
      return;
    } else {
      dispatch(
        loginUserAsync({
          email,
          password,
        }))}
      // if(token)
      // {  AsyncStorage.setItem('authToken', token);}
        // const abc=useSelector(selectLoggedInUser)
        // Alert.alert(
        //   'Registration Successful')
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 80, alignItems: 'center', justifyContent: "center" }}>
            <Text>
              Login to your account {token} {userId}
            </Text>
          </View>
          <View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'grey' }}>
                Email
              </Text>
              <View>
                <TextInput
                  value={user.email}
                  onChangeText={(text) => handleChange('email', text)}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 320, marginTop: 15, borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1, paddingBottom: 10,
                    fontFamily: "GeezaPro-Bold",
                  }}
                  placeholder="Enter your email"
                />
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'grey' }}>
                Password
              </Text>
              <View>
                <TextInput
                  value={user.password}
                  onChangeText={(text) => handleChange('password', text)}
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry
                  style={{
                    width: 320, marginTop: 15, borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1, paddingBottom: 10,
                    fontFamily: "GeezaPro-Bold",
                  }}
                  placeholder="Enter your password"
                />
              </View>
            </View>
            <Pressable
               onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: '#5B84B1',
                padding: 15,
                marginTop: 50,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'gray',
                  fontSize: 16,
                  margin: 12,
                }}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: 140, height: 170 }}
              source={require('../img/abc.jpg')}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default LoginScreen;