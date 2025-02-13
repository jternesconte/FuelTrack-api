import { IUser } from "./IUser";

export interface ICar {
  user: IUser
  model: string;
  engine: string;
  year: string;
  plate: string;
  category: string;
  km: number
  fuelCapacity: number;
  image?: Buffer | string;
}