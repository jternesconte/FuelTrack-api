import { Router } from "express";
import { FuelController } from "../controllers/FuelController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const fuelRoutes = Router();

fuelRoutes.use(authenticateToken);

fuelRoutes.post('/create/:carId', new FuelController().newFuel);

fuelRoutes.get('/average/:carId', new FuelController().averageCurrentMonth);