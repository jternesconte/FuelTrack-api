import { Request, Response } from 'express';
import { carRepository } from '../repositories/CarRepository';
import { IFuel } from '../interfaces/IFuel';
import { fuelRepository } from '../repositories/FuelRepository';

export class FuelController {

  async newFuel(req: Request, res: Response) {
    try {
      const { price, liters, distanceTraveled, date } = req.body;
      const { carId } = req.params;

      const car = await carRepository.findOneBy({ id: Number(carId) });
      if (!car) {
        res.status(404).json({ error: 'Car not found with id: ' + carId });
        return;
      }
      
      let remainingFuel: number;
      let averageLastRoute: number;
      let usedFuel: number;

      remainingFuel = car.fuelCapacity-liters;
      usedFuel = liters;
      averageLastRoute = parseFloat((distanceTraveled / liters).toFixed(2));

      car.remainingFuel = remainingFuel;
      car.km = parseFloat(parseFloat(car.km + distanceTraveled).toFixed(1));

      await carRepository.save(car);

      const fuel: IFuel = {
        car,
        price,
        liters,
        distanceTraveled,
        averageLastRoute,
        date,
      };

      await fuelRepository.saveFuel(fuel);

      res.status(200).json({ car, fuel });
    } catch (error) {    
      console.error(error);
      res.status(500).json({ error: 'Error in fuel creation' });
    }
  }

}