import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getCategories } from '../../Utils/GlobalApi'; // Adjust import path if needed

export default function Categories({ navigation }) {
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setData(response.categories);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = (categoryName) => {
    navigation.navigate('BusinessDetailsScreen', { categoryName });
  };

  return (
    <View>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoryPress(item.name)}>
            <View style={styles.container}>
              <Image
                source={{ uri: item.icon.url }}
                style={styles.header}
              />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginRight: 45,
    paddingBottom: 20,
    borderRadius: 20,
  },
  header: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 20,
  },
});
