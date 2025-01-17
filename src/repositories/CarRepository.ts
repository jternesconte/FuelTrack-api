import { AppDataSource } from "../data-source";
import { Car } from "../entities/Car";
import { ICar } from "../interfaces/ICar";

export const carRepository = AppDataSource.getRepository(Car).extend({
 async saveCar(data: ICar): Promise<Car> {
   const car = this.create({
      model: data.model,
      engine: data.engine,
      year: data.year,
      km: data.km,
      category: data.category,
      fuelCapacity: data.fuelCapacity,
      remainingFuel: data.remainingFuel
   });

   return this.save(car);
 }
});