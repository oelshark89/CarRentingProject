import React from 'react';
import '../banner/banner.css';

const MyComponent = () => {
    return (
       
            <div className="px-4 pt-5 my-5 text-center border-bottom outline-div">
              <h1 className="display-4 fw-bold text-body-emphasis text-white title">Drive Your Dreams</h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-4 pt-10 text-white">Experience automotive excellence at Velocity Motors. Explore a wide selection, unbeatable deals, and quality assurance. Your dream ride is just a visit away. Drive with confidence; drive with Velocity Motors.</p>
              </div>
              <div className="overflow-hidden" style={{ maxHeight: '60vh' }}> {/* Adjust the maxHeight value as needed */}
                <div className="container px-5">
                  {/* Additional content or modifications can be added here if necessary */}
                </div>
              </div>
            </div>
          
          
    );
};

export default MyComponent;
