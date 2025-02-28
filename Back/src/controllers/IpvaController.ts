import { Request, Response } from 'express';
import { carRepository } from '../repositories/CarRepository';
import { IIpva } from '../interfaces/IIpva';
import { ipvaRepository } from '../repositories/IpvaRepository';

export class IpvaController {

   async newPaidIpva(req: Request, res: Response) {
      try {
         const { price, date } = req.body;
         const { carId } = req.params;

         const car = await carRepository.findOneBy({ user: { id: req.user?.id }, id: Number(carId) });
         if (!car) {
            res.status(404).json({ error: `Car not found with id: ${carId} for this user` });
            return;
         }
         
         const newIpva: IIpva = { car, price, date };
         await ipvaRepository.saveIpva(newIpva);

         res.status(201).json(newIpva);
      } catch (error) {
         res.status(500).json({ error: "Error in Ipva register" });
      }
   }

   async removeIpva(req: Request, res: Response) {
      try {
         const { ipvaId } = req.params;
   
         const ipva = await ipvaRepository.findOne({
            where: { id: Number(ipvaId) },
            relations: ["car", "car.user"]
         });
         if (!ipva) {
            res.status(404).json({ error: `Ipva not found with id: ${ipvaId}` });
            return;
         }
   
         if (ipva.car.user.id !== req.user?.id) {
            res.status(403).json({ error: 'Unauthorized to delete this Ipva record' });
            return;
         }
   
         await ipvaRepository.remove(ipva);
         res.status(200).json({ message: 'Ipva deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: 'Error deleting Ipva' });
      }
   }
}