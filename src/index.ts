import express from 'express';
import { AppDataSource } from './data-source';
import { carRoutes } from './routes/CarRoutes';

AppDataSource.initialize().then(() => {
   const app = express();

   app.use(express.json());

   app.use('/api/car', carRoutes);

   return app.listen(process.env.PORT);
});