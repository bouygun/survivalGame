import { Request, Response } from 'express';
import { SimulationService } from '../services/gameService';
import { Hero } from '../models/hero';
import { Enemy } from '../models/enemy';
import { ErrorHandler } from '../utils/errorHandler';

const simulationService = new SimulationService();

export const simulateSurvival = (req: Request, res: Response) => {
    try {
        const { hero, enemies, resourceDistance } = req.body;

        const heroInstance = new Hero(hero.hp, hero.attack);
        const enemiesInstances = enemies.map((enemy: any) => ({
            enemy: new Enemy(enemy.type, enemy.hp, enemy.attack),
            position: enemy.position
        }));
    
        const result = simulationService.simulate(heroInstance, enemiesInstances, resourceDistance);
    
        res.json({ result });
    } catch (error) {
        ErrorHandler.handleError(error as ErrorHandler, res);
    }

};
