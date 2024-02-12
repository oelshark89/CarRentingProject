import React, { useState } from 'react';
import './reportInputForm.css'; // Import your CSS file

const Report3InputForm = ({ onSubmit, onCancel }) => {
    const [dayInput, setDayInput] = useState('');


    const handleDayInputChange = (e) => {
        setDayInput(e.target.value);
    };

    const handleFormSubmit = () => {
        if (!dayInput) {
            return alert('Please enter all fields!');
        }

        onSubmit(3, {
            specificDay: dayInput
        });
    };

    return (
        <div className="popup-emad">
            <div className="popup-content-emad">Status of all cars on a specific day
                <br />
                <label htmlFor="day">Enter day:</label>
                <input type="date" id="input-emad" value={dayInput} onChange={handleDayInputChange} />

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

export default Report3InputForm;
