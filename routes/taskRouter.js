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

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: ["Tasks"]
 *     summary: Get all tasks
 *     description: Retrieves all tasks of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully.
 *   post:
 *     tags: ["Tasks"]
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully.
 */

router.get("/", authValidator, getTasks);
router.post("/", validator(validateTaskCreate), authValidator, createTask);

/**
 * @swagger
 *  /api/tasks/{id}:
 *   get:
 *     tags: ["Tasks"]
 *     summary: Get a task by id
 *     description: Retrieves a task by id of the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *   put:
 *     tags: ["Tasks"]
 *     summary: Update a task
 *     description: Updates a task by id of the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *   delete:
 *     tags: ["Tasks"]
 *     summary: Delete a task
 *     description: Deletes a task by id of the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Task deleted successfully.
 */
router.get("/:id", authValidator, getTaskById);
router.delete("/:id", authValidator, deleteTask);
router.put("/:id", validator(validateTaskUpdate), authValidator, updateTask);

export default router;
