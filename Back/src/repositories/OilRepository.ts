import { AppDataSource } from "../data-source";
import { Oil } from "../entities/Oil";
import { User } from "../entities/User";
import { IOil } from "../interfaces/IOil";
import { IUser } from "../interfaces/IUser"

export const oilRepository = AppDataSource.getRepository(Oil).extend({
   async saveOil(data: IOil): Promise<Oil> {
      const oil = this.create({
         car: data.car,
         price: data.price,
         date: data.date,
         flChangedFilters: data.flChangedFilters
      });
   
      return this.save(oil);
    }
})