import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "enter name"]
    },
    email: {
        type: String,
        required: [true, "enter email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "enter username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "enter password"]
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;