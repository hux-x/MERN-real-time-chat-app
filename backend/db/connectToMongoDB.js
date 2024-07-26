import mongoose from "mongoose";
export const connectToMongoDB = async()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Chat-App').then(()=>console.log('connected to DB'))
        
    } catch (error) {
        console.log('error connecting to db ', error)
    }
}