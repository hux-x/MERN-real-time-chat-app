import user from "../models/user.js"

const handleGetUsers = async(req,res)=>{
try {
    const userId = req.user._id
    const users = await user.find({_id:{$ne:userId}}).select('-password')
    if(!users) return res.status(404).json({error:'no users found'})
    res.status(200).json(users)
} catch (error) {
    console.log(error)
    res.status(404).json({error:'Internal server error'})
    
}
}
export {handleGetUsers}
