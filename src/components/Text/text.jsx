import React, { useState } from 'react';
import '../Text/text.css';

const MyComponent = ({ toggleState, onToggleChange, visibility }) => {
  if (!visibility) {
    return (
      <div className='containerText'>
        <div className='container'>
          <h1 id='title' style={{ color: 'white' }}>
            Welcome To <span className='brandName'>Motor</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='containerText'>
      <div className='container'>
        <h1 id='title' style={{ color: 'white' }}>
          Welcome To <span className='brandName'>Motor</span>
        </h1>
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={toggleState === 1 ? 'nav-link active tab' : 'nav-link tab'}
                aria-current="page"
                onClick={() => onToggleChange(1)}
              >
                Cars
              </a>
            </li>
            <li className="nav-item ">
              <a
                className={toggleState === 2 ? 'nav-link active tab' : 'nav-link tab'}
                onClick={() => onToggleChange(2)}
              >
                Reservations
              </a>
            </li>
            <li className="nav-item ">
              <a
                className={toggleState === 3 ? 'nav-link active tab' : 'nav-link tab'}
                onClick={() => onToggleChange(3)}
              >
                Customers
              </a>
              
            </li>
            <li className="nav-item ">
              <a
                className={toggleState === 4 ? 'nav-link active tab' : 'nav-link tab'}
                onClick={() => onToggleChange(4)}
              >
                Offices
              </a>
              
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
