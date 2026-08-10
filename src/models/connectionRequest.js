import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    status: {
        type: String,
        required: true,
        enum: { values: ['ignored', 'interested', 'accepted', 'rejected'], message: "{VALUE} is incorrect status type" }
    },
}, {
    timestamps: true
})

connectionRequest.index({ fromUserId: 1, toUserId: 1 })

connectionRequest.pre("save", function () {
    const { fromUserId, toUserId } = this
    if (fromUserId.toString() === toUserId.toString()) {
        throw new Error("You cannot send request to yourself")
    }
})

const ConnectionRequest = mongoose.model('ConnectRequest', connectionRequest)

export default ConnectionRequest