import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw new Error("No token provided !!!!")
        }
        const token = authHeader?.split(' ')[1]
        if (!token || token === null || token === undefined) {
            throw new Error("Invalid token !!!!")
        }
        const decodedObj = jwt.verify(token, 'varun-secret-key')
        const { _id } = decodedObj
        const user = await User.findById(_id)
        if (!user) {
            throw new Error('User not found')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send(error.message)
    }

}

export { userAuth }