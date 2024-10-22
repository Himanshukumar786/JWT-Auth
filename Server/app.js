import express from 'express';
import authRouter from './controller/authcontroller.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/', (req, res) => {
    res.status(200).json({Data: "jwt-auth- updated"});
});

export default app;