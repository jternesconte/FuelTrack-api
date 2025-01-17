import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { carRepository } from '../repositories/CarRepository';

export class CarController {

   async newCar(req: Request, res: Response) {
      try {
         const { model, engine, year, category, km, fuelCapacity, remainingFuel} = req.body;
         
         const car: ICar = {
            model,
            engine,
            year,
            category,
            km,
            fuelCapacity,
            remainingFuel
         }

         await carRepository.saveCar(car);

         res.status(200).json(car);
      } catch {
         res.status(500).json({ error: 'Error in car creation' })
      }
   }
}