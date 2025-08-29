import AppError from "../utils/AppError.js";

export default (validatorFunction) => {
    return (req, res, next) => {
        const isValid = validatorFunction(req.body);
        if (!isValid) {
            const errorMessages = validatorFunction.errors.map(
                (e) =>
                    `${e.instancePath.slice(1) || e.dataPath || ""} ${
                        e.message
                    }`
            );
            return next(
                new AppError(400, `Invalid data :${errorMessages.join(", ")}`)
            );
        }
        next();
    };
};
