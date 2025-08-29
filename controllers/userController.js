import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import genResetToken from "../utils/resetToken.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import Task from "../models/Task.js";

const registerUser = catchAsync(async (req, res, next) => {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser)
        return next(new AppError(409, "email is already registered"));
    const user = new User({ ...req.body });
    if (!user) return next(new AppError(400, "undefined user"));
    await user.save();
    const token = signToken(user._id);
    res.status(201).json({
        status: "success",
        message: "user registered successfully",
        token: token,
    });
});

const loginUser = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select(
        "+password"
    );
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid)
        return next(new AppError(401, "your email or password is wrong"));
    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        message: "login successfully",
        token: token,
    });
});

const getProfile = catchAsync(async (req, res, next) => {
    const user = {
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
    };
    res.status(200).json({
        status: "success",
        message: "profile retrieved successfully",
        user: user,
    });
});

const updateProfile = catchAsync(async (req, res, next) => {
    const user = req.user;
    [user.name, user.email] = [
        req.body.name || user.name,
        req.body.email || user.email,
    ];
    await user.save();
    res.status(200).json({
        status: "success",
        message: "profile updated successfully",
        user: user,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    let user;
    let tasks;
    if (req.params.id && req.user.isAdmin === "admin") {
        user = await User.findByIdAndDelete(req.params.id);
        tasks = await Task.deleteMany({ userId: req.params.id });
    }
    user = await User.findByIdAndDelete(req.user._id);
    tasks = await Task.deleteMany({ userId: req.user._id });
    if (!user) return next(new AppError(404, "user not found"));
    res.status(204).json({
        status: "success",
        message: "user deleted successfully",
        user: user,
    });
});

const updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
    console.log(user);
    const isCorrect = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!isCorrect)
        return next(new AppError(400, "your current password is wrong"));
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
        status: "success",
        message: "password updated successfully",
    });
});

const forgetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError(404, "user not found"));
    const tokenObj = genResetToken();
    user.passwordResetToken = tokenObj.hashed;
    user.passwordResetTokenExpireIn = tokenObj.expiresIn;
    console.log(user);
    await user.save();
    res.status(200).json({
        status: "success",
        message: "reset token generated and expires in 10 minutes",
        token: tokenObj.hashed,
    });
});

const resetPassword = catchAsync(async (req, res, next) => {
    if (!req.body.passwordResetToken)
        return next(new AppError(400, "password reset token is required"));
    const user = await User.findOne({
        passwordResetToken: req.body.passwordResetToken,
    })
        .select("+password")
        .orFail(() => new AppError(404, "user not found"));
    if (!user) return next(new AppError(404, "user not found"));
    console.log(user);
    user.password = req.body.password;
    console.log(user);
    await user.save();

    res.status(200).json({
        status: "success",
        message: "user password updated",
    });
});

export {
    registerUser,
    loginUser,
    updatePassword,
    updateProfile,
    forgetPassword,
    resetPassword,
    deleteUser,
    getProfile,
};
