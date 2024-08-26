import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { getSliderData } from '../../Utils/GlobalApi'; // Adjust import path if needed

export default function Slider() {
  const [data, setData] = useState(null);
 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSliderData();
        setData(response.sliders);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  return (
    <View>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginRight: 20, paddingBottom: 20 }}>
            <Image
              source={{ uri: item.image.url }}
              style={styles.header}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 270,
    height: 150,
    resizeMode: 'contain', // Use 'resizeMode' instead of 'objectFit'
    borderRadius: 20,
    paddingBottom: 20,
  },
});
