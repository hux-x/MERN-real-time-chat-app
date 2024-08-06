import express from 'express'
import { connectToMongoDB } from './db/connectToMongoDB.js'
import { config } from 'dotenv'
import messageRouter from './routes/messages.js'
import cookieParser from 'cookie-parser'
import protectRoute from './middleware/protectroute.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import {app,server,io} from './socket/socket.js'
import cors from 'cors'
config()
const PORT = process.env.PORT



app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/messages',protectRoute,messageRouter)
app.use('/api/users',protectRoute,userRouter)
app.use(cors({
	origin: 'http://localhost:5173/',  // Allow requests from your Vite development server
	methods: ['GET', 'POST'],
	credentials: true
  }));

server.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`server listening on port : ${PORT}`)
})