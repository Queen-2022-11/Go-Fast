import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { getBusinessList } from '../../Utils/GlobalApi'; // Adjust import path if needed

export default function Businesslist() {
  const [data, setData] = useState(null);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBusinessList();
        setData(response.businesslists);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const imageUrl = item?.image?.[0]?.url; // Access the URL from the first image in the array
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: imageUrl || 'https://via.placeholder.com/150x100' }} // Fallback image
                style={styles.header}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.contact}>{item.contactPerson}</Text>
                <Text style={styles.category}>{item?.category?.name || 'No category'}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 15,
    padding: 10,
    width: 200, // Adjust width as needed
  },
  header: {
    width: '100%',
    height: 120, // Fixed height for image
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 16,
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#E0B0FF', // Light purple color for category
  },
});
