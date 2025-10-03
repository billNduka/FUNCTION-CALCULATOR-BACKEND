import express, { Request, Response } from 'express';
import { differentiate, integrate, convertBase, expand, findRoots } from '../controllers/mathControllers';

const router = express.Router();

///api/math
router.post('/differentiate', differentiate);
router.post('/integrate', integrate);
router.post('/convert/:frombase-:tobase', convertBase);
router.post('/expand', expand);
router.post('/roots', findRoots);

export default router;
