import { ICar } from "./ICar";

export interface IOil {
   car: ICar;
   price: number;
   carKm: number;
   date: string;
   oilType: string;
   flChangedFilters: boolean;
}