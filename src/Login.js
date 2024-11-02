import React, { useState } from 'react';

const Login = ({ setLoggedInUser }) => {
    const [username, setUsername] = useState(''); // State to store the username.
    const [password, setPassword] = useState(''); // State to store the password.

    // Login handler.
    const handleLogin = () => {
        // Send a POST request to the login route.
        fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send the username and password as JSON.
        }) // Parse the response as JSON.
        .then(response => response.json()) 
        .then(data => {
            if (data.success) {          // If the login was successful.
                setLoggedInUser(username); // Set the logged-in user.
            } else {                     // Else, log an error.
                console.error('Login failed');
            }
        }) // Log any errors.
        .catch(error => console.error('Error logging in:', error));
    };

    return (
        <div>
            <h2>Login</h2>
            {/* Input for username. */}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />  
            
            {/* Input for password. */}
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Button to login. */}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;