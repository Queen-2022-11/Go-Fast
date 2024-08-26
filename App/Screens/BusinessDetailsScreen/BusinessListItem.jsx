import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default function BusinessListItem({ name, about, address, email, contactPerson, image, onPress }) {
  const imageUrl = image || 'https://via.placeholder.com/150x100';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} onError={() => console.log('Error loading image', image)} />
      <View style={styles.textContainer}>
      <Text style={styles.contactPerson}>{contactPerson}</Text>
        <Text style={styles.name}>{name}</Text>
        {/* <Text style={styles.about}>{about}</Text> */}
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={16} color="gray" style={styles.addressIcon} />
          <Text style={styles.address}>{address}</Text>
        </View>
        <Text style={styles.email}>{email}</Text>
       
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  about: {
    fontSize: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressIcon: {
    marginRight: 5,
  },
  address: {
    fontSize: 14,
    color: 'black',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  contactPerson: {
    fontSize: 14,
    color: 'gray',
  },
});
