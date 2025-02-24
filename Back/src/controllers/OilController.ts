import { Request, Response } from 'express';
import { carRepository } from '../repositories/CarRepository';
import { oilRepository } from '../repositories/OilRepository';
import { IOil } from '../interfaces/IOil';

export class OilController {

   async newOilChange(req: Request, res: Response) {
      try {
         const { price, carKm, oilType, date, flChangedFilters } = req.body;
         const { carId } = req.params;

         const car = await carRepository.findOneBy({ user: { id: req.user?.id }, id: Number(carId) });
         if (!car) {
            res.status(404).json({ error: `Car not found with id: ${carId} for this user` });
            return;
         }
         
         const newOil: IOil = { car, price, carKm, date, oilType, flChangedFilters };
         await oilRepository.saveOil(newOil);

         res.status(201).json(newOil);
      } catch (error) {
         res.status(500).json({ error: "Error in Oil Change register" });
      }
   }

   async removeOilChange(req: Request, res: Response) {
      try {
         const { oilId } = req.params;
   
         const oilChange = await oilRepository.findOne({
            where: { id: Number(oilId) },
            relations: ["car", "car.user"]
         });
         if (!oilChange) {
            res.status(404).json({ error: `Oil change not found with id: ${oilId}` });
            return;
         }
   
         if (oilChange.car.user.id !== req.user?.id) {
            res.status(403).json({ error: 'Unauthorized to delete this oil change record' });
            return;
         }
   
         await oilRepository.remove(oilChange);
         res.status(200).json({ message: 'Oil change deleted successfully' });
      } catch (error) {
         res.status(500).json({ error: 'Error deleting oil change' });
      }
   }

}