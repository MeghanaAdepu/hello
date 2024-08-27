import React, { useState } from 'react';
import './LoginRegistration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/padlock.png';

const LoginRegistration = () => {
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const endpoint = action === "Login" ? 'login' : 'signUp';
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, formData);
      if ((response.status === 200 || response.status === 201) && response.data) {
        console.log("Action successful");
        if (action === "Login") {
          navigate('/'); // Redirect to the home page upon successful login
        } else {
          navigate('/otp'); // Redirect to the sendotp page upon successful registration
        }
      } else {
        console.log("Invalid credentials or registration failed");
      }
    } catch (error) {
      console.log(`Error occurred during ${action.toLowerCase()}:`, error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        {action === "Registration" && (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Enter the name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Enter Email Id"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="submit-container">
          <button
            type="submit"
            className={action === "Login" ? "submit" : "submit gray"}
          >
            {action === "Login" ? "Login" : "Submit"}
          </button>
          <button
            type="button"
            className={action === "Registration" ? "submit gray" : "submit"}
            onClick={() => setAction(action === "Login" ? "Registration" : "Login")}
          >
            {action === "Login" ? "Registration" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginRegistration;
