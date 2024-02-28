import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchChatHistory(); // Llamada inicial para cargar el historial de chat al montar el componente
  }, []);
  
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/chat');
      setHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/chat', { history, question: message });
      setHistory(response.data.history);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="ChatHistory">
  {history && history.map((item, index) => (
    <div key={index} className={`Message ${item.role}`}>
      {item.parts}
    </div>
  ))}
</div>

      <div className="ChatInput">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
      <button onClick={fetchChatHistory}>Cargar historial</button>
    </div>
  );
}

export default App;
