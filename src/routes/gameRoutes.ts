import express from 'express';
import { simulateSurvival } from '../controllers/gameController';

const router = express.Router();

router.post('/simulate', simulateSurvival);

export default router;
