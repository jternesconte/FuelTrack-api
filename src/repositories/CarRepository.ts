import { AppDataSource } from "../data-source";
import { Car } from "../entities/Car";
import { ICar } from "../interfaces/ICar";

export const CarRepository = AppDataSource.getRepository(Car).extend({
 async saveCar(data: ICar): Promise<Car> {
   const car = this.create({
      model: data.model,
      engine: data.engine,
      year: data.year,
      category: data.category
   });

   return this.save(car);
 }
});