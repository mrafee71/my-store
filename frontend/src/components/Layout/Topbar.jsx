import React from 'react'
import { BsMeta, BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="bg-emerald-950 text-white">
        <div className="container mx-auto flex justify-between items-center py-2 px-6">
            <div className='hidden md:flex item-center space-x-4'>
                <a href="#" className='hover:text-gray-300'>
                    <BsMeta className='h-5 w-5'/>
                </a>
                <a href="#" className='hover:text-gray-300'>
                    <FaInstagram className='h-5 w-5'/>
                </a>
                <a href="#" className='hover:text-gray-300 my-auto'>
                    <BsTwitterX className='h-4 w-4'/>
                </a>
            </div>
            <div className="text-sm text-center flex-grow">
                <span>We Ship Worldwide - Fast and Reliable Shipping</span>
            </div>
            <div className="hidden md:block text-sm">
                <a href="tel:+919876543210" className='hover:text-gray-300'>+91 9876543210</a>
            </div>
        </div>
    </div>
  )
}

export default Topbar