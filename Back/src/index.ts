import express from 'express';
import { AppDataSource } from './data-source';
import { carRoutes } from './routes/CarRoutes';
import { fuelRoutes } from './routes/FuelRoutes';
import cors from 'cors';
import { userRoutes } from './routes/UserRoutes';
import { oilRoutes } from './routes/OilRoutes';
import { ipvaRoutes } from './routes/IpvaRoutes';

AppDataSource.initialize().then(() => {
    const app = express();
    const cookieParser = require('cookie-parser');

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser());

    app.use(express.json());

    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
        methods: 'GET, PUT, POST, DELETE',
        allowedHeaders: 'Content-Type, Authorization'
    }));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });

    app.use('/api/car', carRoutes);
    app.use('/api/fuel', fuelRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/oil', oilRoutes);
    app.use('/api/ipva', ipvaRoutes);

    return app.listen(process.env.PORT);
});