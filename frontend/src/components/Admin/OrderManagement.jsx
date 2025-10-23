import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo: user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);

    useEffect(() => {
      if (!user || user.role !== 'admin') {
        navigate('/');
      }
      else {
        dispatch(fetchAllOrders());
      }
    }, [dispatch, navigate, user]);

    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ id:orderId, status}));
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-6">Order Management</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <tr key={order._id} className="border-b border-b-gray-200 hover:bg-gray-50 cursor-pointer">
                            <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                            <td className="p-4">{order.user.name}</td>
                            <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                            <td className="p-4">
                                <select 
                                    value={order.status} 
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)} 
                                    className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg outline-0 focus:ring-emerald-400 focus:border-emerald-400 block p-2.5"
                                >
                                    <option value="Processing" className="">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td className="p-4">
                              {order.status !== "Delivered" && (
                                <button 
                                    onClick={() => handleStatusChange(order._id, "Delivered")} 
                                    className="bg-emerald-500 text-white px-4 py-1 rounded hover:bg-emerald-600 transition-colors"
                                >
                                    Mark as Delivered
                                </button>
                              )}                                
                            </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-500">No orders found.</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderManagement