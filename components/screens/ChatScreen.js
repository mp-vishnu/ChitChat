import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logout} from '../../redux/auth/authSlice';

import {
  selectLoggedInUser,
  selectUserId,
  getRequestAsync,
  selectRequests,
  acceptRequestAsync,
  getAllFriendsAsync,
  selectFriends,
} from '../../redux/auth/authSlice';
import Chat from '../Chat';
import LogoutButton from '../LogoutButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [options, setOptions] = useState(['Chats']);
  const chats = useSelector(selectFriends);
  const requests = useSelector(selectRequests);
  const token = useSelector(selectLoggedInUser);
  const userId = useSelector(selectUserId);
  const chooseOption = option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const acceptRequest = requestId => {
    const reqInfo = {
      userId: userId,
      requestId: requestId,
    };
    dispatch(acceptRequestAsync(reqInfo));
  };
  useEffect(() => {
    if (userId) {
      dispatch(getRequestAsync(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getAllFriendsAsync(userId));
    }
  }, [userId, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('AuthStack');
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
              uri: 'https://signal.org/assets/images/features/Media.png',
            }}
          />
        </Pressable>

        <Text style={{fontSize: 15, fontWeight: '500'}}>Chats</Text>

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            {/* <AntDesign name="camerao" size={26} color="black" /> */}

            <MaterialIcons
              onPress={() => navigation.navigate('People')}
              name="person-outline"
              size={26}
              color="black"
            />
            <Ionicons
              onPress={handleLogout}
              name="log-out-outline"
              size={30}
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

        <View style={{marginVertical: 12}}>
          {options?.includes('Requests') && (
            <View>
              <Text style={{fontSize: 15, fontWeight: '500'}}>
                Checkout all the requests
              </Text>

              {requests?.map((item, index) => (
                <Pressable style={{marginVertical: 12}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Pressable>
                      <Image
                        source={{uri: item?.from?.image}}
                        style={{width: 40, height: 40, borderRadius: 20}}
                      />
                    </Pressable>

                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {item?.from?.name}
                      </Text>

                      <Text style={{marginTop: 4, color: 'gray'}}>
                        {item?.message}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => acceptRequest(item?.from?._id)}
                      style={{
                        padding: 8,
                        backgroundColor: '#005187',
                        width: 75,
                        borderRadius: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Accept
                      </Text>
                    </Pressable>

                    <AntDesign name="delete" size={26} color="red" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
