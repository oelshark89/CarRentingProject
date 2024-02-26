import React, { useState } from 'react';
import axios from 'axios';

const RegisterPopup = () => {
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    plateId: '',
    office_id: '',
    mileage: '',
    features: '',
    pricePerDay: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin/registerCar', formData);
      console.log(response.data);
      // Handle success or error response from the server
    } catch (error) {
      console.error('Error registering car:', error);
      // Handle error
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner reservationForm">
        <h1>Car Registration</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="model">Model:</label>
          <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} required />

          <label htmlFor="year">Year:</label>
          <input type="text" id="year" name="year" value={formData.year} onChange={handleChange} required />

          <label htmlFor="plateId">Plate ID:</label>
          <input type="text" id="plateId" name="plateId" value={formData.plateId} onChange={handleChange} required />

          <label htmlFor="office_id">Office ID:</label>
          <input type="text" id="office_id" name="office_id" value={formData.office_id} onChange={handleChange} required />

          <label htmlFor="mileage">Mileage:</label>
          <input type="text" id="mileage" name="mileage" value={formData.mileage} onChange={handleChange} required />

          <label htmlFor="features">Features:</label>
          <input type="text" id="features" name="features" value={formData.features} onChange={handleChange} required />

          <label htmlFor="pricePerDay">Price Per Day:</label>
          <input type="text" id="pricePerDay" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required />

          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;
