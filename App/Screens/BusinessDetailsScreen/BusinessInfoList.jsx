import React, { useState } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookingDetails from '../Booking/BookingDetails';

export default function BusinessInfoList({ contactPerson, name, about, address,businessId, email, image }) {
  const imageUrl = image || 'https://via.placeholder.com/150x100';
  const [showModal,setShowModal] =useState(false)
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} onError={() => console.log('Error loading image', image)} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.about}>{about}</Text>
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={16} color="#007BFF" style={styles.addressIcon} />
          <Text style={styles.address}>{address}</Text>
        </View>
        <Text style={styles.contactPerson}>{contactPerson}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>setShowModal(true)}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        
      </View>
      <Modal
      animationType='slide'
       visible={showModal}
      >
       <BookingDetails 
       businessId={businessId}
       onClose={handleCloseModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Android shadow
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'sans-serif',
    color: '#333',
    textAlign: 'center',
  },
  about: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'sans-serif',
    color: '#555',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressIcon: {
    marginRight: 5,
  },
  address: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'sans-serif-light',
  },
  contactPerson: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontFamily: 'sans-serif',
  },
  email: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'sans-serif',
  },
});
