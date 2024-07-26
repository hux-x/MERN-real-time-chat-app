import express from "express"
import {handleGetMessages, handleSendMessage} from '../controllers/messages.js'
const messageRouter = express.Router()

messageRouter.get('/:id',handleGetMessages)
messageRouter.post('/send/:id',handleSendMessage)
export default messageRouter