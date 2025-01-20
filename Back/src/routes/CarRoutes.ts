import { Router } from "express";
import { CarController } from "../controllers/CarController";

export const carRoutes = Router();

carRoutes.post('/create', new CarController().newCar);

carRoutes.get('/getById/:carId', new CarController().getCarById);