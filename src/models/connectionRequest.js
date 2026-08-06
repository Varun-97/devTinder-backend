import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true

    },
    status: {
        type: String,
        required: true,
        enum: { values: ['ignored', 'intrested', 'accepted', 'rejected'], message: "{VALUE} is incorrect status type" }
    },
}, {
    timestamps: true
})

const ConnectRequest = mongoose.model('ConnectRequest', connectionRequest)

export default ConnectRequest