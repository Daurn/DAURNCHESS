import { Router } from "express";
import { createUser, getUsers, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/", createUser); // POST /users
router.get("/", getUsers); // GET /users
router.delete("/:userId", deleteUser); // DELETE /users/:id

export default router;
