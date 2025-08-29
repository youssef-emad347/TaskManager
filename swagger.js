import swaggerJSDoc from "swagger-jsdoc";

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
            url: `http://localhost:3000`,
            description: "Development server",
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
    apis: ["./routes/*.js"],
};

export default swaggerJSDoc(options);
