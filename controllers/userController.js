import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";
import genResetToken from "../utils/resetToken.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

const registerUser = catchAsync(async (req, res, next) => {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser)
        return next(new AppError(400, "email is already registered"));
    const user = new User(req.body);
    if (!user) return next(new AppError(400, "undefined user"));
    await user.save();
    const token = signToken(user._id);
    res.status(200).json({
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
    const user = req.user;
    res.status(200).json({
        status: "success",
        message: "get profile successfully",
        user: user,
    });
});

const updateProfile = catchAsync(async (req, res, next) => {
    const user = req.user;
    [user.name, user.email] = [req.body.name, req.body.email];
    await user.save();
    res.status(200).json({
        status: "success",
        message: "profile updated successfully",
        user: user,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return next(new AppError(404, "user not found"));
    res.status(200).json({
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
        return next(new AppError(401, "your current password is wrong"));
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
        status: "success",
        message: "password updated successfully",
    });
});

const forgetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    const tokenObj = genResetToken();
    user.passwordResetToken = tokenObj.hashed;
    console.log(user.resetPasswordToken);
    user.passwordResetTokenExpireIn = tokenObj.expiresIn;
    console.log(user);
    await user.save();
    res.status(200).json({
        status: "success",
        message: "reset token generated and expires in 10 minutes",
        token: tokenObj.resetToken,
    });
});

const resetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({
        passwordResetToken: req.body.passwordResetToken,
    }).select("+password");
    console.log(user);
    user.password = req.body.password;
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
