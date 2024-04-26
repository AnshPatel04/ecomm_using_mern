import express from "express";
import { login, register, getUsers } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/",  verifyToken, getUsers);

export default router;