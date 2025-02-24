import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdSportsGymnastics } from "react-icons/md";
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ onLogout }) => {
    const navigate = useNavigate();
    const [showDropDown, setShowDropdown] = useState(false);

    return (
        <nav className='bg-blue-500 text-white p-4 rounded-sm flex justify-between items-center shadow-md'>
            <div className='cursor-pointer flex items-center space-x-2'
                onClick={() => navigate("/dasboard")}
            >
                <MdSportsGymnastics className='ml-10 ' size={30} />
            </div>

            <div className='relative'>
                <div className='flex items-center space-x-2 cursor-pointer'
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <FaUserCircle size={30} className='mr-10' />
                    {/* <span className='hover:underline'>Profile</span> */}
                </div>

                {/*//Dropdown Menu*/}
                {showDropDown && (
                    <div className='absolute right-0 mt-2 w-36 bg-white text-black shadow-md rounded-md text-center '
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >

                        <button className='block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white'
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}

            </div>
        </nav>
    )
}

export default Navbar