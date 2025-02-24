import React, { useEffect, useState } from 'react';
import {Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';

const App = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if(storedUserId){
      setUserId(storedUserId)
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login onLogin={(id) => {
          setUserId(id);
          localStorage.setItem("userId", id);
        }} />} />
        {/*Protecting all the other routes */}
        <Route path='/dashboard' element={userId ? <Dashboard/> : <Navigate to="/login" />} />

        {/*All other routes to home */}
        <Route path='*' element={<Navigate to="/" />}/>
      </Routes>
    </Router>
  )
}

export default App