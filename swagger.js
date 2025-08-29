import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Task Manager API",
        version: "1.0.0",
        description: "API for managing tasks and users.",
    },
    tags: [
        {
            name: "Users",
            description: "Operations about users",
        },
        {
            name: "Tasks",
            description: "Operations about tasks",
        },
    ],
    servers: [
        {
            url: process.env.SWAGGER_URI,
            description: "Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT", // optional, but nice for clarity
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, "routes/*.js")],
};

export default swaggerJSDoc(options);
