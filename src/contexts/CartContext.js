// src/contexts/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});

    const updateCartItem = (item, quantity) => {
        setCartItems((prevCartItems) => {
            if (quantity === 0) {
                const updatedCart = { ...prevCartItems };
                delete updatedCart[item];
                return updatedCart;
            }
            return { ...prevCartItems, [item]: quantity };
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
