import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false,
        enum:['male','female','non binary'],
        default:'non binary'
    },
    profilePicURL:{
        type:String,
        default:'https://i.pinimg.com/236x/9e/46/64/9e46646c332373ebc7826571fc0f82f9.jpg'
    },
    salt:{
        type:String,
        required:true
    }
},{timestamps:true})
const user = mongoose.model('user',userSchema)
export default user