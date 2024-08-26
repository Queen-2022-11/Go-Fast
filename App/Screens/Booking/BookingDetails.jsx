import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { addMonths } from 'date-fns';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { te } from 'date-fns/locale';
import { getBookingStatus } from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
export default function BookingDetails({ businessId,onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState();
  const {user}=useUser();
  console.log(businessId)
  // Grouped time slots
  const morningSlots = Array.from({ length: 8 }, (_, i) => `${i + 8}:00 AM`);
  const afternoonSlots = Array.from({ length: 4 }, (_, i) => `${i + 1}:00 PM`);
  const eveningSlots = Array.from({ length: 3 }, (_, i) => `${i + 8}:00 PM`);
  
  const slots = [...morningSlots, ...afternoonSlots, ...eveningSlots];
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotPress = (slot) => {
    setSelectedSlot(slot);
  };
  const createBooking = async () => {
    if (!selectedSlot || !selectedDate) {
      ToastAndroid.show("Please select date and time", ToastAndroid.SHORT);
      return;
    }

    const data = {
      userName: user?.fullName || '',
      userEmail: user?.primaryEmailAddress.emailAddress || '',
      date: moment(selectedDate).format('DD-MMM-yyyy'),
      note: note,
      time: selectedSlot,
      businessId: businessId,
    };

    try {
      await getBookingStatus(data);
      ToastAndroid.show("Booking Created Successfully", ToastAndroid.LONG);
      onClose();
    } catch (error) {
      ToastAndroid.show("Error creating booking", ToastAndroid.LONG);
      console.error("Error creating booking:", error.message);
      console.error("Error details:", error);
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.error("GraphQL Errors:", error.graphQLErrors.map(err => err.message));
      }
      if (error.networkError) {
        console.error("Network Error:", error.networkError.message);
      }
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Booking Details</Text>
      </View>
      <Text style={styles.label}>Select Date</Text>
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={handleDateChange}
          minDate={new Date()}
          maxDate={addMonths(new Date(), 3)}
          containerStyle={styles.calendarPickerContainer}
          customDayStyle={styles.customDayStyle}
          customDateStyle={styles.customDateStyle}
          width={350}
        />
      </View>
      <View>
      <Text style={styles.label}>Select Time Slots</Text>
      <FlatList
        data={slots}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSlotPress(item)}>
            <View style={[styles.slot, selectedSlot === item && styles.selectedSlot]}>
              <Text style={styles.slotText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.slotContainer}
        showsHorizontalScrollIndicator={false}
      />
      
      <Text style={styles.label}>Any suggestion</Text>
      <TextInput placeholder="Note"
      numberOfLines={4} multiline={true} style={styles.input}
      onChangeText={(text) =>setNote(text)}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={()=>createBooking()} >
          <Text style={styles.buttonText}> Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E0BBE4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  input :{
     borderWidth:1,
     borderRadius:15,
     textAlignVertical:'top',
     padding:20,
     fontSize:16,
     borderColor:'#E0BBE4',
     marginBottom:40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarContainer: {
    marginBottom: 20,
    backgroundColor: '#E0BBE4', // Light purple background
    padding: 4, // Add padding inside the card
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 3, // Android shadow
    maxWidth: '100%', // Ensure the container doesn't exceed the screen width
  },
  calendarPickerContainer: {
    backgroundColor: '#E0BBE4', // Light purple background
  },
  customDayStyle: {
    // Custom styles for day cells
  },
  customDateStyle: {
    // Apply styles to selected date
    backgroundColor: '#007BFF', // Blue background for selected date
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
  },
  slotContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  slot: {
    backgroundColor: '#E0BBE4', // Light purple background
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    minWidth: 80,
    maxHeight: 30,
    alignItems: 'center',
  },
  selectedSlot: {
    backgroundColor: '#007BFF', // Blue background for selected slot
  },
  slotText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});