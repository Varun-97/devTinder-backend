import express from 'express'
import { userAuth } from '../middlewares/auth.js'
import ConnectionRequest from '../models/connectionRequest.js'
import User from '../models/user.js'

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const toUser = await User.findById(toUserId)
        if (!toUser) {
            throw new Error("Invalid user id")
        }

        const allowedStatus = ['ignored', 'interested']
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status type !!!!: " + status)
        }

        //If connection request already exist
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingConnectionRequest) {
            throw new Error("Connection already exist")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save()
        res.json({ message: "Connection request sended successfully", data })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const { requestId, status } = req.params
        const loggedInUser = req.user
        const acceptedStatus = ['accepted', 'rejected']
        const isAllowedStatus = acceptedStatus.includes(status)
        if (!isAllowedStatus) {
            throw new Error("Invalid status type !!!!: " + status)
        }
        const connectionRequest = await ConnectionRequest.findOne({ _id: requestId, toUserId: loggedInUser._id, status: 'interested' })
        if (!connectionRequest) {
            throw new Error("Connection request not found !!!!")
        }
        connectionRequest.status = status
        const data = await connectionRequest.save()
        res.json({ message: "Request reviewed successfully" + status + data })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default requestRouter