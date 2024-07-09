import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';

import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PeopleScreen from '../screens/PeopleScreen';
import RequestChatRoom from '../screens/RequestChatRoom';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          tabBarStyle: {backgroundColor: '#101010'},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="chat-bubble-outline"
              size={30}
              color={focused ? 'white' : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarStyle: {backgroundColor: '#101010'},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="person-outline"
              size={30}
              color={focused ? 'white' : 'grey'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="People"
        component={PeopleScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Request" component={RequestChatRoom} />
    </Stack.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      {/* <MainStack />
      <AuthStack/> */}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  containerIOS: {
    paddingTop: 50, // Adjust as needed
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
