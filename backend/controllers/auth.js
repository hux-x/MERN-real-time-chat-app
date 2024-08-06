import user from '../models/user.js'
import bcryptjs from 'bcryptjs'
import {createTokenAndCookie} from '../utils/generateToken.js'
export const handleSignup = async (req,res)=>{
  try {
    const {fullName,username,password,confirmPassword,gender,profilePicURL} = req.body
    if(password!==confirmPassword){
        return res.status(400).json({error:'passwords do not match'})
    }
    const findUser = await user.findOne({username})
    if(findUser){
        return res.status(400).json({error:'user already exists'})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)
    const newUser = await user.create({fullName,username,password:hashedPassword,gender,profilePicURL,salt})
   createTokenAndCookie(newUser._id,res)
   return res.status(201).json({_id:newUser._id,username:newUser.username,fullName:newUser.fullName,salt:newUser.salt})
  } catch (error) {
    res.send(error)
    
  }
    
}

export const handleLogin = async (req,res)=>{
    
    const {username,password} = req.body
    const findUser = await user.findOne({username})
    if(!findUser){
        return res.status(404).json({error:'user does not exist'})
    }
    const checkPassword = await bcryptjs.compare(password,findUser.password)
    if(!checkPassword){
        return res.status(400).json({error:'user already exists'})
    }
    await createTokenAndCookie(findUser._id,res)
    res.status(200).send({fullName:findUser.fullName,_id:findUser._id,username,profilePicURL: findUser.profilePicURL})
    
}

export const handleLogout = async (req,res)=>{
    res.clearCookie('uid').json({message:'you have been logged out'})
}