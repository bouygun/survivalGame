import { Request, Response } from 'express';
import { SimulationService } from '../services/survivalService';
import { Hero, Enemy } from '../models/types';
import { ErrorHandler } from '../utils/errorHandler';

const simulationService = new SimulationService();

export const simulateSurvival = (req: Request, res: Response) => {
    try {
        const { hero, enemies, resourceDistance } = req.body

        const heroInstance: Hero = {
            hp: hero.hp,
            attack: hero.attack
        };
        const enemiesInstances: Enemy[] = enemies.map((enemy: any) => ({
            enemy: {
                hp: enemy.hp,
                attack: enemy.attack
            },
            position: enemy.position,
            type: enemy.type
        }));

        const result = simulationService.simulate({hero: heroInstance, enemies: enemiesInstances, resourceDistance})
        res.json({ result })
    } catch (error) {
        ErrorHandler.handleError(error as ErrorHandler, res)
    }
};

