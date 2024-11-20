import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/MenuPage.css';

function MenuPage() {
    const navigate = useNavigate();
    const { cartItems, updateCartItem } = useCart();

    const initialQuantities = {
        pasta: 0,
        pizza: 0,
        sushi: 0,
        burger: 0,
        salad: 0,
        noodles: 0,
        steak: 0,
        icecream: 0,
        ...cartItems, // Load existing quantities from cartItems
    };

    const [quantities, setQuantities] = useState(initialQuantities);
    const [showCounter, setShowCounter] = useState(
        Object.keys(initialQuantities).reduce((acc, item) => ({
            ...acc,
            [item]: initialQuantities[item] > 0,
        }), {})
    );

    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(false); // Add error state

    // Fetch menu data from the backend
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/menu')
            .then(response => response.json())
            .then(data => {
                setMenuItems(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
                setError(true);
                setLoading(false);
            });
    }, []);

    // Batch cart updates with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            sendCartData(quantities);
        }, 500); // Debounce interval

        return () => clearTimeout(timer); // Cleanup previous timeout
    }, [quantities]);

    // Function to send updated cart data to the backend
    const sendCartData = (updatedCart) => {
        fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCart),
        })
            .then(response => response.json())
            .then(data => console.log('Cart updated:', data))
            .catch(error => console.error('Error updating cart:', error));
    };

    const handleQuantityChange = (item, change) => {
        setQuantities((prevQuantities) => {
            const newQuantities = {
                ...prevQuantities,
                [item]: Math.max(0, prevQuantities[item] + change),
            };
            setShowCounter((prevShowCounter) => ({
                ...prevShowCounter,
                [item]: newQuantities[item] > 0,
            }));
            updateCartItem(item, newQuantities[item]); // Update CartContext
            return newQuantities;
        });
    };

    const handleImageClick = (item) => {
        setShowCounter((prevShowCounter) => ({ ...prevShowCounter, [item]: true }));
        handleQuantityChange(item, 1);
    };

    if (loading) {
        return <div className="loader">Loading menu...</div>;
    }

    if (error) {
        return <div className="error">Failed to load menu. Please try again later.</div>;
    }

    return (
        <div>
            {/* Main Image Section with Overlay */}
            <section className="main-image">
                <div className="header-content">
                    <h1>PESU-Cafe</h1>
                    <div className="order-now">
                        <button onClick={() => navigate('/cart')}>Order Now</button>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section className="menu">
                <h2>Menu</h2>
                <div className="category-list">
                    {menuItems.map((item, index) => (
                        <div className="category-item" key={index}>
                            <div
                                className="category-img"
                                style={{ backgroundImage: `url(${item.imageUrl})` }}
                                onClick={() => handleImageClick(item.name)}
                            >
                                {!showCounter[item.name] && <span className="add-button">+</span>}
                            </div>
                            <p>{item.name}</p>
                            {showCounter[item.name] && (
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(item.name, -1)}>-</button>
                                    <span>{quantities[item.name]}</span>
                                    <button onClick={() => handleQuantityChange(item.name, 1)}>+</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default MenuPage;
