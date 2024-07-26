import user from "../models/user.js";
import Conversation from "../models/conversation.js";
import Message from '../models/message.js'
const handleGetMessages = async(req,res)=>{
 try {
  const {id:senderId} = req.params
  const userId = req.user._id
  const messages = await Conversation.findOne({
    participants:{$all:[userId,senderId]}
  }).populate('messages')
  if(!conversation) return res.json({error: "no conversation found"})
  res.json(messages)
 } catch (error) {
  console.log(error)
  
 }
}
const handleSendMessage = async(req,res)=>{
   try {
    const receiverId = req.params.id
    const senderId = req.user._id
    const {message} = req.body
    let conversation = await Conversation.findOne({
      participants:{$all:[receiverId,senderId]}
    })
    if(!conversation){
       conversation = await Conversation.create({
         participants:[receiverId,senderId]  
       })
    }
    const newMessage = new Message({receiverId,senderId,message})
  
    conversation.messages.push(newMessage)
 
    await conversation.save() 
    await newMessage.save() 
    return res.status(201).json(newMessage)

   } catch (error) {
    console.log(error)
    res.json({error:'Internal server error'})
   }
}
export {handleSendMessage,handleGetMessages}
