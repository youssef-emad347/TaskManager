import express from "express";
import {
    registerUser,
    loginUser,
    updatePassword,
    updateProfile,
    forgetPassword,
    resetPassword,
    deleteUser,
    getProfile,
} from "../controllers/userController.js";
import {
    validateUserCreate,
    validateUserUpdate,
} from "../validators/user.validator.js";
import validator from "../middlewares/validator.js";
import authValidator from "../middlewares/authValidator.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: ["Users"]
 *     summary: Get user profile
 *     description: Retrieves the profile of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/profile", authValidator, getProfile);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: ["Users"]
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 */
router.post("/register", validator(validateUserCreate), registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: ["Users"]
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/update-profile:
 *   put:
 *     tags: ["Users"]
 *     summary: Update user profile
 *     description: Updates the profile of the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 nullable: true
 *               email:
 *                 type: string
 *                 nullable: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       401:
 *         description: Unauthorized.
 */
router.put(
    "/update-profile",
    validator(validateUserUpdate),
    authValidator,
    updateProfile
);

/**
 * @swagger
 * /api/users/forget-password:
 *   put:
 *     tags: ["Users"]
 *     summary: Forget password
 *     description: Sends a password reset link to the user's email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent successfully.
 */
router.put("/forget-password", forgetPassword);

/**
 * @swagger
 * /api/users/update-password:
 *   patch:
 *     tags: ["Users"]
 *     summary: Update password
 *     description: Updates the password of the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/update-password", authValidator, updatePassword);

/**
 * @swagger
 * /api/users/reset-password:
 *   patch:
 *     tags: ["Users"]
 *     summary: Reset password
 *     description: Resets the password of the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               passwordResetToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully.
 */
router.patch("/reset-password", resetPassword);

/**
 * @swagger
 * /api/users/delete/:
 *   delete:
 *     tags: ["Users"]
 *     summary: Delete a user
 *     description: Deletes a user account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
/**
 * @swagger
 * /api/users/delete/{id}:
 *   delete:
 *     tags: ["Users"]
 *     summary: Delete a user
 *     description: Deletes a user account.
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
 *         description: User deleted successfully.
 */
router.delete("/delete{/:id}", authValidator, deleteUser);

export default router;
