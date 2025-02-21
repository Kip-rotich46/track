import React from 'react';
import AuthImage from '../assets/AuthImage.jpg';

import Login from '../components/Login';

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex-1 p-1 mt-1 ml-0 mr-4">
                <img src={AuthImage} alt='Person on a threadmill' className=' h-screen rounded-lg' />
            </div>

            <div className="w-3/5 max-w-2xl p-8 rounded-lg">
            <Login />
                
            </div>
        </div>
    )
}

export default Home