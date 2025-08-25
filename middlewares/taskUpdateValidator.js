import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            maxLength: 100,
        },
        description: {
            type: "string",
        },
        status: {
            type: "string",
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
    },
    additionalProperties: false,
};

const validate = ajv.compile(schema);

export default (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) return res.status(400).json({ message: "bad request!" });
    next();
};
