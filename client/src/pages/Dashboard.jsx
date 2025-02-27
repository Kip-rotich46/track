import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Exercises from '../components/Exercises';
import Monitorings from '../components/Monitorings';
import AddRoutines from '../components/AddRoutines';
import FoodAndDiets from '../components/FoodAndDiets';
import Navbar from '../components/Navbar';

const Dashboard = ({ activeTab = 'dashboard' }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [currentTab, setCurrentTab] = useState(activeTab);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            navigate('/');
            return;
        }
        setUserId(storedUserId);
    }, [navigate]);

    const handleLogOut = () => {
        localStorage.removeItem("userId");
        navigate("/");
    }

    // Update current tab when activeTab prop changes
    useEffect(() => {
        setCurrentTab(activeTab);
    }, [activeTab]);

    const renderContent = () => {
        switch (currentTab) {
            case 'exercises':
                return (
                    <div className="grid grid-cols-1 gap-6">
                        <Exercises userId={userId} />
                        <AddRoutines userId={userId} />
                    </div>
                );
            case 'nutrition':
                return <FoodAndDiets userId={userId} />;
            case 'health':
                return <Monitorings userId={userId} />;
            default:
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <AddRoutines userId={userId} />
                        </div>
                        <div className="col-span-1">
                            <Exercises userId={userId} />
                        </div>
                        <div className="col-span-1">
                            <Monitorings userId={userId} />
                        </div>
                        <div className="col-span-1">
                            <FoodAndDiets userId={userId} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <Navbar onLogout={handleLogOut} activeTab={currentTab} />
            <div className="max-w-7xl mx-auto py-6">
                <h1 className='text-4xl font-semibold mb-8 text-center'>
                    {currentTab === 'dashboard' ? 'Your Dashboard' :
                     currentTab === 'exercises' ? 'Exercise Tracking' :
                     currentTab === 'nutrition' ? 'Nutrition Management' :
                     currentTab === 'health' ? 'Health Monitoring' : 'Dashboard'}
                </h1>
                {renderContent()}
            </div>
        </div>
    );
}

export default Dashboard