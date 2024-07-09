import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectUserId,
  getAllUsersAsync,
  selectAllUsers,
} from '../../redux/auth/authSlice';
import User from '../User';

const PeopleScreen = () => {
  const userId = useSelector(selectUserId);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getAllUsersAsync(userId));
    }
  }, [dispatch, userId]);

  const renderItem = ({item}) => <User item={item} />;

  const keyExtractor = item => item._id.toString();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>... people using chitchat ...</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 12,
  },
});

export default PeopleScreen;
