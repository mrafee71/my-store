import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        countInStock: 0,
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: "",
        material: '',
        gender: '',
        tags: [],
        images: [
        ],
    });

    const [uploading, setUploading] = useState(false); // Flag for image uploading

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleImageUpload = async (e) => {
        const files = e.target.files[0];
        const formData = new FormData();
        formData.append('image', files);

        try {
            setUploading(true);
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: {
                        'Content-Type':'multipart/form-data',
                    }
                }
            );
            setProductData((prevData) => ({
               ...prevData,
                images: [...prevData.images, {url: data.imageUrl, altText: ""}],
            }));
            setUploading(false);
        } catch (error) {
            console.error("Error uploading image:", error);
            setUploading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({id, productData}));
        navigate('/admin/products');
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error fetching product details: {error}</div>
    }


  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="mb-6">
                <label htmlFor="name" className="block font-semibold mb-2">Product Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter product name"
                    required
                />
            </div>

            {/* description */}
            <div className="mb-6">
                <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                <textarea 
                    id="description" 
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter product description"
                    rows={4}
                    required
                ></textarea>
            </div>

            {/* price */}
            <div className="mb-6">
                <label htmlFor="price" className="block font-semibold mb-2">Price</label>
                <input 
                    type="number" 
                    id="price" 
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter product price"
                    required
                />
            </div>

            {/* countInStock */}
            <div className="mb-6">
                <label htmlFor="countInStock" className="block font-semibold mb-2">Count in Stock</label>
                <input 
                    type="number" 
                    id="countInStock" 
                    name="countInStock"
                    value={productData.countInStock}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter stock count"
                    required
                />
            </div>

            {/* sku */}
            <div className="mb-6">
                <label htmlFor="sku" className="block font-semibold mb-2">SKU</label>
                <input 
                    type="text" 
                    id="sku" 
                    name="sku"
                    value={productData.sku}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter SKU"
                    required
                />
            </div>

            {/* sizes */}
            <div className="mb-6">
                <label htmlFor="sizes" className="block font-semibold mb-2">Sizes (comma seperated)</label>
                <input 
                    type="text" 
                    id="sizes" 
                    name="sizes"
                    value={productData.sizes.join(', ')}
                    onChange={(e) => setProductData({
                        ...productData,
                        sizes: e.target.value.split(',').map(size => size.trim())
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter sizes (comma separated)"
                />
            </div>

            {/* colors */}
            <div className="mb-2">
                <label htmlFor="colors" className="block font-semibold mb-2">Color codes (comma seperated)</label>
                <input
                    type="text" 
                    id="colors" 
                    name="colors"
                    value={productData.colors.join(', ')}
                    onChange={(e) => setProductData({
                        ...productData,
                        colors: e.target.value.split(',').map(color => color.trim())
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter colors (comma separated)"
                />
            </div>
            <div className="mb-6">
                <p className="font-bold">Colors:</p>
                <div className="flex gap-2 mt-2">
                    {productData.colors.map((color, index) => (
                        <button key={index}
                            className='w-10 h-10 rounded-full border-3 cursor-pointer hover:opacity-75 transition duration-200 border-gray-200'
                            style={{ 
                                backgroundColor: color.toLowerCase()
                            }}
                            title={color}>
                            
                        </button>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
                <label htmlFor="tags" className="block font-semibold mb-2">Tags (comma seperated)</label>
                <input
                    type="text" 
                    id="tags" 
                    name="tags"
                    value={productData.tags.join(', ')}
                    onChange={(e) => setProductData({
                        ...productData,
                        tags: e.target.value.split(',').map(tag => tag.trim())
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter tags (comma separated)"
                />
            </div>

            {/* gender */}
            <div className="mb-6">
                <label htmlFor="gender" className="block font-semibold mb-2">Gender</label>
                <input 
                    type="text" 
                    id="gender" 
                    name="gender"
                    value={productData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter Gender"
                    required
                />
            </div>

            {/* Collection */}
            <div className="mb-6">
                <label htmlFor="collections" className="block font-semibold mb-2">Collection</label>
                <input 
                    type="text" 
                    id="collections" 
                    name="collections"
                    value={productData.collections}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-200"
                    placeholder="Enter Collection"
                    required
                />
            </div>

            {/* Image upload */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Images</label>
                <input 
                    type="file" 
                    onChange={handleImageUpload}
                />
                {uploading && <div className="text-gray-600">Uploading image...</div>}
                <div className="flex gap-4 mt-4">
                    {productData.images.map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={image.altText || "Product Image"} 
                                className="w-20 h-20 object-cover rounded-md shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-colors"
            >
                Update Product
            </button>

        </form>
    </div>
  )
}

export default EditProductPage