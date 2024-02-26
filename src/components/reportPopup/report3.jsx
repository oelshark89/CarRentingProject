import React from 'react';
import './reportPopup.css';

const Report3 = ({ data, closePopup }) => {
    return (
        <div className="popup-emad">
            <div className="popup-content-emad">
                <p>The status of all cars on a specific day</p>
                <table>
                    <thead>
                        <tr>
                            <th>Car Model</th>
                            <th>Car Plate ID</th>
                            <th>Car Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.car_model}</td>
                                <td>{row.car_plate_id}</td>
                                <td>{row.car_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table><button className="button-return" onClick={closePopup}>Return</button>
            </div>
        </div>
    );
};

export default Report3;
