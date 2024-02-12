import React from 'react';
import './reportPopup.css';

const Report5 = ({ data, closePopup }) => {
    return (
        <div className="popup-emad">
            <div className="popup-content-emad">
                <p>Daily payments within specific period</p>
                <table>
                    <thead>
                        <tr>
                            <th>Payment Date</th>
                            <th>Total Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.payment_date}</td>
                                <td>{row.total_payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table><button className="button-return" onClick={closePopup}>Return</button>
            </div>
        </div>
    );
};

export default Report5;
