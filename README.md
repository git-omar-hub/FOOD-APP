# 🍽️ Your-Dish

> Full Stack MERN Food Ordering Platform with Online Payments & Admin
> Dashboard

![MERN](https://img.shields.io/badge/Stack-MERN-green)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://your-dish.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-v18-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-black?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v18-blue?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-blueviolet?logo=stripe)](https://stripe.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white)](https://git-scm.com/)
[![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)](https://www.postman.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

    Backend
    ├── .env
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── vercel.json
    ├── config
    │   ├── cloudinary.js
    │   └── DB.js
    ├── controllers
    │   ├── cartController.js
    │   ├── foodController.js
    │   ├── orderController.js
    │   └── userController.js
    ├── middlewares
    │   └── auth.js
    ├── models
    │   ├── foodModel.js
    │   ├── orderModel.js
    │   └── userModel.js
    ├── routes
    │   ├── cartRouter.js
    │   ├── foodRoute.js
    │   ├── orderRouter.js
    │   └── userRoute.js
    └── uploads

        Frontend
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── public
    │   ├── favicon.ico
    │   ├── header_img.png
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
        ├── assets
        │   ├── add_icon_green.png
        │   ├── add_icon_white.png
        │   └── ... (other assets)
        └── Components
            ├── AppDownLoad
            │   ├── AppDownLoad.css
            │   └── AppDownLoad.jsx
            ├── context
            │   └── StoreContext.jsx
            ├── ExploreMenu
            │   ├── exploreMenu.css
            │   └── ExploreMenu.jsx
            ├── foodDisplay
            │   ├── FoodDisplay.css
            │   └── FoodDisplay.jsx
            ├── FoodItem
            │   ├── FoodItem.css
            │   └── FoodItem.jsx
            ├── Footer
            │   ├── Footer.css
            │   └── Footer.jsx
            ├── Header
            │   ├── Header.css
            │   └── Header.jsx
            ├── loginPopup
            │   ├── LoginPopup.css
            │   └── LoginPopup.jsx
            ├── Navbar
            │   ├── Navbar.css
            │   └── Navbar.jsx
            └── pages
                ├── Cart
                │   ├── Cart.css
                │   └── Cart.jsx
                ├── home
                │   ├── Home.css
                │   └── home.jsx
                ├── myorders
                │   ├── MyOrders.css
                │   └── MyoRders.jsx
                ├── PlaceOrder
                │   ├── PlaceOrder.css
                │   └── PlaceOrder.jsx
                └── verify
                    ├── verify.css
                    └── verify.jsx
    Admin
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── vercel.json
    ├── vite.config.js
    ├── dist
    │   ├── index.html
    │   ├── vite.svg
    │   └── assets
    │       ├── app_store-C8O_cY6s.png
    │       ├── header_img-DfvEA7zQ.png
    │       └── index-blVvueo7.css
    ├── public
    │   └── vite.svg
    └── src
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── assets
        │   ├── add_icon.png
        │   ├── assets.js
        │   └── logo.png
        ├── components
        │   ├── Navbar
        │   │   ├── Navbar.css
        │   │   └── Navebar.jsx
        │   └── SideBar
        │       ├── SideBar.css
        │       └── SideBar.jsx
        └── pages
            ├── Add
            │   ├── Add.css
            │   └── Add.jsx
            ├── List
            │   ├── List.css
            │   └── List.jsx
            └── Orders
                ├── Order.css
                └── Order.jsx
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
## 🧪Development Tools

-   VS Code (IDE)
-   Postman (API testing)
-   Git for version control
-   Stripe Checkout Session

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
git clone https://github.com/git-omar-hub/FOOD-APP.git
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

🔗 https://food-app-jtkt.vercel.app

------------------------------------------------------------------------

## 👨‍💻 Author

Developed by **Omar Elbasty**\
Computer Science & Engineering Student

------------------------------------------------------------------------

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
