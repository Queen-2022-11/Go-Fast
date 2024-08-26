import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import Login from './App/Screens/LoginScreen/Login';
import Home from './App/Screens/HomeScreen/Home';
import SignUp from './App/Screens/LoginScreen/SignUp';
import HomeScreen from './App/Screens/HomeScreen/HomeScreen';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { GraphQLClient, gql } from 'graphql-request';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'; // Import error messages
import BusinessDetailsScreen from './App/Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import Categories from './App/Screens/HomeScreen/Categories';
import MainHomeScreen from './App/Screens/HomeScreen/MainHomeScreen';
import Chatbot from './App/Screens/HomeScreen/Chatbot';

const Stack = createStackNavigator();


if (__DEV__) {
  loadDevMessages(); // Load dev messages
  loadErrorMessages(); // Load all error messages
}

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_cmVuZXdpbmctb2N0b3B1cy0yMS5jbGVyay5hY2NvdW50cy5kZXYk'>
      
        <NavigationContainer>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <ClerkLoaded>
              <SignedIn>
                <Stack.Navigator initialRouteName="HomeScreen">
                  <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                  />
                  {/* <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={{ headerShown: false }}
                  /> */}
                  <Stack.Screen
                    name="Main"
                    component={MainHomeScreen}
                    options={{ headerShown: false }}
                  />
                
                 
                  {/* <Stack.Screen
                    name="Slider"
                    component={Slider}
                    options={{ headerShown: false }}
                  /> */}
                  {/* <Stack.Screen
                    name="BusinessList"
                    component={Businesslist}
                    options={{ headerShown: false }}
                  /> */}
                   
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={({ navigation }) => ({
                      title: 'Login',
                      headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} />
                        </TouchableOpacity>
                      ),
                    })}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={({ navigation }) => ({
                      title: 'Sign Up',
                      headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} />
                        </TouchableOpacity>
                      ),
                    })}
                  />
                </Stack.Navigator>
              </SignedIn>
              <SignedOut>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen
                    name="Go Fast"
                    component={Chatbot}
                    
                  />
                </Stack.Navigator>
              </SignedOut>
            </ClerkLoaded>
          </View>
        </NavigationContainer>
    
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    marginLeft: 10,
  },
});
