import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectUserId, getMessageAsync} from '../redux/auth/authSlice';
const Chat = ({item}) => {
  const userId = useSelector(selectUserId);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const senderId = userId;
    const receiverId = item?._id;

    const response = dispatch(
      getMessageAsync({params: {senderId, receiverId}}),
    );

    setMessages(response.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  const getLastMessage = () => {
    if (messages) {
      const n = messages.length;

      return messages[n - 1];
    }
  };
  const lastMessage = getLastMessage();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('ChatRoom', {
          name: item?.name,
          receiverId: item?._id,
          image: item?.image,
        })
      }
      style={{marginVertical: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Pressable>
          <Image
            source={{uri: item?.image}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
        </Pressable>

        <View>
          <Text style={{fontSize: 15, fontWeight: '500'}}>{item?.name}</Text>
          <Text style={{marginTop: 4, color: 'gray'}}>
            {lastMessage
              ? lastMessage.message
              : `Start chat with ${item?.name}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Chat;

const styles = StyleSheet.create({});
