import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
    },
    roleAvatarUrl: String,
}, 
{
    timestamps: true,
});

export default mongoose.model("UserRole", UserRoleSchema);