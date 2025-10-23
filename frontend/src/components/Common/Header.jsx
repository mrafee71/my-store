import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className="border-b border-gray-200 fixed top-0 left-0 right-0 z-50 lg:z-100 bg-white">
        {/* Topbar */}
        <Topbar />
        {/* Navbar */}
        <Navbar />
        {/* Cart Drawer */}
    </header>
  )
}

export default Header