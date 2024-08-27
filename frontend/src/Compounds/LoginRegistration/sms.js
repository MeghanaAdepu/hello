import React, { useState } from 'react';
import axios from 'axios';
import './otp.css';

function Otp() {
    const [email, setEmail] = useState('');
    const [userEnteredOtp, setUserEnteredOtp] = useState('');
    const [message, setMessage] = useState('');

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
        // <div>
        //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <button onClick={sendOtp}>Send OTP</button>
        //     <input type="text" value={userEnteredOtp} onChange={(e) => setUserEnteredOtp(e.target.value)} />
        //     <button onClick={verifyOtp}>Verify OTP</button>

              
        //     <p>{message}</p>
        // </div>

//  <div>
// <div>
//     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//     <button onClick={sendOtp}>Send OTP</button>
// </div>
// <div>
//     <input type="text" value={userEnteredOtp} onChange={(e) => setUserEnteredOtp(e.target.value)} />
//     <button onClick={verifyOtp}>Verify OTP</button>
// </div>
// <p>{message}</p>
// </div> 

 <div class="input-container">
    <div class="input-group">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={sendOtp}>Send OTP</button>
    </div>
    <div class="input-group">
        <input type="text" value={userEnteredOtp} onChange={(e) => setUserEnteredOtp(e.target.value)} />
        <button  onClick={verifyOtp}>Verify OTP</button>
    </div>
    <p style={{ color: message.startsWith('Failed') ? 'red' : 'green' }}>{message}</p>

   
</div> 


    );
}

export default Otp;