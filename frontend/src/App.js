
// import logo from './logo.svg'; // Importing logo image from './logo.svg'
// import './App.css'; // Importing CSS styles from './App.css'
// import LoginRegistration from './Compounds/LoginRegistration/LoginRegistration'; // Importing the LoginRegistration component from './Compounds/LoginRegistration/LoginRegistration'
// import Otp from './Compounds/LoginRegistration/otp'; // Importing the Otp component from './Compounds/LoginRegistration/otp'

// function App() {
//   return (
//     <div className="App">
//       <LoginRegistration/>
//       <Otp/> 
//     </div>
//   );
// };

// export default App; // Exporting the App component as the default export

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegistration from './Compounds/LoginRegistration/LoginRegistration';
import Otp from './Compounds/LoginRegistration/otp';
import HomePage from './Compounds/LoginRegistration/home';
import './index.css';


function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />

          <Route path="/login" element={<LoginRegistration />} />
          <Route path="/otp" element={<Otp />} /> 
        </Routes>  
      </Router>
    </div>
  );
}

export default App;

