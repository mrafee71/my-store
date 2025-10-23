import { useEffect, useState } from 'react';
import { toast } from 'sonner'
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetails = ({productId}) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    
    const { userInfo, guestId } = useSelector((state) => state.auth);
    
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
    const [mainImage, setMainImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;

    useEffect(() => {
        if(productFetchId){
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }) );
        }
    }, [dispatch, productFetchId]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    }

    const handleQuantityChange = (action) => {
        if (action === "plus") {
            setQuantity(prev => prev + 1);
        } else if (action === "minus") {
            setQuantity(prev => Math.max(1, prev - 1));
        }
    }

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select a color and size before adding to cart.", {
                duration: 1500,
            });
            return;
        }

        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: userInfo ?. _id ,
            })
        ).then(() => {
            toast.success("Product added to cart!", { duration: 1000, });
        }).finally(() => {
            setIsButtonDisabled(false);
        })
    }
    

    if (loading) {
        return <p className="text-center">Loading product details...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

  return (
    <div className='p-4 md:p-6'>
        {selectedProduct && (
            <div className='max-w-6xl mx-auto bg-white rounded-lg p-2 md:p-8'>
                <div className="flex flex-col md:flex-row">
                    {/* Left Thumbnails */}
                    <div className='hidden md:flex flex-col mr-6 space-y-4'>
                        {
                            selectedProduct.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image.url} 
                                    alt={image.alt || `Product Image ${index + 1}`} 
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 ${mainImage === image.url ? 'opacity-100 border-2 border-emerald-600' : 'opacity-50'}`}
                                    onClick={() => handleThumbnailClick(image.url)}
                                />
                            ))
                        }
                    </div>
                    {/* Main Image */}
                    <div className='md:w-1/2'>
                        <div className="mb-4">
                            <img 
                                src={mainImage} 
                                alt="Main Product Image" 
                                className='w-full h-auto rounded-lg shadow-lg object-cover transition-transform duration-300'
                            />
                        </div>
                    </div>
                    {/* Mobile Thumbnail */}
                    <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                        {
                            selectedProduct.images.map((image, index) => (
                                <img 
                                    key={index} 
                                    src={image.url} 
                                    alt={image.alt || `Product Image ${index + 1}`} 
                                    className='w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75'
                                    onClick={() => handleThumbnailClick(image.url)}
                                />
                            ))
                        }
                    </div>
                    {/* Right Side */}
                    <div className='md:w-1/2 md:ml-10'>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-emerald-950">
                            {selectedProduct.name}
                        </h1>
                        <div className="flex mb-2">
                            <p className="text-lg text-gray-500 line-through mr-2">
                                {selectedProduct.originalPrice && `$${selectedProduct.originalPrice.toFixed(2)}`}
                            </p>
                            <p className="text-2xl text-emerald-950">
                                ${selectedProduct.price.toFixed(2)}
                            </p>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {selectedProduct.description}
                        </p>
                        <div className="mb-4">
                            <p className="text-gray-700">Color:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.colors.map((color, index) => (
                                    <button key={index}
                                        className={`w-10 h-10 rounded-full border-3 cursor-pointer hover:opacity-75 transition duration-200 ${selectedColor === color ? 'border-green-400' : 'border-white'}`}
                                        style={{ 
                                            backgroundColor: color.toLowerCase()
                                        }}
                                        onClick={() => setSelectedColor(color)}
                                        title={color}>
                                        
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700">Sizes:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.sizes.map((size, index) => (
                                    <button key={index} 
                                        className={`px-4 py-2 border rounded-lg cursor-pointer transition duration-200 ${selectedSize === size ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                                        onClick={() => setSelectedSize(size)}
                                        >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button 
                                className="px-3 py-1 border rounded-lg hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleQuantityChange("minus")}
                                >
                                    -
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button 
                                className="px-2.5 py-1 border rounded-lg hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleQuantityChange("plus")}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button 
                        disabled={isButtonDisabled}
                        onClick={handleAddToCart}
                        className={`w-full bg-emerald-950 text-white py-3 rounded-lg hover:bg-emerald-800 transition duration-200 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {isButtonDisabled ? "Adding to Cart..." : "Add to Cart"}
                        </button>

                        <div className="mt-10 text-gray-700">
                            <h3 className="text-xl font-bold mb-4">
                                Charecteristics
                            </h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="py-2 font-semibold">Brand:</td>
                                        <td className="py-2">{selectedProduct.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 font-semibold">Material:</td>
                                        <td className="py-2">{selectedProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-2xl text-center text-emerald-950 font-medium mb-4">
                        You may also like
                    </h2>
                    <ProductGrid products={similarProducts} loading={loading} error={error} />
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductDetails