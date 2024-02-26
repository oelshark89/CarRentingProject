import React, { useState,useEffect } from 'react';
import '../reservePopup/reservePopup.css'; // Adjust the import path if needed
import axios from 'axios';
import { Link } from 'react-router-dom';

const Layout = ({userId,carId,setShowPopup}) => {
  const [formData, setFormData] = useState({
    Id: '',
    startDate: '',
    endDate: '',
  });
 
  {console.log('responsePopup product id: ', carId)};
  {console.log('respnosePopup user id: ', userId)};
  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOutsideClick = (event) => {
    const container = document.getElementById('reservationForm');
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
    const { Id, startDate, endDate } = formData;
    const customerId=userId;
    try {
      const response = await axios.post('http://localhost:3003/reserveCar', { customerId,carId, startDate, endDate });
      console.log('Response:', response.data);
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
   
      <div id='containerReservePopup' className="reservationPopup">
        <div id='reservationForm' className="reservationForm">
          <h1>Reservation Form</h1>
          <p style={{ color: 'white ' }}>Please enter the following :</p>
          
          <input
            className='reservationForm'
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Enter Start Date (YYYY-MM-DD)"
            value={formData.startDate}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'date')}
  onBlur={(e) => (e.target.type = 'text')}
          />
          <input
          className='reservationForm'
            type="date"
            id="endDate"
            name="endDate"
            placeholder="Enter End Date (YYYY-MM-DD)"
            value={formData.endDate}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'date')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
          
          <input type="submit" value="Reserve" onClick={handleSubmit} />

          
          
        
        </div>
       
      </div>
    </div>
    </div>
  
  );
};

export default Layout;


