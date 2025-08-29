import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

const userCreateSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: "string",
            pattern: ".+@.+..+",
        },
        password: {
            type: "string",
            minLength: 6,
        },
    },
    required: ["name", "email", "password"],
};
const userUpdateSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: "string",
            pattern: ".+@.+..+",
        },
    },
    additionalProperties: false,
};

export const validateUserCreate = ajv.compile(userCreateSchema);
export const validateUserUpdate = ajv.compile(userUpdateSchema);
