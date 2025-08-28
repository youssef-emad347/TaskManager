import {
    createTask,
    deleteTask,
    updateTask,
    getTaskById,
    getTasks,
} from "../controllers/taskController.js";
import express from "express";
import authValidator from "../middlewares/authValidator.js";
import validator from "../middlewares/validator.js";
import {
    validateTaskCreate,
    validateTaskUpdate,
} from "../validators/task.validator.js";
const router = express.Router();

router.get("/", authValidator, getTasks);
router.get("/:id", authValidator, getTaskById);
router.post("/", validator(validateTaskCreate), authValidator, createTask);
router.delete("/:id", authValidator, deleteTask);
router.put("/:id", validator(validateTaskUpdate), authValidator, updateTask);

export default router;
