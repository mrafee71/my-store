import { Link } from 'react-router'
import { FaFacebook, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className='pt-12'>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-6">
            <div>
                <h3 className='text-lg text-emerald-950 mb-1'>Newsletter</h3>
                <p className='text-gray-500 mb-1'>
                    Subscribe to our newsletter to get the latest updates and offers.
                </p>
                <p className='font-medium text-sm mb-4'>Sign Up and get 10% off your first order.</p>

                {/* Newsletter form */}
                <form action="" className='flex'>
                    <input type="email" placeholder='Enter your email' className='border-t border-l border-b border-gray-300 rounded-l-md p-3 w-full focus:outline-none transition-all' required/>
                    <button type="submit" className='bg-emerald-950 text-white rounded-r-md px-6 py-3 text-sm hover:bg-emerald-900 transition-all'>Subscribe</button>
                </form>
            </div>
            {/* Shop Links */}
            <div>
                <h3 className='text-lg text-emerald-950 mb-1'>Shop</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>Men's Top Wear</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>Women's Top Wear</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>Men's Bottom Wear</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>Women's Bottom Wear</Link>
                    </li>
                </ul>
            </div>
            {/* Support Links */}
            <div>
                <h3 className='text-lg text-emerald-950 mb-1'>Support</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>Contact Us</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>About Us</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>FAQs</Link>
                    </li>
                    <li>
                        <Link to="#" className='hover:text-gray-800 transition-colors'>Features</Link>
                    </li>
                </ul>
            </div>
            {/* Follow Us Links */}
            <div>
                <h3 className='text-lg text-emerald-950 mb-2'>Follow Us</h3>
                <div className='flex items-center space-x-4 mb-4'>
                    <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='text-blue-800 hover:text-blue-600'>
                        <FaFacebook className='h-5 w-5' />
                    </a>
                    <a href="https://www.instagram.com/" target='_blank' rel='noopener noreferrer' className='text-pink-500 hover:text-fuchsia-600'>
                        <FaInstagram className='h-5 w-5' />
                    </a>
                    <a href="https://x.com/" target='_blank' rel='noopener noreferrer' className='text-gray-600 hover:text-black'>
                        <RiTwitterXLine className='h-5 w-5' />
                    </a>
                </div>
                <p className='text-gray-500'>Call Us</p>
                <p>
                    <FaPhoneAlt className='inline-block mr-2' />
                    +91 9876543210
                </p>
            </div>
        </div>
        {/* Footer Bottom */}
        <div className='bg-emerald-950 text-white py-4 mt-8'>
            <div className="container mx-auto text-center">
                <p className='text-sm'>© 2025 All rights reserved. Designed by <a href=""
                className='text-emerald-200 hover:text-emerald-100 transition-colors'>Muhammad rafeeque P H</a></p>
                <p className='text-sm'>Powered by <a href="https://www.example.com" target='_blank' rel='noopener noreferrer' className='text-emerald-200 hover:text-emerald-100 transition-colors'>MyStore</a></p>
            </div>
        </div>
    </footer>
  )
}

export default Footer