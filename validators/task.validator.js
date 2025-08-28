import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

const taskCreateSchema = {
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
    required: ["title"],
    additionalProperties: false,
};
const taskUpdateSchema = {
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
    required: ["name", "email"],
    additionalProperties: false,
};
export const validateTaskCreate = ajv.compile(taskCreateSchema);
export const validateTaskUpdate = ajv.compile(taskUpdateSchema);
