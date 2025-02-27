import React, { useState } from 'react';
import AuthImage from '../assets/AuthImage.jpg';
import george from '../assets/george.jpg';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import { FaDumbbell, FaHeartbeat, FaChartLine, FaUsers } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    const handleUserLogin = (userId) => {
        console.log("User logged in with ID:", userId);
        navigate("/dashboard");
    };

    const features = [
        {
            icon: <FaDumbbell className="w-6 h-6 text-blue-500" />,
            title: 'Workout Tracking',
            description: 'Log and track your workouts with detailed exercise tracking and progress monitoring.'
        },
        {
            icon: <FaHeartbeat className="w-6 h-6 text-red-500" />,
            title: 'Health Monitoring',
            description: 'Keep track of vital health metrics including heart rate, calories, and activity levels.'
        },
        {
            icon: <FaChartLine className="w-6 h-6 text-green-500" />,
            title: 'Progress Analytics',
            description: 'Visualize your fitness journey with detailed charts and progress tracking tools.'
        },
        {
            icon: <FaUsers className="w-6 h-6 text-purple-500" />,
            title: 'Community Support',
            description: 'Connect with like-minded fitness enthusiasts and share your achievements.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">Take control of your</span>
                                    <span className="block text-blue-600">fitness journey</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Track your workouts, monitor your health, and achieve your fitness goals with our comprehensive fitness tracking platform.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow ">
                                        <button
                                            onClick={() => setShowLogin(true)}
                                            className=" cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                        >
                                            Get Started
                                        </button>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <button
                                            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                            className="cursor-pointer w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                        src={george}
                        alt="Person working out"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to succeed
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Our comprehensive suite of features helps you stay on track and achieve your fitness goals.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <div key={index} className="relative">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100 text-white mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-base text-gray-500">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowLogin(false)}></div>
                        
                        <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl transform transition-all p-4">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                                    <p className="text-sm text-gray-500 mt-1">Sign in to continue your fitness journey</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowLogin(false)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl"></div>

                            {/* Login Form */}
                            <div className="mt-2">
                                <Login onLogin={handleUserLogin} />
                            </div>

                            {/* Additional Links */}
                            <div className="mt-3 text-center text-sm">
                                <p className="text-gray-500">
                                    Don't have an account?{' '}
                                    <button 
                                        onClick={() => {
                                            // Handle signup navigation
                                            setShowLogin(false);
                                            navigate('/signup');
                                        }}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Sign up for free
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home