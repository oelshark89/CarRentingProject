import React from 'react';
import './reportPopup.css';

const Report4 = ({ data, closePopup }) => {
    return (
        <div className="popup-emad">
            <div className="popup-content-emad">
                <p>All reservations of specific customer including customer information, car
                    model and plate id</p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Car Model</th>
                            <th>Car Plate ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.customer_name}</td>
                                <td>{row.customer_email}</td>
                                <td>{row.car_model}</td>
                                <td>{row.car_plate_id}</td>
                                <td>{row.startDate}</td>
                                <td>{row.endDate}</td>
                                <td>{row.status}</td>
                                <td>{row.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table><button className="button-return" onClick={closePopup}>Return</button>
            </div>
        </div>
    );
};

export default Report4;
