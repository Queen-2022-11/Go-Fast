import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getBusinessListById } from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import BusinessInfoList from './BusinessInfoList';

export default function BusinessInfo() {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryName } = route.params;
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    if (categoryName) {
      getBusinessList();
    }
  }, [categoryName]);

  const getBusinessList = async () => {
    try {
      const response = await getBusinessListById(categoryName);
      setBusinessList(response.businesslists);

      console.log(response);
    } catch (error) {
      console.error('Error fetching business list:', error);
    }
  };

  const handleBusinessPress = (categoryName) => {
    navigation.navigate('BusinessInfo', { categoryName });
  };

  const renderBusinessItem = ({ item }) => (
    <BusinessInfoList
      contactPerson={item.contactPerson}
      name={item.name}
      address={item.address}
      about={item.about}
      email={item.email}
      businessId={item.id}
      image={item?.image?.[0]?.url}
      onPress={() => handleBusinessPress(item.name)}// Pass the business item to handleBusinessPress
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={businessList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBusinessItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
