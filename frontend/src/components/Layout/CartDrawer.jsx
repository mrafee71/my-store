import { IoMdCloseCircleOutline } from "react-icons/io";
import CartContents from "../Cart/CartContents";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({drawerOpen, toggleDrawer}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = userInfo ? userInfo._id : null;

    const handleCheckout = () => {
        toggleDrawer();
        if (!userInfo){
            navigate('/login?redirect=checkout');
        }
        else {
            navigate('/checkout');
        }
    }

    useEffect(() => {
        dispatch(fetchCart({ userId, guestId }));
    }, [dispatch, userId, guestId]);
  
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Close Button */}
        <div className="flex justify-end p-4">
            <button onClick={toggleDrawer}>
                <IoMdCloseCircleOutline className='h-6 w-6 text-gray-700 hover:text-emerald-950 hover:cursor-pointer' />
            </button>
        </div>
        {/* Cart Items with scrollable areas */}
        <div className="flex-grow overflow-y-auto p-4">
            <h2 className="text-xl font-semibold mb-4 text-emerald-900">Your Cart</h2>
            { cart && cart?.products?.length > 0 ? (<CartContents cart={cart} userId={userId} guestId={guestId} />) : (
                <p className="text-gray-600">Your cart is empty.</p>
            ) }
        </div>

        {/* Checkout Button fixed at the bottom */}
        <div className="p-4 bg-white sticky bottom-0">
            { cart && cart?.products?.length > 0 && (
                <>
                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-emerald-950 text-white py-2 rounded-lg hover:bg-emerald-900 transition duration-300 mb-2">
                        Checkout
                    </button>
                    <p className="text-sm tracking-tighter text-emerald-950 text-center">Shipping, Taxes and Discount codes calculated at checkout*</p>
                </>
            ) }
        </div>
    </div>
  )
}

export default CartDrawer