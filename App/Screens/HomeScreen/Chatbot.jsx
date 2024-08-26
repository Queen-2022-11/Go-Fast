import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');
      generateBotResponse(input, newMessages);
    }
  };

  const generateBotResponse = (userInput, currentMessages) => {
    let botResponse = '';

    if (userInput.toLowerCase().includes('about')) {
      botResponse = `Our app "Go Fast" is a service provider platform created by Prarthana Sawant, specifically for Mumbai. We offer services like cleaning, AC repair, painting, and plumbing.`;
    } else if (userInput.toLowerCase().includes('register')) {
      botResponse = `To register as a service provider on our platform, there is a fee of Rs 500 per month. After registration, you'll be able to offer your services to users and manage appointments and if you want use the app as user then it is free`;
    } else if (userInput.toLowerCase().includes('i want to provider service') || userInput.toLowerCase().includes('yes') || userInput.toLowerCase().includes('i want to register')) {
      botResponse = `Great! Please transfer Rs 500 for one Month subscription through UPI on this mobile number +919867165097. Once the payment is done, Contact us on email id : sawantprarthana17@gmail.com.`;
    } else if (userInput.toLowerCase().includes('payment') || userInput.toLowerCase().includes('pay')) {
      botResponse = `You can make the payment of 500 Rs for one Month subscription using UPI, net banking, or a direct bank transfer on this mobile number +919867165097. After payment, send us the confirmation. Once the payment is confirmed, Contact us on email id : sawantprarthana17@gmail.com.`;
    }
    else if (userInput.toLowerCase().includes('ok' && 'goy it')) {
      botResponse = `If you have any more questions or need further assistance, feel free to ask. Good luck with your app`;
    }
    else if (userInput.toLowerCase().includes('Thanks' && 'Thank')) {
      botResponse = `You're welcome!`;
    }
    else if (userInput.toLowerCase().includes('I want to register as user')) {
      botResponse = `To register as user then it is free and have a great experience using our app`;
    }
  
     else {
      botResponse = "Hii how can i help you";
    }
    

    const newMessages = [...currentMessages, { text: botResponse, user: false }];
    setMessages(newMessages);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.user ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={[styles.messageText, { color: message.user ? 'white' : 'black' }]}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    paddingTop: 10, // Increased padding from top
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
    paddingTop: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Chatbot;
