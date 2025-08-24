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
import userValidator from "../middlewares/userValidator.js";
import userUpdateValidator from "../middlewares/userUpdateValidator.js";
import authValidator from "../middlewares/authValidator.js";

const router = express.Router();

router.get("/profile", authValidator, getProfile);
router.post("/register", userValidator, registerUser);
router.post("/login", loginUser);
router.put(
    "/update-profile",
    userUpdateValidator,
    authValidator,
    updateProfile
);
router.put("/forget-password", forgetPassword);
router.patch("/update-password", authValidator, updatePassword);
router.patch("/reset-password", resetPassword);
router.delete("/delete{/:id}", deleteUser);

export default router;
