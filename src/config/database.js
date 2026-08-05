import mongoose from "mongoose"

const connnectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://singhvarun7352:3rJaKvNMhiKAMbR1@cluster0.xqtcqye.mongodb.net/devTinder")
        console.log("Db connected successfully")
    } catch (error) {
        console.log("Error while connecting DB", error)
    }
}

export default connnectDB