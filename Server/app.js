import express from 'express';
import authRouter from './controller/authcontroller.js';
import connectDatabase from './config/databaseConfig.js';

const app = express();

connectDatabase();

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/', (req, res) => {
    res.status(200).json({Data: "jwt-auth- updated"});
});

export default app;