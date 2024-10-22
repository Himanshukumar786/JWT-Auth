import express from 'express';
import signup from '../controller/authcontroller';

const authRouter = express.Router();

authRouter.post('/signup', signup);

export default authRouter;