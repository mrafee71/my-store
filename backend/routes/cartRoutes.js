const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();


// Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
}



// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Determine if the user is logged in or a guest
        const cart = await getCart(userId, guestId);
        if (cart) {
            const productIndex = cart.products.findIndex(item => item.productId.toString() === productId && item.size === size && item.color === color);
            if (productIndex > -1) {
                // Product already exists in the cart, update quantity
                cart.products[productIndex].quantity += quantity;
            }
            else {
                // Add new product to the cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                }],
                totalPrice: product.price * quantity
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
})

// @route PUT /api/cart
// @desc Update a product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId && item.size === size && item.color === color);
        if (productIndex > -1) {
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            }
            else {
                // Remove product from cart if quantity is 0
                cart.products.splice(productIndex, 1);
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

    } catch (error) {
        console.error('Error updating product in cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
})


// @route DELETE /api/cart
// @desc Remove a product from the cart for a guest or logged-in user
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId && item.size === size && item.color === color);

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            // Recalculate total price
            cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
})


// @route GET /api/cart
// @desc Get the cart for a guest or logged-in user
// @access Public
router.get("/", async (req, res) => {
    const { guestId, userId } = req.query;

    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            return res.json(cart);
        }
        else {
            return res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
})


// @route POST /api/cart/merge
// @desc Merge guest cart into user cart when user logs in
// @access Private
router.post("/merge", protect, async (req, res) => {
    const { guestId } = req.body;
    
    try {
        // find the guest cart and the user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(404).json({ message: 'Guest cart is empty' });
            }

            if (userCart) {
                // Merge guest cart products into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => 
                        item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color
                    );
                    if (productIndex > -1) {
                        // If product already exists in user cart, update quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }
                    else {
                        // If product does not exist, add it to user cart
                        userCart.products.push(guestItem);
                    }
                })

                // Recalculate total price
                userCart.totalPrice = userCart.products.reduce((total, item) => total + (item.price * item.quantity), 0);
                await userCart.save();

                // Delete the guest cart
                try {
                    await Cart.findOneAndDelete({ guestId });
                } catch (error) {
                    console.error('Error deleting guest cart:', error);
                }

                return res.status(200).json(userCart);
            }
            else {
                // If user cart does not exist, assign guest cart to user
                guestCart.user = req.user._id;
                guestCart.guestId = undefined; // Clear guestId
                await guestCart.save();
                return res.status(200).json(guestCart);
            }
        }
        else {
            if (userCart) {
                // Guest cart has been already merged or does not exist, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: 'Guest cart not found' });
        }
    } catch (error) {
        console.error('Error merging carts:', error);
        return res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;