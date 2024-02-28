// Chat.js
import React, { useState } from 'react';

function Chat({ history, onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div>
      {history.map((item, index) => (
        <div key={index}>
          {item.role === 'user' && <div>User: {item.parts}</div>}
          {item.role === 'model' && <div>Model: {item.parts}</div>}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
