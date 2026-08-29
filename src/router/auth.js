import express from 'express'
import { validateSignupData } from '../utils/validation.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        //apply body validation
        validateSignupData(req)
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)
        //Create the instenceof the user model
        const user = new User({
            firstName, lastName, email, password: passwordHash
        })
        await user.save()
        res.send('User created successfully')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!validator.isEmail(email)) {
            throw new Error('Please enter valid email id')
        }
        //check email is exist
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Invalid credentials')
        }
        const isValidPassword = await user.validatePassword(password)
        if (!isValidPassword) {
            throw new Error('Invalid credentials')
        }
        //create JWT token
        const token = await user.getJWT()

        //Send token user/client and set token to cookie
        res.cookie('token', token)
        res.json({
            message: 'Login successful',
            token
        })

    } catch (error) {
        res.status(400).send(error.message)
    }
})

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now())
        }).send("Logout successfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export default authRouter