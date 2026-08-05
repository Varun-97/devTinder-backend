import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid: " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error("gender is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: "It is default about section..."
    },
    skill: {
        type: [String],
    }
}, {
    timestamps: true
})

userSchema.methods.getJWT = async function () {
    const user = this
    return jwt.sign({ _id: user._id }, 'varun-secret-key', { expiresIn: '1d' });
}

userSchema.methods.validatePassword = async function (password) {
    const user = this
    const isValidPassword = await bcrypt.compare(password, user.password)
    return isValidPassword
}

const User = mongoose.model('User', userSchema)

export default User