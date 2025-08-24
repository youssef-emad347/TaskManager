import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            required: [true, "Task must have a title"],
            trim: true,
            maxLength: 100,
        },
        description: {
            type: "string",
            trim: true,
        },
        status: {
            type: "string",
            Enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
        timestamps: true,
        required: ["title"],
    },
};

const validate = ajv.compile(schema);

export default (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) return res.status(400).json({ message: "bad request!" });
    next();
};
