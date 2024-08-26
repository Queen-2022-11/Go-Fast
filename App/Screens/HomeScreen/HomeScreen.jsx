import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import Booking from '../Booking/Booking';
import { useClerk } from '@clerk/clerk-react';
import MainHomeScreen from './MainHomeScreen';
import BusinessDetailsScreen from '../BusinessDetailsScreen/BusinessDetailsScreen';
import BusinessInfo from '../BusinessDetailsScreen/BusinessInfo';
import Contact from '../ProfileScreen/Contact';
import About from '../ProfileScreen/About';
import Chatbot from './Chatbot';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainHomeScreenStack = () => (
  <Stack.Navigator initialRouteName="MainHomeScreen">
    <Stack.Screen
      name="MainHomeScreen"
      component={MainHomeScreen}
      options={{headerShown: false}}
    />
      
    
    <Stack.Screen
      name="Contact"
      component={Contact}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="About"
      component={About}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="BusinessDetailsScreen"
      component={BusinessDetailsScreen}
    options={({ route, navigation }) => ({
      title: route.params.categoryName,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      ),
    })}
    />
    <Stack.Screen
      name="BusinessInfo"
      component={BusinessInfo}
    options={({ route, navigation }) => ({
      title: route.params.categoryName,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      ),
    })}
    />
  </Stack.Navigator>)


const HomeScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={MainHomeScreenStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={Booking}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  ontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 10,
  },
});

export default HomeScreen;
