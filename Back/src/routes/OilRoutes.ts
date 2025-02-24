import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import { OilController } from "../controllers/OilController";

export const oilRoutes = Router();

oilRoutes.use(authenticateToken);

oilRoutes.post('/change/:carId', new OilController().newOilChange);

oilRoutes.delete('/deleteChange/:oilId', new OilController().removeOilChange);