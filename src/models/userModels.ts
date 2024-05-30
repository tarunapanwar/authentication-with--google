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
        type: String
    },
    authId: {
        type: String,
        unique: true
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
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

// Pre-save hook to handle password requirement based on authId
// userSchema.pre("save", function (next) {
//     console.log(this.password, this.authId);
//     if(!this.password && !this.authId)
//         next(new Error('Password is required if authId is not provided'));
//     else next();
// })

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;