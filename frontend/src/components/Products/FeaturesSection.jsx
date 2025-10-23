import { HiShoppingBag } from 'react-icons/hi';
import { GrPowerCycle } from "react-icons/gr";
import { RiSecurePaymentLine } from "react-icons/ri";

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 md:px-8 lg:px-16'>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full">
                    <HiShoppingBag className="text-2xl text-emerald-950" />
                </div>
                <h4 className='tracking-tighter mb-1 text-emerald-950'>
                    FREE INTERNATIONAL SHIPPING
                </h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    Enjoy free shipping on all orders over $50.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full">
                    <GrPowerCycle className="text-2xl text-emerald-950" />
                </div>
                <h4 className='tracking-tighter mb-1 text-emerald-950'>
                    30-DAY RETURNS
                </h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    Hassle-free returns within 30 days of purchase.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center">
                <div className="p-4 rounded-full">
                    <RiSecurePaymentLine className="text-2xl text-emerald-950" />
                </div>
                <h4 className='tracking-tighter mb-1 text-emerald-950'>
                    SECURE PAYMENT
                </h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    Your payment information is secure with us.
                </p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection