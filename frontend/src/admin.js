import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'; // Styling for the admin panel

function Admin() {
  const [selectedTable, setSelectedTable] = useState(''); // Selected table name
  const [result, setResult] = useState(null); // Result data to display
  const [error, setError] = useState(null); // Error messages

  // Hardcoded table names and their respective routes
  const tableRoutes = {
    user: '/users',
    amenity: '/amenities',
    host: '/hosts',
    guest: '/guests',
    property: '/properties',
    location: '/locations',
    calendaravailability: '/calendar',
    booking: '/bookings',
    payment: '/payments',
    propertyamenity: '/property-amenities',
    review: '/reviews',
    supportticket: '/support-tickets',
    identityverification: '/identity-verifications',
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value); // Set the selected table name
    setResult(null); // Clear previous results
    setError(null); // Clear errors
  };

  const handleFetchData = async () => {
    if (!selectedTable) {
      setError('Please select a table');
      return;
    }

    const endpoint = tableRoutes[selectedTable]; // Get the corresponding route
    if (!endpoint) {
      setError('Invalid table selected');
      return;
    }

    try {
      setError(null);
      const response = await axios.get(`http://localhost:5000${endpoint}`); // Fetch data from the backend
      setResult(response.data || []);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Dropdown to select a table */}
      <div className="dropdown">
        <label>Select Table:</label>
        <select onChange={handleTableChange} value={selectedTable}>
          <option value="">--Select Table--</option>
          {Object.keys(tableRoutes).map((table, index) => (
            <option key={index} value={table}>
              {table}
            </option>
          ))}
        </select>
      </div>

      {/* Button to fetch data */}
      <button className="fetch-button" onClick={handleFetchData}>
        Fetch Data
      </button>

      {/* Display error message */}
      {error && <p className="error">{error}</p>}

      {/* Display the results */}
      {result && (
        <div className="results">
          <h2>Results for Table: {selectedTable}</h2>
          {Array.isArray(result) && result.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(result[0] || {}).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
