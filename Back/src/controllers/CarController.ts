import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { carRepository } from '../repositories/CarRepository';
import { bufferToBase64 } from '../utils/BufferToBase64';

export class CarController {

   async newCar(req: Request, res: Response) {
      try {
         const { model, engine, year, category, km, fuelCapacity, image} = req.body;
         
         const car: ICar = {
            model,
            engine,
            year,
            category,
            km,
            fuelCapacity,
            image: image? Buffer.from(image, 'base64') : undefined
         }

         await carRepository.saveCar(car);

         res.status(200).json(car);
      } catch {
         res.status(500).json({ error: 'Error in car creation' });
      }
   }

   async getCarById(req:Request, res: Response) {
      try {
         const { carId } = req.params;

         const car = await carRepository.findOneBy({ id: Number(carId) })
         if(!car) {
            res.status(404).json({ error: 'Car not found with id: ' + carId });
            return;
         }

         const carResponse = { ...car };

         if(car.image) {
            carResponse.image = bufferToBase64(car.image as Buffer);
         }

         res.status(200).json(carResponse);
      } catch {
         res.status(500).json({ error: 'Error in car search' });
      }
   }
}