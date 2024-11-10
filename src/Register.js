import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, FormControl, FormLabel, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import locations from './data/Locations';
import { StyledCard, SignInContainer } from './styledComponents';

const Register = ({ setLoggedInUser }) => {
  // User data states.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [town, setTown] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect the user after registration.

  // Locations sorted by town name.
  const sortedLocations = [...locations].sort((a, b) => a.town.localeCompare(b.town));

  /// Function to handle the town select change.
  const handleTownChange = (e) => {
    // Get the town from an event target value.
    const selectedTown = e.target.value;
    setTown(selectedTown);

    // Find the location object that matches the selected town.
    const location = locations.find(loc => loc.town === selectedTown);
    if (location) { // If found, set the region and country.
      setRegion(location.region);
      setCountry(location.country);
    }
  };

  // Function to handle the register button click.
  const handleRegister = () => {
    // POST request to the user service to register a new user.
    fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, city: town, region, country }) // Send user data as JSON.
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) { // If the response has an id, the user was registered successfully.
          // Send login request after registration.
          return fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
        } else { // If the response doesn't have an id, the registration failed.
          throw new Error(data.message);
        }
      }) // Check the login response.
      .then(response => response.json())
      .then(data => {
        if (data.success) { // If the response has a success message:
          setLoggedInUser(username);
          navigate('/'); // Redirect the user to the main page.
        } else { 
          throw new Error('Login failed');
        }
      })
      .catch(error => {
        console.error('Error registering or logging in user:', error);
        setError(error.message);
      });
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <StyledCard variant="outlined">
        {/* Title */}
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
          Register
        </Typography>
        {/* Form */}
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          <FormControl>
            {/* Username input field */}
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            {/* Password input field */}
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            {/* Town select field */}
            <FormLabel htmlFor="town">Town/City</FormLabel>
            <TextField
              select
              id="town"
              name="town"
              value={town}
              onChange={handleTownChange}
              fullWidth
              margin="normal"
              variant="outlined"
              autoComplete="address-level2"
            >
              {/* Town select options */}
              <MenuItem value="">Select Town/City</MenuItem>
              {sortedLocations.map((location, index) => (    // Map through the locations to create select options.
                <MenuItem key={index} value={location.town}>
                  {location.town}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl>
            {/* Region input field (Gets auto-filled based on the selected town) */}
            <FormLabel htmlFor="region">Region</FormLabel>
            <TextField
              id="region"
              type="text"
              name="region"
              value={region}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              autoComplete="address-level1"
            />
          </FormControl>
          <FormControl>
            {/* Country input field (Gets auto-filled based on the selected town) */}
            <FormLabel htmlFor="country">Country</FormLabel>
            <TextField
              id="country"
              type="text"
              name="country"
              value={country}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              autoComplete="country"
            />
          </FormControl>

          {/* Register button */}
          <Button variant="contained" sx={{ backgroundColor: '#757575', color: '#fff' }} onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </StyledCard>
      {/* Error popup */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </SignInContainer>
  );
};

export default Register;