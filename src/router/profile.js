import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateEditProfileData } from "../utils/validation.js";

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user
        if (user) {
            res.send(user)
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
        res.json({ message: `${user.firstName} profile updated successfully` })
    } catch (error) {
        res.status(400).send(error.message)
    }
})


export default profileRouter