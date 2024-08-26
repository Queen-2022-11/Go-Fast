import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useClerk } from '@clerk/clerk-react'; 
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getUserBooking } from '../../Utils/GlobalApi'; // Import the function to fetch bookings

export default function Booking() {
  const navigation = useNavigation();
  const { signOut, user } = useClerk(); // Assuming Clerk's hook provides the current user info
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (user?.primaryEmailAddress) {
      fetchUserBookings(user.primaryEmailAddress);
    }
  }, [user]);

  const fetchUserBookings = async (email) => {
    setLoading(true);
    try {
      const data = await getUserBooking(email);
      setBookings(data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
    setLoading(false)
  };

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

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity style={styles.bookingItem}>
      <Image source={{ uri: item?.businesslist.image?.[0]?.url  }} style={styles.image} />
      <View style={styles.bookingDetails}>
        <Text style={styles.businessName}>{item.businesslist.name}</Text>
        <Text style={styles.bookingInfo}>Date: {item.date}</Text>
        <Text style={styles.bookingInfo}>Time: {item.time}</Text>
        <Text style={styles.bookingInfos}>Status: {item.bookingStatus}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Bookings</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookingItem}
        ListEmptyComponent={<Text style={styles.noBookingText}>No bookings found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 10,
  },
  bookingItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode:'contain'
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookingInfo: {
    fontSize: 14,
    color: '#555',
  },
  bookingInfos: {
    fontSize: 15,
    color: '#4A90E2',
    backgroundColor:'#E6E6FA',
    padding:3,
    borderRadius:3,
    alignSelf:'flex-start',
    paddingHorizontal:7,

  },
  noBookingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});
