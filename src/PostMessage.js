import React, { useState } from 'react';

const PostMessage = ({ city, region, country, boardType, setRefresh }) => {
  const [content, setContent] = useState(''); // State to store the message content.

  // Handler to post a message.
  const handlePost = () => {
    // Send a POST request to the messages route.
    fetch(`${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON.
      },
      body: JSON.stringify({ city, region, country, content, boardType }), // Send the city, region, country, content, and boardType as JSON.
    })
      .then(response => response.json()) // Parse the response as JSON.
      .then(data => {
        console.log('Message posted:', data); // Log the posted message.
        setContent(''); // Clear the input field after posting.
        setRefresh(prev => !prev); // Trigger a re-fetch of messages.
      })
      .catch(error => console.error('Error posting message:', error)); // Log any errors.
  };

  return (
    <div>
      <h3>Post a Message</h3>
      <textarea
        placeholder="Your message" // Placeholder text for the textarea.
        value={content} // Bind the textarea value to the content state.
        onChange={(e) => setContent(e.target.value)} // Update the content state on change.
      />
      <button onClick={handlePost}>Post</button> {/* Button to post the message. */}
    </div>
  );
};

export default PostMessage;