import express from "express";
import { userAuth } from "../middlewares/auth.js";

const profileRouter = express.Router()

profileRouter.get("/profile", userAuth, async (req, res) => {
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


export default profileRouter