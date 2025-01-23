import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const carRoutes = Router();

carRoutes.post('/create/:userId', authenticateToken, new CarController().newCar);

carRoutes.get('/userCars', authenticateToken, new CarController().getUserCars);

carRoutes.get('/getById/:carId', authenticateToken, new CarController().getCarById);