import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import register from '../assets/register.png';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // Get redirect parameter and check if it's checkout or something
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const isCheckoutRedirect = redirect.includes('checkout');

    useEffect(() => {
        if (userInfo) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user: userInfo })).then(() => {
                    navigate(isCheckoutRedirect ? redirect : '/');
                })
            }
            else {
                navigate(isCheckoutRedirect ? redirect : '/');
            }
        }
    }, [userInfo, guestId, cart, navigate, isCheckoutRedirect, dispatch ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        dispatch(registerUser({ name, email, password }));
    }

  return (
    <div className="flex">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-12 bg-emerald-100">
            <form 
            onSubmit={handleSubmit}
            action=""
            className="w-full bg-white p-8 rounded-lg shadow-sm max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-1 text-emerald-950">
                    Hey there! 👋
                </h2>
                <p className='text-center mb-6 text-gray-600'>
                    Create your account to start shopping with us.
                </p>
                <div className="mb-4">
                    <label htmlFor="name" className='block text-sm font-semibold mb-2 cursor-pointer'>Name</label>
                    <input 
                        id='name'
                        type="text" 
                        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your name'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-sm font-semibold mb-2 cursor-pointer'>Email</label>
                    <input 
                        id='email'
                        type="email" 
                        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className='block text-sm font-semibold mb-2 cursor-pointer'>Password</label>
                    <input 
                        id='password'
                        type="password" 
                        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter your password'
                    />
                </div>
                <button 
                    type='submit'
                    className='w-full bg-emerald-900 text-white p-2 rounded-lg hover:bg-emerald-600 transition duration-200 cursor-pointer'
                >
                    {loading ? "Loading..." : "SignUp"}
                </button>
                <p className='text-center mt-4 text-gray-600 text-sm'>
                    Already have an account?
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-emerald-900 font-semibold hover:underline'> Sign In</Link>
                </p>
            </form>
        </div>

        <div className="hidden md:block w-1/2 bg-emerald-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={register} alt="Login to account" className='h-[650px] w-full object-cover' />
            </div>
        </div>
    </div>
  )
}

export default Register