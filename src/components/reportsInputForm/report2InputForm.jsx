import React, { useState } from 'react';
import './reportInputForm.css'; // Import your CSS file

const Report2InputForm = ({ onSubmit, onCancel }) => {
    const [startDateInput, setStartDateInput] = useState('');
    const [endDateInput, setEndDateInput] = useState('');
    const [carIdInput, setCarIdInput] = useState('');


    const handleStartDateChange = (e) => {
        setStartDateInput(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDateInput(e.target.value);
    };

    const handleCarIdChange = (e) => {
        setCarIdInput(e.target.value);
    };

    const handleFormSubmit = () => {
        if (!startDateInput || !endDateInput || !carIdInput) {
            return alert('Please enter all fields!');
        }
        if (startDateInput > endDateInput) {
            return alert('Invalid Dates!')
        }

        onSubmit(2, {
            startDate: startDateInput,
            endDate: endDateInput,
            carId: carIdInput,
        });
    };

    return (
        <div className="popup-emad">
            <div className="popup-content-emad">All reservations of any car within a specified period including all car information
                <br />
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="input-emad" value={startDateInput} onChange={handleStartDateChange} />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="input-emad" value={endDateInput} onChange={handleEndDateChange} />

                <label htmlFor="carId">Car ID:</label>
                <input type="text" id="text-emad" value={carIdInput} onChange={handleCarIdChange} />

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

export default Report2InputForm;
