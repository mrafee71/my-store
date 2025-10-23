const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

// function to seed the data
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create default admin user
        const createdUser = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'rafee77',
            role: 'admin',
        });

        // Assign default user id to products
        const userID = createdUser._id;

        const sampleProducts = products.map(product => {
            return { ...product, user: userID };
        });

        // Insert products into the database
        await Product.insertMany(sampleProducts);
        console.log('Data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

// Run the seed function
seedData();