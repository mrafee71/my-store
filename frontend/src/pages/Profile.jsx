import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../redux/slices/authSlice';
import { clearCart } from '../redux/slices/cartSlice';

const Profile = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const handleLogout = () => {
        // Dispatch logout action
        dispatch(logout());
        // Clear Cart Data
        dispatch(clearCart());
        // Redirect to login page
        navigate('/login');
    }

  return (
    <div className='min-h-screen flex flex-col'>
        <div className="flex-grow container mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                {/* Left Section */}
                <div className="w-full md:w-1/3 lg:w-1/4 p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl md:text-3xl font-bold">{userInfo?.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">
                        {userInfo?.email}
                    </p>
                    <button 
                        onClick={handleLogout}
                        className='w-full bg-red-900 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200 cursor-pointer'>
                        Logout
                    </button>
                </div>
                {/* Right Section: Order Table */}
                <div className="w-full md:w-2/3 lg:w-3/4 p-6 rounded-lg shadow-md">
                    <MyOrdersPage />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile