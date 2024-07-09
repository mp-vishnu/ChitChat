import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

import {selectLoggedInUser, selectUserId} from '../../redux/auth/authSlice';
import LogoutButton from '../LogoutButton';
import {SafeAreaView} from 'react-native-safe-area-context';
const ChatScreen = () => {
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  const token = useSelector(selectLoggedInUser);
  const userId = useSelector(selectUserId);
  const chooseOption = option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  const navigation = useNavigation();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    // <View>
    //   <Text>ChatScreen hello helooo{token }</Text>
    //   <LogoutButton/>
    // </View>
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}>
        <Pressable>
          <Image
            style={{width: 30, height: 30, borderRadius: 15}}
            source={{
              uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo',
            }}
          />
        </Pressable>

        <Text style={{fontSize: 15, fontWeight: '500'}}>Chats</Text>

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <AntDesign name="camerao" size={26} color="black" />
            <MaterialIcons
              onPress={() => navigation.navigate('People')}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>
      <View style={{padding: 10}}>
        <Pressable
          onPress={() => chooseOption('Chats')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Chats</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>
        <View>
          {options?.includes('Chats') &&
            (chats?.length > 0 ? (
              <View>
                {chats?.map((item, index) => (
                  <Chat item={item} key={item?._id} />
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{textAlign: 'center', color: 'gray'}}>
                    No Chats yet
                  </Text>
                  <Text style={{marginTop: 4, color: 'gray'}}>
                    Get started by nessaging a friend
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <Pressable
          onPress={() => chooseOption('Requests')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
