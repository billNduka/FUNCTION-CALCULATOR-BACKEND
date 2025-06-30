import express, { Request, Response } from 'express';
import { differentiate } from '../controllers/mathControllers';

const router = express.Router();

router.post('/differentiate', differentiate);

export default router;
