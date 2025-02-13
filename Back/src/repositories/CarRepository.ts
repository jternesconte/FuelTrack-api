import { AppDataSource } from "../data-source";
import { Car } from "../entities/Car";
import { ICar } from "../interfaces/ICar";

export const carRepository = AppDataSource.getRepository(Car).extend({
 async saveCar(data: ICar): Promise<Car> {
   const car = this.create({
      user: data.user,
      model: data.model,
      engine: data.engine,
      year: data.year,
      plate: data.plate,
      km: data.km,
      category: data.category,
      fuelCapacity: data.fuelCapacity,
      image: data.image ?  data.image : undefined
   });

   return this.save(car);
 }
});