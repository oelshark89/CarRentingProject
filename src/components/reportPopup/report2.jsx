import React from 'react';
import './reportPopup.css';

const Report2 = ({ data, closePopup }) => {
    console.log('Report Data:', data);

    return (
        <div className="popup-emad">
            <div className="popup-content-emad">
                <p>All reservations of any car within a specified period including all car
                    information</p>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Id</th>
                            <th>Car Model</th>
                            <th>Car Plate ID</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.customerId}</td>
                                <td>{row.car_model}</td>
                                <td>{row.car_plate_id}</td>
                                <td>{row.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table><button className="button-return" onClick={closePopup}>Return</button>
            </div>
        </div>
    );
};

export default Report2;
