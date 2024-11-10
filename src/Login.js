import React, { useState } from 'react';
import { Box, Button, TextField, Typography, FormControl, FormLabel } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link'; // For the link to the registration page.
import { StyledCard, SignInContainer } from './styledComponents';

const Login = ({ setLoggedInUser }) => {
  // States to store the username and password.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handler for the login process.
  const handleLogin = () => {
    // POST request to the user service to log the user in.
    fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Send the username and password to the server as JSON.
    })
      .then(response => response.json()) // Parse the response.
      .then(data => {
        if (data.success) {          // If the login is successful:
          setLoggedInUser(username); // Update the logged-in user state.
        } else {
          console.error('Login failed');
        }
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      {/* Card container for the login form */}
      <StyledCard variant="outlined">
        {/* Title for the login form */}
        <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', userSelect: 'none' }}>
          Login
        </Typography>
        {/* Form container */}
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
          {/* Username input field */}
          <FormControl>
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
          {/* Password input field */}
          <FormControl>
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
          {/* Login button */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#757575', color: '#fff' }}
            onClick={handleLogin}
          >
            Login
          </Button>
          {/* Link to the registration page */}
          <Typography sx={{ textAlign: 'center', userSelect: 'none' }}>
            Don't have an account?{' '}
            <span>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ alignSelf: 'center', userSelect: 'none' }}>
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </StyledCard>
    </SignInContainer>
  );
};

export default Login;