import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { carRepository } from '../repositories/CarRepository';
import { bufferToBase64 } from '../utils/BufferToBase64';
import { userRepository } from '../repositories/UserRepository';

export class CarController {

   async newCar(req: Request, res: Response) {
      try {
         const { model, engine, year, category, km, fuelCapacity, image} = req.body;
         const { userId } = req.params;
         
         const existentUser = await userRepository.findOneBy({ id: Number(userId) });

         if(!existentUser) {
            res.status(404).json({ error: 'User not found with id: ' + userId });
            return;
         }

         const car: ICar = {
            user: existentUser,
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

         const car = await carRepository.findOneBy({ id: Number(carId), user: {id: req.user?.id} })
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

   async getUserCars(req: Request, res: Response) {
      try {

         if(!req.user?.id) {
            res.status(404).json({ error: 'user id not received' });
            return;
         }

         const userCars = await carRepository.find({
            where: {
               user: { id: req.user?.id },
            },
            relations: ['user'],
         });

        if(userCars.length === 0) {
         res.status(200).json([]);
        } else {
         userCars.forEach(car => {
            car.image = bufferToBase64(car.image as Buffer);
         })
         res.status(200).json(userCars);
        }

      } catch {
         res.status(500).json({ error: 'Error in cars search' });
      }
   }
}