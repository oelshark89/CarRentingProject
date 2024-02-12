import React from 'react';
import '../footer/footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../assests/logo.png'
const MyComponent = () => {
    return (
        <div className="bg-dark">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5  border-top footer text-light">
                <div className="col mb-3">
                    <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none text-light">
                    <img src={logoImage} alt="Logo" className="logo" />
                    </a>
                    <p className="text-body-secondary">© 2023</p>
                </div>

                <div className="col mb-3">
                    {/* Content for the second column */}
                </div>

                <div className="col mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Home</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Features</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Pricing</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">FAQs</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">About</a></li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Home</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Features</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Pricing</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">FAQs</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">About</a></li>
                    </ul>
                </div>

                {/* Repeat the structure for other columns as needed */}

            </footer>
        </div>
    );
};

export default MyComponent;
