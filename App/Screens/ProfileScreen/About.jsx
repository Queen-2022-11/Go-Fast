import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          We are a dedicated service provider based in Mumbai, offering a range of home services including cleaning, AC repair, painting, and plumbing. Our mission is to provide top-notch service with reliability and excellence.
        </Text>
        <Text style={styles.description}>
          Created by: Prarthana Sawant
        </Text>
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
  },
});
