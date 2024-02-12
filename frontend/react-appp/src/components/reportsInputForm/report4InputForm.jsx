import React, { useState } from 'react';
import './reportInputForm.css'; // Import your CSS file

const Report4InputForm = ({ onSubmit, onCancel }) => {
    const [customerIdInput, setCustomerIdInput] = useState('');


    const handleCustomerInputChange = (e) => {
        setCustomerIdInput(e.target.value);
    };

    const handleFormSubmit = () => {
        if (!customerIdInput) {
            return alert('Please enter all fields!');
        }

        onSubmit(4, {
            customerId: customerIdInput
        });
    };

    return (
        <div className="popup-emad">
            <div className="popup-content-emad">All reservations of specific customer including customer information, car
                model and plate id
                <br />
                <label htmlFor="id">Customer id:</label>
                <input type="text" id="text-emad" value={customerIdInput} onChange={handleCustomerInputChange} />

                <div className="button-container">
                    <button className="generate-button" onClick={handleFormSubmit}>
                        Generate Report
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Report4InputForm;
