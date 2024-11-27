import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import UserPage from './Pages/UserPage';
import RegisterPopup from './Components/RegPopup/RegisterPopup';
import Settings from './Pages/Settings';
import LoginPopup from './Components/RegPopup/LoginPopup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcome" element={<UserPage/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/register" element={<RegisterPopup/>}/>
        <Route path="/login" element={<LoginPopup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
