import React from 'react';

import Exercises from '../components/Exercises';
import Monitorings from '../components/Monitorings';
import AddRoutines from '../components/AddRoutines';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const handleLogOut = () =>{
        localStorage.removeItem("userId");
        navigate("/login");
    }
    
    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <Navbar onLogout={handleLogOut}/>
            <h1 className='text-4xl font-semibold m-8 text-center'>Your Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Exercises Section */}
                <div className="col-span-1">
                    <Exercises />
                </div>

                <div className="col-span-1">
                    <AddRoutines />
                </div>

                <div className="col-span-1">
                    <Monitorings />
                </div>
                <div className="col-span-1">Charts</div>
                <div className="col-span-1">Food and Diets</div>

            </div>
        </div>
    )
}

export default Dashboard