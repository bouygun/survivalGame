import express from 'express';
import { simulateSurvival } from '../controllers/survivalController';

const router = express.Router();

router.post('/survivalGame', simulateSurvival);

export default router;
