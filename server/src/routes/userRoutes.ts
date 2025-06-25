import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";
import { validateRequest } from "../middleware/validateRequest";
import { updateUserSchema, userIdSchema } from "../validators/user";

const router = Router();

router.get("/", getUsers);
router.get("/:id", validateRequest(userIdSchema), getUserById);
router.put("/:id", validateRequest(updateUserSchema), updateUser);
router.delete("/:id", validateRequest(userIdSchema), deleteUser);

export default router;
