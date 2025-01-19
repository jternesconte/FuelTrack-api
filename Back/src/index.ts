import express from 'express';
import { AppDataSource } from './data-source';
import { carRoutes } from './routes/CarRoutes';
import { fuelRoutes } from './routes/FuelRoutes';

AppDataSource.initialize().then(() => {
   const app = express();

   app.use(express.json());

   app.use('/api/car', carRoutes);
   app.use('/api/fuel', fuelRoutes);

   return app.listen(process.env.PORT);
});