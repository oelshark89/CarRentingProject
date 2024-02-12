import React, { useEffect,useState } from 'react';
import '../login/style.css'
import axios from 'axios';
function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Access form data from the state (formData)
    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:3003/login', { email, password });
      console.log('Response:', response.data);
      // Handle the response accordingly
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with an error:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      // Handle errors
    }
    
  };
 // useEffect(() => {
   /* const errorMessage = document.getElementById("errorMessage");
    const emailInput = document.forms["myForm"]["Email"];
    emailInput.style.border = '';

    const emailExists = getQueryParam("emailExists");

    if (emailExists === "true") {
      errorMessage.style.display = "block";
      emailInput.style.borderColor = "#c62928";
    } else {
      errorMessage.style.display = "none";
    }
  }, []);
*/
  /*useEffect(() => {
    const errorMessageEmpty = document.getElementById("errorMessageEmpty");
    errorMessageEmpty.style.display = "none";

    function validateForm() {
      const errorMessage = document.getElementById("errorMessage");
      const emailInput = document.forms["myForm"]["Email"];
      const passwordInput = document.forms["myForm"]["Password"];
      emailInput.style.border = '';
      if (emailInput.value === "" || passwordInput.value === "") {
        errorMessage.style.display = "block";
        emailInput.style.borderColor = "#c62928";
        return false;
      }
    }

    const form = document.forms["myForm"];
    form.onsubmit = validateForm;
  }, []);
*/
 const [isErrorVisible, setIsErrorVisible] = useState(false);
const { email, password } = formData;
// Function to handle form submission
const handleDivSubmit = () => {
  // Simulate some form validation logic
  
  const isValid = formData.email.trim() !== '' && formData.password.trim() !== '';
  // If not valid, display the error message
  if (!isValid) {
    setIsErrorVisible(true);

    // Optionally, you can set a timeout to hide the error message after a certain duration
    setTimeout(() => {
      setIsErrorVisible(false);
    }, 5000); // Hide after 5 seconds (adjust as needed)
  }

  // For demonstration purposes, log the form data
  console.log('Form submitted:', formData);
};

return (
  <div id="container">
    <div className="loginContents">
      <h1>LOGIN</h1>
      <p>Please enter your login and password!</p>
      <input
        type="text"
        id="Email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        id="Password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <a href="#" onClick={handleDivSubmit}>
        Forgot password
      </a>
      <input type="submit" value="LOGIN" onClick={handleSubmit} />
      {isErrorVisible && (
        <p id="errorMessageEmpty" style={{ color: "#c62928!important" }}>
          Email or Password must be filled.
        </p>
      )}


      <p id="errorMessage" style={{ color: "#c62928!important" }}>
        The email or password that you've entered is incorrect.
      </p>
      <div className="signup">
        <p>
          Don't have an account?<a href="signUp.html"> SIGN UP</a>
        </p>
      </div>
    </div>
  </div>
);
  }
export default App;
