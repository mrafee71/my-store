import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from'react-router';
import { addUser, deleteUser, fetchUsers, updateUser } from '../../redux/slices/adminSlice';


const UserManagement = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo: user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if ( user && user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (user && user.role === 'admin') {
            dispatch(fetchUsers());
        }
    }, [user, dispatch]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        dispatch(addUser(formData));

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer',
        });
    }

    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUser({id: userId, role: newRole}));
    }

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userId));
        }
    }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-2 md:mb-6">User Management</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {/* Add New User Form */}
        <div className="p-6 rounded-lg mb-6">
            <h3 className="text-lg font-bold mb-4">Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label 
                        htmlFor="name" 
                        className="block text-gray-700"
                    >
                        Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-200" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="email" 
                        className="block text-gray-700"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-200" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="password" 
                        className="block text-gray-700"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-200" 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="role" 
                        className="block text-gray-700"
                    >
                        Role
                    </label>
                    <select 
                        id="role" 
                        name="role" 
                        value={formData.role} onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
                >
                    Add User
                </button>
            </form>
        </div>

        {/* User List management */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left tect-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b border-b-gray-200 hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)} 
                                    className="p-2 border border-gray-200 rounded"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="p-4">
                                <button 
                                    className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded transition-colors"
                                    onClick={() => handleDeleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserManagement