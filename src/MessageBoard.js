import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, List, ListItem, Divider, CardContent, Paper, IconButton, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PostMessage from './PostMessage';

const MessageBoard = ({ city, region, country, boardType, userId, username }) => {
  // States to store messages, replies, and the currently open replies.
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});
  const [openReplies, setOpenReplies] = useState(null); // Need for making only one set of replies open at a time.

  // Fetch messages from the message service.
  const fetchMessages = useCallback(() => {
    // GET request to the message service to fetch messages based on the location and board type.
    fetch(`${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages?city=${city}&region=${region}&country=${country}&boardType=${boardType}&username=${userId}`)
      .then(response => response.json()) // Parse the response.
      .then(data => {
        if (Array.isArray(data)) {     // Ensure the data is an array.
          setMessages(data.reverse()); // Set the messages in reverse order.
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [city, region, country, boardType, userId]); // Run when any of these values change.

  // Fetch messages when the component mounts and every 5 seconds.
  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on component unmount.
  }, [fetchMessages]);

  // GET request to fetch replies for a message.
  const fetchReplies = (messageId) => {
    fetch(`${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages/${messageId}/replies`)
      .then(response => response.json()) // Parse the response.
      .then(data => {
        setReplies((prevReplies) => ({   // Set the replies for the message.
          ...prevReplies,
          [messageId]: Array.isArray(data) ? data : [], // Ensure the data is an array. (was being weird)
        }));
      })
      .catch(error => console.error('Error fetching replies:', error));
  };

  // Toggle replies for a message.
  const toggleReplies = (messageId) => {
    if (openReplies === messageId) { // If the replies are already open, close them.
      setOpenReplies(null);
    } else { // Otherwise, open the replies.
      setOpenReplies(messageId);
      fetchReplies(messageId);
    }
  };

  // Generate the board title based on the board type and location.
  const getBoardTitle = () => {
    let location = '';
    if (boardType === 'city') {
      location = city;
    } else if (boardType === 'region') {
      location = region;
    } else if (boardType === 'country') {
      location = country;
    }
    return `${boardType.charAt(0).toUpperCase() + boardType.slice(1)}: ${location}`; // Concat Board type + location;
  };

  // Handler for upvoting a message or reply.
  const handleUpvote = (id, isReply = false) => {
    const url = isReply // Determine the URL based on whether it's a message or reply.
      ? `${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/replies/${id}/upvote`   // If it's a reply.
      : `${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages/${id}/upvote`; // If it's a message.
    // POST request to upvote the message or reply.
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userId }), // Need username to check if the user has already voted.
    })
      .then(response => response.json()) // Parse the response.
      .then(data => {
        if (data.success) { // If the upvote is successful:
          if (isReply) {          // If it's a reply:
            setReplies((prevReplies) =>                                // Update the replies state.
              Object.keys(prevReplies).reduce((acc, messageId) => {    // Loop through the replies.
                acc[messageId] = prevReplies[messageId].map((reply) => // Map updated replies to new object.
                  reply.id === id ? { // If the ID matches the reply ID:
                    ...reply,
                    score: reply.score + (data.voteRemoved ? -1 :  // If the vote was removed, increase the score by 1.
                      (reply.userVote === 'downvote' ? 2 : 1)),    // If downvoted, increase the score by 2; otherwise, increase by 1.
                    userVote: data.voteRemoved ? null : 'upvote'   // If the vote was removed, set userVote to 'null'; otherwise 'upvote'.
                  } : reply           // If ID doesn't match, send the reply as is.
                );
                return acc;           // Return new replies object.
              }, {})
            );
          } else {                // If it's a message:
            setMessages((prevMessages) =>   // Update the messages state.
              prevMessages.map((message) => // Map updated messages to new object.
                message.id === id ? {
                  ...message,
                  score: message.score + (data.voteRemoved ? -1 :
                    (message.userVote === 'downvote' ? 2 : 1)),
                    userVote: data.voteRemoved ? null : 'upvote'
                  } : message 
              )
            );
          }
        } else {
          console.error(`Upvote failed for ${isReply ? 'reply' : 'message'} ID: ${id}: ${data.message}`);
        }
      })
      .catch(error => console.error(`Error upvoting ${isReply ? 'reply' : 'message'}:`, error));
  };

  // Handler for downvoting a message or reply.
  const handleDownvote = (id, isReply = false) => {
    // Change POST URL based on whether it's a message or reply.
    const url = isReply
      ? `${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/replies/${id}/downvote`
      : `${process.env.REACT_APP_MESSAGE_SERVICE_URL}/api/messages/${id}/downvote`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userId }), // ID of who is downvoting, to check if they have already voted.
    })
      .then(response => response.json())  // Parse the response.
      .then(data => { 
        if (data.success) { // If the downvote is successful:
          if (isReply) {
            setReplies((prevReplies) => // Update the replies state.
              Object.keys(prevReplies).reduce((acc, messageId) => {    // Loop through the replies.
                acc[messageId] = prevReplies[messageId].map((reply) => // Map updated replies to new object.
                  reply.id === id ? { // If the ID matches the reply ID:
                    ...reply,
                    score: reply.score + (data.voteRemoved ? 1 :   // If the vote was removed, increase the score by 1.
                      (reply.userVote === 'upvote' ? -2 : -1)),    // If upvoted, decrease the score by 2; otherwise, decrease by 1.
                    userVote: data.voteRemoved ? null : 'downvote' // If the vote was removed, set userVote to 'null'; otherwise 'downvote'.
                  } : reply // If ID doesn't match, send the reply as is.
                );
                return acc; // Return new replies object.
              }, {})
            );
          } else { // If it's a message:
            setMessages((prevMessages) =>   // Update the messages state.
              prevMessages.map((message) => // Map updated messages to new object.
                message.id === id ? {
                  ...message,
                  score: message.score + (data.voteRemoved ? 1 :
                    (message.userVote === 'upvote' ? -2 : -1)),
                  userVote: data.voteRemoved ? null : 'downvote' 
                } : message
              )
            );
          }
        } else { // If downvote fails:
          console.error(`Downvote failed for ${isReply ? 'reply' : 'message'} ID: ${id}: ${data.message}`);
        }
      })
      .catch(error => console.error(`Error downvoting ${isReply ? 'reply' : 'message'}:`, error));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '80%',
        margin: 'auto',
        padding: 3,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 0,
      }}
    >
      {/* Card content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingTop: 0,
        }}
      >
        {/* Board title */}
        <Box
          sx={{
            borderBottom: '1px solid #ccc',
            mb: 1,
            pb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center', fontSize: '0.875rem' }}
          >
            {getBoardTitle()}
          </Typography>
        </Box>

        {/* Post Message component */}
        <Box sx={{ marginBottom: 2 }}>
          <PostMessage
            city={city}
            region={region}
            country={country}
            boardType={boardType}
            username={username}
            onPost={fetchMessages}
          />
        </Box>

        {/* Styling for the message list */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            border: '1px solid #ccc',
          }}
        >
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {/* Individual Message display */}
                <ListItem
                  sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Message main content */}
                  <Typography
                    variant="caption"
                    sx={{ color: 'grey', marginBottom: 1 }}
                  >
                    {new Date(message.timestamp).toLocaleString()}{' '}
                    {message.username === username ? 'Posted by You.' : ''}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: 1, whiteSpace: 'pre-wrap' }}
                  >
                    {message.content}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Upvote and Downvote buttons for messages */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        onClick={() => handleUpvote(message.id)}
                        size="small"
                      >
                        <ArrowUpwardIcon
                          fontSize="small"
                          sx={{
                            color:
                              message.userVote === 'upvote' ? 'green' : 'inherit',
                          }}
                        />
                      </IconButton>
                      <Typography variant="body2" sx={{ margin: '0 8px' }}>
                        {message.score}
                      </Typography>

                      <IconButton
                        onClick={() => handleDownvote(message.id)}
                        size="small"
                      >
                        <ArrowDownwardIcon
                          fontSize="small"
                          sx={{
                            color:
                              message.userVote === 'downvote' ? 'red' : 'inherit',
                          }}
                        />
                      </IconButton>
                    </Box>

                    {/* Button to toggle replies */}
                    <Button onClick={() => toggleReplies(message.id)} size="small">
                      {openReplies === message.id
                        ? 'Hide Replies'
                        : `Replies (${message.replyCount || 0})`}
                    </Button>
                  </Box>
                  {/* Display the replies */}
                  {openReplies === message.id && (
                    <Box
                      sx={{
                        width: '100%',
                        mt: 2,
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        backgroundColor: '#f9f9f9',
                      }}
                    >
                      <List>
                        {replies[message.id]?.map((reply, replyIndex) => (
                          <React.Fragment key={reply.id}>
                            {/* Individual Reply display */}
                            <ListItem
                              sx={{
                                padding: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                              }}
                            >
                              {/* Reply main content */}
                              <Typography
                                variant="caption"
                                sx={{ color: 'grey', marginBottom: 1 }}
                              >
                                {new Date(reply.timestamp).toLocaleString()}{' '}
                                {reply.username === username
                                  ? 'Posted by You.'
                                  : ''}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ marginBottom: 1, whiteSpace: 'pre-wrap' }}
                              >
                                {reply.content}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%',
                                  justifyContent: 'space-between',
                                }}
                              >
                                {/* Upvote and Downvote buttons for replies */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <IconButton
                                    onClick={() => handleUpvote(reply.id, true)}
                                    size="small"
                                  >
                                    <ArrowUpwardIcon
                                      fontSize="small"
                                      sx={{
                                        color:
                                          reply.userVote === 'upvote'
                                            ? 'green'
                                            : 'inherit',
                                      }}
                                    />
                                  </IconButton>
                                  <Typography
                                    variant="body2"
                                    sx={{ margin: '0 8px' }}
                                  >
                                    {reply.score}
                                  </Typography>
                                  {}
                                  <IconButton
                                    onClick={() => handleDownvote(reply.id, true)}
                                    size="small"
                                  >
                                    <ArrowDownwardIcon
                                      fontSize="small"
                                      sx={{
                                        color:
                                          reply.userVote === 'downvote'
                                            ? 'red'
                                            : 'inherit',
                                      }}
                                    />
                                  </IconButton>
                                </Box>
                              </Box>
                            </ListItem>
                            {replyIndex < replies[message.id].length - 1 && (
                              <Divider />
                            )}
                          </React.Fragment>
                        ))}
                      </List>

                      {/* Post Reply */}
                      <PostMessage
                        city={city}
                        region={region}
                        country={country}
                        boardType={boardType}
                        parentId={message.id}
                        onPost={() => fetchReplies(message.id)}
                        username={username}
                      />
                    </Box>
                  )}
                </ListItem>
                {index < messages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </CardContent>
    </Paper>
  );
};

export default MessageBoard;