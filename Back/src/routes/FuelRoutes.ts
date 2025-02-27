import { Router } from "express";
import { FuelController } from "../controllers/FuelController";
import { authenticateToken } from "../middlewares/authenticateToken";

export const fuelRoutes = Router();

fuelRoutes.use(authenticateToken);

fuelRoutes.post('/create/:carId', new FuelController().newFuel);

fuelRoutes.get('/average/:carId/:months', new FuelController().averageMonths);

fuelRoutes.get('/history/:carId/:months', new FuelController().fuelHistory);

fuelRoutes.post('/calculateFuel/:carId', new FuelController().calculateDistanceFuel);

fuelRoutes.delete('/deleteFuel/:fuelId', new FuelController().deleteFuel);