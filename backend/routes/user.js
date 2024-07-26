import express from 'express'
const userRouter = new express.Router()
import {handleGetUsers} from '../controllers/user.js'
userRouter.get('/',handleGetUsers)

export default userRouter