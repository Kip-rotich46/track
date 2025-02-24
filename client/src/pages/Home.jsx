import React from 'react';
import AuthImage from '../assets/AuthImage.jpg';

import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleUserLogin = (userId) => {
        console.log("User logged in with ID:", userId);
        // You can also navigate to another page here or update global state
        navigate("/dashboard");
      };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex-1 p-1 mt-1 ml-0 mr-4">
                <img src={AuthImage} alt='Person on a threadmill' className=' h-screen rounded-lg' />
            </div>

            <div className="w-3/5 max-w-2xl p-8 rounded-lg">
            <Login onLogin={handleUserLogin} />
                
            </div>
        </div>
    )
}

export default Home