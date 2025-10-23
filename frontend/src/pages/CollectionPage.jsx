import { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice'

const CollectionPage = () => {

    const { collection } =useParams();
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Function to handle click outside the sidebar
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener For click outside to close the sidebar
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup the event listener on component unmount
        return () => {
            // Remove the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile Filter Button */}
        <button 
        onClick={toggleSidebar}
        className='lg:hidden p-2 flex justify-center items-center shadow-sm'>
            <FaFilter className='mr-2' /> Filter
        </button>

        {/* Filter Sidebar */}
        <div 
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 left-0 w-64 h-screen bg-white overflow-y-auto transition-transform transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <FilterSidebar />
        </div>
        {/* Main Content Area */}
        { loading ? (
        <div className='flex-grow flex justify-center items-center h-screen'>
            <div className='text-xl text-emerelad-600'>Loading...</div>
        </div>
        ) :
        <div className='flex-grow p-4'>
            <h2 className='text-2xl font-bold uppercase mb-4'>
                All Collections
            </h2>

            {/* Sort Options */}
            <SortOptions />
            
            {/* Product Grid */}
            <ProductGrid products={products} loading={loading} error={error} />
        </div>
        }
    </div>
  )
}

export default CollectionPage