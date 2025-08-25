import {
    createTask,
    deleteTask,
    updateTask,
    getTaskById,
    getTasks,
} from "../controllers/taskController.js";
import express from "express";
import pagination from "../middlewares/pagination.js";
import authValidator from "../middlewares/authValidator.js";
import taskValidator from "../middlewares/taskValidator.js";
import taskUpdateValidator from "../middlewares/taskUpdateValidator.js";

const router = express.Router();

router.get("/", authValidator, pagination, getTasks);
router.get("/:id", authValidator, getTaskById);
router.post("/", taskValidator, authValidator, createTask);
router.delete("/:id", authValidator, deleteTask);
router.put("/:id", taskUpdateValidator, authValidator, updateTask);

export default router;
