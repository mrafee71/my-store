import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {

    const dispatch = useDispatch();

    // Handle adding or substracting to cart
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                guestId,
                userId,
                size,
                color
            }))
        };
    }

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({
            productId,
            guestId,
            userId,
            size,
            color
        }))
    }

  return (
    <div>
        {
            cart.products.map((item, index) => (
                <div key={index} className="flex items-start justify-between py-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <div>
                            <h3>
                                {item.name}
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Size: {item.size} | color: {item.color}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button 
                                    onClick={() => handleAddToCart(item.productId, -1, item.quantity, item.size, item.color)}
                                    className='border border-gray-200 rounded px-2.5 py-0.5 text-xl font-medium'>
                                        -
                                </button>
                                <span className='mx-4 text-lg'>{item.quantity}</span>
                                <button 
                                    onClick={() => handleAddToCart(item.productId, 1, item.quantity, item.size, item.color)}
                                    className='border border-gray-200 rounded px-2 py-0.5 text-xl font-medium'>
                                        +
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            ${item.price.toLocaleString()}
                        </p>
                        <button
                            onClick={() => handleRemoveFromCart(item.productId, item.size, item.color)}
                        >
                            <RiDeleteBin5Fill className='h-5 w-5 mt-2 text-red-600' />
                        </button>
                    </div>
                </div>
            ))
        }

    </div>
  )
}

export default CartContents