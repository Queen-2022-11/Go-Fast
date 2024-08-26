import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToChatbot = () => {
    navigation.navigate('Go Fast'); 
  };
  const handleSignIn = useCallback(async () => {
    if (!isLoaded) {
      console.log('Clerk not loaded yet');
      return;
    }

    console.log('Attempting sign-in with:', email, password);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      console.log('Sign-in attempt result:', signInAttempt);

      if (signInAttempt.status === 'complete') {
        console.log('Sign-in successful. Setting active session.');
        await setActive({ session: signInAttempt.createdSessionId });
        navigation.navigate('HomeScreen');
      } else {
        console.error('Sign-in failed:', signInAttempt.error);
        // Log more details about the error if available
        if (signInAttempt.error && signInAttempt.error.stack) {
          console.error('Sign-in error details:', signInAttempt.error.stack);
        }
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      // Log more details about the error if available
      if (error.stack) {
        console.error('Sign-in error details:', error.stack);
      }
    }
  }, [email, password, isLoaded, signIn, setActive, navigation]);

  return (
    <ScrollView>
       
      <View style={styles.container}>
        <View style={styles.chatContainer}>
      <TouchableOpacity style={styles.chatButton} onPress={goToChatbot}>
        <Ionicons name="chatbubble" size={25} color="white" />
      </TouchableOpacity>
      </View>
        <Image
          resizeMode="contain"
          source={require('./../../../assets/Login.png')}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome To Go Fast</Text>
          <Text style={styles.subtitle}>Login</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 320,
    alignSelf: 'center',
    marginBottom: 20,
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chatButton: {
    backgroundColor: '#007BFF', // Blue background
    padding: 10,
    borderRadius: 50,
    elevation: 5, // Add shadow for elevation
   
   
  },
  chatContainer:{
    alignSelf: 'flex-end',
    padding :8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#3cba54',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
