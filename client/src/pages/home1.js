import React from 'react';
import AuthImage from '../assets/AuthImage.jpg'

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex-1 p-8 mt-0 ml-0">
                <img src={AuthImage} alt='Person on a threadmill' className='w-full h-screen rounded-lg' />
            </div>

            <div className="flex-1 p-8   shadow-lg rounded-lg">
                <h1 className='mt-5 font-bold text-2xl text-center'>Welcome to Fitness Tracker</h1>
                <h2 className='font-light text-1xl text-center mt-10 mb-4'>Please Login</h2>

                <form className='flex flex-col space-y-4 m-10'>
                    <div className="">
                        <label htmlFor="email" className='block text-md font-medium text-gray-700'>Email Address</label>
                        <input type="email" id='email' placeholder='email' className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                </form>

                <form action="" className='flex flex-col space-y-4 m-10'>
                    <div className="flex flex-col">
                        <label htmlFor="password" className='block text-md text-gray-700 font-medium '> Password</label>
                        <input type="password" name="password" id="password" placeholder='Enter your password' className='w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                </form>

                <button type='submit' className='text-center px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Login</button>

                <p className='text-center mt-6 text-sm'>
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>

            </div>
        </div>
    )
}

export default Home