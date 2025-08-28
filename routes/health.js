import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/health", async (req, res) => {
    const dbState = mongoose.connection.readyState;
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbStatus = [
        "disconnected",
        "connected",
        "connecting",
        "disconnecting",
    ];

    const health = {
        status: "ok",
        uptime: process.uptime(), // seconds server has been running
        timestamp: Date.now(), // current epoch ms
        db: dbStatus[dbState] || "unknown",
        memoryUsage: process.memoryUsage(), // optional, for debugging
    };

    // If DB is disconnected, mark unhealthy
    const code = dbState === 1 ? 200 : 503;

    res.status(code).json(health);
});

export default router;
