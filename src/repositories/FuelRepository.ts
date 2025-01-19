import { AppDataSource } from "../data-source";
import { Fuel } from "../entities/Fuel";
import { IFuel } from "../interfaces/IFuel";

export const fuelRepository = AppDataSource.getRepository(Fuel).extend({

 async saveFuel(data: IFuel): Promise<Fuel> {
   const fuel = this.create({
      car: data.car,
      price: data.price,
      liters: data.liters,
      distanceTraveled: data.distanceTraveled,
      averageLastRoute: data.averageLastRoute,
      date: data.date
   });

   return this.save(fuel);
 },

 async findLastByCarId(carId: number) {
   return this.createQueryBuilder('fuel')
     .where('fuel.car_id = :carId', { carId })
     .orderBy('fuel.date', 'DESC')
     .getOne();
 }
 
});