import React from 'react';
import '../loginSignup/loginSignup.css';
import emailIcon from '../assests/email.jpg';
import userIcon from '../assests/user.png';
import passwordIcon from '../assests/password.png';
import '../loginSignup/loginSignup.css'

const LoginSignup = () => {
  return (
    <form className="loginContents" action="index.php" method="post">
      <h1>LOGIN</h1>
      <p>Please enter your login and password!</p>

      <label htmlFor="Email">Email</label>
      <input type="text" id="Email" name="Email" placeholder="Email" />

      <label htmlFor="Password">Password</label>
      <input type="password" id="Password" name="Password" placeholder="Password" />

      <a href="url">Forgot password</a>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginSignup;
