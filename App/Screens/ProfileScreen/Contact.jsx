import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Contact() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:gofast@gmail.com');
  };

  const handleCallPress = () => {
    Linking.openURL('tel:+91908762421');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.infoContainer}>
          <Ionicons name="mail" size={24} color="#4A90E2" />
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.infoText}>gofast@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="call" size={24} color="#4A90E2" />
          <TouchableOpacity onPress={handleCallPress}>
            <Text style={styles.infoText}>+91 90876 2421</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Ionicons name="location" size={24} color="#4A90E2" />
          <Text style={styles.infoText}>Mumbai, India</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA', // Light purple background
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF', // White card background
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Android shadow
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4A4A4A',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4A90E2',
  },
});
