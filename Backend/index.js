import dotenv from 'dotenv';
import  express  from "express";
import cors from 'cors';
import {connectDB} from './config/DB.js'
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();

const app=express();

connectDB()

app.use(express.json())
app.use(cors())


// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.get("/",(req,res)=>{
    res.json("helo from food app")
})



app.listen(process.env.port,()=>{
    console.log(`server running on port ${process.env.port}`);
    
})
