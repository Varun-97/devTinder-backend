import express from 'express'
import { userAuth } from '../middlewares/auth.js'
import ConnectionRequest from '../models/connectionRequest.js'
import User from '../models/user.js'

const userRouter = express.Router()
const USER_SAFE_DATA = "firstName lastName email photoUrl age gender about skill"

//Get all pending requests
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate("fromUserId", USER_SAFE_DATA)
        res.json({ message: "data found successfully", data: connectionRequest })
    } catch (error) {
        res.status(400).send(error.message)
    }

})

//Get all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId._id, status: 'accepted' },
                { toUserId: loggedInUserId._id, status: 'accepted' }
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)
        const data = connections.map(connection => {
            if (connection.fromUserId._id.toString() == loggedInUserId._id.toString()) {
                return connection.toUserId
            }
            else {
                return connection.fromUserId
            }

        })
        res.json({ message: "connections found successfully", data })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Feed Api
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit = limit > 20 ? 20 : limit
        const skip = (page - 1) * limit
        const allConnections = await ConnectionRequest.find({
            $or: [{
                fromUserId: loggedInUser._id
            }, {
                toUserId: loggedInUser._id
            }]
        }).select({ "fromUserId": 1, "toUserId": 1, "_id": 1 })
        const hideUsersFromFeed = new Set()
        allConnections.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        const users = await User.find({
            _id: { $nin: [...hideUsersFromFeed] }
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.json({ message: "All users found successfully", data: users })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export default userRouter