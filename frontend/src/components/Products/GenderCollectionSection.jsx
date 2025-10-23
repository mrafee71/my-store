import mensCollection from '../../assets/mens-collection.jpg'
import womensCollection from '../../assets/womens-collection.jpg'
import { Link } from 'react-router'

const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 md:px-8 lg:px-16'>
        <h1 className="text-3xl md:text-5xl font-bold text-center text-emerald-950">
            Explore Our Collections
        </h1>
        <p className='text-sm tracking-tighter md:text-lg text-center mb-6 text-emerald-600'>
            For Him & Her
        </p>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            {/* Women's Collection */}
            <div className="relative flex-1">
                <img src={womensCollection} alt="Women's Collection" className='w-full h-[350px] md:h-[400px] lg:h-[550px] rounded-lg object-cover object-top' />
                <div className="absolute bottom-8 left-8 bg-white/80 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-emerald-950">Women's Collection</h2>
                    <p className='text-sm tracking-tighter md:text-lg mb-3'>
                        Discover our latest
                    </p>
                    <Link to="/collections/all?gender=Women" className="bg-emerald-950 text-white px-6 py-2 rounded-sm text-lg">
                        Shop Now
                    </Link>
                </div>
            </div>
            {/* Men's Collection */}
            <div className="relative flex-1">
                <img src={mensCollection} alt="Men's Collection" className='w-full h-[350px] md:h-[400px] lg:h-[550px] rounded-lg object-cover object-top' />
                <div className="absolute bottom-8 left-8 bg-white/80 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-emerald-950">Women's Collection</h2>
                    <p className='text-sm tracking-tighter md:text-lg mb-3'>
                        Discover our latest
                    </p>
                    <Link to="/collections/all?gender=Men" className="bg-emerald-950 text-white px-6 py-2 rounded-sm text-lg">
                        Shop Now
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default GenderCollectionSection