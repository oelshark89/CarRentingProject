import React, { useState } from 'react';
import './reportInputForm.css'; // Import your CSS file

const Report5InputForm = ({ onSubmit, onCancel }) => {
    const [startDateInput, setStartDateInput] = useState('');
    const [endDateInput, setEndDateInput] = useState('');


    const handleStartDateChange = (e) => {
        setStartDateInput(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDateInput(e.target.value);
    };

    const handleFormSubmit = () => {
        if (!startDateInput || !endDateInput) {
            return alert('Please enter all fields!');
        }
        if (startDateInput > endDateInput) {
            return alert('Invalid Dates!')
        }

        onSubmit(1,
            {
                startDate: startDateInput,
                endDate: endDateInput,
            });
    };

    return (
        <div className="popup-emad">
            <div className="popup-content-emad">Daily payments within specific period
                <br />
                <label htmlFor="startDate">Start Date:</label>
                <input type="date" id="input-emad" value={startDateInput} onChange={handleStartDateChange} />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" id="input-emad" value={endDateInput} onChange={handleEndDateChange} />

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

export default Report5InputForm;
