import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        trim: true,
        maxLength: 100,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        Enum: ["pending", "in-progress", "completed"],
        default: true,
    },
});

export default mongoose.model("Task", schema);
