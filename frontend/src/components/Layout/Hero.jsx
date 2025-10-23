import heroImg from '../../assets/mystore-hero.png'
import { Link } from 'react-router'

const Hero = () => {
  return (
    <div className='relative'>
        <img src={heroImg} alt="Hero" className='w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover lg:object-left'/>
        <div className="absolute inset-0 flex items-center bg-black/10">
            <div className="text-white p-6 px-8 md:px-12 lg:px-16">
                <h1 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                    Vacation
                    <br /> Ready
                </h1>
                <p className='text-sm tracking-tighter md:text-lg mb-6'>
                    Explore our vacation-ready outfits with fast worldwide shipping and easy returns.
                </p>
                <Link to="#" className="bg-white text-emerald-900 px-6 py-2 rounded-sm text-lg">
                    Shop Now
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero