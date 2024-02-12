import React, { useState,useEffect } from 'react';
import '../updatePopup/updatePopup.css'; // Adjust the import path if needed
import axios from 'axios';

const Layout = ({ carId, setShowPopup }) => {
    const [formData, setFormData] = useState({
        newStatus: ''
    });

    { console.log('responsePopup product id: ', carId) };

    const handleStatusChange = async (newStatus) => {
        setFormData({ newStatus });

        try {
            const response = await axios.put('http://localhost:3003/admin/updateCarStatus', { carId, newStatus });
            console.log('Response:', response.data);
            const message = response.data.message || 'An error occurred';
            alert(message);
            setShowPopup(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleOutsideClick = (event) => {
        const container = document.getElementById('updatePopup');
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
        const { newStatus } = formData;
        try {
            const response = await axios.put('http://localhost:3003/admin/updateCarStatus', { carId, newStatus });
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

    return (
        <div className='popup'>
            <div clasName='popup-inner'>

                <div id="container">
                    <div id='updatePopup' className="updatePopup">
                        <h1>Reservation Form</h1>
                        <p style={{ color: 'white ' }}>Update status of the car:</p>
                        <div className="status-buttons">
                            <button className='button' onClick={() => handleStatusChange('active')}>Active</button>
                            <button  className='button' onClick={() => handleStatusChange('rented')}>Rented</button>
                            <button  className='button' onClick={() => handleStatusChange('outOfService')}>Out of Service</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Layout;


