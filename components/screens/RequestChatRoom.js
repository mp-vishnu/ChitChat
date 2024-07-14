import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  selectUserId,
  selectLoggedInUser,
  sendRequestAsync,
  resetReqStatus,
  selectReqStatus,
} from '../../redux/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import LogoutButton from '../LogoutButton';
const RequestChatRoom = () => {
  const navigation = useNavigation();
  const token = useSelector(selectLoggedInUser);
  const userId = useSelector(selectUserId);
  const [message, setMessage] = useState('');
  const route = useRoute();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <View>
            <Text>{route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, []);

  console.log('Rec', route?.params.receiverId);
  const sendMessage = async () => {
    const userData = {
      senderId: userId,
      receiverId: route?.params?.receiverId,
      message: message,
    };

    dispatch(sendRequestAsync(userData));
    Alert.alert(
      'Your request has been shared',
      'wait for the user to accept your request',
    );
    const reqstatus = useSelector(selectReqStatus);
    if (reqstatus === 1) {
      dispatch(resetReqStatus());
      setMessage('');
      Alert.alert(
        'Your request has been shared',
        'wait for the user to accept your request',
      );
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView></ScrollView>
      <LogoutButton />
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
          onPress={sendMessage}
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

export default RequestChatRoom;

const styles = StyleSheet.create({});
