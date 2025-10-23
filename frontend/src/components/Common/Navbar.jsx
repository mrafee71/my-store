import {React, useState} from 'react'
import { Link } from 'react-router'
import { HiUser, HiShoppingBag, HiBars3BottomRight } from "react-icons/hi2";
import { IoMdCloseCircleOutline } from "react-icons/io";
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const {cart} = useSelector((state) => state.cart);
  const { userInfo:user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left - Logo */}
        <div className="">
          <Link to="/" className='text-2xl font-bold text-emerald-950'>
            MyStore
          </Link>
        </div>
        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="collections/all?gender=Men" className='text-gray-700 hover:text-emerald-950 font-medium uppercase'>Men</Link>
          <Link to="collections/all?gender=Women" className='text-gray-700 hover:text-emerald-950 font-medium uppercase'>Women</Link>
          <Link to="collections/all?category=Top Wear" className='text-gray-700 hover:text-emerald-950 font-medium uppercase'>Top Wear</Link>
          <Link to="collections/all?category=Bottom Wear" className='text-gray-700 hover:text-emerald-950 font-medium uppercase'>Bottom Wear</Link>
        </div>
        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white' >Admin</Link>
          )}
          {/* Profile */}
          <Link to="/profile" className='text-gray-700 hover:text-emerald-950'>
            <HiUser className='h-6 w-6' />
          </Link>
          {/* Cart */}
          <button className='relative hover:cursor-pointer' onClick={toggleDrawer}>
            <HiShoppingBag className='h-6 w-6 text-gray-700 hover:text-emerald-950' />
            { cartItemCount > 0 && (
              <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5'>
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <div className='overflow-hidden'>
            <SearchBar />
          </div>

          {/* Hamburger Menu for Mobile */}
          <button onClick={toggleNavDrawer} className='md:hidden'>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700 hover:text-emerald-950' />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Mobile Navigation Drawer */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer}>
            <IoMdCloseCircleOutline className='h-6 w-6 text-gray-700 hover:text-emerald-950 hover:cursor-pointer' />
          </button>
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Menu</h2>
          <nav className='space-y-4'>
            <Link to='collections/all?gender=Men' onClick={toggleNavDrawer} className='block text-emerald-900 hover:text-emerald-950'>
              Men
            </Link>
            <Link to='collections/all?gender=Women' onClick={toggleNavDrawer} className='block text-emerald-900 hover:text-emerald-950'>
              Women
            </Link>
            <Link to='collections/all?category=Top Wear' onClick={toggleNavDrawer} className='block text-emerald-900 hover:text-emerald-950'>
              Top Wear
            </Link>
            <Link to='collections/all?category=Bottom Wear' onClick={toggleNavDrawer} className='block text-emerald-900 hover:text-emerald-950'>
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar