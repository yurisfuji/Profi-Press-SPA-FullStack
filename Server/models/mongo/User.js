import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    userRoles: [{type: mongoose.Schema.Types.ObjectId, ref: "UserRole"}],
}, 
{
    timestamps: true,
});

export default mongoose.model("User", UserSchema);