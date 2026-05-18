import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(join(__dirname, ".env"));
} catch {
  import("dotenv").then((dotenv) => dotenv.config({ path: join(__dirname, ".env") }));
}

import  express  from "express";
import cors from 'cors';
import {connectDB} from './config/DB.js'
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import couponRouter from "./routes/couponRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import addressRouter from "./routes/addressRouter.js";
import favoriteRouter from "./routes/favoriteRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";

const app=express();

connectDB()

app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://food-app-jtkt.vercel.app',
  ],
  credentials: true,
}))


// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/coupon',couponRouter)
app.use('/api/category',categoryRouter)
app.use('/api/address',addressRouter)
app.use('/api/favorite',favoriteRouter)
app.use('/api/review',reviewRouter)
app.use('/api/dashboard',dashboardRouter)
app.get("/",(req,res)=>{
    res.json("helo from food app")
})



app.listen(process.env.port,()=>{
    console.log(`server running on port ${process.env.port}`);
    
})
