import React, { useState, useEffect } from "react";
import "./Landlords.css";
import { FaPlus } from "react-icons/fa";

function Landlords() {
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    address: "",
    city: "",
    price: 5000, // Default starting value for slider
    propertyType: "Apartment",
    description: "",
  });
  const [addedProperties, setAddedProperties] = useState([]);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails({ ...propertyDetails, [name]: value });
    if (name === "description") {
      setCharCount(value.length);
    }
  };

  const handleSliderChange = (e) => {
    setPropertyDetails({ ...propertyDetails, price: e.target.value });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    setAddedProperties([...addedProperties, propertyDetails]);
    setPropertyDetails({
      title: "",
      address: "",
      city: "",
      price: 5000,
      propertyType: "Apartment",
      description: "",
    });
    setCharCount(0);
    setShowAddPropertyForm(false); // Close form after adding
  };

  const openModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    setAddedProperties([
      { title: "Villa in Jalahalli", address: "123 Main St", price: "₹5000/night", propertyType: "Villa" },
      { title: "Apartment in Whitefield", address: "456 Elm St", price: "₹3500/night", propertyType: "Apartment" },
    ]);
  }, []);

  const filteredProperties = addedProperties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landlords-page">
      <h1>Landlord's Portal</h1>

      {/* Search and Add Property Icon */}
      <div className="search-bar-land">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaPlus className="add-property-icon" onClick={() => setShowAddPropertyForm(true)} />
      </div>

      {/* Add Property Form (Hidden initially) */}
      {showAddPropertyForm && (
        <div className="add-property-form">
          <h2>Add New Property</h2>
          <form onSubmit={handleAddProperty}>
            <div className="form-group">
              <label>Property Title</label>
              <input
                type="text"
                name="title"
                value={propertyDetails.title}
                onChange={handleChange}
                placeholder="Enter property title"
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={propertyDetails.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={propertyDetails.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="form-group">
              <label>Price per night (₹): {propertyDetails.price}</label>
              <input
                type="range"
                name="price"
                min="500"
                max="20000"
                step="500"
                value={propertyDetails.price}
                onChange={handleSliderChange}
                className="price-slider"
              />
            </div>
            <div className="form-group">
              <label>Property Type</label>
              <select name="propertyType" value={propertyDetails.propertyType} onChange={handleChange}>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description <span className="char-count">({charCount}/200)</span></label>
              <textarea
                name="description"
                maxLength="200"
                value={propertyDetails.description}
                onChange={handleChange}
                placeholder="Describe the property"
                required
              />
            </div>
            <button type="submit" className="add-property-button">Add Property</button>
          </form>
        </div>
      )}

      {/* List of Previously Added Properties */}
      <div className="property-list">
        <h2>Your Added Properties</h2>
        <ul>
          {filteredProperties.map((property, index) => (
            <li key={index} className="property-item" onClick={() => openModal(property)}>
              <h3>{property.title}</h3>
              <p>{property.address}, {property.city}</p>
              <p>Type: {property.propertyType}</p>
              <p>Price: {property.price}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Property Details */}
      {showModal && selectedProperty && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>{selectedProperty.title}</h3>
            <p>Address: {selectedProperty.address}, {selectedProperty.city}</p>
            <p>Type: {selectedProperty.propertyType}</p>
            <p>Price: {selectedProperty.price}</p>
            <p>Description: {selectedProperty.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landlords;
