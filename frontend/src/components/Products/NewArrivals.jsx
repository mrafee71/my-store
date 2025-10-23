import { useState, useEffect, useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router";
import axios from "axios";

const NewArrivals = () => {

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const [ newArrivals, setNewArrivals ] = useState([]);

    useEffect(() => {
        // Fetch new arrivals data from API
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            } catch (error) {
                console.error("Error fetching new arrivals:", error);
            }
        }

        fetchNewArrivals();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX; // Adjust the scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleMouseUporLeave = () => {
        setIsDragging(false);
        setCanScrollLeft(scrollRef.current.scrollLeft > 0);
    }

    const scroll = (direction) => {
        const scrollAmount = direction === 'left' ? -300 : 300;
        scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    const updateScrollButtons = () => {
        const container = scrollRef.current;

        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons(); // Initial check
            return () => {
                container.removeEventListener('scroll', updateScrollButtons);
            }
        }
    }, [newArrivals]);

  return (
    <section className='py-16 px-4 md:px-8 lg:px-16'>
        <div className='container mx-auto text-center mb-10 relative'>
            <h1 className='text-3xl md:text-5xl font-bold text-center text-emerald-950'>
                New Arrivals
            </h1>
            <p className='text-sm tracking-tighter md:text-lg text-center mb-6 text-emerald-600'>
                Check out our latest products
            </p>

            {/* Scroll Buttons */}
            <div className="absolute right-0 bottom-[-30px] flex space-x-4">
                <button onClick={() => scroll('left')} 
                disabled={!canScrollLeft}
                className={`p-1 rounded-lg border bg-white transition duration-300 ${canScrollLeft ? 'text-emerald-950 hover:bg-emerald-950 hover:text-white' : 'text-gray-400 cursor-not-allowed'}`}>
                    <FaArrowCircleLeft className='text-2xl' />
                </button>
                <button onClick={() => scroll('right')} 
                disabled={!canScrollRight}
                className={`p-1 rounded-lg border bg-white transition duration-300 ${canScrollRight ? 'text-emerald-950 hover:bg-emerald-950 hover:text-white' : 'text-gray-400 cursor-not-allowed'}`}>
                    <FaArrowCircleRight className='text-2xl' />
                </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUporLeave}
        onMouseLeave={handleMouseUporLeave}
        className={`container mx-auto flex overflow-x-scroll space-x-6 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} scrollbar-hide`}>
            {newArrivals.map((product) => (
                <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                    <img src={product.images[0]?.url} alt={product.images[0]?.alt || product.name } className="w-full h-[400px] object-cover rounded-lg" draggable="false" />
                    <div className="absolute bottom-0 left-0 backdrop-blur-md bg-emerald-900/20 text-white p-4 rounded-b-lg w-full">
                        <Link to={`/product/${product._id}`} className="block">
                            <h4 className='font-bold'>
                                {product.name}
                            </h4>
                            <p className='text-sm'>
                                ${product.price}
                            </p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default NewArrivals