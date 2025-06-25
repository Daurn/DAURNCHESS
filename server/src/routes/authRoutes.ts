import { Router } from "express";
import { login, register } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validators/auth";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/register", validateRequest(registerSchema), register);

export default router;
