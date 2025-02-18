import { Request, Response } from 'express';
import { carRepository } from '../repositories/CarRepository';
import { IFuel } from '../interfaces/IFuel';
import { fuelRepository } from '../repositories/FuelRepository';
import { Between } from 'typeorm';
import { FuelHistory } from '../interfaces/FuelHistory';

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

  async averageMonths(req: Request, res: Response) {
    try {
      const { carId, months } = req.params;

      const numMonths = Number(months);

      const currentMonthStartDate = new Date();
      currentMonthStartDate.setMonth(currentMonthStartDate.getMonth() - numMonths);
      currentMonthStartDate.setDate(1);
      currentMonthStartDate.setHours(0, 0, 0, 0);

      const currentMonthEndDate = new Date();
      currentMonthEndDate.setHours(23, 59, 59, 999);

      const fuels = await fuelRepository.find({
        where: {
          car: { id: Number(carId) },
          date: Between(currentMonthStartDate, currentMonthEndDate),
        },
        relations: ['car'],
      });

      if (fuels.length === 0) {
        res.status(200).json({
          averageConsumption: 0,
          totalLiters: 0,
          totalDistance: 0
        });
        return;
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
      averageConsumption = Number((averageConsumption / fuels.length).toFixed(2));


      res.status(200).json({
        averageConsumption: isNaN(averageConsumption) ? 0 : averageConsumption,
        totalLiters,
        totalDistance
      });

    } catch (error) {
      res.status(500).json({ error: 'Error calculating the average consumption.' });
    }
  }

  async fuelHistory(req: Request, res: Response) {
    try {
      const { carId, months } = req.params;

      const numMonths = Number(months);

      const currentMonthStartDate = new Date();
      currentMonthStartDate.setMonth(currentMonthStartDate.getMonth() - numMonths);
      currentMonthStartDate.setDate(1);
      currentMonthStartDate.setHours(0, 0, 0, 0);

      const currentMonthEndDate = new Date();
      currentMonthEndDate.setHours(23, 59, 59, 999);

      const fuelHistory = await fuelRepository.find({
        where: {
          car: { id: Number(carId) },
          date: Between(currentMonthStartDate, currentMonthEndDate),
        },
        relations: ['car'],
      });

      if (fuelHistory.length === 0) {
        res.status(200).json({
          date: 0,
          liters: 0,
          price: 0
        });
        return;
      }

      let historyModel: FuelHistory[] = [];

      fuelHistory.forEach(fuel => {
        historyModel.push({ date: fuel.date.toLocaleDateString("pt-BR", { year: 'numeric', month: '2-digit',day: '2-digit' }), liters: fuel.liters, price: fuel.price });
      });

      res.status(200).json( historyModel );
    } catch (error) {
      res.status(500).json({ error: 'Error getting the fuel history.' });
    }
  }

  async calculateDistanceFuel(req: Request, res: Response) {
    try {
      const { distance } = req.body;
      const { carId } = req.params;

      const car = await carRepository.findOneBy({ id: Number(carId) });

      if(!car) {
        res.status(404).json({ error: 'Car not found with id: ' + carId });
        return;
      }

      const carAverage = await fuelRepository.average('averageLastRoute', { car: { id: car.id } });

      if(!carAverage) {
        res.status(404).json({ error: 'Car without fuels' });
        return;
      }

      const fuelNeeded = Number((distance / carAverage).toFixed(2));

      res.status(200).json( fuelNeeded );
    } catch {
      res.status(500).json({ error: 'Error calculating the fuel for distance.' })
    }
  }

}