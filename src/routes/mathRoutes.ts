import express, { Request, Response } from 'express';
import { differentiate, integrate } from '../controllers/mathControllers';

const router = express.Router();

///api/math
router.post('/differentiate', differentiate);
router.post('/integrate', integrate);

export default router;
