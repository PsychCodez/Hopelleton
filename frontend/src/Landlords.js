import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Landlords.css";
import { FaPlus, FaTrash } from "react-icons/fa";

function Landlords() {
  const [addedProperties, setAddedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false); // State to control Add Property Form visibility
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    address: "",
    city: "",
    price: 5000,
    propertyType: "Apartment",
    description: "",
    maxGuests: 2,
    rules: "",
    averageRating: 0,
  });

  useEffect(() => {
    // Initial properties (or fetch from backend if needed)
    setAddedProperties([
      { id: 7, title: "Cozy Cottage", address: "123 Main St", city: "Bangalore", price: "₹5000/night", propertyType: "Villa" },
      { id: 2, title: "Apartment in Whitefield", address: "456 Elm St", city: "Bangalore", price: "₹3500/night", propertyType: "Apartment" },
    ]);
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/properties/7`); // Replace with your backend's base URL
      const updatedProperties = addedProperties.filter((property) => property.id !== id);
      setAddedProperties(updatedProperties);
      alert("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete the property. Please try again.");
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    const newPropertyData = {
      hostId: 1, // Assume a fixed hostId for now, modify as needed
      title: propertyDetails.title,
      description: propertyDetails.description,
      AverageRating: propertyDetails.averageRating,
      maxGuests: propertyDetails.maxGuests,
      pricePerNight: propertyDetails.price,
      rules: propertyDetails.rules,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    console.log(newPropertyData)

    try {
      // POST request to the backend to create a new property
      const response = await axios.post("http://localhost:5000/properties", newPropertyData);

      // Add the newly created property to the list in state (assuming response contains the new property)
      const createdProperty = {
        id: response.data.insertId, // assuming the backend returns the inserted ID
        title: propertyDetails.title,
        address: propertyDetails.address,
        city: propertyDetails.city,
        price: `₹${propertyDetails.price}/night`,
        propertyType: propertyDetails.propertyType,
      };

      setAddedProperties([...addedProperties, createdProperty]);
      setShowAddPropertyForm(false); // Hide the form
      alert("Property created successfully!");
      
      // Reset the form fields
      setPropertyDetails({
        title: "",
        address: "",
        city: "",
        price: 5000,
        propertyType: "Apartment",
        description: "",
        maxGuests: 2,
        rules: "",
        averageRating: 0,
      });
    } catch (error) {
      console.error("Error creating property:", error);
      alert("Failed to create the property. Please try again.");
    }
  };

  const filteredProperties = addedProperties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landlords-page">
      <h1>Landlord's Portal</h1>

      {/* Search Bar */}
      <div className="search-bar-land">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaPlus className="add-property-icon" onClick={() => setShowAddPropertyForm(true)} />
      </div>

      {/* Add Property Form */}
      {showAddPropertyForm && (
        <div className="add-property-form">
          <h2>Add New Property</h2>
          <form onSubmit={handleAddProperty}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={propertyDetails.title}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, title: e.target.value })}
                placeholder="Enter property title"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={propertyDetails.address}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, address: e.target.value })}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={propertyDetails.city}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, city: e.target.value })}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="form-group">
              <label>Price per night (₹): {propertyDetails.price}</label>
              <input
                type="range"
                value={propertyDetails.price}
                min="500"
                max="20000"
                step="500"
                onChange={(e) => setPropertyDetails({ ...propertyDetails, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select
                value={propertyDetails.propertyType}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, propertyType: e.target.value })}
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={propertyDetails.description}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
                placeholder="Describe the property"
                required
              />
            </div>
            <div className="form-group">
              <label>Max Guests</label>
              <input
                type="number"
                value={propertyDetails.maxGuests}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, maxGuests: e.target.value })}
                placeholder="Max number of guests"
                required
              />
            </div>
            <div className="form-group">
              <label>Rules</label>
              <textarea
                value={propertyDetails.rules}
                onChange={(e) => setPropertyDetails({ ...propertyDetails, rules: e.target.value })}
                placeholder="Property rules"
              />
            </div>
            <button type="submit" className="add-property-button">Add Property</button>
          </form>
        </div>
      )}

      {/* List of Properties */}
      <div className="property-list">
        <h2>Your Added Properties</h2>
        <ul>
          {filteredProperties.map((property) => (
            <li key={property.id} className="property-item">
              <div>
                <h3>{property.title}</h3>
                <p>{property.address}, {property.city}</p>
                <p>Type: {property.propertyType}</p>
                <p>Price: {property.price}</p>
              </div>
              <button
                className="creative-delete-button"
                onClick={() => handleDelete(property.id)}
              >
                <FaTrash className="delete-icon" />
                <span className="delete-text">Remove</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Landlords;
