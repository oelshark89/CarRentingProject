import React ,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assests/logo.png'; 
import '../header/header.css'

const MyComponent = () => {

    const [buttonHovered, setButtonHovered] = useState(false);
    const handleButtonHover = () => {
      setButtonHovered(true);
      
    };
  
    const handleButtonLeave = () => {
      setButtonHovered(false);
    };
  
    const buttonStyle = {
      backgroundColor: buttonHovered ? '#B46129' : '#CC6119', // Change color when hovered
      borderColor: '#CC6119',
    };
    return(
        <header className="p-3 text-bg-dark">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a  className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                <img src={logo} alt="Logo" width="40" height="32" />
              </a>
  
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
                <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                <li><a href="#" className="nav-link px-2 text-white">About</a></li>
              </ul>
              <div class="text-end">
          
          <button type="button" class="btn btn-warning ">   <a href="/">Sign Out</a></button>
        </div>
              
            </div>
          </div>
        </header>
);
    }
export default MyComponent;
