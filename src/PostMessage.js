import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, FormLabel } from '@mui/material';

const PostMessage = ({ city, region, country, boardType, parentId, onPost, username }) => {
  const [content, setContent] = useState(''); // State to store the message content.

  // Function to handle the post button click.
  const handlePost = () => {
    // Check if the content is empty
    if (!content.trim()) {
      return; // Do nothing if the content is empty.
    }
    
    const url = parentId // If parentId is provided, it's a reply, so use the replies endpoint.
      ? `${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages/${parentId}/replies`
      : `${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages`;

    const data = parentId
      ? { content, username } // If its a reply, only send the content and username.
      : { city, region, country, content, boardType, username };

    // POST request to the message service to post a message or reply.
    fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send the data as JSON.
    })
      .then(response => {
        if (!response.ok) {     // If the response is not ok, throw an error.
          return response.json().then(err => { throw new Error(err.message); });
        }
        return response.json(); // If the response is ok, parse it as JSON.
      })
      .then(data => {
        setContent('');       // Clear the input field after posting.
        if (onPost) onPost(); // Call onPost.
      })
      .catch(error => console.error('Error posting message:', error)); // Log any errors.
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        {/* Text Above input field */}
        <FormLabel htmlFor="message-content">
          {parentId ? 'Post a Reply' : 'Post a Message'}
        </FormLabel>

        {/* Text input field */}
        <TextField
          id="message-content"
          placeholder={parentId ? 'Your reply' : 'Your message'} // Placeholder text.
          value={content}
          onChange={(e) => setContent(e.target.value)}           // Update when the input changes.
          fullWidth
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
        />
      </FormControl>

      {/* Post button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#757575', color: '#fff' }}
          onClick={handlePost}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default PostMessage;