import React from 'react';
import AuthImage from '../assets/AuthImage.jpg'

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex-1 p-1 mt-0 ml-0 mr-4">
                <img src={AuthImage} alt='Person on a threadmill' className=' h-screen rounded-lg' />
            </div>

            <div className="w-3/5 max-w-2xl p-8 rounded-lg">
                <h1 className='mt-5 font-bold text-2xl '>Welcome to Fitness Tracker</h1>

                <h2 className="text-gray-600  mb-10">Please Login with your details</h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" className="py-2 px-4 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default Home