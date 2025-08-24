import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export default async (req, res, next) => {
    let token = req.headers.auth;
    token = token.split(" ")[1];
    if (!token) return next(new AppError(401, "you are unauthorized"));
    const id = jwt.verify(token, process.env.JWT_SECRET).id;
    const userData = await User.findOne({ _id: id });
    req.user = userData; // for future use
    next();
};
