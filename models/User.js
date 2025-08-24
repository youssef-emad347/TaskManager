import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        pattern: ".+@.+..+",
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    passwordResetToken: { type: String, select: false },
    passwordResetTokenExpireIn: { type: Date, select: false },
});

userSchema.pre("save", async function (next) {
    // console.log(this);
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default new mongoose.model("User", userSchema);
