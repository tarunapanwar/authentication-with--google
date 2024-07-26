import mongoose, { Schema } from "mongoose";

const isAdminSchema = new Schema(
    {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true }
    }, 
    { _id: false, id: false }
);

const workspaceSchema = new mongoose.Schema(
    {
        name: String,
        logo: String,
        projectName: String,
        isAdmin: [isAdminSchema]
    }, 
    { timestamps: true }
)

const Organization = mongoose.models.workspace || mongoose.model("workspace", workspaceSchema);

export default Organization;