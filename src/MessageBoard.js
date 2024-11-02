import React, { useEffect, useState } from 'react';
import PostMessage from './PostMessage';

const MessageBoard = ({ city, region, country, boardType }) => {
  const [messages, setMessages] = useState([]);  // State to store messages.
  const [refresh, setRefresh] = useState(false); // State to trigger a refresh.

  // Fetch messages for the user's location.
  useEffect(() => {
    fetch(`${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages?city=${city}&region=${region}&country=${country}&boardType=${boardType}`)
      .then(response => response.json()) // Parse the response as JSON.
      .then(data => {
        if (Array.isArray(data)) { // Ensure the data is an array.
          setMessages(data); // Set the messages.
        } else {
          console.error('Unexpected data format:', data); // Log unexpected data format.
        }
      })
      .catch(error => console.error('Error fetching messages:', error)); // Log any errors.
  }, [city, region, country, boardType, refresh]); // Run this effect whenever the city, region, country, boardType, or refresh changes.

  return (
    <div>
      <h2>{boardType.charAt(0).toUpperCase() + boardType.slice(1)} Messages</h2>
      <PostMessage city={city} region={region} country={country} boardType={boardType} setRefresh={setRefresh} />
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBoard;