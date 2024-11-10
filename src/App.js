import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import MessageBoard from './MessageBoard';
import Sidebar from './Sidebar';
import { MainContainer } from './styledComponents';

function App() {
  // States to store the logged-in user, user location, and selected board.
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userLocation, setUserLocation] = useState({ city: '', region: '', country: '' });
  const [selectedBoard, setSelectedBoard] = useState('city');

  // Fetch the user location when the logged-in user changes.
  useEffect(() => {
    if (loggedInUser) {
      // POST request to the user service to get the user location.
      fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/users/${loggedInUser}`)
        .then(response => response.json()) // Parse the response.
        .then(data => {
          // If the user data is in the expected format:
          if (data.city && data.region && data.country) {
            setUserLocation({ city: data.city, region: data.region, country: data.country }); // Set the user location.
            setSelectedBoard('city'); // Set the selected board to 'city' when the user logs in.
          } else {
            console.error('Unexpected user data format:', data);
          }	 
        })
        .catch(error => console.error('Error fetching user location:', error));
    }
  }, [loggedInUser]);

  return (
    <Router>
      <MainContainer>
        <Routes>
          {/* Route for the registration page */}
          <Route
            path="/register"
            element={
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ height: '80vh' }}
              >
                <Grid item xs={12} sm={8} md={6} sx={{ mt: -2 }}>
                  <Register setLoggedInUser={setLoggedInUser} />
                </Grid>
              </Grid>
            }
          />
          {/* Route for the main page */}
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Box sx={{ display: 'flex', height: '100vh' }}>
                  {/* Sidebar component */}
                  <Box>
                    <Sidebar
                      setSelectedBoard={setSelectedBoard}
                      setLoggedInUser={setLoggedInUser}
                      username={loggedInUser}
                    />
                  </Box>
                  {/* Message board component */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      p: 3,
                      mx: '5%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mt: 0,
                    }}
                  >
                    {userLocation.city && userLocation.region && userLocation.country ? (
                      // Display the MessageBoard component if the user's location is available.
                      <MessageBoard
                        city={userLocation.city}
                        region={userLocation.region}
                        country={userLocation.country}
                        boardType={selectedBoard}
                        userId={loggedInUser}
                        username={loggedInUser}
                      />
                    ) : (
                      // Display a loading message if the user's location is not yet available.
                      <Typography align="center">Loading location...</Typography>
                    )}
                  </Box>
                </Box>
              ) : ( // If the user is not logged in, display the login page.
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: '25vh', position: 'absolute', top: 0, width: '100%' }}
                >
                  <Grid item xs={12} sm={8} md={6}>
                    {/* Title for the login page */}
                    <Typography
                      variant="h1"
                      component="h1"
                      align="center"
                      sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}
                    >
                      Regional Messenger
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    {/* Login component */}
                    <Login setLoggedInUser={setLoggedInUser} />
                  </Grid>
                </Grid>
              )
            }
          />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;