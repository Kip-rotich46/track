import React, { useEffect, useState } from 'react';
import {Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';

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
        
        {/* Protected Routes */}
        <Route path='/dashboard/*' element={
          userId ? <Dashboard /> : <Navigate to="/login" />
        } />
        <Route path='/exercises' element={
          userId ? <Dashboard activeTab="exercises" /> : <Navigate to="/login" />
        } />
        <Route path='/nutrition' element={
          userId ? <Dashboard activeTab="nutrition" /> : <Navigate to="/login" />
        } />
        <Route path='/health' element={
          userId ? <Dashboard activeTab="health" /> : <Navigate to="/login" />
        } />
        <Route path='/profile' element={
          userId ? <Profile userId={userId} /> : <Navigate to="/login" />
        } />

        {/* Redirect unknown routes to dashboard if logged in, otherwise home */}
        <Route path='*' element={
          userId ? <Navigate to="/dashboard" /> : <Navigate to="/" />
        }/>
      </Routes>
    </Router>
  )
}

export default App