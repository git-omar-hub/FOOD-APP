# 🍽️ Your-Dish

> Full Stack MERN Food Ordering Platform with Online Payments & Admin
> Dashboard

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Stripe](https://img.shields.io/badge/Payments-Stripe-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

------------------------------------------------------------------------

## 🚀 Overview

**Your-Dish** is a full-stack food ordering platform built using the
MERN stack.\
It allows users to browse meals, add them to a cart, place orders, and
complete secure payments via Stripe.

The system consists of: - Customer Frontend - Admin Dashboard - RESTful
Backend API - Cloud-based image storage - Secure authentication system

------------------------------------------------------------------------

## 🏗️ System Architecture

    Your-Dish
    │
    ├── Backend (Node.js + Express)
    ├── Frontend (React)
    └── Admin Panel (React + Vite)

------------------------------------------------------------------------

## 🛠️ Tech Stack

### 🔹 Frontend

-   React
-   Context API
-   Axios
-   React Router
-   CSS

### 🔹 Admin Panel

-   React (Vite)
-   Product Management
-   Order Monitoring
-   Role-Based Access

### 🔹 Backend

-   Node.js
-   Express.js
-   JWT Authentication
-   Middleware Authorization
-   Stripe Payment Integration
-   Cloudinary Image Hosting
-   RESTful API Architecture

### 🔹 Database

-   MongoDB
-   Mongoose ODM

### 🔹 Deployment

-   Fully deployed on Vercel
-   MongoDB Atlas
-   Cloudinary for image hosting

------------------------------------------------------------------------

## 🔐 Authentication & Security

-   JWT-based authentication
-   Protected routes using middleware
-   Role-based admin authorization
-   Order verification after payment

------------------------------------------------------------------------

## 💳 Payment System

-   Stripe Checkout Session
-   Secure payment confirmation
-   Order status validation after successful transaction

------------------------------------------------------------------------

## 📦 Features

### 👤 User Features

-   User Registration & Login
-   Browse food items
-   Add to Cart
-   Place Orders
-   Secure Stripe Payment
-   View Order History
-   Payment Verification System

### 🛠️ Admin Features

-   Add new food items
-   Upload product images via Cloudinary
-   View and manage all orders
-   Manage food list
-   Track user purchases

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create a `.env` file inside the Backend folder and add:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    STRIPE_SECRET_KEY=your_stripe_secret
    CLOUDINARY_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_SECRET_KEY=your_secret_key

------------------------------------------------------------------------

## ▶️ Installation & Setup

### 1️⃣ Clone Repository

``` bash
git clone https://github.com/your-username/your-dish.git
cd your-dish
```

### 2️⃣ Backend Setup

``` bash
cd Backend
npm install
npm start
```

### 3️⃣ Frontend Setup

``` bash
cd Frontend
npm install
npm start
```

### 4️⃣ Admin Panel Setup

``` bash
cd Admin
npm install
npm run dev
```

------------------------------------------------------------------------

## 🌍 Live Demo

🔗 Add your Vercel deployment link here

------------------------------------------------------------------------

## 👨‍💻 Author

Developed by **Bahgat**\
Computer Science & Engineering Student

------------------------------------------------------------------------

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
