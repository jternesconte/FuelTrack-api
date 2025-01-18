import { Router } from "express";
import { FuelController } from "../controllers/FuelController";

export const fuelRoutes = Router();

fuelRoutes.post('/fuel/:carId', new FuelController().newFuel);