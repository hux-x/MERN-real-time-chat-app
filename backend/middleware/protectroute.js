import jwt from 'jsonwebtoken'
import user from '../models/user.js'
const protectRoute = async(req,res,next)=>{

   try {
    const token = jwt.verify(req.cookies['uid'],process.env.JWT_KEY)
    console.log(token.id)
     if(!token) return res.status(404).send('no token found')
     const requestedUser = await user.findById(token.id).select("-password")
     req.user = requestedUser
   } catch (error) {
    return res.status(401).json({error:"You are not authorized to perform this action"})
   }
    
     next()
}
export default protectRoute