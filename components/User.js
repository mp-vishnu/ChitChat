import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectUserId,
  selectUserName,
  sendRequestAsync,
  resetReqStatus,
} from '../redux/auth/authSlice';

const User = ({item}) => {
  const userId = useSelector(selectUserId);
  const name = useSelector(selectUserName);
  const [flag, setFlag] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const sendRequest = async () => {
    const userData = {
      senderId: userId,
      receiverId: item._id,
      message: `Request from ${name}`,
    };

    dispatch(sendRequestAsync(userData));
    Alert.alert(
      'Your request has been shared',
      'Wait for the user to accept your request',
    );
    const reqstatus = useSelector(selectReqStatus);
    if (reqstatus === 1) {
      dispatch(resetReqStatus());
      Alert.alert(
        'Your request has been shared',
        'Wait for the user to accept your request',
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Pressable>
          <Image source={{uri: item?.image}} style={styles.userImage} />
        </Pressable>
        <View style={styles.details}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.email}>{item?.email}</Text>
        </View>
        <Pressable
          onPress={sendRequest}
          style={{
            padding: 10,
            width: 80,
            backgroundColor: '#005187',
            borderRadius: 4,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Send Request
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 0,
    backgroundColor: '#e9ecf2',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'black',
  },
});

export default User;
