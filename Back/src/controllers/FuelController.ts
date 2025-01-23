import { Request, Response } from 'express';
import { carRepository } from '../repositories/CarRepository';
import { IFuel } from '../interfaces/IFuel';
import { fuelRepository } from '../repositories/FuelRepository';
import { Between } from 'typeorm';

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
      
      let averageLastRoute: number;
      let usedFuel: number;

      usedFuel = liters;
      averageLastRoute = parseFloat((distanceTraveled / liters).toFixed(2));

      car.km = Number(car.km) || 0;
      car.km = Number((car.km + distanceTraveled).toFixed(1));

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
      res.status(500).json({ error: 'Error in fuel creation' });
    }
  }

  async averageCurrentMonth(req: Request, res: Response) {
    try {
      const { carId } = req.params;

      const currentMonthStartDate = new Date();
      currentMonthStartDate.setDate(1);
      currentMonthStartDate.setHours(0, 0, 0, 0);

      const currentMonthEndDate = new Date(currentMonthStartDate);
      currentMonthEndDate.setMonth(currentMonthEndDate.getMonth() + 1);
      currentMonthEndDate.setDate(0);
      currentMonthEndDate.setHours(23, 59, 59, 999);

      const fuels = await fuelRepository.find({
        where: {
          car: { id: Number(carId) },
          date: Between(currentMonthStartDate, currentMonthEndDate),
        },
        relations: ['car'],
      });

      if (fuels.length === 0) {
        res.status(404).json({ message: 'No fuel data found for the current month.' });
        return
      }

      let totalLiters: number = 0;
      let totalDistance: number = 0;
      let averageConsumption: number = 0;
      
      fuels.forEach(fuel => {
        totalLiters = totalLiters + Number(fuel.liters);
        totalDistance = totalDistance + Number(fuel.distanceTraveled);
        averageConsumption = averageConsumption + Number(fuel.averageLastRoute);
      })

      totalLiters = Number(totalLiters.toFixed(2));
      totalDistance = Number(totalDistance.toFixed(1));
      averageConsumption = averageConsumption / fuels.length;


      res.status(200).json({
        averageConsumption: isNaN(averageConsumption) ? 0 : averageConsumption,
        totalLiters,
        totalDistance
      });

    } catch (error) {
      res.status(500).json({ error: 'Error calculating the average consumption for the current month.' });
    }
  }

}