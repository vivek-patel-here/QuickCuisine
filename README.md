# 🍔 Quick Cuisine – Fullstack Food Delivery Application

**Quick Cuisine** is a full-featured food delivery platform built with the **MERN stack** (MongoDB, Express, React, Node.js), offering a seamless experience for customers and admins. It includes real-time menu browsing, order placement, admin-based order management, secure authentication, and media handling.
<br>
- Client panel [https://quickcuisineclient.onrender.com/]
- Admin Panel [https://quickcuisineadmin.onrender.com/]
---

## 🚀 Features

### 👥 User Panel
- Browse restaurants and food items
- Add items to cart and place orders
- View order history
- Secure login/signup with JWT & Bcrypt

### 🛠️ Admin Panel
- Manage products and orders
- Add/update/delete food listings
- View all customer orders in real-time

### 🔐 Authentication
- JWT-based login/signup system
- Passwords hashed with Bcrypt
- Cookies for session handling

### ☁️ Media Upload
- Upload food item images via **Multer**
- Store and serve images using **Cloudinary**

### 💳 Payment Gateway
- Integrated with **Cashfree** for seamless online payments

---

## Tech Stack

- **Frontend**: React, Axios, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, Bcrypt
- **File Uploads**: Multer + Cloudinary
- **Payment Gateway**: Cashfree

---

## ⚙️ Environment Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/quick-cuisine.git
cd quick-cuisine
2. Install Dependencies

# Backend
cd server
npm install

# Admin Panel
cd ../admin
npm install

# Client Panel
cd ../client
npm install

🧪 Run Locally

# Start backend
cd server
node app.js

# Start client
cd ../client
npm run dev

# Start admin panel
cd ../admin
npm run dev

📦 .env Configuration
JWTSECRET="your_jwt_secrete"
DB_URL="Your_DB_URL"
CASHFREE_API_ID=cashFree_api_key
CASHFREE_SECRET=cashFree_Secret
CLOUD_NAME=cloud_name
CLOUD_KEY=cloud_key
API_SECRET=api_secret
