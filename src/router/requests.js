import express from 'express'
import { userAuth } from '../middlewares/auth.js'

const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    res.send("connection request send")
})

export default requestRouter