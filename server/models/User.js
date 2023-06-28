import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 2,
    },
    picturePath: {
        type: String,
        default: "",
    },
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watchlist',
    }],
    liked: Array,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
    }],
},
{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;