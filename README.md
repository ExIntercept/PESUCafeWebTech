# PESU-Cafe Web Application  

PESU-Cafe is a food ordering web application designed to streamline ordering from the PES College cafeteria. The app features a React-based frontend and an Express.js + MongoDB backend to handle orders efficiently.  

---

## **Features**  

### **Frontend Functionality**
- **Menu Display**: View menu items categorized with images, names, and prices.  
- **Add/Remove Items**: Increment or decrement item quantities with a clean UI.  
- **Cart Management**: Review all selected items in the cart with real-time updates.  
- **Place Order**: Submit the cart data to the backend for processing.  
- **Responsive UI**: Accessible on desktops, tablets, and mobile devices.

### **Backend Functionality**
- **Menu API**: Fetch a list of available menu items (`GET /api/menu`).  
- **Cart API**: 
  - Save cart data to MongoDB (`POST /api/cart`).  
  - Retrieve current cart data from MongoDB (`GET /api/cart`).  
- **MongoDB Atlas Integration**: Stores cart data persistently.  

---

## **Technologies Used**  
- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via MongoDB Atlas)  
- **Styling**: CSS  

---

## **Setup Instructions**  

### **Prerequisites**
Ensure you have the following installed:  
1. Node.js and npm  
2. MongoDB Atlas connection string  

---

### **Clone the Repository**
```bash
git clone https://github.com/your-username/pesu-cafe.git
cd pesu-cafe
```

### **Run the server
```terminal
npm start
cd pesuCafe-backend
nodemon server.js
```
