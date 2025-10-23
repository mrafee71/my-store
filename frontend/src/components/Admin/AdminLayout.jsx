import { useState } from 'react'
import { Outlet } from 'react-router'
import { FaBars } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        {/* Mobile Toggle Button */}
        <div className="flex md:hidden p-4 bg-emerald-950 text-white z-20">
          <button onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
          <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
        </div>

        {/* Overlay for Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-10 md:hidden" 
          onClick={toggleSidebar}>
          </div>
        )}

        {/* Sidebar */}
        <div 
        className={`bg-emerald-950 w-64 min-h-screen text-white absolute md:relative transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300  md:translate-x-0 md:static md:block z-20`}>
          {/* Sidebar Component */}
          <AdminSidebar />
        </div>

        {/* Main Content */}
          <div className="flex-grow p-6 overflow-auto">
            <Outlet />
          </div>
    </div>
  )
}

export default AdminLayout