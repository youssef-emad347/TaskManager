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

//env config
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

//set app
const app = express();
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});

//logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

//middlewares
app.use(helmet());
app.use(cors());
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

//routers
app.use(health); //for test
app.use("/api/users", userRouter);
//err handler
app.use(errorHandler);
