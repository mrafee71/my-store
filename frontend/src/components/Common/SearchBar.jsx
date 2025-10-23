import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slices/productsSlice';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setFilters({ search: searchTerm }));
        dispatch(fetchProductsByFilters({ search: searchTerm }));
        navigate(`/collections/all?search=${searchTerm}`);
        // Reset the search term and close the search bar
        setSearchTerm('');
        setIsOpen(false);
    }

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? 'absolute top-0 right-0 left-0 w-full bg-white h-24 z-50' : 'w-auto'} `}>
        {isOpen ? (
            <form onSubmit={handleSearch} 
            className='relative flex items-center justify-center w-full'>
                <div className='relative w-1/2'>
                    <input 
                    type="text" 
                    placeholder='Search' 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-400' 
                    />
                    {/* Search Icon */}
                    <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 hover:cursor-pointer'>
                        <FaSearch className='h-5 w-5' />
                    </button>
                </div>
                {/* Close Icon */}
                <button 
                type='button' 
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 hover:cursor-pointer' 
                onClick={handleSearchToggle}
                >
                    <IoClose className='h-6 w-6' />
                </button>
            </form>
        ) : (
          <button onClick={handleSearchToggle} className='text-gray-700 hover:text-emerald-950 hover:cursor-pointer'>
            <FaSearch className='h-5 w-5' />
          </button>
        )}
    </div>
  )
}

export default SearchBar