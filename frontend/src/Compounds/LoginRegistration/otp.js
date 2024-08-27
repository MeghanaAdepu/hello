import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './otp.css';

function Otp() {
    const [email, setEmail] = useState('');
    const [userEnteredOtp, setUserEnteredOtp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'send-otp', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'verify-otp', { email, userEnteredOtp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Invalid OTP');
        }
    };

    return (
        <div className="input-container">
            <div className="input-group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={sendOtp}>Send OTP</button>
            </div>
            <div className="input-group">
                <input type="text" value={userEnteredOtp} onChange={(e) => setUserEnteredOtp(e.target.value)} />
                <button onClick={verifyOtp}>Verify OTP</button>
            </div>
            <p style={{ color: message.startsWith('Failed') || message === 'Invalid OTP' ? 'red' : 'green' }}>{message}</p>
            {message.startsWith('OTP') && (
                <div>
                    <Link to="/">Go to Home</Link>
                </div>
            )}
        </div>
    );
}
       


export default Otp;
