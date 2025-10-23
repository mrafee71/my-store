import { Link } from 'react-router'
import featured from '../../assets/featured.png'

const FeaturedCollections = () => {
  return (
    <section className='py-16 px-4 md:px-8 lg:px-16'>
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-emerald-50 rounded-3xl">
            {/* Left Content */}
            <div className="lg:w-1/2 p-8 text-center lg:text-left">
                <h2 className="text-lg font-semibold text-emerald-900 mb-2">
                    Comfort Meets Style
                </h2>
                <h2 className='text-4xl lg:text-5xl font-bold text-emerald-950 mb-6'>
                    Apparel made for your everyday life
                </h2>
                <p className='text-lg text-gray-600 mb-6'>
                    Discover our latest collection of apparel designed to blend comfort and style seamlessly. Whether you're at home, at work, or out on the town, our clothing is crafted to keep you looking and feeling your best.
                </p>
                <Link to="/collections/all" className="bg-emerald-950 text-white px-6 py-3 rounded-lg text-lg hover:bg-emerald-800 transition duration-300">
                    Shop Now
                </Link>
            </div>
            {/* Right Image */}
            <div className="lg:w-1/2">
                <img 
                    src={featured} 
                    alt="Featured Collection" 
                    className="w-full h-full object-cover rounded-t-3xl lg:rounded-tl-none lg:rounded-r-3xl"
                />
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollections