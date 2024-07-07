import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {selectName } from '../../redux/user/userSlice';


const LoginScreen = () => {
  const name = useSelector(selectName);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
 
  // const handleLogin = () => {
  //   const user = {
  //     email: email,
  //     password: password,
  //   };

  //   axios.post('http://localhost:4000/login', user).then(response => {
  //     const token = response.data.token;
  //     console.log("token", token);
  //     AsyncStorage.setItem('authToken', token);
  //     setToken(token);
  //   });
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10, alignItems: 'center' }}>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 80, alignItems: 'center', justifyContent: "center" }}>
            <Text>
              Login to your account
            </Text>
          </View>
          <View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: 'grey' }}>
                Email
              </Text>
              <View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#BEBEBE"
                  style={{
                    width: 320, marginTop: 15, borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1, paddingBottom: 10,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: email ? 15 : 15
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
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#BEBEBE"
                  secureTextEntry
                  style={{
                    width: 320, marginTop: 15, borderBottomColor: "#BEBEBE",
                    borderBottomWidth: 1, paddingBottom: 10,
                    fontFamily: "GeezaPro-Bold",
                    fontSize: password ? 15 : 15
                  }}
                  placeholder="Enter your password"
                />
              </View>
            </View>
            <Pressable
              // onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: '#4A55A2',
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
                Login{name}
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
              source={{
                uri: 'https://signal.org/assets/images/features/Media.png',
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default LoginScreen;