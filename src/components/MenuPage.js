// src/components/MenuPage.js
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
            [item]: initialQuantities[item] > 0, // Show counter if quantity > 0
        }), {})
    );

    const handleQuantityChange = (item, change) => {
        setQuantities((prevQuantities) => {
            const newQuantity = Math.max(0, prevQuantities[item] + change);
            if (newQuantity === 0) {
                setShowCounter((prevShowCounter) => ({ ...prevShowCounter, [item]: false }));
            } else {
                setShowCounter((prevShowCounter) => ({ ...prevShowCounter, [item]: true }));
            }
            updateCartItem(item, newQuantity); // Update CartContext
            return { ...prevQuantities, [item]: newQuantity };
        });
    };

    const handleImageClick = (item) => {
        setShowCounter((prevShowCounter) => ({ ...prevShowCounter, [item]: true }));
        handleQuantityChange(item, 1);
    };

    const menuItems = Object.keys(initialQuantities);

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
                                style={{ backgroundImage: `url(${require(`../images/${item}.jpg`)})` }}
                                onClick={() => handleImageClick(item)}
                            >
                                {!showCounter[item] && <span className="add-button">+</span>}
                            </div>
                            <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                            {showCounter[item] && (
                                <div className="quantity-controls">
                                    <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                                    <span>{quantities[item]}</span>
                                    <button onClick={() => handleQuantityChange(item, 1)}>+</button>
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
