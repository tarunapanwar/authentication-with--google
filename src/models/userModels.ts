import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: String,
    displayName: String,
    fullname: String,
    email: {
        type: String,
        required: [true, "enter email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: [true, "enter username"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: String,
    // password: {
    //     type: String,
    //     required: [true, "enter password"]
    // },
    authId: {
        type: String,
        unique: true,
        sparse: true
    },
    provider: {
        type: String,
        enum: ["local", "google", "workspace"],
        default: "local"
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    pic: String,
    number: Number,
    about: String,
}, { timestamps: true })

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;