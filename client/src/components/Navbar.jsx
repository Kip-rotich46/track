import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { MdSportsGymnastics, MdDashboard, MdSettings } from "react-icons/md";
import { 
    FaUserCircle, 
    FaDumbbell, 
    FaSignOutAlt, 
    FaUser, 
    FaHistory, 
    FaBell 
} from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = ({ onLogout, activeTab = 'dashboard' }) => {
    const navigate = useNavigate();
    const [showDropDown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userData, setUserData] = useState({ name: '', email: '' });
    const dropdownRef = useRef(null);

    // Get user data from localStorage
    useEffect(() => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        setUserData({
            name: name || 'User',
            email: email || ''
        });
    }, []);

    // Handle click outside of dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update time
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const navLinks = [
        { name: 'Dashboard', icon: <MdDashboard size={20} />, path: '/dashboard' },
        { name: 'Exercises', icon: <FaDumbbell size={20} />, path: '/exercises' },
        { name: 'Nutrition', icon: <IoFastFood size={20} />, path: '/nutrition' },
        { name: 'Health', icon: <TbActivityHeartbeat size={20} />, path: '/health' },
    ];

    return (
        <nav className='bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg '>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    {/* Logo and Brand */}
                    <div className='flex items-center'>
                        <div className='flex-shrink-0 flex items-center space-x-3 cursor-pointer'
                            onClick={() => navigate('/dashboard')}
                        >
                            <MdSportsGymnastics className='h-8 w-8' />
                            <span className='font-bold text-xl'>FitTrack</span>
                        </div>

                        {/* Desktop Navigation Links */}
                        {!isMobile && (
                            <div className='hidden md:flex ml-10 space-x-8'>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === link.path.slice(1) ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side items */}
                    <div className='flex items-center space-x-4'>
                        {/* Time Display */}
                        <div className='hidden md:flex items-center px-3 py-1 bg-blue-700 rounded-full'>
                            <span className='text-sm'>
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>

                        {/* Settings and Profile */}
                        <div className='relative flex items-center space-x-3'>
                            <button className='p-2 rounded-full hover:bg-blue-700 transition-colors'>
                                <MdSettings size={24} />
                            </button>

                            <div className='relative' ref={dropdownRef}>
                                <button 
                                    onClick={() => setShowDropdown(!showDropDown)}
                                    className='flex items-center space-x-2 p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    <FaUserCircle size={24} />
                                </button>

                                {/* Profile Dropdown */}
                                {showDropDown && (
                                    <div 
                                        className='absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5'
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className='px-4 py-3 border-b border-gray-100'>
                                            <p className='text-sm font-medium text-gray-900'>{userData.name}</p>
                                            <p className='text-sm text-gray-500'>{userData.email}</p>
                                        </div>
                                        
                                        <div className='py-1'>
                                            <Link 
                                                to='/profile' 
                                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <FaUser className='mr-3 text-gray-400' />
                                                Your Profile
                                            </Link>
                                            <Link 
                                                to='/profile?tab=settings' 
                                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <MdSettings className='mr-3 text-gray-400' />
                                                Settings
                                            </Link>
                                        </div>

                                        <div className='py-1 border-t border-gray-100'>
                                            <Link 
                                                to='/profile?tab=activity' 
                                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <FaHistory className='mr-3 text-gray-400' />
                                                Activity Log
                                            </Link>
                                            <Link 
                                                to='/profile?tab=notifications' 
                                                className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <FaBell className='mr-3 text-gray-400' />
                                                Notifications
                                            </Link>
                                        </div>

                                        <div className='py-1 border-t border-gray-100'>
                                            <button
                                                onClick={onLogout}
                                                className='w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                                            >
                                                <FaSignOutAlt className='mr-3' />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        {isMobile && (
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className='p-2 rounded-md hover:bg-blue-700 transition-colors'
                            >
                                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={showMobileMenu ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                                </svg>
                            </button>
                        )}
                        </div>

                </div>

                {/* Mobile Navigation Menu */}
                {isMobile && showMobileMenu && (
                    <div className='md:hidden py-3'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center space-x-2 px-4 py-2 text-base font-medium transition-colors ${activeTab === link.path.slice(1) ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                                onClick={() => setShowMobileMenu(false)}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar