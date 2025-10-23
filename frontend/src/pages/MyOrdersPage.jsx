import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrdersPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    const handleRawClick = (orderId) => {
        // Navigate to the order details page
        navigate(`/order/${orderId}`);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>My Orders</h2>
        <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <table className='min-w-full text-xs text-left text-gray-500'>
                <thead className='text-xs text-emerald-700 uppercase bg-gray-100'>
                    <tr>
                        <th className='py-2 px-4 sm:py-3'>Image</th>
                        <th className='py-2 px-4 sm:py-3'>Order ID</th>
                        <th className='py-2 px-4 sm:py-3'>Created</th>
                        <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3'>Items</th>
                        <th className='py-2 px-4 sm:py-3'>Price</th>
                        <th className='py-2 px-4 sm:py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr 
                                key={order._id} 
                                className='border-b border-b-emerald-100 hover:bg-gray-50 cursor-pointer'
                                onClick={() => handleRawClick(order._id)}
                            >
                                <td className='p-2 sm:p-4'>
                                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg' />
                                </td>
                                <td className='p-2 sm:p-4 font-medium whitespace-nowrap text-emerald-900'>#{order._id}</td>
                                <td className='p-2 sm:p-4 text-emerald-900'>
                                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </td>
                                <td className='p-2 sm:p-4 text-emerald-900'>
                                    {
                                        order.shippingAddress ?
                                        `${order.shippingAddress.city}, ${order.shippingAddress.country}` : 
                                        'N/A'
                                    }
                                </td>
                                <td className='p-2 sm:p-4 text-emerald-900'>
                                    {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                                </td>
                                <td className='p-2 sm:p-4 text-emerald-900'>
                                    ${order.totalPrice.toFixed(2)}
                                </td>
                                <td className='p-2 sm:p-4'>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {order.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className='text-center p-4 text-gray-500'>No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MyOrdersPage