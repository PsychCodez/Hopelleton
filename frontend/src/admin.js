// Admin.js (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [endpoints, setEndpoints] = useState([]); // For storing backend available actions
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Fetch available endpoints from backend
  useEffect(() => {
    axios.get('http://localhost:5000/admin/endpoints') // Call the backend to get available actions
      .then(response => {
        setEndpoints(response.data); // Store available actions from backend
      })
      .catch(err => {
        setError('Failed to load available actions');
        console.error(err);
      });
  }, []);

  const handleEndpointChange = (event) => {
    setSelectedEndpoint(event.target.value);
  };

  const handleFetchData = async () => {
    try {
      if (!selectedEndpoint) return; // Prevent empty fetch

      let response;
      if (selectedEndpoint === 'getAllUsers') {
        response = await axios.get('http://localhost:5000/users');
      } else if (selectedEndpoint === 'getUserById') {
        const userId = prompt("Enter User ID:");  // Prompt to get User ID
        response = await axios.get(`http://localhost:5000/users/${userId}`);
      } else {
        setError('Invalid endpoint');
        return;
      }

      setResult(response.data); // Store the result
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Dropdown to select the action (endpoint) */}
      <div>
        <label>Select Action:</label>
        <select onChange={handleEndpointChange}>
          <option value="">--Select Action--</option>
          {endpoints.map((endpoint, index) => (
            <option key={index} value={endpoint}>
              {endpoint}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleFetchData}>Fetch Data</button>

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the results */}
      {result && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Admin;
