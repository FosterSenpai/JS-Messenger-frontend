import React, { useState } from 'react';
import locations from './data/Locations';

const Register = () => {
    // States to store registration data.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [town, setTown] = useState('');
    const [region, setRegion] = useState('');
    const [country, setCountry] = useState('');


    // Sort locations alphabetically by town
    const sortedLocations = [...locations].sort((a, b) => a.town.localeCompare(b.town));

    // Town change handler.
    const handleTownChange = (e) => {
        const selectedTown = e.target.value; // Get the selected town.
        setTown(selectedTown);               // Set the town.
        const location = locations.find(loc => loc.town === selectedTown); // Find the location in the Locations file.
        if (location) { // If the location is found.
          setRegion(location.region);
          setCountry(location.country); 
        }
      };

    // Registration handler.
    const handleRegister = () => {
        // Send a POST request to the users route.
        fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Send the username, password, town, region, and country as JSON.
            body: JSON.stringify({ username, password, city: town, region, country }), 
        })
            .then(response => response.json()) // Parse the response as JSON.
            .then(data => {                    // Log the registered user.
                console.log('User registered:', data);
            })
            .catch(error => console.error('Error registering user:', error));
    };

    return (
        <div>
            <h2>Register</h2>

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

            {/* Dropdown for town. */}
            <select value={town} onChange={handleTownChange}>
                <option value="">Select Town/City</option>
                {sortedLocations.map((location, index) => (
                    <option key={index} value={location.town}>
                        {location.town} 
                    </option>
                ))}
            </select>
            {/* Get the region and country from the selected town. */}
            <input 
                type="text"
                placeholder="Region"
                value={region}
                readOnly
            />
            <input
                type="text"
                placeholder="Country"
                value={country}
                readOnly
            />

            {/* Button to register. */}
            <button onClick={handleRegister}>Register</button>

        </div>
    );
};

export default Register;