import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({toogleState, isOpen, toggleSidebar, handleReportInput }) => {
    return (
        <div className={`sidebar ${isOpen && toogleState===1 ? 'open cars' :  isOpen ? 'open' : ''}`}>
            <nav>
                <ul>
                    <li>
                        <Link to="/adminpage">Home</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleReportInput(1)}>Report 1</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleReportInput(2)}>Report 2</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleReportInput(3)}>Report 3</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleReportInput(4)}>Report 4</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={() => handleReportInput(5)}>Report 5</Link>
                    </li>
                    <li>
                        <Link to="/">Sign Out</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
