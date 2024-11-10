import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Typography, Button } from '@mui/material';

const Sidebar = ({ setSelectedBoard, setLoggedInUser, username }) => {
  // State to store the selected board.
  const [selected, setSelected] = useState('city');
  const boards = ['city', 'region', 'country']; // Board types.

  // Handle logout.
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  // Handle board selection.
  const handleBoardSelection = (board) => {
    setSelected(board);
    setSelectedBoard(board);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,    // Fixed width for the sidebar.
        flexShrink: 0, // Prevent shrinking.

        // Styling for the sidebar.
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Sidebar content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ cursor: 'pointer', padding: 2, userSelect: 'none' }}
            onClick={handleLogout}
            fontWeight= 'bold'
          >
            Regional Messenger
          </Typography>
        </Box>
        {/* List of boards */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <List>
            {boards.map((board) => ( // Map over the boards array to create a list item for each board.
              <ListItem 
                button={true.toString()} 
                key={board} 
                onClick={() => handleBoardSelection(board)}  // Call handleBoardSelection on click.
                sx={{
                  justifyContent: 'center', 
                  backgroundColor: selected === board ? 'rgba(0, 0, 0, 0.1)' : 'transparent', 
                  boxShadow: selected === board ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                  borderRadius: '4px',
                  margin: '4px 0'
                }}
              >
                {/* Board name */}
                <ListItemText 
                  primary={board.charAt(0).toUpperCase() + board.slice(1)} 
                  primaryTypographyProps={{ fontSize: '1.5rem', textAlign: 'center', sx: { userSelect: 'none' } }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Logout button */}
        <Box sx={{ padding: 2 }}>
          <Typography variant="body2" sx={{ color: 'grey', mb: 1, textAlign: 'center', userSelect: 'none' }}>
            Logged in as {username}
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: '#757575', color: '#fff' }} onClick={handleLogout} fullWidth aria-label='Logout'>
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;