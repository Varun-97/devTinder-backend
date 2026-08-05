import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
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
        res.status(400).send(error.message)
    }

}

export { userAuth }