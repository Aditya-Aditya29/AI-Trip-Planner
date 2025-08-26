import React, { useState, useEffect } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { askAllLLMs } from '../../src/services/LLmApi';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialPrompt, setShowInitialPrompt] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState({});

  const predefinedQuestions = [
    { id: 'q1', text: 'Number of people going?' },
    { id: 'q2', text: 'What is the age group (children, adults, seniors)?' },
    { id: 'q3', text: 'What is the budget for the trip?' },
    { id: 'q4', text: 'Which place do you want to visit?' },
    { id: 'q5', text: 'How many days will your trip be?' },
    { id: 'q6', text: 'What things do you want to experience?' },
    { id: 'q7', text: 'What activities are you interested in?' },
    { id: 'q8', text: 'What was the last place you visited (to avoid repetition)?' },
    { id: 'q9', text: 'What is your preferred hotel star rating (e.g., 3 stars or above)?' },
  ];

  useEffect(() => {
    if (!showInitialPrompt && currentQuestionIndex < predefinedQuestions.length && messages.length === 0) {
      // Display the first question as an assistant message
      setMessages([{
        id: 'initial-q',
        role: 'assistant',
        content: predefinedQuestions[currentQuestionIndex].text,
        model: 'Assistant'
      }]);
    }
  }, [showInitialPrompt, currentQuestionIndex, messages]);

  const handleStartPlanning = () => {
    setShowInitialPrompt(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    if (!showInitialPrompt && currentQuestionIndex < predefinedQuestions.length) {
      // This is an answer to a predefined question
      const currentQuestionId = predefinedQuestions[currentQuestionIndex].id;
      setCollectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionId]: input,
      }));

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < predefinedQuestions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now().toString() + '-q',
            role: 'assistant',
            content: predefinedQuestions[nextQuestionIndex].text,
            model: 'Assistant'
          }
        ]);
        setIsLoading(false); // No LLM call, so stop loading
      } else {
        // All questions answered, compile prompt and send to LLMs
        let compiledPrompt = "Plan a trip with the following details:\n";
        predefinedQuestions.forEach((q, index) => {
          compiledPrompt += `* ${q.text}: ${collectedAnswers[q.id] || 'N/A'}${index === predefinedQuestions.length - 1 ? '' : '\n'}`;
        });
        // The prompt should now be a direct request for trip planning based on collected answers

        try {
          const { optionA, optionB, optionC } = await askAllLLMs(compiledPrompt);
          const newMessages = [
            { id: Date.now() + '1', role: 'assistant', content: optionA, model: 'Option 1' },
            { id: Date.now() + '2', role: 'assistant', content: optionB, model: 'Option 2' },
            { id: Date.now() + '3', role: 'assistant', content: optionC, model: 'Option 3' },
          ];
          setMessages((prev) => [...prev, ...newMessages]);
        } catch (error) {
          console.error('Error sending message:', error);
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 'error', role: 'system', content: 'Error: Could not get response.', model: 'System' },
          ]);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      // Normal chat message
      try {
        const { optionA, optionB, optionC } = await askAllLLMs(input);
        const newMessages = [
          { id: Date.now() + '1', role: 'assistant', content: optionA, model: 'Option 1 ' },
          { id: Date.now() + '2', role: 'assistant', content: optionB, model: 'Option 2' },
          { id: Date.now() + '3', role: 'assistant', content: optionC, model: 'Option 3' },
        ];
        setMessages((prev) => [...prev, ...newMessages]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 'error', role: 'system', content: 'Error: Could not get response.', model: 'System' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.role === 'user' ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>
        {item.role === 'assistant' ? `${item.model}: ` : ''}
        {item.content} 
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>AI Trip Planner Chat</Text>
      </View>
      {showInitialPrompt ? (
        <View style={styles.initialPromptContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartPlanning}>
            <Text style={styles.startButtonText}>Let's Start Planning!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
        />
      )}

      {isLoading && <ActivityIndicator size="large" color="#19c37d" style={{ marginBottom: 10 }} />}

      {!showInitialPrompt && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541', // Dark background inspired by ChatGPT
  },
  header: {
    padding: 15,
    backgroundColor: '#202123',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007aff', // Blue for user messages
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444654', // Grey for AI messages
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    backgroundColor: '#202123',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#343541',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#19c37d', // ChatGPT green
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  initialPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  startButton: {
    backgroundColor: '#19c37d',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChatScreen;