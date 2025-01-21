import { Router } from "express";
import { FuelController } from "../controllers/FuelController";

export const fuelRoutes = Router();

fuelRoutes.post('/create/:carId', new FuelController().newFuel);

fuelRoutes.get('/average/:carId', new FuelController().averageCurrentMonth);