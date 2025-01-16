import { Request, Response } from 'express';

export class CarController {

   async newCar(req: Request, res: Response) {
      try {
         const { model, engine, year, category } = req.body
         
      } catch {
         res.status(500).json({ error: 'Error in car creation' })
      }
   }
}