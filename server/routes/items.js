import express from "express";
import {
    getItem,
    getItems,
    deleteItem
} from "../controllers/items.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read
router.get("/",  getItems);
router.get("/:id", getItem);

router.delete("/:id", verifyToken, deleteItem);

export default router;