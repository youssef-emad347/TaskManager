//imports
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./utils/errorHandler.js";
import morgan from "morgan";
import health from "./routes/health.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

//env config
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//set app
const app = express();
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

//logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

//middlewares
app.use(helmet());
app.use(
    cors({
        origin:
            process.env.NODE_ENV === "production"
                ? "https://task-tanager-api.vercel.app/" // Or '*' for testing
                : `http://localhost:${PORT}`, // Adjust for your frontend port
        credentials: true,
        allowedHeaders: ["*"],
    })
);
app.use(express.json());
app.use(express.urlencoded());

//db connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("db connected....");
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

// Swagger docs
const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customCss:
            ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
        customCssUrl: CSS_URL,
    })
);

//routers
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});
app.use(health); //for test
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

//err handler
app.use(errorHandler);
