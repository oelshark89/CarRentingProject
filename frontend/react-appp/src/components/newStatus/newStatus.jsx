import React, { useState,useEffect } from 'react';
import '../newStatus/newStatus.css'; // Adjust the import path if needed
import axios from 'axios';
import { Link } from 'react-router-dom';

const Layout = ({userId,carId,setShowPopup}) => {
  const [formData, setFormData] = useState({
    customerId: '',
    carId: '',
    newStatus: '',
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
    const container = document.getElementById('newStatusForm');
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
    const { customerId,carId , newStatus } = formData;
    console.log(customerId);
    console.log(carId);
    console.log(newStatus);
    try {

      const response = await axios.put('https://car-renting-project.vercel.app/admin/updateReservationStatus', { customerId,carId , newStatus });
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
   
      <div id='containerNewStatusPopup' >
        <div id='newStatusForm' className="newStatusForm">
          <h1>Update Status Form</h1>
          <p style={{ color: 'white ' }}>Please enter the following :</p>
          
          <input
            className='newStatusForm' 
            type="text"
            id="customerId"
            name="customerId"
            placeholder="Enter Customer Id"
            value={formData.customerId}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          />
          <input
          className='newStatusForm'
            type="text"
            id="carId"
            name="carId"
            placeholder="Enter Car Id"
            value={formData.carId}
            onChange={handleInputChange}
            onFocus={(e) => (e.target.type = 'text')}
  onBlur={(e) => (e.target.type = 'text')}
          /> 
         <select
  className='dropdownMenu'
  id="dropdown"
  name="newStatus"
  value={formData.newStatus}
  onChange={handleInputChange}
  onFocus={(e) => (e.target.classList.add('active'))}
  onBlur={(e) => (e.target.classList.remove('active'))}
>
  <option value="" disabled>Select an option</option>
  <option value="reserved">Reserved</option>
  <option value="picked up">Picked Up</option>
  <option value="returned">Returned</option>
  {/* Add more options as needed */}
</select>
          <input type="submit" value="Update" onClick={handleSubmit} />

          
          
        
        </div>
       
      </div>
    </div>
    </div>
  
  );
};

export default Layout;


