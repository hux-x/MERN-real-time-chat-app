import express from 'express'
import { connectToMongoDB } from './db/connectToMongoDB.js'
import { config } from 'dotenv'
import messageRouter from './routes/messages.js'
import cookieParser from 'cookie-parser'
import protectRoute from './middleware/protectroute.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
const app = express()
config()
const PORT = process.env.PORT



app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',protectRoute,authRouter)
app.use('/api/messages',protectRoute,messageRouter)
app.use('/api/users',protectRoute,userRouter)


app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`server listening on port : ${PORT}`)
})