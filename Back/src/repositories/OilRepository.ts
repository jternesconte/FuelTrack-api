import { AppDataSource } from "../data-source";
import { Oil } from "../entities/Oil";
import { IOil } from "../interfaces/IOil";

export const oilRepository = AppDataSource.getRepository(Oil).extend({
   async saveOil(data: IOil): Promise<Oil> {
      const oil = this.create({
         car: data.car,
         price: data.price,
         carKm: data.carKm,
         date: data.date,
         oilType: data.oilType,
         flChangedFilters: data.flChangedFilters
      });
   
      return this.save(oil);
    }
})