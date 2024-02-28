// ChatPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/chat'

function ChatPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get('/api/chat');
      setHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const response = await axios.post('/api/chat', { history, question: message });
      setHistory(response.data.history);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <Chat history={history} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatPage;
