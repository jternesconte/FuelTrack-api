import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import { IpvaController } from "../controllers/IpvaController";

export const ipvaRoutes = Router();

ipvaRoutes.use(authenticateToken);

ipvaRoutes.post('/paid/:carId', new IpvaController().newPaidIpva);

ipvaRoutes.post('/deleteIpva/:ipvaId', new IpvaController().removeIpva);