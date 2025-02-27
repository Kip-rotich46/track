import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaCog, FaBell, FaLock, FaHistory } from 'react-icons/fa';

/**
 * Profile page component.
 *
 * @param {Object} props Component props.
 * @param {string} props.userId User ID to display profile for.
 *
 * @returns {ReactElement} Profile page component.
 */
const Profile = ({ userId }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        avatar: '',
        preferences: {
            notifications: true,
            theme: 'light',
            language: 'en'
        }
    });
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'general';
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    const handleUpdateProfile = async (updatedData) => {
        try {
            await axios.put(`http://localhost:3001/api/users/${userId}`, updatedData);
            setProfile({ ...profile, ...updatedData });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: <FaUser /> },
        { id: 'settings', label: 'Settings', icon: <FaCog /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
        { id: 'security', label: 'Security', icon: <FaLock /> },
        { id: 'activity', label: 'Activity', icon: <FaHistory /> }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                {profile.avatar ? (
                                    <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <FaUser size={40} className="text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{profile.name || 'Your Name'}</h3>
                                <p className="text-gray-500">{profile.email || 'your.email@example.com'}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                );

            case 'settings':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>Theme</span>
                                    <select className="px-3 py-2 border rounded-md">
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Language</span>
                                    <select className="px-3 py-2 border rounded-md">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                                    <span>Email Notifications</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                                    <span>Push Notifications</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                                    <span>Weekly Reports</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                            <div className="space-y-4">
                                <button className="w-full px-4 py-2 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    Change Password
                                </button>
                                <button className="w-full px-4 py-2 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    Two-Factor Authentication
                                </button>
                                <button className="w-full px-4 py-2 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    Connected Devices
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'activity':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {/* Sample activity items */}
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <FaUser className="text-blue-500" />
                                    <span>Profile updated - 2 days ago</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <FaCog className="text-green-500" />
                                    <span>Settings changed - 5 days ago</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <FaLock className="text-red-500" />
                                    <span>Password changed - 1 week ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
                        <div className="h-64 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-2xl font-bold">Profile Settings</h2>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>

                {/* Tabs and Content */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b">
                        <nav className="flex space-x-2 p-4">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
