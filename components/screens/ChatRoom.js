import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useSocketContext} from '../SocketContext';
import {
  selectUserId,
  selectLoggedInUser,
  getMessageAsync,
  sendMessageAsync,
} from '../../redux/auth/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import LogoutButton from '../LogoutButton';

const ChatRoom = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = useSelector(selectLoggedInUser);
  const userId = useSelector(selectUserId);
  const {socket} = useSocketContext();
  const route = useRoute();
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Text>{route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, [navigation, route?.params?.name]);

  useEffect(() => {
    socket?.on('newMessage', newMessage => {
      newMessage.shouldShake = true;
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket]);

  const sendMessage = async (senderId, receiverId) => {
    const response = dispatch(
      sendMessageAsync({senderId, receiverId, message}),
    );
    console.log('message send <><><> ', response.arg.senderId);
    if (response.arg.senderId === senderId) {
      socket.emit('sendMessage', {senderId, receiverId, message});
      setMessage('');
      setTimeout(() => {
        fetchMessages();
      }, 100);
    } else {
      console.log('Failed to send message');
    }
  };

  const fetchMessages = async () => {
    const senderId = userId;
    const receiverId = route?.params?.receiverId;
    try {
      const result = await dispatch(getMessageAsync({senderId, receiverId}));
      console.log('result <><><> ', result);

      if (getMessageAsync.fulfilled.match(result)) {
        console.log('Fetched messages:', result.payload);
        setMessages(result.payload); // Set the messages to the state
      } else {
        console.error('Failed to fetch messages:', result.payload);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [messages]);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView ref={scrollViewRef}>
        {messages?.map(item => (
          <Pressable
            key={item._id}
            style={[
              item?.senderId?._id === userId
                ? {
                    alignSelf: 'flex-end',
                    backgroundColor: '#DCF8C6',
                    padding: 8,
                    maxWidth: '60%',
                    borderRadius: 7,
                    margin: 10,
                  }
                : {
                    alignSelf: 'flex-start',
                    backgroundColor: 'white',
                    padding: 8,
                    margin: 10,
                    borderRadius: 7,
                    maxWidth: '60%',
                  },
            ]}>
            <Text style={{fontSize: 13, textAlign: 'left'}}>
              {item?.message}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                fontSize: 9,
                color: 'gray',
                marginTop: 4,
              }}>
              {formatTime(item?.timeStamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          marginBottom: 20,
        }}>
        <Entypo name="emoji-happy" size={24} color="gray" />

        <TextInput
          placeholder="type your message..."
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#ddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
            marginLeft: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}>
          <Entypo name="camera" size={24} color="gray" />
          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          onPress={() => sendMessage(userId, route?.params?.receiverId)}
          style={{
            backgroundColor: '#0066b2',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
