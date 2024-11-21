// src/components/Cart.js
import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css'; // Import the CSS file for styling

function Cart() {
    const { cartItems, clearCart } = useCart();

    const handleCheckout = () => {
        // Send cart data to the backend
        fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Cart successfully sent to server:', data);
                alert('Order placed successfully!');
                clearCart(); // Clear the cart after successful checkout
            })
            .catch(error => {
                console.error('Error sending cart to server:', error);
                alert('Failed to place the order. Please try again.');
            });
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {Object.keys(cartItems).length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <>
                    <ul className="cart-items-list">
                        {Object.entries(cartItems).map(([item, quantity]) => (
                            <li className="cart-item" key={item}>
                                <img
                                    src={`/images/${item}.jpg`} // Assuming images are named after the items
                                    alt={item}
                                    className="item-image"
                                />
                                <div className="item-info">
                                    <span className="item-name">
                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                    </span>
                                    <span className="item-quantity">Quantity: {quantity}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-actions">
                        <button
                            className="checkout-button"
                            onClick={handleCheckout}
                            disabled={Object.keys(cartItems).length === 0}
                        >
                            Proceed to Checkout
                        </button>
                        <button className="clear-cart" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
