import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useClerk } from '@clerk/clerk-react'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import Slider from './Slider';
import 'react-native-url-polyfill/auto';
import Categories from './Categories';
import Businesslist from './BusinessList';

export default function MainHomeScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home Screen</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Ionicons name="log-out" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome to Go Fast</Text>
        <SearchBar
          placeholder="Search..."
          onChangeText={setSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>
     
      <Text style={styles.Text}>Offers for you</Text>
      <Slider/>
      <View style={styles.categoriesHeader}>
        <Text style={styles.Text}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.Texts}>View All</Text>
        </TouchableOpacity>
      </View>
      <Categories navigation={navigation}/>
      <View style={styles.categoriesHeader}>
        <Text style={styles.Text}>Business</Text>
        <TouchableOpacity>
          <Text style={styles.Texts}>View All</Text>
        </TouchableOpacity>
      </View>
      <Businesslist />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  Text : {
    fontSize:20,
    fontWeight: 'bold',
  },
  Texts : {
    fontSize:16,
  },
  container: {
    flexGrow: 1, // Ensure ScrollView takes up the available space
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1', // Light blue-gray background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50', // Dark blue text color
  },
  logoutButton: {
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#FFC0CB', // White background for the card
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000', // Orange color for the welcome text
  },
  searchContainer: {
    backgroundColor: '#9370DB', // Bright blue background for the search bar container
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
    borderRadius: 5,
  },
  searchInputContainer: {
    backgroundColor: '#A9A9A9', // White background for the input container
    borderRadius: 5,
  },
  searchInput: {
    color: '#333', // Dark gray text color for the search input
  },
});
