import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: "string",
            pattern: ".+@.+/..+",
        },
        password: {
            type: "string",
            minLength: 6,
        },
    },
    required: ["name", "email", "password"],
};

const validate = ajv.compile(schema);

export default (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) return res.status(400).json({ message: "bad request!" });
    next();
};
