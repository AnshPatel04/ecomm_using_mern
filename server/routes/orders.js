import express from "express";
import {
    register,
    getOrders
} from "../controllers/order.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
// router.get("/",  getItems);
// router.get("/:id", getItem);

// write
router.post("/register", verifyToken, register);
router.get("/", verifyToken, getOrders);

export default router;