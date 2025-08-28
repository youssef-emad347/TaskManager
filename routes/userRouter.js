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

router.get("/profile", authValidator, getProfile);
router.post("/register", validator(validateUserCreate), registerUser);
router.post("/login", loginUser);
router.put(
    "/update-profile",
    validator(validateUserUpdate),
    authValidator,
    updateProfile
);
router.put("/forget-password", forgetPassword);
router.patch("/update-password", authValidator, updatePassword);
router.patch("/reset-password", resetPassword);
router.delete("/delete", deleteUser);

export default router;
