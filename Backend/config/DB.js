import mongoose from 'mongoose'


export const connectDB=async()=>{

    await mongoose.connect(process.env.DB_URL).then((()=>     console.log("DB conected"))).catch(err => console.log(err))
    // await mongoose.connect("mongodb://localhost:27017/Food_App_Database").then((()=>     console.log("DB conected"))).catch(err => console.log(err))
}