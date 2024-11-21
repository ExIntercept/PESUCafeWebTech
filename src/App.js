import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import MenuPage from './components/MenuPage';
import Cart from './components/Cart';
import Account from './components/Account';
import About from './components/About';  // Import About component
import './App.css'; // Import App.css for the content padding
import { CartProvider } from './contexts/CartContext'; // Import CartProvider

function App() {
  return (
    <CartProvider> {/* Wrap with CartProvider for global cart state */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} /> {/* Added About route */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
