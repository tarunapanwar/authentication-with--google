import mongoose, { Schema } from "mongoose";

const isAdminSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
}, { _id: false, id: false });

const organizationSchema = new mongoose.Schema({
    teamName: String,
    logo: String,
    projectName: String,
    isAdmin: [isAdminSchema]
}, { timestamps: true })

const Organization = mongoose.models.organizations || mongoose.model("organizations", organizationSchema);

export default Organization;