import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useClerk, useUser } from '@clerk/clerk-react'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { signOut } = useClerk(); // Assuming Clerk's hook provides the current user info
  const {user}=useUser();
  const handleLogout = async () => {
    try {
      await signOut(); // Assuming Clerk provides a signOut method
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        { text: 'Yes', onPress: handleLogout },
      ],
      { cancelable: true }
    );
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile Screen</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri:user.imageUrl }} // Gmail logo
          style={styles.logo}
        />
        <Text style={styles.email}>{user?.fullName}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress.emailAddress || 'Email not available'}</Text>
        
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('MainHomeScreen')}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('Contact')}>
          <Ionicons name="mail" size={24} color="white" />
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateTo('About')}>
          <Ionicons name="information-circle" size={24} color="white" />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={confirmLogout}>
          <Ionicons name="log-out" size={24} color="white" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
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
  profileCard: {
    backgroundColor: '#D8BFD8',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 7,
    color: '#333',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    width: '40%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
