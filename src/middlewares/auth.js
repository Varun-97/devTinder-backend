import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const userAuth = async (req, res, next) => {
    console.log("first", req.headers)
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw new Error("No token provided !!!!")
        }
        console.log("authHeader", authHeader)
        const token = authHeader?.split(' ')[1]
        console.log("token", token)
        if (!token || token === null || token === undefined) {
            throw new Error("Invalid token !!!!")
        }
        const decodedObj = jwt.verify(token, 'varun-secret-key')
        console.log("decodedObj==>>", decodedObj)
        const { _id } = decodedObj
        const user = await User.findById(_id)
        if (!user) {
            throw new Error('User not found')
        }
        req.user = user
        next()
    } catch (error) {
        console.log("error==>>", error.message)
        res.status(401).send(error.message)
    }

}

export { userAuth }