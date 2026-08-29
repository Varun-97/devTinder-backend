import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData, validatePasswordStrong } from "../utils/validation.js";
import bcrypt from 'bcrypt'

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user.toObject()
        const { password, ...resUser } = user
        if (user) {
            res.json({ user: resUser })
        }
        else {
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400).send("Something went wrong: " + error.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error('Invalid data !!!!')
        }
        const user = req.user
        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key]
        })
        await user.save()
        res.json({ message: `${user.firstName} profile updated successfully`, user })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const user = req.user
        const { oldPassword, newPassword } = req.body
        console.log("first", user, oldPassword, newPassword)
        if (!user) {
            throw new Error("User not found")
        }
        const isValidPassword = await user.validatePassword(oldPassword)
        console.log("isValidPassword", isValidPassword)
        const isStrongPassword = validatePasswordStrong(newPassword)
        console.log("isStrongPassword", isStrongPassword)
        if (!isValidPassword || !isStrongPassword) {
            throw new Error("Invalid password")
        }

        const passwordHash = await bcrypt.hash(newPassword, 10)
        console.log("passwordHash", passwordHash)
        user.password = passwordHash
        await user.save()
        res.json({ message: "Password updated successfully" })
    } catch (error) {
        res.status(400).send(error.message)
    }
})


export default profileRouter