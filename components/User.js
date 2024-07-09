import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const User = ({item}) => {
  const navigation = useNavigation();

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
          onPress={() =>
            navigation.navigate('Request', {
              name: item?.name,
              receiverId: item?._id,
            })
          }
          style={{
            padding: 10,
            width: 80,
            backgroundColor: '#005187',
            borderRadius: 4,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Chat</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
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
