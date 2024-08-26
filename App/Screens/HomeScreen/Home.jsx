import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 

const Home = () => {
  const navigation = useNavigation();

 

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../../assets/HomeScreen.jpg')}
        style={styles.image}
        resizeMode="stretch"
      />
     
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Let us find professional cleaning and repair services with Go Fast
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 1, // Adjust height as needed
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  chatButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007BFF', // Blue background
    padding: 10,
    borderRadius: 50,
    elevation: 5, // Add shadow for elevation
  },
});

export default Home;
