import mongoose, { Schema } from "mongoose";

const organizationSchema = new mongoose.Schema({
    logo: String,
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    about: String,
    isAdmin: [{
        id: Schema.Types.ObjectId,
        name: String
    }]
}, { timestamps: true })

const Organization = mongoose.models.organizations || mongoose.model("organizations", organizationSchema);

export default Organization;