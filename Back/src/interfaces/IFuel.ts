import { ICar } from "./ICar";

export interface IFuel {
   car: ICar;
   price: number;
   liters: number;
   distanceTraveled: number;
   averageLastRoute: number
   date: string;
}