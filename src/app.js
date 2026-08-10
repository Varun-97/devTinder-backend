import express from 'express'
import connnectDB from './config/database.js'
import cookieParser from 'cookie-parser'
import authRouter from './router/auth.js'
import profileRouter from './router/profile.js'
import requestRouter from './router/request.js'
import userRouter from './router/user.js'

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)
app.use('/', userRouter)

connnectDB().then(() => {
    app.listen(3000, () => {
        console.log("server started successfully")
    })
}).catch((err) => {
    console.log("DB connection failed:", err)
})

