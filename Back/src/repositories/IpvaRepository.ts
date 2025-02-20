import { AppDataSource } from "../data-source";
import { Ipva } from "../entities/Ipva";
import { IIpva } from "../interfaces/IIpva";

export const ipvaRepository = AppDataSource.getRepository(Ipva).extend({
   async saveIpva(data: IIpva): Promise<Ipva> {
      const ipva = this.create({
         car: data.car,
         price: data.price,
         oilType: data.oilType,
         date: data.date,
      });
   
      return this.save(ipva);
    }
})