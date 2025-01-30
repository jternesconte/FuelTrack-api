import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const userRoutes = Router();

userRoutes.post('/register', new UserController().newRegister);

userRoutes.post('/login', new UserController().userLogin);

userRoutes.put('/editUser', authenticateToken, new UserController().editUser);