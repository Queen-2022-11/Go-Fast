import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSignUp, useSession } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const { signUp, isLoaded } = useSignUp();
  const { session } = useSession();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  const handleSignUp = async () => {
    try {
      // Check if there's an active session
      if (!isLoaded) {
        Alert.alert('Error', 'Clerk is not loaded yet.');
        return;
      }

      if (session) {
        Alert.alert('Error', 'User already has an active session. Please log out first.');
        return;
      }

      const result = await signUp.create({
        emailAddress: email,
        password: password,
      });

      console.log('Sign-up successful:', result);

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (error) {
      console.error('Sign-up error:', error);
      if (error.status === 422 && error.errors && error.errors[0].code === 'form_password_pwned') {
        Alert.alert('Password Error', 'Password has been found in an online data breach. For account safety, please use a different password.');
      } else {
        Alert.alert('Sign-up Error', 'An error occurred during sign-up. Please try again.');
      }
    }
  };

  const onPressVerify = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        console.log('Sign-up and verification completed successfully:', completeSignUp);
        navigation.navigate('Login'); // Navigate to login screen after successful signup and verification
      } else {
        Alert.alert('Verification Error', 'Sign-up and verification failed. Please check your verification code.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Verification Error', 'An error occurred during verification. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome To Go Fast</Text>
          <Text style={styles.subtitle}>Sign Up</Text>

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Email"
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {pendingVerification && (
            <>
              <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder="Enter Verification Code"
                autoCapitalize="none"
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.button} onPress={onPressVerify}>
                <Text style={styles.buttonText}>Verify Email</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#3cba54', // green shade
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default SignUp;
