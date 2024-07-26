import jwt from "jsonwebtoken";
export const createTokenAndCookie = async(id,res)=>{
    const token = jwt.sign({id},process.env.JWT_KEY,{expiresIn:'7d'})
    res.cookie('uid',token,{
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict"
    })
}
export const validateToken = async(user)=>{
    return jwt.verify(user)
}