import React, { useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import MessageBoard from './MessageBoard';

function App() {
  // State to store the logged-in user and user location.
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userLocation, setUserLocation] = useState({ city: '', region: '', country: '' });

  // Fetch the user's location when the user logs in.
  useEffect(() => {
    if (loggedInUser) {
      fetch(`${process.env.REACT_APP_USER_SERVICE_URL}/api/users/${loggedInUser}`)
        .then(response => response.json()) // Parse the response as JSON.
        .then(data => {                    // Set the user location state.
          // If the user data contains city, region, and country.
          if (data.city && data.region && data.country) {
            // Set the user location state.
            setUserLocation({ city: data.city, region: data.region, country: data.country }); 
          } else { // Else, log an error.
            console.error('Unexpected user data format:', data); // Log unexpected data format.
          }
        }) // Log any errors.
        .catch(error => console.error('Error fetching user location:', error));
    }
  }, [loggedInUser]); // Run this effect whenever the logged-in user changes.

  return (
    <div>
      <h1>Regional Messenger</h1>

      {/* If the user is logged in, show the welcome message and message boards. */}
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser}</h2>
          {userLocation.city && userLocation.region && userLocation.country ? (
            <div>
              <MessageBoard city={userLocation.city} region={userLocation.region} country={userLocation.country} boardType="city" />
              <MessageBoard city={userLocation.city} region={userLocation.region} country={userLocation.country} boardType="region" />
              <MessageBoard city={userLocation.city} region={userLocation.region} country={userLocation.country} boardType="country" />
            </div>
          ) : (
            <p>Loading location...</p>
          )}
        </div>
      ) : (
        // Else, show the registration and login forms.
        <div>
          <Register />
          <Login setLoggedInUser={setLoggedInUser} />
        </div>
      )}
    </div>
  );
}

export default App;