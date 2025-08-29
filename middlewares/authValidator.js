import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyToken } from "../utils/jwt.js";

export default catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
        token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new AppError(401, "you are unauthorized"));
    const decoded = verifyToken(token);
    const currentUser = await User.findOne({ _id: decoded.id });
    if (!currentUser)
        return next(new AppError(404, "the user no longer exits"));
    req.user = currentUser; // for future use
    console.log(req.user);
    next();
});
