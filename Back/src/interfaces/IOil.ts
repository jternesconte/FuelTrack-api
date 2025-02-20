import { ICar } from "./ICar";

export interface IOil {
   car: ICar;
   price: number;
   date: string;
   flChangedFilters: boolean;
}