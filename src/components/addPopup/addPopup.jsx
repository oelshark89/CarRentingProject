import React, { useState,useEffect } from 'react';
import '../addPopup/addPopup.css'; // Adjust the import path if needed
import axios from 'axios';
import { Link } from 'react-router-dom';

const Layout = ({setShowPopup,getAllCars }) => {
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
 

  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOutsideClick = (event) => {
    const container = document.getElementById('addPopup');
    if (container && container instanceof HTMLElement && !container.contains(event.target)) {
      // Clicked outside the container, close the popup
      console.log('entered add popup');
      setShowPopup(false);
    }
  };
  useEffect(() => {
    // Attach the click event listener to the document body
    document.body.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [setShowPopup]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Access form data from the state (formData)
    const { model,year,plateId,office_id,mileage,features,pricePerDay,imageUrl } = formData;
    
    try {
      const response = await axios.post('http://localhost:3003/admin/registerCar', { model,year,plateId,office_id,mileage,features,pricePerDay,imageUrl });
      console.log('Response:', response.data);
      getAllCars();
      // Alert with the response data
      const message = response.data.message || 'An error occurred'; // Default message if 'message' is not present

      // Display the message using alert or any other method
      alert(message);
      setShowPopup(false);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  // Function to handle "Forgot startDate" click
  const handleDivSubmit = () => {
    // Your logic for handling "Forgot startDate" click
    console.log('Forgot startDate clicked');
  };

  return (
    <div className='popup'>
    <div clasName='popup-inner'>
   
      <div id="container">
        <div id='addPopup'className="addPopup">
          <h1>Add Car</h1>
          <p style={{ color: 'white ' }}>Please enter the following :</p>
          
          <input
            className='addPopup'
            type="text"
            id="model"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          />
          <input
          className='addPopup'
            type="text"
            id="year"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
             <input
          className='addPopup'
            type="text"
            id="plateId"
            name="plateId"
            placeholder="Plate Id"
            value={formData.plateId}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
          
          <input
          className='addPopup'
            type="text"
            id="office_id"
            name="office_id"
            placeholder="Office Id"
            value={formData.office_id}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
             <input
          className='addPopup'
            type="text"
            id="mileage"
            name="mileage"
            placeholder="Mileage"
            value={formData.mileage}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
             <input
          className='addPopup'
            type="text"
            id="features"
            name="features"
            placeholder="Features"
            value={formData.features}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
             <input
          className='addPopup'
            type="text"
            id="pricePerDay"
            name="pricePerDay"
            placeholder="Price Per Day"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
          
          <input
          className='addPopup'
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="image Url"
            value={formData.imageUrl}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
          
          <input type="submit" value="Add" onClick={handleSubmit} />

          
          
        
        </div>
       
      </div>
    </div>
    </div>
  
  );
};

export default Layout;


