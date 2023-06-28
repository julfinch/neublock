import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Asset = mongoose.model("Asset", AssetSchema);
export default Asset;