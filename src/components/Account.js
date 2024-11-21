import React, { useState } from 'react';
import '../styles/Account.css';

function Account() {
  const [orderHistory, setOrderHistory] = useState([
    {
      orderDate: '2024-11-01',
      totalPrice: 25.99,
      items: [
        { name: 'Pasta', quantity: 2, price: 10.99 },
        { name: 'Salad', quantity: 1, price: 6.99 },
      ],
    },
    {
      orderDate: '2024-11-05',
      totalPrice: 18.99,
      items: [
        { name: 'Pizza', quantity: 1, price: 12.99 },
        { name: 'Ice Cream', quantity: 1, price: 4.99 },
      ],
    },
  ]);
  
  const userId = 'your-user-id'; // Dummy user ID

  return (
    <div className="account-container">
      <div className="account-header">
        <h2>Your Account</h2>
      </div>
      
      <div className="account-content">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-picture">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="profile-details">
            <h3>John Doe</h3>
            <p>Email: johndoe@example.com</p>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>
        
        {/* Account Settings Section */}
        <div className="settings-section">
          <h3>Account Settings</h3>
          <ul>
            <li>
              <span>Change Password</span>
              <button className="action-btn">Change</button>
            </li>
            <li>
              <span>Notification Preferences</span>
              <button className="action-btn">Edit</button>
            </li>
            <li>
              <span>Delete Account</span>
              <button className="danger-btn">Delete</button>
            </li>
          </ul>
        </div>
        
        {/* Order History Section */}
        <div className="order-history-section">
          <h3>Order History</h3>
          {orderHistory.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
            <ul>
              {orderHistory.map((order, index) => (
                <li key={index} className="order-item">
                  <div>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
