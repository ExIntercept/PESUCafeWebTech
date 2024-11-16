// src/components/Cart.js
import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css'; // Import the CSS file for styling

function Cart() {
    const { cartItems } = useCart();

    return (
      
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {Object.keys(cartItems).length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <ul className="cart-items-list">
                    {Object.entries(cartItems).map(([item, quantity]) => (
                        <li className="cart-item" key={item}>
                            <span className="item-name">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </span>
                            <span className="item-quantity">Quantity: {quantity}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Cart;
