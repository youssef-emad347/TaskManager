import AppError from "../utils/AppError.js";

export default (validatorFunction) => {
    return (req, res, next) => {
        const isValid = validatorFunction(req.body);
        if (!isValid) {
            const errorMessages = validatorFunction.errors.map((e) =>
                console.log(e.message)
            );
            return next(new AppError(400, `Invalid data :${errorMessages}`));
        }
        next();
    };
};
