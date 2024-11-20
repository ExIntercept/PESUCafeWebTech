const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://aryansrivastava1004:PesuCafe123@pesucafe.epqd8.mongodb.net/pesuCafe',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define Mongoose schema for cart items
const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    userId: { type: String }, // Optional: To track user-specific carts
}, { timestamps: true });

// Create a Mongoose model
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Mock menu data (replace with database later)
const menuItems = [
    { name: 'pasta', price: 10.99, imageUrl: '/images/pasta.jpg' },
    { name: 'pizza', price: 12.99, imageUrl: '/images/pizza.jpg' },
    { name: 'sushi', price: 15.99, imageUrl: '/images/sushi.jpg' },
    { name: 'burger', price: 8.99, imageUrl: '/images/burger.jpg' },
    { name: 'salad', price: 6.99, imageUrl: '/images/salad.jpg' },
    { name: 'noodles', price: 9.99, imageUrl: '/images/noodles.jpg' },
    { name: 'steak', price: 16.99, imageUrl: '/images/steak.jpg' },
    { name: 'icecream', price: 4.99, imageUrl: '/images/icecream.jpg' }
];

// Routes
app.get('/api/menu', (req, res) => {
    console.log('Menu items requested');
    res.json(menuItems);
});

// Save cart items to MongoDB
app.post('/api/cart', async (req, res) => {
    const updatedCart = req.body;

    // Clear the previous cart (if needed) and save the new cart
    try {
        // Clear previous cart (Optional: Add filters if user-specific carts are implemented)
        await CartItem.deleteMany();

        const cartData = Object.entries(updatedCart).map(([name, quantity]) => {
            const menuItem = menuItems.find(item => item.name === name);
            return {
                name,
                quantity,
                price: menuItem.price,
                imageUrl: menuItem.imageUrl,
            };
        });

        // Save new cart items
        await CartItem.insertMany(cartData);
        console.log('Cart items saved to database:', cartData);

        res.json({ message: 'Cart updated successfully', cart: updatedCart });
    } catch (error) {
        console.error('Error saving cart to database:', error);
        res.status(500).json({ message: 'Failed to update cart', error });
    }
});

// Get cart items from MongoDB
app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        const cart = cartItems.reduce((acc, item) => {
            acc[item.name] = item.quantity;
            return acc;
        }, {});

        console.log('Current cart retrieved from database:', cart);
        res.json(cart);
    } catch (error) {
        console.error('Error retrieving cart from database:', error);
        res.status(500).json({ message: 'Failed to retrieve cart', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🍽️ PESU-Cafe Backend Server Running on port ${PORT}`);
    console.log('Ready to take your delicious orders! 🍔🍕');
});
