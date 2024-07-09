import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useDispatch , useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectLoggedInUser } from '../../redux/auth/authSlice';
import LogoutButton from '../LogoutButton';
const ChatScreen = () => {
  const [token, setToken] = useState(null);
  const [options, setOptions] = useState(['Chats']);
  const [chats, setChats] = useState([]);
  const [requests, setRequests] = useState([]);
  // const token = useSelector(selectLoggedInUser);
  return (
    <View>
      <Text>ChatScreen hello helooo{token }</Text>
      <LogoutButton/>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})