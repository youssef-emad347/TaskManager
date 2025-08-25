import AppError from "../utils/AppError.js";

export default async (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    req.pagination = { page, limit, skip };
    next();
};
