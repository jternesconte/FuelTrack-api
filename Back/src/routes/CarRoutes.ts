import { Router } from "express";
import { CarController } from "../controllers/CarController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const carRoutes = Router();

carRoutes.use(authenticateToken);

carRoutes.post('/create', new CarController().newCar);

carRoutes.get('/userCars', new CarController().getUserCars);

carRoutes.get('/getById/:carId', new CarController().getCarById);